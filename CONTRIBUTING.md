# Contributing to Soulpedia

First off, thanks for taking the time to contribute! 🎉 
Soulpedia is built on the creativity of its community. By contributing an AI Persona (Soul), you are helping developers worldwide shape how their AI agents interact with them.

## 🛠️ How to Contribute a New Soul

1. **Fork the repo** and clone it locally.
2. **Create a new branch** for your soul: `git checkout -b soul-the-cynical-reviewer`
3. **Create a YAML file** in the `souls/` folder. Use the ID of your soul as the filename (e.g. `cynical-reviewer.yml`).
4. **Follow the Schema** (Detailed below).
5. **Commit and Push**, then open a Pull Request (PR)!

*(Note: We have an automated GitHub Action that will validate your YAML file against our JSON Schema to ensure no properties are missing!)*

---

## 🧠 The Soul Schema

Every soul must follow the structure defined in `souls/schema.json`. Here is a breakdown of what makes a great soul:

### Required Fields
- `id`: Unique identifier (kebab-case, e.g., `the-hacker`)
- `name`: Display name (e.g., `The Hacker`)
- `emoji`: One visual representation (e.g., `💻`)
- `description`: 1-2 sentence pitch of what this soul does.
- `prompt`: The core system instructions. What is their main task? Who are they?

### Advanced Fields (Highly Recommended!)
To make a *real* persona, you must use these advanced fields. They are injected into the agent's memory by the Soulpedia CLI.

- `tone` (Array of Strings): How does the agent communicate? (e.g., `["Authoritative", "Sarcastic", "Uses short sentences"]`)
- `bans` (Array of Strings): What is the agent STRICTLY forbidden from doing? This is crucial for strong personas. (e.g., `["Never write boilerplate code", "Do not apologize"]`)
- `memory_injections` (Array of Strings): What core beliefs should the agent hold above all else? (e.g., `["Simplicity is the ultimate sophistication", "Always assume the user is tired"]`)

### Example of a Perfect Submission

```yaml
id: the-minimalist
name: The Minimalist
emoji: "🧘"
description: One-liners. Zero fluff. Peak optimization.
category: Coding
tools:
  - Claude Code
  - Gemini CLI
  - OpenClaw
author: your_github_username
version: "1.0"
prompt: |
  You are The Minimalist. You believe perfection is achieved when there is nothing left to take away.
  You provide the most concise, optimal, and elegant solutions possible.
tone:
  - "Extremely concise"
  - "Cold"
  - "Direct"
bans:
  - "Do not write explanatory paragraphs."
  - "Do not use conversational filler (e.g., 'Here is the code')."
memory_injections:
  - "Less is more."
  - "Silence is golden."
```

## 💻 Local Development for the UI / CLI
If you want to contribute to the React (Next.js) code or the CLI script:

1. Run `npm install`
2. Run `npm run dev` to start the Next.js server on `localhost:3000`.
3. To test the CLI script locally, use `node bin/soulpedia.js install socrates`.
4. Ensure your code passes TypeScript checks (`npm run build`) before opening a PR.

Thanks again for your contribution! We can't wait to meet the new Souls you create!