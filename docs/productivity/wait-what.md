---
title: "wait-what: Agent Misunderstanding Clarification | agy-skills"
description: "Clarifies and re-pitches confusing agent explanations in plain language using your project's established ubiquitous vocabulary."
keywords: ["wait-what", "agent clarification", "explain simply", "plain language ai", "antigravity"]
permalink: /skills-wait-what/
---

## What it does

`wait-what` is what you type when a message didn't land. The [agent](https://fderuiter.github.io/agy-skills/dictionary/agent) then re-pitches what it just said. It adds the context you were missing, writes in plain English, and uses the vocabulary from your project's `CONTEXT.md`.

The skill is three lines long. That is the design, not an unfinished draft. Skills that fight verbosity fail by growing: a four-hundred-line concision skill still leaves the [model](https://fderuiter.github.io/agy-skills/dictionary/model) verbose, because the model reads the volume, not the plea. This one carries a single precise leading word and nothing else.

## When to reach for it

You invoke it by typing `/wait-what`. The agent will not reach for it on its own, and it shouldn't. Only you know when you stopped following.

Use it the second you notice you're skimming. The agent has drifted into jargon it invented, stacked five acronyms, or explained a decision whose premise you never saw. It fixes the conversation you're already in. To stop the jargon arriving at all, use [grill-with-docs](https://fderuiter.github.io/agy-skills/skills-grill-with-docs), which builds the shared language upfront.

## The name is the mechanism

```mermaid
flowchart TD
    ConfusedMsg(["Agent Emits Confusing, Verbose, or Jargon-Heavy Message"]) --> UserInvoke["User Types /wait-what\n('Comprehension failed here: pause and back up')"]
    
    UserInvoke --> ParseContext["Inspect Context & Identify Missing Premise"]
    
    ParseContext --> GroundVocab["Ground against CONTEXT.md & Plain English Rules\n(Clear syntax, explicit premise, project nouns)"]
    
    GroundVocab --> RePitch(["Re-Pitched Explanation\n- Shorter and clearer\n- Missing context added\n- Ubiquitous language restored"])
```

The leading word is **wait**. "Be concise" is an instruction about the agent's output, and the model obeys it by clipping words and losing you further. **Wait** is about *your* state. It says comprehension failed here. An agent that hears "be brief" writes telegrams. An agent that hears "wait, you lost me" backs up and explains.

That difference is the whole skill. Every popular fix for verbosity names the *output*: `/tldr`, `/no-fluff`, `/talk-normal`. The model over-corrects into a caveman register that is shorter and no clearer. Naming the *listener* asks for both halves at once: fewer words **and** the context you were missing.

The skill says re-pitch **that**, not "that last message". What lost you is usually bigger than one paragraph, so the agent decides how far back to go.

## It plugs into the language you already have

The body reuses the leading words already in your global `CLAUDE.md` and your project's `CONTEXT.md`. ASD-STE100 Simplified Technical English sets the register. The ubiquitous language supplies the nouns. The skill, `CLAUDE.md` and `CONTEXT.md` reach for the same [tokens](https://fderuiter.github.io/agy-skills/dictionary/token), so invoking it is not a new instruction. It is a reminder of one the agent already agreed to.

If you have no `CONTEXT.md` (and no `CONTEXT-MAP.md` pointing to one for the context at hand), the skill still works. You lose only the domain-vocabulary half.

## It's working if

- The re-pitch is **shorter and clearer**, not shorter and blunter.
- It adds the premise you were missing, instead of only deleting words.
- Project nouns replace invented ones. The terms in your `CONTEXT.md` come back.
- You can use it twice in a row, and it does not degrade into terseness.

## Where it fits

You can use `wait-what` at any point, in any conversation, inside any other skill. It repairs one message after the fact. The real cure is a shared language agreed upfront, and that is [grill-with-docs](https://fderuiter.github.io/agy-skills/skills-grill-with-docs): a [grilling](https://fderuiter.github.io/agy-skills/dictionary/grilling) session that runs [domain-modeling](https://fderuiter.github.io/agy-skills/skills-domain-modeling) as it goes, so the words you both use land in your `CONTEXT.md`. If you're unsure which skill fits the moment, [ask-fred](https://fderuiter.github.io/agy-skills/skills-ask-fred) routes you.
