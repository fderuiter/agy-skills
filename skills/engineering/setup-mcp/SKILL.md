---
name: setup-mcp
description: "Configure Model Context Protocol (MCP) servers in .agents/mcp_config.json (project-level) or ~/.gemini/config/mcp_config.json (global). User-invoked skill."
---

# Setup MCP

Configure Model Context Protocol (MCP) servers for Antigravity, connecting the agent to external tools, databases, APIs, and local services.

This is a user-invoked skill (`/setup-mcp`). It walks developers through selecting transport types, configuring server definitions, injecting environment variables safely, and verifying server connectivity.

## Target Configuration Files

Antigravity discovers MCP servers from two primary configuration files:

1. **Project-level**: `.agents/mcp_config.json` (or `.agent/mcp_config.json`)
   - Located at the repository root.
   - Ideal for project-specific tools: local development databases, repository-scoped filesystem servers, repo git tools, and project mock servers.
   - Can be committed to version control to share tool configurations across the team (without committing secrets).

2. **Global**: `~/.gemini/config/mcp_config.json`
   - Located in the user's home directory.
   - Ideal for personal credentials, global developer utilities, cross-project integrations, and machine-wide services.

Both files use the standard `mcpServers` object format:

```json
{
  "mcpServers": {
    "<server-name>": {
      ...
    }
  }
}
```

## Supported Transports & Schemas

### 1. Stdio Transport (Local Process)

Used for local command-line tools, scripts, or package runners (`npx`, `uvx`, `node`, `python`). The language server spawns the child process and communicates via standard input and standard output.

**JSON Schema:**

```json
{
  "command": "executable-name-or-path",
  "args": ["arg1", "arg2"],
  "env": {
    "ENV_VAR_NAME": "value"
  },
  "cwd": "/optional/working/directory"
}
```

- `command` (string, required): Executable name on `PATH` (for example `npx`, `uvx`, `node`, `python`) or an absolute path to a binary.
- `args` (array of strings, optional): Command-line arguments passed to the executable.
- `env` (object, optional): Environment variables injected into the child process.
- `cwd` (string, optional): Working directory for process execution.

### 2. SSE Transport (Server-Sent Events)

Used for remote MCP services accessible over HTTP via Server-Sent Events.

**JSON Schema:**

```json
{
  "serverUrl": "https://mcp.example.com/sse",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}
```

- `serverUrl` (string, required): Full HTTP(S) URL of the remote SSE endpoint.
- `headers` (object, optional): Custom HTTP headers for authentication and routing.

### 3. HTTP Transport (Streamable HTTP Endpoint)

Used for remote MCP servers using streamable HTTP or REST endpoints.

**JSON Schema:**

```json
{
  "url": "https://mcp.example.com/api",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "X-Custom-Header": "value"
  }
}
```

- `url` (string, required): Full HTTP(S) URL of the MCP endpoint.
- `headers` (object, optional): Custom HTTP headers such as bearer tokens or API keys.

## Common Server Recipes

### PostgreSQL Server (`@modelcontextprotocol/server-postgres`)

Exposes PostgreSQL database inspection and query tools.

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost:5432/mydb"
      ]
    }
  }
}
```

Or using an environment variable for credentials:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_URL": "postgresql://user:password@localhost:5432/mydb"
      }
    }
  }
}
```

### Filesystem Server (`@modelcontextprotocol/server-filesystem`)

Grants scoped file read, write, and directory inspection capabilities. Always provide explicit allowed directory paths as arguments.

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory",
        "/second/allowed/directory"
      ]
    }
  }
}
```

### GitHub Server (`@modelcontextprotocol/server-github`)

Enables searching repositories, reading issues, managing pull requests, and inspecting file contents across GitHub.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_yourPersonalAccessToken"
      }
    }
  }
}
```

### Git Server (`@modelcontextprotocol/server-git`)

Enables reading commit history, diffs, branches, and status from a local git repository.

Node / npx version:
```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-git",
        "--repository",
        "/path/to/local/git/repo"
      ]
    }
  }
}
```

Python / uvx version:
```json
{
  "mcpServers": {
    "git": {
      "command": "uvx",
      "args": [
        "mcp-server-git",
        "--repository",
        "/path/to/local/git/repo"
      ]
    }
  }
}
```

### Custom Local Node.js Server

Used for proprietary or internal MCP servers written in TypeScript or JavaScript.

```json
{
  "mcpServers": {
    "my-node-tools": {
      "command": "node",
      "args": ["./scripts/mcp-server.js"],
      "cwd": "/path/to/project",
      "env": {
        "NODE_ENV": "development",
        "API_KEY": "secret-key"
      }
    }
  }
}
```

### Custom Local Python Server

Used for custom Python MCP servers built with the FastMCP or MCP Python SDK.

```json
{
  "mcpServers": {
    "my-python-tools": {
      "command": "python",
      "args": ["-m", "my_mcp_package.server"],
      "env": {
        "PYTHONPATH": "./src",
        "SERVICE_ENDPOINT": "http://localhost:8080"
      }
    }
  }
}
```

Or using `uv run`:

```json
{
  "mcpServers": {
    "my-python-tools": {
      "command": "uv",
      "args": ["run", "--with", "mcp", "python", "./scripts/server.py"]
    }
  }
}
```

## Workflow and Execution Steps

When `/setup-mcp` is invoked, follow this structured process:

### 1. Scope and Needs Assessment

Ask the developer what service, database, or tool they want to connect:
- Identify if this is a standard recipe (PostgreSQL, Filesystem, GitHub, Git) or a custom server.
- Determine configuration scope:
  - **Project-level (`.agents/mcp_config.json`)**: Default for repo-specific tools.
  - **Global (`~/.gemini/config/mcp_config.json`)**: For personal tools and machine-wide access.
- Check if the target config file already exists and parse its existing `mcpServers`.

### 2. Configure Server Entry

Draft the server configuration object according to the selected transport:
- Verify executable paths and command availability (`npx`, `uvx`, `node`, `python`).
- Map all necessary arguments and environment variables.
- Keep secrets safe: remind the developer to use local environment variables or private global configs if the project config is committed to public source control.

### 3. Write and Merge

- Read the target configuration file if it exists.
- Preserve all existing server definitions under `mcpServers`.
- Add or update the target server definition under its designated key name.
- Format the JSON file cleanly with 2-space indentation.
- Ensure the parent directory (`.agents/` or `~/.gemini/config/`) exists before writing.

### 4. Verification Step

Run proactive diagnostics to ensure the configured MCP server will start cleanly:

1. **Syntax and JSON check**: Ensure the output file is valid JSON with top-level `mcpServers` mapping.
2. **Command / Binary check**: Test if the command exists and is executable in the current environment (for example running `npx --version`, `python --version`, or verifying local script file paths).
3. **Environment variable check**: Verify all required keys in the `env` block are populated with non-empty values.
4. **Path & Permission check**:
   - For filesystem servers: verify target paths exist and have appropriate read/write permissions.
   - For database servers: verify database port and host are reachable.
   - For git servers: verify the directory is a valid git repository.
   - For remote SSE/HTTP servers: verify the URL endpoint is reachable.

### 5. Final Confirmation

Report the setup outcome to the user:
- Show the exact JSON configuration block that was written.
- Specify the configuration path (`.agents/mcp_config.json` or `~/.gemini/config/mcp_config.json`).
- Mention how Antigravity will discover the new tools on next prompt or agent reload.
