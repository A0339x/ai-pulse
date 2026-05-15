"""Fast alerter for AI Pulse.

Polls a handful of high-signal AI sources every 15 min. When a new post
appears that we haven't seen before, posts a one-line ping to Slack via
an incoming webhook. First run is silent (baselines the state file) so
we don't spam old posts.

YouTube uploads from watched creators get extra treatment: we fetch the
transcript, run it through `claude -p`, and inline the summary in the
Slack message so you can decide whether the video is worth watching.

Env:
    SLACK_WEBHOOK_URL -- Slack incoming webhook URL (channel is fixed by the webhook)

State:
    scripts/state/seen_alerts.json -- set of URLs we've already alerted on
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).parent))
from sources import (  # noqa: E402
    STATE_DIR,
    fetch_agent_releases,
    fetch_anthropic_news,
    fetch_bytedance_seed,
    fetch_youtube_uploads,
)
import feedparser  # noqa: E402

UA = "AI-Pulse-Alerter/1.0"
TIMEOUT = 15
STATE_FILE = STATE_DIR / "seen_alerts.json"

# High-signal sources only -- these are the ones where a new post is
# almost always something a builder cares about.
RSS_HIGH_SIGNAL = [
    ("OpenAI",    "https://openai.com/news/rss.xml"),
    ("Google AI", "https://blog.google/technology/ai/rss/"),
    ("DeepMind",  "https://deepmind.google/blog/rss.xml"),
]


def fetch_high_signal_posts() -> list[dict[str, str]]:
    """Pull current posts from high-signal sources.

    Note: the agent-releases and ByteDance fetchers do their own state
    tracking and only return *new* items each call. The alerter's own
    state file dedupes across all sources, so passing them through is
    safe -- they'll always be in the "new" set on first sighting.
    """
    out: list[dict[str, str]] = []

    # Anthropic -- reuse the scraper from the digest pipeline
    for item in fetch_anthropic_news(max_items=8):
        out.append({
            "source": item["source"],
            "title":  item["title"],
            "url":    item["url"],
        })

    # OpenAI, Google AI, DeepMind -- RSS
    for source_name, url in RSS_HIGH_SIGNAL:
        try:
            feed = feedparser.parse(url, request_headers={"User-Agent": UA})
            for entry in feed.entries[:8]:
                out.append({
                    "source": source_name,
                    "title":  entry.get("title", "").strip(),
                    "url":    entry.get("link", "").strip(),
                })
        except Exception as e:
            print(f"[alert] {source_name} fetch error: {e}", file=sys.stderr)

    # ByteDance Seed -- new model pages (Seedance + siblings). We bypass
    # the Seed fetcher's own state tracking here by re-scraping at the
    # primitive level, so the alerter's seen_alerts.json is the single
    # source of truth for "did we already ping?"
    try:
        resp = requests.get(
            "https://seed.bytedance.com/en/research",
            headers={"User-Agent": "Mozilla/5.0 (compatible; AI-Pulse/1.0)"},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        import re as _re
        skip = {"blog", "research", "seedearlycareer", "seed-edge"}
        for m in _re.finditer(r'href="/en/([a-z0-9_\-]+)"', resp.text):
            slug = m.group(1)
            if slug in skip:
                continue
            title = slug.replace("_", ".").replace("-", " ")
            title = title[:1].upper() + title[1:]
            out.append({
                "source": "ByteDance Seed",
                "title":  title,
                "url":    f"https://seed.bytedance.com/en/{slug}",
            })
    except Exception as e:
        print(f"[alert] ByteDance fetch error: {e}", file=sys.stderr)

    # Autonomous-agent product releases. fetch_agent_releases() is state-aware
    # (only returns new releases) but we feed everything through the alerter's
    # own state dedup as well, so re-running is idempotent either way.
    for rel in fetch_agent_releases():
        out.append({
            "source": rel["source"],
            "title":  rel["title"],
            "url":    rel["url"],
        })

    # YouTube creators we watch
    for vid in fetch_youtube_uploads():
        out.append({
            "source": vid["source"],
            "title":  vid["title"],
            "url":    vid["url"],
        })

    return [p for p in out if p["url"] and p["title"]]


def load_seen() -> set[str]:
    if not STATE_FILE.exists():
        return set()
    try:
        return set(json.loads(STATE_FILE.read_text()))
    except Exception as e:
        print(f"[alert] state file unreadable, treating as empty: {e}", file=sys.stderr)
        return set()


def save_seen(seen: set[str]) -> None:
    STATE_FILE.write_text(json.dumps(sorted(seen), indent=2))


def post_to_slack(webhook_url: str, text: str) -> None:
    resp = requests.post(
        webhook_url,
        headers={"Content-Type": "application/json"},
        json={"text": text},
        timeout=TIMEOUT,
    )
    if resp.status_code != 200 or resp.text.strip() != "ok":
        raise RuntimeError(f"Slack webhook error {resp.status_code}: {resp.text[:200]}")


def format_alert(post: dict[str, str]) -> str:
    # Single-line Slack message. Slack will unfurl the URL into a card.
    return f":rocket: *{post['source']}* posted <{post['url']}|{post['title']}>"


# ─── YOUTUBE SUMMARIZATION ─────────────────────────────────────────────

_VIDEO_ID_RE = re.compile(r"(?:v=|youtu\.be/|/shorts/)([A-Za-z0-9_\-]{11})")


def _video_id(url: str) -> str | None:
    m = _VIDEO_ID_RE.search(url)
    return m.group(1) if m else None


def fetch_transcript(video_id: str) -> str | None:
    """Pull the auto-caption transcript for a YouTube video.

    Returns plain text (no timestamps) or None if the transcript can't be
    fetched -- private video, captions disabled, region block, etc.
    """
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        fetched = YouTubeTranscriptApi().fetch(video_id, languages=["en", "en-US"])
        return " ".join(s.text for s in fetched.snippets if getattr(s, "text", None))
    except Exception as e:
        print(f"[alert] transcript fetch failed for {video_id}: {e}", file=sys.stderr)
        return None


def summarize_video(title: str, transcript: str) -> str | None:
    """Run the transcript through `claude -p` for a tight bullet summary."""
    # Truncate ultra-long transcripts to keep the prompt fast
    if len(transcript) > 30000:
        transcript = transcript[:30000] + " [...transcript truncated]"

    prompt = f"""Below is the auto-generated transcript of a YouTube video. Write a tight summary the reader can use to decide whether to watch.

