---
name: new-skill
description: User-invoked. Scaffold a new skill, documentation page, test fixture, and router registration with interactive quality checks.
---

# New Skill

Scaffold and wire a new agent skill into the repository with automated documentation, testing, and router integration.

## Context

Creating a new skill requires coordinating multiple artifacts:
- The execution runbook in `skills/<bucket>/<name>/SKILL.md`
- The human-facing documentation page in `docs/<bucket>/<name>.md` (for promoted buckets)
- Index entries in `skills/<bucket>/README.md` and the root `README.md`
- Route registration in `skills/engineering/ask-fred/SKILL.md`
- Verification test fixtures in `tests/skills/test_<name>.py`

This skill guides the authoring process, applies writing disciplines from `writing-for-agents`, and runs the deterministic scaffolder `scripts/new-skill.mjs`.

## Authoring Disciplines

When drafting a new skill, enforce these core principles:

1. **Information Hierarchy**:
   - Keep procedural execution steps in `SKILL.md`.
   - Disclose bulky catalogs or secondary lookup tables to `references/` files behind context pointers.
   - Avoid dumping runbook recipes into `docs/` pages (docs explain *why* and *when*, not step-by-step agent instructions).

2. **Leading Words**:
   - Anchor behavior with strong, pre-existing concepts the model already understands (_tight feedback loop_, _tracer bullets_, _deep module_, _red-green_).

3. **Positive Framing**:
   - State the target behavior rather than banning unwanted behavior. Prompt what to do, not what to avoid.

4. **Checkable Completion Criteria**:
   - End every workflow on an observable, verifiable condition.

5. **No Em-Dashes**:
   - Zero em-dashes anywhere in prose. Use commas, colons, periods, or parentheses.

## Workflow

1. **Gather Skill Specifications**:
   - **Name**: kebab-case identifier (e.g. `api-audit`, `perf-benchmark`).
   - **Bucket**: `engineering` (daily code work), `productivity` (workflow tools), `misc` (rarely used), `in-progress` (experimental), or `custom` (local overlay).
   - **Invocability**: `user` (user-invoked slash command) or `model` (model- or user-reachable on task match).
   - **Description**: 1 to 2 concise sentences stating the primary job and defining constraint.

2. **Execute Scaffolding Command**:
   - Run the deterministic scaffolder:
     ```bash
     node scripts/new-skill.mjs --name <name> --bucket <bucket> --description "<description>" --invoked <user|model>
     ```

3. **Refine Runbook and Documentation**:
   - Edit `skills/<bucket>/<name>/SKILL.md` to add precise domain steps, required tools, and failure handling.
   - If promoted, refine `docs/<bucket>/<name>.md` to answer real reader questions and verify all links are absolute.

4. **Verify Integrity**:
   - Run the integrity gate:
     ```bash
     npm test
     ```
   - Verify that frontmatter parses, docs parity matches, README links resolve, and no em-dashes exist.

## Completion Criteria

- [ ] `SKILL.md` created with valid frontmatter matching directory name.
- [ ] Documentation page created at `docs/<bucket>/<name>.md` for promoted buckets.
- [ ] Bucket and root `README.md` listings updated.
- [ ] Router skill (`ask-fred`) registered for user-invoked skills.
- [ ] `npm test` passes cleanly with zero errors.

