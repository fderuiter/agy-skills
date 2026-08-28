---
title: "retro: Session Transcript Retrospective & Tuning | agy-skills"
description: "Audits Antigravity session transcripts to find friction points and extract systemic environment, tooling, and context improvements."
keywords: ["retro skill", "session retrospective", "transcript analysis", "developer environment", "antigravity retro"]
permalink: /skills-retro/
---

## What it does

`retro` conducts a retrospective on an Antigravity coding [session](https://fderuiter.github.io/agy-skills/dictionary/session) by analyzing its chronological transcript logs. It evaluates where the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) hesitated, made avoidable mistakes, ran expensive tool queries, or struggled to find files.

Its defining constraint is that it analyzes past session transcripts to extract systemic environment improvements, not just code fixes. When an agent fails, developers often patch the immediate file or append an emotional reminder to `AGENTS.md`. `retro` treats every friction point as a defect in the developer environment: a missing linter, an absent [context pointer](https://fderuiter.github.io/agy-skills/dictionary/context-pointer), bloated steering rules, poor tool output formatting, or lack of log visibility.

## When to reach for it

You invoke this by typing `/retro`, and the agent won't reach for it on its own.

| Your situation | Reach for |
| --- | --- |
| A session was painful, slow, or struggled with conventions, and you want to fix the root environment causes | `retro` |
| You want to review a git diff against coding standards and spec requirements | [code-review](https://fderuiter.github.io/agy-skills/skills-code-review) |
| You need to diagnose a runtime bug or failing test with a disciplined loop | [diagnosing-bugs](https://fderuiter.github.io/agy-skills/skills-diagnosing-bugs) |
| You want to restructure codebase architecture and deepen modules | [improve-codebase-architecture](https://fderuiter.github.io/agy-skills/skills-improve-codebase-architecture) |
| You are authoring or pruning rules for steering files and skills | [writing-for-agents](https://fderuiter.github.io/agy-skills/skills-writing-for-agents) |

## Prerequisites

`retro` needs access to the session transcript logs. By default, it reads the active session log from `<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript.jsonl`, or you can supply a specific conversation ID or transcript path.

## The seven evaluation categories

`retro` audits the transcript as a [primary source](https://fderuiter.github.io/agy-skills/dictionary/primary-source) and categorizes every observed friction into one of seven systemic levers:

| Category | Transcript Signal | Systemic Fix |
| --- | --- | --- |
| **Navigation pointers** | Agent wanders through directories across multiple search tool calls | Add a concise pointer in `AGENTS.md` directing the agent to the domain entry point |
| **Automated checks** | Agent makes type, syntax, import, or contract errors caught late | Introduce a linter rule, type check, or architecture test that fails fast |
| **Coding standards** | Agent writes code violating project idioms or architecture boundaries | Add a clear rule to `CODING_STANDARDS.md` enforced during code review |
| **AGENTS.md economy** | Steering files are long and spend [tokens](https://fderuiter.github.io/agy-skills/dictionary/token) on every [turn](https://fderuiter.github.io/agy-skills/dictionary/turn) | Slim `AGENTS.md` by moving reference behind pointers and offloading rules to linters |
| **Tool economy** | Tool calls dump massive unpaginated stdout or repeat expensive searches | Add CLI summary flags, pagination, or compact MCP response schemas |
| **No-op elimination** | Steering files contain rules the pretrained model already does by default | Delete redundant or vague instructions using the no-op test |
| **Information access** | Agent guesses at runtime state because dev logs or errors are hidden | Tee background server logs to disk or expose diagnostic inspection tools |

## Context pressure: Implementation vs Review

A core design principle of `retro` is recognizing the context pressure asymmetry between agent roles:

- **Implementation Agent (High Context Pressure)**: The agent writing code operates with a full [context window](https://fderuiter.github.io/agy-skills/dictionary/context-window) containing file contents, directory trees, terminal commands, and error traces. Loading hundreds of lines of style rules into its always-on prompt degrades reasoning. Keep `AGENTS.md` minimal: only navigation pointers, tool aliases, and hard boundaries.
- **Review Agent (Low Context Pressure)**: The agent reviewing code starts fresh with only the diff, commit messages, and spec. It does not explore or write code. It has ample capacity to enforce detailed rules from `CODING_STANDARDS.md`.

Whenever `retro` encounters a convention violation, it asks whether the rule belongs in an automated linter or in `CODING_STANDARDS.md` for the review agent, rather than dumping more text into `AGENTS.md`.

## Common questions

**Does `/retro` fix the code changes from the last session?**

No. `retro` improves the environment for future sessions rather than fixing individual code hunks. If the session wrote buggy code, use [diagnosing-bugs](https://fderuiter.github.io/agy-skills/skills-diagnosing-bugs) or [tdd](https://fderuiter.github.io/agy-skills/skills-tdd) to fix the code, and then run `retro` to discover why the agent made the mistake in the first place.

**Can I run it on a past session or a subagent?**

Yes. Pass the target conversation ID or transcript path. When analyzing complex tasks, `retro` also scans for `invoke_subagent` calls in the parent transcript and evaluates child [subagent](https://fderuiter.github.io/agy-skills/dictionary/subagent) transcripts.

**Why not put all coding guidelines directly in `AGENTS.md`?**

Because every line in `AGENTS.md` is loaded on every single turn, spending tokens and cluttering attention. Pushing rules to automated linters costs zero context tokens during implementation, while pushing them to `CODING_STANDARDS.md` reserves their cost for the review stage.

**What is a no-op rule?**

A no-op rule is an instruction that does not alter agent behavior compared to its default behavior. Phrases like "write clean, maintainable code" or "think carefully before acting" consume prompt space without preventing mistakes. `retro` identifies these rules and deletes them.

**How do I know if a tool call was token-inefficient?**

`retro` inspects tool response sizes in the transcript. A command that prints thousands of lines of verbose build logs or an unfiltered directory search that returns hundreds of irrelevant files floods context and pushes valuable history out of memory. `retro` recommends compact flags, summary scripts, or targeted filters.

## It's working if

- `AGENTS.md` gets shorter over time while agent accuracy increases.
- Recurring mistakes turn into deterministic automated checks or review rules instead of manual prompt nagging.
- Every retro recommendation cites a specific step index and excerpt from `transcript.jsonl`.
- Tool calls in subsequent sessions consume significantly fewer context tokens.
- Review standards are enforced during review without slowing down the implementation agent.

## Where it fits

`retro` is a periodic maintenance and post-session reflection skill. It sits alongside the build and review loop to continuously tune the development environment.

- [writing-for-agents](https://fderuiter.github.io/agy-skills/skills-writing-for-agents) provides the authoring discipline for any steering text, navigation pointers, or skill updates that `retro` proposes.
- [code-review](https://fderuiter.github.io/agy-skills/skills-code-review) enforces the coding standards that `retro` refines.
- [setup-agy-skills](https://fderuiter.github.io/agy-skills/skills-setup-agy-skills) configures the initial repo environment that `retro` maintains over time.
- [improve-codebase-architecture](https://fderuiter.github.io/agy-skills/skills-improve-codebase-architecture) deepens the codebase architecture, while `retro` refines the agent environment.

[ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) routes across the whole set when you are unsure which skill fits your current situation.
