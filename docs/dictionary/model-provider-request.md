---
layout: default
title: "Model provider request | AI Coding Dictionary"
description: "One round-trip from the harness to the model provider. The harness sends context; the provider returns one response."
permalink: /dictionary/model-provider-request/
category: dictionary
keywords: ["ai coding", "dictionary", "model provider request"]
---

# Model provider request

One round-trip from the [harness](https://fderuiter.github.io/agy-skills/dictionary/harness) to the [model provider](https://fderuiter.github.io/agy-skills/dictionary/model-provider). The harness sends the current [context](https://fderuiter.github.io/agy-skills/dictionary/context); the provider returns one response (a [tool call](https://fderuiter.github.io/agy-skills/dictionary/tool-call) or a final answer). A single user message can spawn many model provider requests if the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) calls [tools](https://fderuiter.github.io/agy-skills/dictionary/tool), each [tool result](https://fderuiter.github.io/agy-skills/dictionary/tool-result) triggers another request.

Each request carries everything: the [system prompt](https://fderuiter.github.io/agy-skills/dictionary/system-prompt), the full conversation so far, every tool result. The [model](https://fderuiter.github.io/agy-skills/dictionary/model) is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), so the provider keeps nothing between requests, request forty re-sends what request thirty-nine sent, plus one more tool result. The [prefix cache](https://fderuiter.github.io/agy-skills/dictionary/prefix-cache) exists to make this repetition affordable.

The request is also the unit of billing. [Input tokens](https://fderuiter.github.io/agy-skills/dictionary/input-tokens), [output tokens](https://fderuiter.github.io/agy-skills/dictionary/output-tokens), and cache discounts are all counted per request, which is why an innocuous-looking question can cost a surprising amount: the cost isn't proportional to your message, it's proportional to the number of requests times the size of the context each one carries.

It's worth keeping the request distinct from the [turn](https://fderuiter.github.io/agy-skills/dictionary/turn). A turn is one exchange with you, and a single turn, "fix the failing test", plays out as a chain of requests:

| Request | Model returns                     | Harness then                          |
| ------- | --------------------------------- | ------------------------------------- |
| 1       | Tool call: run the tests          | Runs them, appends the failure output |
| 2       | Tool call: read the test file     | Appends the file contents             |
| 3       | Tool call: read the source file   | Appends the file contents             |
| 4       | Tool call: edit the source file   | Applies the edit, appends the result  |
| 5       | Tool call: run the tests again    | Runs them, appends the pass output    |
| 6       | Final answer: "fixed, tests pass" | Shows it to you                       |

Six requests for one turn, each one re-sending the whole context. When you wonder where the [tokens](https://fderuiter.github.io/agy-skills/dictionary/token) went, count the requests, not the turns.

_Usage:_

"One question burned forty thousand tokens?"

"Look at the tool calls, twelve grep, eight read, four edits. Each tool result spawns another model provider request, and the whole [session](https://fderuiter.github.io/agy-skills/dictionary/session) prefix re-sends every time."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
