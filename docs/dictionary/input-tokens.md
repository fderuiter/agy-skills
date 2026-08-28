---
layout: default
title: "Input tokens | AI Coding Dictionary"
description: "Tokens the harness sends on each model provider request. Billed at a lower rate than output tokens."
permalink: /dictionary/input-tokens/
category: dictionary
keywords: ["ai coding", "dictionary", "input tokens"]
---

# Input tokens

[Tokens](https://fderuiter.github.io/agy-skills/dictionary/token) the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) sends on each [model provider request](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request), the [system prompt](https://fderuiter.github.io/agy-skills/dictionary/system-prompt), the conversation history, [tool results](https://fderuiter.github.io/agy-skills/dictionary/tool-result), everything the [model](https://fderuiter.github.io/agy-skills/dictionary/model) reads before it writes. Billed at a lower rate than [output tokens](https://fderuiter.github.io/agy-skills/dictionary/output-tokens), because they are less expensive to process than output tokens.

When doing [AI](https://fderuiter.github.io/agy-skills/dictionary/ai) coding, input tokens make up most of your bill. The model is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), so each [turn](https://fderuiter.github.io/agy-skills/dictionary/turn) re-sends the entire [session](https://fderuiter.github.io/agy-skills/dictionary/session) as input: your first message, every response, every tool result since. The input for turn fifty contains the previous forty-nine turns. A single model provider request might produce a few hundred output tokens but re-send a hundred thousand input tokens of accumulated history.

The [prefix cache](https://fderuiter.github.io/agy-skills/dictionary/prefix-cache) reduces the cost: history that exactly matches a previous request is billed as cheap [cache tokens](https://fderuiter.github.io/agy-skills/dictionary/cache-tokens) rather than full-price input. When input costs still hurt, the fix is to shrink what gets re-sent, [clearing](https://fderuiter.github.io/agy-skills/dictionary/clearing) or [compacting](https://fderuiter.github.io/agy-skills/dictionary/compaction) between tasks.

_Usage:_

"Bill's high but the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent)'s barely writing anything."

"It's the input tokens, every turn re-sends the whole session. Without the prefix cache you re-pay for the history each request."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
