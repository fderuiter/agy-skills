---
layout: default
title: "Permission mode | AI Coding Dictionary"
description: "The permission-gating slice of an agent mode, which tool calls trigger a permission request and which run automatically."
permalink: /dictionary/permission-mode/
category: dictionary
keywords: ["ai coding", "dictionary", "permission mode"]
---

# Permission mode

The permission-gating slice of an [agent mode](https://fderuiter.github.io/agy-skills/dictionary/agent-mode), which [tool calls](https://fderuiter.github.io/agy-skills/dictionary/tool-call) trigger a [permission request](https://fderuiter.github.io/agy-skills/dictionary/permission-request) and which run automatically. The original purpose of mode systems before [harnesses](https://fderuiter.github.io/agy-skills/dictionary/harness) started bundling behavioral instructions on top.

Harnesses ship a ladder of these modes:

| Mode               | Reads | Writes & shell         | Typical use                                     |
| ------------------ | ----- | ---------------------- | ----------------------------------------------- |
| Read-only / plan   | Auto  | Blocked                | Research, planning, reviewing                   |
| Default            | Auto  | Ask                    | Day-to-day supervised work                      |
| Auto-edit          | Auto  | Edits auto, shell asks | Trusted repos, mechanical changes               |
| "Yolo" / full-auto | Auto  | Auto                   | [Sandboxes](https://fderuiter.github.io/agy-skills/dictionary/sandbox), [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) runs |

Choosing a rung is a trade between safety and interruption, and both failure modes are felt. Too tight, and you become the bottleneck: the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) stops every few seconds for harmless reads, you click approve on autopilot, and the approvals stop meaning anything, rubber-stamping is the worst of both worlds, all the interruption with none of the protection. Too loose, and the agent edits files and runs commands you'd have wanted to see first.

The loose end is most defensible inside a sandbox, where the blast radius of a bad [tool](https://fderuiter.github.io/agy-skills/dictionary/tool) call is contained. Outside one, most people settle on auto-approving reads and keeping a [human in the loop](https://fderuiter.github.io/agy-skills/dictionary/human-in-the-loop) for anything irreversible.

_Usage:_

"It paused on every grep, totally killed the AFK run."

"Loosen the permission mode for read-only tools, keep prompting on writes and shell. Most permission requests on a research [session](https://fderuiter.github.io/agy-skills/dictionary/session) are noise."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
