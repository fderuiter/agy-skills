import fs from 'node:fs';
import path from 'node:path';

const DICT_API_URL = 'https://api.github.com/repos/mattpocock/dictionary-of-ai-coding/contents/dictionary';
const RAW_BASE_URL = 'https://raw.githubusercontent.com/mattpocock/dictionary-of-ai-coding/main/dictionary';
const DOCS_DIR = path.resolve('docs');
const DICT_DIR = path.join(DOCS_DIR, 'dictionary');

if (!fs.existsSync(DICT_DIR)) {
  fs.mkdirSync(DICT_DIR, { recursive: true });
}

// Map skill cross-references
const SKILL_CROSS_REFS = {
  'afk': [
    { name: 'wayfinder', desc: 'Runs multi-step planning and AFK explorations in parallel.' }
  ],
  'agents-md': [
    { name: 'writing-for-agents', desc: 'Reference rules for writing concise, high-signal agent instructions.' },
    { name: 'setup-agy-skills', desc: 'Sets up project-level Antigravity skills and AGENTS.md conventions.' }
  ],
  'automated-check': [
    { name: 'resolving-merge-conflicts', desc: 'Runs repo feedback loops and automated checks before committing.' },
    { name: 'tdd', desc: 'Enforces automated test-driven development cycles at defined seams.' }
  ],
  'automated-review': [
    { name: 'code-review', desc: 'Runs multi-agent code reviews on standards and spec compliance.' }
  ],
  'clearing': [
    { name: 'ask-fred', desc: 'Routes context management options and clearing decisions at phase boundaries.' },
    { name: 'handoff', desc: 'Creates portable handoff documents before clearing session context.' }
  ],
  'compaction': [
    { name: 'ask-fred', desc: 'Helps determine whether to compact, continue, or handoff at phase boundaries.' },
    { name: 'handoff', desc: 'Summarizes session state into a portable document when switching harnesses.' }
  ],
  'context-pointer': [
    { name: 'writing-for-agents', desc: 'Explains progressive disclosure and context pointers in agent docs.' }
  ],
  'grilling': [
    { name: 'grill-me', desc: 'Interviews you on an idea to resolve design decisions one by one.' },
    { name: 'grill-with-docs', desc: 'Conducts an architecture interview against an existing codebase.' },
    { name: 'wayfinder', desc: 'Decomposes complex efforts into structured decision tickets and grilling phases.' }
  ],
  'handoff': [
    { name: 'handoff', desc: 'Compacts the current session into a portable markdown document.' },
    { name: 'ask-fred', desc: 'Guides when to perform a handoff vs continuing in the current session.' }
  ],
  'handoff-artifact': [
    { name: 'handoff', desc: 'Generates a portable handoff artifact for a fresh agent session.' }
  ],
  'human-in-the-loop': [
    { name: 'diagnosing-bugs', desc: 'Includes HITL interactive script fallbacks for complex debugging.' },
    { name: 'wayfinder', desc: 'Marks tickets requiring human intervention and decisions as HITL.' }
  ],
  'mcp': [
    { name: 'setup-mcp', desc: 'Discovers and configures Model Context Protocol servers in Antigravity.' }
  ],
  'progressive-disclosure': [
    { name: 'writing-for-agents', desc: 'Designs documents with progressive disclosure so agents load details on demand.' },
    { name: 'codebase-design', desc: 'Modularizes software interfaces to hide implementation complexity.' }
  ],
  'prototyping': [
    { name: 'prototype', desc: 'Builds throwaway proof-of-concept code to answer concrete questions.' },
    { name: 'wayfinder', desc: 'Identifies uncertainty and charts prototype tickets to de-risk architectures.' }
  ],
  'skill': [
    { name: 'setup-agy-skills', desc: 'Configures project-level skills and tool harnesses in Antigravity.' },
    { name: 'writing-for-agents', desc: 'Provides rules for crafting predictable agent skills.' },
    { name: 'ask-fred', desc: 'The central router for finding and sequencing all skills in this repo.' }
  ],
  'smart-zone': [
    { name: 'ask-fred', desc: 'Monitors smart zone token limits and recommends compaction at boundaries.' }
  ],
  'spec': [
    { name: 'to-spec', desc: 'Transforms design discussions and plans into comprehensive technical specifications.' },
    { name: 'implement-spec', desc: 'Translates a specification directly into code with test coverage.' },
    { name: 'implement', desc: 'Drives test-driven implementation from approved specs and tickets.' }
  ],
  'subagent': [
    { name: 'code-review', desc: 'Uses parallel subagents to review standards and spec conformance independently.' },
    { name: 'codebase-design', desc: 'Dispatches parallel subagents to generate multiple interface designs.' },
    { name: 'research', desc: 'Spawns read-only subagents to investigate external documentation or code.' }
  ],
  'ticket': [
    { name: 'to-tickets', desc: 'Breaks down specifications into bite-sized, executable implementation tickets.' },
    { name: 'implement', desc: 'Executes implementation tickets one by one with TDD verification.' },
    { name: 'triage', desc: 'Categorizes and validates incoming issue reports and bugs.' },
    { name: 'wayfinder', desc: 'Charts decision tickets on an issue tracker to navigate architectural forks.' }
  ],
  'vibe-coding': [
    { name: 'prototype', desc: 'Rapidly explores ideas with quick proof-of-concept builds before formal design.' }
  ]
};

