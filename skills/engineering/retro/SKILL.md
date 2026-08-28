---
name: retro
description: "Analyze past Antigravity session transcripts (transcript.jsonl) to identify friction and extract systemic environment improvements: navigation pointers, automated checks, review coding standards, AGENTS.md economy, tool economy, no-op rule elimination, and information access. Use when the user runs /retro, asks for a retrospective on a session, or wants to improve agent steering and tooling based on session logs."
---

# Retrospective

A structured discipline for analyzing Antigravity session logs to extract **systemic environment improvements**.

When an agent struggles, the instinct is often to fix the immediate code or paste an angry reminder into `AGENTS.md`. This skill does the opposite: it analyzes the session's primary source (`transcript.jsonl`), diagnoses the root cause of friction, and updates the environment (linters, navigation pointers, review standards, tool efficiency, or log visibility) so future sessions run faster and cleaner.

Retrospectives can be run on demand via `/retro` or scheduled as a recurring background review using `schedule` (e.g. `CronExpression: "0 17 * * 5"`, `Prompt: "Analyze weekly session transcripts for environment friction"`, `IsDaemon: true`).

## Process

### 1. Pin the Target Session and Load Transcripts

Identify the session to analyze:

1. If the user specifies a conversation ID, path, or past session, target that session.
2. If unspecified, default to the current active session.
3. Locate the session transcript:
   - Primary transcript: `<appDataDir>/brain/<conversation-id>/.system_generated/logs/transcript.jsonl`.
   - Truncated details: inspect `transcript_full.jsonl` at the same location for specific lines where large tool outputs or thinking traces were truncated.
   - Subagent transcripts: scan for `invoke_subagent` calls in `transcript.jsonl` and locate child transcript logs under their respective conversation IDs.

Read `transcript.jsonl` to build a chronological timeline of steps, tool calls, and user interactions.

### 2. Audit Friction Signals in the Transcript

Scan the transcript for concrete signals of friction:

- **Exploration loops**: multiple consecutive search tool calls (`find_by_name`, `list_dir`, `grep_search`) wandering through directories before finding the relevant file.
- **Deterministic mistakes**: syntax errors, type mismatches, missing imports, or failing unit tests that the agent spent multiple turns fixing or that required user intervention.
- **Convention breaches**: code changes that violated repo architectural boundaries, naming conventions, or style rules.
- **Steering friction**: user prompts repeating instructions that were already supposed to be in `AGENTS.md`, or rules in steering files that the agent ignored.
- **Context bloat and tool churn**: large tool outputs (thousands of lines of logs, uncapped search dumps, full file reads where slices sufficed) consuming significant context window tokens.
- **Information blindness**: failed debugging attempts caused by missing dev server logs, silent subprocess errors, or lack of read-only access to state.

### 3. Evaluate Across the 7 Categories

Classify every identified friction point into one of seven structured categories:

1. **Navigation pointers**:
   - *Signal*: The agent spent multiple turns locating files, understanding module relationships, or discovering entry points.
   - *Fix*: Add a compact navigation pointer in `AGENTS.md` or a module index file pointing directly to key entry points and architecture docs.
2. **Automated checks (lint/test/fs-linters)**:
   - *Signal*: The agent made mistakes (type errors, formatting errors, illegal module imports, broken contract tests) that a machine tool could catch instantly.
   - *Fix*: Add or tune an automated check (linter rule, TypeScript config, pre-commit hook, filesystem linter like `dependency-cruiser`). Deterministic automated checks are always superior to prompt instructions.
3. **Coding standards (review agent rules)**:
   - *Signal*: Subtle architectural or design conventions were missed during implementation.
   - *Fix*: Add or refine a rule in `CODING_STANDARDS.md` or review docs. Route this rule to the **Review Agent** (during `/code-review`), not the Implementation Agent.
4. **AGENTS.md economy (slimming down steering rules)**:
   - *Signal*: `AGENTS.md` (repo-level or global) is long and crowded with rules that spend context tokens on every turn.
   - *Fix*: Prune `AGENTS.md`. Move detailed reference material behind context pointers, push coding conventions to `CODING_STANDARDS.md`, and replace prose rules with automated linters.
