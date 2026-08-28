---
layout: default
title: "Inference | AI Coding Dictionary"
description: "Running a trained model to generate output, what happens on every model provider request. Parameters stay fixed."
permalink: /dictionary/inference/
category: dictionary
keywords: ["ai coding", "dictionary", "inference"]
---

# Inference

Running a trained [model](https://fderuiter.github.io/agy-skills/dictionary/model) to generate output, what happens on every [model provider request](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request). [Parameters](https://fderuiter.github.io/agy-skills/dictionary/parameters) stay fixed; the model just does [next-token prediction](https://fderuiter.github.io/agy-skills/dictionary/next-token-prediction) over the [context](https://fderuiter.github.io/agy-skills/dictionary/context) it's given. Cheap relative to [training](https://fderuiter.github.io/agy-skills/dictionary/training), but billed per [token](https://fderuiter.github.io/agy-skills/dictionary/token) and the dominant cost of using a model.

A model's life splits into two phases:

| Phase     | When it happens                  | What it does                                                    | Parameters    |
| --------- | -------------------------------- | --------------------------------------------------------------- | ------------- |
| Training  | Once, before release             | Produces the parameters from a training corpus                  | Being written |
| Inference | Every time anyone uses the model | Runs the frozen parameters over your context to generate tokens | Read-only     |

Nothing you do at inference time writes back to the parameters, that's the reason a correction you make today doesn't stick tomorrow. The model that makes the same mistake next [session](https://fderuiter.github.io/agy-skills/dictionary/session), after you carefully explained the fix, hasn't ignored you; it's incapable of learning from the exchange. The model is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), continuity has to come from outside it, from the [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) or a [memory system](https://fderuiter.github.io/agy-skills/dictionary/memory-system).

This mechanism also explains how you're billed. Every request runs the model over the full context, so cost scales with [input tokens](https://fderuiter.github.io/agy-skills/dictionary/input-tokens) and [output tokens](https://fderuiter.github.io/agy-skills/dictionary/output-tokens), and an agent making dozens of [tool](https://fderuiter.github.io/agy-skills/dictionary/tool) calls pays for inference on each round trip. This is why context size is a cost question as well as a quality one.

_Usage:_

"Why does the bill scale with usage instead of being a flat license?"

"You're paying for inference, every model provider request runs the model on the provider's hardware. Training already happened, but inference costs accrue per request, and a single [turn](https://fderuiter.github.io/agy-skills/dictionary/turn) can expand into many requests when tools are called."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
