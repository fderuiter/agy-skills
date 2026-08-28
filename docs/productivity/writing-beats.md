---
title: "writing-beats: Narrative Journey Article Shaping | agy-skills"
description: "Assemble raw writing fragments into a narrative journey of beats using choose-your-own-adventure branching and concept reachability."
keywords: ["writing beats", "narrative journey", "choose your own adventure", "concept grounding", "antigravity writing"]
permalink: /skills-writing-beats/
---

## What it does

`writing-beats` assembles raw material into a narrative journey of beats, offering choose-your-own-adventure branching choices at each step.

It writes only one beat at a time, calculating which concepts are grounded so far and offering next beats that are strictly reachable from that foundation.

## When to reach for it

You invoke this by typing `/writing-beats`, and the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) won't reach for it on its own.

Reach for it when you have a pile of raw material and want to craft a narrative, essay, or case study that unfolds as a sequence of storytelling beats.

| What you have | What you want to do | Reach for |
| --- | --- | --- |
| Raw material pile | Craft a narrative journey with choose-your-own-adventure branches | `writing-beats` |
| Raw material pile | Build a structured, argumentative article paragraph by paragraph | [writing-shape](https://fderuiter.github.io/agy-skills/skills-writing-shape) |
| Uncaptured ideas | Mine raw fragments into a quarry file first | [writing-fragments](https://fderuiter.github.io/agy-skills/skills-writing-fragments) |
| Code or system designs | Grill an idea into a specification | [grill-me](https://fderuiter.github.io/agy-skills/skills-grill-me) |

## What makes a beat

A beat is a single move in a narrative journey. It sets a scene, lands a revelation, poses a question, twists the angle, or drops an aside, then stops so the narrative can pivot.

Beats scale to their dramatic purpose:

- A single sharp sentence ("And then nothing happened for three weeks.").
- A compact paragraph providing setup or context.
- Multiple paragraphs for a self-contained scene, vignette, or example.

If a section tries to introduce three ideas and multiple subheadings, it is multiple beats glued together. The skill keeps each beat focused on one move.

## Grounding and reachability

A candidate beat cannot be chosen unless every concept it relies upon is already grounded. Grounding creates the choose-your-own-adventure tree:

- **Prerequisites**: Grounded before the first beat, establishing what the reader brings to the story.
- **Introduced concepts**: Grounded when a beat lands, unlocking subsequent candidate beats that depend on them.

Each time a beat is committed, the skill presents 2 to 3 candidate next beats reachable from the current grounded set, showing what concepts each candidate would unlock down the path.

## Common questions

**How does `writing-beats` differ from `writing-shape`?**
`writing-shape` is argumentative and analytical: it asks "what does the reader need to hear next to believe the thesis?" and debates formatting. `writing-beats` is narrative and dramatic: it asks "which direction should the journey pivot next?" and presents choose-your-own-adventure options based on concept reachability.

**Do all raw fragments have to be used?**
No. The journey ends when the narrative reaches its natural conclusion, not when the pile is empty. Leftover fragments are expected and normal.

**Can I change direction mid-journey?**
Yes. You can edit existing beats directly in the article file or instruct the agent to step back to an earlier beat and explore an alternative fork in the path.

**What if a candidate beat requires a concept that isn't grounded yet?**
The skill will not offer it until its prerequisite concepts are grounded. You can either introduce an intermediate grounding beat or promote the required concept to an upfront prerequisite.

## It's working if

- You are offered 2 to 3 distinct candidate beats at each step, each opening different narrative directions.
- No beat assumes concepts or terminology that have not yet been grounded.
- The article advances one beat at a time with noticeable narrative pacing and momentum.
- You can preview what future beats become unlocked when selecting a candidate path.

## Where it fits

`writing-beats` is the **exploit step of the writing trilogy for narrative, journey-style pieces**.

It draws from [writing-fragments](https://fderuiter.github.io/agy-skills/skills-writing-fragments) (the upstream explore step) and stands beside [writing-shape](https://fderuiter.github.io/agy-skills/skills-writing-shape) (the analytical exploit alternative).

When you are unsure which skill fits your current task, [ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) routes you across the full library.
