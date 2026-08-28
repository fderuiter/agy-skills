---
layout: default
title: "Compaction | AI Coding Dictionary"
description: "A handoff done in-memory: the previous session's history is summarised and seeds a fresh session. Lossy, detail traded for headroom."
permalink: /dictionary/compaction/
category: dictionary
keywords: ["ai coding", "dictionary", "compaction"]
---

# Compaction

A [handoff](https://fderuiter.github.io/agy-skills/dictionary/handoff) done in-memory: the previous [session](https://fderuiter.github.io/agy-skills/dictionary/session)'s history is summarised, and the summary seeds a fresh session. Lossy by design: the transcript is a [primary source](https://fderuiter.github.io/agy-skills/dictionary/primary-source), the summary a [secondary source](https://fderuiter.github.io/agy-skills/dictionary/secondary-source), detail traded for headroom. Triggered manually by the user, or automatically via [autocompact](https://fderuiter.github.io/agy-skills/dictionary/autocompact).

The mechanism: the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) is finite, and a long session fills it, every [tool result](https://fderuiter.github.io/agy-skills/dictionary/tool-result), every file read, every wrong turn stays in history. When it gets heavy, the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) asks the [model](https://fderuiter.github.io/agy-skills/dictionary/model) to summarise the session, throws the original history away, and seeds a fresh session with the summary. Whatever didn't make it into the summary is gone from the context. Some harnesses soften this by keeping the old transcript on disk and leaving a [context pointer](https://fderuiter.github.io/agy-skills/dictionary/context-pointer) to it in the summary, the secondary source links back to its primary source, so a detail the summary lost can be recovered by re-reading the original.

The summary is written by the model, so it can be prompted. "Preserve the schema decisions" makes the generated artifact more deliberate. Timing matters too, compact at a phase boundary, after the plan is settled, not mid-task.

Contrast with [clearing](https://fderuiter.github.io/agy-skills/dictionary/clearing), which drops everything and starts cold: compaction tries to carry the essentials across; clearing bets they're already written down somewhere better.

_Usage:_

"[Context](https://fderuiter.github.io/agy-skills/dictionary/context)'s getting heavy and I still have the test pass to do."

"Compact before you start, write what must survive into the summary prompt so the new session keeps the schema decisions and drops the exploration."

## Related skills in agy-skills

- [**ask-fred**](https://fderuiter.github.io/agy-skills/skills-ask-fred): Helps determine whether to compact, continue, or handoff at phase boundaries.
- [**handoff**](https://fderuiter.github.io/agy-skills/skills-handoff): Summarizes session state into a portable document when switching harnesses.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
