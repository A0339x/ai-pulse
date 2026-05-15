# AI Pulse — Cutting-Edge Daily

A two-minute morning scan of what's shipping, climbing, and getting built in AI. Static site, auto-generated daily, designed to keep your skills on the leading edge of tools you can actually use.

## What you get every morning

Three sections per issue:

1. **SHIPPING** — new features and releases from:
   - **AI labs**: Anthropic, OpenAI, Google AI, DeepMind, HuggingFace, Meta AI, Vercel (RSS where available; Anthropic scraped from `/news`)
   - **Manus**: scraped from sitemap, filtered to product posts, state-tracked
   - **ByteDance Seed**: scraped from `/en/research`, captures Seedance (video), Seedream (image), Seed-Music, etc. — items containing `seedance`/`video`/`animate` get a `[Video]` tag in the title
   - **Autonomous agent products**: GitHub releases for OpenClaw, OpenHands, Aider, AutoGPT, MetaGPT, CrewAI, Devika — new tags only, never the same release twice

   State files in `scripts/state/` track what's been surfaced per source so nothing repeats.
2. **CLIMBING** — AI repos pulling in GitHub stars right now. Pulled from the GitHub search API (topics: `llm`, `ai-agents`, `agent`, `generative-ai`, `rag`, etc.) sorted by recent star velocity.
3. **BUILT WITH AI** — wild, well-documented use cases and end-to-end workflows from Hacker News and curated AI subreddits (`r/LocalLLaMA`, `r/StableDiffusion`, `r/aivideo`, `r/ChatGPTCoding`, `r/ClaudeAI`).

## Viewing the site

It's a single static HTML file. To view:

```bash
open index.html
```

Or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

To host it publicly, push the repo to GitHub and turn on GitHub Pages from the `main` branch.

## Running the generator manually

```bash
pip install -r scripts/requirements.txt
python scripts/generate_digest.py
```

The script:

1. Pulls source items from RSS / GitHub API / HN Algolia / Reddit JSON
2. Builds a prompt with the raw material
3. Calls Claude (prefers the `claude` CLI; falls back to `ANTHROPIC_API_KEY` direct API)
4. Parses the JSON response
5. Prepends today's issue to the top of `data.js`

Debug artifacts (prompt, sources, raw response) are written to `scripts/.debug/` per day, gitignored.

## The automation

Two workflows run on schedule:

1. **`.github/workflows/generate-digest.yml`** — daily at 11:00 UTC (~7am ET). Installs Python deps + Claude Code CLI, runs the generator, prepends today's issue to `data.js`, commits + pushes.
2. **`.github/workflows/alert-poller.yml`** — every 15 min. Polls Anthropic, OpenAI, DeepMind, Google AI, ByteDance Seed (Seedance + sibling models), autonomous-agent product release feeds (OpenClaw, Hermes Agent, OpenHands, Aider, etc.), and watched YouTube creators (Nate Herk). When something new appears (vs. `scripts/state/seen_alerts.json`), posts a one-line ping to Slack with the title + link. First run is silent — it just baselines the state so you don't get spammed with everything already published.

GitHub repo secrets needed:

- `SLACK_WEBHOOK_URL` — Slack incoming webhook URL (channel is fixed by the webhook itself)
- `GITHUB_TOKEN` — auto-provided by GitHub Actions, used to bump rate limits on the GitHub search API and to commit/push the new issue

The daily digest uses `claude -p` directly (Claude Code CLI), same pattern as Patient Investor Digest.

Without `SLACK_BOT_TOKEN` and `SLACK_AI_PULSE_CHANNEL` set, the alerter prints new posts to the workflow log but doesn't ping anywhere.

## Adding new sources

- **RSS shipping feeds** → edit `RSS_FEEDS` in `scripts/sources.py`. Each entry is `(source_name, rss_url)`. Dead feeds are logged and skipped.
- **Watched agent repos** (GitHub releases) → edit `WATCHED_AGENT_REPOS` in `scripts/sources.py`. Each new release tag gets surfaced exactly once.
- **Watched YouTube channels** → edit `WATCHED_YOUTUBE_CHANNELS` in `scripts/sources.py`. Format: `(display_name, channel_id)`. Get the channel ID by visiting any channel page and grepping its HTML for `"browseId":"UC..."`.
- **GitHub Climbing topics** → edit `GITHUB_TOPICS` in `scripts/sources.py`. One query is fired per topic and results merge.
- **HN queries** → edit `HN_QUERIES` in `scripts/sources.py`.
- **Subreddits** → edit `REDDIT_SUBS` in `scripts/sources.py`.

After editing sources, run the generator locally once to confirm the new sources return material:

```bash
python scripts/sources.py  # standalone debug — dumps a sample of each bucket
```

## Editorial guidelines (used by the prompt)

The prompt in `scripts/generate_digest.py` enforces:

- **House voice**: direct, short sentences, active voice, no analyst hedging, no marketing words
- **`--` instead of em dashes** (matches the Patient Investor Digest convention)
- **No CTA closers**: every item ends where the body ends -- no "you could try X" sentence
- **Curation bar**: no marketing recaps in Shipping, no OpenAI-SDK wrappers in Climbing, no "I asked ChatGPT to do X" in Built With AI

Edit those rules in `build_prompt()` in `scripts/generate_digest.py`.

## File layout

```
AI News Digest/
├── index.html              # the site
├── data.js                 # issues array (new ones prepended to top)
├── README.md               # you are here
├── scripts/
│   ├── generate_digest.py  # main entry: fetch → prompt → claude → write
│   ├── sources.py          # all source fetchers
│   ├── requirements.txt
│   ├── state/              # per-source "already seen" sets (tracked in git)
│   └── .debug/             # per-day prompt/sources/response dumps (gitignored)
└── .github/workflows/
    ├── generate-digest.yml # daily cron at 11:00 UTC
    └── alert-poller.yml    # every 15 min -- new posts → Slack ping
```

## Running the alerter manually

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/... python3 scripts/alert_new_posts.py
```

Or without the webhook, just to see what would have been sent:

```bash
python3 scripts/alert_new_posts.py
```
