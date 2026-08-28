---
layout: default
title: "Secondary source | AI Coding Dictionary"
description: "An account of a primary source, one step removed, summaries, docs, compaction summaries. Cheap to load, lossy by construction."
permalink: /dictionary/secondary-source/
category: dictionary
keywords: ["ai coding", "dictionary", "secondary source"]
---

# Secondary source

An account of a [primary source](https://fderuiter.github.io/agy-skills/dictionary/primary-source), one step removed, documentation describing code, a summary describing a transcript, a report describing search results. Cheaper to load into the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) than the source it describes, and lossy by construction: whoever wrote it decided what mattered, and whatever they dropped is invisible to a reader who only has the summary.

A lot of [context](https://fderuiter.github.io/agy-skills/dictionary/context) engineering is the manufacture of secondary sources. [Compaction](https://fderuiter.github.io/agy-skills/dictionary/compaction) turns the [session](https://fderuiter.github.io/agy-skills/dictionary/session) history into a summary that seeds the next session. A [subagent](https://fderuiter.github.io/agy-skills/dictionary/subagent) burns its own context on a noisy search and returns a short report. A [handoff artifact](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact) condenses a session's decisions into a document the next session reads. [Memory systems](https://fderuiter.github.io/agy-skills/dictionary/memory-system) distil what a session learned into notes. Each makes the same trade: fidelity for headroom.

Secondary sources fail in two ways. They're lossy, the compaction summary that lost the schema decision, the report that didn't mention the edge case. And they drift, the primary source changes and the account doesn't follow, so docs describe last quarter's architecture with this quarter's confidence. When an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) acts on a secondary source that has failed either way, it works confidently from wrong information; the fix is sending it back to the primary source.

Neither failure makes secondary sources a mistake. The context window is finite, and primary sources are expensive; without summaries, reports, and handoff documents, nothing large fits. The skill is knowing which details can survive the loss, and verifying against the primary source when one can't. A well-made secondary source carries a [context pointer](https://fderuiter.github.io/agy-skills/dictionary/context-pointer) back to its original, the summary that names the transcript it came from, the doc that names the file it describes, so when the account isn't enough, the reader can follow the pointer rather than work from the loss.

_Usage:_

"The handoff doc says auth is done, but the new session keeps finding broken token refresh."

"The doc's a secondary source, the last session wrote down what it believed, not what's true. Have the new session run the auth tests and trust the primary source."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
