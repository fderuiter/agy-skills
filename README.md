# agy-skills: Production-Grade Agent Skills for Google Antigravity

[![Deploy Documentation](https://github.com/fderuiter/agy-skills/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/fderuiter/agy-skills/actions/workflows/deploy-docs.yml)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://fderuiter.github.io/agy-skills/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Antigravity Compatible](https://img.shields.io/badge/Agent-Google%20Antigravity-orange)](https://github.com/fderuiter/agy-skills)

Curated, low-cognitive-load agent skills and workflows tailored for **Google Antigravity (AGY)**, maintained by Fred de Ruiter.

Forked from [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock.

Developing real applications with AI coding agents is challenging. Approaches like GSD, BMAD, and Spec-Kit try to help by rigidly owning the process, but in doing so they reduce your control and make debugging difficult.

These skills are small, composable, and easy to adapt. They integrate cleanly with Antigravity and are grounded in decades of software engineering discipline.

---

## Installation

Antigravity discovers skills in your project workspace or global configuration directory.

### Method 1: Per-Repo via `skills.json` (Recommended)

Add `.agents/skills.json` to the root of your target repository:

```json
{
  "entries": [
    {
      "path": "path/to/agy-skills/skills"
    }
  ]
}
```

### Method 2: Global Installation

Link or copy the `skills/` folder into your global Antigravity configuration directory:

- **Windows**: `%USERPROFILE%\.gemini\config\skills\`
- **macOS / Linux**: `~/.gemini/config/skills/`

For developers maintaining this repository, run:
```bash
npm run link
```
(Or use `scripts/link-skills.ps1` on Windows / `scripts/link-skills.sh` on macOS/Linux).

### Method 3: Direct Workspace Copy

Copy any individual skill folder from `skills/` into your project's `.agents/skills/` directory.

---

## Getting Started

In your Antigravity session, run once per repository:

```
/setup-agy-skills
```

It will:
- Ask which issue tracker you use (GitHub, GitLab, or local markdown files)
- Configure triage label vocabulary (/triage uses labels)
- Configure where domain documentation (CONTEXT.md and ADRs) is saved

---

## Why These Skills Exist

These skills solve common failure modes when building software with AI coding agents:

### #1: The Agent Didn't Do What I Want
The communication gap between human intent and code execution is solved by **grilling**:
- [`/grill-me`](./skills/productivity/grill-me/SKILL.md): Stateless interview for plans and non-code tasks
- [`/grill-with-docs`](./skills/engineering/grill-with-docs/SKILL.md): Stateful interview that records decisions into `CONTEXT.md` and ADRs

### #2: The Agent Is Way Too Verbose
Ubiquitous language reduces context token consumption and clarifies intent. `CONTEXT.md` gives the agent domain-specific shorthand.

### #3: The Code Doesn't Work
Feedback loops ensure correctness:
- [`/tdd`](./skills/engineering/tdd/SKILL.md): Red-green-refactor loop
- [`/diagnosing-bugs`](./skills/engineering/diagnosing-bugs/SKILL.md): Disciplined root-cause isolation and regression testing

### #4: We Built A Ball Of Mud
Caring about system design:
- [`/to-spec`](./skills/engineering/to-spec/SKILL.md): Creates comprehensive specs from conversation
- [`/to-tickets`](./skills/engineering/to-tickets/SKILL.md): Breaks specs into vertical tracer-bullet slices with blocking edges
- [`/improve-codebase-architecture`](./skills/engineering/improve-codebase-architecture/SKILL.md): Surveys the codebase for deep-module opportunities

---

## Reference

Skills split into **User-invoked** (orchestration commands you trigger) and **Model-invoked** (disciplines the agent calls on-demand).

### Engineering

Daily code workflows.

**User-invoked**
- **[ask-fred](./skills/engineering/ask-fred/SKILL.md)**: Router over the skills in this repository.
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**: Grilling session that builds your domain model in CONTEXT.md and ADRs.
- **[triage](./skills/engineering/triage/SKILL.md)**: Move issues through a state machine of triage roles.
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)**: Scan codebase for deepening opportunities.
- **[setup-agy-skills](./skills/engineering/setup-agy-skills/SKILL.md)**: Configure a repo for the engineering skills.
- **[setup-mcp](./skills/engineering/setup-mcp/SKILL.md)**: Configure Model Context Protocol (MCP) servers with schema validation.
- **[setup-ts-deep-modules](./skills/engineering/setup-ts-deep-modules/SKILL.md)**: Enforce deep module boundaries with dependency-cruiser.
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**: Turn conversation into a spec and publish to issue tracker.
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**: Break specs/plans into tracer-bullet tickets with blocking edges.
- **[implement](./skills/engineering/implement/SKILL.md)**: Build work described by spec/tickets test-first and review before committing.
- **[implement-spec](./skills/engineering/implement-spec/SKILL.md)**: Orchestrate concurrent subagents to implement a full specification across its ticket task graph.
- **[wayfinder](./skills/engineering/wayfinder/SKILL.md)**: Chart and resolve large efforts as decision tickets.
- **[retro](./skills/engineering/retro/SKILL.md)**: Analyze session transcripts to extract systemic environment improvements.

**Model-invoked**
- **[prototype](./skills/engineering/prototype/SKILL.md)**: Build throwaway prototypes to answer design questions.
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**: Feedback-loop driven debugging.
- **[research](./skills/engineering/research/SKILL.md)**: Investigate questions against primary sources via background agent.
- **[tdd](./skills/engineering/tdd/SKILL.md)**: Test-driven development with red-green-refactor loop.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**: Build and maintain project domain model and ADRs.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**: Deep module and clean seam design discipline.
- **[code-review](./skills/engineering/code-review/SKILL.md)**: Two-axis review (Standards + Spec) of diffs.
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)**: Intent-traced git conflict resolution.
- **[wizard](./skills/engineering/wizard/SKILL.md)**: Interactive wizard script for human-only operational steps.

### Productivity

General workflow and alignment tools.

**User-invoked**
- **[grill-me](./skills/productivity/grill-me/SKILL.md)**: Relentless interview to resolve design decisions.
- **[handoff](./skills/productivity/handoff/SKILL.md)**: Compact conversation into handoff document for another session/agent.
- **[teach](./skills/productivity/teach/SKILL.md)**: Stateful multi-session learning workspace.
- **[to-questionnaire](./skills/productivity/to-questionnaire/SKILL.md)**: Turn decisions into questionnaires for external stakeholders.
- **[wait-what](./skills/productivity/wait-what/SKILL.md)**: Clarify and re-pitch misunderstood agent responses.
- **[writing-beats](./skills/productivity/writing-beats/SKILL.md)**: Assemble raw material into a narrative journey of beats.
- **[writing-fragments](./skills/productivity/writing-fragments/SKILL.md)**: Mine raw writing fragments into a single quarry file.
- **[writing-shape](./skills/productivity/writing-shape/SKILL.md)**: Shape raw material into an article paragraph by paragraph.

**Model-invoked**
- **[grilling](./skills/productivity/grilling/SKILL.md)**: Reusable interview primitive.
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)**: Discipline for authoring agent-readable documents.

---

## Documentation & Wiki

- **Documentation Site**: [https://fderuiter.github.io/agy-skills/](https://fderuiter.github.io/agy-skills/)
- **GitHub Wiki**: [https://github.com/fderuiter/agy-skills/wiki](https://github.com/fderuiter/agy-skills/wiki)