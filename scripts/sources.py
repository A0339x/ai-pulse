"""Source fetchers for AI Pulse.

Three buckets:
  - shipping: AI lab / tool-maker blog posts (RSS-first)
  - climbing: GitHub repos in AI/ML/agent topics gaining attention recently
  - built_with_ai: HN + Reddit posts describing end-to-end builds and workflows

Each fetcher returns a list of dicts with a consistent shape so the prompt
builder can mix them freely. Failures are logged and swallowed -- one dead
feed should never take down the whole run.
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

import feedparser
import requests

# State directory -- tracked in git so CI runs persist what we've already seen
STATE_DIR = Path(__file__).parent / "state"
STATE_DIR.mkdir(exist_ok=True)


UA = "AI-Pulse-Digest/1.0 (+https://github.com/gregoryesman/ai-news-digest)"
TIMEOUT = 15


# ─── SHIPPING (AI lab blogs) ──────────────────────────────────────────

# Primary RSS feeds. Anthropic doesn't publish RSS, so we scrape its
# /news page separately (see fetch_anthropic_news).
RSS_FEEDS = [
    ("OpenAI",          "https://openai.com/news/rss.xml"),
    ("OpenAI Blog",     "https://openai.com/blog/rss.xml"),
    ("Google AI",       "https://blog.google/technology/ai/rss/"),
    ("DeepMind",        "https://deepmind.google/blog/rss.xml"),
    ("Hugging Face",    "https://huggingface.co/blog/feed.xml"),
    ("Meta AI",         "https://ai.meta.com/blog/rss/"),
    ("Vercel",          "https://vercel.com/atom"),
]


def fetch_anthropic_news(max_items: int = 10) -> list[dict[str, Any]]:
    """Scrape claude.com/anthropic.com /news page (no RSS available).

    Pulls slugs in source order (newest first on the site), converts each
    slug to a human title, and fetches og:description for the top few.
    """
    try:
        resp = requests.get(
            "https://www.anthropic.com/news",
            headers={"User-Agent": "Mozilla/5.0 (compatible; AI-Pulse/1.0)"},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        html = resp.text
    except Exception as e:
        print(f"[shipping] Anthropic news scrape error: {e}", file=sys.stderr)
        return []

    # Pull /news/<slug> links, dedupe preserving order
    slug_re = re.compile(r'href="(/news/[a-z0-9\-]+)"')
    slugs: list[str] = []
    seen: set[str] = set()
    for m in slug_re.finditer(html):
        path = m.group(1)
        if path in seen or path == "/news/":
            continue
        seen.add(path)
        slugs.append(path)
        if len(slugs) >= max_items:
            break

    out = []
    for path in slugs:
        slug = path.rsplit("/", 1)[-1]
        title = slug.replace("-", " ").strip()
        title = title[:1].upper() + title[1:]  # capitalize first word
        url = f"https://www.anthropic.com{path}"
        out.append({
            "source": "Anthropic",
            "title": title,
            "url": url,
            "published": "",  # no date on the index page
            "summary": "",    # Claude can read titles; fetching each post would slow the run
        })
    return out


def fetch_bytedance_seed(max_first_run: int = 5) -> list[dict[str, Any]]:
    """Pull ByteDance Seed research model pages (Seedance, Seedream, etc.).

    Seed publishes one page per model under /en/<slug>. We scrape /en/research
    to discover the current set, track which slugs we've surfaced in
    state/seen_bytedance.json, and only return newly-appearing ones after
    the first baseline run.

    The user cares specifically about video generation (Seedance + anything
    else video-related), but ByteDance ships across video / image / audio /
    multimodal, so we tag video items more prominently in the title.
    """
    state_file = STATE_DIR / "seen_bytedance.json"
    seen: set[str] = set()
    if state_file.exists():
        try:
            seen = set(json.loads(state_file.read_text()))
        except Exception as e:
            print(f"[shipping] ByteDance state file unreadable: {e}", file=sys.stderr)

    try:
        resp = requests.get(
            "https://seed.bytedance.com/en/research",
            headers={"User-Agent": "Mozilla/5.0 (compatible; AI-Pulse/1.0)"},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        html = resp.text
    except Exception as e:
        print(f"[shipping] ByteDance Seed scrape error: {e}", file=sys.stderr)
        return []

    # Extract /en/<slug> model links. Skip nav links (blog) and careers/edge pages.
    skip = {"blog", "research", "seedearlycareer", "seed-edge", "team", "about", "careers"}
    slugs: list[str] = []
    for m in re.finditer(r'href="/en/([a-z0-9_\-]+)"', html):
        s = m.group(1)
        if s in skip or s in slugs:
            continue
        slugs.append(s)

    if not seen:
        new_slugs = slugs[-max_first_run:]
    else:
        new_slugs = [s for s in slugs if s not in seen]

    state_file.write_text(json.dumps(sorted(slugs)))

    out = []
    for slug in new_slugs:
        # Humanize the slug. seedance2_0 -> "Seedance 2.0"
        title = slug.replace("_", ".").replace("-", " ")
        title = title[:1].upper() + title[1:]
        is_video = any(k in slug.lower() for k in ("seedance", "video", "animate", "vidu"))
        if is_video:
            title = f"[Video] {title}"
        out.append({
            "source": "ByteDance Seed",
            "title": title,
            "url": f"https://seed.bytedance.com/en/{slug}",
            "published": "",
            "summary": "",
        })
    return out


# Autonomous agent products we watch for new GitHub releases. The user asked
# for OpenClaw + Hermes + "other fully autonomous solutions" so this captures
# the well-known agent harnesses. Add more by extending the list.
WATCHED_AGENT_REPOS = [
    "openclaw/openclaw",
    "nousresearch/hermes-agent",
    "All-Hands-AI/OpenHands",
    "Aider-AI/aider",
    "stitionai/devika",
    "joaomdmoura/crewAI",
    "geekan/MetaGPT",
    "Significant-Gravitas/AutoGPT",
]


# YouTube creators watched for new videos. Add a tuple of (display_name, channel_id).
# Get channel_id by visiting the channel page and grepping for `"browseId":"UC..."`.
WATCHED_YOUTUBE_CHANNELS = [
    ("Nate Herk | AI Automation", "UC2ojq-nuP8ceeHqiroeKhBA"),
]


def fetch_youtube_uploads() -> list[dict[str, Any]]:
    """Pull the latest videos from each watched YouTube channel via Atom feed."""
    out: list[dict[str, Any]] = []
    for name, channel_id in WATCHED_YOUTUBE_CHANNELS:
        url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}"
        try:
            feed = feedparser.parse(url, request_headers={"User-Agent": UA})
            for entry in feed.entries[:5]:
                video_url = entry.get("link", "")
                title = entry.get("title", "").strip()
                if not video_url or not title:
                    continue
                out.append({
                    "source": f"YouTube · {name}",
                    "title":  title,
                    "url":    video_url,
                    "published": entry.get("published", ""),
                    "summary": "",
                })
        except Exception as e:
            print(f"[shipping] YouTube {name} error: {e}", file=sys.stderr)
    return out


def fetch_agent_releases() -> list[dict[str, Any]]:
    """Pull latest GitHub release for each watched autonomous-agent repo.

    State-tracks the release tag per repo in seen_agent_releases.json --
    only surfaces a release once. First run baselines silently.
    """
    state_file = STATE_DIR / "seen_agent_releases.json"
    seen: dict[str, str] = {}
    if state_file.exists():
        try:
            seen = json.loads(state_file.read_text())
        except Exception as e:
            print(f"[shipping] agent-releases state unreadable: {e}", file=sys.stderr)

    first_run = not seen

    headers = {"User-Agent": UA, "Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    out = []
    current: dict[str, str] = {}
    for repo in WATCHED_AGENT_REPOS:
        try:
            resp = requests.get(
                f"https://api.github.com/repos/{repo}/releases/latest",
                headers=headers, timeout=TIMEOUT,
            )
            if resp.status_code == 404:
                continue  # repo has no published releases
            resp.raise_for_status()
            data = resp.json()
        except Exception as e:
            print(f"[shipping] agent release {repo} error: {e}", file=sys.stderr)
            continue

        tag = data.get("tag_name") or ""
        if not tag:
            continue
        current[repo] = tag

        if first_run or seen.get(repo) == tag:
            continue  # already surfaced this tag (or baselining)

        body_excerpt = (data.get("body") or "").strip()[:500]
        out.append({
            "source":    f"{repo} (GitHub release)",
            "title":     f"{repo} {tag}: {data.get('name') or ''}".strip(": "),
            "url":       data.get("html_url", f"https://github.com/{repo}/releases"),
            "published": data.get("published_at", ""),
            "summary":   body_excerpt,
        })

    # Persist current snapshot so next run only flags newer tags
    state_file.write_text(json.dumps(current, indent=2, sort_keys=True))
    return out


def fetch_manus_updates(max_first_run: int = 5) -> list[dict[str, Any]]:
    """Pull Manus product announcements from their sitemap.

    Manus is JS-rendered with no RSS and no dates in the sitemap. So we
    track which slugs we've already surfaced in `state/seen_manus.json`
    -- subsequent runs only return slugs that newly appear in the sitemap.
    First run returns the most-likely-recent product posts (sitemap-tail
    heuristic) capped at `max_first_run`.
    """
    state_file = STATE_DIR / "seen_manus.json"
    seen: set[str] = set()
    if state_file.exists():
        try:
            seen = set(json.loads(state_file.read_text()))
        except Exception as e:
            print(f"[shipping] Manus state file unreadable: {e}", file=sys.stderr)

    try:
        resp = requests.get(
            "https://manus.im/sitemap.xml",
            headers={"User-Agent": "Mozilla/5.0 (compatible; AI-Pulse/1.0)"},
            timeout=TIMEOUT,
        )
        resp.raise_for_status()
        xml = resp.text
    except Exception as e:
        print(f"[shipping] Manus sitemap error: {e}", file=sys.stderr)
        return []

    # Extract all /blog/<slug> URLs in sitemap order
    all_slugs: list[str] = []
    for m in re.finditer(r"<loc>https://manus\.im/blog/([^<]+)</loc>", xml):
        slug = m.group(1)
        if slug not in all_slugs:
            all_slugs.append(slug)

    # Filter: product posts only -- skip SEO listicles
    def is_product_post(slug: str) -> bool:
        s = slug.lower()
        if s.startswith(("best-", "top-", "ai-")):
            return False
        return "manus" in s or s.startswith("introducing-") or "-release" in s or "launch" in s

    product_slugs = [s for s in all_slugs if is_product_post(s)]

    # First run: surface tail of sitemap (often newest-last) capped to N.
    # Subsequent runs: only slugs new since last seen.
    if not seen:
        new_slugs = product_slugs[-max_first_run:]
    else:
        new_slugs = [s for s in product_slugs if s not in seen]

    # Persist the full current product slug set so we only flag truly new ones next time
    state_file.write_text(json.dumps(sorted(product_slugs)))

    out = []
    for slug in new_slugs:
        title = slug.replace("-", " ").replace("_", " ")
        title = title[:1].upper() + title[1:]
        out.append({
            "source": "Manus",
            "title": title,
            "url": f"https://manus.im/blog/{slug}",
            "published": "",
            "summary": "",
        })
    return out


def fetch_shipping(max_age_days: int = 7) -> list[dict[str, Any]]:
    """Pull recent posts from AI lab / tool blogs."""
    cutoff = datetime.now(timezone.utc) - timedelta(days=max_age_days)
    out: list[dict[str, Any]] = []

    # Anthropic first (user-requested anchor source)
    out.extend(fetch_anthropic_news())

    # Manus product updates (sitemap-tracked, new posts only after first run)
    out.extend(fetch_manus_updates())

    # ByteDance Seed (Seedance video gen + sibling models)
    out.extend(fetch_bytedance_seed())

    # Autonomous agent products -- new GitHub releases only
    out.extend(fetch_agent_releases())

    for source_name, url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url, request_headers={"User-Agent": UA})
            if feed.bozo and not feed.entries:
                print(f"[shipping] skip {source_name}: {feed.bozo_exception}", file=sys.stderr)
                continue
            for entry in feed.entries[:8]:
                published = _entry_datetime(entry)
                if published and published < cutoff:
                    continue
                summary = _strip_html(getattr(entry, "summary", "") or "")[:600]
                out.append({
                    "source": source_name,
                    "title": entry.get("title", "").strip(),
                    "url": entry.get("link", ""),
                    "published": published.isoformat() if published else "",
                    "summary": summary,
                })
        except Exception as e:
            print(f"[shipping] error {source_name}: {e}", file=sys.stderr)

    # Dedupe by URL
    seen_urls: set[str] = set()
    deduped = []
    for item in out:
        if item["url"] and item["url"] not in seen_urls:
            seen_urls.add(item["url"])
            deduped.append(item)
    return deduped


# ─── CLIMBING (GitHub trending AI repos) ──────────────────────────────

# Topics that reliably capture the AI / agent / model-tooling ecosystem.
# We OR them together in the GitHub search query.
GITHUB_TOPICS = [
    "llm", "ai-agents", "agent", "agents", "generative-ai",
    "rag", "ai", "ml", "mcp", "anthropic", "claude",
    "stable-diffusion", "diffusion-models", "ai-tools",
    "autonomous-agents", "autonomous-agent", "agentic-ai",
    "agent-framework", "coding-agent", "ai-video",
    "video-generation", "text-to-video",
]


def fetch_climbing(lookback_days: int = 30, per_topic: int = 8) -> list[dict[str, Any]]:
    """Pull AI-flavored repos that have gained traction recently.

    GitHub's `topic:X topic:Y` syntax ANDs the topics, which is too narrow.
    So we run one query per topic and merge -- gets a wide net of currently-
    hot AI work. We bias toward repos *created* recently (rather than just
    pushed) to surface new things rather than long-running giants.
    """
    since_created = (datetime.now(timezone.utc) - timedelta(days=180)).strftime("%Y-%m-%d")
    since_pushed = (datetime.now(timezone.utc) - timedelta(days=lookback_days)).strftime("%Y-%m-%d")

    headers = {"User-Agent": UA, "Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    by_url: dict[str, dict[str, Any]] = {}

    for topic in GITHUB_TOPICS:
        q = f"topic:{topic} created:>{since_created} pushed:>{since_pushed} stars:>50"
        try:
            resp = requests.get(
                "https://api.github.com/search/repositories",
                params={"q": q, "sort": "stars", "order": "desc", "per_page": per_topic},
                headers=headers, timeout=TIMEOUT,
            )
            resp.raise_for_status()
            data = resp.json()
        except Exception as e:
            print(f"[climbing] topic '{topic}' error: {e}", file=sys.stderr)
            continue

        for repo in data.get("items", []):
            url = repo.get("html_url", "")
            if not url or url in by_url:
                continue
            by_url[url] = {
                "name":     repo.get("full_name", ""),
                "url":      url,
                "desc":     (repo.get("description") or "").strip(),
                "stars":    repo.get("stargazers_count", 0),
                "lang":     repo.get("language") or "",
                "topics":   repo.get("topics", []) or [],
                "pushed":   repo.get("pushed_at", ""),
                "created":  repo.get("created_at", ""),
                "matched_topic": topic,
            }

    out = sorted(by_url.values(), key=lambda r: r["stars"], reverse=True)
    return out


# ─── BUILT WITH AI (HN + Reddit) ──────────────────────────────────────

# Algolia HN search: surfaces stories with the words we care about,
# filtered to ones with real engagement (points threshold).
HN_QUERIES = [
    "AI workflow",
    "I built with AI",
    "Show HN AI",
    "AI pipeline",
    "AI agent",
    "made with AI",
]

REDDIT_SUBS = [
    "LocalLLaMA",
    "StableDiffusion",
    "aivideo",
    "ChatGPTCoding",
    "ClaudeAI",
    "singularity",
]


_AI_KEYWORDS = re.compile(
    r"\b(ai|llm|gpt|claude|gemini|anthropic|openai|agent|agentic|rag|"
    r"diffusion|stable\s*diffusion|fine[-\s]?tune|prompt|embedding|"
    r"transformer|model|inference|copilot|cursor|midjourney|suno|"
    r"comfyui|generative|chatgpt|local\s*llama|llama|mistral|whisper|"
    r"mcp|tool\s*use|context\s*window)\b",
    re.IGNORECASE,
)


def fetch_built_with_ai(max_age_days: int = 3) -> list[dict[str, Any]]:
    """Pull HN + Reddit posts describing real AI builds and workflows."""
    out: list[dict[str, Any]] = []

    cutoff_ts = int((datetime.now(timezone.utc) - timedelta(days=max_age_days)).timestamp())

    # HN front page: pull top stories, keep AI-flavored ones, drop the rest
    try:
        resp = requests.get(
            "https://hn.algolia.com/api/v1/search",
            params={
                "tags": "front_page",
                "numericFilters": f"points>50,created_at_i>{cutoff_ts}",
                "hitsPerPage": 50,
            },
            headers={"User-Agent": UA}, timeout=TIMEOUT,
        )
        resp.raise_for_status()
        for hit in resp.json().get("hits", []):
            title = hit.get("title") or ""
            if not _AI_KEYWORDS.search(title):
                continue
            url = hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}"
            out.append({
                "source":  "Hacker News",
                "title":   title.strip(),
                "url":     url,
                "author":  hit.get("author", ""),
                "points":  hit.get("points", 0),
                "comments": hit.get("num_comments", 0),
                "summary": "",
            })
    except Exception as e:
        print(f"[built] HN front page error: {e}", file=sys.stderr)

    # HN keyword search (catches AI posts that didn't reach the front page)
    for query in HN_QUERIES:
        try:
            resp = requests.get(
                "https://hn.algolia.com/api/v1/search",
                params={
                    "query": query,
                    "tags": "story",
                    "numericFilters": f"points>20,created_at_i>{cutoff_ts}",
                    "hitsPerPage": 8,
                },
                headers={"User-Agent": UA}, timeout=TIMEOUT,
            )
            resp.raise_for_status()
            for hit in resp.json().get("hits", []):
                url = hit.get("url") or f"https://news.ycombinator.com/item?id={hit.get('objectID')}"
                out.append({
                    "source":  "Hacker News",
                    "title":   hit.get("title", "").strip(),
                    "url":     url,
                    "author":  hit.get("author", ""),
                    "points":  hit.get("points", 0),
                    "comments": hit.get("num_comments", 0),
                    "summary": "",
                })
        except Exception as e:
            print(f"[built] HN query '{query}' error: {e}", file=sys.stderr)

    # Reddit (public JSON)
    for sub in REDDIT_SUBS:
        try:
            resp = requests.get(
                f"https://www.reddit.com/r/{sub}/top.json",
                params={"t": "day", "limit": 10},
                headers={"User-Agent": UA}, timeout=TIMEOUT,
            )
            resp.raise_for_status()
            for child in resp.json().get("data", {}).get("children", []):
                d = child.get("data", {})
                if d.get("created_utc", 0) < cutoff_ts:
                    continue
                # Skip pure image/meme posts -- we want write-ups
                title = d.get("title", "")
                body = (d.get("selftext") or "")[:800]
                if not body and not d.get("url", "").startswith(("http://", "https://")):
                    continue
                out.append({
                    "source":  f"r/{sub}",
                    "title":   title.strip(),
                    "url":     f"https://reddit.com{d.get('permalink', '')}",
                    "author":  d.get("author", ""),
                    "points":  d.get("score", 0),
                    "comments": d.get("num_comments", 0),
                    "summary": body,
                })
        except Exception as e:
            print(f"[built] reddit /r/{sub} error: {e}", file=sys.stderr)

    # Dedupe by URL
    seen = set()
    deduped = []
    for item in out:
        if item["url"] and item["url"] not in seen:
            seen.add(item["url"])
            deduped.append(item)
    # Sort by engagement so the prompt sees the most-loved first
    deduped.sort(key=lambda x: x.get("points", 0), reverse=True)
    return deduped


# ─── HELPERS ──────────────────────────────────────────────────────────

_HTML_TAG_RE = re.compile(r"<[^>]+>")


def _strip_html(s: str) -> str:
    return _HTML_TAG_RE.sub("", s).strip()


def _entry_datetime(entry: Any) -> datetime | None:
    for key in ("published_parsed", "updated_parsed"):
        t = entry.get(key)
        if t:
            try:
                return datetime(*t[:6], tzinfo=timezone.utc)
            except (TypeError, ValueError):
                pass
    return None


# ─── DEBUG / STANDALONE ───────────────────────────────────────────────

if __name__ == "__main__":
    import json
    print("=== SHIPPING ===")
    for item in fetch_shipping()[:5]:
        print(json.dumps(item, indent=2, default=str))
    print("\n=== CLIMBING ===")
    for item in fetch_climbing()[:5]:
        print(json.dumps(item, indent=2, default=str))
    print("\n=== BUILT WITH AI ===")
    for item in fetch_built_with_ai()[:5]:
        print(json.dumps(item, indent=2, default=str))
