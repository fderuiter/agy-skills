# ADR 0008: Antigravity Multi-Agent Swarms, Dynamic Worker Topologies, and SDK Evaluation Harness

## Context

Following the establishment of native Antigravity subagents (ADR 0004) and the tool synergy matrix (ADR 0005), several architectural frontiers remained across `agy-skills`:
- **Subagent Coordination**: Inter-agent communication relied on freeform natural language text, making programmatic status parsing and dependency advancement fragile during complex task execution.
- **Workspace Disk Bloat**: Subagents frequently cloned separate branch workspaces, creating substantial disk overhead for read-only or disjoint component tasks that could safely run inside shared worktrees (`Workspace: "share"`).
- **Lifecycle Hook Gaps**: `.agents/hooks.json` lacked `PreInvocation` context hygiene and automatic formatting/linting on file write tools, leaving repository invariants vulnerable to mid-session drift.
- **Automated Skill Evaluation**: Repository verification was restricted to static Node.js scripts, lacking automated behavioral tests that evaluate real agent trajectories and tool dispatch sequences in headless environments.

## Decision

We adopt a multi-layer deepening architecture across the repository:

1. **Dynamic Multi-Agent Swarm Topology (`define_subagent`, `Workspace: "share"`)**:
   - For complex tasks (`implement-spec`, `code-review`, `diagnosing-bugs`), orchestrators dynamically define specialized workers via `define_subagent` with tailored system instructions and scoped tool permissions (`enable_write_tools`, `enable_subagent_tools`).
   - Standardize on a **Scoped Worktree Strategy**: default to `Workspace: "share"` for read-only reviewers, diagnosers, and non-conflicting component implementations, falling back to `Workspace: "branch"` only for risky or full-tree mutating builds.

2. **Structured Envelope Inter-Agent Protocol**:
   - Standardize all agent-to-agent communication via `send_message` on a typed JSON payload envelope enclosed in markdown code blocks:
     ```json
     {
       "type": "task_assignment" | "status_update" | "checkpoint" | "blocker" | "review_finding" | "task_completion",
       "taskId": "ticket-101",
       "status": "in_progress" | "blocked" | "completed" | "passed" | "failed",
       "payload": { ... },
       "nextAction": "optional string description"
     }
     ```
   - This provides deterministic machine-parsable handshakes while remaining easily readable in human transcript logs.

3. **Comprehensive Lifecycle Hook Suite (`.agents/hooks.json`)**:
   - `PreInvocation`: Execute `hooks/pre-invocation-hygiene.js` to inspect workspace health, monitor context constraints, and enforce clean git states before model execution.
   - `PostToolUse`: Execute `hooks/post-tool-formatter.js` on `write_to_file` and `replace_file_content` to automatically run code formatters and check for prose invariants.
   - `PreToolUse`: Retain `hooks/block-dangerous-git.js` to block destructive git commands.
   - `Stop`: Retain `hooks/check-prose-invariants.js` to prevent uncommitted rule violations or em-dashes.

4. **Headless Python SDK Evaluation Harness (`tests/test_sdk_benchmarks.py`)**:
   - Introduce a programmatic testing suite built on `pytest` and `google-antigravity` (with mock-assisted agent runtime support) that evaluates multi-agent coordination, structured message validation, and lifecycle hook interception without unbounded API costs.

5. **Monolithic Plugin with Modular Configuration**:
   - Retain `.agents/plugins/agy-skills/` as the single canonical plugin bundle, supporting granular toggling through Antigravity's native `disabled` flags and `skills.json` configurations.

## Invariants

- Zero em-dashes across all skill runbooks, documentation, code comments, ADRs, and scripts.
- Reactive wakeup patterns must always be used instead of manual polling loops.
- `CONTEXT.md` remains strictly a glossary devoid of implementation details.
- All hook scripts must remain zero-dependency Node.js scripts.

