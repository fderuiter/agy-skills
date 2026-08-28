---
layout: default
title: "Session | AI Coding Dictionary"
description: "One bounded run of interaction with an agent. Starts empty, accumulates, ends when cleared, closed, or compacted into a fresh session."
permalink: /dictionary/session/
category: dictionary
keywords: ["ai coding", "dictionary", "session"]
---

# Session

One bounded run of interaction with an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent). Starts empty, accumulates messages, [tool results](https://fderuiter.github.io/agy-skills/dictionary/tool-result), and files read, and ends when [cleared](https://fderuiter.github.io/agy-skills/dictionary/clearing), closed, or [compacted](https://fderuiter.github.io/agy-skills/dictionary/compaction) into a fresh session. The session is what _fills_ the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window): if the context window is the box, the session is the stuff slowly filling it up. Work too large for a single context window must be split across sessions.

The session's message history is the agent's working memory. The [model](https://fderuiter.github.io/agy-skills/dictionary/model) is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), so everything it appears to remember, what you asked for, what the tests said, what it decided three turns ago, is in the message history, re-sent with every [model provider request](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request). Whatever isn't in the session doesn't exist for the agent.

That memory ends with the session. A new session starts from nothing: the agent that knew your codebase well at the end of yesterday's session knows none of it this morning. What survives is the [filesystem](https://fderuiter.github.io/agy-skills/dictionary/filesystem), files written during one session can be read by the next, which is what [handoffs](https://fderuiter.github.io/agy-skills/dictionary/handoff), [memory systems](https://fderuiter.github.io/agy-skills/dictionary/memory-system), and [AGENTS.md](https://fderuiter.github.io/agy-skills/dictionary/agents-md) rely on.

You choose where a session ends. Everything in a session influences every later [turn](https://fderuiter.github.io/agy-skills/dictionary/turn), so unrelated tasks done in one session leave residue that colours the next answer. One task per session keeps the context relevant; finishing a task is a natural point to clear.

_Usage:_

"How long can one session run before it falls apart?"

"Depends on the work, a focused refactor stays sharp longer than open-ended research. Once the session bloats, hand off or compact, don't push through."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
