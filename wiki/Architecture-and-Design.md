# Architecture and Design Philosophy

This document outlines the core architectural principles, software engineering disciplines, and agentic workflows that form the foundation of `agy-skills`.

---

## 1. Vertical Tracer Bullets

When planning and implementing features with AI coding agents, work is organized into **tracer-bullet vertical slices** rather than horizontal architectural layers.

```
Horizontal Layers (Avoid)         Vertical Tracer Bullets (Recommended)
┌───────────────────────────┐     ┌───────┬───────┬───────┐
│         UI Layer          │     │ Slice │ Slice │ Slice │
├───────────────────────────┤     │   1   │   2   │   3   │
│      API / Routes         │     │  (UI, │  (UI, │  (UI, │
├───────────────────────────┤     │  API, │  API, │  API, │
│     Business Logic        │     │ Logic,│ Logic,│ Logic,│
├───────────────────────────┤     │  DB,  │  DB,  │  DB,  │
│      Database / Schema    │     │ Tests)│ Tests)│ Tests)│
└───────────────────────────┘     └───────┴───────┴───────┘
```

### Why Vertical Slices?

Horizontal slicing (such as building all database models first, then all API endpoints, and finally the user interface) defers integration and verification to the very end of a project. When integration problems or design misunderstandings emerge, the entire horizontal foundation must be revised.

Vertical tracer bullets solve this by cutting a thin but complete path through every required layer:
- Schema and database migrations
- Domain modeling and business logic
- API contracts and controllers
- User interface and interactions
- Automated integration and unit tests

Each completed slice delivers end-to-end functionality that is independently verifiable, testable, and demonstrable.

### Sizing for Agent Context Windows

Every vertical slice must be sized to fit within a single fresh context window. A slice that is too large forces the agent into context compaction or degradation midway through the task. A properly sized slice enables an agent to:
1. Load relevant source files and documentation.
2. Formulate an implementation strategy.
3. Write and run tests test-first (TDD).
4. Implement the behavior cleanly.
5. Review the resulting diff before committing.

### Dependency Graph and Blocking Edges

When breaking a specification into tickets (via `/to-tickets`), each ticket explicitly declares its **blocking edges**: the specific predecessor tickets that must be completed before work on this ticket can begin.

```
       ┌──────────────┐
       │  Ticket 01   │
       │  Base Schema │
       └──────┬───────┘
              │
       ┌──────▼───────┐
       │  Ticket 02   │
       │ Core Engine  │
       └───┬──────┬───┘
           │      │
    ┌──────▼──┐ ┌─▼───────┐
    │Ticket 03│ │Ticket 04│
    │UI Route │ │API Export│
    └─────────┘ └─────────┘
```

Agents work the **frontier**: any ticket whose blocking dependencies are satisfied. Independent tickets on the frontier can be executed in parallel by concurrent subagents (via `/implement-spec`) or sequentially across clean sessions.

### Wide Refactors: The Expand-Contract Exception

A wide refactor (such as renaming a core database column or refactoring a ubiquitous type signature) has a blast radius spanning the entire codebase. A single edit would break hundreds of call sites simultaneously, making a standard vertical slice impractical.

Wide refactors are executed using the **expand-contract** pattern:

1. **Expand**: Introduce the new form alongside the existing form without modifying existing call sites. The entire test suite remains green.
2. **Migrate**: Transition call sites in small, isolated batches (grouped by module or directory), with each batch represented as a distinct ticket blocked by the expand step.
3. **Contract**: Remove the deprecated original form once all callers have migrated, represented as a final ticket blocked by all migration batches.

---

## 2. Deep Modules

Codebases that are productive for both human engineers and AI agents prioritize **deep modules** over shallow pass-through abstractions.

```
    Deep Module (High Leverage)            Shallow Module (Low Leverage)
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│     Small, Simple Interface     │     │     Large, Complex Interface    │
├─────────────────────────────────┤     ├─────────────────────────────────┤
│                                 │     │ Thin Implementation             │
│   Rich, Encapsulated Logic      │     │ (Passes calls through directly) │
│                                 │     └─────────────────────────────────┘
└─────────────────────────────────┘
```

### Core Terminology

- **Module**: Any structural unit with an interface and an implementation (function, class, package, or subsystem).
- **Interface**: Everything a caller must understand to use the module correctly: signatures, invariants, error modes, configuration, and performance characteristics.
- **Implementation**: The internal mechanics and code concealed behind the interface.
- **Seam**: A location where behavior can be altered without modifying the call site directly.
- **Adapter**: A concrete implementation satisfying an interface at a given seam.
- **Leverage**: The amount of functionality and behavior a caller gains per unit of interface complexity they must learn.
- **Locality**: The concentration of change, domain rules, and verification in a single place rather than distributed across callers.

### Core Principles of Depth

