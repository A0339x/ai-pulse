// data.js — AI Pulse
// The daily generator prepends new issues to the TOP of this array.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    "id": "2026-05-15",
    "date": "May 15, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic drops Opus 4.7, Codex goes mobile, and builders are shipping offline robots and smart speakers from their couch",
    "intro": "Big model day: Claude Opus 4.7 lands and OpenAI gives Codex a mobile cockpit. On the repo side, the theme is squeezing more out of what you already have -- token-saving proxies, hardware-aware model pickers, code-to-graph skills. The Reddit builds this week are unusually hands-on: a fully offline Jetson robot and a hand-built walnut smart speaker, both with full parts lists.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "A new flagship model, a mobile coding agent, and gateway controls worth flipping.",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Opus 4.7 is live as Anthropic's new top-tier model. It's the model powering the agent you're probably reading this through -- Claude Code now defaults to it for harder coding and reasoning work, and the 1M context variant ('claude-opus-4-7[1m]') is exposed for long-horizon tasks. Pricing and rate-limit posture haven't moved dramatically, but the model card claims meaningful jumps on agentic coding benchmarks vs 4.6. If you've been pinning to Sonnet for cost reasons, the speed gap is narrower than before, so the trade-off math is worth redoing.",
            "try": "Run your hardest open Claude Code task on Opus 4.7 and compare the diff quality against the same prompt on Sonnet 4.6."
          },
          {
            "title": "Work with Codex from anywhere",
            "url": "https://openai.com/index/work-with-codex-from-anywhere",
            "source": "OpenAI",
            "body": "Codex is now drivable from the ChatGPT mobile app. You can kick off a coding task on your laptop, then monitor, steer, and approve from your phone -- it talks to the same remote sandbox, so the agent keeps working while you're away from the desk. This pairs with last week's Windows sandbox release: Codex now has a coherent story across macOS, Windows, and mobile-as-remote. For long-running refactors or migrations, you stop having to babysit a terminal.",
            "try": "Start a Codex task that takes more than 10 minutes (a dependency bump or test backfill), close your laptop, and approve the PR from your phone on the way to lunch."
          },
          {
            "title": "Sort providers by cost, latency, or throughput on AI Gateway",
            "url": "https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway",
            "source": "Vercel",
            "body": "Vercel's AI Gateway now lets you explicitly rank providers behind a model by cost, time-to-first-token, or tokens-per-second. The default order is a blended score; the new `sort` param hands you the dial. Ranking is computed at request time, so newly added providers and shifting latencies flow through with no code changes. For any model with multiple providers (most of the big ones), the cost spread between cheapest and default can be 2-3x.",
            "try": "Add `sort: 'cost'` to one production call against a multi-provider model and watch your gateway dashboard for a day to see the actual savings."
          },
          {
            "title": "Granite Embedding Multilingual R2",
            "url": "https://huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2",
            "source": "Hugging Face",
            "body": "IBM dropped a new Apache 2.0 multilingual embedding model with a 32K context window and sub-100M parameters. The pitch is best-in-class retrieval quality at that size, which matters if you're embedding at scale and watching the bill. 32K context for an embedding model is unusual -- you can chunk a lot less aggressively, or skip chunking entirely for medium-length docs. Permissive license means you can ship it inside a product without legal review.",
            "try": "Swap your current embedding model for Granite R2 on one collection, re-index, and run your existing retrieval eval set to compare recall@10."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "This week's repos are all about getting more from what you already pay for.",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "48.5k",
            "lang": "Rust",
            "body": "A CLI proxy that sits between your coding agent and the LLM and claims 60-90% token reduction on common dev commands. It's a single Rust binary, zero deps. The trick is intercepting predictable patterns (file reads, directory listings, repeated context) and serving cached or compressed versions instead of sending the full payload upstream every turn. If you're paying per-token for Claude Code or Codex, this is the first repo this year where the install-to-savings ratio is genuinely lopsided.",
            "try": "Install rtk in front of your daily coding agent for one full work session and check your provider dashboard against last week's spend on a similar workload."
          },
          {
            "title": "AlexsJones/llmfit",
            "url": "https://github.com/AlexsJones/llmfit",
            "source": "github.com",
            "stars": "26.1k",
            "lang": "Rust",
            "body": "One command that tells you which of hundreds of models will actually run on your specific hardware -- VRAM, RAM, quant format, runtime (llama.cpp, MLX, GGUF, unsloth). Most 'what model should I run' guides are out of date the day after they're written; llmfit reads your machine and gives you a current shortlist. Especially useful if you've got an awkward setup (Apple Silicon with 64GB unified, or a 4090 with a weak CPU) where the right answer isn't the obvious one.",
            "try": "Run llmfit on your laptop, pick the largest model it greenlights, and benchmark it against your current local model on three real prompts from your workflow."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "48.3k",
            "lang": "Python",
            "body": "A coding-agent skill (Claude Code, Codex, Cursor, Gemini CLI) that ingests a folder of code, SQL schemas, shell scripts, docs, and even images, and turns the lot into a queryable knowledge graph. The novel bit is the unification -- application code, database schema, and infrastructure live in one graph the agent can traverse. For monorepos where the agent keeps losing the thread between API code and the migration that backs it, this is the kind of context tool that actually changes answer quality.",
            "try": "Run graphify over your repo plus your `migrations/` and `terraform/` folders, then ask your agent a cross-cutting question like 'what infra would I need to change to add a `tenant_id` column to users.'"
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.3k",
            "lang": "Python",
            "body": "An open-source memory layer for AI agents, exposed over MCP, backed by ChromaDB. The repo's pitch is benchmark-led: they publish numbers against the major memory frameworks and currently top them on standard recall/retention evals. Free and self-hosted, so it's a viable replacement for hosted memory products if you're touchy about sending conversation history to a third party.",
            "try": "Wire MemPalace into your local Claude Code via MCP and seed it with a week of your project notes, then watch how much less re-context you have to provide on Monday morning."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Two builders documented full stacks today -- one offline robot, one hand-built speaker.",
        "items": [
          {
            "title": "Built a fully offline suitcase robot around a Jetson Orin NX SUPER 16GB",
            "url": "https://reddit.com/r/LocalLLaMA/comments/1tdz5gr/built_a_fully_offline_suitcase_robot_around_a/",
            "source": "r/LocalLLaMA",
            "author": "CreativelyBankrupt",
            "body": "Sparky is a fully offline robot living in a suitcase form factor. No WiFi, Bluetooth, or cellular -- everything runs on a Jetson Orin NX SUPER 16GB. The brain is Gemma 4 E4B at Q4_K_M via llama.cpp, with q8_0 KV cache and flash attention, giving ~200ms cached TTFT and 14-15 tok/s sustained at 12K context. Voice in is SenseVoiceSmall (STT), voice out is Piper (TTS) with 43Hz mouth sync, and a PixiJS face renders on the lid display. Gemma 4 handles vision and OCR natively, so the BLIP subprocess from the previous version is gone. 30+ sensors feed the model context.",
            "try": "Stand up llama.cpp with Gemma 4 E4B Q4_K_M, q8_0 KV cache, and flash attention on whatever machine you've got, and benchmark cached TTFT against the same model on Ollama defaults -- the gap is the headline."
          },
          {
            "title": "I built the smart speaker we always wanted",
            "url": "https://reddit.com/r/ClaudeAI/comments/1tdjl05/i_built_the_smart_speaker_we_always_wanted/",
            "source": "r/ClaudeAI",
            "author": "FunScore645",
            "body": "boxBot is a smart speaker built almost entirely through 'vibe hardware engineering' with Claude. Claude picked the parts: Raspberry Pi, Hailo accelerator, ReSpeaker mic array, Pi camera, Waveshare screen, speakers. It then calculated thermal loads and dissipation rates for a passive cooling layout. The author hand-built the enclosure out of walnut. The agent stack inside is custom, running on the Pi with Hailo offload. The thread documents the prompts used at each stage -- parts selection, thermal math, schematic review -- which is the part most 'I built X with AI' posts skip.",
            "try": "Pick one small hardware project you've been putting off and ask Claude to spec the parts list with a budget and thermal constraints, then push back on every choice until it justifies it -- you'll learn whether 'vibe hardware' actually works for your level."
          },
          {
            "title": "I Let a Small Model Train on Its Own Mistakes. It Reached 80% on HumanEval and Beat GPT-3.5 on Math",
            "url": "https://reddit.com/r/LocalLLaMA/comments/1tde3m1/i_let_a_small_model_train_on_its_own_mistakes_it/",
            "source": "r/LocalLLaMA",
            "author": "QuantumSeeds",
            "body": "A solo builder, working on a 24GB MacBook, replicated the verifiable-rewards idea from the DeepSeek-R1 paper on a small model. The model generates code, runs it against tests, keeps the passes, and trains on the gap between fails and fixes. No human-written training data. Result: 80% on HumanEval and beat GPT-3.5 on math. The post walks through the reward shaping, the failure cases that broke earlier attempts, and why running it on a laptop forced choices that ended up helping. Reproducible on consumer hardware.",
            "try": "Take a small open-weight coding model, write a 50-line wrapper that runs its outputs against a test suite, log pass/fail with the code as training pairs, and try one round of fine-tuning -- the goal is to feel the loop, not beat HumanEval on attempt one."
          }
        ]
      }
    ],
    "closing": "Build something this weekend that wouldn't have run on your hardware last year."
  },
  {
    "id": "preview",
    "date": "Preview",
    "title": "Preview Issue",
    "subtitle": "A taste of the format. Today's real issue is above; this stays as a reference.",
    "intro": "This issue is hand-built to show you the shape of a daily edition: three sections, a handful of items each. From tomorrow on, this fills itself in automatically -- new at the top, archive below.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New features from the labs and tool-makers. What changed, and what it unlocks for you.",
        "items": [
          {
            "title": "What the 'Shipping' section will surface",
            "url": "https://www.anthropic.com/news",
            "source": "Anthropic / OpenAI / Google / xAI / DeepMind blogs",
            "body": "Every morning this section pulls the latest release posts from Anthropic, OpenAI, Google DeepMind, Mistral, and a few others. New models. New tool-use abilities. New SDK features. Pricing changes. Each item gets a one-paragraph rewrite focused on what it lets you do that you couldn't do yesterday -- not the press-release language. If a release is mostly hype, it doesn't make the cut.",
            "try": "When the first real edition lands, scan only the items where the 'try this' line names a concrete change you'd make to a workflow you already run. Skip the rest -- that's the whole point of the format."
          },
          {
            "title": "Example: Claude's blog as a primary feed",
            "url": "https://www.anthropic.com/news",
            "source": "claude.com/blog",
            "body": "claude.com/blog (and anthropic.com/news) is wired in as a primary source -- every new feature post will be summarized here within ~24 hours. Same for model card updates, tool-use changes, and pricing posts. The summary will tell you what the feature is, what's actually new, and the smallest interesting thing you could do with it today.",
            "try": "Bookmark this page. Open it once each morning with coffee. If something in 'Shipping' makes you say 'wait, you can do that now?' -- that's the signal to spend 15 minutes trying it before moving on with your day."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "AI repos pulling in GitHub stars right now. What people are voting on with their attention.",
        "items": [
          {
            "title": "What the 'Climbing' section will surface",
            "source": "github.com (search API, AI topics)",
            "body": "Every morning this section pulls the AI/ML/agent repos that gained the most stars in the last 7 days -- agentic frameworks, model-running tools, eval harnesses, novel UIs, weird experimental stuff. Each entry tells you what the repo does in one sentence, why people are starring it this week, and whether it's the kind of thing worth a clone-and-run.",
            "try": "Treat the star count as a signal of attention, not quality. Read the README. If you can imagine a use you'd actually have for it within a week, clone it. Otherwise note it and move on -- the goal is exposure, not collection."
          },
          {
            "title": "Example: how a typical entry will read",
            "url": "https://github.com/topics/agent",
            "source": "github.com",
            "stars": "+2.1k this week",
            "lang": "Python",
            "body": "A typical Climbing entry will look something like this -- a brief description of the repo, what makes it interesting (the novel idea, not the marketing line), and what kind of person it's for. If the repo is just another wrapper around the OpenAI SDK, it won't make the section. The bar is 'does this change what's possible, even slightly.'",
            "try": "Star repos sparingly. Star is your future-self bookmark -- if you star everything, you bookmark nothing."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Wild, well-documented use cases. End-to-end workflows. The 'someone made a thing and shared exactly how' stories.",
        "items": [
          {
            "title": "What the 'Built with AI' section will surface",
            "source": "Hacker News / Reddit / Twitter threads / personal blogs",
            "body": "This is the section closest to why you wanted a daily digest. Real builds. Real workflows. Documented end-to-end. The 'Joey made CTRL, the AI K-pop band, and shared the whole pipeline' kind of post -- where you walk away knowing which tools, in which order, with which prompts, and what broke along the way. The bar is 'reproducible enough that you could try the same thing this weekend.' Vague 'I used AI to do X' threads don't qualify.",
            "try": "When a workflow catches your eye, don't bookmark it -- block 30 minutes on your calendar within the next 3 days to actually try a tiny piece of it. The half-life of inspiration is shorter than you think. The skills compound when you build, not when you read."
          }
        ]
      }
    ],
    "closing": "The first automated edition lands tomorrow morning. After that, every day around 7am ET -- a fresh issue at the top, the archive below. Skim it with coffee. Try one thing per week. Compounds fast."
  }
];
