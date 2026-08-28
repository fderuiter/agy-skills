---
layout: default
title: "Spec | AI Coding Dictionary"
description: "A handoff artifact describing a multi-session piece of work, what's being built, not how each session does its share. Made of tickets."
permalink: /dictionary/spec/
category: dictionary
keywords: ["ai coding", "dictionary", "spec"]
---

# Spec

A [handoff artifact](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact) describing a multi-[session](https://fderuiter.github.io/agy-skills/dictionary/session) piece of work, what's being built, not how each session does its share. Mutates as work progresses. Made of [tickets](https://fderuiter.github.io/agy-skills/dictionary/ticket).

The spec exists because sessions are disposable and big work isn't. Anything that takes more than one [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) of effort needs a home outside the [context](https://fderuiter.github.io/agy-skills/dictionary/context), somewhere in the agent's [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) that survives [clearing](https://fderuiter.github.io/agy-skills/dictionary/clearing), whether that's a file in the repo, a GitHub issue, or an issue tracker the agent can reach. The spec is that home: the goal, the constraints, the decisions made so far, and the list of tickets with their status. Any fresh session can read it and know where the work stands without inheriting the previous session's accumulated noise.

Specs come in recognisable styles, mostly inherited from how teams already write things down. A _product requirements document_ (PRD) leans toward the user-facing what and why, features, behaviour, acceptance criteria. A _design doc_ or _RFC_ leans technical, the chosen approach, the alternatives rejected, the trade-offs. At the small end, a plain `plan.md` with a checklist of tickets does the same job for a multi-session feature. The style matters less than the role: for the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent), each of these is the same thing, the durable statement of intent it reads at the start of every session.

_Usage:_

"Should this all be one session?"

"No, write it up as a spec, break it into tickets, run each one in its own session. Trying to do the whole thing in a single context will hit the [dumb zone](https://fderuiter.github.io/agy-skills/dictionary/smart-zone) before you're halfway."

## Related skills in agy-skills

- [**to-spec**](https://fderuiter.github.io/agy-skills/skills-to-spec): Transforms design discussions and plans into comprehensive technical specifications.
- [**implement-spec**](https://fderuiter.github.io/agy-skills/skills-implement-spec): Translates a specification directly into code with test coverage.
- [**implement**](https://fderuiter.github.io/agy-skills/skills-implement): Drives test-driven implementation from approved specs and tickets.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
