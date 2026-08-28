---
layout: default
title: "AI Coding Dictionary | Common Vocabulary for Agentic Development"
description: "A comprehensive reference dictionary of essential terms, mechanics, and concepts for AI-assisted and agentic software development."
permalink: /dictionary/
category: dictionary
keywords: ["ai coding", "dictionary", "agentic coding", "glossary", "antigravity"]
---

# AI Coding Dictionary

The shared vocabulary for AI-assisted engineering and agentic software development. Each term provides a plain-language definition, operational mechanics, practical usage, and cross-references to relevant skills in **agy-skills**.

---

## Sections

### Section 1: The Model

| Term | Definition |
| --- | --- |
| [**AI**](https://fderuiter.github.io/agy-skills/dictionary/ai) | A moving label, not a technology. Points at whatever computers can newly, impressively do, right now, large language models. |
| [**Model**](https://fderuiter.github.io/agy-skills/dictionary/model) | The parameters. Stateless, does next-token prediction and nothing else. Cannot do anything agentic on its own. |
| [**Parameters**](https://fderuiter.github.io/agy-skills/dictionary/parameters) | The numbers inside a model, often billions, tuned during training. Everything the model knows lives in them. Also called weights. |
| [**Training**](https://fderuiter.github.io/agy-skills/dictionary/training) | The process that sets a model's parameters by exposing it to vast amounts of text and adjusting to improve next-token prediction. |
| [**Inference**](https://fderuiter.github.io/agy-skills/dictionary/inference) | Running a trained model to generate output, what happens on every model provider request. Parameters stay fixed. |
| [**Effort**](https://fderuiter.github.io/agy-skills/dictionary/effort) | A dial for how much reasoning the model does before it answers. More effort spends more output tokens for a better shot at hard problems. |
| [**Token**](https://fderuiter.github.io/agy-skills/dictionary/token) | The atomic unit a model reads and writes. Roughly word-sized but not exactly. Context window size, cost, and latency all count tokens. |
| [**Next-token prediction**](https://fderuiter.github.io/agy-skills/dictionary/next-token-prediction) | What the model actually does. Samples one next token from the context, appends it, and runs again. Its only mode of operation. |
| [**Non-determinism**](https://fderuiter.github.io/agy-skills/dictionary/non-determinism) | The same input can produce different output. A property of how models generate text and how providers serve requests. |
| [**Model provider**](https://fderuiter.github.io/agy-skills/dictionary/model-provider) | Whatever serves a model for inference. Usually remote (Anthropic, OpenAI, Google), but can also be local (Ollama, llama.cpp). |
| [**Harness**](https://fderuiter.github.io/agy-skills/dictionary/harness) | Everything around the model that turns it into an agent: tools, system prompt, context-window management, permissions, hooks. |
| [**Model provider request**](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request) | One round-trip from the harness to the model provider. The harness sends context; the provider returns one response. |
| [**Input tokens**](https://fderuiter.github.io/agy-skills/dictionary/input-tokens) | Tokens the harness sends on each model provider request. Billed at a lower rate than output tokens. |
| [**Output tokens**](https://fderuiter.github.io/agy-skills/dictionary/output-tokens) | Tokens the model generates back. Billed at a higher rate than input tokens, since they cost more compute to produce. |
| [**Prefix cache**](https://fderuiter.github.io/agy-skills/dictionary/prefix-cache) | The provider-side store that lets consecutive requests skip re-processing a shared prefix, billing those tokens at a lower rate. |
| [**Cache tokens**](https://fderuiter.github.io/agy-skills/dictionary/cache-tokens) | Input tokens the provider has cached from a previous request via its prefix cache, billed at a much lower rate. |

### Section 2: Sessions, Context Windows & Turns

| Term | Definition |
| --- | --- |
| [**Stateless**](https://fderuiter.github.io/agy-skills/dictionary/stateless) | Carries no information forward. The model is stateless across requests; an agent is stateless across sessions by default. |
| [**Context**](https://fderuiter.github.io/agy-skills/dictionary/context) | The relevant information the agent has access to right now, what the agent knows that's pertinent to the task. |
| [**Context window**](https://fderuiter.github.io/agy-skills/dictionary/context-window) | Everything the model sees on each model provider request. Finite, model-specific, the only surface through which the model perceives. |
| [**Stateful**](https://fderuiter.github.io/agy-skills/dictionary/stateful) | Carries information forward. Sessions are stateful across turns; agents can be made stateful across sessions via a memory system. |
| [**Agent**](https://fderuiter.github.io/agy-skills/dictionary/agent) | A model harnessed with tools, a system prompt, and a context window, that takes turns with a user. The model in motion. |
| [**System prompt**](https://fderuiter.github.io/agy-skills/dictionary/system-prompt) | The instructions the harness prepends to every model provider request, the agent's standing brief. Usually stable across a session. |
| [**Session**](https://fderuiter.github.io/agy-skills/dictionary/session) | One bounded run of interaction with an agent. Starts empty, accumulates, ends when cleared, closed, or compacted into a fresh session. |
| [**Turn**](https://fderuiter.github.io/agy-skills/dictionary/turn) | One user message plus everything the agent does in response, up until it yields back to the user. Contains one or more provider requests. |

### Section 3: Tools & Environment

| Term | Definition |
| --- | --- |
| [**Environment**](https://fderuiter.github.io/agy-skills/dictionary/environment) | The world the agent acts on, anything outside the harness that the agent perceives via tool results and changes via tool calls. |
| [**Filesystem**](https://fderuiter.github.io/agy-skills/dictionary/filesystem) | A tree of files and directories the agent reads from, writes to, and executes within, the default environment for a coding agent. |
| [**Tool**](https://fderuiter.github.io/agy-skills/dictionary/tool) | A function the harness exposes for the agent to call, Read, Write, Bash, Search. How an agent perceives and acts on the environment. |
| [**Tool call**](https://fderuiter.github.io/agy-skills/dictionary/tool-call) | The model's output naming a tool and its arguments, just structured text. The harness has to read it and execute. |
| [**Tool result**](https://fderuiter.github.io/agy-skills/dictionary/tool-result) | What the harness sends back after executing a tool call, file contents, output, or error. The agent's only view of the environment. |
| [**MCP**](https://fderuiter.github.io/agy-skills/dictionary/mcp) | A protocol for plugging external tool servers into a harness, how an agent gets tools beyond what the harness ships with. |
| [**Permission request**](https://fderuiter.github.io/agy-skills/dictionary/permission-request) | What the harness shows the user before executing a tool call that isn't pre-approved. The mechanism for putting a human in the loop. |
| [**Permission mode**](https://fderuiter.github.io/agy-skills/dictionary/permission-mode) | The permission-gating slice of an agent mode, which tool calls trigger a permission request and which run automatically. |
| [**Agent mode**](https://fderuiter.github.io/agy-skills/dictionary/agent-mode) | A preset bundling a permission mode with behavioral instructions injected into the system prompt. Can flip mid-session. |
| [**Sandbox**](https://fderuiter.github.io/agy-skills/dictionary/sandbox) | An isolated environment the agent runs inside, container, VM, or restricted shell. Limits the blast radius of agent actions. |

### Section 4: Failure Modes

| Term | Definition |
| --- | --- |
| [**Sycophancy**](https://fderuiter.github.io/agy-skills/dictionary/sycophancy) | Confidently agreeable model output. Caused by training that shaped the model to favor answers humans liked, including agreement. |
| [**Hallucination**](https://fderuiter.github.io/agy-skills/dictionary/hallucination) | Confidently-wrong model output. Two flavors: factuality (invented facts) and faithfulness (drift from loaded context). |
| [**Parametric knowledge**](https://fderuiter.github.io/agy-skills/dictionary/parametric-knowledge) | What the model knows from training, stored in its parameters. Frozen at training time. Counterpart to contextual knowledge. |
| [**Knowledge cutoff**](https://fderuiter.github.io/agy-skills/dictionary/knowledge-cutoff) | The date past which a model has no parametric knowledge. Post-cutoff libraries and APIs are fabrication traps unless docs are loaded. |
| [**Contextual knowledge**](https://fderuiter.github.io/agy-skills/dictionary/contextual-knowledge) | Facts the agent can read directly from the context right now. Counterpart to parametric knowledge. |
| [**Attention relationship**](https://fderuiter.github.io/agy-skills/dictionary/attention-relationship) | The pairing between two tokens, meaningful pairs influence each other more than unrelated ones. A context of N tokens has ~N² of these. |
| [**Attention budget**](https://fderuiter.github.io/agy-skills/dictionary/attention-budget) | Each token has a finite amount of influence to distribute across the rest of the context. Per-token, doesn't grow when context does. |
| [**Attention degradation**](https://fderuiter.github.io/agy-skills/dictionary/attention-degradation) | As a session grows, each token's attention budget spreads across more competitors; signal on meaningful relationships shrinks. |
| [**Smart zone**](https://fderuiter.github.io/agy-skills/dictionary/smart-zone) | Early in a session the agent is sharp and focused. As the session grows it drifts into a dumb zone: sloppier, forgetful, more mistakes. |

### Section 5: Handoffs

| Term | Definition |
| --- | --- |
| [**Clearing**](https://fderuiter.github.io/agy-skills/dictionary/clearing) | Ending the current session and starting a fresh one. The next message begins with an empty session and an empty context window. |
| [**Handoff**](https://fderuiter.github.io/agy-skills/dictionary/handoff) | Transferring agent context from one session to another, with no return path. Carry mechanism varies, artifact, compaction, others. |
| [**Primary source**](https://fderuiter.github.io/agy-skills/dictionary/primary-source) | The thing itself, code, transcripts, raw data. Complete and authoritative, but expensive to load into context. |
| [**Secondary source**](https://fderuiter.github.io/agy-skills/dictionary/secondary-source) | An account of a primary source, one step removed, summaries, docs, compaction summaries. Cheap to load, lossy by construction. |
| [**Handoff artifact**](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact) | A document used as the carry mechanism for a handoff, written by one session to be read by another. |
| [**Spec**](https://fderuiter.github.io/agy-skills/dictionary/spec) | A handoff artifact describing a multi-session piece of work, what's being built, not how each session does its share. Made of tickets. |
| [**Ticket**](https://fderuiter.github.io/agy-skills/dictionary/ticket) | A handoff artifact scoping one session of work. Stands alone or hangs off a spec. Can block or be blocked by sibling tickets. |
| [**Compaction**](https://fderuiter.github.io/agy-skills/dictionary/compaction) | A handoff done in-memory: the previous session's history is summarised and seeds a fresh session. Lossy, detail traded for headroom. |
| [**Autocompact**](https://fderuiter.github.io/agy-skills/dictionary/autocompact) | Compaction triggered automatically by the harness when the context window approaches full. |

### Section 6: Memory and Steering

| Term | Definition |
| --- | --- |
| [**Memory system**](https://fderuiter.github.io/agy-skills/dictionary/memory-system) | A system that attempts to make an agent stateful across sessions by persisting to the environment and reloading at session start. |
| [**AGENTS.md**](https://fderuiter.github.io/agy-skills/dictionary/agents-md) | A file in the environment that the harness loads into the context window at session start, the project's standing brief to the agent. |
| [**Progressive disclosure**](https://fderuiter.github.io/agy-skills/dictionary/progressive-disclosure) | Loading only the context an agent needs right now, with context pointers to the rest. Borrowed from UI design. |
| [**Context pointer**](https://fderuiter.github.io/agy-skills/dictionary/context-pointer) | A mention in one document that points to another, so the agent can pull it into context only when the task calls for it. |
| [**Skill**](https://fderuiter.github.io/agy-skills/dictionary/skill) | A teachable capability bundled as a unit, kept out of the context window until a context pointer pulls it in for the task at hand. |
| [**Subagent**](https://fderuiter.github.io/agy-skills/dictionary/subagent) | An agent spawned by another agent via a tool call. Runs in its own session, reports a single tool result. Cannot spawn further subagents. |

### Section 7: Patterns of Work

| Term | Definition |
| --- | --- |
| [**Human-in-the-loop**](https://fderuiter.github.io/agy-skills/dictionary/human-in-the-loop) | A working pattern where one or more humans pair with the agent during a session, reviewing, redirecting, or collaborating in real time. |
| [**AFK**](https://fderuiter.github.io/agy-skills/dictionary/afk) | A working pattern where the user kicks off a session and leaves the agent to run unattended (away from keyboard). |
| [**Automated check**](https://fderuiter.github.io/agy-skills/dictionary/automated-check) | A deterministic verification that runs in the environment, tests, type checks, lints, build, pre-commit hooks. Pass/fail, no judgement. |
| [**Automated review**](https://fderuiter.github.io/agy-skills/dictionary/automated-review) | An agent reviewing another agent's work, often with a different model or system prompt. Non-deterministic: it forms a judgement. |
| [**Human review**](https://fderuiter.github.io/agy-skills/dictionary/human-review) | The user reading the code the agent produced and forming a judgement on it. Reading the diff counts; reading the summary doesn't. |
| [**Vibe coding**](https://fderuiter.github.io/agy-skills/dictionary/vibe-coding) | A working pattern where the user accepts the agent's code without human review. The diff is treated as opaque. |
| [**Design concept**](https://fderuiter.github.io/agy-skills/dictionary/design-concept) | The shared understanding of what's being built, held in common between user and agent but separate from any asset. |
| [**Grilling**](https://fderuiter.github.io/agy-skills/dictionary/grilling) | A technique for developing a design concept: the agent interviews the user Socratically, one decision at a time. |
| [**Prototyping**](https://fderuiter.github.io/agy-skills/dictionary/prototyping) | Having the agent build a quick, rough version when conversation is too low-fidelity and you need a real artifact to talk about. |
| [**DX**](https://fderuiter.github.io/agy-skills/dictionary/dx) | Developer experience: how easy a codebase and its toolchain make it for humans to do good work, docs, feedback speed, errors. |
| [**AX**](https://fderuiter.github.io/agy-skills/dictionary/ax) | Agent experience: how well the environment is set up for an agent to do good work, checks, architecture, and free context. |


---

## Alphabetical Index


### A

- [**AFK**](https://fderuiter.github.io/agy-skills/dictionary/afk): A working pattern where the user kicks off a session and leaves the agent to run unattended (away from keyboard).
- [**Agent**](https://fderuiter.github.io/agy-skills/dictionary/agent): A model harnessed with tools, a system prompt, and a context window, that takes turns with a user. The model in motion.
- [**Agent mode**](https://fderuiter.github.io/agy-skills/dictionary/agent-mode): A preset bundling a permission mode with behavioral instructions injected into the system prompt. Can flip mid-session.
- [**AGENTS.md**](https://fderuiter.github.io/agy-skills/dictionary/agents-md): A file in the environment that the harness loads into the context window at session start, the project's standing brief to the agent.
- [**AI**](https://fderuiter.github.io/agy-skills/dictionary/ai): A moving label, not a technology. Points at whatever computers can newly, impressively do, right now, large language models.
- [**Attention budget**](https://fderuiter.github.io/agy-skills/dictionary/attention-budget): Each token has a finite amount of influence to distribute across the rest of the context. Per-token, doesn't grow when context does.
- [**Attention degradation**](https://fderuiter.github.io/agy-skills/dictionary/attention-degradation): As a session grows, each token's attention budget spreads across more competitors; signal on meaningful relationships shrinks.
- [**Attention relationship**](https://fderuiter.github.io/agy-skills/dictionary/attention-relationship): The pairing between two tokens, meaningful pairs influence each other more than unrelated ones. A context of N tokens has ~N² of these.
- [**Autocompact**](https://fderuiter.github.io/agy-skills/dictionary/autocompact): Compaction triggered automatically by the harness when the context window approaches full.
- [**Automated check**](https://fderuiter.github.io/agy-skills/dictionary/automated-check): A deterministic verification that runs in the environment, tests, type checks, lints, build, pre-commit hooks. Pass/fail, no judgement.
- [**Automated review**](https://fderuiter.github.io/agy-skills/dictionary/automated-review): An agent reviewing another agent's work, often with a different model or system prompt. Non-deterministic: it forms a judgement.
- [**AX**](https://fderuiter.github.io/agy-skills/dictionary/ax): Agent experience: how well the environment is set up for an agent to do good work, checks, architecture, and free context.

### C

- [**Cache tokens**](https://fderuiter.github.io/agy-skills/dictionary/cache-tokens): Input tokens the provider has cached from a previous request via its prefix cache, billed at a much lower rate.
- [**Clearing**](https://fderuiter.github.io/agy-skills/dictionary/clearing): Ending the current session and starting a fresh one. The next message begins with an empty session and an empty context window.
- [**Compaction**](https://fderuiter.github.io/agy-skills/dictionary/compaction): A handoff done in-memory: the previous session's history is summarised and seeds a fresh session. Lossy, detail traded for headroom.
- [**Context**](https://fderuiter.github.io/agy-skills/dictionary/context): The relevant information the agent has access to right now, what the agent knows that's pertinent to the task.
- [**Context pointer**](https://fderuiter.github.io/agy-skills/dictionary/context-pointer): A mention in one document that points to another, so the agent can pull it into context only when the task calls for it.
- [**Context window**](https://fderuiter.github.io/agy-skills/dictionary/context-window): Everything the model sees on each model provider request. Finite, model-specific, the only surface through which the model perceives.
- [**Contextual knowledge**](https://fderuiter.github.io/agy-skills/dictionary/contextual-knowledge): Facts the agent can read directly from the context right now. Counterpart to parametric knowledge.

### D

- [**Design concept**](https://fderuiter.github.io/agy-skills/dictionary/design-concept): The shared understanding of what's being built, held in common between user and agent but separate from any asset.
- [**DX**](https://fderuiter.github.io/agy-skills/dictionary/dx): Developer experience: how easy a codebase and its toolchain make it for humans to do good work, docs, feedback speed, errors.

### E

- [**Effort**](https://fderuiter.github.io/agy-skills/dictionary/effort): A dial for how much reasoning the model does before it answers. More effort spends more output tokens for a better shot at hard problems.
- [**Environment**](https://fderuiter.github.io/agy-skills/dictionary/environment): The world the agent acts on, anything outside the harness that the agent perceives via tool results and changes via tool calls.

### F

- [**Filesystem**](https://fderuiter.github.io/agy-skills/dictionary/filesystem): A tree of files and directories the agent reads from, writes to, and executes within, the default environment for a coding agent.

### G

- [**Grilling**](https://fderuiter.github.io/agy-skills/dictionary/grilling): A technique for developing a design concept: the agent interviews the user Socratically, one decision at a time.

### H

- [**Hallucination**](https://fderuiter.github.io/agy-skills/dictionary/hallucination): Confidently-wrong model output. Two flavors: factuality (invented facts) and faithfulness (drift from loaded context).
- [**Handoff**](https://fderuiter.github.io/agy-skills/dictionary/handoff): Transferring agent context from one session to another, with no return path. Carry mechanism varies, artifact, compaction, others.
- [**Handoff artifact**](https://fderuiter.github.io/agy-skills/dictionary/handoff-artifact): A document used as the carry mechanism for a handoff, written by one session to be read by another.
- [**Harness**](https://fderuiter.github.io/agy-skills/dictionary/harness): Everything around the model that turns it into an agent: tools, system prompt, context-window management, permissions, hooks.
- [**Human review**](https://fderuiter.github.io/agy-skills/dictionary/human-review): The user reading the code the agent produced and forming a judgement on it. Reading the diff counts; reading the summary doesn't.
- [**Human-in-the-loop**](https://fderuiter.github.io/agy-skills/dictionary/human-in-the-loop): A working pattern where one or more humans pair with the agent during a session, reviewing, redirecting, or collaborating in real time.

### I

- [**Inference**](https://fderuiter.github.io/agy-skills/dictionary/inference): Running a trained model to generate output, what happens on every model provider request. Parameters stay fixed.
- [**Input tokens**](https://fderuiter.github.io/agy-skills/dictionary/input-tokens): Tokens the harness sends on each model provider request. Billed at a lower rate than output tokens.

### K

- [**Knowledge cutoff**](https://fderuiter.github.io/agy-skills/dictionary/knowledge-cutoff): The date past which a model has no parametric knowledge. Post-cutoff libraries and APIs are fabrication traps unless docs are loaded.

### M

- [**MCP**](https://fderuiter.github.io/agy-skills/dictionary/mcp): A protocol for plugging external tool servers into a harness, how an agent gets tools beyond what the harness ships with.
- [**Memory system**](https://fderuiter.github.io/agy-skills/dictionary/memory-system): A system that attempts to make an agent stateful across sessions by persisting to the environment and reloading at session start.
- [**Model**](https://fderuiter.github.io/agy-skills/dictionary/model): The parameters. Stateless, does next-token prediction and nothing else. Cannot do anything agentic on its own.
- [**Model provider**](https://fderuiter.github.io/agy-skills/dictionary/model-provider): Whatever serves a model for inference. Usually remote (Anthropic, OpenAI, Google), but can also be local (Ollama, llama.cpp).
- [**Model provider request**](https://fderuiter.github.io/agy-skills/dictionary/model-provider-request): One round-trip from the harness to the model provider. The harness sends context; the provider returns one response.

### N

- [**Next-token prediction**](https://fderuiter.github.io/agy-skills/dictionary/next-token-prediction): What the model actually does. Samples one next token from the context, appends it, and runs again. Its only mode of operation.
- [**Non-determinism**](https://fderuiter.github.io/agy-skills/dictionary/non-determinism): The same input can produce different output. A property of how models generate text and how providers serve requests.

### O

- [**Output tokens**](https://fderuiter.github.io/agy-skills/dictionary/output-tokens): Tokens the model generates back. Billed at a higher rate than input tokens, since they cost more compute to produce.

### P

- [**Parameters**](https://fderuiter.github.io/agy-skills/dictionary/parameters): The numbers inside a model, often billions, tuned during training. Everything the model knows lives in them. Also called weights.
- [**Parametric knowledge**](https://fderuiter.github.io/agy-skills/dictionary/parametric-knowledge): What the model knows from training, stored in its parameters. Frozen at training time. Counterpart to contextual knowledge.
- [**Permission mode**](https://fderuiter.github.io/agy-skills/dictionary/permission-mode): The permission-gating slice of an agent mode, which tool calls trigger a permission request and which run automatically.
- [**Permission request**](https://fderuiter.github.io/agy-skills/dictionary/permission-request): What the harness shows the user before executing a tool call that isn't pre-approved. The mechanism for putting a human in the loop.
- [**Prefix cache**](https://fderuiter.github.io/agy-skills/dictionary/prefix-cache): The provider-side store that lets consecutive requests skip re-processing a shared prefix, billing those tokens at a lower rate.
- [**Primary source**](https://fderuiter.github.io/agy-skills/dictionary/primary-source): The thing itself, code, transcripts, raw data. Complete and authoritative, but expensive to load into context.
- [**Progressive disclosure**](https://fderuiter.github.io/agy-skills/dictionary/progressive-disclosure): Loading only the context an agent needs right now, with context pointers to the rest. Borrowed from UI design.
- [**Prototyping**](https://fderuiter.github.io/agy-skills/dictionary/prototyping): Having the agent build a quick, rough version when conversation is too low-fidelity and you need a real artifact to talk about.

### S

- [**Sandbox**](https://fderuiter.github.io/agy-skills/dictionary/sandbox): An isolated environment the agent runs inside, container, VM, or restricted shell. Limits the blast radius of agent actions.
- [**Secondary source**](https://fderuiter.github.io/agy-skills/dictionary/secondary-source): An account of a primary source, one step removed, summaries, docs, compaction summaries. Cheap to load, lossy by construction.
- [**Session**](https://fderuiter.github.io/agy-skills/dictionary/session): One bounded run of interaction with an agent. Starts empty, accumulates, ends when cleared, closed, or compacted into a fresh session.
- [**Skill**](https://fderuiter.github.io/agy-skills/dictionary/skill): A teachable capability bundled as a unit, kept out of the context window until a context pointer pulls it in for the task at hand.
- [**Smart zone**](https://fderuiter.github.io/agy-skills/dictionary/smart-zone): Early in a session the agent is sharp and focused. As the session grows it drifts into a dumb zone: sloppier, forgetful, more mistakes.
- [**Spec**](https://fderuiter.github.io/agy-skills/dictionary/spec): A handoff artifact describing a multi-session piece of work, what's being built, not how each session does its share. Made of tickets.
- [**Stateful**](https://fderuiter.github.io/agy-skills/dictionary/stateful): Carries information forward. Sessions are stateful across turns; agents can be made stateful across sessions via a memory system.
- [**Stateless**](https://fderuiter.github.io/agy-skills/dictionary/stateless): Carries no information forward. The model is stateless across requests; an agent is stateless across sessions by default.
- [**Subagent**](https://fderuiter.github.io/agy-skills/dictionary/subagent): An agent spawned by another agent via a tool call. Runs in its own session, reports a single tool result. Cannot spawn further subagents.
- [**Sycophancy**](https://fderuiter.github.io/agy-skills/dictionary/sycophancy): Confidently agreeable model output. Caused by training that shaped the model to favor answers humans liked, including agreement.
- [**System prompt**](https://fderuiter.github.io/agy-skills/dictionary/system-prompt): The instructions the harness prepends to every model provider request, the agent's standing brief. Usually stable across a session.

### T

- [**Ticket**](https://fderuiter.github.io/agy-skills/dictionary/ticket): A handoff artifact scoping one session of work. Stands alone or hangs off a spec. Can block or be blocked by sibling tickets.
- [**Token**](https://fderuiter.github.io/agy-skills/dictionary/token): The atomic unit a model reads and writes. Roughly word-sized but not exactly. Context window size, cost, and latency all count tokens.
- [**Tool**](https://fderuiter.github.io/agy-skills/dictionary/tool): A function the harness exposes for the agent to call, Read, Write, Bash, Search. How an agent perceives and acts on the environment.
- [**Tool call**](https://fderuiter.github.io/agy-skills/dictionary/tool-call): The model's output naming a tool and its arguments, just structured text. The harness has to read it and execute.
- [**Tool result**](https://fderuiter.github.io/agy-skills/dictionary/tool-result): What the harness sends back after executing a tool call, file contents, output, or error. The agent's only view of the environment.
- [**Training**](https://fderuiter.github.io/agy-skills/dictionary/training): The process that sets a model's parameters by exposing it to vast amounts of text and adjusting to improve next-token prediction.
- [**Turn**](https://fderuiter.github.io/agy-skills/dictionary/turn): One user message plus everything the agent does in response, up until it yields back to the user. Contains one or more provider requests.

### V

- [**Vibe coding**](https://fderuiter.github.io/agy-skills/dictionary/vibe-coding): A working pattern where the user accepts the agent's code without human review. The diff is treated as opaque.


---

[Back to Skills Home](https://fderuiter.github.io/agy-skills/)
