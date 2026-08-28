---
layout: default
title: "Automated review | AI Coding Dictionary"
description: "An agent reviewing another agent's work, often with a different model or system prompt. Non-deterministic: it forms a judgement."
permalink: /dictionary/automated-review/
category: dictionary
keywords: ["ai coding", "dictionary", "automated review"]
---

# Automated review

An [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) reviewing another agent's work, often with a different [model](https://fderuiter.github.io/agy-skills/dictionary/model) or [system prompt](https://fderuiter.github.io/agy-skills/dictionary/system-prompt). Non-deterministic: it forms a judgement. Runs anywhere, pre-merge on a PR, post-hoc on commit history, mid-session as a [subagent](https://fderuiter.github.io/agy-skills/dictionary/subagent). An LLM-as-judge in CI is automated review, not an [automated check](https://fderuiter.github.io/agy-skills/dictionary/automated-check); what the assertion _does_ decides the category, not where it runs.

The separation from the working agent is what makes it work. Asking the agent that wrote the code to review its own work gets you very little, the [session](https://fderuiter.github.io/agy-skills/dictionary/session) that produced the bug also contains the reasoning that produced it, and the agent reads its own conclusions back as confirmation. A reviewer with a fresh [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) has none of that attachment: it sees the diff the way a stranger would, which is what review depends on. A different model or a review-specific system prompt sharpens this further, different blind spots, and a system prompt scoped to what you actually care about (security, API contracts, performance) rather than a vague "look for problems".

It slots between the other review layers. Automated checks are deterministic and catch what can be asserted mechanically; [human review](https://fderuiter.github.io/agy-skills/dictionary/human-review) is expensive and scales worst. Automated review sits in the middle: it catches judgement-shaped problems, a misleading function name, a missed edge case, at machine cost. Because it's non-deterministic, it can miss things and flag non-issues; treat it as a filter that raises the floor before a human looks, not a gate that replaces one.

_Avoid:_ "AI review" / "agent review", too vague to distinguish from the working agent itself.

_Usage:_

"We're getting too many bad PRs from the [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) runs."

"Add an automated review step before merge, different model, separate system prompt, scoped to security and contract changes."

## Related skills in agy-skills

- [**code-review**](https://fderuiter.github.io/agy-skills/skills-code-review): Runs multi-agent code reviews on standards and spec compliance.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
