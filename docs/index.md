---
title: "agy-skills Documentation | Agent Skills for Google Antigravity"
description: "Comprehensive documentation and guides for agy-skills: production-grade agent skills, workflows, and prompts for Google Antigravity and Claude Code."
keywords: ["antigravity skills", "agent skills", "google antigravity", "ai coding workflows", "claude code plugins"]
permalink: /
---

# agy-skills Documentation

Welcome to the documentation for **agy-skills**, agent skills for Google Antigravity (AGY) maintained by Fred de Ruiter.

Forked from [mattpocock/skills](https://github.com/mattpocock/skills).

---

## Engineering Skills

### User-invoked
- [ask-fred](./engineering/ask-fred.md): Router over the skills in this repository.
- [grill-with-docs](./engineering/grill-with-docs.md): Grilling session that builds your domain model in CONTEXT.md and ADRs.
- [triage](./engineering/triage.md): Move issues through a state machine of triage roles.
- [improve-codebase-architecture](./engineering/improve-codebase-architecture.md): Scan codebase for deepening opportunities.
- [setup-agy-skills](./engineering/setup-agy-skills.md): Configure a repo for the engineering skills.
- [to-spec](./engineering/to-spec.md): Turn conversation into a spec and publish to issue tracker.
- [to-tickets](./engineering/to-tickets.md): Break specs/plans into tracer-bullet tickets with blocking edges.
- [implement](./engineering/implement.md): Build work described by spec/tickets test-first and review before committing.
- [implement-spec](./engineering/implement-spec.md): Orchestrate concurrent subagents to implement a full specification across its ticket task graph.
- [wayfinder](./engineering/wayfinder.md): Chart and resolve large efforts as decision tickets.

### Model-invoked
- [prototype](./engineering/prototype.md): Build throwaway prototypes to answer design questions.
- [diagnosing-bugs](./engineering/diagnosing-bugs.md): Feedback-loop driven debugging.
- [research](./engineering/research.md): Investigate questions against primary sources via background agent.
- [tdd](./engineering/tdd.md): Test-driven development with red-green-refactor loop.
- [domain-modeling](./engineering/domain-modeling.md): Build and maintain project domain model and ADRs.
- [codebase-design](./engineering/codebase-design.md): Deep module and clean seam design discipline.
- [code-review](./engineering/code-review.md): Two-axis review (Standards + Spec) of diffs.
- [resolving-merge-conflicts](./engineering/resolving-merge-conflicts.md): Intent-traced git conflict resolution.
- [wizard](./engineering/wizard.md): Interactive wizard script for human-only operational steps.

---

## Productivity Skills

### User-invoked
- [grill-me](./productivity/grill-me.md): Relentless interview to resolve design decisions.
- [handoff](./productivity/handoff.md): Compact conversation into handoff document for another session/agent.
- [teach](./productivity/teach.md): Stateful multi-session learning workspace.
- [to-questionnaire](./productivity/to-questionnaire.md): Turn decisions into questionnaires for external stakeholders.
- [wait-what](./productivity/wait-what.md): Clarify and re-pitch misunderstood agent responses.

### Model-invoked
- [grilling](./productivity/grilling.md): Reusable interview primitive.
- [writing-for-agents](./productivity/writing-for-agents.md): Discipline for authoring agent-readable documents.