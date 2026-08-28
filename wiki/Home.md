# Welcome to the agy-skills Wiki

Welcome to the official wiki for **agy-skills**, a comprehensive collection of curated agent skills, workflows, and prompts designed specifically for **Google Antigravity (AGY)**, maintained by Fred de Ruiter.

Originally adapted from Matt Pocock's skills repository for Claude Code, this project has been restructured and optimized for Google Antigravity's native customization system, file discovery mechanics, and developer workflows.

---

## Overview

The goal of `agy-skills` is to provide structured, repeatable, high-leverage workflows for pair programming with AI coding agents. Rather than treating an AI coding assistant as an unpredictable chat interface, `agy-skills` provides formal procedural workflows for:

- **Ideation and discovery**: Relentless grilling interviews that draw out assumptions, sharpen domain glossaries, and record Architecture Decision Records (ADRs).
- **Specification and planning**: Converting fuzzy conversations into rigorous technical specifications and vertical tracer-bullet tickets with explicit blocking edges.
- **Test-driven execution**: Implementing features one verifiable slice at a time using strict red-green-refactor cycles and automated two-axis code reviews.
- **Triage and debugging**: Feedback-loop-driven bug diagnostics and multi-role issue queue triage.
- **Codebase health and design**: Identifying shallow modules, finding deepening opportunities, and conducting post-session retrospectives to optimize agent performance.

---

## Core Concepts

The architecture of `agy-skills` is built on four core principles:

1. **Progressive Disclosure**
   Skills and rules load metadata (names and descriptions) into the agent's context window up front. Full procedural instructions are loaded on demand only when relevant to the current task. This keeps token overhead low while maintaining broad capabilities.

2. **Vertical Tracer Bullets**
   Work is structured into narrow, end-to-end vertical slices that touch all necessary layers (schema, domain logic, API, UI, and tests) rather than horizontal architectural layers. Each slice produces a demoable, verifiable outcome.

3. **Deep Modules**
   Interfaces should be small, simple, and stable, concealing rich implementation logic behind clean seams. This maximises leverage for callers and locality for maintainers.

4. **Context Hygiene and Phase Boundaries**
   Frontier models reason with peak precision within an optimal token range known as the **smart zone** (~150k tokens). At every phase transition, agents evaluate explicit decision rules to determine whether to continue, clear, hand off, spawn a subagent, or compact context.

---

## Antigravity Integration

`agy-skills` integrates natively with Google Antigravity through multiple extension points:

- **Skills (`.agents/skills/` or `skills/`)**: Multi-step procedural playbooks activated by the user or model.
- **Plugins (`.agents/plugins/agy-skills/plugin.json`)**: Bundled packages registering capabilities across workspaces.
- **Rules (`AGENTS.md`, `GEMINI.md`)**: Hierarchical project instructions and invariants loaded automatically based on directory context.
- **Hooks (`.agents/hooks.json`)**: Automated scripts executed during agent lifecycle events (such as pre-tool or post-tool execution).
- **MCP Servers (`.agents/mcp_config.json`)**: External tool providers integrated via the Model Context Protocol.

For full setup instructions and configuration schemas, see [Antigravity Customizations](Antigravity-Customizations).

---

## Wiki Navigation & Sitemap

Explore the wiki guides:

- **[Architecture and Design](Architecture-and-Design)**
  Detailed guide to vertical tracer bullets, deep module design principles, context pressure management, the smart zone, and phase boundary decision trees.

- **[Antigravity Customizations](Antigravity-Customizations)**
  Comprehensive reference for configuring skills, plugins, rules, lifecycle hooks, and Model Context Protocol (MCP) servers in Google Antigravity.

- **[Skill Flow Diagram](Skill-Flow-Diagram)**
  Visual Mermaid flowcharts mapping the end-to-end Idea -> Ship path, on-ramps (triage, diagnosing bugs, wayfinder), codebase health workflows, and standalone tools.

---

## Skill Buckets

Skills in this repository are categorized into dedicated bucket directories:

- **`skills/engineering/`**: Daily software engineering skills covering planning, specs, tracer-bullet ticketing, TDD implementation, architecture review, and debugging.
- **`skills/productivity/`**: Non-code workflow skills covering interview grilling, session handoffs, structured teaching, writing shaping, and questionnaire generation.
- **`skills/misc/`**: Auxiliary utility skills kept for reference.
- **`skills/in-progress/`**: Beta skills currently under active evaluation.
- **`skills/deprecated/`**: Retired skills kept for historical reference.

---

## External Resources

- **GitHub Pages Documentation**: [https://fderuiter.github.io/agy-skills/](https://fderuiter.github.io/agy-skills/)
- **Repository Source**: [https://github.com/fderuiter/agy-skills](https://github.com/fderuiter/agy-skills)
- **Issue Tracker**: [https://github.com/fderuiter/agy-skills/issues](https://github.com/fderuiter/agy-skills/issues)
