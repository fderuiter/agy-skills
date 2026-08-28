---
title: "implement-spec: Concurrent Subagent Task Graph Orchestration | agy-skills"
description: "Orchestrate concurrent implementer subagents across task graph frontiers and isolated worktrees to build full specifications."
keywords: ["implement spec", "subagent orchestration", "task graph frontier", "git worktrees", "antigravity skill"]
permalink: /skills-implement-spec/
---

## What it does

`implement-spec` turns a full specification and its dependency-linked tickets into a completed, code-reviewed pull request. It drives the entire build phase by orchestrating concurrent subagents across the task graph.

The defining constraint is that it does not implement tickets linearly or sequentially in a single workspace. It discovers the unblocked frontier of tickets, spins up background implementer subagents in isolated Git worktrees, merges their work into a single pull request branch as tickets land, and dynamically advances the frontier until the entire specification is built and verified.

## When to reach for it

You invoke this by typing `/implement-spec`, and the agent will not reach for it on its own.

Reach for this when you have an approved specification and a set of tracer-bullet tickets (produced by [to-tickets](https://fderuiter.github.io/agy-skills/skills-to-tickets)) ready to be turned into code. For a single standalone ticket or simple code tweak, reach for [implement](https://fderuiter.github.io/agy-skills/skills-implement) instead.

## Prerequisites

A completed specification (from [to-spec](https://fderuiter.github.io/agy-skills/skills-to-spec)) and a task graph of tickets with explicit blocking edges (from [to-tickets](https://fderuiter.github.io/agy-skills/skills-to-tickets)).

## The task graph frontier

Tickets produced by [to-tickets](https://fderuiter.github.io/agy-skills/skills-to-tickets) do not form a flat to-do list; they form a directed acyclic graph. At the start of a run, only a subset of tickets have zero blocking dependencies. This subset is the **initial frontier**.

As each implementer subagent completes its ticket and merges into the target branch, dependent tickets lose their blockers. The orchestrator tracks this graph in memory and promotes newly unblocked tickets to the active frontier immediately, maintaining the highest possible safe concurrency.

## Worktrees and concurrency

Each implementer subagent works in its own isolated Git worktree or branched workspace:

1. **Domain-specialized workers**: The orchestrator can declare specialized workers via `define_subagent` (e.g. database worker, frontend worker) with scoped tool permissions and dedicated system prompts.
2. **Isolation**: Subagents never overwrite each other's uncommitted files, node_modules caches, or temporary build outputs.
3. **Context pointers**: The orchestrator hands subagents compact pointers (spec file path, ticket ID, ADR numbers) rather than copying full file trees into prompts.
4. **Timer guards**: Long-running subagents are monitored with one-shot `schedule` timer guards using `TimerCondition` to handle hangs without polling loops.
5. **Integration loop**: Merges happen back onto the central PR branch using non-fast-forward merges (`git merge --no-ff`), running the test suite after each integration to catch regressions early.

## Common questions

**How does implement-spec differ from /implement?**

`/implement` is designed for a single session and a single ticket: you sit with the agent while it follows the red-green-refactor loop, runs tests, and reviews the diff. `/implement-spec` is the macro-orchestrator for an entire feature: it coordinates multiple `/implement` subagents across separate worktrees according to the ticket dependency graph.

**What happens when parallel subagents edit the same file?**

Before dispatching parallel implementers, the orchestrator inspects tickets for shared resources, schemas, or database migrations. Where tickets touch the same seam, it pins the literal names or shared interfaces first, or serializes the dependent tickets so they merge cleanly. If a merge conflict does occur, the orchestrator invokes [resolving-merge-conflicts](https://fderuiter.github.io/agy-skills/skills-resolving-merge-conflicts) before advancing the frontier.

**Does the orchestrator run code review automatically?**

Yes. Once the frontier is exhausted and all tickets have merged into the pull request branch, the orchestrator runs [code-review](https://fderuiter.github.io/agy-skills/skills-code-review) across the entire pull request diff, resolves any findings, and marks the PR ready for human review.

## It's working if

- Subagents start in parallel on unblocked tickets without interfering with each other's workspace files.
- Each ticket produces an isolated commit and clean integration merge on the PR branch.
- The test suite and typechecks pass on the integration branch after every ticket merge.
- Temporary worktrees are cleanly removed when execution finishes.

## Where it fits

- **Role**: Chain step in the main engineering workflow (`grill-with-docs → to-spec → to-tickets → implement-spec → code-review`).
- **Neighbours**: Follows [to-tickets](https://fderuiter.github.io/agy-skills/skills-to-tickets), delegates individual tasks to [implement](https://fderuiter.github.io/agy-skills/skills-implement), and concludes with [code-review](https://fderuiter.github.io/agy-skills/skills-code-review).
- **The map**: Consult [ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) for the complete engineering router.
