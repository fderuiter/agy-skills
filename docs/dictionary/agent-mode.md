---
layout: default
title: "Agent mode | AI Coding Dictionary"
description: "A preset bundling a permission mode with behavioral instructions injected into the system prompt. Can flip mid-session."
permalink: /dictionary/agent-mode/
category: dictionary
keywords: ["ai coding", "dictionary", "agent mode", "plan mode", "accept-edits"]
---

# Agent mode

A preset that shapes how the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) operates at runtime, bundles a [permission mode](https://fderuiter.github.io/agy-skills/dictionary/permission-mode) with behavioral instructions injected into the [system prompt](https://fderuiter.github.io/agy-skills/dictionary/system-prompt). Examples: a default that prompts on risky calls, a **plan mode** that blocks edits and steers the agent toward research, an **accept-edits** mode that auto-approves edits, a **bypass permissions** mode (colloquially **YOLO mode**) that auto-approves everything. Can flip [mid-session](https://fderuiter.github.io/agy-skills/dictionary/session).

The bundling is what distinguishes a mode from a bare permission setting. A permission mode is only a gate: it decides which [tool calls](https://fderuiter.github.io/agy-skills/dictionary/tool-call) go through. A gate alone produces an agent that wants to edit but can't, it proposes the write, gets blocked, and tries another way. The injected instructions remove the want: plan mode doesn't just block edits, it tells the agent it's in a planning phase, so it reads, asks, and proposes instead of straining against the gate. Gate and steer point the same direction.

In practice, you change mode as your trust changes over the course of a task. The same task can pass through several modes: plan mode while the approach is still being shaped, the prompting default for the first delicate edits, accept-edits once the agent has shown it understands the change, bypass for an [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) run inside a [sandbox](https://fderuiter.github.io/agy-skills/dictionary/sandbox). Changing mode costs you nothing: the conversation continues exactly where it was, with new permissions and new instructions. If you find yourself approving every prompt without reading it, the mode is set tighter than your actual trust; if you keep rejecting edits, it's set looser.

_Vendor terms:_ Claude Code calls these "permission modes," Codex calls them "approval modes", both predate behavioral bundling.

_Usage:_

"It keeps editing files when I just want a plan."

"Switch to plan mode, it'll block writes and stay in research."

"What about for the AFK run later?"

"Bypass mode, but only inside the sandbox."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
