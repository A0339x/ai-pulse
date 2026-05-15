"""Generate today's AI Pulse issue and prepend it to data.js.

Run locally:
    cd "AI News Digest"
    pip install -r scripts/requirements.txt
    python scripts/generate_digest.py

Run in CI: see .github/workflows/generate-digest.yml

Expects the `claude` CLI to be on PATH (Claude Code).
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

# Allow `python scripts/generate_digest.py` from project root
sys.path.insert(0, str(Path(__file__).parent))
from sources import fetch_built_with_ai, fetch_climbing, fetch_shipping  # noqa: E402

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "data.js"


# ─── PROMPT BUILDER ───────────────────────────────────────────────────

def build_prompt(today: str, today_id: str, shipping, climbing, built) -> str:
    """Compose the editorial prompt with raw source material."""

    shipping_text = "\n".join(
        f"- [{s['source']}] {s['title']}\n  URL: {s['url']}\n  Published: {s.get('published','')}\n  Summary: {s['summary']}"
        for s in shipping[:25]
    ) or "(no shipping items found)"

    climbing_text = "\n".join(
        f"- {c['name']} ({c['stars']:,}★, {c['lang'] or 'multi-lang'})\n  URL: {c['url']}\n  Topics: {', '.join(c['topics'][:6])}\n  Desc: {c['desc']}"
        for c in climbing[:20]
    ) or "(no climbing items found)"

    built_text = "\n".join(
        f"- [{b['source']}, {b.get('points',0)}pts, {b.get('comments',0)} comments] {b['title']}\n  URL: {b['url']}\n  Author: {b.get('author','')}\n  Body: {b.get('summary','')[:400]}"
        for b in built[:30]
    ) or "(no built-with-AI items found)"

    return f"""You are the editor of AI Pulse, a daily two-minute scan of what's shipping, climbing, and getting built in the AI space. The reader is a builder who wants to stay on the cutting edge of tools they can actually use. Today is {today}.

Below are raw source items pulled this morning from three buckets. Your job is to curate the most interesting 2-4 items per section and write each one up in the house voice.

=== HOUSE VOICE ===
- Direct, plain, no analyst hedging. Active voice. Short sentences.
- Tell the reader what's NEW, not what already existed. Skip background.
- Every body paragraph leads with the change or the build, not the company.
- Write like a sharp friend texting you, not a corporate blog. No "revolutionary," no "groundbreaking," no "game-changing," no em dashes (use -- double dash instead).
- The reader is technical and busy. Assume they know what an LLM is, a transformer is, a prompt is, RAG is, an agent is. Don't define those. Do briefly define genuinely new things.
- End the body where the body ends. No call-to-action sentence, no "you could try X" closer. The reader knows what to do with information.

=== CURATION BAR ===
- SHIPPING: include only items where something genuinely new exists today that didn't yesterday. New model, new feature, new capability, new pricing tier. Skip blog posts that are pure marketing recaps. 2-4 items.
- CLIMBING: pick repos that change what's possible, even slightly. Skip yet-another-wrapper-around-the-OpenAI-SDK. Prefer repos with a clear novel idea, useful tooling, or strong workflow. 2-4 items.
- BUILT WITH AI: pick posts that DOCUMENT a real workflow end-to-end -- which tools, in which order, with which prompts, what broke, what worked. Skip "I asked ChatGPT to do X and it was cool." The reader should be able to attempt the same build this weekend. 1-3 items. If nothing in the source list meets the bar, return an empty items array for this section.

=== SOURCE MATERIAL ===

--- SHIPPING (recent AI lab / tool blog posts) ---
{shipping_text}

--- CLIMBING (GitHub repos gaining stars in AI topics) ---
{climbing_text}

--- BUILT WITH AI (HN / Reddit posts about real AI builds) ---
{built_text}

=== OUTPUT FORMAT ===
Return ONLY valid JSON. No markdown fencing. No commentary. No explanation. Just the raw JSON object below, with the schema exactly as shown.

Use straight quotes only. Use -- (double dash) instead of em dashes. Use the exact id and date values shown.

