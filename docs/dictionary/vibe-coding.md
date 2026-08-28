---
layout: default
title: "Vibe coding | AI Coding Dictionary"
description: "A working pattern where the user accepts the agent's code without human review. The diff is treated as opaque."
permalink: /dictionary/vibe-coding/
category: dictionary
keywords: ["ai coding", "dictionary", "vibe coding"]
---

# Vibe coding

A working pattern where the user accepts the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent)'s code without [human review](https://fderuiter.github.io/agy-skills/dictionary/human-review). The diff is treated as opaque, what matters is whether the program behaves, not what's inside. [Automated review](https://fderuiter.github.io/agy-skills/dictionary/automated-review) and [automated checks](https://fderuiter.github.io/agy-skills/dictionary/automated-check) may still run; vibe coding is silent on both.

The term comes from Andrej Karpathy, who [coined it in early 2025](https://x.com/karpathy/status/1886192184808149383): you "fully give in to the vibes" and "forget that the code even exists", describe what you want, accept what comes back, and judge it by running it.

Vibe coding trades inspection for speed. Reading diffs is usually the slowest step in agent-driven work, so dropping it removes the main bottleneck. For code whose failures are cheap, [prototypes](https://fderuiter.github.io/agy-skills/dictionary/prototyping), one-off scripts, internal tools, that's a reasonable trade. The risk scales with the code's lifespan and stakes.

The cost arrives later. Vibe-coded changes accumulate into a codebase nobody has read, and behaviour was the only thing checked, so anything behaviour doesn't surface, like a secret written to logs, a missing edge case, or quietly wrong data handling, ships unseen. The first time someone debugs the system is the first time anyone reads the code. With human review gone, whatever automated verification still runs, tests, types, automated review, is the only gate the code passes through.

_Avoid:_ "vibe coding" as a synonym for "low-quality AI coding", the term names the review stance, not the resulting code.

_Usage:_

"Did you read what it changed in the auth flow?"

"Vibe coded it, login still works, that's all I checked."

"Read the diff before you push, vibing on auth is how secrets leak into logs."

## Related skills in agy-skills

- [**prototype**](https://fderuiter.github.io/agy-skills/skills-prototype): Rapidly explores ideas with quick proof-of-concept builds before formal design.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
