# The canonical install block

One install story, one wording. README.md, .changeset/*, and every page under docs/ must say this and nothing else. Change it here first, then propagate.

agy-skills is distributed for Google Antigravity (AGY).

## Installation Methods

### 1. Antigravity Plugin (Recommended)

Copy or symlink `.agents/plugins/agy-skills` into your project's `.agents/plugins/` directory:

```bash
git clone https://github.com/fderuiter/agy-skills.git
# In your target repo:
mkdir -p .agents/plugins
ln -s /path/to/agy-skills/.agents/plugins/agy-skills .agents/plugins/agy-skills
```

### 2. Per-repo via skills.json

Add `.agents/skills.json` to the target project, pointing at this repository:

```json
{
  "entries": [
    {
      "path": "path/to/agy-skills/skills/engineering"
    },
    {
      "path": "path/to/agy-skills/skills/productivity"
    }
  ]
}
```

### 3. Global Installation

Run `npm run link` in this repository to automatically link all skills into your local Antigravity directories:

- Windows: `%USERPROFILE%\.gemini\config\skills\` and `%USERPROFILE%\.agents\skills\`
- macOS / Linux: `~/.gemini/config/skills/` and `~/.agents/skills/`

### 4. Manual Workspace Copy

Copy any individual skill folder from `skills/` directly into your workspace `.agents/skills/` directory.

## Post-Install Setup

In your agent session, run once per repository:

```
/setup-agy-skills
```