---
layout: default
title: "Next-token prediction | AI Coding Dictionary"
description: "What the model actually does. Samples one next token from the context, appends it, and runs again. Its only mode of operation."
permalink: /dictionary/next-token-prediction/
category: dictionary
keywords: ["ai coding", "dictionary", "next-token prediction"]
---

# Next-token prediction

What the [model](https://fderuiter.github.io/agy-skills/dictionary/model) actually does. Given a [context](https://fderuiter.github.io/agy-skills/dictionary/context), it samples one next [token](https://fderuiter.github.io/agy-skills/dictionary/token), appends it, and runs again. Every output, a sentence, a [tool call](https://fderuiter.github.io/agy-skills/dictionary/tool-call), a thousand-line file, is built one token at a time. The model has no other mode of operation.

Each step works the same way: the tokens in the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) are run through the [parameters](https://fderuiter.github.io/agy-skills/dictionary/parameters), which produce a probability for every token in the vocabulary, this one is very likely next, that one less so. One token is sampled from those probabilities, appended, and the loop runs again with the slightly longer context. That sampling step is why the same prompt produces different output on different runs: [non-determinism](https://fderuiter.github.io/agy-skills/dictionary/non-determinism) is built into the mechanism, not a bug layered on top.

Holding onto this mechanism explains behaviour that otherwise looks strange. The model never checks whether a token is _true_ before emitting it, only whether it's _likely_, which is the root of [hallucination](https://fderuiter.github.io/agy-skills/dictionary/hallucination). It commits to each token as it goes, so a confident-sounding opening sentence can steer the rest of the answer wrong. And because [output tokens](https://fderuiter.github.io/agy-skills/dictionary/output-tokens) are produced strictly one at a time, generation speed puts a floor on how fast any [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) can work.

_Usage:_

"How does the agent 'decide' to call a tool?"

"It doesn't, it's next-token prediction all the way down. The tool call is just a structured string the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) parses out of the output stream."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
