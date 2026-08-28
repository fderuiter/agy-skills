# The canonical install block

One install story, one wording. README.md, .changeset/*, and every page under docs/ must say this and nothing else. Change it here first, then propagate.

agy-skills is distributed for Google Antigravity (AGY).

## Installation Methods

### 1. Per-repo via skills.json (Recommended)

Add .agents/skills.json to the target project, pointing at this repository:

```json
{
  "entries": [
    {
      "path": "path/to/agy-skills/skills"
    }
  ]
}
```

### 2. Global Installation

Copy or symlink the skills directory into your global Antigravity configuration directory:

- Windows: %USERPROFILE%\.gemini\config\skills\
- macOS / Linux: ~/.gemini/config/skills/

### 3. Manual Workspace Copy

Copy any individual skill folder from skills/ directly into your workspace .agents/skills/ directory.

## Post-Install Setup

In your agent session, run once per repository:

```
/setup-agy-skills
```