---
layout: default
title: "AX | AI Coding Dictionary"
description: "Agent experience: how well the environment is set up for an agent to do good work, checks, architecture, and free context."
permalink: /dictionary/ax/
category: dictionary
keywords: ["ai coding", "dictionary", "ax", "agent experience"]
---

# AX

Agent experience, how well the [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) is set up for an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) to do good work in a codebase. The agent-facing counterpart to [DX](https://fderuiter.github.io/agy-skills/dictionary/dx). When the same agent performs well in one repo and badly in another, same [model](https://fderuiter.github.io/agy-skills/dictionary/model), same [harness](https://fderuiter.github.io/agy-skills/dictionary/harness), the difference is usually AX. The instinct is to blame the model or rewrite the prompt; the fix is more often in the repo.

Good AX has three main dimensions:

| Dimension        | What good AX looks like                                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Automated checks | Fast, deterministic [automated checks](https://fderuiter.github.io/agy-skills/dictionary/automated-check), types, tests, lints, that the agent can self-correct from without a human                                                                                                          |
| Architecture     | A codebase the agent can navigate without reading everything: predictable structure, a lot of behaviour behind small interfaces, names that say what things do                                                                                       |
| Free context     | [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md), [skills](https://fderuiter.github.io/agy-skills/dictionary/skill), and [tools](https://fderuiter.github.io/agy-skills/dictionary/tool) kept lean, so most of the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) is available for the task and the agent stays in the [smart zone](https://fderuiter.github.io/agy-skills/dictionary/smart-zone) instead of drowning |

AX and DX overlap, good checks and clean architecture help both audiences, but they diverge. Humans tolerate tribal knowledge, slow CI, and "ask Sarah about the billing module"; agents can't. Agents don't benefit from IDE tooltips or pretty dashboards; they need failures as text in a [tool result](https://fderuiter.github.io/agy-skills/dictionary/tool-result). A codebase can have good DX and poor AX.

_Avoid:_ treating AX as a synonym for DX, the audiences need different investments.

_Usage:_

"The agent writes great code in the API repo and garbage in the frontend."

"The API repo has strict types and a fast test suite; the frontend has neither and forty always-loaded skills. That's an AX gap, not a model problem."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
