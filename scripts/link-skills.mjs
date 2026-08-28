#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const homeDir = os.homedir();

const destDirs = [
  path.join(homeDir, '.gemini', 'config', 'skills'),
  path.join(homeDir, '.agents', 'skills')
];

function findSkillDirs(dir) {
  let skillDirs = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'deprecated' || entry.name === '.git') {
        continue;
      }
      if (fs.existsSync(path.join(fullPath, 'SKILL.md'))) {
        skillDirs.push(fullPath);
      } else {
        skillDirs = skillDirs.concat(findSkillDirs(fullPath));
      }
    }
  }
  return skillDirs;
}

const skillsDir = path.join(repoRoot, 'skills');
const skillPaths = findSkillDirs(skillsDir);
console.log(`Found ${skillPaths.length} skills in ${repoRoot}`);

for (const dest of destDirs) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const src of skillPaths) {
    const skillName = path.basename(src);
    const target = path.join(dest, skillName);

    try {
      fs.lstatSync(target);
      fs.rmSync(target, { recursive: true, force: true });
    } catch {
      // target does not exist, continue
    }

    try {
      if (isWindows) {
        fs.symlinkSync(src, target, 'junction');
      } else {
        fs.symlinkSync(src, target, 'dir');
      }
      console.log(`Linked ${skillName} -> ${src} (${dest})`);
    } catch (err) {
      console.error(`Failed to link ${skillName} to ${dest}: ${err.message}`);
    }
  }
}

console.log('\nAll skills linked successfully across platforms!');