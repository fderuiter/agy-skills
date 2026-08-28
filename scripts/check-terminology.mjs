// agy-skills Terminology Enforcement Linter
// Ensures prohibited domain terms are not used across documentation and skill prose.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PROHIBITED_TERMS = [
  { term: 'backlog manager', pattern: /\bbacklog\s+manager\b/i },
  { term: 'backlog backend', pattern: /\bbacklog\s+backend\b/i },
  { term: 'issue host', pattern: /\bissue\s+host\b/i },
  { term: 'backlog', pattern: /\bbacklog\b/i }
];

const ALLOWED_FILES = new Set([
  'CHANGELOG.md'
]);

function getMarkdownFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (['node_modules', '.git', '.github', '_site', '.system_generated', '.out-of-scope'].includes(entry.name)) {
        continue;
      }
      files = files.concat(getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripCode(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]+`/g, '');
}

function checkTerminology() {
  console.log('\n--- agy-skills Terminology Enforcement Audit ---');
  const files = getMarkdownFiles(rootDir);
  const violations = [];

  for (const file of files) {
    const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
    if (ALLOWED_FILES.has(relPath) || ALLOWED_FILES.has(path.basename(file))) {
      continue;
    }

    const rawContent = fs.readFileSync(file, 'utf-8');
    const content = stripCode(rawContent.replace(/\r\n/g, '\n'));
    const lines = content.split('\n');

    let inAmbiguitiesSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      if (relPath === 'CONTEXT.md') {
        if (line.startsWith('## Flagged ambiguities')) {
          inAmbiguitiesSection = true;
        }
        if (line.trim().startsWith('_Avoid_:')) {
          continue;
        }
      }

      if (inAmbiguitiesSection) {
        continue;
      }

      for (const { term, pattern } of PROHIBITED_TERMS) {
        if (pattern.test(line)) {
          violations.push({
            file: relPath,
            line: lineNum,
            term: term,
            snippet: line.trim()
          });
          break;
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error(`Found ${violations.length} prohibited terminology violation(s):\n`);
    for (const v of violations) {
      console.error(`  - ${v.file}:${v.line} uses prohibited term "${v.term}"`);
      console.error(`    Snippet: "${v.snippet}"\n`);
    }
    console.error('Use canonical domain terms from CONTEXT.md instead ("Issue tracker", "Issue", etc.).');
    process.exit(1);
  }

  console.log(`Validated ${files.length} markdown files for prohibited domain terms.`);
  console.log('All files passed terminology compliance checks successfully!\n');
}

checkTerminology();

