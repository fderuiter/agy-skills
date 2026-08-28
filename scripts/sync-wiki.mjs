#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const wikiSourceDir = path.join(repoRoot, 'wiki');

const WIKI_REPO_URL = process.env.WIKI_GIT_URL || 'https://github.com/fderuiter/agy-skills.wiki.git';
const tempDir = path.join(os.tmpdir(), `agy-skills-wiki-sync-${Date.now()}`);

console.log('--- agy-skills GitHub Wiki Sync ---');
console.log(`Source directory: ${wikiSourceDir}`);
console.log(`Target repository: ${WIKI_REPO_URL}`);

if (!fs.existsSync(wikiSourceDir)) {
  console.error(`Error: Source directory '${wikiSourceDir}' does not exist.`);
  process.exit(1);
}

const wikiFiles = fs.readdirSync(wikiSourceDir).filter((file) => file.endsWith('.md'));
if (wikiFiles.length === 0) {
  console.error(`Error: No markdown files found in '${wikiSourceDir}'.`);
  process.exit(1);
}

console.log(`Found ${wikiFiles.length} wiki page(s) to sync: ${wikiFiles.join(', ')}`);

try {
  console.log('\nCloning wiki repository...');
  try {
    execSync(`git clone ${WIKI_REPO_URL} "${tempDir}"`, {
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf8'
    });
  } catch (cloneErr) {
    const errorOutput = (cloneErr.stderr || cloneErr.stdout || cloneErr.message || '').toString();
    console.error('\nUnable to clone the GitHub Wiki repository.');
    console.error(`Git output: ${errorOutput.trim()}`);
    console.log('\nNote: If this wiki has not yet been initialized on GitHub:');
    console.log('1. Visit https://github.com/fderuiter/agy-skills/wiki in your browser.');
    console.log("2. Click 'Create the first page' to initialize the wiki repository.");
    console.log('3. Re-run this sync script once initialized.');
    process.exit(0);
  }

  console.log('Copying wiki pages to cloned workspace...');
  for (const file of wikiFiles) {
    const srcPath = path.join(wikiSourceDir, file);
    const destPath = path.join(tempDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`  Copied: ${file}`);
  }

  const statusOutput = execSync('git status --porcelain', {
    cwd: tempDir,
    encoding: 'utf8'
  }).trim();

  if (!statusOutput) {
    console.log('\nWiki is already up to date. No changes to commit.');
  } else {
    console.log('\nChanges detected:');
    console.log(statusOutput);

    console.log('\nStaging, committing, and pushing changes...');
    execSync('git add .', { cwd: tempDir, stdio: 'inherit' });
    execSync('git commit -m "docs(wiki): sync wiki pages from main repository"', {
      cwd: tempDir,
      stdio: 'inherit'
    });
    execSync('git push origin HEAD', { cwd: tempDir, stdio: 'inherit' });

    console.log('\nSuccessfully pushed updates to GitHub Wiki!');
  }
} catch (err) {
  console.error(`\nSync failed: ${err.message}`);
  process.exit(1);
} finally {
  if (fs.existsSync(tempDir)) {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore temporary directory cleanup failures
    }
  }
}