5. **Tool economy (token efficiency of CLI / MCP tool calls)**:
   - *Signal*: Tool executions flooded the context window with massive stdout outputs, unpaginated data, or repetitive queries.
   - *Fix*: Add filter flags, create helper scripts with compact summaries, paginate logs, or refine MCP server response schemas.
6. **No-op rule elimination**:
   - *Signal*: Steering files contain verbose instructions that the pretrained model already follows by default, or vague guidelines ("write clean code", "be thorough") that do not alter behavior.
   - *Fix*: Delete no-op lines entirely. Use the no-op test: if removing the sentence does not change model behavior, delete it.
7. **Information access (server logs, debug visibility)**:
   - *Signal*: The agent guessed at runtime state, missed background error outputs, or lacked visibility into dev server logs.
   - *Fix*: Configure log teeing to files, expose read-only health endpoints, or create diagnostic scripts that capture runtime state.

### 4. Apply Implementation vs Review Agent Context Pressure

When deciding where to place a fix, respect the context pressure asymmetry:

- **Implementation Agent**: Operates under **high context pressure**. Its context window fills rapidly with code exploration, file edits, bash outputs, and debugging traces. Never bloat its always-loaded instructions (`AGENTS.md`) with long checklists or style manuals. Keep `AGENTS.md` strictly limited to navigation pointers, essential tool aliases, and critical operational boundaries.
- **Review Agent**: Operates under **low context pressure**. It starts fresh, reading only the diff, commit log, and spec. It does not explore or debug. It has ample capacity to evaluate exhaustive rules in `CODING_STANDARDS.md`.

Rule of thumb:
- If a machine can check it: **Automated check** (Linter / Type checker / Test).
- If it requires nuanced code inspection: **Review Agent standard** (`CODING_STANDARDS.md`).
- If it helps find where code lives: **Navigation pointer** (`AGENTS.md` / `CONTEXT.md`).
- If it states obvious defaults: **Delete it** (No-op elimination).

### 5. Structure and Rank Recommendations

Present findings ordered by return on investment (highest severity and highest leverage first).

For each recommendation, provide:

1. **Category**: One of the 7 evaluation categories.
2. **Evidence**: Cite the exact step index, tool invocation, or error message from `transcript.jsonl`.
3. **Diagnosis**: Why the friction occurred and why existing mechanisms failed.
4. **Proposed Patch**: Concrete, ready-to-apply diffs for `AGENTS.md`, `CODING_STANDARDS.md`, package scripts, linter configs, or helper scripts.

### 6. Collaborate and Apply

1. Review the proposed patches with the user.
2. Apply approved changes to the workspace.
3. If new rules or scripts were introduced, verify that they pass locally and do not create duplicate or conflicting guidance.

## Reference: Heuristics and Examples

### The Two Loads

Every environment modification spends one of two budgets:

- **Context load**: The cost of always-loaded tokens in the agent's context window on every turn (`AGENTS.md`, active rules, system prompts). High context load degrades attention and reasoning on complex tasks.
- **Cognitive load**: The mental effort required by the human to remember which tools, scripts, and skills exist.

Aim to minimize context load by converting always-loaded prose into deterministic automated checks, disclosed reference docs, or review-time rules.

### Good vs Bad Environment Fixes

| Problem Observed in Transcript | Bad Fix (Prompt Bloat) | Good Fix (Systemic Environment Improvement) |
| --- | --- | --- |
| Agent imported an internal module from another package | Add "Do not import internal modules from other packages" to `AGENTS.md` | Add a `dependency-cruiser` or ESLint boundary rule that fails the build |
| Agent spent 6 tool calls searching for where auth handlers live | Add a 50-line description of the auth system to `AGENTS.md` | Add one navigation pointer line in `AGENTS.md`: `Auth handlers: see src/auth/index.ts` |
| Agent used `any` in TypeScript files despite repo conventions | Paste a long lecture about TypeScript strictness in `AGENTS.md` | Enable `@typescript-eslint/no-explicit-any` in linter config and add rule to `CODING_STANDARDS.md` |
| Agent ran `npm test` and flooded context with 5,000 lines of passing logs | Tell agent in chat prompt to "run tests quietly" | Add a test script `"test:summary": "vitest run --reporter=basic"` to `package.json` |
| Dev server crashed in background and agent could not see why | Tell agent to keep guessing why the server is not responding | Tee background dev server logs to `.logs/dev-server.log` so the agent can view it |
