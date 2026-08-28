---
name: git-guardrails
description: Set up Antigravity lifecycle hooks in .agents/hooks.json to block dangerous git commands (push, reset --hard, clean, branch -D, etc.) before run_command executes.
---

# Setup Git Guardrails

Sets up a PreToolUse hook in .agents/hooks.json that intercepts and blocks dangerous git commands before Antigravity executes them.

## What Gets Blocked

- git push (all variants including --force)
- git reset --hard
- git clean -f / git clean -fd
- git branch -D
- git checkout . / git restore .

When blocked, the hook outputs {\ decision\: \deny\} with an explanation, preventing execution.

## Steps

### 1. Copy the hook script

Copy [scripts/block-dangerous-git.js](./scripts/block-dangerous-git.js) into your workspace:

- Target: .agents/hooks/block-dangerous-git.js

### 2. Configure .agents/hooks.json

Add or merge into .agents/hooks.json:

`json
{
  \git-safety\: {
    \PreToolUse\: [
      {
        \matcher\: \run_command\,
        \hooks\: [
          {
            \type\: \command\,
            \command\: \node .agents/hooks/block-dangerous-git.js\
          }
        ]
      }
    ]
  }
}
`

### 3. Verify

Test the hook payload:

`ash
node .agents/hooks/block-dangerous-git.js << 'EOF'
{\toolCall\:{\name\:\run_command\,\args\:{\CommandLine\:\git push origin main\}}}
EOF
`

Should output:
`json
{\decision\:\deny\,\reason\:\BLOCKED: Command \\\git push origin main\\\ matched safety guardrail. Destructive git command prevented.\}
`