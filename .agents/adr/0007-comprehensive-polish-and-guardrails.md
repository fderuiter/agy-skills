# Comprehensive Polish, Interactive Documentation, and Quality Guardrails

## Context

As `agy-skills` expanded to over 38 skills and 60+ AI Coding Dictionary concepts, several polish and verification gaps emerged:
- Diagrams embedded in documentation and skill outputs relied on static text blocks rather than rich dynamic visual rendering.
- The client-side search dialog offered unified search but lacked category filtering (Engineering vs Productivity vs Dictionary) and quick visual indicators of skill invocation classification (User-invoked vs Model-invoked).
- Local developer workflow lacked automated pre-commit verification, risking accidental commits containing broken front matter, em-dash regressions, or plugin version mismatches.
- GitHub Actions CI was limited to deployment time rather than gating incoming pull requests across supported Node.js runtimes.

## Decision

1. **Dynamic Theme-Aware Mermaid Rendering**:
   - Integrate Mermaid.js client-side rendering into the documentation theme.
   - Automatically detect and transform `code.language-mermaid` blocks into responsive SVG diagrams.
   - Dynamically re-render diagrams in synchrony with Material Design 3 light and dark theme palette switching without requiring page reload.

2. **Categorized Search and Skill Invocation Badges**:
   - Introduce interactive category filter chips (`All`, `Engineering`, `Productivity`, `Dictionary`) to the client-side search modal.
   - Attach visual Skill Classification Badges (`User-invoked` vs `Model-invoked` vs `Dictionary Concept`) across search results and documentation page headers.

3. **Zero-Dependency Native Git Hook Manager**:
   - Introduce `scripts/setup-git-hooks.mjs` wired into `package.json` `prepare` and `setup-hooks` scripts.
   - Configure a native `.git/hooks/pre-commit` hook that runs `npm test` before every commit without introducing external runtime dependencies.

4. **Pull Request Continuous Integration (CI)**:
   - Create a dedicated GitHub Actions workflow `.github/workflows/ci.yml` running on pull requests and main branch pushes.
   - Execute the test suite (SEO, front matter, skill parity, and em-dash audit) and plugin version synchronization check across Node.js 20 and Node.js 22.

## Invariants

- Zero em-dashes across all documentation, skill runbooks, scripts, code comments, and ADR prose.
- 100% test passing rate across `check-seo.mjs` and `check-skills.mjs`.
- Zero additional third-party production dependencies for git hook management.

