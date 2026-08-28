---
layout: default
title: "Sandbox | AI Coding Dictionary"
description: "An isolated environment the agent runs inside, container, VM, or restricted shell. Limits the blast radius of agent actions."
permalink: /dictionary/sandbox/
category: dictionary
keywords: ["ai coding", "dictionary", "sandbox", "sandboxing", "sandbox / sandboxing"]
---

# Sandbox

An isolated [environment](https://fderuiter.github.io/agy-skills/dictionary/environment) the [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) runs inside, a container, VM, ephemeral [filesystem](https://fderuiter.github.io/agy-skills/dictionary/filesystem), or restricted-permission shell. Limits the blast radius of agent actions: even if the agent runs destructive commands or fetches something malicious, the damage is contained. The safety substrate that makes [AFK](https://fderuiter.github.io/agy-skills/dictionary/afk) practical.

The sandbox and the [permission mode](https://fderuiter.github.io/agy-skills/dictionary/permission-mode) solve the same problem from opposite ends. Permissions ask before an action runs; a sandbox limits what the action can reach if it does run. Permissions need you running [in the loop](https://fderuiter.github.io/agy-skills/dictionary/human-in-the-loop), every prompt is an interruption, and a session that asks constantly is barely autonomous. A sandbox spends infrastructure instead of attention: the stronger the isolation, the fewer questions need asking.

Isolation comes in grades:

| Grade            | What it is                                                 | What it contains                           |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------ |
| Restricted shell | OS-level confinement around each command                   | Writes outside the project, network access |
| Container        | Fresh filesystem, no credentials mounted, discarded after  | Anything the agent does to its own machine |
| VM / cloud       | A separate machine entirely, often provided by the harness | Everything, including kernel-level escapes |

What no sandbox contains: actions that leave it legitimately. An agent with your git credentials can push; one with network access can call production APIs. Decide what crosses the boundary before deciding how thick to make it.

_Usage:_

"I want to let it run [bypass-permissions](https://fderuiter.github.io/agy-skills/dictionary/agent-mode) overnight but I'm not ready for that."

"Put it in a sandbox, fresh container, no credentials mounted, no network out. Worst case it nukes its own filesystem and you discard the container."

---

[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)
