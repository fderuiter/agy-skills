---
layout: default
title: "Handoff | AI Coding Dictionary"
description: "Transferring agent context from one session to another, with no return path. Carry mechanism varies, artifact, compaction, others."
permalink: /dictionary/handoff/
category: dictionary
keywords: ["ai coding", "dictionary", "handoff"]
---

# Handoff

Transferring [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) [context](https://fderuiter.github.io/agy-skills/dictionary/context) from one [session](https://fderuiter.github.io/agy-skills/dictionary/session) to another. The carry mechanism varies, a written [handoff artifact](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact), an in-memory summary ([compaction](https://fderuiter.github.io/agy-skills/dictionary/compaction)), and others. Distinct from [clearing](https://fderuiter.github.io/agy-skills/dictionary/clearing) (no transfer at all). Reasons vary: switching roles (planner → implementer), kicking off an [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) run, fanning out to parallel sessions, or freeing up [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) room.

The receiving session starts with zero context, the [model](https://fderuiter.github.io/agy-skills/dictionary/model) is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), and nothing from the old session is visible to the new one. Whatever the next session needs has to be carried explicitly; everything else is gone. "No return path" is the constraint that shapes the carry: the new session can't ask the old one what it meant, so the carried material has to stand on its own.

| Mechanism        | Form                                        | Properties                                                                               |
| ---------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Handoff artifact | File in the [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) | You can read and correct it before anything depends on it; reusable across many sessions |
| Compaction       | Summary in the context window               | Automatic and cheap; harder to inspect; feeds one successor                              |

The visible failure of a bad handoff is relitigation: the new session re-opens decisions the old one had settled, because the carry recorded what was decided but not why. Judge a handoff by what a session with zero context could do with it.

_Usage:_

"Planning session is getting heavy, should I just keep going?"

"Do a handoff. Write the decisions to a doc, clear, start the implementation in a fresh session reading from it."

## Related skills in agy-skills

- [**handoff**](https://fderuiter.github.io/agy-skills/skills-handoff): Compacts the current session into a portable markdown document.
- [**ask-fred**](https://fderuiter.github.io/agy-skills/skills-ask-fred): Guides when to perform a handoff vs continuing in the current session.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
