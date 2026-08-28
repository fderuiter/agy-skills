#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// Load skills.config.json
let config = {
  projectName: 'agy-skills',
  author: {
    name: 'Fred de Ruiter',
    handle: 'fderuiter',
    githubUrl: 'https://github.com/fderuiter/agy-skills',
    docsUrl: 'https://fderuiter.github.io/agy-skills'
  },
  routerSkill: {
    name: 'ask-fred',
    path: 'skills/engineering/ask-fred/SKILL.md',
    description: 'Ask which skill or flow fits your situation. A router over the skills in this repo.'
  },
  buckets: {
    engineering: { description: 'daily code work', promoted: true, docsPath: 'docs/engineering' },
    productivity: { description: 'daily non-code workflow tools', promoted: true, docsPath: 'docs/productivity' },
    misc: { description: 'kept around but rarely used, not promoted', promoted: false },
    'in-progress': { description: 'beta: public on purpose, feedback wanted, not shipped in the plugin', promoted: false },
    deprecated: { description: 'no longer used', promoted: false }
  },
  overlayDir: 'skills/custom'
};

const configPath = path.join(repoRoot, 'skills.config.json');
if (fs.existsSync(configPath)) {
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
  } catch (err) {
    console.warn(`Warning: Could not parse skills.config.json: ${err.message}`);
  }
}

function printUsage() {
  console.log(`
Usage:
  node scripts/new-skill.mjs --name <skill-name> [options]
  npm run new-skill -- --name <skill-name> [options]

Options:
  --name, -n         Skill name in kebab-case (required, e.g. "code-review")
  --bucket, -b       Bucket: engineering, productivity, misc, in-progress, deprecated, custom (default: "engineering")
  --description, -d  Short 1-2 sentence description of the skill
  --invoked, -i      Invocability: "user" (default) or "model"
  --dry-run          Preview files to be generated without writing to disk
  --help, -h         Display this help message
`);
}

// Parse args
const args = process.argv.slice(2);
let name = '';
let bucket = 'engineering';
let description = '';
let invoked = 'user';
let dryRun = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--help' || arg === '-h') {
    printUsage();
    process.exit(0);
  } else if (arg === '--name' || arg === '-n') {
    name = args[++i] || '';
  } else if (arg === '--bucket' || arg === '-b') {
    bucket = args[++i] || 'engineering';
  } else if (arg === '--description' || arg === '-d') {
    description = args[++i] || '';
  } else if (arg === '--invoked' || arg === '-i') {
    invoked = (args[++i] || 'user').toLowerCase();
  } else if (arg === '--dry-run') {
    dryRun = true;
  }
}

if (!name) {
  console.error('Error: --name is required.');
  printUsage();
  process.exit(1);
}

// Normalize name: kebab-case
name = name.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

if (!name) {
  console.error('Error: Invalid skill name.');
  process.exit(1);
}

if (description.includes('—') || description.includes('\u2014')) {
  console.error('Error: Em-dashes are forbidden in description. Use commas, colons, or parentheses.');
  process.exit(1);
}

const isCustom = bucket === 'custom';
const bucketConfig = config.buckets[bucket] || (isCustom ? { promoted: false } : null);

if (!bucketConfig && !isCustom) {
  console.error(`Error: Unknown bucket '${bucket}'. Valid buckets: ${Object.keys(config.buckets).join(', ')}, custom`);
  process.exit(1);
}

const isPromoted = bucketConfig?.promoted || false;
if (invoked !== 'user' && invoked !== 'model') {
  invoked = 'user';
}

if (!description) {
  description = `Handle ${name.replace(/-/g, ' ')} tasks with structured steps and verification.`;
}

// Adjust description if user-invoked and not already starting with User-invoked
let skillDescription = description;
if (invoked === 'user' && !skillDescription.toLowerCase().startsWith('user-invoked')) {
  skillDescription = `User-invoked. ${skillDescription}`;
}

const skillDir = isCustom
  ? path.join(repoRoot, config.overlayDir || 'skills/custom', name)
  : path.join(repoRoot, 'skills', bucket, name);

const skillFilePath = path.join(skillDir, 'SKILL.md');

if (fs.existsSync(skillFilePath)) {
  console.error(`Error: Skill '${name}' already exists at ${path.relative(repoRoot, skillFilePath)}`);
  process.exit(1);
}

console.log(`\n--- Scaffolding Skill: ${name} ---`);
console.log(`Bucket:       ${bucket} ${isPromoted ? '(Promoted)' : '(Unpromoted)'}`);
console.log(`Invocability: ${invoked}`);
console.log(`Target:       ${path.relative(repoRoot, skillFilePath)}`);
console.log(`Description:  ${skillDescription}\n`);

