---
title: "new-skill: Scaffold & Author Agent Skills | agy-skills"
description: "Scaffold a new agent skill, documentation page, test fixture, and router registration with interactive quality checks."
keywords: ["new-skill", "create skill", "antigravity skills", "authoring skills", "scaffold skill"]
permalink: /skills-new-skill/
---

## What it does

Scaffolds a new agent skill, documentation page, test fixture, and router registration with interactive quality checks. It handles the multi-file wiring automatically so that new skills satisfy every repository invariant from the moment they are created.

## When to reach for it

You invoke this by typing `/new-skill`, and the agent won't reach for it on its own. Reach for this whenever you want to add a new workflow, tool, or discipline to the repository or create a local skill in your private overlay.

## The auto-wiring pipeline

Creating a skill touches several interdependent locations across the repository:

| Target File | Purpose |
| --- | --- |
| `skills/<bucket>/<name>/SKILL.md` | Primary execution runbook with YAML frontmatter |
| `docs/<bucket>/<name>.md` | Human-facing documentation page for promoted buckets |
| `skills/<bucket>/README.md` | Bucket catalog index |
| `README.md` | Top-level repository directory |
| `skills/engineering/ask-fred/SKILL.md` | Router map for user-invoked skills |
| `tests/skills/test_<name>.py` | Automated test fixture |

The scaffolder enforces the [progressive disclosure seam](https://fderuiter.github.io/agy-skills/dictionary/progressive-disclosure) by separating lean runbook instructions from reference material, prompts positive behaviors, and eliminates em-dashes automatically.

## Common questions

**Can I create skills in a private folder without committing them?**
Yes. Specify `--bucket custom` (or choose the local overlay) to place the skill in `skills/custom/<name>/SKILL.md`. The linking script links it into your local Antigravity environment, while git ignores the contents.

**What is the difference between user-invoked and model-invoked skills?**
User-invoked skills are explicit slash commands triggered by human developers. Model-invoked skills carry rich contextual descriptions so that Antigravity agents can reach for them autonomously when solving related tasks.

## It's working if

- A new skill directory is generated with valid frontmatter matching its folder name.
- Running `npm test` passes immediately after scaffolding without manual index edits.
- The new command appears in your local Antigravity skill directory after linking.

## Where it fits

A developer tooling command that extends the repository catalog. See [ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) for the complete map of skills.

