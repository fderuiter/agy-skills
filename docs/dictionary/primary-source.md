---
layout: default
title: "Primary source | AI Coding Dictionary"
description: "The thing itself, code, transcripts, raw data. Complete and authoritative, but expensive to load into context."
permalink: /dictionary/primary-source/
category: dictionary
keywords: ["ai coding", "dictionary", "primary source"]
---

# Primary source

A source of truth in its original form, the code, the conversation transcript, the raw log, the actual API response. Not an account of the thing; the thing. Counterpart to [secondary source](https://fderuiter.github.io/agy-skills/dictionary/secondary-source).

If you want to know what your codebase does, the code is the primary source. The docs, the architecture diagram, and the README are all descriptions of it, accurate when written, on their own schedule ever since. When an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) confidently asserts something wrong about your project, the question to ask is which source it was working from: an agent that read a doc inherits the doc's staleness; an agent that read the code is reading the current truth.

The cost is what keeps primary sources from being the default. Loading one into the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) is expensive, the full file, the full transcript, every [token](https://fderuiter.github.io/agy-skills/dictionary/token) billed as [input](https://fderuiter.github.io/agy-skills/dictionary/input-tokens) and competing for [attention budget](https://fderuiter.github.io/agy-skills/dictionary/attention-budget). What you get for the cost is completeness: nothing has been pre-filtered by someone else's judgement about what mattered. A summary written last month can't contain the detail that turned out to matter today; the primary source still does.

Reach for the primary source when precision matters, the exact signature, the actual error, the line that throws. Much of managing [context](https://fderuiter.github.io/agy-skills/dictionary/context) is deciding when to pay for the primary source and when a secondary source is good enough.

_Usage:_

"The agent says the retry logic backs off exponentially, but I'm watching it hammer the endpoint."

"It read that out of the design doc. Point it at the actual retry module, work from the primary source when the behaviour matters."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
