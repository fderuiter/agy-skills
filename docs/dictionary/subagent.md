---
layout: default
title: "Subagent | AI Coding Dictionary"
description: "An agent spawned by another agent via a tool call. Runs in its own session, reports a single tool result. Cannot spawn further subagents."
permalink: /dictionary/subagent/
category: dictionary
keywords: ["ai coding", "dictionary", "subagent"]
---

# Subagent

An [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) spawned by another agent via a [tool call](https://fderuiter.github.io/agy-skills/dictionary/tool-call). Runs in its own [session](https://fderuiter.github.io/agy-skills/dictionary/session) with its own [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window), and reports a single [tool result](https://fderuiter.github.io/agy-skills/dictionary/tool-result) back. Distinct from a [handoff](https://fderuiter.github.io/agy-skills/dictionary/handoff), the parent specifically expects a return; a handoff has no return path. **Cannot spawn further subagents**, the tree is one level deep. Subagents exist to isolate [context](https://fderuiter.github.io/agy-skills/dictionary/context), not to compose hierarchies.

The point is to keep noisy work out of the parent's context. A broad search or a long file-reading expedition produces pages of tool results, most of which matter only long enough to find the answer. Run inside the parent and all of it stays in the parent's context for the rest of the session. Run inside a subagent and the noise fills a disposable window instead, only the final report lands in the parent's context. The report is a [secondary source](https://fderuiter.github.io/agy-skills/dictionary/secondary-source): the parent gets the subagent's account of what it found, not the raw results, so anything the report leaves out is invisible to the parent.

Subagents also run concurrently, a parent can fan several out at once over independent pieces of work.

_Usage:_

"The grep results are blowing out my context."

"Spawn a subagent to do the search, it'll burn its own context window on the noise and report back the two file paths you actually need."

## Related skills in agy-skills

- [**code-review**](https://fderuiter.github.io/agy-skills/skills-code-review): Uses parallel subagents to review standards and spec conformance independently.
- [**codebase-design**](https://fderuiter.github.io/agy-skills/skills-codebase-design): Dispatches parallel subagents to generate multiple interface designs.
- [**research**](https://fderuiter.github.io/agy-skills/skills-research): Spawns read-only subagents to investigate external documentation or code.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