const SECTIONS = [
  {
    name: 'Section 1: The Model',
    slugs: ['ai', 'model', 'parameters', 'training', 'inference', 'effort', 'token', 'next-token-prediction', 'non-determinism', 'model-provider', 'harness', 'model-provider-request', 'input-tokens', 'output-tokens', 'prefix-cache', 'cache-tokens']
  },
  {
    name: 'Section 2: Sessions, Context Windows & Turns',
    slugs: ['stateless', 'context', 'context-window', 'stateful', 'agent', 'system-prompt', 'session', 'turn']
  },
  {
    name: 'Section 3: Tools & Environment',
    slugs: ['environment', 'filesystem', 'tool', 'tool-call', 'tool-result', 'mcp', 'permission-request', 'permission-mode', 'agent-mode', 'sandbox']
  },
  {
    name: 'Section 4: Failure Modes',
    slugs: ['sycophancy', 'hallucination', 'parametric-knowledge', 'knowledge-cutoff', 'contextual-knowledge', 'attention-relationship', 'attention-budget', 'attention-degradation', 'smart-zone']
  },
  {
    name: 'Section 5: Handoffs',
    slugs: ['clearing', 'handoff', 'primary-source', 'secondary-source', 'handoff-artifact', 'spec', 'ticket', 'compaction', 'autocompact']
  },
  {
    name: 'Section 6: Memory and Steering',
    slugs: ['memory-system', 'agents-md', 'progressive-disclosure', 'context-pointer', 'skill', 'subagent']
  },
  {
    name: 'Section 7: Patterns of Work',
    slugs: ['human-in-the-loop', 'afk', 'automated-check', 'automated-review', 'human-review', 'vibe-coding', 'design-concept', 'grilling', 'prototyping', 'dx', 'ax']
  }
];

