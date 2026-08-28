---
layout: default
title: "System prompt | AI Coding Dictionary"
description: "The instructions the harness prepends to every model provider request, the agent's standing brief. Usually stable across a session."
permalink: /dictionary/system-prompt/
category: dictionary
keywords: ["ai coding", "dictionary", "system prompt"]
---

# System prompt

The instructions the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) prepends to every [model provider request](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request), the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent)'s standing brief: who it is, how to behave, which [tools](https://fderuiter.github.io/agy-skills/dictionary/tool) it can call, what conventions to follow. Usually stable across a [session](https://fderuiter.github.io/agy-skills/dictionary/session).

The system prompt is written by the harness vendor, not by you, and in coding harnesses it's big, often tens of thousands of [tokens](https://fderuiter.github.io/agy-skills/dictionary/token) of behavioural rules, tool descriptions, and edge-case handling, all paid as [input tokens](https://fderuiter.github.io/agy-skills/dictionary/input-tokens) on every [turn](https://fderuiter.github.io/agy-skills/dictionary/turn). Your own standing instructions ride along with it: files like [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md) are loaded next to the system prompt at the start of the session, so the [model](https://fderuiter.github.io/agy-skills/dictionary/model) reads the vendor's brief and yours together before it ever sees your message.

Because it's identical on every request, it forms the start of the [prefix cache](https://fderuiter.github.io/agy-skills/dictionary/prefix-cache), which is part of why harnesses keep it fixed for a whole session rather than editing it as they go.

Models are trained to prioritise the system prompt over user messages. So when an agent insists on a convention you never asked for, or formats output in a way you can't shake, it's usually obeying its system prompt, and your message is losing the argument. Some harnesses are customisable: they give you full access to the system prompt, so you can read what the agent is actually being told and change it.

_Usage:_

"Two harnesses, same model, totally different behavior on the same prompt."

"Different system prompts. One's tuned for terse code edits, the other for explaining, that's where the divergence lives, before your message even arrives."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
