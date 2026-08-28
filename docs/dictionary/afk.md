---
layout: default
title: "AFK | AI Coding Dictionary"
description: "A working pattern where the user kicks off a session and leaves the agent to run unattended (away from keyboard)."
permalink: /dictionary/afk/
category: dictionary
keywords: ["ai coding", "dictionary", "afk", "away from keyboard", "afk (away from keyboard)"]
---

# AFK

Away from keyboard. A working pattern where the user kicks off a [session](https://fderuiter.github.io/agy-skills/dictionary/session) and leaves the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) to run unattended. The throughput multiplier of [AI](https://fderuiter.github.io/agy-skills/dictionary/ai) coding, many AFK sessions can run in parallel while you sleep, eat, or work on something else. Usually requires a permissive [permission mode](https://fderuiter.github.io/agy-skills/dictionary/permission-mode) plus [sandboxing](https://fderuiter.github.io/agy-skills/dictionary/sandbox) to be safe.

When you're not there, the agent handles ambiguity differently. While you're watching, an ambiguous decision surfaces as a question and you answer it; once you've walked away, the agent picks a default and keeps going, and every later decision builds on that guess. The characteristic failure is coming back to hours of finished, confident work built on a wrong call made in the first ten minutes. The work isn't sloppy, it's coherent, just coherent about the wrong thing.

Since you can't give input during the run, give it before and after instead. Before: resolve the ambiguity up front, a [grilling](https://fderuiter.github.io/agy-skills/dictionary/grilling) session, a written [spec](https://fderuiter.github.io/agy-skills/dictionary/spec), so there are fewer gaps for the agent to fill alone. During: [automated checks](https://fderuiter.github.io/agy-skills/dictionary/automated-check) and [automated review](https://fderuiter.github.io/agy-skills/dictionary/automated-review) stand in for the attention you're not giving, failing fast on what can be caught mechanically. After: the run ends in something reviewable, a PR, not changes already merged. AFK doesn't remove [human review](https://fderuiter.github.io/agy-skills/dictionary/human-review); it defers all of it to the end, which is why what arrives at the end has to be worth reviewing. This is also why [AX](https://fderuiter.github.io/agy-skills/dictionary/ax) matters most in AFK runs, with no one watching, the environment is the only support the agent gets.

_Avoid:_ "background agent", centers the machine ("running in the background") rather than the human pattern ("user has walked away"). AFK names the fact that matters: the user isn't watching.

_Usage:_

"I'm running this AFK, three sandboxed agents on the refactor, reviewing the PRs in the morning."

"[Bypass permissions](https://fderuiter.github.io/agy-skills/dictionary/agent-mode)?"

"Yeah, read-only [filesystem](https://fderuiter.github.io/agy-skills/dictionary/filesystem), no network."

## Related skills in agy-skills

- [**wayfinder**](https://fderuiter.github.io/agy-skills/skills-wayfinder): Runs multi-step planning and AFK explorations in parallel.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
