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
1. Launch an implementer subagent using `invoke_subagent` with `TypeName: "self"`, `Model: "inherit"` (or `"pro"`), and `Workspace: "branch"` (or create a dedicated git worktree if running in a shell environment without branch workspace support).
2. Provide the subagent with minimal context pointers:
   - Spec file path or URL
   - Ticket identifier and description
   - Pointers to relevant ADRs or domain models in `CONTEXT.md`
   - Instruction to follow `/implement` discipline: write tests first with `/tdd`, run typechecks and test suite, and commit cleanly to its branch.
3. Stop calling tools and let Antigravity's reactive wakeup notify you when the subagent finishes. Do not poll in a loop.

### 5. Merge Completed Tickets into the PR Branch

When an implementer subagent finishes:
1. Switch to the PR branch and merge the ticket branch:
   ```bash
   git checkout feat/spec-name
   git merge --no-ff "ticket/<ticket-id>" -m "feat: implement ticket <ticket-id>"
   ```
2. Run the test suite to verify integration on the PR branch.
3. If conflicts arise, use `/resolving-merge-conflicts` to resolve them cleanly preserving intent.
4. Clean up the subagent workspace or temporary worktree:
   ```bash
   git worktree remove ".worktrees/ticket-<ticket-id>" --force
   ```

### 6. Advance the Frontier

Check the task graph:
- Mark the completed ticket as resolved.
- Identify newly unblocked tickets whose dependencies are now all satisfied.
- Spawn new implementer subagents for the new frontier.
- Repeat steps 4 through 6 until all tickets in the graph are complete.

### 7. Review, Polish, and Finalize

Once every ticket has been merged into the PR branch:
1. Run a full test suite and typecheck run on the PR branch.
2. Run `/code-review` across the full PR diff against both Coding Standards and Spec Requirements.
3. Fix any findings raised by the code review.
4. Mark the pull request as ready for human review.
5. Clean up any remaining worktrees or temporary branches.
