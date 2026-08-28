#!/usr/bin/env node
import fs from \ node:fs\;

let input = \\;
process.stdin.setEncoding(\utf8\);

process.stdin.on(\data\, (chunk) => {
  input += chunk;
});

process.stdin.on(\end\, () => {
  try {
    const payload = JSON.parse(input);
    const cmd = payload?.toolCall?.args?.CommandLine || \\;

    const dangerous = [
      /git\s+push/,
      /git\s+reset\s+--hard/,
      /git\s+clean\s+-[^\s]*f/,
      /git\s+branch\s+-[^\s]*D/,
      /git\s+checkout\s+\./,
      /git\s+restore\s+\./
    ];

    for (const pattern of dangerous) {
      if (pattern.test(cmd)) {
        const response = {
          decision: \deny\,
          reason: BLOCKED: Command \\ matched safety guardrail. Destructive git command prevented.
        };
        process.stdout.write(JSON.stringify(response));
        process.exit(0);
      }
    }

    process.stdout.write(JSON.stringify({ decision: \allow\ }));
  } catch (err) {
    process.stdout.write(JSON.stringify({ decision: \allow\ }));
  }
});