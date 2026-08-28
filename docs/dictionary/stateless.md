---
layout: default
title: "Stateless | AI Coding Dictionary"
description: "Carries no information forward. The model is stateless across requests; an agent is stateless across sessions by default."
permalink: /dictionary/stateless/
category: dictionary
keywords: ["ai coding", "dictionary", "stateless"]
---

# Stateless

Carries no information forward. The [model](https://fderuiter.github.io/agy-skills/dictionary/model) is stateless across [model provider requests](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request), each request resends the full [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window), because the model has no way to see anything else. An [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) is stateless across [sessions](https://fderuiter.github.io/agy-skills/dictionary/session) by default: a new session starts empty, with no trace of prior ones. Counterpart to [stateful](https://fderuiter.github.io/agy-skills/dictionary/stateful).

The model itself is permanently stateless: its [parameters](https://fderuiter.github.io/agy-skills/dictionary/parameters) are frozen after [training](https://fderuiter.github.io/agy-skills/dictionary/training), and nothing you do at [inference](https://fderuiter.github.io/agy-skills/dictionary/inference) changes them. The model doesn't learn from your corrections, doesn't remember being told the same thing yesterday, and isn't getting to know you, however much the conversation feels otherwise. The feeling of continuity within a session is manufactured by the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness), which keeps the transcript and re-sends it with every request. The model isn't remembering the conversation; it's re-reading it.

The practical consequence: if you want something remembered across sessions, you have to write it down somewhere the agent will read it back. That's what [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md) files, [memory systems](https://fderuiter.github.io/agy-skills/dictionary/memory-system), and [handoff artifacts](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact) are, files that get loaded into the [context](https://fderuiter.github.io/agy-skills/dictionary/context) of future sessions, standing in for the memory the model doesn't have. When the agent keeps making a mistake you've corrected before, the question isn't why it didn't learn, it can't, but where that correction should be written down so every future session reads it.

_Usage:_

"Why does it forget the convention every time I [clear](https://fderuiter.github.io/agy-skills/dictionary/clearing)?"

"The model's stateless, the new session starts empty. If you want it carried, write it to AGENTS.md or a memory file the harness loads at session start."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
