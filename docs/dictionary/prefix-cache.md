---
layout: default
title: "Prefix cache | AI Coding Dictionary"
description: "The provider-side store that lets consecutive requests skip re-processing a shared prefix, billing those tokens at a lower rate."
permalink: /dictionary/prefix-cache/
category: dictionary
keywords: ["ai coding", "dictionary", "prefix cache"]
---

# Prefix cache

The [provider](https://fderuiter.github.io/agy-skills/dictionary/model-provider)-side store that lets consecutive [model provider requests](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request) skip re-processing a shared prefix. When the start of a request matches the start of a recent one, same [system prompt](https://fderuiter.github.io/agy-skills/dictionary/system-prompt), same history up to some point, the provider reuses its prior work and bills those [tokens](https://fderuiter.github.io/agy-skills/dictionary/token) as [cache tokens](https://fderuiter.github.io/agy-skills/dictionary/cache-tokens) at a much lower rate.

The cache pays off because sessions grow append-only. Every request re-sends the whole history as [input tokens](https://fderuiter.github.io/agy-skills/dictionary/input-tokens) (see that entry for why), and in a normal [session](https://fderuiter.github.io/agy-skills/dictionary/session) the history only changes at the end, each request is the previous one plus a few new messages. The provider processes the long shared beginning once, stores the result, and picks up from where the prefix ends. Without the cache, a 50-[turn](https://fderuiter.github.io/agy-skills/dictionary/turn) session would pay to re-process turn one fifty times.

Caches also expire. How long an entry stays warm varies per model provider, typically minutes, not hours. Leave a session idle past the window and the next request rebuilds the prefix at full price once before caching resumes. This is mostly a [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) builder's concern; as a user, the visible effect is that requests after a long pause cost more than the ones before it.

_Usage:_

"Why did the bill spike halfway through the session?"

"Harness started injecting the current time into the system prompt every turn. Prefix cache breaks at the first changed token, so every request after that billed at full rate."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
