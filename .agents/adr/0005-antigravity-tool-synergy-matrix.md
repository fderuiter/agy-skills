# ADR 0005: Antigravity Tool Synergy Matrix

## Context

Following the adoption of native Antigravity subagents in ADR 0004, the wider Antigravity platform tool surface offers rich capabilities that were underutilized across `agy-skills`:
- Background execution: `schedule` (one-shot conditional timers and recurring crons) and `manage_task` were rarely integrated into long-running workflows.
- Visual artifact rendering: `generate_image` and `generative_ui` (interactive HTML artifacts, Mermaid diagrams, KaTeX, and carousels) were siloed rather than systematically applied during UI prototyping, architecture reviews, and code reviews.
- Dynamic subagent topologies: `define_subagent` and `send_message` were not formalized for creating domain-specialized workers scoped to specific architectural layers or ticket boundaries.
- External grounding: `search_web` and `read_url_content` were confined to generic research rather than explicitly embedded in debugging, MCP setup, and boundary enforcement.
- Deterministic hooks: `.agents/hooks.json` needed formal scaffolding and distribution support across client workspaces via `setup-agy-skills`.

## Decision

We establish a canonical Antigravity Tool Synergy Matrix across the repository:

1. **Targeted Background Orchestration (`schedule`, `manage_task`)**:
   - `implement-spec`: Use one-shot timers with `TimerCondition: "<subagent-id>"` as timer guards to catch stalls or excessive runtimes without active polling loops.
   - `diagnosing-bugs`: Attach timer guards to lengthy bisection runs, stress repro loops, and flaky test repetitions.
   - `triage` and `retro`: Recommend recurring cron expressions (`CronExpression`) for periodic sweeps of new issues, stale responses, and sprint retrospective analysis.

2. **Multi-Modal Design and Review Pipeline (`generate_image`, `generative_ui`)**:
   - `prototype/UI.md`: Incorporate `generate_image` for visual screen layouts and mockup exploration prior to or alongside code variant synthesis.
   - `improve-codebase-architecture`: Render interactive HTML visual reports and side-by-side Mermaid diagrams illustrating shallow versus deep module transformations.
   - `code-review`: Structure findings with comparative diff carousels and visual standards checklists.
   - `wayfinder` and `domain-modeling`: Standardize entity maps and decision graphs on Mermaid diagrams.

3. **Domain-Specialized Subagent Mesh (`define_subagent`, `send_message`, `manage_subagents`)**:
   - `implement-spec`: Use `define_subagent` to declare role-tailored workers (e.g. database worker, API worker, frontend worker) with minimal system prompts and precise tool permission boundaries (`enable_write_tools`, `enable_subagent_tools`).
   - Communicate between orchestrator and active subagents via `send_message` for status checkpoints, relying on reactive wakeups rather than polling.

4. **Integrated Upstream Verification (`search_web`, `read_url_content`)**:
   - `diagnosing-bugs`: Integrate upstream issue and changelog verification during hypothesis generation.
   - `setup-mcp`: Query live package registries, configuration schemas, and repository documentation for external MCP servers.
   - `setup-ts-deep-modules`: Verify latest `dependency-cruiser` schema options and TypeScript compiler compatibility.

5. **Standardized Lifecycle Hooks (`.agents/hooks.json`)**:
   - Codify `PreToolUse` git-safety guardrails and `PostToolUse`/`Stop` prose invariant checks.
   - Expand `setup-agy-skills` to scaffold `.agents/hooks.json` and matching hook scripts into downstream repositories.

## Invariants

- No em-dashes in any repo prose, documentation, code comments, or ADRs.
- Skills communicate via context pointers rather than copying large contexts.
- Reactive wakeup patterns must always be preferred over manual polling loops.
- `CONTEXT.md` remains strictly a glossary devoid of implementation details.

