---
layout: default
title: "Grilling | AI Coding Dictionary"
description: "A technique for developing a design concept: the agent interviews the user Socratically, one decision at a time."
permalink: /dictionary/grilling/
category: dictionary
keywords: ["ai coding", "dictionary", "grilling"]
---

# Grilling

A technique for developing a [design concept](https://fderuiter.github.io/agy-skills/dictionary/design-concept) with an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent): the agent interviews the user Socratically, one decision at a time, proposing a recommended answer for each. Slows the rush to a finished plan, no [handoff artifact](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact) is written until the concept stabilises.

The technique exists because agents fill gaps silently. Asked to write a [spec](https://fderuiter.github.io/agy-skills/dictionary/spec) from a two-line prompt, the agent doesn't stop at the decisions you haven't made, it picks defaults and writes them in. The result looks complete, and the guesses are indistinguishable from the choices, so you discover them late: at review, or when the built feature handles an edge case in a way you never chose. Grilling inverts this, instead of guessing, the agent has to ask.

It's a [human-in-the-loop](https://fderuiter.github.io/agy-skills/dictionary/human-in-the-loop) technique: your answers are the input. When a question can't be answered in conversation, you'd have to see the thing, switch to [prototyping](https://fderuiter.github.io/agy-skills/dictionary/prototyping).

_Usage:_

"It went straight to writing the spec and got the cancellation logic wrong."

"Grill it first, make it ask you about partial cancels, refunds, and timing before it commits anything to the doc. Cheaper to resolve in conversation than in code."

## Related skills in agy-skills

- [**grill-me**](https://fderuiter.github.io/agy-skills/skills-grill-me): Interviews you on an idea to resolve design decisions one by one.
- [**grill-with-docs**](https://fderuiter.github.io/agy-skills/skills-grill-with-docs): Conducts an architecture interview against an existing codebase.
- [**wayfinder**](https://fderuiter.github.io/agy-skills/skills-wayfinder): Decomposes complex efforts into structured decision tickets and grilling phases.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
