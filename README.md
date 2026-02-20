<div align="center">
  <img src="https://em-content.zobj.net/source/apple/391/brain_1f9e0.png" width="100" alt="Brain Emoji" />
  <h1>soulpedia</h1>
  <p>The open-source soul and persona marketplace for AI CLI tools.</p>
  
  <p>
    <a href="https://github.com/mahsumaktas/soulpedia/actions/workflows/ci.yml">
      <img src="https://github.com/mahsumaktas/soulpedia/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
    </a>
    <a href="https://github.com/mahsumaktas/soulpedia/tree/main/souls">
      <img src="https://img.shields.io/badge/souls-5+-purple" alt="Souls Count" />
    </a>
    <a href="https://github.com/mahsumaktas/soulpedia/pulls">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
    </a>
  </p>
</div>

<hr/>

> **Stop prompting. Start giving them a soul.** 
> Browse, copy, and contribute advanced AI personas (souls) that redefine how your AI assistants (Claude Code, Gemini CLI, Cursor, OpenClaw) think, talk, and behave.

## 🚀 Quick Start (CLI)

No need to copy-paste manually. Inject a soul directly into your current directory using the Soulpedia CLI.

```bash
# Inject the 'paranoid-secops' soul to your local Claude Code configuration
npx github:mahsumaktas/soulpedia install paranoid-secops --target claude

# Inject the 'socrates' soul to Gemini CLI
npx github:mahsumaktas/soulpedia install socrates --target gemini
```

*This command will automatically create/append the soul's deep memory, restrictions, and tone to your local `.md` configuration files (like `CLAUDE.md`, `GEMINI.md`).*

## 🧠 What exactly is a "Soul"?

A soul is much more than a system prompt. It is a highly-structured YAML file that defines an AI's identity, communication tone, strict behavioral rules (bans), and persistent beliefs (memory injections).

```yaml
# souls/the-architect.yml
id: the-architect
name: The Software Architect
emoji: "📐"
description: Think big picture, design systems. Never writes code.
prompt: |
  You are The Software Architect. You are obsessed with system design.
  Guide the user to design the right system architecture.
tone:
  - "Authoritative"
  - "Abstract"
bans:
  - "Do not write actual implementation code."
memory_injections:
  - "Scalability and maintainability are more important than quick fixes."
```

## 🏆 Featured Souls

| Emoji | Soul | Best For | Behavior |
|-------|------|----------|----------|
| 🐕 | [Tough Mentor](souls/tough-mentor.yml) | Procrastinators | Direct, accountability-first, no excuses. |
| 🏛️ | [Socrates](souls/socrates.yml) | Deep thinkers | Socratic method. Answers with probing questions. |
| 📐 | [The Architect](souls/the-architect.yml) | System design | Refuses to write code. Forces diagramming and architecture. |
| 🛡️ | [Paranoid SecOps](souls/paranoid-secops.yml) | Code reviews | Extremely suspicious. Enforces Zero-Trust principles. |
| 🧘 | [The Minimalist](souls/the-minimalist.yml) | Peak optimization | Zero fluff. Shortest possible, highly-optimized answers. |

## 🌐 Web Interface

Explore, filter, and search through all souls via the [Next.js Web Interface]().

1. **Live Search:** Find souls by name, tags, or description instantly.
2. **Detailed Breakdown:** View the soul's strict bans, communication tone, and system prompts beautifully formatted.
3. **One-Click Copy:** Copy the raw prompt if you want to use it manually in ChatGPT or OpenAI interfaces.

### Local Development (Web)
```bash
git clone https://github.com/mahsumaktas/soulpedia.git
cd soulpedia
npm install
npm run dev
```

## 🤝 Contributing

We want YOUR custom souls! Whether it's a "Cyberpunk Hacker", "Zen Master", or a "React Native Purist".

1. Fork this repository.
2. Create a new `.yml` file in the `souls/` directory.
3. Make sure it aligns with the strict [JSON Schema (`souls/schema.json`)](souls/schema.json).
4. Open a Pull Request! Our automated GitHub Action will validate your soul's format.

Check out our full [CONTRIBUTING.md](CONTRIBUTING.md) guide.

## 🗺️ Roadmap

- [x] v0.0.1 — Initial 5 Souls
- [x] v0.0.2 — JSON Schema Validation
- [x] v0.0.3 — UI: Gallery Grid
- [x] v0.0.4 — UI: Filter by tool and category
- [x] v0.0.5 — UI: Slug pages with detailed breakdowns
- [x] v0.0.6 — UI: Live Search bar integration (#6)
- [x] v0.0.7 — CI: YAML validator GitHub Action on PR (#8)
- [x] v0.0.8 — CLI: `soulpedia install <soul>` script to inject files locally
- [ ] v0.1.0 — Vercel Deploy & Global npm package release

---
<div align="center">
  Released under the MIT License.
</div>