---
layout: default
title: "Parameters | AI Coding Dictionary"
description: "The numbers inside a model, often billions, tuned during training. Everything the model knows lives in them. Also called weights."
permalink: /dictionary/parameters/
category: dictionary
keywords: ["ai coding", "dictionary", "parameters"]
---

# Parameters

The numbers inside a [model](https://fderuiter.github.io/agy-skills/dictionary/model), often billions of them, tuned during [training](https://fderuiter.github.io/agy-skills/dictionary/training). Everything the model "knows" lives in them. Training sets them; [inference](https://fderuiter.github.io/agy-skills/dictionary/inference) uses them unchanged. Also called _weights_.

Mechanically, the parameters are what turn input into output. [Next-token prediction](https://fderuiter.github.io/agy-skills/dictionary/next-token-prediction) is a giant calculation: the [tokens](https://fderuiter.github.io/agy-skills/dictionary/token) in the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) go in, get multiplied through the parameters, and a prediction for the next token comes out. There is no database of facts inside the model, no code lookup table, just these numbers, arranged so that the calculation tends to produce useful output. Facts the model can recite from training, like a standard library API, are [parametric knowledge](https://fderuiter.github.io/agy-skills/dictionary/parametric-knowledge): stored in the parameters, not retrieved from anywhere.

The detail worth internalising is that parameters are frozen after training. Nothing you do in a [session](https://fderuiter.github.io/agy-skills/dictionary/session) changes them, no correction you make, no codebase you show it, no mistake it learns from. Every session runs on the same numbers. This is why the model is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), why its built-in knowledge stops at the [knowledge cutoff](https://fderuiter.github.io/agy-skills/dictionary/knowledge-cutoff), and why anything project-specific has to arrive via [context](https://fderuiter.github.io/agy-skills/dictionary/context) instead. The only way parameters change is more training, which produces, in effect, a different model.

_Usage:_

"Can we fine-tune it on our codebase?"

"That'd update the parameters, different model afterwards. For one project it's almost always cheaper to load the codebase as context than to retrain."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
