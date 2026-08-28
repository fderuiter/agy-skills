---
layout: default
title: "Progressive disclosure | AI Coding Dictionary"
description: "Loading only the context an agent needs right now, with context pointers to the rest. Borrowed from UI design."
permalink: /dictionary/progressive-disclosure/
category: dictionary
keywords: ["ai coding", "dictionary", "progressive disclosure"]
---

# Progressive disclosure

Loading only the [context](https://fderuiter.github.io/agy-skills/dictionary/context) an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) needs right now, with [context pointers](https://fderuiter.github.io/agy-skills/dictionary/context-pointer) to the rest. Borrowed from UI design, where it means showing users only the controls relevant to their current task and hiding the rest behind a click.

The technique exists because context is a cost twice over. Every [token](https://fderuiter.github.io/agy-skills/dictionary/token) loaded up front is billed as [input tokens](https://fderuiter.github.io/agy-skills/dictionary/input-tokens) on every [turn](https://fderuiter.github.io/agy-skills/dictionary/turn), and every token spends [attention budget](https://fderuiter.github.io/agy-skills/dictionary/attention-budget) whether the agent needs it or not. An [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md) stuffed with the full style guide, deployment runbook, and database conventions makes the agent worse at all of them, the instructions that matter for the current task are diluted by the ones that don't. The tell is an agent that ignores rules you know are in its context: they're in there, but buried.

Progressive disclosure inverts this. Keep the always-loaded layer small, a sentence per topic and a pointer to where the detail lives. The agent reads the style guide when it's writing a component, the deployment runbook when it's deploying, and neither when it's fixing a test. [Skills](https://fderuiter.github.io/agy-skills/dictionary/skill) are the pattern built into the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness): a short description loaded every [session](https://fderuiter.github.io/agy-skills/dictionary/session), the full instructions only when triggered.

_Usage:_

"Should I dump the entire style guide into AGENTS.md?"

"No, progressive disclosure. Reference the style guide as a skill the agent loads when it actually needs to write a component. AGENTS.md pays the token cost every turn."

## Related skills in agy-skills

- [**writing-for-agents**](https://fderuiter.github.io/agy-skills/skills-writing-for-agents): Designs documents with progressive disclosure so agents load details on demand.
- [**codebase-design**](https://fderuiter.github.io/agy-skills/skills-codebase-design): Modularizes software interfaces to hide implementation complexity.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
