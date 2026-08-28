---
title: "writing-fragments: Mine Raw Writing Material | agy-skills"
description: "Grilling session skill that mines raw heterogeneous writing fragments into a quarry file without premature outlining."
keywords: ["writing fragments", "raw material quarry", "antigravity writing", "explore before exploit", "writing grilling"]
permalink: /skills-writing-fragments/
---

## What it does

`writing-fragments` runs a relentless grilling session to mine raw writing fragments and appends them to a single document without committing to article structure, outlines, or sequence.

It is pure explore: it refuses to organize, outline, or format the piece, treating everything captured as heterogeneous raw material for a future exploit phase.

## When to reach for it

You invoke this by typing `/writing-fragments`, and the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) won't reach for it on its own.

Reach for it when you want to write an article, essay, or post, but your thoughts are scattered across half-formed observations, punchlines, code snippets, and analogies.

| What you have | What you want to do | Reach for |
| --- | --- | --- |
| Raw, unorganized ideas in your head | Mine fragments without committing to structure | `writing-fragments` |
| A pile of raw fragments | Shape them paragraph by paragraph with explicit format choices | [writing-shape](https://fderuiter.github.io/agy-skills/skills-writing-shape) |
| A pile of raw fragments | Assemble them as a choose-your-own-adventure journey of beats | [writing-beats](https://fderuiter.github.io/agy-skills/skills-writing-beats) |
| Instructions for agents | Author predictable agent-facing documents | [writing-for-agents](https://fderuiter.github.io/agy-skills/skills-writing-for-agents) |

## The quarry and the leading word

A fragment is any piece of writing that might survive into the final piece. It does not need to define its terms or satisfy a cold reader yet: the only bar is that you recognize what it means and that it holds a kernel of good writing.

Fragments are deliberately heterogeneous:

- Sharp sentences and punchlines you want to deploy somewhere.
- Concrete vignettes, analogies, scenarios, or code snippets.
- Claims with a one-line justification.
- Halved thoughts ("something about how X feels like Y, work this out later").
- Quotes, overheard lines, complaints, or confessions.
- **Leading words**: a compact metaphor or coinage that encapsulates a whole concept (such as _tracer bullets_ or _tight loop_).

Landing a strong leading word during explore is the highest-value move in the session. It gives both you and the agent a shared handle to think with, shaping transitions, structure, and title throughout the subsequent exploit phase.

## Explore before exploit

Most writing sessions stall because they try to structure before they have raw material. When you outline too early, you force premature commitments to headings and narrative transitions before you know what you are actually noticing.

`writing-fragments` separates the two phases completely. The document it produces is a quarry, formatted with a working title H1 and fragments separated by horizontal rules (`---`), with no internal headings, tags, or sequencing.

## Common questions

**Why doesn't it organize my fragments into an outline?**
Organizing is exploit, and doing it early closes off promising directions before you have discovered them. Structure belongs in [writing-shape](https://fderuiter.github.io/agy-skills/skills-writing-shape) or [writing-beats](https://fderuiter.github.io/agy-skills/skills-writing-beats), where the pile is fixed and you are deliberately committing to a path.

**Can I edit or cut fragments while the session is running?**
Yes. You can edit the markdown file directly on disk between turns, or instruct the agent to cut, sharpen, or merge specific fragments. The skill re-reads the file from disk before every write to preserve your manual changes.

**How many fragments do I need before moving to shaping?**
Stop when the session stops uncovering new angles and begins circling ideas you have already captured. A dozen strong fragments, especially with one or two solid leading words, provides plenty of quarry material for an article.

**Does it write metadata, tags, or dates to the file?**
No. It writes an H1 working title at the top, followed by fragments separated by horizontal rules. Keeping the quarry format minimal ensures you can scan and mine it without wading through organizational noise.

## It's working if

- Fragments appear in the file after each conversational exchange without interrupting the flow of discussion.
- The file contains a rich mix of vignettes, claims, sharp lines, and candidate leading words.
- You do not spend time arguing about table of contents, headings, or article flow during the session.
- You finish with far more raw material than you will actually need in the finished piece.

## Where it fits

`writing-fragments` is the **explore step of the writing trilogy**.

It feeds directly into [writing-shape](https://fderuiter.github.io/agy-skills/skills-writing-shape) (for paragraph-by-paragraph argumentative pieces) or [writing-beats](https://fderuiter.github.io/agy-skills/skills-writing-beats) (for choose-your-own-adventure narrative journeys). For general idea sharpening without producing written raw material, use [grill-me](https://fderuiter.github.io/agy-skills/skills-grill-me).

When you are unsure which skill fits your current task, [ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) routes you across the full library.
