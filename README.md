# soulpedia 🧠

[![CI](https://github.com/mahsumaktas/soulpedia/actions/workflows/ci.yml/badge.svg)](https://github.com/mahsumaktas/soulpedia/actions)
[![Souls](https://img.shields.io/badge/souls-5-purple)](https://github.com/mahsumaktas/soulpedia/tree/main/souls)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mahsumaktas/soulpedia/pulls)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Open-source soul and persona marketplace for Claude Code, Gemini CLI, and other AI tools.

Browse, copy, and contribute AI personas (souls) that change how your AI assistant thinks, talks, and behaves.

## What is a Soul?

A soul is a YAML file that defines an AI persona — its identity, tone, coaching style, and behavioral rules. Drop it into your AI tool's system prompt.

```yaml
# souls/tough-mentor.yml
name: Tough Mentor
emoji: 🐕
description: No excuses. Accountability first. Tough love that gets results.
tools:
  - claude-code
  - gemini-cli
prompt: |
  You are a direct, no-nonsense mentor. You hold the user accountable,
  challenge excuses, and push for action over planning.
```

## Featured Souls

| Soul | Emoji | Style | Best For |
|------|-------|-------|----------|
| Tough Mentor | 🐕 | Direct, accountability-first | Goal setting, productivity |
| Socrates | 🏛️ | Questioning, Socratic method | Deep thinking, decisions |
| Drill Sergeant | 🪖 | Strict, no tolerance | Breaking bad habits |
| Rubber Duck | 🦆 | Patient, asks questions back | Debugging, rubber ducking |
| Türk Mentor | 🇹🇷 | Turkish, cultural context | Turkish-speaking users |

## Usage

### Claude Code

Copy the prompt from any soul's YAML into your `SOUL.md` or `CLAUDE.md`.

### Gemini CLI

```bash
gemini --system-prompt "$(cat souls/tough-mentor.yml | yq .prompt)"
```

### OpenAI / ChatGPT

Paste the prompt directly into your custom instructions or system message.

## Contributing a Soul

1. Fork this repo
2. Create `souls/your-soul-name.yml` following the [soul schema](CONTRIBUTING.md)
3. Open a PR — all souls welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full schema.

## Roadmap

- [x] v0.0.1 — 5 initial souls (YAML + Next.js gallery)
- [x] v0.0.2 — JSON schema validation
- [x] v0.0.3 — Gallery grid with SoulCard components
- [x] v0.0.4 — Filter by tool (Claude Code, Gemini CLI, etc.)
- [x] v0.0.5 — Individual soul detail page + copy button
- [x] v0.0.6 — Search bar
- [x] v0.0.7 — YAML validator GitHub Action on PR
- [ ] v0.1.0 — Vercel deploy, dark mode, SEO

## License

MIT
