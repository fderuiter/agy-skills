---
layout: default
title: "Stateful | AI Coding Dictionary"
description: "Carries information forward. Sessions are stateful across turns; agents can be made stateful across sessions via a memory system."
permalink: /dictionary/stateful/
category: dictionary
keywords: ["ai coding", "dictionary", "stateful"]
---

# Stateful

Carries information forward. A [session](https://fderuiter.github.io/agy-skills/dictionary/session) is stateful across [turns](https://fderuiter.github.io/agy-skills/dictionary/turn), [context](https://fderuiter.github.io/agy-skills/dictionary/context) accumulates as the session runs, which is why long sessions drift into the [dumb zone](https://fderuiter.github.io/agy-skills/dictionary/smart-zone). An [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) can be made stateful across **sessions** by adding a [memory system](https://fderuiter.github.io/agy-skills/dictionary/memory-system) that persists information into the [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) and reloads it at the start of future sessions. The [model](https://fderuiter.github.io/agy-skills/dictionary/model) is never stateful; any apparent continuity is the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) re-feeding context. Counterpart to [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless).

Where state lives at each layer:

| Layer       | Stateful?       | How                                                                                                                    |
| ----------- | --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Model       | Never           | [Parameters](https://fderuiter.github.io/agy-skills/dictionary/parameters) are frozen; it sees only what's in each request                                          |
| Session     | Across turns    | The harness appends every message and [tool result](https://fderuiter.github.io/agy-skills/dictionary/tool-result) to the context                                 |
| Harness     | Across sessions | Memory files, [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md), [handoff artifacts](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact), written down, reloaded later |
| Environment | Always          | Files persist whether or not any session is running                                                                    |

Each layer's statefulness is built by re-reading something stored a layer below: the session feels continuous because the harness re-sends the message history to the stateless model, and the agent remembers across sessions because the harness re-loads files from the environment. No state is ever stored in the model itself.

State isn't always wanted. Everything carried forward influences what comes next, so a wrong assumption made early in a session is carried forward too. [Clearing](https://fderuiter.github.io/agy-skills/dictionary/clearing) is the deliberate act of throwing session state away and starting from what's written down.

_Usage:_

"It remembered my preferences from yesterday, does that mean the model learned them?"

"No, the agent's stateful because the harness wrote them to a memory file and reloaded them at session start. The model itself saw nothing of yesterday."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
