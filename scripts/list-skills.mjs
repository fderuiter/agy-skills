#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

function findSkills(dir) {
  let list = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        list = list.concat(findSkills(full));
      }
    } else if (entry.name === 'SKILL.md') {
      list.push(path.relative(repoRoot, full).replace(/\\/g, '/'));
    }
  }
  return list;
}

const skills = findSkills(path.join(repoRoot, 'skills')).sort();
for (const skill of skills) {
  console.log(skill);
}
