---
title: "writing-shape: Paragraph-by-Paragraph Article Shaping | agy-skills"
description: "Shape raw writing fragments into a structured article paragraph by paragraph with explicit format debates and concept grounding."
keywords: ["writing shape", "article shaping", "format tradeoffs", "concept grounding", "antigravity writing"]
permalink: /skills-writing-shape/
---

## What it does

`writing-shape` takes a markdown file of raw writing fragments and shapes it into an article block by block, debating format tradeoffs out loud for every paragraph.

It treats the input pile as a read-only quarry, refusing to write ahead or batch paragraphs so every structural choice is deliberate and grounded before the next move.

## When to reach for it

You invoke this by typing `/writing-shape`, and the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) won't reach for it on its own.

Reach for it when you have a quarry of raw notes, fragments, or transcripts and want to produce an article, essay, or argumentative post paragraph by paragraph.

| What you have | What you want to do | Reach for |
| --- | --- | --- |
| Raw material pile | Shape into an argumentative article with explicit format debates | `writing-shape` |
| Raw material pile | Shape into a choose-your-own-adventure narrative journey | [writing-beats](https://fderuiter.github.io/agy-skills/skills-writing-beats) |
| Loose uncaptured ideas | Mine raw fragments into a quarry file first | [writing-fragments](https://fderuiter.github.io/agy-skills/skills-writing-fragments) |
| Instructions for agents | Author predictable agent-facing documents | [writing-for-agents](https://fderuiter.github.io/agy-skills/skills-writing-for-agents) |

## Grounding concepts

Every concept must be **grounded** before an article block can lean on it. A reader who encounters an ungrounded term or assumption gets lost. Grounding happens in two ways:

- **Prerequisites**: Concepts the reader is assumed to bring into the piece walking in, settled explicitly before the opening is chosen.
- **Introduced concepts**: Concepts that a specific block introduces and defines, making them available for all subsequent blocks.

Setting prerequisites tightly prevents early blocks from drowning in dictionary definitions while keeping the target audience clear.

## Arguing format choices

Rather than defaulting to continuous prose, `writing-shape` actively weighs presentation formats block by block:

- **Prose versus list**: Prose builds momentum and carries arguments; lists present parallel, scannable items.
- **Inline versus callout**: Callouts hold warnings or notes that would otherwise derail the main narrative.
- **Table versus repeated structure**: Tables clarify repeated data across three or more items; prose with bold leads handles varying structures.
- **Quote versus paraphrase**: Quotes preserve original phrasing when the exact words matter; paraphrases integrate ideas smoothly into the article's voice.
- **Code block versus inline code**: Multi-line, runnable, or illustrative snippets take a block; identifiers stay inline.

## Common questions

**Why can't the agent draft the whole article at once?**
Drafting in batch skips the crucial format and grounding decisions that give an article its spine. Left alone, an agent produces generic prose with weak transitions and ungrounded assumptions. Shaping paragraph by paragraph keeps you in control of the thesis.

**Does it modify my raw material file?**
No. The input file is treated as read-only quarry material. The article is written to a separate file, preserving your original fragments intact.

**What if the pile is missing an example or argument?**
The skill names the gap explicitly during the loop. You can supply the missing piece directly in conversation or choose to cut the section that required it.

**Can I go back and rewrite earlier paragraphs?**
Yes. You can edit the article file directly on disk, or tell the agent to revise a specific paragraph in place. The skill re-reads the file from disk before every write.

## It's working if

- The article file grows one block at a time with clear, defensible transitions.
- Every term or idea the article uses has been explicitly grounded either as a prerequisite or in an earlier block.
- You actively debate whether a section belongs in prose, a list, a table, or a callout.
- The finished article reads in one consistent voice rather than a collection of pasted snippets.

## Where it fits

`writing-shape` is the **exploit step of the writing trilogy for argumentative and structured pieces**.

It pairs with [writing-fragments](https://fderuiter.github.io/agy-skills/skills-writing-fragments) (the upstream explore step that gathers the quarry) and [writing-beats](https://fderuiter.github.io/agy-skills/skills-writing-beats) (the alternative exploit step for narrative journeys).

When you are unsure which skill fits your current task, [ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) routes you across the full library.
