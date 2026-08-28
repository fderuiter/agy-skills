---
layout: default
title: "Turn | AI Coding Dictionary"
description: "One user message plus everything the agent does in response, up until it yields back to the user. Contains one or more provider requests."
permalink: /dictionary/turn/
category: dictionary
keywords: ["ai coding", "dictionary", "turn"]
---

# Turn

One user message plus everything the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) does in response, up until it yields back to the user. Contains one or more [model provider requests](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request), many, if the agent calls [tools](https://fderuiter.github.io/agy-skills/dictionary/tool). A clarifying question closes the turn; your reply opens the next one. The hierarchy is [session](https://fderuiter.github.io/agy-skills/dictionary/session) **> Turn > Model provider request**.

What makes the turn worth naming is that its length is the agent's decision, not yours. You hand over one message; the agent decides how many tool calls to chain before yielding. A turn can be a one-sentence answer or twenty minutes of reading, editing, and running tests. That's the same property from two angles: long turns are what make [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) work possible, and long turns are also where things go wrong unsupervised, by the time the agent yields, it may have drifted a long way from what you meant.

The turn is also the natural unit for steering. Everything inside a turn happens without you; the gaps between turns are where you redirect. Most [harnesses](https://fderuiter.github.io/agy-skills/dictionary/harness) soften this: you can interrupt mid-turn to stop the agent and redirect it, or type a message while it works, which gets read once the turn completes. If you find yourself repeatedly unhappy with where turns end up, the fix is usually to ask for smaller ones, a plan first, one step at a time, trading autonomy for more frequent gaps to steer in.

_Usage:_

"One turn took two minutes?"

"It made fourteen [tool calls](https://fderuiter.github.io/agy-skills/dictionary/tool-call) inside that turn, each one is a separate model provider request. Latency stacks up before the agent finally yields back to you."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
