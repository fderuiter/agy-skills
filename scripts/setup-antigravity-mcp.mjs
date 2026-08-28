#!/usr/bin/env node
import { runWizard } from './wizard.mjs';

const args = process.argv.slice(2);
runWizard('setup-antigravity-mcp', args);

