---
layout: default
title: "Clearing | AI Coding Dictionary"
description: "Ending the current session and starting a fresh one. The next message begins with an empty session and an empty context window."
permalink: /dictionary/clearing/
category: dictionary
keywords: ["ai coding", "dictionary", "clearing"]
---

# Clearing

Ending the current [session](https://fderuiter.github.io/agy-skills/dictionary/session) and starting a fresh one. The next message begins with an empty session and an empty [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window). Usually user-driven.

Clearing is the cure for a polluted context. A session accumulates everything: failed attempts, wrong turns, stale [tool results](https://fderuiter.github.io/agy-skills/dictionary/tool-result), abandoned plans. The [model](https://fderuiter.github.io/agy-skills/dictionary/model) re-reads all of it on every [turn](https://fderuiter.github.io/agy-skills/dictionary/turn), and bad history drags on new work. Deep into a long session the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) gets vaguer and less obedient, instructions you gave clearly get ignored, quality slips, and prodding it to do better doesn't help, because the noise it's wading through is still in its [context](https://fderuiter.github.io/agy-skills/dictionary/context). Clearing removes the noise.

Clearing doesn't erase the conversation. Most [harnesses](https://fderuiter.github.io/agy-skills/dictionary/harness) keep session history on your computer, so the transcript is still there to read or resume. What's gone is the agent's working state: the model is [stateless](https://fderuiter.github.io/agy-skills/dictionary/stateless), so the new session knows nothing the old one knew. If the session holds decisions or progress the next one will need, have the agent write a [handoff artifact](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact) first, then start the new session by pointing at it.

Compare [compaction](https://fderuiter.github.io/agy-skills/dictionary/compaction), which summarises the session into the new context instead of starting empty. Clearing is the blunter tool: nothing carries over, including the junk.

_Usage:_

"It's stuck looping on the failing test."

"Just clear it, start a fresh session with the plan doc and the test file. No point fighting the existing context."

## Related skills in agy-skills

- [**ask-fred**](https://fderuiter.github.io/agy-skills/skills-ask-fred): Routes context management options and clearing decisions at phase boundaries.
- [**handoff**](https://fderuiter.github.io/agy-skills/skills-handoff): Creates portable handoff documents before clearing session context.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
