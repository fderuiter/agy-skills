# agy-skills

A collection of agent skills (slash commands and behaviors) loaded by Google Antigravity (AGY), maintained by Fred de Ruiter. Forked from Matt Pocock's `mattpocock/skills`. Skills are organized into buckets and consumed by per-repo configuration emitted by `/setup-agy-skills`.

## Language

**Issue tracker**:
The tool that hosts a repo's issues: GitHub Issues, Linear, a local `.scratch/` markdown convention, or similar. Skills like `to-tickets`, `to-spec`, and `triage` read from and write to it.
_Avoid_: backlog manager, backlog backend, issue host

**Issue**:
A single tracked unit of work inside an **Issue tracker**: a bug, task, spec, or slice produced by `to-tickets`.
_Avoid_: ticket (use only when quoting external systems that call them tickets, or for a **Decision ticket**, see below)

**Decision ticket**:
A `wayfinder` unit: a child **Issue** of a `wayfinder:map` holding a *question* whose resolution is a decision, not a slice of a build to execute. The **decision** qualifier is what keeps it distinct from an implementation ticket; `wayfinder` introduces the term, then uses "ticket".

**Triage role**:
A canonical state-machine label applied to an **Issue** during triage (e.g. `needs-triage`, `ready-for-afk`). Each role maps to a real label string in the **Issue tracker** via `docs/agents/triage-labels.md`.

**Plugin package**:
A self-contained Antigravity distribution directory (`.agents/plugins/<name>/`) bundling `plugin.json`, `skills/`, `rules/AGENTS.md`, and optional `hooks.json` or `mcp_config.json`.

**Lifecycle hook**:
A deterministic script executed at agent loop boundaries (`PreToolUse`, `PostToolUse`, `PreInvocation`, `PostInvocation`, `Stop`) configured in `.agents/hooks.json`.

**Subagent topology**:
The structured hierarchy of subagents invoked via `invoke_subagent`, declaring role, model tier (`flash`, `pro`, `inherit`), and workspace isolation (`branch`, `share`, `inherit`).

**Progressive disclosure seam**:
The interface separating a lean `SKILL.md` procedural runbook from bulky reference catalogs placed in `references/`.

**Timer guard**:
A one-shot `schedule` timer bound to a specific subagent or task ID using `TimerCondition` to detect hangs or timeouts without manual polling loops.

**Domain-specialized worker**:
A dynamically defined subagent created via `define_subagent` tailored to a specific ticket boundary or architectural layer with custom system prompts and scoped tool permissions.

**Visual mockup artifact**:
An image artifact produced by `generate_image` or an interactive HTML/Mermaid component rendered via `generative_ui` for design validation.

**Upstream verification**:
The direct retrieval of third-party issues, changelogs, or schemas via `search_web` and `read_url_content` during diagnosis or configuration.

**M3 Design Token**:
A canonical design property key (such as color roles, shape corner radius, typography styles, and elevation levels) specified by Material Design 3 and exposed as CSS custom properties across documentation themes.

**Tonal Palette**:
A luminance-calibrated scale of thirteen tones (from tone 0 to tone 100) generated from a brand seed color, defining consistent light and dark color contrast pairings.

**Adaptive Navigation Shell**:
A responsive documentation layout shell implementing a Material Design 3 Top App Bar and collapsible Navigation Drawer across mobile, tablet, and desktop viewports.

**Surface Tint Container**:
An elevated or outlined card container using Material Design 3 surface tonal color roles (`surface-container-lowest` through `highest`) to establish visual hierarchy without heavy borders.

**Interactive Mermaid Renderer**:
A client-side diagram renderer integrated into the documentation site layout that renders flowchart and sequence syntax dynamically with Material Design 3 light and dark theme awareness.

**Skill Classification Badge**:
A visual metadata chip displayed on documentation pages, search items, and README listings denoting whether a skill is User-invoked or Model-invoked.

**Pre-commit Integrity Gate**:
A local git lifecycle check running automated test scripts before commit creation to prevent rule regressions, invalid front matter, or em-dash violations from entering version control.

**On-Page Table of Contents**:
A dynamic, client-side outline extracted from document heading hierarchies (h2, h3) that provides one-click smooth scrolling, active section tracking, and responsive collapsible navigation.

**Scroll Reading Progress Bar**:
A slim top-anchored indicator visualizing document reading progression across viewport scroll states with Material Design 3 primary container styling.

**Heading Anchor Link**:
An interactive hover target alongside article section headings generating shareable fragment URLs with one-click clipboard copying.

**Link and Anchor Integrity Gate**:
An automated validation script (`check-links.mjs`) ensuring that all relative markdown links, asset paths, and heading fragment hashes resolve to valid destinations across repository files.

**Terminology Enforcement Linter**:
An automated validation script (`check-terminology.mjs`) scanning markdown documentation and skill prose to prevent the reintroduction of forbidden or ambiguous domain terms.