// 1. Generate SKILL.md content
const skillTitle = name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
const skillMdContent = `---
name: ${name}
description: ${skillDescription}
---

# ${skillTitle}

${description}

## Context

Explain the primary motivation, source inputs, and the defining constraint.

## Instructions

1. **Understand Intent**: Clarify parameters, inspect existing workspace context, and verify preconditions.
2. **Execute Workflow**: Step through the core loop with checkable completion criteria.
3. **Verify Integrity**: Run automated tests, formatting checks, and validate outputs against requirements.

## Completion Criteria

- [ ] All primary workflow steps completed cleanly.
- [ ] Automated tests and integrity checks pass.
- [ ] No unresolved errors or ambiguous edge cases.
`;

// 2. Generate docs page if promoted
let docFilePath = null;
let docContent = null;
if (isPromoted) {
  const docDir = path.join(repoRoot, 'docs', bucket);
  docFilePath = path.join(docDir, `${name}.md`);
  docContent = `---
title: "${name}: ${skillTitle} | ${config.projectName}"
description: "${description.replace(/"/g, "'")}"
keywords: ["${name}", "${name.replace(/-/g, ' ')}", "antigravity skills", "agent skills"]
permalink: /skills-${name}/
---

## What it does

${description} It operates with checkable completion criteria and automated verification.

## When to reach for it

${invoked === 'user'
    ? `You invoke this by typing \`/${name}\`, and the agent won't reach for it on its own.`
    : `Type \`/${name}\`, or the agent reaches for it automatically when a task fits.`} Reach for this when you need disciplined workflows for ${name.replace(/-/g, ' ')}.

## Common questions

**How does this integrate with the repository toolchain?**
It runs deterministically within Antigravity and registers automatically with local workspaces.

## It's working if

- The task executes cleanly without ambiguous prompts.
- Outputs match expected file structure and formatting standards.

## Where it fits

A standalone or chain step in your workflow. See [${config.routerSkill.name}](${config.author.docsUrl}/skills-${config.routerSkill.name}) for the router over the whole set.
`;
}

// 3. Generate test stub in tests/skills/
const testsSkillsDir = path.join(repoRoot, 'tests', 'skills');
const testFileName = `test_${name.replace(/-/g, '_')}.py`;
const testFilePath = path.join(testsSkillsDir, testFileName);
const testContent = `"""
Automated validation test for ${name} skill.
"""

import os
import unittest

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SKILL_PATH = os.path.join(REPO_ROOT, "${path.relative(repoRoot, skillFilePath).replace(/\\/g, '/')}")


class Test${name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Skill(unittest.TestCase):
    def test_skill_file_exists(self):
        """Verify that SKILL.md exists."""
        self.assertTrue(os.path.exists(SKILL_PATH), f"Skill file missing at {SKILL_PATH}")

