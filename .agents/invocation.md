# Model-invoked vs user-invoked

Every `SKILL.md` in this repo is an Antigravity skill. The one axis that splits them is **invocation**, who reaches for it:

- **User-invoked**: reachable **primarily by the human invoking its slash command** (for example: `/triage`, `/to-spec`, `/implement`, `/retro`). The `description` in YAML frontmatter starts with `User-invoked.` followed by a clear, human-facing summary of the workflow.
- **Model-invoked**: reachable **autonomously by the model or explicitly by the user** (for example: `/tdd`, `/codebase-design`, `/domain-modeling`, `/code-review`). The `description` in YAML frontmatter is **model-facing** and carries rich trigger phrasing ("Use when the user wants...", "Use when creating or editing...", "Analyze...") so Antigravity activates the skill dynamically when relevant.

Bucket `README.md`s and the top-level `README.md` group entries into **User-invoked** and **Model-invoked**.

## Dependencies between them

Dependencies are expressed as an explicit instruction to **call the Skill tool** with the named skill (`Call the Skill tool with "grilling"`), not deep `../other-skill/FILE.md` cross-references, and not a bare `/skill`-style mention left for the model to interpret. Naming the tool is what gets it fired: Antigravity exposes skill invocation as a tool the model calls, and spelling that out gets a higher hit rate than dropping a `/name` into prose and hoping it is read as an instruction. Dropping the leading `/` also keeps the instruction explicit and deterministic. Shared reference docs live inside the skill that owns them; other skills reach that material by calling the Skill tool with it, not by linking across folders.

This is about **operative** instructions: a skill's own steps telling the agent to go run another skill right now. Router prose that just names skills for a human to pick from (`ask-fred`, bucket `README.md`s) is not invoking anything, so it keeps `/skill`-style names as plain labels.

The Skill tool takes one skill per call. A step that needs two skills is two calls, not one call with two names: say so (`Call the Skill tool twice, for "grilling" and "domain-modeling"`), not "call it with X and Y," which reads as a single call taking both.

This whole convention holds when the named skill is **model-invoked**. When a step's precondition is a user-invoked skill (e.g. `setup-agy-skills`), phrase it as an instruction for the human to act on: "tell the user to run `/setup-agy-skills`", rather than as an autonomous Skill tool call.

## Passive vs active domain work

Merely _reading_ `CONTEXT.md` for vocabulary is a one-line prose pointer, not the `domain-modeling` skill. Only the active build/sharpen discipline (challenge terms, edge-case scenarios, write ADRs, update `CONTEXT.md` inline) is `domain-modeling`.