1. **Depth is a property of the interface, not internal composition**
   A deep module can internally delegate to smaller helper functions or private classes; those internal details are not exposed across the public interface seam.

2. **The Deletion Test**
   To evaluate whether a module earns its keep, imagine deleting it. If the deletion removes substantial complexity from the system, the module was likely a shallow pass-through. If deleting it forces substantial complexity to reappear across multiple callers, the module was providing genuine leverage.

3. **The Interface is the Test Surface**
   Callers and automated tests cross the exact same interface seam. If writing a unit test requires bypassing the interface to manipulate private internal state, the module interface is likely poorly shaped.

4. **Seam Discipline**
   One adapter represents a hypothetical seam; two adapters represent a real seam. Avoid introducing speculative seams or indirection layers until an actual variation point exists.

### Designing for Testability

Deep modules naturally enhance testability through three design habits:
- **Accept dependencies rather than creating them internally**: Pass collaborators or configuration in through parameters or constructors.
- **Return results rather than producing hidden side effects**: Prefer pure or predictable transformations that can be verified directly.
- **Minimize interface surface area**: Fewer public methods and simpler parameters result in simpler test setups and higher test leverage.

---

## 3. Context Pressure and the Smart Zone

Context management is critical when working with large language models. While modern frontier models feature large raw token limits, their reasoning quality is highest within an optimal token window known as the **smart zone** (typically up to ~150k tokens).

```
0k tokens                          ~150k tokens                      Max Context
┌────────────────────────────────────────┬─────────────────────────────────────┐
│               Smart Zone               │         Degradation Zone            │
│  (Sharp reasoning, rigorous logic,     │  (Flattened nuances, dropped rules, │
│   precise adherence to constraints)    │   potential hallucinated details)   │
└────────────────────────────────────────┴─────────────────────────────────────┘
```

### The Upstream/Downstream Context Split

To keep reasoning within the smart zone, `agy-skills` divides engineering workflows into distinct phases:

1. **Upstream Phase (Discovery, Grilling, Spec, Tickets)**
   Keep the initial interview (`/grill-with-docs`), architectural specification (`/to-spec`), and ticket breakdown (`/to-tickets`) in **one unbroken context window**. This ensures that the deep reasoning, trade-offs, and domain definitions remain available as a primary source.

2. **Downstream Phase (Implementation)**
   Once tickets are published, start **fresh, focused sessions** for each ticket. Each implementation session (`/implement`) loads only the specific ticket, relevant source files, and targeted test suites, leaving ample room in the smart zone for red-green test cycles and diff reviews.

---

## 4. Phase Boundaries

A **phase** is a distinct stage of work inside a session (such as discovery grilling, spec creation, ticket planning, code implementation, or code review). A **phase boundary** is the transition point between two phases.

Decisions about session lifecycle should only be made at phase boundaries, never midway through a phase.

### The Five Boundary Options

| Option | Action | Best Used When |
| :--- | :--- | :--- |
| **Continue** | Stay in current session | Next phase needs the full primary source and context fits within the smart zone. |
| **`/clear`** | Clear context completely | Prior conversation history is disposable or irrelevant to upcoming work. |
| **`/handoff`** | Write a portable markdown handoff | Switching harnesses, switching directories, sharing with a peer, or branching a side task. |
| **Subagent** | Spawn an isolated background agent | Task is tightly scoped and can run autonomously without steering (e.g. diff review, research). |
| **`/compact`** | Compress context with guidance | Context is relevant, staying in same repo, but window needs reduction for subsequent work. |

### The Boundary Decision Tree

Evaluate the following five questions in strict order at each phase boundary. The first "Yes" determines the action:

```
At Phase Boundary
        │
        ▼
1. Can you continue in this session?
   (Primary context needed & tokens within smart zone?)
        ├── Yes ──► CONTINUE
        └── No
             │
             ▼
2. Is the context irrelevant to what comes next?
        ├── Yes ──► /clear
        └── No
             │
             ▼
3. Do you need to hand off across harnesses, repos, or peers?
        ├── Yes ──► /handoff
        └── No
             │
             ▼
4. Can the task run autonomously (AFK) without steering?
        ├── Yes ──► Subagent
        └── No
             │
             ▼
5. Otherwise ──────► /compact (with explicit instructions)
```

### Primary vs. Secondary Sources

Every transition other than **Continue** converts a **primary source** (the full, verbatim conversational history and exploratory reasoning) into a **secondary source** (a lossy summary).

| Source Type | Examples | Completeness | Context Noise | Available Token Room |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | Continuing active session | Complete fidelity | Higher token usage | Limited |
| **Secondary** | `/compact`, `/handoff`, summary | Compressed / lossy | Low token usage | High |

By evaluating the decision tree in order, you avoid paying the lossiness of secondary sources until the token cost of continuing exceeds the benefit of full fidelity.
