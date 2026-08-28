# Antigravity 2.0 Deep Alignment and Architectural Synergy

## Context

Following the initial port to Google Antigravity (AGY) in ADR 0003, repository distribution and skill execution had several shallow seams:
- The Antigravity plugin manifest in `.agents/plugins/agy-skills/plugin.json` was detached from the skill folders and rule files, preventing direct plugin ingestion.
- Subagent-orchestrating skills (`implement-spec`, `code-review`, `research`, `handoff`) used generic scripting patterns rather than native Antigravity subagent capabilities (`invoke_subagent`, `Workspace: "branch" | "share"`, `Model: "flash" | "pro"`).
- Invariant checking (prose rules, em-dash bans, git safety) placed a cognitive tax on model context rather than executing deterministically via Antigravity lifecycle hooks.
- Large reference catalogs (such as Fowler code smells) inflated skill instruction files upon activation.

## Decision

1. **Deep Plugin Adapter**: Structure `.agents/plugins/agy-skills/` as a complete Antigravity plugin bundle containing linked `skills/`, synced `rules/AGENTS.md`, and `hooks.json`. Update linking scripts (`scripts/link-skills.*`) to maintain both standalone discovery and plugin discovery.
2. **Native Subagent Orchestration**: Standardize subagent execution on Antigravity schemas:
   - `implement-spec`: Use native `invoke_subagent` with `Workspace: "branch"` or `"share"` and reactive wakeups.
   - `code-review`: Spawn parallel subagents via `invoke_subagent` with clean separation of concerns.
   - `research`: Dispatch lightweight subagents with `Model: "flash"`.
   - `handoff`: Consolidate session handoff documentation and immediate subagent handoffs behind a unified interface.
3. **Deterministic Lifecycle Hooks**: Introduce `.agents/hooks.json` with `PreToolUse` git safety guardrails, `PostToolUse` prose validation, and `Stop` invariant enforcement.
4. **Progressive Disclosure**: Extract bulky reference catalogs (e.g. Fowler code smells in `code-review`) into `references/` subdirectories to minimize context token usage.

## Invariants

- All source skills remain organized under bucket folders (`skills/engineering/`, `skills/productivity/`, etc.).
- No em-dashes are used anywhere in repo prose, documentation, code comments, or ADRs.
- Native Antigravity tools and reactive wakeup patterns are preferred over manual polling loops.