{{
  "id": "{today_id}",
  "date": "{today}",
  "title": "AI Pulse",
  "subtitle": "one short line summarizing today's flavor (e.g. 'Anthropic ships a new tool, agents week on GitHub, and someone rebuilt Photoshop')",
  "intro": "2-3 sentences. What's the shape of today? What should the reader pay closest attention to?",
  "sections": [
    {{
      "label": "SHIPPING",
      "blurb": "one short sentence framing today's shipping items",
      "items": [
        {{
          "title": "exact post / feature title",
          "url": "the source URL",
          "source": "publisher name (e.g. Anthropic, OpenAI)",
          "body": "one paragraph. What changed, what it lets you do today that you couldn't yesterday. ~80-120 words."
        }}
      ]
    }},
    {{
      "label": "CLIMBING",
      "blurb": "one short sentence framing this week's GitHub momentum",
      "items": [
        {{
          "title": "repo full name (e.g. owner/repo)",
          "url": "the GitHub URL",
          "source": "github.com",
          "stars": "★ count as a string, e.g. '12.3k'",
          "lang": "primary language",
          "body": "one paragraph. What the repo does, the novel idea, who it's for. ~80-120 words."
        }}
      ]
    }},
    {{
      "label": "BUILT WITH AI",
      "blurb": "one short sentence framing today's standout build",
      "items": [
        {{
          "title": "the build's title",
          "url": "the source URL",
          "source": "Hacker News / r/SubName",
          "author": "the author handle if available",
          "body": "one paragraph. What they built, the workflow they documented, the tools in order. ~100-150 words."
        }}
      ]
    }}
  ],
  "closing": "one short sentence sign-off"
}}
"""


# ─── CLAUDE CALL ──────────────────────────────────────────────────────

def call_claude(prompt: str) -> str:
    """Call Claude via the `claude` CLI (Claude Code)."""
    result = subprocess.run(
        ["claude", "-p", prompt],
        capture_output=True, text=True, timeout=600,
    )
    if result.returncode != 0 or not result.stdout.strip():
        raise RuntimeError(
            f"`claude -p` failed (exit {result.returncode}): {result.stderr[:500]}"
        )
    return result.stdout.strip()


# ─── JSON EXTRACTION + WRITE ──────────────────────────────────────────

def extract_json(text: str) -> dict:
    """Pull the JSON object out of Claude's response, tolerant to fencing."""
    # Strip ```json ... ``` if present
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    # Find first { and last }
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1:
        raise ValueError(f"No JSON object found in response. Raw start: {text[:300]}")
    return json.loads(text[start:end + 1])


def prepend_to_data_js(entry: dict) -> None:
    """Insert entry at the top of the DIGESTS array in data.js."""
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"{DATA_FILE} does not exist. Create it first.")

    content = DATA_FILE.read_text(encoding="utf-8")
    marker = "const DIGESTS = ["
    idx = content.find(marker)
    if idx == -1:
        raise ValueError("Could not find `const DIGESTS = [` in data.js")
    insert_at = idx + len(marker)

    # Check if same-day entry already exists -- replace instead of stacking
    existing_id = entry["id"]
    if f'"id": "{existing_id}"' in content:
        print(f"[write] entry for {existing_id} already exists -- skipping. "
              "Delete the existing entry manually if you want to regenerate.", file=sys.stderr)
        return

    pretty = json.dumps(entry, indent=2, ensure_ascii=False)
    pretty_indented = "\n  " + pretty.replace("\n", "\n  ") + ","
    new_content = content[:insert_at] + pretty_indented + content[insert_at:]
    DATA_FILE.write_text(new_content, encoding="utf-8")
    print(f"[write] prepended entry {existing_id} to {DATA_FILE.name}")


# ─── MAIN ─────────────────────────────────────────────────────────────

def main() -> int:
    now = datetime.now(timezone.utc)
    today = now.strftime("%B %d, %Y").replace(" 0", " ")
    today_id = now.strftime("%Y-%m-%d")

    print(f"[run] generating AI Pulse for {today}")

    print("[fetch] shipping...")
    shipping = fetch_shipping()
    print(f"[fetch] shipping: {len(shipping)} items")

    print("[fetch] climbing...")
    climbing = fetch_climbing()
    print(f"[fetch] climbing: {len(climbing)} repos")

    print("[fetch] built with AI...")
    built = fetch_built_with_ai()
    print(f"[fetch] built: {len(built)} posts")

    if not (shipping or climbing or built):
        print("[abort] no source material at all -- network down?", file=sys.stderr)
        return 2

    prompt = build_prompt(today, today_id, shipping, climbing, built)

    # Save the raw prompt + sources for debugging
    debug_dir = ROOT / "scripts" / ".debug"
    debug_dir.mkdir(exist_ok=True)
    (debug_dir / f"{today_id}-prompt.txt").write_text(prompt, encoding="utf-8")
    (debug_dir / f"{today_id}-sources.json").write_text(
        json.dumps({"shipping": shipping, "climbing": climbing, "built": built},
                   indent=2, default=str),
        encoding="utf-8",
    )

    print("[claude] calling model...")
    response = call_claude(prompt)
    (debug_dir / f"{today_id}-response.txt").write_text(response, encoding="utf-8")

    entry = extract_json(response)

    # Sanity checks
    assert entry.get("id") == today_id, f"id mismatch: got {entry.get('id')!r}, want {today_id!r}"
    assert entry.get("sections"), "no sections in response"

    prepend_to_data_js(entry)
    print(f"[done] {today_id}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
