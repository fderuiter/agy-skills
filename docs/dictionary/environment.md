---
layout: default
title: "Environment | AI Coding Dictionary"
description: "The world the agent acts on, anything outside the harness that the agent perceives via tool results and changes via tool calls."
permalink: /dictionary/environment/
category: dictionary
keywords: ["ai coding", "dictionary", "environment"]
---

# Environment

The world the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) acts on, anything outside the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) that the agent perceives through [tool results](https://fderuiter.github.io/agy-skills/dictionary/tool-result) and changes through [tool calls](https://fderuiter.github.io/agy-skills/dictionary/tool-call). The harness _runs_ the agent; the environment is what the agent _works in_. A file like [`AGENTS.md`](https://fderuiter.github.io/agy-skills/dictionary/agents-md) lives in the environment; the harness is what loads it into the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window). A [filesystem](https://fderuiter.github.io/agy-skills/dictionary/filesystem) is the most common kind of environment, but not the only one (a database, a remote API, a browser session can all be environments).

The agent only sees the environment when it looks. Everything it knows about the environment arrived through a tool result, so its picture is a collection of snapshots, each accurate at the moment it was taken. If a file changes after the agent read it, you edit it by hand, a build step regenerates it, the agent keeps reasoning from the stale copy until something prompts a re-read. An agent confidently describing a file that no longer looks like that is usually this: the environment moved, the snapshot didn't.

The environment is also the layer that persists, the only one that is always [stateful](https://fderuiter.github.io/agy-skills/dictionary/stateful). A [session](https://fderuiter.github.io/agy-skills/dictionary/session)'s context is gone when the session ends, but files written to the environment remain for the next session to read, which is what [memory systems](https://fderuiter.github.io/agy-skills/dictionary/memory-system), [handoff artifacts](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact), and `AGENTS.md` rely on. Anything an agent should still know tomorrow has to end up in the environment.

You decide how big the environment is. A [sandbox](https://fderuiter.github.io/agy-skills/dictionary/sandbox) shrinks it, limiting what the agent can reach; adding a [tool](https://fderuiter.github.io/agy-skills/dictionary/tool) extends it, bringing a database or an API into reach. What's inside the boundary is what the agent can perceive and change; everything outside it doesn't exist for the agent. How well the environment is set up to support the agent's work is the codebase's [AX](https://fderuiter.github.io/agy-skills/dictionary/ax).

_Avoid:_ using "environment" for the runtime or the harness itself, the harness is the wrapper, the environment is the workspace.

_Usage:_

"The agent can't see the staging DB schema."

"Wire it into the environment, give it a `psql` tool scoped to read-only on staging. The harness is fine, it just has nothing to act on."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
