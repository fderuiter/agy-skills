# Skill mechanics

The skill-specific branch of [`writing-for-agents`](SKILL.md): what changes when the document is a skill (frontmatter, the invocation choice, and router skills). Everything else about writing it is the universal reference in `SKILL.md`.

## Invocation

Two choices, trading the two loads:

- A **model-invoked** skill provides a model-facing `description`, so Antigravity can activate it autonomously when relevant, and other skills can call it. You can still type its name: model-invocation always _includes_ user reach; a rich description adds agent discovery while preserving user invocation. The description is the skill's top-level context pointer, evaluated by the model: context-efficient progressive disclosure in exchange for autonomous discoverability. Mechanics: write a model-facing description carrying the trigger branches (the pointer-writing rules in `SKILL.md` apply in full).
- A **user-invoked** skill is designed for direct execution by the developer via slash commands: only the human typing its name triggers the primary workflow. Mechanics: write a human-facing `description` starting with `User-invoked.` followed by a concise summary, with trigger lists stripped.

Pick model-invocation only when the agent must reach the skill on its own, or another skill must. If it only ever fires by hand, make it user-invoked and keep the description concise.

Shared reference that two user-invoked skills both need can live in a dedicated shared document: external reference any skill can point at via a context pointer.

## Splitting by invocation

The invocation cut of splitting (the sequence cut lives in `SKILL.md`): split off a model-invoked skill when you have a distinct leading word that should trigger it on its own (a trigger word you actually use in your prompts), or another skill must reach it. You pay context load for the new always-loaded description, so that independent reach has to be worth it.

## Router skills

When user-invoked skills multiply past what you can remember, that piled-up cognitive load is cured by a **router skill**: one user-invoked skill that names the others and when to reach for each, so the human has one skill to remember instead of many. It can only hint, never fire them: user-invoked skills have no description, so nothing but the human can reach them.
