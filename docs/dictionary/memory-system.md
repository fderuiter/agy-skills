---
layout: default
title: "Memory system | AI Coding Dictionary"
description: "A system that attempts to make an agent stateful across sessions by persisting to the environment and reloading at session start."
permalink: /dictionary/memory-system/
category: dictionary
keywords: ["ai coding", "dictionary", "memory system"]
---

# Memory system

A system that attempts to make an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) [stateful](https://fderuiter.github.io/agy-skills/dictionary/stateful) across [sessions](https://fderuiter.github.io/agy-skills/dictionary/session). Persists information into the [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) during a session and reloads it into the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) at the start of future ones, so the agent carries continuity beyond the user [clearing](https://fderuiter.github.io/agy-skills/dictionary/clearing) the session.

A memory system has two halves. The write path: during a session, the agent records what it learned, a preference you stated, a fact about the project, as files in the environment. The read path: at session start, the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) loads those files, or an index of them, back into the context window. Many harnesses ship their own memory system, Claude Code's `/memory` is one, but you can also build one yourself: a directory of notes plus an instruction in [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md) to consult it.

The same trade-offs as any always-loaded content apply. Memories accumulate, so most systems load a one-line index and leave the bodies behind [context pointers](https://fderuiter.github.io/agy-skills/dictionary/context-pointer) rather than inlining everything. And memories are [secondary sources](https://fderuiter.github.io/agy-skills/dictionary/secondary-source), so they drift: a fact recorded in March is loaded with equal confidence in June, after the project has moved on. A memory system needs pruning, the same way AGENTS.md does.

_Usage:_

"I keep having to re-tell it I'm on Postgres, not MySQL."

"Wire up a memory system, write what it learns to the [filesystem](https://fderuiter.github.io/agy-skills/dictionary/filesystem) on the first [turn](https://fderuiter.github.io/agy-skills/dictionary/turn), reload it at session start. The [model](https://fderuiter.github.io/agy-skills/dictionary/model) itself is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless); the memory layer fakes continuity."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
