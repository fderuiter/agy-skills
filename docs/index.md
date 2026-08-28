---
title: "agy-skills Documentation | Agent Skills for Google Antigravity"
description: "Comprehensive documentation and guides for agy-skills: production-grade agent skills, workflows, and prompts for Google Antigravity."
keywords: ["antigravity skills", "agent skills", "google antigravity", "ai coding workflows", "antigravity workflows"]
permalink: /
---

# agy-skills Documentation

Welcome to the documentation for **agy-skills**, agent skills for Google Antigravity (AGY) maintained by Fred de Ruiter.

[**Skills Index**](#engineering-skills) | [**Workflow Topology**](#workflow-topology) | [**AI Coding Dictionary**](https://fderuiter.github.io/agy-skills/dictionary/)

---

## AI Coding Dictionary

Explore the comprehensive [**AI Coding Dictionary**](https://fderuiter.github.io/agy-skills/dictionary/), the shared vocabulary for agentic software development, context management, prompt engineering, and tool execution.

- [**The Model**](https://fderuiter.github.io/agy-skills/dictionary/): Parameters, inference, effort, tokens, next-token prediction, harnesses.
- [**Sessions, Context Windows & Turns**](https://fderuiter.github.io/agy-skills/dictionary/): Context, window limits, stateful vs stateless execution, system prompts.
- [**Tools & Environment**](https://fderuiter.github.io/agy-skills/dictionary/): Tool calls, MCP servers, permissions, sandboxing.
- [**Failure Modes**](https://fderuiter.github.io/agy-skills/dictionary/): Sycophancy, hallucination, parametric knowledge, attention degradation, smart zone limits.
- [**Handoffs**](https://fderuiter.github.io/agy-skills/dictionary/): Clearing, handoffs, compaction, specs, tickets, primary vs secondary sources.
- [**Memory & Steering**](https://fderuiter.github.io/agy-skills/dictionary/): AGENTS.md, progressive disclosure, context pointers, skills, subagents.
- [**Patterns of Work**](https://fderuiter.github.io/agy-skills/dictionary/): Human-in-the-loop (HITL), AFK execution, automated checks, grilling, prototyping, vibe coding.

---

## Workflow Topology

### The Main Flow: Idea to Ship

The primary pipeline taken by new features, architectural refactors, and planned enhancements.

```mermaid
flowchart TD
    Start(["New Idea or Feature Requirement"]) --> Grill["/grill-with-docs\n(Interview, CONTEXT.md, ADRs)"]
    
    Grill --> PrototypeCheck{"Can every design\nquestion be settled\nin conversation?"}
    
    PrototypeCheck -- "No (Needs runnable validation)" --> HandoffOut["/handoff (Out)"]
    HandoffOut --> Proto["/prototype\n(Throwaway code on prototype/* branch)"]
    Proto --> HandoffIn["/handoff (Back)"]
    HandoffIn --> ScopeCheck
    
    PrototypeCheck -- "Yes" --> ScopeCheck{"Is this a multi-session\nor multi-ticket build?"}
    
    ScopeCheck -- "Yes" --> ToSpec["/to-spec\n(Create formal specification)"]
    ToSpec --> ToTickets["/to-tickets\n(Tracer bullets with blocking edges)"]
    
    ToTickets --> ExecChoice{"Execution Strategy"}
    ExecChoice -- "Concurrent Subagents" --> ImplementSpec["/implement-spec\n(Orchestrate subagents on branch)"]
    ExecChoice -- "Focused Sessions" --> ImplementTickets["/implement\n(One ticket per clean session)"]
    
    ScopeCheck -- "No" --> ImplementDirect["/implement\n(Same session implementation)"]
    
    ImplementSpec --> TDD["/tdd\n(Red-green-refactor slices)"]
    ImplementTickets --> TDD
    ImplementDirect --> TDD
    
    TDD --> CodeReview["/code-review\n(Two-axis review: Standards + Spec)"]
    CodeReview --> Ship(["Commit & Merge to Main"])
```

### On-Ramps onto the Main Flow

Structured entry points (bug triage, regressions, or massive greenfield initiatives) that prepare work before merging onto the main flow.

```mermaid
flowchart TD
    subgraph TriageQueue ["Incoming Issues & Requests"]
        RawIssues["Incoming Bug Reports / Requests"] --> Triage["/triage\n(Classify, assign roles, label)"]
        Triage --> AgentReady["Agent-Ready Tickets\n(ready-for-agent)"]
    end

    subgraph BugDiagnosis ["Difficult Regressions & Defects"]
        BugFound["Intermittent Flake or Complex Bug"] --> Diag["/diagnosing-bugs\n(Tight feedback loop & regression test)"]
        Diag --> DiagPostMortem["Post-Mortem Findings"]
    end

    subgraph Wayfinding ["Large / Ambiguous Greenfield Efforts"]
        FoggyIdea["Massive Greenfield Effort\n(Too big for single session)"] --> Wayfinder["/wayfinder\n(Chart decision map on tracker)"]
        Wayfinder --> DecisionTickets["Resolve Decision Tickets\n(Decisions, not deliverables)"]
        DecisionTickets --> ClearMap["Clear Strategic Map"]
    end

    AgentReady --> Implement["/implement (Main Flow)"]
    DiagPostMortem -- "Architectural Seam Missing" --> ImproveArch["/improve-codebase-architecture"]
    DiagPostMortem -- "Direct Bug Fix" --> CodeReview["/code-review (Main Flow)"]
    ClearMap --> ToSpec["/to-spec (Main Flow)"]
```

### Codebase Upkeep & Architecture Health

Continuous improvement loops that maintain codebase seams and tune agent instructions over time.

```mermaid
flowchart TD
    TriggerArch(["Periodic Upkeep or Refactoring"]) --> ImproveArch["/improve-codebase-architecture\n(Scan for shallow modules and missing seams)"]
    ImproveArch --> Candidates["Deepening Opportunities"]
    Candidates --> CodebaseDesign["/codebase-design\n(Apply deep-module vocabulary and seam patterns)"]
    CodebaseDesign --> MainFlow["Feed into /grill-with-docs"]

    TriggerRetro(["Session Complete or Milestone"]) --> Retro["/retro\n(Analyze conversation transcripts)"]
    Retro --> AuditResults["Audit Transcripts across 7 Categories"]
    AuditResults --> EnvUpdates["Update AGENTS.md, Rules,\nAutomated Checks, & Navigation"]
```

### Writing and Thought Shaping

Productivity workflows for mining raw fragments, shaping arguments paragraph by paragraph, and assembling narrative journeys.

```mermaid
flowchart LR
    RawThoughts["Raw Unstructured Thoughts or Voice Memos"] --> WriteFrag["/writing-fragments\n(Mine raw notes into single quarry file)"]
    WriteFrag --> Quarry["Structured Quarry File"]
    
    Quarry --> WriteShape["/writing-shape\n(Shape article block by block,\ndebate format choices)"]
    WriteShape --> Draft["Structured Draft"]
    
    Draft --> WriteBeats["/writing-beats\n(Assemble narrative journey of beats,\nground concepts before leaning on them)"]
    WriteBeats --> FinalProse(["Finished Article or Doc"])
```

### Standalone Utilities Matrix

```mermaid
flowchart TD
    subgraph StandaloneSkills ["Standalone Utilities"]
        GrillMe["/grill-me\n(Stateless interview outside a repository)"]
        Grilling["/grilling\n(Reusable core interview engine)"]
        Conflicts["/resolving-merge-conflicts\n(Intent-traced hunk resolution)"]
        Research["/research\n(Background research on primary sources)"]
        Questionnaire["/to-questionnaire\n(Asynchronous survey for stakeholders)"]
        Wizard["/wizard\n(Interactive script for human-only operational steps)"]
        WaitWhat["/wait-what\n(Mid-session re-explanation and vocabulary alignment)"]
        Teach["/teach\n(Multi-session learning workspace)"]
        WritingForAgents["/writing-for-agents\n(Reference for authoring agent documents)"]
    end

    subgraph EnvironmentSetup ["Environment & Preconditions"]
        SetupAgy["/setup-agy-skills\n(Configure issue tracker and labels)"]
        SetupMcp["/setup-mcp\n(Configure and verify MCP servers)"]
        SetupDeep["/setup-ts-deep-modules\n(Enforce deep module boundaries)"]
        SetupPyDeep["/setup-python-deep-modules\n(Enforce Python import-linter boundaries)"]
        NewSkill["/new-skill\n(Scaffold new skill & doc page)"]
    end
```

---

## Engineering Skills

### User-invoked
- [ask-fred](./engineering/ask-fred.md): Router over the skills in this repository.
- [grill-with-docs](./engineering/grill-with-docs.md): Grilling session that builds your domain model in CONTEXT.md and ADRs.
- [triage](./engineering/triage.md): Move issues through a state machine of triage roles.
- [improve-codebase-architecture](./engineering/improve-codebase-architecture.md): Scan codebase for deepening opportunities.
- [setup-agy-skills](./engineering/setup-agy-skills.md): Configure a repo for the engineering skills.
- [setup-mcp](./engineering/setup-mcp.md): Configure Model Context Protocol (MCP) servers in Google Antigravity.
- [setup-ts-deep-modules](./engineering/setup-ts-deep-modules.md): Enforce deep module boundaries with dependency-cruiser.
- [to-spec](./engineering/to-spec.md): Turn conversation into a spec and publish to issue tracker.
- [to-tickets](./engineering/to-tickets.md): Break specs/plans into tracer-bullet tickets with blocking edges.
- [implement](./engineering/implement.md): Build work described by spec/tickets test-first and review before committing.
- [implement-spec](./engineering/implement-spec.md): Orchestrate concurrent subagents to implement a full specification across its ticket task graph.
- [wayfinder](./engineering/wayfinder.md): Chart and resolve large efforts as decision tickets.
- [retro](./engineering/retro.md): Session retrospective and transcript audit for environment tuning.

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
- [writing-beats](./productivity/writing-beats.md): Assemble raw writing fragments into a narrative journey of beats.
- [writing-fragments](./productivity/writing-fragments.md): Mine raw heterogeneous writing fragments into a quarry document.
- [writing-shape](./productivity/writing-shape.md): Shape raw writing fragments into a structured article paragraph by paragraph.

### Model-invoked
- [grilling](./productivity/grilling.md): Reusable interview primitive.
- [writing-for-agents](./productivity/writing-for-agents.md): Discipline for authoring agent-readable documents.