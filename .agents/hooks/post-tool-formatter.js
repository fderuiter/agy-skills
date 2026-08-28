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

const toolCall = payload.toolCall;
if (!toolCall || !toolCall.args) {
  console.log(JSON.stringify({}));
  process.exit(0);
}

const targetFile = toolCall.args.TargetFile;
if (!targetFile || !fs.existsSync(targetFile)) {
  console.log(JSON.stringify({}));
  process.exit(0);
}

const warnings = [];

try {
  const content = fs.readFileSync(targetFile, 'utf8');

  // Check em-dash invariant
  if (content.includes('\u2014')) {
    warnings.push(`File "${path.basename(targetFile)}" contains em-dash character (\u2014). Replace with a comma, colon, period, or parentheses.`);
  }

  // Validate JSON if applicable
  if (targetFile.endsWith('.json')) {
    try {
      JSON.parse(content);
    } catch (jsonErr) {
      warnings.push(`Invalid JSON syntax in "${path.basename(targetFile)}": ${jsonErr.message}`);
    }
  }
} catch (readErr) {
  // Ignore read error
}

if (warnings.length > 0) {
  console.log(
    JSON.stringify({
      context: `[PostToolUse Warning] ${warnings.join(' ')}`
    })
  );
} else {
  console.log(JSON.stringify({}));
}

