---
title: "setup-mcp: Model Context Protocol Configuration Skill | agy-skills"
description: "Configure Model Context Protocol (MCP) servers in Google Antigravity with stdio, sse, and http transport schemas, recipes, and connectivity verification."
keywords: ["antigravity mcp", "model context protocol", "mcp config", "mcp servers", "ai coding tools"]
permalink: /skills-setup-mcp/
---

## What it does

`setup-mcp` configures [Model Context Protocol](https://www.aihero.dev/ai-coding-dictionary/mcp) (MCP) servers for Antigravity, connecting the [agent](https://www.aihero.dev/ai-coding-dictionary/agent) to external databases, APIs, git repositories, filesystem scopes, and custom developer tools. It records server definitions in `.agents/mcp_config.json` for project-specific tools or `~/.gemini/config/mcp_config.json` for global machine-wide tools.

It tests server connectivity, environment variables, and resource access before committing the configuration to disk. That verification prevents broken binaries, missing credentials, or unreachable endpoints from silently degrading the agent during normal workflows.

## When to reach for it

You invoke this by typing `/setup-mcp`, and the agent won't reach for it on its own.

Reach for it whenever you want to expand the agent's toolset with an MCP integration:

| Situation | Action |
| --- | --- |
| Connect a project database or local service | Run `/setup-mcp` to add a stdio or SSE server to `.agents/mcp_config.json` |
| Configure personal GitHub or cross-project tools | Run `/setup-mcp` to write to `~/.gemini/config/mcp_config.json` |
| Set up issue trackers and domain modeling layout | Use [setup-agy-skills](https://fderuiter.github.io/agy-skills/skills-setup-agy-skills) instead |
| Explore external documentation via web research | Use [research](https://fderuiter.github.io/agy-skills/skills-research) instead |

## Prerequisites

It writes into one of two JSON configuration files depending on the chosen scope:

| Target File | Scope | Best For |
| --- | --- | --- |
| `.agents/mcp_config.json` | Workspace | Shared repo tools, local dev databases, project filesystem bounds |
| `~/.gemini/config/mcp_config.json` | Global | Personal API tokens, developer utilities, machine-wide services |

Local stdio servers require their respective runtime on your system: Node.js (`npx`) for JavaScript packages, or Python (`uv` / `python`) for Python packages.

## Supported transports and common recipes

Antigravity supports three MCP transport mechanisms:

| Transport | Type | Description |
| --- | --- | --- |
| `stdio` | Local Process | Spawns a local executable or CLI (`npx`, `uvx`, `node`, `python`) over stdin and stdout |
| `sse` | Remote HTTP | Connects to a remote MCP endpoint over Server-Sent Events |
| `http` | Remote Stream | Connects to a remote streamable HTTP MCP endpoint |

### Common server recipes

| Server | Package / Command | Primary Use |
| --- | --- | --- |
| **PostgreSQL** | `@modelcontextprotocol/server-postgres` | Inspect table schemas, run queries, and analyze relational data |
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | Explicitly allow file operations on specific directories outside the workspace |
| **GitHub** | `@modelcontextprotocol/server-github` | Search repos, inspect pull requests, and query issues across GitHub |
| **Git** | `@modelcontextprotocol/server-git` | Read git history, view diffs, and inspect branches on a local repo |
| **Custom Node** | `node ./scripts/mcp.js` | Run project-specific tools written with the Model Context Protocol TypeScript SDK |
| **Custom Python** | `python -m my_mcp_server` | Run custom Python tools created with FastMCP or the MCP Python SDK |

Each recipe is merged into the `mcpServers` dictionary of your chosen configuration file without overwriting existing server entries.

## Common questions

**Should I put my MCP servers in `.agents/mcp_config.json` or `~/.gemini/config/mcp_config.json`?**

Use `.agents/mcp_config.json` when the tool belongs to the project (such as a local PostgreSQL container, project-scoped mock server, or repository-specific scripts) and can be shared with other contributors. Use `~/.gemini/config/mcp_config.json` for personal API keys, private tools, or servers you want available in every workspace.

**How do I pass sensitive API keys without leaking them into git?**

Never commit raw API keys into `.agents/mcp_config.json` if the repository is public or shared. Store sensitive keys in environment variables on your host machine, or place the server definition in `~/.gemini/config/mcp_config.json`. When writing to `.agents/mcp_config.json`, use local environment variable references where supported by the server runner.

**Why are MCP tools not appearing in the agent's prompt?**

Antigravity discovers MCP servers on startup or configuration reload. If new tools do not appear, verify that the JSON syntax in `mcp_config.json` is valid, that the command runs cleanly when executed manually in a terminal, and that any required authentication headers or environment variables are provided.

**Can I run custom Python or Node scripts as MCP servers?**

Yes. Select the stdio transport and point `command` to `node`, `python`, `uv`, or `ts-node`, with the path to your server entry point in `args`. The skill validates that the script file exists on disk and is executable before updating the configuration.

## It's working if

- `.agents/mcp_config.json` or `~/.gemini/config/mcp_config.json` contains a valid `mcpServers` object with your newly configured server.
- The command and arguments pass verification without throwing executable-not-found or permission errors.
- Discovered tools from the configured MCP server become available to the agent for [tool calls](https://www.aihero.dev/ai-coding-dictionary/tool-call).
- Existing server definitions in the configuration file remain intact.

## Where it fits

`setup-mcp` is a **run-once setup** skill for tooling integration, providing external capabilities that other skills can leverage. Its neighbours are [setup-agy-skills](https://fderuiter.github.io/agy-skills/skills-setup-agy-skills) (which configures issue tracking and domain doc conventions) and [research](https://fderuiter.github.io/agy-skills/skills-research) (which performs background investigations). For choosing which skill or workflow fits your current task, [ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) routes the complete skill set.
