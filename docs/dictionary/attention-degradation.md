---
layout: default
title: "Attention degradation | AI Coding Dictionary"
description: "As a session grows, each token's attention budget spreads across more competitors; signal on meaningful relationships shrinks."
permalink: /dictionary/attention-degradation/
category: dictionary
keywords: ["ai coding", "dictionary", "attention degradation"]
---

# Attention degradation

As a [session](https://fderuiter.github.io/agy-skills/dictionary/session) grows, each [token](https://fderuiter.github.io/agy-skills/dictionary/token)'s [attention budget](https://fderuiter.github.io/agy-skills/dictionary/attention-budget) is spread across more competitors. The signal on any one [meaningful relationship](https://fderuiter.github.io/agy-skills/dictionary/attention-relationship) shrinks; noise from irrelevant [context](https://fderuiter.github.io/agy-skills/dictionary/context) crowds in. Same [model](https://fderuiter.github.io/agy-skills/dictionary/model), same [parameters](https://fderuiter.github.io/agy-skills/dictionary/parameters), just more mouths to feed from the same plate. Cause of the smart zone / dumb [zone effect](https://fderuiter.github.io/agy-skills/dictionary/smart-zone).

It presents as the model getting worse mid-session: constraints it followed for an hour start slipping, it re-asks things it was told, it writes code that ignores a file it read earlier. Nothing about the model changed, the only variable is how much context it's now attending over.

It's gradual, which is what makes it hard to catch from inside the session. There's no error and no threshold; each [turn](https://fderuiter.github.io/agy-skills/dictionary/turn) is only slightly worse than the last, and by the time the slips are obvious you've been in the dumb zone for a while.

You recover by removing context, not adding more. Re-pasting the ignored instruction adds another competitor to the same crowded window and helps only briefly. What works: [clear](https://fderuiter.github.io/agy-skills/dictionary/clearing) and reload only what the task needs, or [compact](https://fderuiter.github.io/agy-skills/dictionary/compaction), or [hand off](https://fderuiter.github.io/agy-skills/dictionary/handoff) to a fresh session. Treat declining instruction-following as a signal about context length, not about the model.

_Usage:_

"It's deep in the dumb zone, inventing generics that aren't in the type file."

"Attention degradation. The type definitions are still in context, but the signal on them is buried under everything we've added since. Clear and reload."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