    def test_no_em_dashes_in_skill(self):
        """Verify that prose contains zero em-dashes."""
        with open(SKILL_PATH, "r", encoding="utf-8") as f:
            content = f.read()
        self.assertNotIn("—", content, "SKILL.md must not contain em-dashes.")
        self.assertNotIn("\\u2014", content, "SKILL.md must not contain unicode em-dashes.")


if __name__ == "__main__":
    unittest.main()
`;

if (dryRun) {
  console.log('[DRY RUN] Would create:', path.relative(repoRoot, skillFilePath));
  if (docFilePath) console.log('[DRY RUN] Would create:', path.relative(repoRoot, docFilePath));
  console.log('[DRY RUN] Would create:', path.relative(repoRoot, testFilePath));
  console.log('\nDry run completed successfully.');
  process.exit(0);
}

// Write SKILL.md
fs.mkdirSync(skillDir, { recursive: true });
fs.writeFileSync(skillFilePath, skillMdContent, 'utf8');
console.log(`Created: ${path.relative(repoRoot, skillFilePath)}`);

// Write doc file if promoted
if (docFilePath && docContent) {
  fs.mkdirSync(path.dirname(docFilePath), { recursive: true });
  fs.writeFileSync(docFilePath, docContent, 'utf8');
  console.log(`Created: ${path.relative(repoRoot, docFilePath)}`);
}

// Write test file
fs.mkdirSync(testsSkillsDir, { recursive: true });
fs.writeFileSync(testFilePath, testContent, 'utf8');
console.log(`Created: ${path.relative(repoRoot, testFilePath)}`);

// 4. Update bucket README.md
if (!isCustom) {
  const bucketReadmePath = path.join(repoRoot, 'skills', bucket, 'README.md');
  if (fs.existsSync(bucketReadmePath)) {
    let bucketReadme = fs.readFileSync(bucketReadmePath, 'utf8');
    const entryLine = `- **[${name}](./${name}/SKILL.md)**: ${description}`;

    if (!bucketReadme.includes(`./${name}/SKILL.md`)) {
      if (isPromoted) {
        const sectionHeader = invoked === 'user' ? '## User-invoked' : '## Model-invoked';
        const sectionIndex = bucketReadme.indexOf(sectionHeader);
        if (sectionIndex !== -1) {
          const nextSectionIndex = bucketReadme.indexOf('## ', sectionIndex + sectionHeader.length);
          const insertionTarget = nextSectionIndex !== -1 ? nextSectionIndex : bucketReadme.length;
          const before = bucketReadme.slice(0, insertionTarget).trimEnd();
          const after = bucketReadme.slice(insertionTarget);
          bucketReadme = `${before}\n${entryLine}\n\n${after}`.trim() + '\n';
        } else {
          bucketReadme += `\n${entryLine}\n`;
        }
      } else {
        bucketReadme = bucketReadme.trim() + `\n${entryLine}\n`;
      }
      fs.writeFileSync(bucketReadmePath, bucketReadme, 'utf8');
      console.log(`Updated: ${path.relative(repoRoot, bucketReadmePath)}`);
    }
  }
}

// 5. Update root README.md if promoted
if (isPromoted) {
  const rootReadmePath = path.join(repoRoot, 'README.md');
  if (fs.existsSync(rootReadmePath)) {
    let rootReadme = fs.readFileSync(rootReadmePath, 'utf8');
    const rootEntryLine = `- **[${name}](./skills/${bucket}/${name}/SKILL.md)**: ${description}`;

    if (!rootReadme.includes(`./skills/${bucket}/${name}/SKILL.md`)) {
      const bucketHeading = bucket === 'engineering' ? '### Engineering' : '### Productivity';
      const bucketIdx = rootReadme.indexOf(bucketHeading);
      if (bucketIdx !== -1) {
        const sectionHeader = invoked === 'user' ? '**User-invoked**' : '**Model-invoked**';
        const subSectionIdx = rootReadme.indexOf(sectionHeader, bucketIdx);
        if (subSectionIdx !== -1) {
          const nextHeaderIdx = rootReadme.indexOf('\n\n', subSectionIdx);
          if (nextHeaderIdx !== -1) {
            const before = rootReadme.slice(0, nextHeaderIdx);
            const after = rootReadme.slice(nextHeaderIdx);
            rootReadme = `${before}\n${rootEntryLine}${after}`;
          } else {
            rootReadme += `\n${rootEntryLine}\n`;
          }
          fs.writeFileSync(rootReadmePath, rootReadme, 'utf8');
          console.log(`Updated: ${path.relative(repoRoot, rootReadmePath)}`);
        }
      }
    }
  }
}

// 6. Update router skill if user-invoked and markers exist
if (invoked === 'user' && config.routerSkill?.path) {
  const routerFullPath = path.join(repoRoot, config.routerSkill.path);
  if (fs.existsSync(routerFullPath)) {
    let routerContent = fs.readFileSync(routerFullPath, 'utf8');
    const markerStart = '<!-- USER_SKILLS_START -->';
    const markerEnd = '<!-- USER_SKILLS_END -->';
    const startIdx = routerContent.indexOf(markerStart);
    const endIdx = routerContent.indexOf(markerEnd);

    if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
      const entry = `- **\`/${name}\`**: ${description}`;
      if (!routerContent.includes(`\`/${name}\``)) {
        const before = routerContent.slice(0, startIdx + markerStart.length);
        const middle = routerContent.slice(startIdx + markerStart.length, endIdx).trim();
        const after = routerContent.slice(endIdx);
        const updatedMiddle = middle ? `${middle}\n${entry}` : `\n${entry}\n`;
        routerContent = `${before}\n${updatedMiddle.trim()}\n${after}`;
        fs.writeFileSync(routerFullPath, routerContent, 'utf8');
        console.log(`Updated: ${path.relative(repoRoot, routerFullPath)} (via marker injection)`);
      }
    }
  }
}

// 7. Re-link skills
try {
  console.log('\nRunning link-skills to register in local Antigravity directories...');
  execSync('node scripts/link-skills.mjs', { cwd: repoRoot, stdio: 'inherit' });
} catch (err) {
  console.warn(`Warning: Failed to execute link-skills: ${err.message}`);
}

console.log(`\nSuccessfully scaffolded skill '${name}'!`);
console.log('Next steps:');
console.log(`  1. Customize instructions in ${path.relative(repoRoot, skillFilePath)}`);
if (docFilePath) console.log(`  2. Refine documentation in ${path.relative(repoRoot, docFilePath)}`);
console.log('  3. Run `npm test` to verify integrity.');
