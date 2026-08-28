#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const EXCLUDED_DIRS = new Set(['.git', 'node_modules', 'dist', '_site', '.system_generated', 'brain', '__pycache__', '.pytest_cache']);
const EXCLUDED_FILES = new Set(['package-lock.json']);

// Patterns detecting machine-specific hardcoded absolute filepaths
const HARDCODED_PATH_PATTERNS = [
  /[a-zA-Z]:\\(?:Users|Users\\|Windows|Documents|Projects)/i,
  /[a-zA-Z]:\/(?:Users|Users\/|Windows|Documents|Projects)/i,
  /\/(?:Users|home)\/[a-zA-Z0-9_.-]+\/(?:Documents|Projects|GitHub|repos|\.gemini|\.agents)/i
];

let scannedCount = 0;
const violations = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(REPO_ROOT, fullPath);

    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile()) {
      if (EXCLUDED_FILES.has(entry.name)) continue;

      scannedCount++;
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split(/\r?\n/);

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          for (const pattern of HARDCODED_PATH_PATTERNS) {
            if (pattern.test(line)) {
              violations.push({
                file: relPath,
                line: i + 1,
                content: line.trim()
              });
              break;
            }
          }
        }
      } catch {
        // Ignore unreadable binary files
      }
    }
  }
}

console.log('\n--- agy-skills Hardcoded Filepath Audit ---');
scanDir(REPO_ROOT);

if (violations.length > 0) {
  console.error(`\nFound ${violations.length} hardcoded absolute filepath violation(s):`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line} -> ${v.content}`);
  }
  process.exit(1);
} else {
  console.log(`Validated ${scannedCount} files.`);
  console.log('Zero hardcoded absolute filepaths detected across the repository!\n');
}
