#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

/**
 * Dispatches a wizard script based on the host operating system.
 * On Windows, executes the matching .ps1 via pwsh (or powershell).
 * On macOS/Linux, executes the matching .sh via bash.
 *
 * @param {string} wizardName - Base name of the wizard (e.g. 'setup-antigravity-mcp', 'link-skills')
 * @param {string[]} extraArgs - Additional arguments passed to the script
 */
export function runWizard(wizardName, extraArgs = []) {
  const isWindows = process.platform === 'win32';
  const scriptsDir = path.join(REPO_ROOT, 'scripts');

  const ps1Path = path.join(scriptsDir, `${wizardName}.ps1`);
  const shPath = path.join(scriptsDir, `${wizardName}.sh`);

  if (isWindows) {
    if (!fs.existsSync(ps1Path)) {
      console.error(`Error: PowerShell wizard script not found at ${ps1Path}`);
      process.exit(1);
    }

    // Try pwsh first, fall back to powershell
    const pwshExecutable = hasCommand('pwsh') ? 'pwsh' : 'powershell';
    const psArgs = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ps1Path, ...extraArgs];

    const result = spawnSync(pwshExecutable, psArgs, {
      cwd: REPO_ROOT,
      stdio: 'inherit',
      shell: false
    });

    process.exit(result.status ?? 0);
  } else {
    if (!fs.existsSync(shPath)) {
      console.error(`Error: Shell wizard script not found at ${shPath}`);
      process.exit(1);
    }

    // Ensure script has executable permissions
    try {
      fs.chmodSync(shPath, 0o755);
    } catch {
      // Ignore chmod error if filesystem does not support it
    }

    const result = spawnSync('bash', [shPath, ...extraArgs], {
      cwd: REPO_ROOT,
      stdio: 'inherit',
      shell: false
    });

    process.exit(result.status ?? 0);
  }
}

function hasCommand(cmd) {
  try {
    const checkCmd = process.platform === 'win32' ? `where.exe ${cmd}` : `command -v ${cmd}`;
    const res = spawnSync(checkCmd, { shell: true, stdio: 'ignore' });
    return res.status === 0;
  } catch {
    return false;
  }
}

// CLI entry point
const args = process.argv.slice(2);
const wizardTarget = args[0] || 'setup-antigravity-mcp';
const passthroughArgs = args.slice(1);

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('wizard.mjs')) {
  runWizard(wizardTarget, passthroughArgs);
}

