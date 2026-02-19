# Contributing to Soulpedia

## Add a New Soul

1. Fork this repo
2. Create a new file in `souls/your-soul-name.yml`
3. Follow the schema below
4. Open a PR — it will be validated automatically

## Soul Schema

```yaml
id: unique-kebab-case-id
name: Display Name
emoji: "🎭"
description: One sentence description (max 100 chars)
category: Mentor | Philosophy | Productivity | Debug | Creative | Technical
tools:
  - Claude Code      # list compatible AI tools
  - Gemini CLI
author: your-github-username
version: "1.0"
prompt: |
  Your full soul/persona prompt here.
  Can be multiple lines.
```

## Guidelines

- Keep prompts focused and specific
- Test with at least one AI tool before submitting
- No harmful, hateful, or manipulative personas
