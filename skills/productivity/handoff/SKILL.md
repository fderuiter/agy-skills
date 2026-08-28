---
name: handoff
description: Compact the current conversation into a handoff document or immediately launch a background subagent to continue the work.
argument-hint: "What will the next session or subagent be used for?"
---

# Handoff

Write a handoff summary of the current conversation so another agent or subagent can seamlessly pick up the work.

## Modes

### 1. Document Handoff (Default)
Write a clean handoff document and save it to the OS temporary directory (or as an Antigravity artifact):
- Include a "Suggested skills" section, naming which skills the next agent should call.
- Reference existing files, specs, plans, ADRs, issues, and commit SHAs by path instead of duplicating text.
- Redact all secrets, API keys, passwords, and credentials.
- If the user passed arguments, tailor the summary directly to those goals.

### 2. Immediate Subagent Handoff
If the user requests to continue immediately in the background:
- Launch a subagent using `invoke_subagent` with `TypeName: "self"` (or a specialized subagent), `Model: "inherit"`, and `Workspace: "inherit"` (or `"branch"` if isolating code changes).
- Seed the subagent prompt with the handoff summary, context pointers, and goals.
- Stop calling tools to let Antigravity's reactive notification handle completion.

