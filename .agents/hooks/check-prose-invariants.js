#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Read hook payload from stdin
const input = fs.readFileSync(0, 'utf8');
let payload = {};

if (input && input.trim()) {
  try {
    payload = JSON.parse(input);
  } catch {
    // ignore parse error
  }
}

// Function to scan text files for em-dashes
function findEmDashes(dir) {
  const violations = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.worktrees') {
        continue;
      }
      violations.push(...findEmDashes(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('\u2014')) {
          violations.push(fullPath);
        }
      } catch {
        // ignore unreadable files
      }
    }
  }

  return violations;
}

// If running as a Stop hook check
if (payload.terminationReason) {
  const violations = findEmDashes(process.cwd());
  if (violations.length > 0) {
    const relList = violations.map((f) => path.relative(process.cwd(), f)).join(', ');
    console.log(
      JSON.stringify({
        decision: 'continue',
        reason: `Invariant violation: Found em-dash characters in files: ${relList}. Please replace with commas, colons, periods, or parentheses.`
      })
    );
    process.exit(0);
  }
}

// For PostToolUse or default clean Stop
console.log(JSON.stringify({}));
