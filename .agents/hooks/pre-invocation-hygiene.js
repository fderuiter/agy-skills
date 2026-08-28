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
    // Ignore payload parse errors
  }
}

// Function to check for unresolved merge conflict markers in markdown and code files
function checkConflictMarkers(dir) {
  const conflicts = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.worktrees' || entry.name === 'dist') {
        continue;
      }
      conflicts.push(...checkConflictMarkers(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.js') || entry.name.endsWith('.mjs') || entry.name.endsWith('.json'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('<<<<<<< HEAD') || content.includes('>>>>>>> ') || content.includes('=======')) {
          conflicts.push(fullPath);
        }
      } catch {
        // Ignore unreadable files
      }
    }
  }

  return conflicts;
}

const conflicts = checkConflictMarkers(process.cwd());

if (conflicts.length > 0) {
  const relList = conflicts.map((f) => path.relative(process.cwd(), f)).join(', ');
  console.log(
    JSON.stringify({
      context: `[Warning] Unresolved merge conflict markers detected in: ${relList}. Please resolve them before continuing.`
    })
  );
} else {
  console.log(JSON.stringify({}));
}

