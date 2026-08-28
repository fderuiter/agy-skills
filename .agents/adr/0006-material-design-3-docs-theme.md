# Material Design 3 (Material You) Documentation Architecture

## Context

The `agy-skills` documentation site on GitHub Pages previously relied on the stock `jekyll-theme-cayman` Jekyll theme. While functional, Cayman presented several limitations:
- A generic 2016-era layout that did not align with modern Google Antigravity ecosystem aesthetics.
- Lack of dark mode support, causing visual fatigue when switching between developer IDEs/terminals and documentation.
- No integrated client-side search across the 38+ skills and 70+ AI Coding Dictionary definitions.
- Minimal visual hierarchy for complex markdown elements such as code snippets, parameter tables, and multi-axis review reports.

## Decision

1. **Custom Material Design 3 (Material You) Design System**:
   - Replace the legacy Cayman theme with a custom Jekyll layout and CSS token architecture adhering to the Material Design 3 specification.
   - Implement full M3 Color Roles using CSS custom properties (`--md-sys-color-*`), deriving primary, secondary, tertiary, neutral, and surface tonal containers from a Google Antigravity Blue seed (`#1A73E8`).
   - Implement M3 Elevation and Surface Tint layers (`surface-container-lowest` to `surface-container-highest`) to establish visual separation without heavy borders.
   - Map typography to official M3 type scales (Headline, Title, Body, Label) using Google Sans, Roboto, and Roboto Mono.

2. **Adaptive Navigation Shell**:
   - Implement a responsive navigation drawer supporting persistent desktop display and collapsible mobile drawer with backdrop overlay.
   - Implement a sticky M3 Top App Bar featuring brand badge, instant search trigger, dark/light theme switch button, and GitHub repository shortcut.

3. **Client-Side Discovery & Search Dialog**:
   - Provide an instant search dialog accessible via `Ctrl+K` or `/` hotkey with client-side fuzzy indexing across all skills, categories, and dictionary terms.

4. **Developer-Centric Code & Element Experience**:
   - Wrap markdown code fences in M3 surface containers with rounded corners (`shape-corner-large`), language badges, and one-click copy-to-clipboard buttons.
   - Format tables, alerts, and callouts with M3 state-layer styling.

## Invariants

- All 114+ existing markdown files under `docs/` retain their frontmatter schemas, URLs, permalinks, and 4-section structure without modification.
- Zero em-dashes in any documentation, template, comment, or ADR text.
- Full offline resilience: typography and components fall back cleanly if external CDNs are unreachable.

