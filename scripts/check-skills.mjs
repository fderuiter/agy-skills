import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve('.');
const configPath = path.join(repoRoot, 'skills.config.json');

let config = {
  projectName: 'agy-skills',
  author: { name: 'Fred de Ruiter', handle: 'fderuiter' },
  routerSkill: { name: 'ask-fred', path: 'skills/engineering/ask-fred/SKILL.md' },
  buckets: {
    engineering: { promoted: true, docsPath: 'docs/engineering' },
    productivity: { promoted: true, docsPath: 'docs/productivity' },
    misc: { promoted: false },
    'in-progress': { promoted: false },
    deprecated: { promoted: false }
  },
  overlayDir: 'skills/custom'
};

if (fs.existsSync(configPath)) {
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
  } catch (err) {
    console.warn(`Warning: Could not parse skills.config.json: ${err.message}`);
  }
}

const SKILLS_DIR = path.resolve('skills');
const DOCS_DIR = path.resolve('docs');
const ROOT_README = path.resolve('README.md');

const PROMOTED_BUCKETS = Object.entries(config.buckets)
  .filter(([, val]) => val.promoted)
  .map(([key]) => key);

const NON_PROMOTED_BUCKETS = Object.entries(config.buckets)
  .filter(([, val]) => !val.promoted)
  .map(([key]) => key);

let errors = [];
let checkedSkillsCount = 0;
const skillDescriptions = new Map();

function parseFrontMatter(content) {
  if (!content.startsWith('---')) {
    return { frontmatter: null, body: content };
  }
  const endIdx = content.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { frontmatter: null, body: content };
  }
  const rawFm = content.slice(3, endIdx).trim();
  const body = content.slice(endIdx + 4).trim();
  const data = {};

  for (const line of rawFm.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  }

  return { frontmatter: data, body };
}

function checkEmDashes(filePath, content) {
  if (content.includes('\u2014') || content.includes('—')) {
    errors.push(`${filePath}: Contains em-dash character(s). Replace with comma, colon, period, or parentheses.`);
  }
}

// 1. Audit root README & config
const rootReadmeContent = fs.readFileSync(ROOT_README, 'utf8');
checkEmDashes('README.md', rootReadmeContent);
if (fs.existsSync(configPath)) {
  checkEmDashes('skills.config.json', fs.readFileSync(configPath, 'utf8'));
}

// 2. Discover all skills in tracked buckets
const buckets = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const bucket of buckets) {
  const bucketDir = path.join(SKILLS_DIR, bucket);
  const isPromoted = PROMOTED_BUCKETS.includes(bucket);

  const bucketReadmePath = path.join(bucketDir, 'README.md');
  if (fs.existsSync(bucketReadmePath)) {
    const bucketReadmeContent = fs.readFileSync(bucketReadmePath, 'utf8');
    checkEmDashes(`skills/${bucket}/README.md`, bucketReadmeContent);
  }

  const skillDirs = fs.readdirSync(bucketDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const skillName of skillDirs) {
    checkedSkillsCount++;
    const skillPath = path.join(bucketDir, skillName, 'SKILL.md');
    const relSkillPath = `skills/${bucket}/${skillName}/SKILL.md`;

    if (!fs.existsSync(skillPath)) {
      errors.push(`${relSkillPath}: Missing SKILL.md in directory.`);
      continue;
    }

    const content = fs.readFileSync(skillPath, 'utf8');
    checkEmDashes(relSkillPath, content);

    const { frontmatter } = parseFrontMatter(content);

    if (!frontmatter) {
      errors.push(`${relSkillPath}: Missing or invalid YAML front matter.`);
      continue;
    }

    if (!frontmatter.name) {
      errors.push(`${relSkillPath}: Missing 'name' in front matter.`);
    } else if (frontmatter.name !== skillName) {
      errors.push(`${relSkillPath}: Front matter name '${frontmatter.name}' does not match directory name '${skillName}'.`);
    }

    if (!frontmatter.description || frontmatter.description.trim() === '') {
      errors.push(`${relSkillPath}: Missing or empty 'description' in front matter.`);
    } else {
      // Trigger conflict detection
      const normalizedDesc = frontmatter.description.toLowerCase().trim();
      if (skillDescriptions.has(normalizedDesc)) {
        errors.push(`Trigger Conflict: Skill '${skillName}' has identical description to '${skillDescriptions.get(normalizedDesc)}'`);
      } else {
        skillDescriptions.set(normalizedDesc, skillName);
      }
    }

    // Docs parity check
    const docPath = path.join(DOCS_DIR, bucket, `${skillName}.md`);
    const relDocPath = `docs/${bucket}/${skillName}.md`;

    if (isPromoted) {
      if (!fs.existsSync(docPath)) {
        errors.push(`Promoted skill '${skillName}' (${bucket}) is missing docs page at ${relDocPath}`);
      }

      // Check root README reference
      const rootSkillRef = `skills/${bucket}/${skillName}/SKILL.md`;
      if (!rootReadmeContent.includes(rootSkillRef)) {
        errors.push(`Promoted skill '${skillName}' (${bucket}) is not referenced in root README.md (${rootSkillRef})`);
      }
    } else {
      if (fs.existsSync(docPath)) {
        errors.push(`Non-promoted skill '${skillName}' in '${bucket}' must NOT have a docs page at ${relDocPath}`);
      }

      const rootSkillRef = `skills/${bucket}/${skillName}`;
      if (rootReadmeContent.includes(rootSkillRef)) {
        errors.push(`Non-promoted skill '${skillName}' in '${bucket}' must NOT be referenced in root README.md`);
      }
    }
  }
}

console.log('\n--- agy-skills Skill Integrity & Parity Audit ---');
console.log(`Validated ${checkedSkillsCount} skills across ${buckets.length} bucket folders.`);
console.log(`Trigger Conflict Detector: Verified uniqueness across ${skillDescriptions.size} skill descriptions.`);

if (errors.length > 0) {
  console.error(`\nFound ${errors.length} skill integrity error(s):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log('All skills passed frontmatter schema, documentation parity, README indexing, and em-dash checks successfully!\n');
  process.exit(0);
}
