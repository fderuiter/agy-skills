---
name: implement-spec
description: User-invoked. Orchestrate concurrent subagents to implement a full specification across its ticket task graph. Use when a spec and its dependency-linked tickets are ready to build in code.
---

# Implement Spec

You have been provided a spec. This spec has a set of tickets associated with it (typically produced by `/to-tickets`), describing how to implement the spec in code.

The goal is a completed pull request that implements the entire specification on a single target branch.

The tickets are not a linear list of steps. They form a **task graph** (a directed acyclic graph) with blocking relationships between them. At any moment, there is a **frontier** of unblocked tickets ready to be worked on concurrently.

Communication between the orchestrator and subagents should be sparse and efficient. Communicate primarily through **context pointers**: references to the spec file, ticket identifiers, ADRs, research notes, and commit hashes. Do not duplicate information already accessible via pointers.

**Implementer subagents** run in isolated Git worktrees and branches for maximum concurrency and safety.

## Lifecycle

```
       ┌──────────────────────────────────────────────┐
       │               Read Spec & DAG                │
       └──────────────────────┬───────────────────────┘
                              │
                              ▼
       ┌──────────────────────────────────────────────┐
       │   Identify Unblocked Frontier Tickets        │
       └──────────────────────┬───────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
       ┌──────────────┐              ┌──────────────┐
       │ Implementer  │              │ Implementer  │
       │ Subagent A   │              │ Subagent B   │
       │ (Worktree A) │              │ (Worktree B) │
       └───────┬──────┘              └───────┬──────┘
               │                             │
               └──────────────┬──────────────┘
                              │
                              ▼
       ┌──────────────────────────────────────────────┐
       │        Merge Completed Work into PR          │
       └──────────────────────┬───────────────────────┘
                              │
                              ▼
       ┌──────────────────────────────────────────────┐
       │       Advance Frontier & Repeat              │
       └──────────────────────┬───────────────────────┘
                              │
                              ▼
       ┌──────────────────────────────────────────────┐
       │  Run /code-review & Clean Up Worktrees       │
       └──────────────────────────────────────────────┘
```

## Steps

### 1. Read the Spec and Build the Task Graph

Read the spec document and all linked tickets. Map the blocking dependencies:
- Which tickets have zero dependencies? These form the initial **frontier**.
- Which tickets depend on earlier tickets completing first?
- Note any shared resources, schemas, or seams that multiple tickets will touch. Pin literal names or shared interfaces before dispatching parallel implementers.

### 2. Optional: Pre-Implementation Exploration Subagent

If tickets require deep exploration of third-party APIs, legacy codebase seams, or external docs:
- Dispatch an exploration subagent with read-only tools.
- Have the subagent record its findings in a designated notes directory (e.g. `.notes/` or an artifact) rather than cluttering conversation context.
- All implementer subagents can then read those notes directly via context pointers.

### 3. Create the PR Branch

Create the target feature branch for the entire spec (e.g. `feat/spec-name`), and create a draft pull request on GitHub:
- Mark the PR as closing the spec issue and all child tickets (e.g., `Closes #101, Closes #102`).

### 4. Dispatch Implementer Subagents on the Frontier

For each unblocked ticket on the frontier:
1. Declare a domain-specialized worker via `define_subagent` tailored to the ticket boundary (e.g. `name: "worker-database"`, `description: "Database and schema implementer"`, `system_prompt: "...", `enable_write_tools: true`, `enable_subagent_tools: false`). If generic implementation suffices, use `TypeName: "self"`.
2. Apply the **Scoped Worktree Strategy**:
   - Default to `Workspace: "share"` (shared worktree) when tickets touch disjoint subdirectories or non-conflicting modules, avoiding unnecessary disk duplication.
   - Use `Workspace: "branch"` only when the ticket executes full-tree refactors or risky build mutations.
3. Launch the worker using `invoke_subagent` (`Model: "inherit"` or `"pro"`).
4. Send the initial task assignment via `send_message` formatted using the **Structured Envelope**:
   ```json
   {
     "type": "task_assignment",
     "taskId": "<ticket-id>",
     "status": "in_progress",
     "payload": {
       "specPath": "docs/specs/feature-spec.md",
       "ticketId": "<ticket-id>",
       "requirements": "...",
       "adrPointers": ["docs/adr/0008-antigravity-multi-agent-swarms-and-sdk-evals.md"]
     },
     "nextAction": "Implement test-first using /tdd and notify orchestrator upon completion."
   }
   ```
5. Optionally attach a **timer guard** via the `schedule` tool (e.g. `DurationSeconds: 900`, `TimerCondition: "<subagent-id>"`) to supervise long-running tasks and recover from hangs without active polling loops.
6. The worker communicates progress, blockers, or completion using matching structured envelopes (`type: "checkpoint"`, `type: "blocker"`, `type: "task_completion"`).
7. Stop calling tools and let Antigravity's reactive wakeup notify you when the worker finishes, sends a message, or the timer guard triggers. Do not poll in a loop.

### 5. Merge Completed Tickets into the PR Branch

When an implementer subagent reports `task_completion`:
1. If using `Workspace: "branch"`, switch to the PR branch and merge the ticket branch:
   ```bash
   git checkout feat/spec-name
   git merge --no-ff "ticket/<ticket-id>" -m "feat: implement ticket <ticket-id>"
   ```
2. If using `Workspace: "share"`, verify that all modified files pass the test suite on the shared branch.
3. Run the test suite to verify integration on the PR branch.
4. If conflicts arise, use `/resolving-merge-conflicts` to resolve them cleanly preserving intent.
5. Clean up any temporary branches or workspaces.

### 6. Advance the Frontier

Check the task graph:
- Mark the completed ticket as resolved.
- Identify newly unblocked tickets whose dependencies are now all satisfied.
- Spawn new implementer subagents for the new frontier using the **Dynamic Worker Mesh**.
- Repeat steps 4 through 6 until all tickets in the graph are complete.

### 7. Review, Polish, and Finalize

Once every ticket has been merged into the PR branch:
1. Run a full test suite and typecheck run on the PR branch.
2. Run `/code-review` across the full PR diff against both Coding Standards and Spec Requirements.
3. Fix any findings raised by the code review.
4. Mark the pull request as ready for human review.
5. Clean up any remaining worktrees or temporary branches.
