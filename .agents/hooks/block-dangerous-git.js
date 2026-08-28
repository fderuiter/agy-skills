#!/usr/bin/env node
import fs from 'node:fs';

// Read hook payload from stdin
const input = fs.readFileSync(0, 'utf8');

if (!input || !input.trim()) {
  console.log(JSON.stringify({ decision: 'allow' }));
  process.exit(0);
}

let payload;
try {
  payload = JSON.parse(input);
} catch {
  console.log(JSON.stringify({ decision: 'allow' }));
  process.exit(0);
}

const toolCall = payload.toolCall;
if (!toolCall || toolCall.name !== 'run_command' || !toolCall.args || !toolCall.args.CommandLine) {
  console.log(JSON.stringify({ decision: 'allow' }));
  process.exit(0);
}

const command = toolCall.args.CommandLine.trim();

// Patterns for destructive git operations
const dangerousPatterns = [
  /^git\s+push(\s+.*)?$/i,
  /^git\s+reset\s+--hard(\s+.*)?$/i,
  /^git\s+clean\s+(-[a-zA-Z]*f[a-zA-Z]*|\s+--force)(\s+.*)?$/i,
  /^git\s+branch\s+(-D|--delete\s+--force)(\s+.*)?$/i,
  /^git\s+checkout\s+\.(\s+.*)?$/i,
  /^git\s+restore\s+\.(\s+.*)?$/i
];

const isDangerous = dangerousPatterns.some((pattern) => pattern.test(command));

if (isDangerous) {
  console.log(
    JSON.stringify({
      decision: 'deny',
      reason: `BLOCKED: Command "${command}" matched safety guardrail. Destructive git command prevented.`
    })
  );
} else {
  console.log(JSON.stringify({ decision: 'allow' }));
}

