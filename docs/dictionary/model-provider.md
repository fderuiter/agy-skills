---
layout: default
title: "Model provider | AI Coding Dictionary"
description: "Whatever serves a model for inference. Usually remote (Anthropic, OpenAI, Google), but can also be local (Ollama, llama.cpp)."
permalink: /dictionary/model-provider/
category: dictionary
keywords: ["ai coding", "dictionary", "model provider"]
---

# Model provider

Whatever serves a [model](https://fderuiter.github.io/agy-skills/dictionary/model) for [inference](https://fderuiter.github.io/agy-skills/dictionary/inference). Usually a remote service (Anthropic, OpenAI, Google), but can also be local, Ollama, LM Studio, llama.cpp running on your own machine. The [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) doesn't run the model itself; it asks a provider to.

The provider owns the machinery: the [parameters](https://fderuiter.github.io/agy-skills/dictionary/parameters) live on its hardware, and every [model provider request](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request) is the harness sending [tokens](https://fderuiter.github.io/agy-skills/dictionary/token) over the network and getting predictions back. That makes the provider the source of a whole category of problems that get misattributed to the model or the harness, rate limits, degraded capacity, and outages all live here. When the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) stalls mid-[session](https://fderuiter.github.io/agy-skills/dictionary/session) or errors on every [turn](https://fderuiter.github.io/agy-skills/dictionary/turn), the provider's status page is worth checking before anything else.

The provider also sets the commercial terms: per-token pricing for [input](https://fderuiter.github.io/agy-skills/dictionary/input-tokens) and [output tokens](https://fderuiter.github.io/agy-skills/dictionary/output-tokens), [prefix cache](https://fderuiter.github.io/agy-skills/dictionary/prefix-cache) discounts, and which models are available at all. Note that the provider and the model's maker can be different companies, Bedrock, Vertex, and OpenRouter serve other people's models.

Local providers trade capability for control: the models that fit on your own hardware are far smaller than the frontier ones, but nothing leaves the machine and there's no bill per token.

_Usage:_

"Can we run this offline for the air-gapped client?"

"Swap the model provider to a local one, Ollama or llama.cpp on their box. The harness doesn't care, it just hits a different endpoint."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