function filenameToSlug(filename) {
  if (filename.toLowerCase().startsWith('agents.md')) return 'agents-md';
  let base = filename.replace(/\.md$/, '');
  if (base.endsWith('.md')) base = base.slice(0, -3);
  if (base.toLowerCase() === 'mcp') return 'mcp';
  if (base.toLowerCase() === 'afk') return 'afk';
  if (base.toLowerCase() === 'ai') return 'ai';
  if (base.toLowerCase() === 'ax') return 'ax';
  if (base.toLowerCase() === 'dx') return 'dx';
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function filenameToTitle(filename) {
  if (filename.toLowerCase().startsWith('agents.md')) return 'AGENTS.md';
  let base = filename.replace(/\.md$/, '');
  if (base.endsWith('.md')) base = base.slice(0, -3);
  if (base.toUpperCase() === 'AFK') return 'AFK';
  if (base.toUpperCase() === 'AI') return 'AI';
  if (base.toUpperCase() === 'AX') return 'AX';
  if (base.toUpperCase() === 'DX') return 'DX';
  if (base.toUpperCase() === 'MCP') return 'MCP';
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function removeEmDashes(text) {
  return text
    .replace(/\s*[\u2014—]\s*/g, ', ')
    .replace(/\s*&mdash;\s*/g, ', ')
    .replace(/(\w)\s*--\s*(\w)/g, '$1, $2');
}

async function fetchDictionary() {
  console.log('Fetching file list from GitHub API...');
  const res = await fetch(DICT_API_URL, {
    headers: { 'User-Agent': 'agy-skills-importer' }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch file list: ${res.status} ${res.statusText}`);
  }
  const files = await res.json();
  console.log(`Found ${files.length} files in dictionary.`);

  const terms = [];

  for (const file of files) {
    if (!file.name.endsWith('.md')) continue;
    const slug = filenameToSlug(file.name);
    const title = filenameToTitle(file.name);
    console.log(`Fetching ${file.name} (slug: ${slug})...`);
    
    const fileRes = await fetch(`${RAW_BASE_URL}/${encodeURIComponent(file.name)}`, {
      headers: { 'User-Agent': 'agy-skills-importer' }
    });
    if (!fileRes.ok) {
      console.error(`Failed to fetch ${file.name}`);
      continue;
    }
    const rawContent = await fileRes.text();
    terms.push({ name: file.name, slug, title, rawContent });
  }

  return terms;
}

function parseAndTransformTerm(term, allSlugs) {
  let content = term.rawContent;
  let description = '';
  let aliases = [];

  // Parse YAML frontmatter if present
  if (content.startsWith('---')) {
    const endFm = content.indexOf('\n---', 3);
    if (endFm !== -1) {
      const rawFm = content.slice(3, endFm).trim();
      content = content.slice(endFm + 4).trim();
      
      const descMatch = rawFm.match(/description:\s*(.+)/);
      if (descMatch) {
        description = descMatch[1].trim().replace(/^["']|["']$/g, '');
      }
      const aliasLines = rawFm.split('\n');
      let inAliases = false;
      for (const line of aliasLines) {
        if (line.trim().startsWith('aliases:')) {
          inAliases = true;
          continue;
        }
        if (inAliases) {
          if (line.trim().startsWith('-')) {
            aliases.push(line.trim().slice(1).trim().replace(/^["']|["']$/g, ''));
          } else if (line.match(/^[a-zA-Z0-9_-]+:/)) {
            inAliases = false;
          }
        }
      }
    }
  }

  // If description is missing or short, extract from first sentence of content
  if (!description || description.length < 40) {
    const firstPara = content.split('\n\n')[0] || '';
    const cleanFirstPara = firstPara.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
    const firstSentence = cleanFirstPara.split('.')[0] + '.';
    description = firstSentence.trim();
  }

  // Clean description of em-dashes and ensure length between 50 and 160 chars
  description = removeEmDashes(description);
  if (description.length < 50) {
    description = `Explanation and definition of ${term.title} in the AI Coding Dictionary.`;
  }
  if (description.length > 155) {
    description = description.slice(0, 150).replace(/[,;:\s]+$/, '') + '...';
  }

  // Transform markdown links:
  content = content.replace(/\[([^\]]+)\]\(\.\/([^)]+)\)/g, (match, linkText, targetFile) => {
    let cleanTarget = decodeURIComponent(targetFile);
    let targetSlug = filenameToSlug(cleanTarget);
    return `[${linkText}](https://fderuiter.github.io/agy-skills/dictionary/${targetSlug})`;
  });

  // Convert [text](#anchor) to internal dictionary link if matching slug
  content = content.replace(/\[([^\]]+)\]\(#([a-z0-9_-]+)\)/g, (match, linkText, anchor) => {
    let targetSlug = anchor.toLowerCase();
    if (targetSlug === 'agentsmd') targetSlug = 'agents-md';
    return `[${linkText}](https://fderuiter.github.io/agy-skills/dictionary/${targetSlug})`;
  });

  // Remove any aihero.dev newsletter promo or external links if present
  content = content.replace(/\[aihero\.dev\/newsletter\]\([^)]+\)/g, 'AI engineering resources');
  content = content.replace(/https?:\/\/(?:www\.)?aihero\.dev[^\s)\]"\']+/g, 'https://fderuiter.github.io/agy-skills/dictionary/');

  // Remove em-dashes
  content = removeEmDashes(content);

  // Build Keywords
  const keywords = ['ai coding', 'dictionary', term.title.toLowerCase()];
  if (aliases.length > 0) {
    for (const a of aliases) {
      if (!keywords.includes(a.toLowerCase())) keywords.push(a.toLowerCase());
    }
  }
  if (keywords.length < 3) keywords.push('antigravity', 'agent engineering');

  // Build Frontmatter
  const frontmatter = `---
layout: default
title: "${term.title} | AI Coding Dictionary"
description: "${description.replace(/"/g, '\\"')}"
permalink: /dictionary/${term.slug}/
category: dictionary
keywords: [${keywords.slice(0, 5).map(k => `"${k}"`).join(', ')}]
---`;

  // Build Cross-references if applicable
  let crossRefSection = '';
  const skills = SKILL_CROSS_REFS[term.slug];
  if (skills && skills.length > 0) {
    crossRefSection = `\n\n## Related skills in agy-skills\n\n`;
    for (const s of skills) {
      crossRefSection += `- [**${s.name}**](https://fderuiter.github.io/agy-skills/skills-${s.name}): ${removeEmDashes(s.desc)}\n`;
    }
  }

  const fileBody = `${frontmatter}\n\n# ${term.title}\n\n${content}${crossRefSection}\n\n---\n\n[Back to AI Coding Dictionary](https://fderuiter.github.io/agy-skills/dictionary/) | [Back to Home](https://fderuiter.github.io/agy-skills/)\n`;
  return { slug: term.slug, title: term.title, description, body: fileBody };
}

function generateIndexPage(processedTerms) {
  const termsMap = new Map();
  processedTerms.forEach(t => termsMap.set(t.slug, t));

  let sectionsMarkdown = '';
  const categorizedSlugs = new Set();

  for (const sec of SECTIONS) {
    sectionsMarkdown += `### ${sec.name}\n\n`;
    sectionsMarkdown += `| Term | Definition |\n| --- | --- |\n`;
    for (const slug of sec.slugs) {
      const term = termsMap.get(slug);
      if (term) {
        categorizedSlugs.add(slug);
        sectionsMarkdown += `| [**${term.title}**](https://fderuiter.github.io/agy-skills/dictionary/${term.slug}) | ${term.description} |\n`;
      }
    }
    sectionsMarkdown += `\n`;
  }

  // Any remaining terms
  const remaining = processedTerms.filter(t => !categorizedSlugs.has(t.slug));
  if (remaining.length > 0) {
    sectionsMarkdown += `### Additional Terms\n\n`;
    sectionsMarkdown += `| Term | Definition |\n| --- | --- |\n`;
    for (const term of remaining) {
      sectionsMarkdown += `| [**${term.title}**](https://fderuiter.github.io/agy-skills/dictionary/${term.slug}) | ${term.description} |\n`;
    }
    sectionsMarkdown += `\n`;
  }

  // Alphabetical Index
  const sorted = [...processedTerms].sort((a, b) => a.title.localeCompare(b.title));
  let alphabeticalMarkdown = `## Alphabetical Index\n\n`;
  let currentLetter = '';
  for (const term of sorted) {
    const letter = term.title.charAt(0).toUpperCase();
    if (letter !== currentLetter) {
      currentLetter = letter;
      alphabeticalMarkdown += `\n### ${currentLetter}\n\n`;
    }
    alphabeticalMarkdown += `- [**${term.title}**](https://fderuiter.github.io/agy-skills/dictionary/${term.slug}): ${term.description}\n`;
  }

  const indexContent = `---
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

${sectionsMarkdown}
---

${alphabeticalMarkdown}

---

[Back to Skills Home](https://fderuiter.github.io/agy-skills/)
`;

  return indexContent;
}

async function run() {
  try {
    const rawTerms = await fetchDictionary();
    const allSlugs = new Set(rawTerms.map(t => t.slug));
    const processed = [];

    for (const t of rawTerms) {
      const p = parseAndTransformTerm(t, allSlugs);
      const targetPath = path.join(DICT_DIR, `${p.slug}.md`);
      fs.writeFileSync(targetPath, p.body, 'utf8');
      processed.push(p);
    }
    console.log(`Successfully generated ${processed.length} dictionary term pages.`);

    const indexContent = generateIndexPage(processed);
    fs.writeFileSync(path.join(DICT_DIR, 'index.md'), indexContent, 'utf8');
    console.log('Successfully generated docs/dictionary/index.md.');
  } catch (err) {
    console.error('Error importing dictionary:', err);
    process.exit(1);
  }
}

run();
