---
layout: default
title: "Model | AI Coding Dictionary"
description: "The parameters. Stateless, does next-token prediction and nothing else. Cannot do anything agentic on its own."
permalink: /dictionary/model/
category: dictionary
keywords: ["ai coding", "dictionary", "model"]
---

# Model

The [parameters](https://fderuiter.github.io/agy-skills/dictionary/parameters). [Stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), does [next-token prediction](https://fderuiter.github.io/agy-skills/dictionary/next-token-prediction) and nothing else. "Claude Opus 4.x" and "GPT-5.x" are models. On its own a model can't do anything agentic; it has to be [harnessed](https://fderuiter.github.io/agy-skills/dictionary/harness).

Models can't read files, run commands, browse the web, or remember yesterday, it takes [tokens](https://fderuiter.github.io/agy-skills/dictionary/token) in and predicts tokens out, once per [model provider request](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request). Everything that feels like an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) working, choosing [tools](https://fderuiter.github.io/agy-skills/dictionary/tool), reading results, looping until the task is done, is the harness orchestrating many of those predictions in a row.

[Model providers](https://fderuiter.github.io/agy-skills/dictionary/model-provider) ship models in tiers: a large one that's smartest but slow and expensive, and smaller ones that are faster and cheaper but less capable. Picking a tier is a real decision, heavyweight for planning and hard debugging, lightweight for mechanical changes, and harnesses let you switch mid-[session](https://fderuiter.github.io/agy-skills/dictionary/session).

Being strict about the word also sharpens diagnosis. "The model is bad at this" is a specific claim, the same model in a different harness, or with a different [context](https://fderuiter.github.io/agy-skills/dictionary/context), often behaves completely differently. Before blaming the model, check what it was given: most disappointing output traces back to context or harness, not parameters.

_Usage:_

"Should we switch the model from Sonnet to Opus for the planning step?"

"Try it, but the harness is doing most of the lifting on this task. The model swap won't help if the [system prompt](https://fderuiter.github.io/agy-skills/dictionary/system-prompt) and tools are wrong."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
