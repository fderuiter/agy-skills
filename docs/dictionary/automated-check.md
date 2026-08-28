---
layout: default
title: "Automated check | AI Coding Dictionary"
description: "A deterministic verification that runs in the environment, tests, type checks, lints, build, pre-commit hooks. Pass/fail, no judgement."
permalink: /dictionary/automated-check/
category: dictionary
keywords: ["ai coding", "dictionary", "automated check"]
---

# Automated check

A deterministic verification that runs in the [environment](https://fderuiter.github.io/agy-skills/dictionary/environment), tests, type checks, lints, build, pre-commit hooks. Pass/fail, no judgement. The signal an [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) can self-correct from without involving anyone else. A flaky test is a broken check, not a non-check; automated checks are deterministic _by design_.

Self-correction works as a loop. The agent makes a change, runs the check as a [tool call](https://fderuiter.github.io/agy-skills/dictionary/tool-call), and the failure output lands in its [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window), a type error with a file and line, a failing assertion with expected and actual values. That's enough for the agent to fix the problem and run the check again, around and around until it passes, with no human in the loop. Determinism is what makes the loop trustworthy: the same code always produces the same verdict, so a pass means something. A flaky check poisons this, the agent "fixes" code that was fine, or retries past a real failure.

This is why good checks are a large part of a codebase's [AX](https://fderuiter.github.io/agy-skills/dictionary/ax). An agent in a repo with strict types, a fast test suite, and a linter catches most of its own mistakes before you see them; an agent in a repo with none of those ships whatever it produces. The difference matters most in [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) runs, where checks are the only verification happening during the run. But a check only catches what it asserts, green checks mean the asserted properties hold, not that the code is right. The judgement-shaped gaps are what [automated review](https://fderuiter.github.io/agy-skills/dictionary/automated-review) and [human review](https://fderuiter.github.io/agy-skills/dictionary/human-review) are for.

_Avoid:_ "feedback loop" / "backpressure", both lump checks together with review. _Avoid:_ "test", tests are automated checks, but not all automated checks are tests.

_Usage:_

"The agent keeps shipping broken code in the AFK runs."

"What automated checks are wired into the [sandbox](https://fderuiter.github.io/agy-skills/dictionary/sandbox)?"

"Just the unit tests."

"Add typecheck and lint, it'll self-correct from those before the PR ever lands."

## Related skills in agy-skills

- [**resolving-merge-conflicts**](https://fderuiter.github.io/agy-skills/skills-resolving-merge-conflicts): Runs repo feedback loops and automated checks before committing.
- [**tdd**](https://fderuiter.github.io/agy-skills/skills-tdd): Enforces automated test-driven development cycles at defined seams.


---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