Title: {title}

Requirements:
- Lead with one sentence stating what the video teaches or demos.
- Then 4-6 bullets of concrete takeaways: tools used, the workflow in order, the key insight, and any gotcha the creator flagged.
- Plain English. No "in this video" meta-narration. No marketing words.
- Total under 180 words.
- Use Slack mrkdwn: `*bold*` for emphasis, `•` for bullets, blank line between the lead and the bullets.

Transcript:
{transcript}
"""
    try:
        result = subprocess.run(
            ["claude", "-p", prompt],
            capture_output=True, text=True, timeout=300,
        )
        if result.returncode != 0 or not result.stdout.strip():
            print(f"[alert] claude summarize failed: rc={result.returncode}, "
                  f"stderr={result.stderr[:300]}", file=sys.stderr)
            return None
        return result.stdout.strip()
    except FileNotFoundError:
        print("[alert] `claude` CLI not on PATH -- skipping summary", file=sys.stderr)
        return None
    except subprocess.TimeoutExpired:
        print("[alert] claude summarize timed out", file=sys.stderr)
        return None


def format_youtube_alert(post: dict[str, str], summary: str | None) -> str:
    head = f":movie_camera: *{post['source']}* posted <{post['url']}|{post['title']}>"
    if summary:
        return f"{head}\n\n{summary}"
    return head + "\n\n_(couldn't fetch a transcript -- summary unavailable)_"


def main() -> int:
    webhook_url = os.environ.get("SLACK_WEBHOOK_URL", "").strip()

    posts = fetch_high_signal_posts()
    print(f"[alert] fetched {len(posts)} current posts across {len(RSS_HIGH_SIGNAL)+1} sources")

    seen = load_seen()
    first_run = len(seen) == 0
    current_urls = {p["url"] for p in posts}
    new_posts = [p for p in posts if p["url"] not in seen]

    if first_run:
        save_seen(current_urls)
        print(f"[alert] FIRST RUN: baselined {len(current_urls)} URLs, no alerts sent")
        return 0

    if not new_posts:
        print("[alert] nothing new")
        save_seen(seen | current_urls)
        return 0

    print(f"[alert] {len(new_posts)} new post(s):")
    for p in new_posts:
        print(f"  [{p['source']}] {p['title']}")
        print(f"    {p['url']}")

    if not webhook_url:
        print("[alert] SLACK_WEBHOOK_URL not set -- printing only", file=sys.stderr)
    else:
        for p in new_posts:
            try:
                if p["source"].startswith("YouTube"):
                    vid = _video_id(p["url"])
                    transcript = fetch_transcript(vid) if vid else None
                    summary = summarize_video(p["title"], transcript) if transcript else None
                    text = format_youtube_alert(p, summary)
                else:
                    text = format_alert(p)
                post_to_slack(webhook_url, text)
            except Exception as e:
                print(f"[alert] slack post failed for {p['url']}: {e}", file=sys.stderr)
                continue
            seen.add(p["url"])
        save_seen(seen | current_urls)
        print(f"[alert] sent {len(new_posts)} alert(s) to Slack")

    return 0


if __name__ == "__main__":
    sys.exit(main())
