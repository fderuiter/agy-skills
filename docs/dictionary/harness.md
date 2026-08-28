---
layout: default
title: "Harness | AI Coding Dictionary"
description: "Everything around the model that turns it into an agent: tools, system prompt, context-window management, permissions, hooks."
permalink: /dictionary/harness/
category: dictionary
keywords: ["ai coding", "dictionary", "harness"]
---

# Harness

Everything around the [model](https://fderuiter.github.io/agy-skills/dictionary/model) that turns it into an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent): [tools](https://fderuiter.github.io/agy-skills/dictionary/tool), [system prompt](https://fderuiter.github.io/agy-skills/dictionary/system-prompt), [context-window management](https://fderuiter.github.io/agy-skills/dictionary/context-window), permissions, hooks. **Claude.ai** and **Claude Code** run on the same model but behave differently because their harnesses differ.

The model itself only does one thing: take text in, produce text out. It can't read a file, run a command, or remember the last [turn](https://fderuiter.github.io/agy-skills/dictionary/turn). The harness supplies all of that. It assembles the [context](https://fderuiter.github.io/agy-skills/dictionary/context) for each [model provider request](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request), executes the [tool calls](https://fderuiter.github.io/agy-skills/dictionary/tool-call) the model asks for, feeds the [tool results](https://fderuiter.github.io/agy-skills/dictionary/tool-result) back in, stores the [session](https://fderuiter.github.io/agy-skills/dictionary/session) history, asks you for permission before risky actions, and decides when to [compact](https://fderuiter.github.io/agy-skills/dictionary/compaction). The agent loop, model proposes, harness executes, repeat, is run by the harness.

This matters for diagnosis. When behaviour differs between two products, or between yesterday and today, the model is often not the variable, the harness is. A different system prompt, a different set of tools, a changed permission default, or a new context-management strategy all change behaviour without any change to the model. It also means the harness is where most of your configuration lives: [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md) files, permission settings, and hooks are all instructions to the harness, not the model.

Examples: Claude Code, Cursor, Codex CLI, and Claude.ai, which is a chat harness rather than a coding one.

_Usage:_

"Same model, why is Claude Code editing files and Claude.ai just answering questions?"

"Different harnesses, Claude Code has [filesystem](https://fderuiter.github.io/agy-skills/dictionary/filesystem) tools, a different system prompt, and a permission layer. The model isn't the variable here."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
