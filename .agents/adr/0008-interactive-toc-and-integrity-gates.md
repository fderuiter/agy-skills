# Interactive Table of Contents, Reading Progress, and Link & Terminology Integrity Gates

## Context

As the documentation grew to over 103 pages and 1,900+ cross-document links, several usability and quality verification needs became apparent:
- Long skill documentation pages and deep dictionary guides lacked an on-page outline, requiring full manual scrolling to discover sections and jumping targets.
- Users lacked one-click deep-linking mechanisms to share specific heading anchors with colleagues or subagents.
- There was no automated check validating that relative links, heading anchor fragments, and asset references resolved correctly across all markdown files.
- Ambiguous or forbidden domain terms (such as deprecated tracking vocabulary) defined in `CONTEXT.md` lacked automated linting to prevent accidental reintroduction into documentation prose.

## Decision

1. **Dynamic On-Page Table of Contents (ToC) and Scrollspy**:
   - Automatically extract `h2` and `h3` heading structures on documentation articles with 2 or more sections.
   - Render a sticky sidebar on desktop viewports (min-width: 1280px) and a collapsible card above article content on mobile and tablet viewports.
   - Highlight the currently active heading in the outline in real time as the user scrolls using `IntersectionObserver`.

2. **Scroll Reading Progress Bar and Heading Anchor Deep-Linking**:
   - Provide a slim, top-anchored reading progress indicator styled with Material Design 3 primary tokens.
   - Add hover `#` anchor buttons to section headings that copy the full permalink to the clipboard and display an M3 floating snackbar confirmation toast.

3. **Link and Anchor Integrity Gate (`scripts/check-links.mjs`)**:
   - Introduce automated validation scanning all repository markdown files for broken relative links, missing asset files, invalid permalinks, and unresolvable heading anchor fragment hashes.
   - Wire the link check directly into `npm test` and GitHub Actions CI.

4. **Terminology Enforcement Linter (`scripts/check-terminology.mjs`)**:
   - Introduce automated validation ensuring forbidden domain terms defined in `CONTEXT.md` are not introduced into documentation or skill runbooks.
   - Wire the terminology check directly into `npm test` and GitHub Actions CI with scoped allowlists for historical changelogs.

## Invariants

- Zero em-dashes across all documentation, skill runbooks, scripts, code comments, and ADR prose.
- 100% test passing rate across `check-seo.mjs`, `check-skills.mjs`, `check-links.mjs`, and `check-terminology.mjs`.
- Automatic suppression of the Table of Contents on short articles with fewer than 2 headings.
