# ADR 0010: Visual Documentation Architecture, Mermaid Diagram Standards, and M3 Interactive Diagram Cards

## Context

The `agy-skills` documentation site provides detailed reference and operational guidance for 34 promoted agent skills across `engineering` and `productivity` buckets, alongside the AI Coding Dictionary. While the documentation effectively explained the role, triggers, and failure modes of each skill in prose, several friction points existed:
- **High Cognitive Load in Multi-Step Flows**: Complex multi-step agent workflows (such as the main feature pipeline, on-ramp triage, test-driven development loops, and dynamic subagent meshes) required readers to mentally synthesize multi-paragraph descriptions into topological steps.
- **Absence of Visual Anchors in Individual Skill Pages**: Most skill doc pages relied solely on markdown headings, lists, and tables. Readers scanning documentation lacked immediate visual mental models of each skill's internal execution loop or artifact transformation.
- **Disconnected System Maps**: While `wiki/Skill-Flow-Diagram.md` contained high-level Mermaid flowcharts, these maps were not published on the primary GitHub Pages landing page (`docs/index.md`), leaving visitors without an immediate visual overview of the entire skill ecosystem.

## Decision

We establish a comprehensive visual documentation architecture across the documentation site:

1. **Mandatory Mechanism Diagrams in Promoted Skill Docs**:
   - Update `.agents/writing-docs.md` to require every promoted skill docs page (`docs/engineering/*.md` and `docs/productivity/*.md`) to feature a tailored Mermaid diagram in its free-form middle section.
   - Tailor the diagram type to the operational nature of each skill:
     - **Flowcharts (`flowchart TD` / `flowchart LR`)**: For procedural execution loops, red-green-refactor cycles, triage pipelines, and artifact pipelines.
     - **Sequence Diagrams (`sequenceDiagram`)**: For multi-agent swarms, orchestrator-to-subagent coordination, and interview back-and-forth loops.
     - **State Diagrams (`stateDiagram-v2`)**: For state machine transitions, ticket lifecycle phases, and triage label assignments.

2. **System-Wide Visual Maps on the Main Documentation Hub (`docs/index.md`)**:
   - Embed interactive Mermaid diagrams on the root documentation page:
     - **The Main Feature Flow**: Idea to grilling, prototyping, specification, ticket slicing, implementation, and code review.
     - **On-Ramps & Entry Points**: Triage queues, bug diagnosis loops, and wayfinder decision trees.
     - **Upkeep & Architecture Health**: Codebase scanning, deep module analysis, and transcript retrospectives.
     - **Productivity & Thought Shaping**: Fragment mining, structural shaping, and beat journeys.
     - **Standalone Skills & Setup Matrix**: Environment configuration and standalone utility grid.

3. **M3 Interactive Diagram Cards and Theme Synchronization (`m3-theme.js` & `m3-theme.css`)**:
   - Upgrade the client-side Mermaid renderer with Material Design 3 surface containers, responsive scroll handling, clear diagram labels, and a copy/source toggle button.
   - Maintain seamless light and dark theme synchronization when toggling site appearance.

4. **Automated Verification and Integrity Gates**:
   - Verify that all newly added Mermaid blocks pass syntax parsing, link integrity checks, and zero-em-dash linting across all files.

## Invariants

- Zero em-dashes across all skill runbooks, documentation pages, code comments, ADRs, and scripts.
- Every promoted skill doc must include a valid, theme-aware Mermaid diagram in its substance section.
- All diagrams must render cleanly in both Light and Dark themes without clipped text or broken nodes.

