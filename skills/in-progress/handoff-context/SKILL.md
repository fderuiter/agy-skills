---
name: handoff-context
description: Hand the current conversation off to a background subagent in Antigravity that picks up the work immediately.
argument-hint: \ What will the next session be used for?\
---

# Handoff Context

Write a handoff summary of the current conversation so a fresh subagent can continue the work.

Launch a background subagent (via invoke_subagent or CLI task) seeded with the summary as its prompt.

## Guidelines

1. **Role and Name**: Provide a descriptive role/name (e.g., \BugFix Subagent\ or \Refactor Executor\).
2. **Suggested Skills**: Include a section naming which skills the subagent should activate.
3. **Artifacts & References**: Reference existing files, specs, plans, and ADRs by path rather than duplicating text.
4. **Redaction**: Redact any secrets or credentials from the handoff prompt.
5. **Goal-directed**: If the user provided arguments, tailor the handoff prompt specifically to those goals.