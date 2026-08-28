import fs from 'node:fs';
import path from 'node:path';

// Zero-dependency native git hook manager for agy-skills
const gitHooksDir = path.resolve('.git', 'hooks');

if (!fs.existsSync(gitHooksDir)) {
  console.log('Skipping git hook setup (.git/hooks directory not found).');
  process.exit(0);
}

const preCommitPath = path.join(gitHooksDir, 'pre-commit');
const preCommitScript = `#!/bin/sh
# Auto-generated pre-commit hook for agy-skills
# Validates SEO, front matter, skill integrity, and em-dash invariants

echo "Running pre-commit integrity audit..."
npm test || exit 1
`;

try {
  fs.writeFileSync(preCommitPath, preCommitScript, { mode: 0o755 });
  console.log('Successfully configured pre-commit hook (.git/hooks/pre-commit).');
} catch (err) {
  console.warn('Could not write pre-commit hook:', err.message);
}

