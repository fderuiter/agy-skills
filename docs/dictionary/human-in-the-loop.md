---
layout: default
title: "Human-in-the-loop | AI Coding Dictionary"
description: "A working pattern where one or more humans pair with the agent during a session, reviewing, redirecting, or collaborating in real time."
permalink: /dictionary/human-in-the-loop/
category: dictionary
keywords: ["ai coding", "dictionary", "human-in-the-loop", "hitl", "human-in-the-loop (hitl)"]
---

# Human-in-the-loop

A working pattern where one or more humans pair with the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) during a [session](https://fderuiter.github.io/agy-skills/dictionary/session), reviewing, redirecting, or collaborating in real time. The human is present and engaged, not just gating individual actions.

The contrast is with [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) work, where the agent runs unattended and you judge the result afterwards. Human-in-the-loop means catching problems while they're still cheap: you see the agent reach for the wrong file, misread the requirement, or start down a dead end, and you redirect it in one sentence, rather than discovering twenty minutes of confident work built on that mistake. Agents don't reliably know when they're off track; left alone, they tend to push forward rather than stop and ask.

Which pattern fits depends on the work. Well-specified, low-risk, easy-to-verify tasks suit AFK. Tasks that are ambiguous, irreversible, or where you'd struggle to review the finished result, a schema migration, a tricky design decision, anything touching production, suit staying in the loop. The judgement call is essentially: how expensive is a wrong turn, and how late would you catch it?

Some work is in-the-loop by nature, because your reactions are the input. [Grilling](https://fderuiter.github.io/agy-skills/dictionary/grilling) only works with you there to answer the questions; [prototyping](https://fderuiter.github.io/agy-skills/dictionary/prototyping) only works with you there to react to the artifact.

Staying in the loop costs your attention, which is the scarce resource. Part of getting better with agents is moving more work safely out of the loop, with plans, [automated checks](https://fderuiter.github.io/agy-skills/dictionary/automated-check), and [human review](https://fderuiter.github.io/agy-skills/dictionary/human-review) at the end instead of supervision throughout.

_Usage:_

"Run this AFK overnight?"

"No, schema migration, keep it human-in-the-loop. I want to see each step and steer if it picks the wrong column to backfill from."

## Related skills in agy-skills

- [**diagnosing-bugs**](https://fderuiter.github.io/agy-skills/skills-diagnosing-bugs): Includes HITL interactive script fallbacks for complex debugging.
- [**wayfinder**](https://fderuiter.github.io/agy-skills/skills-wayfinder): Marks tickets requiring human intervention and decisions as HITL.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