**Inter-agent Protocol**:
A standardized message passing contract between orchestrator agents and subagents using **Structured Envelopes** over `send_message`.
_Avoid_: ad-hoc message formatting, raw text pinging

**Shared Worktree Workspace**:
An Antigravity subagent workspace mode (`Workspace: "share"`) that shares the parent repository directory without disk duplication, enabling concurrent branchless editing across disjoint subpaths.
_Avoid_: shared disk hack, symlinked workspace

**Headless SDK Evals**:
An automated testing and benchmarking suite built on the `google-antigravity` Python SDK (`pytest`) that evaluates skill trajectories, tool call sequences, and lifecycle hooks against test fixtures.
_Avoid_: manual skill testing, unverified prompt tuning

**Context Hygiene Hook**:
A deterministic `PreInvocation` lifecycle hook in `.agents/hooks.json` that validates workspace invariants, monitors context constraints, and cleans up transient state before model execution.
_Avoid_: pre-prompt cleanup script

**Structured Envelope**:
A typed JSON payload (`type`, `taskId`, `status`, `payload`, `nextAction`) fenced in markdown code blocks used within the **Inter-agent Protocol** for machine-parsable agent coordination.
_Avoid_: json blob message

**Dynamic Worker Mesh**:
A runtime coordination pattern combining dynamically defined subagents (`define_subagent`), **Shared Worktree Workspaces**, and **Structured Envelopes** for concurrent execution across a task graph.

**Skill Configuration File**:
The central configuration file (`skills.config.json`) defining repository metadata, router skill identity, bucket promotion rules, local overlay directories, and issue tracker preferences.
_Avoid_: settings json, app config

**Skill Scaffolder**:
A deterministic CLI generator (`scripts/new-skill.mjs`) and interactive agent skill (`/new-skill`) for creating, documenting, and auto-wiring new skills.
_Avoid_: skill maker, skill boilerplate generator

**Local Skill Overlay**:
An isolated directory (`skills/custom/` or configured overlay path) for private or experimental skills that link into local Antigravity environments without polluting upstream git tracking.
_Avoid_: private skills hack, untracked folder

**Trigger Conflict Detector**:
An automated static validation check within `check-skills.mjs` verifying that skill descriptions and activation verbs do not overlap ambiguously.
_Avoid_: prompt collision linter

**Skill Eval Template**:
A standardized test fixture template for verifying skill trajectory and prompt activations under `google-antigravity` SDK evals.

## Relationships

- An **Issue tracker** holds many **Issues**
- An **Issue** carries one **Triage role** at a time
- A **Decision ticket** is an **Issue** (a child of a `wayfinder:map`)
- A **Plugin package** bundles many **Skills**, a consolidated rule file, and optional **Lifecycle hooks**
- A **Subagent topology** isolates work across **Workspace** modes with reactive notifications
- A **Domain-specialized worker** executes a scoped ticket within a **Subagent topology**
- A **Timer guard** supervises long-running subagent tasks or test bisections without polling loops
- An **Upstream verification** grounds diagnosis and configuration against live primary documentation
- A **Visual mockup artifact** validates user interface variants before implementation
- An **Adaptive Navigation Shell** arranges documentation pages and dictionary terms using **M3 Design Tokens**
- A **Surface Tint Container** structures markdown sections and code blocks using dynamic **Tonal Palettes**
- An **Interactive Mermaid Renderer** visualizes workflow and architectural diagrams with dynamic theme integration
- A **Skill Classification Badge** categorizes skill invocability across documentation and search interfaces
- A **Pre-commit Integrity Gate** enforces test and formatting invariants at commit time
- An **On-Page Table of Contents** indexes article headings and synchronizes with **Heading Anchor Links**
- A **Scroll Reading Progress Bar** tracks reading position across **Adaptive Navigation Shell** viewports
- A **Link and Anchor Integrity Gate** validates markdown references within the **Pre-commit Integrity Gate**
- A **Terminology Enforcement Linter** ensures repo-wide adherence to **Language** standards
- An **Inter-agent Protocol** uses **Structured Envelopes** to coordinate a **Dynamic Worker Mesh**
- A **Dynamic Worker Mesh** executes across **Shared Worktree Workspaces**
- **Headless SDK Evals** verify skill trajectories and **Lifecycle hooks**
- A **Context Hygiene Hook** executes before model invocations within Antigravity
- A **Skill Configuration File** configures repository branding, router names, and bucket promotion rules
- A **Skill Scaffolder** generates skills, documentation, and **Skill Eval Templates** validated by a **Trigger Conflict Detector**
- A **Local Skill Overlay** links private skills into Antigravity alongside tracked bucket skills

## Flagged ambiguities

- "backlog" was previously used to mean both the *tool* hosting issues and the *body of work* inside it. Resolved: the tool is the **Issue tracker**; "backlog" is no longer used as a domain term.
- "backlog backend" / "backlog manager". Resolved: collapsed into **Issue tracker**.


