# Contributing and Extending agy-skills

This guide explains how to fork this repository, customize its configuration, scaffold new agent skills, and build custom workflows for Google Antigravity.

---

## 1. Quickstart

Get your development environment set up in three commands:

```bash
# 1. Clone your fork or local repository
git clone https://github.com/<your-handle>/agy-skills.git
cd agy-skills

# 2. Link all skills into your local Antigravity environment
npm run link

# 3. Run the complete integrity test suite
npm test
```

`npm run link` creates symlinks/junctions pointing from `~/.gemini/config/skills` and `~/.agents/skills` directly into your workspace. When you pull changes or edit skills, Antigravity picks them up immediately.

---

## 2. Decoupling and Customizing a Fork

To rebrand or configure this repository for your team, edit `skills.config.json` at the root:

```json
{
  "projectName": "my-team-skills",
  "author": {
    "name": "Your Name",
    "handle": "yourhandle",
    "githubUrl": "https://github.com/yourhandle/my-team-skills",
    "docsUrl": "https://yourhandle.github.io/my-team-skills"
  },
  "routerSkill": {
    "name": "ask-assistant",
    "path": "skills/engineering/ask-assistant/SKILL.md",
    "description": "Router over team skills."
  },
  "buckets": {
    "engineering": { "description": "daily code work", "promoted": true, "docsPath": "docs/engineering" },
    "productivity": { "description": "daily workflow tools", "promoted": true, "docsPath": "docs/productivity" },
    "misc": { "description": "rarely used", "promoted": false },
    "in-progress": { "description": "experimental skills", "promoted": false }
  },
  "overlayDir": "skills/custom",
  "tracker": {
    "default": "github",
    "supported": ["github", "linear", "scratch"]
  }
}
```

All verification scripts (`npm test`, `npm run link`, `npm run new-skill`) automatically adapt to these settings.

---

## 3. Scaffolding New Skills

You can create new skills through the deterministic CLI or interactively through Antigravity.

### Method A: Deterministic CLI (`npm run new-skill`)

Run the scaffolder with CLI arguments:

```bash
npm run new-skill -- --name database-migration --bucket engineering --invoked user --description "Execute zero-downtime database migrations with automated rollbacks."
```

Options:
- `--name`, `-n`: Skill identifier in kebab-case (e.g. `database-migration`).
- `--bucket`, `-b`: Target bucket (`engineering`, `productivity`, `misc`, `in-progress`, `custom`).
- `--invoked`, `-i`: `user` for slash commands or `model` for autonomous model triggers.
- `--description`, `-d`: Short 1 to 2 sentence summary of purpose and defining constraints.
- `--dry-run`: Preview file generation without writing to disk.

### Method B: Interactive Agent Workflow (`/new-skill`)

In your Antigravity conversation, run:

```
/new-skill
```

The agent will interview you about the skill's purpose, leading words, and completion criteria, then invoke the scaffolder and wire the artifacts automatically.

---

## 4. What the Scaffolder Auto-Wires

The scaffolder updates the entire repository dependency graph in one operation:

1. Creates `skills/<bucket>/<name>/SKILL.md` with YAML frontmatter.
2. Creates `docs/<bucket>/<name>.md` conforming to the 4-section documentation standard (if promoted).
3. Inserts an entry into `skills/<bucket>/README.md`.
4. Inserts an entry into the root `README.md` under the appropriate section.
5. Injects a route into the central router skill (`skills/engineering/ask-fred/SKILL.md`).
6. Generates a validation test fixture in `tests/skills/test_<name>.py`.
7. Re-runs `npm run link` so the new skill is immediately usable in Antigravity.

---

## 5. Private and Experimental Skills (`skills/custom/`)

If you want to create private or experimental skills without committing them to version control:

1. Place your skill in `skills/custom/<my-private-skill>/SKILL.md`.
2. Run `npm run link`.
3. `skills/custom/` is gitignored by default, allowing local skills to run side by side with tracked bucket skills.

---

## 6. Authoring Disciplines for Agents

When drafting `SKILL.md` runbooks, follow these repository principles:

- **Leading Words**: Anchor behavior using established concepts the model already understands (_tight feedback loop_, _tracer bullets_, _deep module_, _red-green_).
- **Progressive Disclosure**: Keep execution steps in `SKILL.md` lean. Move reference catalogs, schemas, and lookup tables into a `references/` subdirectory behind context pointers.
- **Positive Framing**: Direct the model toward desired actions rather than listing prohibitions.
- **Checkable Completion Criteria**: Ensure every step and runbook ends with observable, verifiable acceptance checks.
- **No Em-Dashes**: Never use em-dashes anywhere in prose. Use commas, colons, periods, or parentheses instead.

---

## 7. Testing and Verification

Run the test suite before submitting pull requests:

```bash
# Run all static linters (SEO, skill schema, link integrity, terminology)
npm test

# Run Python SDK benchmarks and test fixtures
npm run test:sdk

# Run both suites
npm run test:all
```

