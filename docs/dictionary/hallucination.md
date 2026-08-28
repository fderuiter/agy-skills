---
layout: default
title: "Hallucination | AI Coding Dictionary"
description: "Confidently-wrong model output. Two flavors: factuality (invented facts) and faithfulness (drift from loaded context)."
permalink: /dictionary/hallucination/
category: dictionary
keywords: ["ai coding", "dictionary", "hallucination"]
---

# Hallucination

Confidently-wrong [model](https://fderuiter.github.io/agy-skills/dictionary/model) output. Two flavors with different causes and fixes:

| Flavor         | What goes wrong                                                                                                        | Cause                                                                                                                | Fix                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| _Factuality_   | Invented or wrong facts about the world, a function that doesn't exist, a wrong API signature, a fake citation        | [Parametric knowledge](https://fderuiter.github.io/agy-skills/dictionary/parametric-knowledge) gaps, often past the [knowledge cutoff](https://fderuiter.github.io/agy-skills/dictionary/knowledge-cutoff) | Load the right [contextual knowledge](https://fderuiter.github.io/agy-skills/dictionary/contextual-knowledge) |
| _Faithfulness_ | Output drifts from the contextual knowledge that's loaded, the user's instructions, or the model's own prior reasoning | [Attention degradation](https://fderuiter.github.io/agy-skills/dictionary/attention-degradation); worsens in the [dumb zone](https://fderuiter.github.io/agy-skills/dictionary/smart-zone)                 | [Clear](https://fderuiter.github.io/agy-skills/dictionary/clearing) or [compact](https://fderuiter.github.io/agy-skills/dictionary/compaction)               |

[Next-token prediction](https://fderuiter.github.io/agy-skills/dictionary/next-token-prediction) produces fluent output whether or not the underlying fact is real, the model has no internal signal that it doesn't know something, so an invented method arrives in the same assured register as a correct one. Hallucinated code is plausible by construction: it's what the API _would_ look like if it existed, which is exactly what makes it slip past a skim-level review and fail only when run.

You need to know which flavor you're looking at, because the fix for one makes the other worse. Factuality means missing knowledge: the fix is adding context, the docs, the type definitions, the file. Faithfulness means the knowledge is present but losing the competition for attention: the fix is removing context. Misdiagnose faithfulness as factuality and you paste in more docs, which grows the context and makes the drift worse. When the agent gets something wrong, check whether the correct information was already in context before deciding which problem you have.

_Avoid:_ "hallucination" as a bare synonym for "wrong", without naming the flavor, the term has no diagnostic value.

_Usage:_

"It hallucinated a `parseAsync` method on the schema."

"Factuality or faithfulness?"

"The method exists in the docs I pasted, it just stopped reading them after [turn](https://fderuiter.github.io/agy-skills/dictionary/turn) forty."

"Faithfulness then. Compact and reload, don't bother adding more docs."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
