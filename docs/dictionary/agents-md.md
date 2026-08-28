---
layout: default
title: "AGENTS.md | AI Coding Dictionary"
description: "A file in the environment that the harness loads into the context window at session start, the project's standing brief to the agent."
permalink: /dictionary/agents-md/
category: dictionary
keywords: ["ai coding", "dictionary", "agents.md"]
---

# AGENTS.md

A file in the [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) that the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) loads into the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) at [session](https://fderuiter.github.io/agy-skills/dictionary/session) start, the project's standing brief to the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent). Cross-harness convention; some harnesses also have their own variant (Claude Code's is CLAUDE.md).

Because it loads automatically, it's one way to avoid repeating yourself across sessions. The [model](https://fderuiter.github.io/agy-skills/dictionary/model) is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), a correction you give in one session is gone in the next, and you end up telling every fresh session that the project uses pnpm, that tests run with a particular flag, that a directory is generated and shouldn't be touched. When you've corrected the agent for the same thing twice, that correction is a candidate line for AGENTS.md.

Suitable content is whatever the agent can't derive from the code: build and test commands, conventions the codebase doesn't make obvious, hard constraints ("never edit the generated client"). Short and declarative, it's a brief, not documentation.

The trade-off is that everything in it is always loaded. Instructions accumulate, most of them irrelevant to any given task, and a long AGENTS.md both costs tokens and dilutes itself, the more instructions in context, the less reliably the model follows any one of them.

_Avoid:_ using AGENTS.md for content that should be [progressively disclosed](https://fderuiter.github.io/agy-skills/dictionary/progressive-disclosure), anything in it pays a [token](https://fderuiter.github.io/agy-skills/dictionary/token) cost every [turn](https://fderuiter.github.io/agy-skills/dictionary/turn), in every session, whether or not that session needs it. A style guide can go behind a [skill](https://fderuiter.github.io/agy-skills/dictionary/skill) or a [context pointer](https://fderuiter.github.io/agy-skills/dictionary/context-pointer) instead; keep AGENTS.md for the lines that apply everywhere.

_Usage:_

"Why is every session starting with 4k tokens already burned?"

"Check AGENTS.md, someone pasted the entire style guide in there instead of putting it behind a skill."

## Related skills in agy-skills

- [**writing-for-agents**](https://fderuiter.github.io/agy-skills/skills-writing-for-agents): Reference rules for writing concise, high-signal agent instructions.
- [**setup-agy-skills**](https://fderuiter.github.io/agy-skills/skills-setup-agy-skills): Sets up project-level Antigravity skills and AGENTS.md conventions.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
