---
layout: default
title: "Autocompact | AI Coding Dictionary"
description: "Compaction triggered automatically by the harness when the context window approaches full."
permalink: /dictionary/autocompact/
category: dictionary
keywords: ["ai coding", "dictionary", "autocompact"]
---

# Autocompact

[Compaction](https://fderuiter.github.io/agy-skills/dictionary/compaction) triggered automatically by the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) when the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) approaches full.

The harness watches how full the context window is. When it crosses a threshold, often around 80%, it pauses, asks the [model](https://fderuiter.github.io/agy-skills/dictionary/model) to summarise the [session](https://fderuiter.github.io/agy-skills/dictionary/session) so far, and seeds a fresh session with the summary. Work then continues as if nothing happened.

Except something did happen. Compaction is lossy, and autocompact is lossy at a moment you didn't choose. A manual compact happens at a phase boundary, when you can tell the model what to preserve. Autocompact fires mid-task, whenever the threshold is hit, possibly halfway through a refactor, with the summary deciding for itself which of your decisions were worth keeping. The classic symptom: the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) carries on confidently but has quietly forgotten a constraint you established an hour ago, and you only notice when its work starts contradicting it.

The defence is to not let it fire. Watch the context indicator and compact manually at a natural boundary, or write decisions into a plan doc or [handoff artifact](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact) on disk, where no summary can lose them. Most harnesses also let you customise the buffer, moving the threshold earlier or later, or turning autocompact off entirely, so you can tune how much headroom you keep before it fires.

_Usage:_

"It doesn't seem to remember what we decided about the schema earlier."

"Autocompact fired between [turns](https://fderuiter.github.io/agy-skills/dictionary/turn), the early decisions got summarised and we must have lost something. Reload the plan doc, or compact manually next time so you control what gets kept."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
