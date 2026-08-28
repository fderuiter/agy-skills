# Distribute skills for Google Antigravity (AGY) via file discovery and skills.json

## Context

The upstream repository (mattpocock/skills) was originally packaged as a Claude Code plugin and distributed via skills.sh. This fork (agy-skills), maintained by Fred de Ruiter, targets Google Antigravity (AGY) as its primary agent platform.

Antigravity uses a different customization and discovery architecture:
- Project-level skills are discovered in .agents/skills/ or declared via .agents/skills.json.
- Global skills live in ~/.gemini/config/skills/.
- Plugins in Antigravity use .agents/plugins/<name>/plugin.json containing {"name": "..."}, without Claude-specific skill path arrays.
- Rules are loaded from AGENTS.md or GEMINI.md.

## Decision

1. Remove the legacy .claude-plugin/ directory and replace it with an Antigravity plugin manifest at .agents/plugins/agy-skills/plugin.json.
2. Standardize installation on Antigravity mechanisms:
   - Per-repo integration via .agents/skills.json pointing to the skills folder.
   - Global integration by linking into ~/.gemini/config/skills/ via scripts/link-skills.sh.
   - Direct workspace copy into .agents/skills/.
3. Publish documentation using GitHub Pages and GitHub Wiki rather than the upstream aihero.dev site.
4. Rename CLAUDE.md to AGENTS.md as the authoritative rule file.

## Invariants

- All promoted skills remain organized under skills/engineering/ and skills/productivity/.
- Documentation pages are kept in sync under docs/ and link to GitHub Pages.
- No em-dashes are used in prose.