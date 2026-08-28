# ADR 0009: Extensible Skill Scaffolding, Config-Driven Decoupling, and Local Skill Overlays

## Context

As the `agy-skills` catalog matured, extending the repository or forking it for team/personal catalogs presented several barriers:
- **Coupled Branding and Routing**: Hardcoded references to author identity, documentation domains, and the `ask-fred` router skill were scattered across scripts, validation linters, and skill definitions, requiring tedious search-and-replace across multiple files to adapt a fork.
- **Manual Authoring Overhead**: Adding a new skill required manually creating a `SKILL.md` runbook, drafting a 4-section documentation page in `docs/` (if promoted), adding entries into `skills/<bucket>/README.md`, updating the root `README.md`, updating the router skill, and running link scripts. Missed steps caused CI failures in `check-skills.mjs`.
- **Private and Experimental Extensions**: Developers wishing to build proprietary or experimental skills alongside the public catalog lacked an isolated directory that Antigravity could link into local environments without polluting git tracking.
- **Trigger Overlaps and Quality Regressions**: Without automated trigger conflict detection, adding similarly phrased skills risked prompt ambiguity and routing confusion across agent models.

## Decision

We establish an extensible architecture for skill authoring, configuration decoupling, and verification:

1. **Centralized Skill Configuration File (`skills.config.json`)**:
   - Introduce a root configuration file defining repository metadata, author branding, router skill identity, bucket definitions (with promotion and documentation flags), local overlay paths, and default issue tracker configurations.
   - Refactor repository scripts (`check-skills.mjs`, `link-skills.mjs`, `new-skill.mjs`) to read this configuration dynamically.

2. **Deterministic Scaffolder and Full-Lifecycle Auto-Wiring (`scripts/new-skill.mjs` and `/new-skill`)**:
   - Provide a deterministic CLI tool (`npm run new-skill`) and an interactive agent skill (`/new-skill`) that automate the entire creation flow:
     - Generate `skills/<bucket>/<name>/SKILL.md` with best-practice agent instructions, leading words, positive framing, and checkable completion criteria.
     - Generate `docs/<bucket>/<name>.md` conforming to the 4-section documentation standard for promoted buckets.
     - Register the new skill in `skills/<bucket>/README.md` and root `README.md`.
     - Register the new skill in the central router skill via section injection markers.
     - Generate a starter SDK evaluation template in `tests/skills/test_<name>.py`.
     - Automatically execute `npm run link` and static verification checks.

3. **Local Skill Overlay (`skills/custom/`)**:
   - Support a gitignored local overlay directory (`skills/custom/`) that `scripts/link-skills.mjs` discovers and links into `~/.gemini/config/skills` and `~/.agents/skills`, enabling local-only skills to run seamlessly alongside catalog skills.

4. **Trigger Conflict Detector**:
   - Enhance `scripts/check-skills.mjs` to validate description clarity and detect overlapping trigger phrases across skills to prevent model routing conflicts.

5. **Unified Contributor Documentation (`CONTRIBUTING.md` and `docs/contributing.md`)**:
   - Publish a comprehensive guide detailing fork customization, the 3-step setup, skill creation workflows, testing harnesses, and writing principles for agents.

## Invariants

- Zero em-dashes across all skill runbooks, documentation, code comments, ADRs, and scripts.
- Every promoted skill must maintain 100% parity across `SKILL.md`, `docs/`, bucket `README.md`, and root `README.md`.
- All hook and scaffolding scripts must remain zero-dependency Node.js scripts.

