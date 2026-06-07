// data.js — AI Pulse
// The daily generator prepends new issues to the TOP of this array.
// Manual additions: follow the same object structure and add to the top.
const DIGESTS = [
  {
    "id": "2026-06-07",
    "date": "June 7, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships Opus 4.8, ChatGPT learns to dream, and GitHub fills up with token-cutters",
    "intro": "Today's shipping story is Anthropic's Opus 4.8 alongside two OpenAI capability drops -- ChatGPT's async Dreaming memory and new domain depth in GPT-Rosalind. Meanwhile, GitHub's trending AI repos this week converge on a single problem: token waste in agentic workflows. The pattern is not a coincidence -- as agent pipelines lengthen, teams are treating token efficiency as infrastructure, not an afterthought.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New flagship from Anthropic, a ChatGPT memory overhaul, a life-sciences capability drop, and a multimodal safety model from NVIDIA.",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Anthropic ships Opus 4.8, the new top of the Claude 4 model family, available in the API now under the model ID claude-opus-4-8. The release targets the tasks where generation gaps are most visible -- agentic coding, multi-step reasoning, and sustained accuracy across long context. Claude Code's Fast mode runs Opus for faster output, and Opus 4.8 inherits those optimizations. A Show HN this week documents it one-shotting formally verified algorithmic code that prior model generations failed to produce correctly -- a narrow but concrete indicator of where the capability floor moved."
          },
          {
            "title": "Dreaming: Better memory for a more helpful ChatGPT",
            "url": "https://openai.com/index/chatgpt-memory-dreaming",
            "source": "OpenAI",
            "body": "ChatGPT's new Dreaming system replaces explicit memory management with background consolidation. Between sessions, the model processes past conversations to identify recurring preferences, projects, and patterns, then updates its memory store without user prompting. The previous system relied on explicit flags or relied on recent context. Dreaming runs asynchronously -- closer to how biological memory consolidates during sleep than a key-value store you write to manually. Sessions now start with contextual awareness the model built on its own, without requiring you to re-establish who you are and what you're working on."
          },
          {
            "title": "Introducing new capabilities to GPT-Rosalind",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind",
            "source": "OpenAI",
            "body": "GPT-Rosalind adds enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow capabilities to its existing life sciences foundation. The previous version handled general biology questions; this update targets domain-specific depth -- compound interaction prediction, sequencing data interpretation, and multi-step lab protocol design. The new capabilities move it into territory that previously required fine-tuned biomedical models built on domain-specific corpora like PubMed and clinical notes, without the overhead of maintaining a domain-specific fine-tune."
          },
          {
            "title": "Nemotron 3.5 Content Safety: Customizable Multimodal Safety for Global Enterprise AI",
            "url": "https://huggingface.co/blog/nvidia/nemotron-3-5-content-safety",
            "source": "NVIDIA / Hugging Face",
            "body": "NVIDIA's Nemotron 3.5 Content Safety model ships on Hugging Face as a multimodal safety classifier built for enterprise customization. It handles text and image inputs, flags content policy violations, and is designed to be tuned on organization-specific guidelines rather than relying on a single default policy. The customization angle is the new capability -- earlier content safety models required significant fine-tuning infrastructure to adapt to regional compliance requirements. Nemotron 3.5 treats that workflow as a first-class use case, targeting deployments where safety policies differ by geography or product line."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "This week's trending repos share one goal: get more done with fewer tokens.",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "59.6k",
            "lang": "Rust",
            "body": "rtk is a CLI proxy that sits between your shell and any LLM, compressing common dev command outputs before they reach the model. It reduces token consumption 60-90% on typical workflows by stripping irrelevant file contents, summarizing diffs, and trimming verbose tool output to what the model actually needs. Ships as a single Rust binary with zero runtime dependencies. The target is long-tail token waste in agentic coding sessions: full file reads where only a function was needed, complete diff output where only changed lines matter. Proxies existing tooling transparently -- no config changes required."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "61.0k",
            "lang": "Python",
            "body": "Graphify turns any folder -- code, SQL schemas, R scripts, shell scripts, docs, papers, images, videos -- into a queryable knowledge graph. The graph captures cross-layer relationships: app code referencing database tables referencing infrastructure definitions, in a single traversable structure instead of separate files an agent reads one by one. Ships as a skill for Claude Code, Codex, Cursor, and Gemini CLI. The use case is large repos where understanding cross-component dependencies at query time is faster than burning context with sequential file reads. Built on GraphRAG under the hood."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "54.5k",
            "lang": "Python",
            "body": "MemPalace claims the top benchmark scores among open-source AI memory systems and is free to self-host. The system manages storage and retrieval of facts, preferences, and conversation history across sessions, surfacing relevant memories at query time via ChromaDB for vector storage. It exposes a standard MCP interface, making it a drop-in memory backend for any MCP-compatible agent. The benchmark comparisons in the repo cover retrieval accuracy, latency, and hallucination rate on injected facts -- a more complete evaluation suite than most open-source memory projects publish."
          },
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "69.7k",
            "lang": "JavaScript",
            "body": "Caveman is a single-file Claude Code skill that instructs the model to communicate in compressed shorthand -- \"me fix bug\" instead of \"I have identified and corrected the issue in the function.\" The claimed reduction is 65% fewer tokens on typical coding sessions. The compression targets the filler acknowledgments, verbose explanations, and pleasantry layer the model defaults to by design. It installs into Claude Code's skill system in seconds. Some users in the repo report the terse output mode also speeds up scanning model actions during agentic runs where you need to track what's happening across many steps."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Real build posts this week: a Figma replacement workflow, a formally verified proof, and an agent harness teardown.",
        "items": [
          {
            "title": "I design with Claude more than Figma now",
            "url": "https://blog.janestreet.com/i-design-with-claude-code-more-than-figma-now-index/",
            "source": "Hacker News",
            "author": "MrBuddyCasino",
            "body": "A designer on Jane Street's engineering blog documents replacing Figma with Claude Code as their primary design tool. The workflow: describe the component or layout in natural language with specific constraints, let Claude generate HTML/CSS or component code, preview in the browser, iterate. The post covers where this breaks -- complex interaction states, design system token management, handoff to engineers who expect Figma files -- and where it wins: rapid low-fidelity prototyping, one-off data visualizations, and layout experiments faster to generate and discard than to sketch in Figma. The author's working heuristic: if the artifact is closer to shipping code than a design spec, Claude Code is the faster path."
          },
          {
            "title": "Show HN: Formally verified polygon intersection -- Opus 4.8 oneshots, prev failed",
            "url": "https://github.com/schildep/verified-polygon-intersection",
            "source": "Hacker News",
            "author": "permute",
            "body": "A Show HN with a clean premise: the author needed a formally verified polygon intersection implementation -- working code with a mechanical correctness proof -- and documented what happened when they ran the task through several model generations. Previous models either failed the verifier or produced code requiring extensive manual repair. Opus 4.8 produced a passing implementation in a single shot. The repo contains the code, the proof obligations, and verifier output showing clean compilation. The implied workflow is short: write a precise spec, include the formal verification toolchain in context, prompt Opus 4.8 directly. A narrow but concrete data point on where the new model generation separates on correctness-critical generation."
          },
          {
            "title": "Harness engineering: Leveraging Codex in an agent-first world",
            "url": "https://openai.com/index/harness-engineering/",
            "source": "Hacker News",
            "author": "pramodbiligiri",
            "body": "An OpenAI engineering post that documents the scaffolding layer around Codex in agentic pipelines. The post covers context budget management across multi-step tool calls, how Codex behaves differently inside an agent loop vs. single-shot completion, and where the harness needs to validate, retry, or redirect output to keep a task on track. The stack: Codex as the code generation layer, tool call sequencing in the orchestrator, and output validation at each step before passing results downstream. Drew 143 comments on HN from engineers comparing notes on the same scaffolding challenges in their own agent builds."
          }
        ]
      }
    ],
    "closing": "The token bill is the new latency bill."
  },
  {
    "id": "2026-06-06",
    "date": "June 6, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.8 drops, GitHub floods with token-cutting tools, and a TDD agent skill worth forking",
    "intro": "The big news today is Claude Opus 4.8 -- Anthropic's new flagship is live on the API. On GitHub, the dominant theme is cost: repo after repo targeting the same problem of LLM token consumption at scale. In Built With AI, a TDD agent skill and a formally verified geometry proof show two very different ways Opus 4.8 is being put to work.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New flagship model, a native desktop agent app, and two distinct OpenAI capability pushes",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Anthropic released Claude Opus 4.8, a new version of its top-tier model. Available today on the API at model ID claude-opus-4-8. Opus sits above Sonnet and Haiku in the Claude 4.x hierarchy -- this is the model you reach for when capability ceiling matters more than cost per token. Anthropic has shipped meaningful jumps with each Opus point release in the 4.x line, making this the first thing to run against your hardest evals before the week is out."
          },
          {
            "title": "Hermes Agent v0.16.0 -- The Surface Release",
            "url": "https://github.com/NousResearch/hermes-agent/releases/tag/v2026.6.5",
            "source": "Nous Research",
            "body": "Hermes Agent v0.16.0 ships a native desktop app for macOS, Linux, and Windows -- built across 100 PRs and 159 commits in a single week. This is the first time Hermes runs as a real OS-native application rather than a terminal process or web interface. The broader release is substantial: 874 commits, 542 merged PRs, 205k lines added, 16 security-tagged issues closed, and 170 community contributors since v0.15.2. The desktop app is the headline but the security surface cleanup is the more operationally relevant change for teams running Hermes in production."
          },
          {
            "title": "ChatGPT Memory Dreaming",
            "url": "https://openai.com/index/chatgpt-memory-dreaming",
            "source": "OpenAI",
            "body": "OpenAI shipped a new memory architecture for ChatGPT called Dreaming. Instead of relying on explicit saves or a flat list of stored facts, the system periodically consolidates what it knows about your preferences across sessions -- the analogy OpenAI is using is sleep-stage memory consolidation. Context stays current and relevant without manual management. This is distinct from the existing memory toggle, which required you to explicitly tell ChatGPT what to remember. The new system infers and updates on its own."
          },
          {
            "title": "GPT-Rosalind: New Life Sciences Capabilities",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind",
            "source": "OpenAI",
            "body": "GPT-Rosalind, OpenAI's life sciences-specialized model, got a meaningful capability expansion: enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow support. Previous versions handled literature synthesis and basic bio reasoning. The new pieces are the chemistry and genomics depth -- structure-activity relationship work in medicinal chemistry and analysis tasks across genomics pipelines -- plus explicit support for planning wet-lab experimental workflows, not just interpreting results."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token cost is the problem every third repo on GitHub is trying to solve right now",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "59.3k",
            "lang": "Rust",
            "body": "A CLI proxy that sits between your dev commands and the LLM and cuts token consumption 60-90% on common operations. Single Rust binary, zero dependencies -- drop it in front of any CLI that talks to an LLM and it handles compression transparently. The mechanism is normalization and deduplication of context that repeats across calls: file contents, shell output, stack traces. Nothing about the approach is exotic, but the Rust binary distribution model means there is genuinely nothing to install or configure beyond a single executable."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "60.2k",
            "lang": "Python",
            "body": "An AI coding assistant skill that converts any folder of code, SQL schemas, R scripts, shell scripts, docs, papers, images, or videos into a queryable knowledge graph. Works as a skill for Claude Code, Codex, OpenCode, Cursor, Gemini CLI, and others. The structurally novel part: app code, database schema, and infrastructure land in one unified graph, so an agent can traverse cross-layer relationships -- not just what a function does, but what infrastructure a specific API call touches and which tables it reads. Cross-layer tracing without manually stitching context is what makes this more than another RAG wrapper."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "54.1k",
            "lang": "Python",
            "body": "An open-source AI memory system claiming the top position on published benchmarks -- and free. Built on ChromaDB and exposed via MCP, so it plugs into any MCP-compatible agent or LLM client without a hosted memory layer in the stack. The benchmark claim is the thing to verify independently; if it holds up, this is a straightforward replacement for paid memory services in agentic pipelines. The MCP interface means swapping it in requires no changes to agent logic, only to the tool configuration."
          },
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "69.4k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that cuts 65% of tokens by instructing the model to respond in stripped-down minimal English -- \"why use many token when few token do trick.\" The underlying idea is legitimate: verbose, polished prose in agent responses burns context window and costs money. In agentic coding workflows where you're reading diffs and shell output rather than narrative text, fluency is overhead. Caveman trades prose quality for compression in exactly those contexts. The 65% claim is per-workload -- results vary based on how verbose your model's baseline responses are."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "A reusable TDD agent skill and a formally verified geometry proof that earlier models couldn't crack",
        "items": [
          {
            "title": "My Agent Skill for Test-Driven Development",
            "url": "https://www.saturnci.com/my-agent-skill-for-test-driven-development.html",
            "source": "Hacker News",
            "author": "laxmena",
            "body": "A documented agent skill for enforcing TDD discipline inside Claude Code and similar agentic coding environments. The core problem the skill solves: AI coding agents default to writing implementation first, skipping the red-green-refactor cycle entirely. This skill structures the agent's behavior so it writes a failing test first, implements until it passes, then refactors -- in that order, every time. The author published the skill as a reusable artifact, not just a description of the approach. With 192 points and 81 comments on HN, the discussion focused on whether agents can actually hold the TDD discipline across a full multi-function feature rather than just isolated units -- the comments are worth reading alongside the post."
          },
          {
            "title": "Formally verified polygon intersection -- Opus 4.8 oneshots, previous models failed",
            "url": "https://github.com/schildep/verified-polygon-intersection",
            "source": "Hacker News",
            "author": "permute",
            "body": "The author published formally verified polygon intersection code to GitHub with explicit provenance: Opus 4.8 produced a passing proof in one shot, where previous models -- including earlier Claude versions -- repeatedly failed to generate output the formal verifier would accept. Formally verified geometry is a meaningful bar because the prover requires machine-checkable correctness, not code that looks plausible or passes unit tests. The repo is the artifact. The more interesting data point is what this reveals about the capability gap between Opus 4.8 and the models that preceded it on tasks requiring proof-level precision rather than approximate correctness."
          }
        ]
      }
    ],
    "closing": "Back Monday."
  },
  {
    "id": "2026-06-05",
    "date": "June 5, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.8 drops, ChatGPT rewrites its memory, and GitHub is obsessed with token reduction",
    "intro": "Two model updates today worth paying attention to: Anthropic ships Opus 4.8 at the top of the Claude 4 stack, and OpenAI extends GPT-Rosalind deeper into life sciences. The GitHub trend this week is infrastructure -- repos targeting token cost, memory quality, and codebase navigation are pulling the most stars. Closest attention belongs to ChatGPT's new Dreaming memory system and graphify's knowledge-graph approach, both of which change default assumptions about how agents accumulate and query context.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Model upgrades from Anthropic and OpenAI, a new memory architecture for ChatGPT, and a new design product from Anthropic Labs",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Opus 4.8 is now the top of the Claude 4 model stack, sitting above Sonnet 4.6 and Haiku 4.5 in the family. Available via the Anthropic API at model ID claude-opus-4-8. For agentic workflows where you have been running Sonnet and hitting quality ceilings on complex tasks -- extended code analysis, long-context reasoning, multi-step planning -- this is the version to benchmark. The 4.8 version number puts it ahead of every other Claude 4 variant currently in production. Cost and latency are higher than Sonnet, so the decision is whether your task class justifies the upgrade."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs shipped Claude Design, a new product for generating visual and UI work from natural language. It comes out of the Labs division, Anthropic's fast-cycle experimental product track. The community response was fast -- nexu-io/open-design launched the same day as a local-first open-source alternative, which signals real demand. Claude Design extends what Claude Code does for code into the design layer, targeting web, desktop, and mobile prototyping. The Labs framing means it moves faster and ships rougher than mainline Claude products."
          },
          {
            "title": "Dreaming: Better memory for a more helpful ChatGPT",
            "url": "https://openai.com/index/chatgpt-memory-dreaming",
            "source": "OpenAI",
            "body": "OpenAI shipped a new memory architecture for ChatGPT called Dreaming. The old system required you to explicitly tell ChatGPT to save something. Dreaming works passively -- it reviews past conversations in the background, extracts preferences and patterns, and integrates them going forward without any prompting from you. The analogy is sleep consolidation: memory gets distilled and refreshed outside the active conversation window. The practical effect is that ChatGPT should stop asking for context you have already given it, and should become more calibrated to your preferences over time with zero management overhead."
          },
          {
            "title": "New capabilities in GPT-Rosalind",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind",
            "source": "OpenAI",
            "body": "GPT-Rosalind, OpenAI's specialized life sciences model, got four new capability areas: enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow support. This is not a general model with a bio system prompt -- Rosalind is fine-tuned on scientific literature and lab workflows, and the new additions extend it into chemistry and genomics territory the previous version did not cover. For teams building tools around drug discovery pipelines, wet-lab automation, or computational biology, the updated API endpoint is worth testing against your current stack."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token reduction proxies, codebase knowledge graphs, and a local-first Claude Design alternative are pulling the most stars this week",
        "items": [
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "59.6k",
            "lang": "Python",
            "body": "Point Graphify at a codebase, SQL schema, docs, R scripts, or video files and it builds a queryable knowledge graph of relationships between components. The shift: instead of asking an LLM to scan files linearly and hoping it retains the right context, you get a structured graph you can traverse -- what depends on what, which services share a schema, which functions chain together. Ships as an installable skill for Claude Code, Codex, Cursor, Gemini CLI, and others. The biggest win is on large repos where context window limits make full-file loading impractical and grep-based navigation misses the relationship layer entirely."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "59.1k",
            "lang": "Rust",
            "body": "A CLI proxy that intercepts dev commands before they hit your LLM API and strips 60-90% of tokens without degrading output quality. The mechanism is not lossy compression -- it normalizes repetitive patterns, strips redundant context, and caches reused fragments before the request goes out. Single Rust binary, zero dependencies, drops in front of Claude Code, Codex, or any CLI tool that shells out to a model. At current API pricing across an 8-hour coding session, the token savings are substantial. The right test is your actual workflow, not a benchmark, since the reduction varies heavily by task type."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "53.7k",
            "lang": "Python",
            "body": "The best-benchmarked open-source AI memory system -- and the maintainers publish the comparison numbers to back it up. Built in Python, backed by ChromaDB for vector storage, exposed via MCP so any MCP-compatible agent can integrate it without custom connectors. Free to run locally. The project differentiates itself in a crowded memory-layer space by leading with reproducible benchmark results against other open-source approaches rather than just asserting performance claims. If you are building agentic systems that need persistent retrievable memory without a hosted dependency, this is the current reference point for the category."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "59.3k",
            "lang": "TypeScript",
            "body": "A local-first, open-source alternative to Anthropic's newly launched Claude Design, shipping as a native desktop app. Includes 259+ prebuilt skills and 142+ design systems, with output targets covering web, desktop, mobile, slides, images, and video in HTML, PDF, PPTX, and MP4. The standout feature is HyperFrames -- an interactive canvas format that wraps clickable prototypes instead of static mockups. Connects to Claude Code, Codex, Cursor, Gemini CLI, and 17 other coding CLIs. Built for teams that want Claude Design's output capability without routing designs through Anthropic's servers."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Fine-tuning for style, one-shot formal verification, and the 150-line agent that shows what frameworks hide",
        "items": [
          {
            "title": "Fine-tuning an LLM to write docs like it's 1995",
            "url": "https://passo.uno/fine-tuning-docs-llm/",
            "source": "Hacker News",
            "author": "taubek",
            "body": "A developer fine-tuned a model to produce documentation in the style of 1990s technical writing -- terse, procedural, zero hand-holding. The post documents the full process: sourcing a dataset from period-accurate technical manuals, formatting examples for fine-tuning, iterating on the style signal, and validating output quality. The motivation was not nostalgia -- 1990s docs are information-dense and free of modern friendly filler that inflates word count while reducing precision. The replicable part is the dataset construction method: how you source and filter style examples, and what it takes to get a fine-tuned model to consistently hold a voice that the base model has been trained away from. The result is a specialized endpoint for doc-generation pipelines that need tight, scannable output."
          },
          {
            "title": "Formally verified polygon intersection -- Opus 4.8 oneshots, prev failed",
            "url": "https://github.com/schildep/verified-polygon-intersection",
            "source": "Hacker News",
            "author": "permute",
            "body": "A developer published formally verified polygon intersection algorithms with a documented note: Claude Opus 4.8 produced a complete, machine-checkable proof in a single pass after previous models repeatedly failed. The repo includes the proof artifacts so you can inspect what a oneshot formal verification actually looks like in output form. The comparison is the useful data point -- if prior models required multiple iterations or human scaffolding to reach a verified proof, and Opus 4.8 closed it in one pass, that marks a concrete capability step for formal methods work. The scope is narrow, but the same question applies to whatever verification or proof-adjacent task you have been running and treating as out of reach for current models."
          },
          {
            "title": "Build Your Own AI Agent CLI in 150 Lines",
            "url": "https://go-micro.dev/blog/11",
            "source": "Hacker News",
            "author": "asim",
            "body": "A tutorial at go-micro.dev strips an AI agent CLI down to 150 lines and walks through every decision. The core loop: parse a tool manifest, send it to the model, execute returned tool calls, feed results back, repeat. No framework dependencies. The 150-line constraint is intentional -- it forces each architectural decision to stay visible and explicit, which makes it the fastest way to understand what heavier agent frameworks are abstracting. Tool routing, context accumulation, the response loop -- all in the open. The post is worth reading before adopting a framework, so you can name exactly what you are trading complexity for."
          }
        ]
      }
    ],
    "closing": "More tomorrow."
  },
  {
    "id": "2026-06-04",
    "date": "June 4, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.8 lands, token-trimming repos own GitHub, and Anthropic enters the design-tool market",
    "intro": "Anthropic ships two things today -- a new top-of-lineup model and a new product category -- while OpenAI quietly expands Codex past developers to the rest of the org. On GitHub, the dominant theme is cost: multiple fast-climbing repos are each betting that cutting LLM token consumption is the next infrastructure layer worth owning. Nothing in today's HN pool documented a full build workflow end-to-end, so the built-with section is empty.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "A model bump, a new design product, and Codex expanding well past the eng team",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Anthropic ships Opus 4.8, the new top of the Claude 4 model family. Model ID is claude-opus-4-8. As the highest-capability Claude model, it targets the most demanding coding, reasoning, and agentic tasks where Sonnet-tier falls short. Claude Code fast mode runs on Opus. If you are calling the API directly and routing your hardest multi-step agent work to claude-opus-4-6 or an older string, update it -- claude-opus-4-8 is now the right ceiling to test against."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs ships Claude Design, a new product aimed at design workflows. The Labs tag means experimental, not yet a committed product line, but it is publicly available today. An open-source alternative (nexu-io/open-design, 58.6k stars and climbing) appeared on GitHub the same morning targeting the same surface with 259+ skills, 142+ design systems, and multi-provider support -- which tells you how fast the community read the opening. The exact feature set for what Claude Design generates and how designers interact with it is in the launch post."
          },
          {
            "title": "Introducing new capabilities to GPT-Rosalind",
            "url": "https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind",
            "source": "OpenAI",
            "body": "GPT-Rosalind, OpenAI's life sciences model, gets a capability expansion today: enhanced biological reasoning, medicinal chemistry expertise, genomics analysis, and experimental workflow support. Rosalind is purpose-built for life sciences rather than general use. Medicinal chemistry and genomics are domains where general-purpose models reliably underperform -- narrow, structured, and full of domain conventions that don't survive prompt generalization. These additions target researchers and drug discovery teams running structured scientific workflows where Rosalind already lives in the stack."
          },
          {
            "title": "Codex for every role, tool, and workflow",
            "url": "https://openai.com/index/codex-for-every-role-tool-workflow",
            "source": "OpenAI",
            "body": "Codex ships new plugins, sites, and annotations aimed at analysts, marketers, designers, and investors -- roles that are not traditionally writing code. The plugins expand Codex into third-party tools beyond IDE integrations. The annotations feature adds structured context so domain experts can prompt with role-specific language without needing to frame everything as a coding task. This is a deliberate push from developer assistant to org-wide tool. New plugin endpoints mean new integration surface for anyone building Codex into internal workflows."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Four different bets on cutting LLM token costs, from Rust proxies to caveman grammar",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "68.7k",
            "lang": "JavaScript",
            "body": "Caveman is a Claude Code skill that cuts token usage by 65% by making the model communicate in compressed, minimal language -- dropping articles, conjunctions, and verbose sentence structure. The bet is that LLMs understand stripped-down language just fine but produce it at a fraction of the token cost. It is a prompt-layer trick, not a model change, and it works across Claude Code, Codex, and Cursor. Whether your downstream tooling can parse caveman-style output without breaking depends on the pipeline, but for agent-to-agent communication inside an orchestration loop the savings compound fast."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "59.2k",
            "lang": "Python",
            "body": "Graphify is a coding assistant skill for Claude Code, Codex, Cursor, Gemini CLI, and others that converts any folder -- source code, SQL schemas, shell scripts, docs, papers, images, videos -- into a queryable knowledge graph. Your app code, database schema, and infrastructure all land in one graph you can query instead of cramming raw files into context windows. It is GraphRAG-style retrieval automated from whatever you already have on disk. Built for large codebases where LLMs consistently lose track of the schema-to-code relationship across long sessions."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "58.7k",
            "lang": "Rust",
            "body": "rtk is a CLI proxy that sits between your dev tools and the LLM API and reduces token consumption by 60-90% on common dev commands. Single Rust binary, zero runtime dependencies -- drop it in, point your tools at it, it handles compression and optimization transparently. The 60-90% range is specific to dev command patterns: file reads, diffs, grep output, directory listings. Not general chat compression. If you are running Claude Code or Codex heavily against large codebases and watching tokens drain on repetitive read operations, this targets that specific cost center."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "58.6k",
            "lang": "TypeScript",
            "body": "open-design is a local-first, open-source alternative to Anthropic's new Claude Design product, shipping as a native desktop app. It bundles 259+ skills and 142+ design systems and generates web, desktop, and mobile prototypes, slides, images, and videos. Export formats include HTML, PDF, PPTX, and MP4. BYOK support covers 17+ AI CLIs -- Claude Code, Codex, Cursor, Gemini CLI, Qwen, Copilot, and more. A sandboxed preview environment keeps generated code isolated until you export. Dropped the same day as the Claude Design launch, which explains the star velocity."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Today's HN pool skewed toward news and product launches rather than documented workflows",
        "items": []
      }
    ],
    "closing": "Back tomorrow with whatever ships overnight."
  },
  {
    "id": "2026-06-03",
    "date": "June 3, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships Opus 4.8 and a design tool, OpenAI goes GA on AWS, and GitHub can't stop counting tokens",
    "intro": "Two Anthropic drops lead today -- a model update and a new design product out of Anthropic Labs. OpenAI's AWS deal flips from preview to generally available, which changes the procurement math for enterprise teams already running in that stack. On GitHub, the week's dominant theme is spending fewer tokens: multiple repos attacking the same cost problem from different angles, and a few of them actually working.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "A new flagship model, a design surface, and a major distribution deal all clear the runway today.",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Anthropic pushed a new point release of its flagship model. Opus 4.8 sits at the top of the Claude capability stack -- above Sonnet and Haiku -- and is the model to reach for when output quality and extended reasoning matter more than latency or cost. The version bump follows Opus 4's strong benchmark performance on complex multi-step tasks. Anthropic has been shipping incremental Opus updates faster than major version cycles suggest, which means the gap between frontier and mid-tier in their lineup keeps shifting."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs shipped Claude Design, a prompt-driven tool for generating UI mockups, slides, and visual assets. It comes with a library of design systems baked in and exports to HTML and presentation formats. The Labs tag means this is experimental -- Anthropic is testing the surface, not committing to it as a core product yet. It's the first native Anthropic design tool; until today, design-focused Claude workflows meant reaching for third-party wrappers. The open-source alternative (nexu-io/open-design, 58k stars) appeared almost simultaneously, which says something about how fast the ecosystem moves around Anthropic releases."
          },
          {
            "title": "OpenAI frontier models and Codex now GA on AWS",
            "url": "https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws",
            "source": "OpenAI",
            "body": "OpenAI moved its frontier models and Codex from AWS preview to general availability. Enterprise teams can now access them through existing AWS IAM controls, VPC configurations, and procurement contracts -- no separate OpenAI billing relationship required. For companies with data residency constraints or centralized cloud spend, this removes the main blocker to adopting OpenAI in production. The Codex agent runs inside the AWS environment rather than routing through OpenAI's own infrastructure, which matters for teams with strict data egress policies."
          },
          {
            "title": "Codex for every role, tool, and workflow",
            "url": "https://openai.com/index/codex-for-every-role-tool-workflow",
            "source": "OpenAI",
            "body": "OpenAI shipped a set of new Codex plugins, sites, and annotation tools aimed at non-engineering roles -- analysts, marketers, designers, and investors. The move signals OpenAI positioning Codex as a general productivity layer rather than a developer-only tool. New plugins extend Codex into data workflows and content pipelines. The annotations feature lets non-technical users mark up outputs and feed corrections back into the model's task context, which is a meaningful change from the current prompt-and-hope loop most knowledge workers are stuck in."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token budgets and codebase graphs are dominating GitHub momentum this week.",
        "items": [
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "58.8k",
            "lang": "Python",
            "body": "Graphify turns a folder of code, SQL schemas, shell scripts, docs, papers, images, or videos into a queryable knowledge graph. The core idea is GraphRAG scoped to your actual repo: app code, database schema, and infrastructure end up in one connected graph, not isolated vector chunks. That matters when questions span abstraction layers -- tracing a field from an API endpoint through business logic to a database trigger requires joining context that naive RAG misses. Query frontend supports Claude Code, Codex, Gemini CLI, Cursor, and OpenCode."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "53.4k",
            "lang": "Python",
            "body": "MemPalace claims the top slot on open-source AI memory benchmarks and is free. ChromaDB handles storage, an MCP interface handles the connection, so any MCP-compatible agent plugs in persistent memory without building retrieval from scratch. The differentiator is the benchmarking -- most open-source memory implementations are untested against real retrieval workloads under varied query patterns. MemPalace publishes its methodology and comparative scores. For anyone building agents that need to carry user context, tool output, or long-running task state across sessions, this is the current reference implementation."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "58.0k",
            "lang": "TypeScript",
            "body": "Open Design is a local-first, open-source alternative to the Claude Design tool Anthropic Labs shipped today. It runs as a native desktop app with 259+ skills, 142+ design systems, and exports to HTML, PDF, PPTX, and MP4. The notable feature is HyperFrames -- an interactive prototype format beyond static mockups. It connects to 17+ AI CLIs including Claude Code, Codex, Cursor, Gemini CLI, and Qwen, so design iteration stays inside the same agent loop as code. Useful for anyone who wants Claude Design's capabilities without Anthropic's data terms or pricing."
          },
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "68.3k",
            "lang": "JavaScript",
            "body": "Caveman is a Claude Code skill that instructs the model to respond in compressed, minimal language -- short words, no filler, no hedging. The result is a claimed 65% token reduction on typical development tasks. The underlying insight is real even if the execution is absurdist: most LLM verbosity in coding flows is explanation the developer didn't ask for. Caveman is the reductio ad absurdum of that problem. The repo includes a benchmark section comparing caveman output to standard Claude Code output on the same tasks, so the 65% number is verifiable."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Two tutorials document the exact mechanics of wiring up an agent tool loop from scratch.",
        "items": [
          {
            "title": "Build a Basic AI Agent from Scratch: Tools",
            "url": "https://www.ruxu.dev/articles/ai/build-an-ai-agent-with-tools/",
            "source": "Hacker News",
            "author": "ruxudev",
            "body": "A step-by-step walkthrough for building an agent that calls external tools using raw API calls -- no framework. The article covers the full loop: prompt construction, tool schema definition, model call, parsing the tool call out of the response, executing it, feeding the result back into context, and running until the model stops invoking tools. The author documents the exact failure points: malformed JSON from the model, tools returning errors the model handles badly, and infinite loops when the model misreads a tool output. Building this without LangChain or any orchestration layer makes every design choice visible. Read this before reaching for an abstraction."
          },
          {
            "title": "Build Your Own AI Agent CLI in 150 Lines",
            "url": "https://go-micro.dev/blog/11",
            "source": "Hacker News",
            "author": "asim",
            "body": "A working agent CLI in 150 lines of Go, no dependencies beyond the LLM API client. The hard constraint is pedagogical -- 150 lines means no abstraction layer can hide the agent loop, so tool registration, message accumulation, shell command execution, and loop exit conditions are all visible in one file. The author notes the one thing 150 lines can't fit: error recovery when the model produces malformed tool calls. That gap is documented explicitly, not glossed over, which is why the post is worth reading. A follow-up covering error recovery is flagged as next in the series."
          }
        ]
      }
    ],
    "closing": "Back tomorrow with whatever ships overnight."
  },
  {
    "id": "2026-06-02",
    "date": "June 2, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships Opus 4.8 and a design tool, GitHub fills with token cutters",
    "intro": "Anthropic had a busy morning -- Opus 4.8 updates the flagship model line and Claude Design ships as a new vertical product out of Labs. H Company's Holo3.1 pushes computer use onto local hardware. On GitHub, three different repos climbing simultaneously are all attacking the same problem: LLMs spend too many tokens on nothing. Caveman prompting, CLI proxies, and knowledge graphs -- different techniques, same direction.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Two Anthropic releases, a local computer use model, and a new code-focused MoE from JetBrains",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Anthropic updated the top of the Claude model stack with Opus 4.8. This is the tier for maximum capability -- complex reasoning chains, long-context analysis, multi-step agentic work, and tasks where you need the model to stay coherent over many tool calls. The 4.8 designation is a new iteration in the Opus 4 line. If you're running Opus 4 in production, this is the version to benchmark against your current setup before switching."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs shipped Claude Design, a product for generating visual designs and prototypes from natural language. Like Claude Code before it, this is a focused vertical tool -- same model, interface built for a specific workflow. It extends the Labs pattern of shipping purpose-built products for technical and creative tasks rather than routing all capabilities through the chat interface. Design iteration, mockups, and visual assets are now a first-class use case with dedicated tooling."
          },
          {
            "title": "Holo3.1: Fast & Local Computer Use Agents",
            "url": "https://huggingface.co/blog/Hcompany/holo31",
            "source": "H Company",
            "body": "H Company dropped Holo3.1 today -- a computer use model built to run locally at speed. Computer use agents (models that see a screen and control a GUI) have lived mostly in cloud APIs. Holo3.1 pushes that capability onto local hardware with latency as the primary design constraint. If the speed holds in practice, this opens up desktop automation for workflows that need fast iteration, air-gapped environments, or simply can't send screenshots to a remote API."
          },
          {
            "title": "Mellum2: A 12B Mixture-of-Experts Model by JetBrains",
            "url": "https://huggingface.co/blog/JetBrains/mellum2-launch",
            "source": "JetBrains",
            "body": "JetBrains published Mellum2 on Hugging Face -- a 12B parameter Mixture-of-Experts model built for code. JetBrains has been training models to power their IDE AI features across IntelliJ, PyCharm, and the rest of the suite; Mellum2 is the latest open release from that work. A 12B MoE hits a useful point on the size-performance curve: enough capacity for real coding tasks, small enough to run locally on a workstation GPU without heroics."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token efficiency is the week's theme -- four repos, three different attacks on the same problem",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "67.8k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that cuts token consumption by 65% by making the model respond in stripped-down 'caveman' language -- short sentences, no hedging, no filler. The idea is that technical content survives compression well; the tokens going toward elaborate sentence structure are mostly wasted. It installs as a Claude Code skill, changing response style globally across sessions. Blunt framing, but the math works: at frontier model API rates, verbose responses are a real and compounding cost."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "57.8k",
            "lang": "Rust",
            "body": "A CLI proxy that reduces LLM token consumption 60-90% on common dev commands. It intercepts verbose shell output -- git diffs, build logs, test results -- and compresses it before the text hits a model's context window. Ships as a single Rust binary with zero dependencies. The compression is invisible to whatever LLM tool sits above it, so it works with any agent or coding assistant that pipes shell output into prompts. High-leverage for agentic workflows that chew through long terminal outputs on every step."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "58.3k",
            "lang": "Python",
            "body": "A skill for AI coding assistants that converts a codebase into a queryable knowledge graph -- app code, SQL schemas, infrastructure config, docs, and even images and videos linked in one traversable structure. Works with Claude Code, Codex, Cursor, Gemini CLI, and others. The advantage over flat embedding search is traversal: questions that follow relationships (which services call this function? what tables does this query touch?) get answered from graph edges instead of nearby chunks. Useful at the scale where flat RAG starts missing cross-file connections."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "53.3k",
            "lang": "Python",
            "body": "An open-source AI memory system built on ChromaDB, exposed over MCP so any MCP-compatible agent can plug in. Claims best-in-class benchmarks among open alternatives. Agent memory -- what persists across sessions, how relevant context gets retrieved -- is still handled poorly by most teams: naive approaches, in-house hacks, or paid services. MemPalace is positioning as the serious free alternative, with actual benchmark claims backing the positioning rather than just a lighter-weight convenience wrapper."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Nothing in today's sources documented a real end-to-end workflow worth replicating",
        "items": []
      }
    ],
    "closing": "Back tomorrow."
  },
  {
    "id": "2026-05-31",
    "date": "May 31, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships Opus 4.8 and Claude Design, Google drops two new models, and a developer weaponizes a library against AI coding agents",
    "intro": "Anthropic and Google both shipped new models today -- Opus 4.8 and Claude Design from Anthropic, Gemini Omni and 3.5 from Google. The more interesting thread runs through GitHub and the security beat: repos attacking token cost and codebase context are spiking, and a story from the Java ecosystem shows a new attack vector that targets AI agents specifically, not human developers. The jqwik incident is the clearest proof yet that agentic coding workflows have a supply chain problem that traditional development doesn't.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Two new model families and a design tool -- the most new surface area in a single day this year",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Opus 4.8 is the new ceiling of Anthropic's model lineup, available now via API as claude-opus-4-8. Anthropic's Opus tier is where you reach when Sonnet isn't enough -- complex multi-step agents, hard reasoning tasks, code that needs to be right not just plausible. The 4.8 release continues the pattern of each Opus pushing capability further up the line. For developers already on the Anthropic API, the switch is a model ID change."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Claude Design is Anthropic Labs' entry into AI-native design tooling -- the design counterpart to Claude Code. It generates web, desktop, and mobile prototypes from natural language, with sandboxed preview and export to HTML, PDF, PPTX, and video. The Labs label puts it in early/experimental territory. Community response was immediate: nexu-io/open-design, an open-source local-first alternative, crossed 56k stars within days of the announcement and ships with 259 skills, 142 design systems, and support for 17+ CLIs."
          },
          {
            "title": "9 demos of Gemini Omni and Gemini 3.5 in action",
            "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-3-5-videos/",
            "source": "Google AI",
            "body": "Google shipped two new models at I/O 2026: Gemini Omni and Gemini 3.5. The announcement post is a nine-demo reel -- show-don't-tell positioning rather than a benchmarks post. Gemini Omni extends the multimodal line with unified handling across modalities; Gemini 3.5 advances the flagship numbered series. Both are live. If you're actively evaluating frontier options beyond the Anthropic stack, this is where Google's current ceiling sits."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token cost, knowledge graphs, and a massive agent harness dominate this week's star momentum",
        "items": [
          {
            "title": "affaan-m/ECC",
            "url": "https://github.com/affaan-m/ECC",
            "source": "github.com",
            "stars": "199.8k",
            "lang": "JavaScript",
            "body": "ECC is a performance and reliability layer for agent harnesses -- it adds skills, instincts, memory management, and security primitives on top of Claude Code, Codex, Opencode, Cursor, and others. The core design principle is research-first: agents gather context and verify before acting rather than acting on first pass. At nearly 200k stars it's one of the most-starred agent tooling repos in the ecosystem right now. The skill and memory architecture is increasingly the reference design for serious agentic workflows."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "57.1k",
            "lang": "Python",
            "body": "graphify turns any codebase into a queryable knowledge graph -- code, SQL schemas, R scripts, shell scripts, docs, papers, images, and videos become connected nodes rather than flat RAG chunks. Works as a skill for Claude Code, Codex, Cursor, Gemini CLI, and OpenCode. The difference from standard RAG: when your agent asks about a function, it can traverse to the database schema that function queries and the business logic doc that explains the rule. App code, infrastructure, and data model end up in one graph you can walk across."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "56.7k",
            "lang": "Rust",
            "body": "rtk is a CLI proxy that intercepts calls between your terminal and any LLM, cutting token consumption by 60-90% on common dev commands. It handles predictably-large outputs -- git diff, directory listings, build logs -- before they hit the model's context window. Single Rust binary, zero dependencies, works with any agent runtime. Token costs compound fast on large codebases when an agent reads the full tree before every decision; rtk compresses the expensive parts before the meter runs."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "56.2k",
            "lang": "TypeScript",
            "body": "An open-source, local-first alternative to Claude Design that ships as a native desktop app. Includes 259+ skills, 142+ design systems, and exports to HTML, PDF, PPTX, and MP4. Supports HyperFrames -- a structured design-to-animation format -- alongside standard web, desktop, and mobile prototyping. Works with 17+ CLIs: Claude Code, Codex, Cursor, OpenClaw, and more. Bring-your-own-keys. Crossed 56k stars on the same day Claude Design launched -- one of the fastest organic responses to an Anthropic Labs release."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "A supply chain attack designed for AI agents, and a static analysis CLI that smells AI-generated code",
        "items": [
          {
            "title": "Undisclosed addition in jqwik instructed AI coding agents to delete app output",
            "url": "https://arstechnica.com/security/2026/05/fed-up-with-vibe-coders-dev-sneaks-data-nuking-prompt-injection-into-their-code/",
            "source": "Hacker News",
            "author": "joozio",
            "body": "A developer added a hidden prompt injection to jqwik -- a property-based testing library for Java -- that instructed AI coding agents to delete application output files when they ran. The injection is invisible to a human code reviewer but gets picked up and executed when an agent reads the file as context. The target: vibe-coders who paste library source into an agent session without reviewing it. The Ars Technica piece documents the mechanism end to end -- where the instruction was embedded, how it was structured to survive comment stripping, and what it actually triggered. This is a proof of concept for a supply chain attack vector specific to agentic workflows. It has no equivalent in traditional human-read code."
          },
          {
            "title": "Show HN: AISlop, a CLI for catching AI generated code smells",
            "url": "https://github.com/scanaislop/aislop",
            "source": "Hacker News",
            "author": "Heavykenny",
            "body": "AISlop scans a codebase and flags patterns that are statistically common in AI-generated output -- excessive comments explaining obvious code, variables named 'result' and 'data', boilerplate error handling that catches everything and logs nothing, and structural patterns humans rarely write but agents produce constantly. It's not a style linter; it's static analysis with AI-specific heuristics. The practical application is running it in CI to flag when agentic output degrades in quality before it merges. Sixty-three comments on HN with active back-and-forth on which heuristics are reliable -- worth reading that thread alongside the repo."
          }
        ]
      }
    ],
    "closing": "Biggest single-day AI surface area in a while -- check your model IDs."
  },
  {
    "id": "2026-05-30",
    "date": "May 30, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships a model, a design tool, and buys SDK infrastructure in one week -- while GitHub floods with token cutters",
    "intro": "Anthropic is having its loudest week of the year: Opus 4.8 lands, Claude Design ships through Anthropic Labs, and they acquired Stainless -- the company that auto-generated their own SDKs. On GitHub, an independent cluster of repos all converged on the same problem from different angles: your token bill is too high, and there are at least four ways to cut it. Built With AI is thin this week; the one item worth calling out is a game, not a tutorial, but it captures the state of agent UX better than most blog posts.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New model, a design tool, an SDK acquisition, and a lean MoE from Liquid AI",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Anthropic's newest top-tier model is live. Opus 4.8 -- model ID: claude-opus-4-8 -- is the latest in the Claude 4 family and available now via the API and Claude.ai. It sits above Sonnet 4.6 in Anthropic's capability stack and is the default choice for any workflow that was running on the previous Opus version. If you're building on the API, this is your new production ceiling. Update your model string and run your evals."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs shipped Claude Design, a UI prototyping tool that turns natural language into web, mobile, and desktop interface mockups. You get a sandboxed live preview and export to HTML, PDF, PPTX, and video. The release looks like Anthropic's answer to AI design tools from Google and Figma. The fastest demand signal: an open-source alternative -- nexu-io/open-design -- appeared almost immediately and crossed 55k stars within days, with 259 skills and 142 design system integrations already packaged."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Anthropic bought Stainless, the company that auto-generates typed, idiomatic client SDKs from OpenAPI specs. Stainless already powered Anthropic's Python and TypeScript SDKs -- so this formalizes a dependency they had in production. For developers, the practical impact is faster SDK updates and tighter parity between API changes and client library releases. Anthropic now controls the full stack from model to client library. Stainless also powers SDKs for other AI companies, so this acquisition has implications beyond Anthropic's own surface area."
          },
          {
            "title": "LFM2.5 8B-A1B",
            "url": "https://www.liquid.ai/blog/lfm2-5-8b-a1b",
            "source": "Liquid AI",
            "body": "Liquid AI released LFM2.5 8B-A1B: 8 billion total parameters, 1 billion active at inference time, trained on 38 trillion tokens. The A1B mixture-of-experts design means inference cost tracks closer to a 1B dense model than an 8B one, while the 38T training corpus gives it knowledge density that most 8B models can't match. The architecture is Liquid Foundation Model -- not a transformer. This week's ITBench-AA results (frontier models scoring below 50% on enterprise IT agent tasks) make a strong case for efficient small models that can be deployed close to the work."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Four repos, four angles on the same problem: tokens cost too much",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "66.5k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that instructs Claude to respond in compressed caveman pidgin -- 'why use many token when few token do trick' -- cutting response token count by 65%. The core insight: model reasoning quality holds up well when output is stripped of hedging, connective prose, and filler. You install it as a skill and it persists across sessions. At 66.5k stars it's the most-starred new AI tools repo this week. It also works as a clean proof-of-concept for a broader idea: LLM verbosity is a dial, not a requirement."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "56.4k",
            "lang": "Rust",
            "body": "A Rust CLI proxy that intercepts common dev commands -- git status, ls, test output -- and strips the noise before the tokens hit the API. Claims 60-90% token reduction on typical agentic coding sessions. Single binary, zero runtime dependencies. The approach is the inverse of caveman: instead of compressing what the LLM says, it compresses what the LLM reads. Both directions matter in long coding sessions where context accumulates fast. Point it at your LLM endpoint, run your agent as normal."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "56.4k",
            "lang": "Python",
            "body": "An AI coding assistant skill that ingests any folder -- app code, SQL schemas, R scripts, shell scripts, docs, papers, images, videos -- and builds a single queryable knowledge graph across all of it. Works with Claude Code, Codex, Cursor, and Gemini CLI. The novel angle is cross-format indexing: app code, database schema, and infrastructure documentation land in the same graph, so you can ask relational questions across them rather than doing flat context search. The payoff shows up on large monorepos where stuffing the full codebase into context stops working."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "53.1k",
            "lang": "Python",
            "body": "Claims to be the best-benchmarked open-source AI memory system. Built on ChromaDB and exposed via MCP, so it drops into any MCP-compatible agent without glue code. Free, no cloud dependency. Memory systems for agents are proliferating fast and most don't publish comparative performance numbers -- MemPalace does. That makes it the current reference point: if you're building persistent agent memory, this is the baseline to beat until something with better published numbers ships."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "A 60-second game that makes agent permission fatigue impossible to ignore",
        "items": [
          {
            "title": "Continue? Y/N: A 60-second game about AI agent permission fatigue",
            "url": "https://llmgame.scalex.dev",
            "source": "Hacker News",
            "author": "Wirbelwind",
            "body": "Wirbelwind built a browser game that recreates the agent approval loop: you're presented with an endless stream of tool-use permission prompts and you approve or deny them until the clock runs out. It landed 376 points and 172 comments on HN -- unusually high engagement for a game. The build interest is what it reveals: current agentic coding tools interrupt constantly, most approvals are reflexive rubber-stamps, and nobody has shipped a better interaction model. Making that friction into a 60-second game makes the problem legible in a way that no amount of engineering blog posts has managed. The full stack isn't documented in the source, but the live demo is at llmgame.scalex.dev."
          }
        ]
      }
    ],
    "closing": "Back tomorrow."
  },
  {
    "id": "2026-05-29",
    "date": "May 29, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.8 ships, Anthropic buys its SDK vendor, and token-cutting tools flood GitHub",
    "intro": "The biggest model release in weeks drops today: Anthropic ships Opus 4.8 as the new ceiling of the Claude 4 family. In the same news cycle, they acquire Stainless -- the company that already builds their official developer SDKs -- signaling a push toward owning the full developer-experience stack. On GitHub, momentum this week converges on one obsession: cutting token consumption in agentic coding workflows, with multiple independent tools attacking it from different angles.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Anthropic ships a new top model and buys its SDK vendor; CrewAI patches a credential leak",
        "items": [
          {
            "title": "Claude Opus 4.8",
            "url": "https://www.anthropic.com/news/claude-opus-4-8",
            "source": "Anthropic",
            "body": "Anthropic's new frontier model is live in the API today as claude-opus-4-8. It tops the Claude 4 family -- above Sonnet 4.6 -- for tasks where you need maximum capability over cost-efficiency. The Opus tier targets complex reasoning, long-horizon agentic work, and tasks that push smaller models to their limits. The 4.8 increment reflects continued optimization on that profile. If you're already on an earlier Claude 4 model, the API model ID is the only change you need."
          },
          {
            "title": "Anthropic Acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Stainless is the SDK-generation platform behind Anthropic's official Python and TypeScript packages -- the tooling that auto-builds production-grade, type-safe SDKs from an OpenAPI spec. Anthropic has used Stainless as a vendor; now they own it. For developers, the near-term effect is faster, tighter SDK updates when new API features ship -- no external vendor handoff delay. Longer term, Anthropic now controls the full stack from model to SDK, which matters if they plan to surface SDK-generation tooling as part of the developer platform itself."
          },
          {
            "title": "CrewAI 1.14.6",
            "url": "https://github.com/crewAIInc/crewAI/releases/tag/1.14.6",
            "source": "CrewAI",
            "body": "Two fixes in this patch that matter in production. StdioTransport was leaking environment variables into subprocess spawns -- a real issue if API keys or secrets live in your shell env during agentic runs. Fixed. Structured output was also bleeding schema data across tool-calling loops, silently corrupting agent outputs in multi-tool pipelines. Fixed. Checkpoint serialization for type[BaseModel] fields now writes valid JSON, which stabilizes resume behavior in long workflows. Small version bump, significant security and reliability surface."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token-cutting proxies and graph-indexed codebases dominate this week's star momentum",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "56k",
            "lang": "Rust",
            "body": "A single Rust binary with zero dependencies that proxies common dev command output before it reaches your coding agent, stripping 60-90% of tokens. Git status, compiler errors, file listings -- all verbose by design -- get compressed into dense, agent-readable form. Drop it in your PATH, point your agent at it. Works with Claude Code, Codex CLI, and anything that consumes shell output. The savings compound over long sessions: if your agent calls git status fifty times in a run, you've paid full token price for that redundancy fifty times without this."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "56k",
            "lang": "Python",
            "body": "Indexes a project folder -- code, SQL schemas, shell scripts, docs, papers, images, videos -- into a unified, queryable GraphRAG knowledge graph, then ships as a skill for Claude Code, Codex, Cursor, and Gemini CLI. Your agent queries the graph for cross-file relationships instead of cramming raw files into context. Ask how a schema relates to a service, which functions reference a deprecated method, or how infrastructure maps to app code -- and get semantically-linked answers. Most useful on repos too large to fit in a single context window."
          },
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "66k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that cuts token usage 65% by forcing the model to respond in minimal caveman grammar. The premise is blunt: in a tight coding loop, you need code and action, not prose. 'Me see bug. Me fix.' does the same work as a paragraph explaining intent. The constraint is applied at the system-prompt level and plugs into any Claude Code-compatible harness as a drop-in skill. Sounds like a stunt; the token math is real and compounds across long sessions where the model would otherwise narrate every step."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "53k",
            "lang": "Python",
            "body": "Open-source AI memory layer claiming the best benchmark scores among open alternatives. Ships as an MCP server backed by ChromaDB, free to self-host. Agents use it to persist and retrieve facts across sessions without bloating every prompt with conversation history. There are a dozen MCP memory servers; what differentiates this one is the explicit recall-accuracy benchmark claim. If it holds under independent testing, it becomes the default memory drop-in for any MCP-compatible agent stack."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Someone read the Claude Code source so you don't have to",
        "items": [
          {
            "title": "Claude Code -- Everything You Can Configure That the Docs Don't Tell You",
            "url": "https://buildingbetter.tech/p/i-read-the-claude-code-source-code",
            "source": "Hacker News",
            "author": "ankitg12",
            "body": "ankitg12 went through the Claude Code source and surfaced configuration options, env vars, and behavior flags that Anthropic's official docs skip. The methodology is the build: pull the source, trace initialization paths, test undocumented settings against a live instance, document what changed. The output is a reference for builders who want fine-grained control over agent behavior -- hooks, permission overrides, CLAUDE.md conventions that alter how Claude Code operates in non-obvious ways. 224 points and 49 HN comments, which tracks for a post that closes a real documentation gap."
          }
        ]
      }
    ],
    "closing": "Separately: a developer embedded a prompt injection in the jqwik Java testing library specifically to make AI coding agents delete app output -- the supply chain attack surface for agentic workflows is being actively probed."
  },
  {
    "id": "2026-05-28",
    "date": "May 28, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships Opus 4.7 and a design studio, GitHub floods with token-cutting tools",
    "intro": "Anthropic is running the table today -- new flagship model, a new design product, and an SDK acquisition before noon. On GitHub, the dominant pattern is token efficiency: builders are stacking tricks to cut 60-90% of LLM spend, from Rust CLI proxies to caveman syntax constraints. Fine-tuning infrastructure gets a quiet win too.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Anthropic owns the shipping section today with three moves at once",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic's latest flagship, Opus 4.7, lands today. It's a new iteration of the Opus 4 family -- the top of the Claude capability stack for the most demanding agentic workloads: complex reasoning chains, long-context tasks, multi-step tool use where cost-per-token trades against quality-per-step. Available via API and Claude.ai. For teams already running Opus 4, the upgrade path is a model ID swap."
          },
          {
            "title": "Claude Design from Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs ships Claude Design today, a new product aimed at visual and design workflows. It's the first named product out of Anthropic's experimental arm. The open-source community was already moving on the gap -- nexu-io/open-design (54k stars, climbing section) shipped a local-first alternative simultaneously with 259+ agent skills and export to HTML, PDF, PPTX, and MP4. A competing repo at that star count on launch day signals genuine pent-up demand."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Stainless builds tooling that auto-generates typed, idiomatic SDKs from OpenAPI specs. Anthropic's own Python and TypeScript SDKs were already produced with Stainless -- this acquisition makes that relationship first-party. What changes: SDK quality, API ergonomics, and the speed of SDK updates when Anthropic ships new API features all become internal priorities instead of a vendor SLA. For builders who care about how cleanly the API wraps, this signals Anthropic is treating SDK quality as a product surface."
          },
          {
            "title": "Shipping a Trillion Parameters With a Hub Bucket: Delta Weight Sync in TRL",
            "url": "https://huggingface.co/blog/delta-weight-sync",
            "source": "Hugging Face",
            "body": "TRL now supports delta weight sync for fine-tuning iterations -- instead of uploading full model checkpoints between training runs, it syncs only the changed weights. At the scale the blog title references, this cuts checkpoint transfer time and cloud egress costs significantly. If you're running iterative fine-tuning loops and the bottleneck is checkpoint I/O rather than compute, this is the change to pull in. Works with TRL's existing training loop without major refactoring."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token efficiency and codebase-as-graph dominate this week's GitHub momentum",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "65.9k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that forces the model into minimal 'caveman' syntax -- short phrases, no filler, no hedging. The claim is 65% token reduction with no meaningful quality loss on code tasks. The mechanism is real: most LLM output tokens in a coding session are grammatical padding that adds nothing to the actual result. Install it as a skill and the output style shifts to match. At 65k stars in the climbing window, this spread fast -- probably because the ROI is immediate and zero-config."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "55.4k",
            "lang": "Python",
            "body": "Turns a folder of code, SQL schemas, R scripts, shell scripts, docs, papers, images, or videos into a queryable knowledge graph. Works as an agent skill across Claude Code, Codex, OpenCode, Cursor, and Gemini CLI. The novel part is cross-artifact linking: your app code connects to your database schema connects to your infrastructure definitions in one traversable structure. For large repos where a question like 'what touches this table' requires a full context dump, having the graph pre-built changes the query from expensive to instant."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "54.6k",
            "lang": "TypeScript",
            "body": "A local-first, open-source alternative to Claude Design, shipping the same day as Anthropic's official product. Includes 259+ agent skills, 142+ design systems, and generates web, desktop, and mobile prototypes with export to HTML, PDF, PPTX, and MP4. Supports 17+ coding CLIs via bring-your-own-key, including Claude Code, Codex, Cursor, and OpenClaw. The sandboxed preview environment is the key differentiator for teams that can't route design assets through cloud APIs -- competitive work, regulated industries, or local-first preference."
          },
          {
            "title": "AlexsJones/llmfit",
            "url": "https://github.com/AlexsJones/llmfit",
            "source": "github.com",
            "stars": "26.8k",
            "lang": "Rust",
            "body": "One command that tells you which models and providers will actually run on your hardware -- covers GGUF, MLX, and major cloud providers, filtered by your VRAM and RAM. The problem is mundane but real: figuring out whether a 34B GGUF fits your GPU before downloading 20GB involves math, model cards, and usually trial and error. llmfit collapses that to a lookup. Useful for anyone setting up local inference for the first time or tuning a hardware-to-model pairing for a specific task."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Nothing in today's source cleared the bar for a documented end-to-end workflow",
        "items": []
      }
    ],
    "closing": "Three Anthropic moves before noon, a caveman that saves 65% of your tokens, and a knowledge graph for your whole codebase -- good Thursday."
  },
  {
    "id": "2026-05-27",
    "date": "May 27, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.7 lands, Anthropic buys its own SDK vendor, and GitHub's token-cutting arms race heats up",
    "intro": "Anthropic owns the feed today -- new flagship model, a design surface out of Anthropic Labs, and an acquisition of Stainless that brings their SDK pipeline fully in-house. On GitHub, multiple high-star repos are attacking the same problem from different angles: how to cut the token bill on agentic coding workflows. The approaches range from Rust proxy layers to literal caveman speak.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "Anthropic drops a model, launches a design product, and acquires its own SDK vendor in one morning",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic shipped Claude Opus 4.7, the new top of the Claude 4.x model family. Opus is the flagship tier -- built for complex multi-step reasoning, long-horizon agentic work, and tasks where correctness matters more than latency or cost. 4.7 is the latest iteration in the 4.x line, sitting above Sonnet 4.6 and Haiku 4.5 in the current stack. API access is live today."
          },
          {
            "title": "Claude Design",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs launched Claude Design, a native design surface built on Claude. The open-source community already shipped an alternative this week -- nexu-io/open-design, 54k stars, describing support for web, desktop, and mobile prototypes across 71 design systems -- which gives a rough shape of what the official product targets. The Labs tag puts it in early-access territory, not full GA. This is the same playbook Anthropic ran with Claude Code: take a vertical workflow and build opinionated native tooling for it."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Anthropic acquired Stainless, the company that generates typed, idiomatic client SDKs from OpenAPI specs. Stainless already powers Anthropic's own Python and TypeScript SDKs, along with client libraries for OpenAI, Cloudflare, and others. Bringing the team in-house gives Anthropic direct control over the full stack from model API down to the client libraries developers call. SDK updates will ship faster on new model releases, with no coordination lag between Anthropic's API team and an outside vendor."
          },
          {
            "title": "Nemotron-Labs Diffusion Language Models",
            "url": "https://huggingface.co/blog/nvidia/nemotron-labs-diffusion",
            "source": "Hugging Face / NVIDIA",
            "body": "NVIDIA's Nemotron-Labs published diffusion language models on HuggingFace, targeting what the post calls speed-of-light text generation. Diffusion LLMs generate tokens in parallel rather than one at a time, breaking the sequential throughput ceiling of standard autoregressive transformers. The quality gap has historically kept diffusion text models from competing with autoregressive ones -- the post signals meaningful progress on closing it. The throughput implications matter most for latency-sensitive applications where autoregressive streaming is the current bottleneck."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token efficiency is the week's dominant theme on GitHub, with a few genuinely novel infrastructure bets mixed in",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "55k",
            "lang": "Rust",
            "body": "A single Rust binary, zero dependencies, that proxies between your terminal and your LLM provider and cuts token consumption 60-90% on common dev commands. It preprocesses tool results before they hit the context window -- compressing file trees, truncating verbose output, normalizing repetitive diffs. The approach is distinct from prompt-level compression: it operates on data going in, not language coming out. Heaviest gains come from agentic coding workflows where file reads and shell output fill most of the context."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "55k",
            "lang": "Python",
            "body": "Point this at any folder -- code, SQL schemas, shell scripts, docs, papers, images, or videos -- and it builds a queryable knowledge graph. The distinct idea is treating application code, database schema, and infrastructure as a single unified graph rather than separate indexed corpora. Cross-layer queries (which API endpoints touch which tables, and what infra those tables run on) become single-hop lookups instead of multi-search joins. Surfaces as a skill for Claude Code, Codex, Gemini CLI, and Cursor."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "54k",
            "lang": "TypeScript",
            "body": "Local-first, open-source alternative to Claude Design, which Anthropic launched today. Ships with 19 skills and 71 brand-grade design systems covering web, desktop, and mobile prototypes. Exports HTML, PDF, PPTX, and MP4. Runs on Claude Code, Codex, Cursor, Gemini CLI, OpenCode, and several others. The HyperFrames feature generates multi-frame interactive layouts in a single pass. The self-hosted path for teams that want the Claude Design workflow without routing requests through Anthropic's servers."
          },
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "65k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that rewrites model output in stripped-down language -- short words, no hedging, no filler -- claiming 65% token reduction. The model still reasons at full capacity; it just outputs in a compressed dialect the harness can act on. The joke is also a real engineering observation: most of what fills an LLM response is not load-bearing for the downstream tool call that follows. At 65k stars, it has landed as both a novelty and a legitimately deployed compression layer."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "One solid end-to-end Claude Code workflow write-up that earns a bookmark",
        "items": [
          {
            "title": "Claude Code as a Daily Driver: Claude.md, Skills, Subagents, Plugins, and MCPs",
            "url": "https://arps18.github.io/posts/claude-code-mastery/",
            "source": "Hacker News",
            "author": "arps18",
            "body": "arps18 documented their full Claude Code production setup across five areas: structuring CLAUDE.md files to actually shape model behavior, authoring and installing skills, chaining subagents for parallelizable multi-step work, wiring in MCP servers without name collisions, and managing plugin load order. The post covers what breaks in practice -- context drift in long sessions, skill collisions, MCP latency spikes -- not just the happy path. This is operational detail on a tool still moving fast, documented by someone running it daily rather than demoing it once."
          }
        ]
      }
    ],
    "closing": "Three Anthropic announcements before noon -- the 4.x era is running hot."
  },
  {
    "id": "2026-05-26",
    "date": "May 26, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic drops Opus 4.7, acquires Stainless, and GitHub is in a token-efficiency frenzy",
    "intro": "Two big Anthropic moves today: a new flagship model and an SDK-tooling acquisition that signals where their API platform is headed. On GitHub, the dominant theme is token cost -- multiple high-starred repos attacking the same problem from different angles. The OpenAI math result is also worth a closer look; it's the clearest demonstration yet of models doing genuine novel research.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New model, a strategic acquisition, a design product, and an AI math breakthrough",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic's new flagship is available today via API and Claude.ai. Opus 4.7 sits at the top of the Claude 4 family and extends prior versions with improvements to reasoning, instruction-following, and long-context performance. Anthropic is positioning it as a drop-in upgrade -- same API surface as Opus 4.5 and 4.6, higher ceiling. If you're running production workloads on the previous Opus generation, this is the version to test against this week."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Anthropic bought Stainless, the startup that auto-generates typed, idiomatic SDKs from OpenAPI specs. Stainless already powered Anthropic's own Python and TypeScript client libraries, so this is an absorption of an existing relationship rather than a pivot. The practical upshot: SDK quality, update cadence, and multi-language coverage move in-house. The team that's been quietly making the Anthropic client feel well-built now owns that mandate directly."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs shipped Claude Design, a new product that generates UI and design artifacts directly inside Claude. It targets the prototype-to-build gap -- describe or iterate on a design in conversation and Claude outputs production-ready HTML, component code, or mockups. It's an early-access labs release, so rough edges are expected. Notably, the open-source community already built a 52k-star alternative (nexu-io/open-design) before this launched, which gives you a sense of how much demand was queued up."
          },
          {
            "title": "An OpenAI model disproved a central conjecture in discrete geometry",
            "url": "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
            "source": "OpenAI",
            "body": "An OpenAI model solved the unit distance problem, an 80-year-old open conjecture in discrete geometry, by constructing a counterexample human mathematicians hadn't found. The unit distance problem asks how many unit-distance pairs of points can exist in the plane -- deceptively simple framing, deep combinatorial structure underneath. OpenAI describes a search-and-verify loop rather than a one-shot prompt: the model explored candidate constructions iteratively until one held. This is the clearest public demonstration so far of a model doing original mathematical research rather than reproducing known results."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token efficiency and agent memory are the two gravitational centers pulling GitHub this week",
        "items": [
          {
            "title": "affaan-m/ECC",
            "url": "https://github.com/affaan-m/ECC",
            "source": "github.com",
            "stars": "193.6k",
            "lang": "JavaScript",
            "body": "ECC is a performance optimization layer for Claude Code and compatible agents. It installs as a skill and adds structured memory, instinct definitions (reusable decision patterns the agent can invoke without re-reasoning), and security hardening on top of whatever base agent you're running. The core argument is that vanilla Claude Code wastes tokens rediscovering context it already worked out -- ECC caches and structures that state so subsequent calls start informed. Compatible with Codex, Opencode, and Cursor. The star count approaching 200k is the signal here; this is clearly landing for people running agents on non-trivial codebases."
          },
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "65.0k",
            "lang": "JavaScript",
            "body": "Caveman is a Claude Code skill that rewrites the agent's output into stripped-down, low-token language. The README tagline: 'why use many token when few token do trick.' It claims 65% token reduction by eliminating filler, collapsing verbose phrasing, and defaulting to short constructs throughout the reasoning chain. The branding is deliberately absurd, but the star count is real and several forks have documented measurable cost reductions on large projects. The underlying observation -- that verbose model output wastes tokens without improving correctness -- is serious even if the delivery isn't."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "54.1k",
            "lang": "Python",
            "body": "Graphify installs as a skill for Claude Code, Codex, Cursor, or Gemini CLI and indexes your entire project -- source files, SQL schemas, infrastructure config, docs, images, and videos -- into a queryable knowledge graph. The key idea: an agent navigating a large repo wastes context window on file-by-file reads. A knowledge graph lets it ask structural questions (what calls what, which tables does this service own, what does this schema reference) without loading source. GraphRAG as a drop-in coding-agent skill rather than a standalone pipeline to maintain separately."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "52.7k",
            "lang": "TypeScript",
            "body": "Open Design is a local-first, open-source alternative to Anthropic's new Claude Design product. It runs on any Claude Code-compatible agent -- Codex, Cursor, Gemini CLI, Qwen, Copilot, and others -- and ships 19 skills and 71 brand-grade design systems. Output targets: web, desktop, and mobile prototypes, slides, images, videos, and HyperFrames (interactive layered mockups). HTML, PDF, PPTX, and MP4 export all work out of the box. The repo predates Claude Design's launch, which means it already has real usage data and community-contributed design systems that the Anthropic hosted version is starting without."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "One developer's documented case for using AI coding tools as a deliberate slowdown",
        "items": [
          {
            "title": "Using AI to write better code more slowly",
            "url": "https://nolanlawson.com/2026/05/25/using-ai-to-write-better-code-more-slowly",
            "source": "Hacker News",
            "author": "signa11",
            "body": "Nolan Lawson's post pulled 839 points and 328 comments, which means it landed on something real. The documented workflow is counterintuitive: use the model to generate a first draft, then read every line, use the model to explain anything you can't articulate yourself, and rewrite sections where you can't defend why the code is correct. The model becomes a thinking partner and code reviewer rather than an autocomplete engine. Lawson traces specific cases where this deliberate pace caught bugs and design problems that fast-generation workflows missed. The high comment count means there's substantial pushback and counter-methodology in the thread -- the discussion is as useful as the post itself for understanding where this approach breaks down."
          }
        ]
      }
    ],
    "closing": "The math result and the Stainless acquisition are the two things most likely to matter six months from now."
  },
  {
    "id": "2026-05-25",
    "date": "May 25, 2026",
    "title": "AI Pulse",
    "subtitle": "New flagship from Anthropic, AI cracks an 80-year math problem, and GitHub can't stop building token cutters",
    "intro": "Two releases from Anthropic today -- a new flagship model and an SDK acquisition that tightens their developer story -- plus an OpenAI model that disproved an 80-year-old conjecture in discrete geometry. That last result is easy to scroll past and shouldn't be. On GitHub, token reduction is the week's obsession: three different repos attack the same cost problem from different angles, and all three have cracked 50k stars.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "A new flagship model, an SDK acquisition, a math milestone, and content watermarking that's now production-ready.",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic released Opus 4.7, moving the top of its model lineup forward. Opus sits above Sonnet and Haiku in the capability stack, and this version is the most capable Claude available today. Access is through the API (model ID: claude-opus-4-7) and Claude.ai Pro and Team plans. The release continues Anthropic's cadence of point versions between major releases -- 4.7 ships while Sonnet 4.6 remains the default for most API traffic."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Anthropic bought Stainless, the startup that auto-generates production-quality SDKs from OpenAPI specs. Stainless already built the official Python and TypeScript SDKs for the Anthropic API. Bringing that team in-house means SDK updates can ship the moment the API surface changes -- new parameters, new endpoints, new models -- without the lag of a separate vendor relationship. For developers, the Anthropic client libraries should get tighter and faster to update going forward."
          },
          {
            "title": "An OpenAI model has disproved a central conjecture in discrete geometry",
            "url": "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
            "source": "OpenAI",
            "body": "An OpenAI model disproved the unit distance conjecture, an open problem in discrete geometry that dates back roughly 80 years. The conjecture concerned how many pairs of points in a set can be exactly one unit apart. The model found a construction that exceeds the previously believed bound, settling the question in the negative. This is a concrete case of AI producing a genuinely new mathematical result -- not verifying known proofs or generating plausible-sounding steps, but finding an actual counterexample that human mathematicians hadn't."
          },
          {
            "title": "Advancing content provenance for a safer, more transparent AI ecosystem",
            "url": "https://openai.com/index/advancing-content-provenance",
            "source": "OpenAI",
            "body": "OpenAI shipped Content Credentials support and a public verification tool for checking whether content was AI-generated. Content Credentials use the C2PA standard to embed signed metadata directly into image and video files at creation time. The verification tool surfaces that metadata for anyone inspecting a file. For developers building on OpenAI's generation APIs, credentials can attach by default -- the attach-by-default option matters for products that need to disclose AI origin or meet emerging content-labeling requirements."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token cost is the problem everyone is solving this week, with three different approaches all hitting escape velocity simultaneously.",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "64.5k",
            "lang": "JavaScript",
            "body": "Caveman is a Claude Code skill that cuts token usage by 65% by instructing the model to respond in stripped-down caveman speech -- short words, no articles, minimal grammar. The repo name is a joke but the mechanism is real: verbose explanations and boilerplate are the biggest source of token waste in agentic loops, and reducing output verbosity compounds hard across long sessions. Install it as a Claude Code skill and the savings apply to every run automatically, with no changes to your own prompts."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "53.9k",
            "lang": "Rust",
            "body": "RTK is a CLI proxy written in Rust that sits between your terminal and the LLM API, stripping repeated context and compressing file contents before they reach the model. The claimed reduction is 60-90% on common dev commands -- file reads, diffs, grep outputs -- the kinds of repetitive operations that dominate long coding sessions. Ships as a single static binary with zero runtime dependencies. Compatible with any model provider, not just Anthropic."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "53.5k",
            "lang": "Python",
            "body": "Graphify is an installable skill for Claude Code, Codex, Cursor, Gemini CLI, and others that converts a codebase into a queryable knowledge graph. It ingests source files, SQL schemas, shell scripts, docs, papers, images, and videos, then builds a graph connecting them. Queries can traverse relationships that flat vector search misses -- which services call which tables, how a config change propagates, what's downstream of a given function. The graph persists across sessions so subsequent queries skip re-indexing."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.8k",
            "lang": "Python",
            "body": "MemPalace is an open-source memory layer for AI agents, built on ChromaDB and exposed as an MCP server. It stores, retrieves, and ranks memories across sessions and claims the best benchmark scores among open-source memory systems -- the specific comparisons are in the repo. Works with any MCP-compatible agent. For teams running long-running agents that need to recall user context, project state, or prior decisions across separate runs, it's the clearest free alternative to the paid memory providers."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "No builds this weekend cleared the bar for documented end-to-end workflow.",
        "items": []
      }
    ],
    "closing": "Back Monday."
  },
  {
    "id": "2026-05-24",
    "date": "May 24, 2026",
    "title": "AI Pulse",
    "subtitle": "Opus 4.7 drops, Anthropic buys Stainless, and token compression becomes GitHub's obsession",
    "intro": "Two Anthropic moves dominate today: Claude Opus 4.7 at the top of the model stack, and the acquisition of Stainless, which builds SDK generation tooling. The OpenAI math result -- a model disproving an 80-year-old geometry conjecture -- is a genuine research finding worth reading if you missed it earlier this week. On GitHub, the pattern is unmistakable: four of the hottest repos exist solely to shrink what you send upstream.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New flagship model, a strategic acquisition, a math proof, and a new pricing tier",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic's latest flagship replaces Opus 4 at the top of the model stack. It slots into the same API surface -- existing integrations update by swapping the model ID. The release continues Anthropic's cadence of incremental Opus updates, pushing capability forward on reasoning-heavy and long-context tasks. No new API surface, no new pricing structure announced alongside it -- it's a straight model upgrade for teams already on the Opus tier."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Stainless builds tooling that generates idiomatic, production-quality client SDKs from OpenAPI specs -- the work that normally takes a team months to maintain across languages. Anthropic is bringing that capability in-house. The practical effect: Anthropic's official SDKs should improve in consistency and language coverage, and SDK generation becomes an internal asset rather than an external dependency. It also signals that Anthropic is thinking about the full developer surface, not just the model layer."
          },
          {
            "title": "An OpenAI model has disproved a central conjecture in discrete geometry",
            "url": "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
            "source": "OpenAI",
            "body": "An OpenAI model solved the unit distance problem -- an open question in discrete geometry that had stood for roughly 80 years -- by constructing a counterexample that disproves the leading conjecture about how many times a single distance can appear among n points in the plane. The result has been independently verified by mathematicians. This isn't a benchmark score. It's a published finding that human researchers hadn't produced. It's the clearest case so far of a frontier model contributing a genuinely new result to pure math."
          },
          {
            "title": "Claude for Small Business",
            "url": "https://www.anthropic.com/news/claude-for-small-business",
            "source": "Anthropic",
            "body": "Anthropic is opening a dedicated small business tier for Claude -- team seats, centralized billing, and usage controls without a custom enterprise procurement process. It fills the gap between the consumer Pro plan and the enterprise contract that requires a sales conversation. For small teams running Claude in production who've been improvising with multiple individual subscriptions or hitting Pro plan limits, this is the tier they've been waiting for."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token compression dominates -- four repos this week exist to shrink your LLM spend before it shrinks your budget",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "53.5k",
            "lang": "Rust",
            "body": "A CLI proxy that sits between your dev commands and the LLM, cutting token consumption by 60-90% on common operations. Single Rust binary, zero runtime dependencies. It intercepts at the proxy layer -- stripping redundant context, deduplicating repeated symbols, and passing a leaner request upstream without changing the response the model sees. Targets the agentic coding loop specifically, where the same file headers get resent dozens of times per session. Works with Claude Code, Codex, Cursor, and anything else that speaks HTTP to a model endpoint."
          },
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "64.2k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that cuts 65% of token usage by having the model respond in stripped-down caveman syntax -- short sentences, no articles, no hedging, minimal punctuation. The idea is that most of what fills a response is linguistic scaffolding the model adds for readability, not actual information. Caveman mode drops that scaffolding. For tight iteration loops where you're reading output programmatically or scanning fast, it's a real compression win. 64k stars in short order suggests a lot of builders are feeling the token bill."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "52.8k",
            "lang": "Python",
            "body": "A skill for Claude Code, Codex, Cursor, Gemini CLI, and others that converts a codebase into a queryable knowledge graph -- source files, SQL schemas, infrastructure definitions, docs, images, and videos land in one unified graph. Instead of dumping raw files into a prompt, the agent queries the graph for exactly what it needs. No preprocessing pipeline to configure, works on any folder you point it at. For large monorepos where context window management is the main bottleneck, this changes the retrieval model from brute-force inclusion to targeted lookup."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.7k",
            "lang": "Python",
            "body": "An open-source AI memory system backed by ChromaDB, exposed via MCP, and free to self-host. The project claims the best published benchmarks in the open-source memory category -- notable because most memory systems don't publish retrieval accuracy numbers at all. MCP support means it integrates directly into Claude Code and any other MCP-compatible agent without custom glue code. For teams building agents that need persistent, structured memory without paying for a managed memory service, this is the benchmark to beat."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "One documented workflow that clears the bar today",
        "items": [
          {
            "title": "Show HN: I Made a Claude Skill for Spec-Driven Development (SDD)",
            "url": "https://github.com/FredAntB/Spec-Driven-Development",
            "source": "Hacker News",
            "author": "NTRIXLM",
            "body": "The author built a Claude Code skill that enforces a spec-first workflow: before writing any code, the agent generates a formal specification document and waits for explicit approval before touching the codebase. The skill is designed to counter the default agentic behavior of immediately diving into implementation -- which frequently produces code that solves the wrong problem at high token cost. The repo includes the skill file itself plus documented guidance for structuring specs the model can execute against reliably. The approach is narrow and immediately adoptable: install the skill, run your next feature request through it, and see whether forcing a written spec before any code is generated changes the output quality. It targets the specific failure mode -- AI jumping to implementation before understanding requirements -- that trips up most teams using Claude Code on non-trivial work."
          }
        ]
      }
    ],
    "closing": "Back tomorrow."
  },
  {
    "id": "2026-05-23",
    "date": "May 23, 2026",
    "title": "AI Pulse",
    "subtitle": "Anthropic ships Opus 4.7 and buys an SDK company, token-efficiency tools take over GitHub, and an OpenAI model cracks an 80-year math problem",
    "intro": "Model infrastructure is the story today. Anthropic dropped Opus 4.7 and absorbed Stainless in the same week, pulling the full API-to-model stack tighter under one roof. On GitHub, the fastest-climbing repos are not new models -- they are proxies, memory layers, and graph tools that make the models you are already running cheaper and more capable. The OpenAI math result is the most technically surprising item of the week and worth five minutes of your attention.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "A new flagship model, a strategic SDK acquisition, a math milestone, and early data on how AI search is reshaping discoverability",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic's newest frontier model is live. Opus 4.7 is the latest in the Opus line, succeeding Opus 4 with improvements to sustained reasoning and instruction-following on long, complex tasks. It ships on the Anthropic API under the claude-opus-4-7 model ID and is rolling out to Claude.ai plans. Full benchmark details and pricing are on the release page. If you are running claude-opus-4 in production today, this is the drop-in upgrade."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Anthropic acquired Stainless, the company behind auto-generated, idiomatic SDKs from OpenAPI specs. Stainless already powered Anthropic's official Python and TypeScript client libraries. Bringing it fully in-house means SDK updates can ship in sync with model and API changes rather than trailing them. The broader play: if Anthropic owns the tooling that generates client libraries, every new API capability can surface in the SDK on day one -- and third-party services that want to be callable from Claude agents have a clear path to get there."
          },
          {
            "title": "An OpenAI model has disproved a central conjecture in discrete geometry",
            "url": "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
            "source": "OpenAI",
            "body": "An OpenAI model disproved the unit distance conjecture -- an open problem in discrete geometry that had stood for 80 years. The model found a counterexample that human mathematicians had not located. This is not a proof assistant helping a human; the model drove the mathematical search itself, and the result has been independently verified. The significance is in the mode: AI doing novel mathematics rather than assisting human mathematicians, in a domain where the search space is too large for exhaustive enumeration."
          },
          {
            "title": "How AI Mode is changing the way people search in the U.S.",
            "url": "https://blog.google/products-and-platforms/products/search/ai-mode-us-insights/",
            "source": "Google AI",
            "body": "Google published the first substantial usage data from AI Mode, the conversational layer now available in U.S. Search. Queries through AI Mode run longer and span multiple follow-up questions in a single session -- people are using it for the kind of multi-step research that previously required assembling results from several separate searches. For builders: citation patterns in AI Mode differ from classic blue-link results. If your product depends on search-driven traffic or discoverability, the shift in how sources get surfaced is worth understanding now rather than later."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token efficiency and memory architecture dominate GitHub stars this week",
        "items": [
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "53k",
            "lang": "Rust",
            "body": "A CLI proxy that intercepts common dev commands -- git status, file reads, directory listings -- and rewrites their output into shorter representations before they reach the LLM context window. The repo claims 60-90% token reduction on typical agentic coding sessions. Ships as a single Rust binary with zero external dependencies: drop it in front of your agent harness and it works. The approach is structured compression rather than summarization -- it understands the format of shell output and strips redundant parts rather than asking the model to do the trimming in-context."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.7k",
            "lang": "Python",
            "body": "An open-source AI memory system that exposes an MCP server, making it drop-in compatible with Claude, Codex, and anything else that speaks MCP. The differentiator is a published benchmark suite comparing it against other open-source memory systems on retrieval quality, latency, and recall at varying corpus sizes -- it claims best results across the board. Free to self-host. Worth evaluating if you have been bolting memory onto agents with ad-hoc vector search and hitting consistency or quality ceilings at scale."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "52.2k",
            "lang": "Python",
            "body": "Point it at a folder -- code, SQL schemas, R scripts, shell scripts, docs, papers, images, videos -- and it builds a queryable knowledge graph from the whole thing. Ships as a skill for Claude Code, Codex, Gemini CLI, and Cursor. The novel part is cross-entity linking across artifact types: your app code, database schema, and infrastructure definitions end up in one graph you can query together. GraphRAG is not new, but a unified multi-modal ingestor that handles a mixed codebase without pre-processing is. Most useful on large repos where no single engineer holds the full mental model."
          },
          {
            "title": "nexu-io/open-design",
            "url": "https://github.com/nexu-io/open-design",
            "source": "github.com",
            "stars": "50.3k",
            "lang": "TypeScript",
            "body": "A local-first, open-source alternative to Claude Design -- Anthropic's hosted design product. Ships with 19 agent skills and 71 brand-grade design systems pre-loaded. Generates web, desktop, and mobile prototypes plus slides, images, videos, and interactive HyperFrames. Exports to HTML, PDF, PPTX, and MP4. Runs on Claude Code, Codex, Cursor, Gemini CLI, and several others via BYOK. If you want AI-native design tooling without sending data to a hosted service, this is the most complete self-hostable option available today."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Two builders document hard-won techniques for keeping agentic loops from compounding their own mistakes",
        "items": [
          {
            "title": "Formal Verification Gates for AI Coding Loops",
            "url": "https://reubenbrooks.dev/blog/structural-backpressure-beats-smarter-agents/",
            "source": "Hacker News",
            "author": "pyrex41",
            "body": "Reuben Brooks documents what he calls structural backpressure: inserting formal verification checkpoints into an agentic coding loop so the agent cannot advance past a gate unless it produces code that passes a lightweight structural check. The argument is that catching hallucinated APIs and type errors early -- before they compound across 20 agent turns -- beats waiting for the agent to self-correct at the end. He walks through the toolchain, the prompt structure that treats verification failures as hard stops rather than advisory suggestions, what broke in early runs, and the final setup that now runs unattended. 144 points and 32 comments on HN, with useful variations in the thread from builders who have hit similar failure modes."
          },
          {
            "title": "Testing distributed systems with AI agents",
            "url": "https://github.com/shenli/distributed-system-testing",
            "source": "Hacker News",
            "author": "shenli3514",
            "body": "A GitHub repo documenting a workflow for using AI agents to generate fault-injection and chaos test scenarios against a distributed key-value store. The repo includes the prompt scaffolding used to drive scenario generation, the harness that runs tests against a live test cluster, and annotated notes on which failure modes the agent produced reliably versus where it needed human steering. The author calls out which partition and crash scenarios the agent found on its own, which it consistently missed, and what prompt changes tightened coverage. Enough structure to adapt to your own distributed system."
          }
        ]
      }
    ],
    "closing": "Ship something weird this weekend."
  },
  {
    "id": "2026-05-22",
    "date": "May 22, 2026",
    "title": "AI Pulse",
    "subtitle": "New Opus drops, AI cracks an 80-year-old math problem, and GitHub is obsessed with cutting token bills",
    "intro": "Two things worth slowing down for today: an OpenAI model independently disproved a conjecture in discrete geometry that has been open since the 1940s -- that is not a benchmark, that is a resolved open problem in pure mathematics. Separately, Anthropic shipped Opus 4.7, acquired Stainless (the SDK generation company behind most of Anthropic's own client libraries), and launched a UI prototyping tool from its internal research group. On GitHub, the dominant theme is token reduction -- multiple high-star repos attacking the same cost problem from different angles.",
    "sections": [
      {
        "label": "SHIPPING",
        "blurb": "New flagship model, a math milestone, an SDK acquisition, and a design prototyping tool from Anthropic Labs",
        "items": [
          {
            "title": "Claude Opus 4.7",
            "url": "https://www.anthropic.com/news/claude-opus-4-7",
            "source": "Anthropic",
            "body": "Anthropic released Claude Opus 4.7, updating the top tier of the Claude model stack. Opus is the choice for the heaviest reasoning tasks -- long-horizon agentic runs, complex analysis, research synthesis, anything where output quality matters more than latency or cost. This release supersedes Opus 4.6 across the API. The full lineup now runs Opus 4.7 at the top, Sonnet 4.6 in the middle, and Haiku 4.5 at the bottom. Benchmark deltas from 4.6 and pricing details are in the full announcement."
          },
          {
            "title": "An OpenAI model has disproved a central conjecture in discrete geometry",
            "url": "https://openai.com/index/model-disproves-discrete-geometry-conjecture",
            "source": "OpenAI",
            "body": "An OpenAI model resolved the unit distance problem, an open question in discrete geometry that has been unsettled for roughly 80 years. The problem asks how many unit-distance pairs can appear among n points in the plane. The model produced a proof disproving the leading conjecture about the upper bound -- not assisting a human researcher, but closing the problem independently. Previous AI math results have mostly been verification or formalization of known proofs. This is different: novel proof discovery on a problem the field had not solved."
          },
          {
            "title": "Anthropic acquires Stainless",
            "url": "https://www.anthropic.com/news/anthropic-acquires-stainless",
            "source": "Anthropic",
            "body": "Anthropic bought Stainless, the company that auto-generates production-quality SDKs from OpenAPI specs. Stainless handles the painful parts -- pagination, retries, streaming, type safety -- across Python, TypeScript, Go, Java, and more. Anthropic has already been using Stainless-generated code for its official client libraries. Bringing the team in-house means API changes can propagate to SDKs faster, and the tooling layer sits closer to the people designing the model API surface."
          },
          {
            "title": "Claude Design -- Anthropic Labs",
            "url": "https://www.anthropic.com/news/claude-design-anthropic-labs",
            "source": "Anthropic",
            "body": "Anthropic Labs shipped Claude Design, a tool for generating UI prototypes from natural language. Describe an interface and it produces a sandboxed, working preview -- web, desktop, and mobile targets supported. The output is production-adjacent HTML rather than design files, which puts it in the same lane as v0 and Bolt rather than Figma. The Anthropic Labs label signals experimental rather than committed product. Open-source alternatives targeting the same use case were already circulating on GitHub before this announcement landed."
          }
        ]
      },
      {
        "label": "CLIMBING",
        "blurb": "Token reduction tools dominate the star charts, alongside a knowledge-graph skill and a benchmarked open-source memory system",
        "items": [
          {
            "title": "JuliusBrussee/caveman",
            "url": "https://github.com/JuliusBrussee/caveman",
            "source": "github.com",
            "stars": "63.6k",
            "lang": "JavaScript",
            "body": "A Claude Code skill that makes the model respond like a caveman -- short words, no filler, no hedging. The author measured a 65% token reduction on typical dev sessions compared to default Claude verbosity. The trade-off is obvious: you get terse responses that read like they came from a very competent grunt. For long agentic runs where you are paying per token and do not need structured prose explanations, it is a real cost lever. Install it as a skill and caveman mode becomes a toggle, not a permanent setting."
          },
          {
            "title": "rtk-ai/rtk",
            "url": "https://github.com/rtk-ai/rtk",
            "source": "github.com",
            "stars": "52.7k",
            "lang": "Rust",
            "body": "A CLI proxy that intercepts LLM calls and compresses tokens before they go out, targeting the common dev-loop patterns -- file reads, git operations, shell output -- that tend to send the same boilerplate context on every call. Claims 60-90% token reduction on those patterns. It ships as a single Rust binary with zero external dependencies, so it drops into any workflow without a Python env or Node process. Works across Claude, GPT, and any OpenAI-compatible API endpoint."
          },
          {
            "title": "safishamsi/graphify",
            "url": "https://github.com/safishamsi/graphify",
            "source": "github.com",
            "stars": "51.3k",
            "lang": "Python",
            "body": "An installable AI coding skill that ingests any project directory -- source code, SQL schemas, shell scripts, docs, images, videos -- and builds a queryable knowledge graph across the whole thing. The graph links code to the database tables it touches, the infrastructure it runs on, and the documentation that describes it. Query in natural language and get answers that span the full stack rather than the single file currently in context. Installable as a skill for Claude Code, Codex, Cursor, and Gemini CLI."
          },
          {
            "title": "MemPalace/mempalace",
            "url": "https://github.com/MemPalace/mempalace",
            "source": "github.com",
            "stars": "52.7k",
            "lang": "Python",
            "body": "Claims the top position on open-source AI memory benchmarks. Stores conversation history, user preferences, and task context in a ChromaDB vector store and exposes retrieval via MCP, so any MCP-compatible agent plugs in without custom integration work. Runs fully local or self-hosted -- no hosted dependency, no per-seat fee. Memory is the layer that converts stateless LLM calls into something that behaves like it knows your context. MemPalace is the open alternative to the hosted memory tiers the major agent platforms are building out."
          }
        ]
      },
      {
        "label": "BUILT WITH AI",
        "blurb": "Two workflow writeups: formal verification as a hard gate in coding loops, and AI agents running distributed system tests",
        "items": [
          {
            "title": "Formal Verification Gates for AI Coding Loops",
            "url": "https://reubenbrooks.dev/blog/structural-backpressure-beats-smarter-agents/",
            "source": "Hacker News",
            "author": "pyrex41",
            "body": "Reuben Brooks documented a workflow where formal verification tools act as hard exit gates in AI coding agent loops -- what he calls structural backpressure. The central argument: prompting an agent to validate its own output fails in interesting ways, but wiring a verifier into the loop exit condition forces correctness structurally. He walks through which verification approaches he connected to the agent loop, where agentic runs broke without them, how he handled verification failures without stalling the agent, and why he concluded the fix for flaky agents is not a smarter model but a harder structural definition of what done means. The 142-point HN thread and 31 comments suggest the framing resonated beyond his specific stack."
          },
          {
            "title": "Testing distributed systems with AI agents",
            "url": "https://github.com/shenli/distributed-system-testing",
            "source": "Hacker News",
            "author": "shenli3514",
            "body": "shenli open-sourced a harness that uses AI agents to test distributed systems -- injecting faults, checking consistency properties, and generating test scenarios that would take hours to hand-author. The repo documents the multi-agent setup: which agent handles fault injection, which handles observation, how they coordinate, what the test oracle looks like, and where the approach broke during development. It is less a finished product and more a reproducible methodology with scaffolding included -- enough structure to fork, point at a different distributed system, and run the same workflow."
          }
        ]
      }
    ],
    "closing": "Back tomorrow with whatever ships overnight."
  },
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
