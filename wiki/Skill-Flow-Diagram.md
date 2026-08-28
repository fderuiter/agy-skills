# Skill Flow Diagrams

This page provides visual Mermaid flowcharts mapping how the skills in `agy-skills` relate to each other, how work moves from an initial idea to production, and where on-ramps and standalone utilities fit in.

---

## 1. The Main Flow: Idea to Ship

The main flow represents the primary path taken by new features, architectural refactors, and planned enhancements.

```mermaid
flowchart TD
    Start(["New Idea / Feature Requirement"]) --> Grill["/grill-with-docs\n(Interview, CONTEXT.md, ADRs)"]
    
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

### Main Flow Steps

1. **Ideation & Grilling (`/grill-with-docs`)**: The agent conducts an in-depth interview to explore assumptions, establish domain definitions in `CONTEXT.md`, and record architectural decisions in ADRs.
2. **Prototype Detour (`/prototype`)**: If a design choice requires concrete validation (UI aesthetics, state transition nuance, API ergonomics), work hands off (`/handoff`) to a temporary prototype branch and returns once verified.
3. **Specification & Ticketing (`/to-spec`, `/to-tickets`)**: Larger efforts are formalized into a spec and broken down into tracer-bullet tickets with explicit blocking relationships.
4. **Execution (`/implement` or `/implement-spec`)**: Implementation proceeds test-first using `/tdd`, building vertical slices one at a time.
5. **Review & Verification (`/code-review`)**: The diff is evaluated across two axes (adherence to coding standards and adherence to specification) before final commit.

---

## 2. On-Ramps onto the Main Flow

On-ramps represent external entry points (bugs, triage queues, or large ambiguous initiatives) that structure work before merging into the main flow.

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

### On-Ramp Summaries

- **`/triage`**: Ingests unstructured external tickets or bug reports, applies triage roles, and produces structured, agent-ready tickets.
- **`/diagnosing-bugs`**: Enforces a strict feedback loop (one command reproducing the defect) and requires a failing regression test before applying any fix.
- **`/wayfinder`**: Navigates high-ambiguity projects by creating and iteratively resolving decision tickets, producing a clear strategic path ready for `/to-spec`.

---

## 3. Codebase Upkeep & Architecture Health

Continuous improvement workflows ensure the codebase remains clean, well-architected, and easy for AI agents to navigate.

```mermaid
flowchart TD
    TriggerArch(["Periodic Upkeep / Refactoring"]) --> ImproveArch["/improve-codebase-architecture\n(Scan for shallow modules and missing seams)"]
    ImproveArch --> Candidates["Deepening Opportunities"]
    Candidates --> CodebaseDesign["/codebase-design\n(Apply deep-module vocabulary and seam patterns)"]
    CodebaseDesign --> MainFlow["Feed into /grill-with-docs"]

    TriggerRetro(["Session Complete / Milestone"]) --> Retro["/retro\n(Analyze conversation transcripts)"]
    Retro --> AuditResults["Audit Transcripts across 7 Categories"]
    AuditResults --> EnvUpdates["Update AGENTS.md, Rules,\nAutomated Checks, & Navigation"]
```

### Upkeep Summaries

- **`/improve-codebase-architecture`**: Scans the codebase to detect shallow modules, leaky abstractions, or missing seams, generating high-leverage refactoring opportunities.
- **`/retro`**: Analyzes agent session transcripts to extract systemic environment improvements across 7 categories, refining project rules, automated checks, and AGENTS.md instructions.

---

## 4. Writing and Thought Shaping

Productivity workflows designed for authoring prose, technical documentation, and long-form articles.

```mermaid
flowchart LR
    RawThoughts["Raw Unstructured Thoughts / Voice Memos"] --> WriteFrag["/writing-fragments\n(Mine raw notes into single quarry file)"]
    WriteFrag --> Quarry["Structured Quarry File"]
    
    Quarry --> WriteShape["/writing-shape\n(Shape article block by block,\ndebate format choices)"]
    WriteShape --> Draft["Structured Draft"]
    
    Draft --> WriteBeats["/writing-beats\n(Assemble narrative journey of beats,\nground concepts before leaning on them)"]
    WriteBeats --> FinalProse(["Finished Article / Doc"])
```

---

## 5. Standalone Skills Matrix

Skills that operate independently of the main feature flow:

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
    end
```

| Skill | Invocation | Primary Use Case |
| :--- | :--- | :--- |
| **`/grill-me`** | User | Relentless interview without requiring a git repository or local working directory. |
| **`/grilling`** | Model | The underlying interview engine driving `/grill-me`, `/grill-with-docs`, and `/wayfinder`. |
| **`/resolving-merge-conflicts`** | User | Resolves in-progress git conflicts by tracing original intent rather than blindly selecting lines. |
| **`/research`** | Model | Spawns a background agent to investigate questions against primary documentation sources. |
| **`/to-questionnaire`** | User | Gathers missing information from external human stakeholders via structured questions. |
| **`/wizard`** | User | Generates interactive scripts to guide humans through manual setup and credential provisioning. |
| **`/wait-what`** | User | Corrects misunderstandings mid-conversation by re-pitching ideas using established domain terms. |
| **`/teach`** | User | Stateful multi-session learning workspace for mastering technical concepts. |
| **`/writing-for-agents`** | Model | Reference for authoring predictable documents agents consume (skills, AGENTS.md, docs). |
| **`/setup-agy-skills`** | User | Pre-configures tracker settings and triage labels before starting engineering workflows. |
| **`/setup-mcp`** | User | Configures and validates Model Context Protocol servers in local or global configs. |
| **`/setup-ts-deep-modules`** | User | Wires dependency-cruiser into a TypeScript repo to enforce deep module boundaries. |

