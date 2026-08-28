---
layout: default
title: "Skill | AI Coding Dictionary"
description: "A teachable capability bundled as a unit, kept out of the context window until a context pointer pulls it in for the task at hand."
permalink: /dictionary/skill/
category: dictionary
keywords: ["ai coding", "dictionary", "skill"]
---

# Skill

A teachable capability bundled as a unit, instructions and resources for doing one task well, kept in the [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) until a [context pointer](https://fderuiter.github.io/agy-skills/dictionary/context-pointer) pulls it into the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) for the task at hand. The unit of [progressive disclosure](https://fderuiter.github.io/agy-skills/dictionary/progressive-disclosure) in a [harness](https://fderuiter.github.io/agy-skills/dictionary/harness).

Skills are an open standard, defined at [agentskills.io](https://agentskills.io), originally developed by Anthropic and since adopted by most major harnesses, so a skill written once works across them. The format is a folder containing:

- A `SKILL.md` file, metadata (a name and description, at minimum) plus the instructions themselves
- Optionally, scripts the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) can run
- Optionally, templates and reference material the instructions point to

Only the name and description sit in [context](https://fderuiter.github.io/agy-skills/dictionary/context) by default. When the agent's task matches, it loads the rest. Until then, the skill takes up almost no room, a sentence or two of [tokens](https://fderuiter.github.io/agy-skills/dictionary/token), however large its full instructions are.

This distinguishes skills from [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md), which is loaded into every [session](https://fderuiter.github.io/agy-skills/dictionary/session) regardless of the task. A skill is read when a particular kind of work comes up, releasing, scaffolding a new service, writing a migration, and ignored the rest of the time.

_Avoid:_ "[tool](https://fderuiter.github.io/agy-skills/dictionary/tool)", a tool is what the agent _calls_; a skill is instructions it _reads_.

_Usage:_

"Where should I put the deploy runbook?"

"As a skill, the agent loads it only when the task involves deploys. In AGENTS.md it'd burn tokens on every [turn](https://fderuiter.github.io/agy-skills/dictionary/turn) for something we use weekly."

## Related skills in agy-skills

- [**setup-agy-skills**](https://fderuiter.github.io/agy-skills/skills-setup-agy-skills): Configures project-level skills and tool harnesses in Antigravity.
- [**writing-for-agents**](https://fderuiter.github.io/agy-skills/skills-writing-for-agents): Provides rules for crafting predictable agent skills.
- [**ask-fred**](https://fderuiter.github.io/agy-skills/skills-ask-fred): The central router for finding and sequencing all skills in this repo.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
