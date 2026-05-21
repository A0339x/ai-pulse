// data.js — AI Pulse
// The daily generator prepends new issues to the TOP of this array.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    "id": "2026-05-21",
    "date": "May 21, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships Opus 4.7 and acquires Stainless, an AI cracks an 80-year math problem, and token-trimming tools dominate GitHub",
    "intro": "Anthropic is moving on two fronts today -- a new model and a significant acquisition. OpenAI's most-discussed result this week is not a benchmark: it is a verified math proof that disproves a conjecture that has been open since the 1940s. On GitHub, the repos gaining stars fastest share a single theme -- cutting token costs without giving up what agents can do.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "A new Anthropic model, an SDK acquisition, a math breakthrough, and a design tool from Anthropic Labs",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Opus 4.7 is live, the latest update to Anthropic's highest-capability model tier. The Opus line is where you go when reasoning depth, extended instruction-following, and output quality on hard tasks matter more than speed or cost. This is a model update, not a product launch -- the API model ID changes, the behavior improves. It is available in the API today. If you are running Opus 4 on anything latency-insensitive, the new version is the current production default."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "SDK generation is now in-house at Anthropic. Stainless -- the company that auto-generates idiomatic client libraries from OpenAPI specs -- has been acquired. Stainless currently powers the SDKs for a number of well-known API businesses, producing Python, TypeScript, Go, and other client libraries that stay current as the underlying API evolves. For developers building on the Anthropic API, the implication is faster and more consistent SDK updates, and tighter coupling between model releases and the client libraries used to call them."
          },
          {
            "title": "An OpenAI model has disproved a central conjecture in discrete geometry",
            "url": "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
            "source": "OpenAI",
            "body": "The unit distance conjecture -- open since Erdos posed it roughly 80 years ago -- is now disproved. An OpenAI model found a configuration of points in the plane that exceeds the previously conjectured maximum number of unit-distance pairs. The result has been verified. This is not an AI-assisted proof where a human did the key steps: the model produced the construction. It is the most concrete example to date of an AI making an original, verifiable contribution to pure mathematics rather than recombining known results."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "A design prototyping tool landed in Anthropic Labs today: Claude Design. It generates web, desktop, and mobile UI prototypes from prompts and exports to HTML and other formats. Claude Design lives in Labs, which means it is experimental -- not yet part of the main Claude product. A same-day open-source community fork (nexu-io/open-design, 48k stars within 24 hours) appeared the moment it shipped, which suggests the feature set was visible enough and useful enough to inspire immediate alternatives."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token efficiency, memory, and knowledge graphs are the ideas moving fastest this week",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "52.3k",
            "lang": "Rust",
            "body": "rtk is a CLI proxy that strips redundant context before it reaches your LLM-backed coding tool. Point it at Claude Code, Codex, or any CLI that reads from stdin, and it compresses or summarizes inputs -- git diffs, file reads, build logs -- that models do not need verbatim. The repo claims 60-90% token reduction on common dev commands. It ships as a single Rust binary with zero runtime dependencies. The approach is transparent to the model: the compressed input still carries the information the model needs, just without the noise."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.6k",
            "lang": "Python",
            "body": "MemPalace is an open-source memory system for AI agents that uses ChromaDB for vector storage and exposes an MCP interface. The claim is best-in-class retrieval accuracy among open-source alternatives -- and the benchmark comparisons are included in the repo, not just the README. It handles both episodic memory (what happened in prior sessions) and semantic memory (facts retrieved by similarity). Any agent harness that supports MCP can connect it without custom integration work."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "50.6k",
            "lang": "Python",
            "body": "Graphify turns a folder -- source code, SQL schemas, shell scripts, docs, images, videos -- into a queryable knowledge graph. Instead of flat vector similarity search, you get graph-aware retrieval: ask about relationships between components, dependencies between tables, or connections across infrastructure layers. It installs as a skill for Claude Code, Codex, Gemini CLI, and Cursor. The sharpest use case is large codebases where the question is less 'find the right file' and more 'how does this service connect to that schema.'"
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "48.6k",
            "lang": "TypeScript",
            "body": "Open Design is a local-first design prototyping tool that generates web, desktop, and mobile layouts from prompts. It ships 19 agent skills and 71 pre-built design systems, and exports to HTML, PDF, PPTX, and MP4. Prototypes render in a sandboxed local preview, so assets do not leave the machine. It runs as a skill on Claude Code, Codex, Cursor, Gemini CLI, and several others. It launched the same day as Anthropic's Claude Design and reached 48k stars within 24 hours."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Guardrails that turn a cheap 8B model into a reliable agent, and AI radio that actually broadcast",
        "items": [
          {
            "title": "Forge -- Guardrails take an 8B model from 53% to 99% on agentic tasks",
            "url": "https://github.com/antoinezambelli/forge",
            "source": "Hacker News",
            "author": "zambelli",
            "body": "Forge is a guardrail framework for small-model agents, built and documented as a Show HN. The core result: wrapping an 8B model in structured output validation, retry logic on malformed tool calls, and response verification pushed its benchmark score on standard agentic tasks from 53% to 99% -- matching much larger models on the same eval. The repo documents which guardrail layers matter most and in what order to stack them. The central argument is that for most agentic workflows, output reliability is the bottleneck rather than raw reasoning capacity, and that gap is addressable without moving to a larger or more expensive model."
          },
          {
            "title": "We let AIs run radio stations",
            "url": "https://andonlabs.com/blog/andon-fm",
            "source": "Hacker News",
            "author": "lukaspetersson",
            "body": "Andon Labs built and broadcast Andon FM: a set of AI-run radio stations that operated live, not as a demo clip. The blog post documents the full stack -- LLM for scripting and on-air persona, TTS for voice output, a music scheduling layer, and a streaming backend to push audio to listeners. They ran into latency issues at the TTS-to-stream handoff and document the specific fix they shipped. The stations ran long enough to accumulate real listener sessions. The post is structured as a build log: what they tried, what broke, what changed, and what the finished system looked like."
          }
        ]
      }
    ],
    "closing": "That is the scan for May 21 -- back tomorrow."
  },
  {
    "id": "2026-05-20",
    "date": "May 20, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.7 drops, Google I/O floods the zone, and GitHub is obsessed with cutting token spend",
    "intro": "Google I/O hit yesterday and two things stand out: Gemini 3.5 Flash is real and fast, and Google is serious about agentic tooling across Workspace and Search. Anthropic countered with Opus 4.7 and a strategic acquisition that tightens their SDK story. On GitHub, a clear meta is forming -- builders want to cut token costs by 60-90%, and three independent repos this week are attacking that from different angles.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New models from Anthropic and Google, plus an acquisition that matters for API builders",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Opus 4.7 is the new top of Anthropic's model stack. It sits in the Claude 4 family alongside Sonnet and Haiku, positioned for the workloads where you need the most capable tool -- complex reasoning, multi-step agentic pipelines, and demanding coding tasks. If you were running Opus 4, this is the drop-in upgrade. Available now via the API as claude-opus-4-7 and through Claude.ai on Pro and Team plans."
          },
          {
            "title": "Google I/O 2026: Gemini 3.5 Flash and the agentic era",
            "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
            "source": "Google AI",
            "body": "Gemini 3.5 Flash is the headline out of I/O -- a fast, cost-efficient model built for high-throughput workloads and the practical counterpart to Gemini 3.5 Pro. Beyond the model, Google's I/O keynote framed the year around agentic Gemini: the model is being wired into Workspace, AI Mode in Search, and a rebuilt developer toolchain. One immediate action item for builders: Gemini CLI stops working June 18 and transitions to Antigravity CLI, so any pipeline using the current CLI needs a migration plan."
          },
          {
            "title": "OpenAI and Dell bring Codex to on-premise enterprise",
            "url": "https://openai.com/index/dell-codex-enterprise-partnership",
            "source": "OpenAI",
            "body": "Codex, OpenAI's AI coding agent, was cloud-only until today. The Dell partnership changes that -- Codex can now run in hybrid and on-premise environments, with Dell handling the infrastructure. This directly unblocks regulated industries where code and data can't leave a controlled perimeter: finance, defense, healthcare. OpenAI handles the model; Dell handles the deployment layer. Enterprise builders who've been watching Codex from the sidelines due to data residency requirements have a path in."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Stainless auto-generates typed, idiomatic SDKs from OpenAPI specs -- and they already built and maintained the official Anthropic SDKs for Python, TypeScript, Go, Java, and more. Bringing them in-house means API changes ship to all language clients faster, with tighter parity and less lag between a new endpoint and a usable library. For builders on the Claude API, the practical effect is that SDK maintenance now has a dedicated team inside Anthropic rather than a contracted shop with competing priorities."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Three separate repos this week are attacking the same problem -- token spend -- from different angles",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "62.6k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that makes the model respond in compressed caveman-speak during coding sessions -- 'why use many token when few token do trick.' The repo claims 65% token reduction by stripping hedging, filler, and verbosity from responses without losing the actual signal. You install it as a skill; Claude Code switches register for in-session responses while leaving file edits and code output untouched. Absurd premise, but token cost is one of the biggest friction points for heavy Claude Code users and this is a working, installable workaround."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "51.6k",
            "lang": "Rust",
            "body": "A CLI proxy written in Rust that sits between your shell and your AI coding assistant, intercepting common dev commands and compressing context before it hits the model. Claims 60-90% token reduction on dev command output -- git status, build logs, file reads -- which is typically the noisiest part of a coding session. Ships as a single binary with zero runtime dependencies. The approach is complementary to caveman: instead of changing how the model talks, it changes what the model sees. Practical for any AI coding workflow burning tokens on verbose terminal output."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.5k",
            "lang": "Python",
            "body": "Claims to be the best-benchmarked open-source AI memory system, and it's free. Built on ChromaDB with an MCP interface, so it drops into any agent that speaks MCP. The value prop is persistent cross-session memory with retrieval that the repo benchmarks against paid alternatives. Persistent memory is one of the genuinely unsolved pieces of production agent systems -- most options are either expensive, proprietary, or slow enough to hurt latency. This one is open, benchmarked publicly, and ships today."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "50.0k",
            "lang": "Python",
            "body": "An AI coding assistant skill that turns any folder of code, SQL schemas, shell scripts, docs, images, or videos into a queryable knowledge graph -- then connects app code, database schema, and infrastructure in one traversable structure. Works as a skill for Claude Code, Codex, Cursor, Gemini CLI, and others. Instead of dumping entire files into context, your agent queries the graph and pulls only the relevant subgraph. Tackles the same token-spend problem as rtk and caveman but from the retrieval side: give the model less, but give it exactly the right less."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Three documented builds this week: agentic radio, guardrails that rescue a small model, and a year of AI-assisted Rust",
        "items": [
          {
            "title": "Forge -- Guardrails take an 8B model from 53% to 99% on agentic tasks",
            "url": "https://github.com/antoinezambelli/forge",
            "source": "Hacker News",
            "author": "zambelli",
            "body": "Antoine Zambelli documents how structured output guardrails -- schema validation, constrained generation, and retry loops with error-specific re-prompts -- push a vanilla 8B model from 53% to 99% on a standard agentic benchmark. No fine-tuning. No bigger model. The workflow: define the expected output schema per agent step, wrap each step with a validator that catches malformed or out-of-range responses, and on failure re-prompt with a targeted correction rather than a generic retry. The repo ships the benchmark harness so you can reproduce the numbers. For builders running cost-constrained pipelines on smaller models, this is the most immediately applicable technique in today's batch."
          },
          {
            "title": "We let AIs run radio stations",
            "url": "https://andonlabs.com/blog/andon-fm",
            "source": "Hacker News",
            "author": "lukaspetersson",
            "body": "Andon Labs built and ran fully AI-operated radio stations -- DJ voice, song selection, between-track commentary, listener interactions, all without human intervention. The post documents the stack: a real-time audio pipeline feeding current listener count, track metadata, and request queue to the model; a voice synthesis layer for the on-air personality; and a scheduling system that keeps the station running continuously. The interesting parts are the documented failure modes -- the AI would fixate on a theme for hours, or select songs that matched a genre label but felt tonally wrong back-to-back. The rough edges are in the post alongside the architecture, which is exactly what makes it worth reading."
          },
          {
            "title": "Learnings from 100K lines of Rust with AI",
            "url": "https://zfhuang99.github.io/rust/claude%20code/codex/contracts/spec-driven%20development/2025/12/01/rust-with-ai.html",
            "source": "Hacker News",
            "author": "pramodbiligiri",
            "body": "A developer documents the workflow behind 100K lines of production Rust written with Claude Code and Codex. The core method is spec-driven development: write a precise contract for each module -- expected inputs, outputs, invariants -- before touching implementation, then hand the spec to the AI. Rust's type system acts as a forcing function: the compiler surfaces exactly where AI-generated code drifted from the spec, loudly and immediately. Key finding is that AI-generated Rust fails faster and more visibly than in dynamically typed languages, which makes it safer to use -- drift accumulates silently in Python, but in Rust it blocks the build. The post includes the review cadence and what they'd change on the next project."
          }
        ]
      }
    ],
    "closing": "Token efficiency is this week's metagame -- the repos winning GitHub are the ones making every prompt cheaper."
  },
  {
    "id": "2026-05-18",
    "date": "May 18, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic refreshes its flagship, ChatGPT gets a live money view, and GitHub fills up with token-slashing tools",
    "intro": "Two model stories lead today: Anthropic ships Claude Opus 4.7 at the top of the 4.x line, and GPT-5.5 makes its enterprise debut inside Databricks workflows. ChatGPT Pro quietly becomes the first major general-purpose AI product to connect live financial accounts -- not an upload, a live feed. On GitHub, the fastest-climbing repos this week share one obsession: burning fewer tokens without burning quality.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New models, live financial account access, and smarter provider routing land today",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Claude Opus 4.7 is out, the latest update to the top of Anthropic's model lineup. Opus is the tier Anthropic builds for the hardest reasoning loads, longest context, and most demanding agentic workflows. The 4.7 release continues the rapid iteration cadence across the 4.x cycle -- each version has tightened instruction-following, improved multi-step planning, and moved benchmark numbers further. Teams already on Opus 4.x can point to 4.7 with a model version change in the API call, no integration rework required."
          },
          {
            "title": "Databricks brings GPT-5.5 to enterprise agent workflows",
            "url": "https://openai.com/index/databricks",
            "source": "OpenAI",
            "body": "GPT-5.5 is now wired into Databricks for enterprise agent workflows, following the model's new state-of-the-art score on the OfficeQA Pro benchmark -- a test focused on the document and spreadsheet reasoning that shows up constantly in enterprise data work. The integration lets teams run GPT-5.5 agents directly against lakehouse data: read from structured sources, reason over results, write back outputs, without leaving the Databricks environment. If your team's agent work lives inside Databricks already, this is the fastest path to the new model."
          },
          {
            "title": "A new personal finance experience in ChatGPT",
            "url": "https://openai.com/index/personal-finance-chatgpt",
            "source": "OpenAI",
            "body": "ChatGPT Pro users in the U.S. can now connect live financial accounts and get AI-powered analysis grounded in their actual numbers. This is the first time a major general-purpose AI product has integrated direct financial data access at the consumer tier -- not a spreadsheet upload or a copy-paste, but a permissioned live connection. Once connected, the model answers questions, surfaces patterns, and gives guidance tied to your real balance sheet and stated goals. Currently in preview for Pro subscribers in the U.S."
          },
          {
            "title": "Sort providers by cost, latency, or throughput on AI Gateway",
            "url": "https://vercel.com/changelog/sort-providers-by-cost-latency-or-throughput-on-ai-gateway",
            "source": "Vercel",
            "body": "Vercel AI Gateway now lets you explicitly sort the providers backing any model by cost, time to first token (TTFT), or throughput (tokens per second). The default ordering already blends reliability, quality, cost, and speed -- this adds manual override for when you want to optimize on a single axis. Ranking is computed at request time, so new providers, price changes, and real-time latency shifts flow through without code changes. For production workloads where provider cost variance is meaningful, this is a one-line config change that compounds."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token compression, benchmarked memory, and graph-based code retrieval are where GitHub momentum is concentrating",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "61.7k",
            "lang": "JavaScript",
            "body": "Caveman is a Claude Code skill that forces the model to communicate in stripped-down, grammatically minimal language -- 'why use many token when few token do trick.' The project reports 65% token reduction on typical coding sessions. The mechanism is precise: most context burn in agentic coding happens in the connective prose between code blocks, not in the code itself. Caveman targets that prose specifically, leaving code output untouched. It's a Claude Code skill, so installation is one command and it requires no changes to your existing prompts or workflow."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.4k",
            "lang": "Python",
            "body": "MemPalace is an open-source AI memory system built on ChromaDB and exposed via MCP, positioning itself as the best-benchmarked free option in the space. The differentiator is the benchmarking claim itself -- most memory systems ship without rigorous recall quality tests. MemPalace publishes comparative results on retrieval precision, long-horizon recall, and cross-session coherence against other open alternatives. If you're building agents that need persistent, queryable memory across sessions and don't want a hosted solution, this is the current open-source benchmark to beat."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "49.7k",
            "lang": "Rust",
            "body": "rtk is a single Rust binary CLI proxy that intercepts common dev commands -- git status, ls, find, grep -- and compresses their output before it hits the LLM context window. The project claims 60-90% token reduction on typical coding tasks. Zero dependencies, drops in as a transparent proxy, no changes to your existing agent setup. The compression mechanism is smart truncation and deduplication of the repetitive shell output that dominates agentic coding sessions. If you run Claude Code or Codex on large repos, the savings are direct and immediate."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "49.0k",
            "lang": "Python",
            "body": "Graphify is an agent skill that converts any folder -- code, SQL schemas, shell scripts, docs, papers, images, videos -- into a queryable knowledge graph. Point it at a repo and it builds a unified graph linking app code, database schema, and infrastructure in one structure. Agents then query the graph instead of doing repetitive file reads. Works as a skill inside Claude Code, Codex, OpenCode, Cursor, and Gemini CLI. The GraphRAG approach fits large codebases where linear context loading hits its ceiling -- the graph becomes the retrieval layer so the agent always finds the right node instead of reading everything."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Nothing in today's sources documented a full end-to-end build workflow",
        "items": []
      }
    ],
    "closing": "Back tomorrow with more signal."
  },
  {
    "id": "2026-05-17",
    "date": "May 17, 2026",
    "title": "AI Pulse",
    "subtitle": "Two new flagship models land, token-trimming tools dominate GitHub, and ChatGPT wants to see your bank statements",
    "intro": "Anthropic and OpenAI both pushed new models today -- Opus 4.7 and GPT-5.5 ship within hours of each other. On GitHub, the dominant pattern is token efficiency: multiple high-climbing repos share the thesis that LLMs burn too many tokens and a thin proxy or skill layer can fix that. The personal finance angle is also worth tracking -- OpenAI is moving to put AI directly on top of your actual transaction data, not just hypothetical examples.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Two new flagships and a pair of features that didn't exist yesterday.",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic's latest flagship is live. Opus 4.7 replaces Opus 4 at the top of the Claude 4.x line and is available now at model ID claude-opus-4-7 via the API, Claude.ai, and existing partner integrations -- no configuration changes required. Within the 4.x family, Opus sits above Sonnet 4.6 in both capability and price. Anthropic's .x cadence in this line has delivered incremental but real gains in reasoning accuracy, multi-step task completion, and long-context handling. The full benchmark breakdown and pricing specifics are in the announcement."
          },
          {
            "title": "Databricks brings GPT-5.5 to enterprise agent workflows",
            "url": "https://openai.com/index/databricks",
            "source": "OpenAI",
            "body": "GPT-5.5 is now available inside Databricks for enterprise agent workflows. The model set a new state of the art on the OfficeQA Pro benchmark -- a test targeting knowledge-worker tasks like document QA and structured data reasoning. The Databricks integration means teams already on the platform can route agentic pipelines through GPT-5.5 without standing up separate API infrastructure. For enterprise builders, this is the clearest signal that GPT-5.5 is production-ready rather than API preview."
          },
          {
            "title": "A new personal finance experience in ChatGPT",
            "url": "https://openai.com/index/personal-finance-chatgpt",
            "source": "OpenAI",
            "body": "ChatGPT Pro users in the U.S. can now connect their financial accounts directly to ChatGPT and get AI-powered analysis grounded in their actual balances, transactions, and spending patterns. This is in preview. The grounding is the differentiator -- the model works from your real data, not generic budgeting examples. Account connections go through a secure linking flow. The move puts OpenAI in direct competition with personal finance apps that have been adding LLM layers on top of Plaid-style connections."
          },
          {
            "title": "Granite Embedding Multilingual R2",
            "url": "https://huggingface.co/blog/ibm-granite/granite-embedding-multilingual-r2",
            "source": "Hugging Face / IBM",
            "body": "IBM shipped two new open embedding models under Apache 2.0 with a major jump from the R1 baseline. Context window goes from 512 to 32,768 tokens -- 64x -- using ModernBERT with rotary position embeddings and Flash Attention 2. MTEB Multilingual Retrieval scores improved +12 points (97M) and +13 points (311M) over R1. The 311M model lands at #2 on the open multilingual retrieval leaderboard and supports Matryoshka truncation to 128 dimensions with less than 2 points of quality loss. Drops into sentence-transformers, LangChain, LlamaIndex, and Haystack unchanged. Ships with ONNX and OpenVINO weights for CPU inference."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token efficiency is this week's dominant thesis on GitHub.",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "61.2k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that cuts token output by 65% by making the model respond in stripped-down caveman syntax -- no articles, no conjunctions, no filler. The premise is that most LLM verbosity is stylistic overhead with no effect on reasoning quality. Install the skill file into Claude Code and it drops the padding while keeping the substance. The novel constraint works at the output syntax level rather than compressing prompts or truncating context. For high-volume coding sessions billed per token, the savings compound quickly across a full workday."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "49.1k",
            "lang": "Rust",
            "body": "A CLI proxy that reduces LLM token consumption 60-90% on common dev commands. Single Rust binary, zero dependencies. It recognizes patterns in dev command output -- git diffs, test failures, compiler errors -- and strips redundant context before the request reaches the model. Unlike generic compression approaches, rtk is tuned to the specific repetitive structures that show up in developer workflows. The 60-90% claim is specific to those dev patterns, not arbitrary prompts."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "48.7k",
            "lang": "Python",
            "body": "An AI coding assistant skill for Claude Code, Codex, Cursor, Gemini CLI, and others that converts any folder -- source code, SQL schemas, R scripts, shell scripts, docs, papers, images, videos -- into a queryable knowledge graph. Nodes are entities like functions, tables, and concepts; edges are relationships. Instead of dumping raw files into context or doing flat vector search over a directory, you query a structured graph that captures how your codebase, database, and infrastructure connect. Most useful when the relationships between components matter as much as the content of any individual file."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.3k",
            "lang": "Python",
            "body": "An open-source AI memory system claiming best-in-class benchmarks, free under a permissive license. Built on ChromaDB, it surfaces as an MCP server -- any MCP-compatible agent connects without custom integration work. The pitch to builders: stop implementing your own vector-backed memory layer for every agent project and use the one that has been benchmarked against the field. Supports standard memory operations (store, retrieve, forget) and is designed to slot into existing agent architectures without refactoring."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Nothing in today's source list documented a real end-to-end workflow.",
        "items": []
      }
    ],
    "closing": "Token efficiency is the new benchmark."
  },
  {
    "id": "2026-05-16",
    "date": "May 16, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.7 lands, agents get cheaper on GitHub, and ChatGPT wants your bank login",
    "intro": "Anthropic ships Opus 4.7 and OpenAI pushes GPT-5.5 into Databricks enterprise pipelines -- two model updates on the same morning. GitHub's trending list is dominated by token-compression tools this week, which is a clear signal: the community is focused on cost, not capability. The personal finance feature from OpenAI is the most ambitious product bet in today's batch.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Two model updates and a finance pivot share the day",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Opus 4.7 is Anthropic's latest update to their flagship model tier. Opus is the line you reach for on complex reasoning, long-context tasks, and anything requiring sustained multi-step thinking -- this release bumps that ceiling. Available now via the API and Claude.ai. No beta gating on the rollout."
          },
          {
            "title": "Hermes Agent v0.14.0",
            "url": "https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.16",
            "source": "NousResearch",
            "body": "808 commits, 633 merged PRs, 165,000 lines added since v0.13.0 -- NousResearch is calling this \"The Foundation Release\" and meaning it. Two things that matter: native Windows support lands in early beta with a proper PowerShell installer story, and `pip install hermes-agent` now works via a real PyPI wheel. Lazy-deps keeps the install footprint small until you actually need a dependency. 545 closed issues including 12 P0 bugs, 215 contributors. This release is about distribution -- Hermes Agent now installs and runs everywhere."
          },
          {
            "title": "Personal Finance in ChatGPT",
            "url": "https://openai.com/index/personal-finance-chatgpt",
            "source": "OpenAI",
            "body": "A new personal finance feature is in preview for ChatGPT Pro users in the US. Connect your financial accounts and the model grounds its responses in your actual spending, balances, and stated goals instead of generic financial advice. It's read-only access -- no trading, no transactions. The shift is that ChatGPT now has structured financial data about you at query time, which makes budget and planning conversations meaningfully more useful than asking about money in the abstract."
          },
          {
            "title": "Databricks brings GPT-5.5 to enterprise agent workflows",
            "url": "https://openai.com/index/databricks",
            "source": "OpenAI",
            "body": "GPT-5.5 is now available inside Databricks for enterprise agent workflows. The integration follows GPT-5.5 posting a new state-of-the-art score on OfficeQA Pro -- a benchmark targeting multi-step information retrieval and document reasoning against enterprise data. For teams already running lakehouse pipelines on Databricks, you can now route agent tasks directly to GPT-5.5 without moving data out of your existing infrastructure."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token compression is this week's dominant theme on GitHub",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "60.9k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that cuts 65% of tokens by forcing the model to communicate in terse, grammar-free caveman syntax. The idea is that LLMs can parse heavily compressed language just fine, so you lose no reasoning quality while paying a fraction of the token cost. It's a Claude Code skill, meaning it changes how the agent communicates internally during task execution -- your output stays readable. The compression works by register shift, not lossy summarization, which is why the quality holds."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "48.7k",
            "lang": "Rust",
            "body": "A CLI proxy that strips 60-90% of token usage on common dev commands before the request reaches the LLM. Ships as a single Rust binary with zero dependencies -- drop it in your PATH and it intercepts traffic from Claude Code, Codex CLI, or any other terminal-based agent. The bet is that most tokens in a coding session are repeated boilerplate: file headers, import blocks, test scaffolding the model has already processed. RTK identifies those patterns, strips redundant content, and caches relevant context locally."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "48.5k",
            "lang": "HTML",
            "body": "An AI coding assistant skill that turns any project folder into a queryable knowledge graph -- source code, SQL schemas, shell scripts, docs, images, and videos all land in a single graph you can query at inference time. Runs as a skill inside Claude Code, Codex, Cursor, Gemini CLI, and OpenCode. The novel part is the surface area: most RAG-for-code tools handle source files only. Graphify ingests the full project layer including infrastructure configs and recorded demos, so you can ask cross-layer questions like \"what database tables does this endpoint actually touch.\""
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.3k",
            "lang": "Python",
            "body": "The top-benchmarked open-source AI memory system, built on ChromaDB with native MCP support. Attach it to any LLM to give sessions a persistent, queryable memory layer -- facts accumulate across conversations, and relevant ones get retrieved at inference time without crowding the context window. Free and self-hostable. The MCP integration means it drops into Claude Code, Cursor, and any other MCP-aware client without custom wiring or a managed service."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Nothing in today's batch documents a reproducible end-to-end workflow",
        "items": []
      }
    ],
    "closing": "Back tomorrow."
  },
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
  }
];
