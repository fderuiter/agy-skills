#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const isWindows = process.platform === 'win32';
const homeDir = os.homedir();

let config = {
  projectName: 'agy-skills',
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

const destDirs = [
  path.join(homeDir, '.gemini', 'config', 'skills'),
  path.join(homeDir, '.agents', 'skills'),
  path.join(repoRoot, '.agents', 'skills'),
  path.join(repoRoot, '.agents', 'plugins', config.projectName, 'skills')
];

function findSkillDirs(dir) {
  let skillDirs = [];
  if (!fs.existsSync(dir)) return skillDirs;

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
let skillPaths = findSkillDirs(skillsDir);

// Discover overlay skills if present
if (config.overlayDir) {
  const overlayFullPath = path.resolve(repoRoot, config.overlayDir);
  if (fs.existsSync(overlayFullPath) && overlayFullPath !== skillsDir) {
    const overlaySkills = findSkillDirs(overlayFullPath);
    for (const ovSkill of overlaySkills) {
      if (!skillPaths.includes(ovSkill)) {
        skillPaths.push(ovSkill);
      }
    }
  }
}

console.log(`Found ${skillPaths.length} skills across tracked buckets and local overlay in ${repoRoot}`);

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

// Link AGENTS.md into plugin rules
const pluginRulesDir = path.join(repoRoot, '.agents', 'plugins', config.projectName, 'rules');
if (!fs.existsSync(pluginRulesDir)) {
  fs.mkdirSync(pluginRulesDir, { recursive: true });
}
const pluginAgentsMd = path.join(pluginRulesDir, 'AGENTS.md');
const srcAgentsMd = path.join(repoRoot, 'AGENTS.md');
if (fs.existsSync(srcAgentsMd)) {
  try {
    fs.copyFileSync(srcAgentsMd, pluginAgentsMd);
    console.log(`Synced rules -> ${pluginAgentsMd}`);
  } catch (err) {
    console.error(`Failed to sync rules to plugin: ${err.message}`);
  }
}

console.log('\nAll skills linked successfully across platforms!');