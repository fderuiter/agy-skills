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

## Flagged ambiguities

- "backlog" was previously used to mean both the *tool* hosting issues and the *body of work* inside it. Resolved: the tool is the **Issue tracker**; "backlog" is no longer used as a domain term.
- "backlog backend" / "backlog manager". Resolved: collapsed into **Issue tracker**.
