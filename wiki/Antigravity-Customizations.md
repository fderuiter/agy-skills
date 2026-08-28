# Antigravity Customizations Guide

Google Antigravity (AGY) provides a layered customization system that allows developers to tailor agent behaviors, define project-specific procedures, enforce architectural invariants, and integrate external developer tools.

This guide provides a comprehensive reference for the five customization types supported in Antigravity: **Skills**, **Plugins**, **Rules**, **Hooks**, and **MCP Servers**.

---

## Overview of Customization Types

| Customization Type | Primary Location / File | Scope | Primary Purpose |
| :--- | :--- | :--- | :--- |
| **Skills** | `skills/<name>/SKILL.md` or `.agents/skills/<name>/SKILL.md` | On-demand (Progressive) | Multi-step procedures, runbooks, and domain workflows. |
| **Plugins** | `.agents/plugins/<name>/plugin.json` | Bundle / Package | Packaging related skills, rules, and configurations into a sharable unit. |
| **Rules** | `AGENTS.md`, `GEMINI.md`, `.agents/rules/*.md` | Hierarchical / Directory | Enforcing coding standards, repository conventions, and hard constraints. |
| **Hooks** | `.agents/hooks.json` | Event-driven Lifecycle | Running automated commands or validation checks at agent lifecycle triggers. |
| **MCP Servers** | `.agents/mcp_config.json` or `~/.gemini/config/mcp_config.json` | Tool Integration | Connecting external tool providers via the Model Context Protocol. |

---

## 1. Skills

Skills are modular, self-contained packages containing procedural instructions, scripts, and references that teach Antigravity how to execute specific tasks.

### Structure of a Skill

Each skill resides in its own subdirectory and contains a required `SKILL.md` entry point:

```
skills/engineering/my-skill/
├── SKILL.md                 # Required: Frontmatter and core instructions
├── scripts/                 # Optional: Executable helper scripts (Node.js, Bash, PowerShell)
├── references/              # Optional: In-depth technical guides or cheat sheets
├── examples/                # Optional: Concrete code or artifact examples
└── resources/               # Optional: Data files, templates, or schema definitions
```

### Anatomy of `SKILL.md`

Every `SKILL.md` file begins with YAML frontmatter specifying its name and a concise description:

```markdown
---
name: my-skill
description: Comprehensive description explaining what this skill does and when the agent or user should reach for it.
---

# My Skill Title

Detailed step-by-step instructions guiding the agent through the procedure.
```

### User-Invoked vs. Model-Invoked Skills

- **User-Invoked Skills**: Intended for direct invocation by the developer via slash commands (for example: `/grill-with-docs`, `/triage`, `/to-spec`, `/implement`). The description clearly states its purpose and user trigger.
- **Model-Invoked Skills**: Activated dynamically by the agent during relevant tasks (for example: `/tdd`, `/codebase-design`, `/domain-modeling`, `/code-review`). The description provides trigger keywords and conditions that inform the agent when to load the skill.

### Progressive Disclosure

To preserve the model's token capacity, Antigravity uses **progressive disclosure** for skills:
1. At session initialization, only the `name` and `description` of each available skill are injected into the system prompt.
2. The complete text of `SKILL.md` (and any referenced files) is loaded into the active context only when the skill is explicitly activated by the user or chosen by the model.

### Discovery and Linking

Antigravity discovers skills in two main locations:
- **Workspace level**: `.agents/skills/<skill-name>/` or declared in `.agents/skills.json`.
- **Global level**: `~/.gemini/config/skills/<skill-name>/` or `~/.agents/skills/<skill-name>/`.

In this repository, running `npm run link` (or `node scripts/link-skills.mjs`) creates filesystem junctions (Windows) or symbolic links (macOS/Linux) connecting all skills under `skills/` directly to your local Antigravity configuration paths.

---

## 2. Plugins

Plugins provide a mechanism to package, distribute, and version a collection of skills, rules, and configurations.

### Plugin Manifest (`plugin.json`)

Antigravity plugin manifests reside at `.agents/plugins/<plugin-name>/plugin.json`:

```json
{
  "name": "agy-skills",
  "version": "1.2.4",
  "description": "Agent skills, workflows, and prompts for Google Antigravity",
  "author": "Fred de Ruiter",
  "repository": "https://github.com/fderuiter/agy-skills"
}
```

When a plugin is mounted, Antigravity registers the plugin's skills and rules automatically within the workspace.

---

## 3. Rules

Rules define project-wide conventions, coding guidelines, constraints, and invariants that the agent must respect at all times.

### Rule File Locations and Hierarchy

Rules are discovered hierarchically by walking up the directory tree from the file being viewed or edited to the git repository root:
- `AGENTS.md` (Authoritative repository-level rules)
- `GEMINI.md` (Supported alias for repository or directory rules)
- `.agents/rules/*.md` (Modular rule files)

### Rule Types

- **Always-On Rules**: Injected unconditionally into every agent interaction within the directory scope (standard markdown in `AGENTS.md`).
- **Model-Decision Rules**: Evaluated by the model based on trigger criteria specified in the rule metadata, saving tokens when the rule is not relevant.

### Deduplication

Antigravity deduplicates all rules by their resolved filesystem paths. A rule file is never loaded more than once into a single conversation turn, regardless of how many trigger conditions it matches.

---

## 4. Hooks (`.agents/hooks.json`)

Hooks allow you to execute automated scripts or shell commands at specific points during the agent interaction lifecycle.

### Configuration Schema

Hooks are configured in `.agents/hooks.json` at the workspace root or globally in `~/.gemini/config/hooks.json`:

```json
{
  "hooks": [
    {
      "event": "post_tool_execution",
      "matcher": {
        "tool": "replace_file_content",
        "file_pattern": "**/*.ts"
      },
      "action": {
        "type": "command",
        "command": "npx prettier --write \"${file}\""
      }
    },
    {
      "event": "pre_tool_execution",
      "matcher": {
        "tool": "run_command",
        "command_pattern": "git push*"
      },
      "action": {
        "type": "command",
        "command": "npm run test"
      }
    }
  ]
}
```

### Supported Hook Events

- `session_start`: Runs when a new conversation or agent session initializes.
- `session_end`: Runs when an agent session concludes.
- `pre_tool_execution`: Intercepts tool calls prior to execution (can validate parameters or enforce safety checks).
- `post_tool_execution`: Intercepts tool calls after execution (ideal for automated formatting, linting, or test execution).

---

## 5. Model Context Protocol (MCP) Servers

Antigravity integrates with external tools and services using the open **Model Context Protocol (MCP)**.

### MCP Configuration Locations

- **Workspace Level**: `.agents/mcp_config.json` (versioned with the repository).
- **Global Level**: `~/.gemini/config/mcp_config.json` (applies to all projects on your machine).

### Configuration Schema

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    }
  }
}
```

### MCP Setup Workflow

To configure and verify MCP servers in your environment, invoke the `/setup-mcp` skill, which guides you through configuring server parameters, credential management, and connectivity verification.

---

## 6. Loading Precedence and Priority

When multiple customizations share the same name or configure conflicting behavior, Antigravity resolves them using the following precedence order (highest priority first):

1. **Workspace Project Level**: Hierarchically discovered in `.agents/` walking upward from current directory to repository root.
2. **Explicit Workspace Manifests**: Declared in `.agents/skills.json` or `.agents/plugins.json`.
3. **Global Discovery**: Located in `~/.gemini/config/` or `~/.agents/`.
4. **Built-in Customizations**: Default system skills and configurations bundled with Antigravity.
5. **Global Manifest Configurations**: Explicitly declared in global configuration files.
