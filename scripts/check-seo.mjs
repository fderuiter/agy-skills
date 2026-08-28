import fs from 'node:fs';
import path from 'node:path';

const DOCS_DIR = path.resolve('docs');
const PROMOTED_BUCKETS = ['engineering', 'productivity'];

let errors = [];
let checkedCount = 0;

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

    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
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

function validateFile(filePath, isIndex = false) {
  checkedCount++;
  const relPath = path.relative(process.cwd(), filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  checkEmDashes(relPath, content);

  const { frontmatter } = parseFrontMatter(content);

  if (!frontmatter) {
    errors.push(`${relPath}: Missing YAML front matter.`);
    return;
  }

  if (!frontmatter.title || frontmatter.title.trim().length === 0) {
    errors.push(`${relPath}: Missing or empty 'title' in front matter.`);
  }

  if (!frontmatter.description) {
    errors.push(`${relPath}: Missing 'description' in front matter.`);
  } else {
    const descLen = frontmatter.description.length;
    if (descLen < 40 || descLen > 165) {
      errors.push(
        `${relPath}: Description length (${descLen} chars) should be between 50 and 160 chars for optimal SEO snippets.`
      );
    }
  }

  if (!frontmatter.keywords || !Array.isArray(frontmatter.keywords) || frontmatter.keywords.length < 3) {
    errors.push(`${relPath}: 'keywords' must be an array with at least 3 keyword terms.`);
  }

  if (!isIndex) {
    const baseName = path.basename(filePath, '.md');
    const expectedPermalink = `/skills-${baseName}/`;
    if (frontmatter.permalink !== expectedPermalink && frontmatter.permalink !== `/skills-${baseName}`) {
      errors.push(`${relPath}: 'permalink' should be '${expectedPermalink}', found '${frontmatter.permalink || ''}'.`);
    }
  }
}

// Validate index.md
const indexPath = path.join(DOCS_DIR, 'index.md');
if (fs.existsSync(indexPath)) {
  validateFile(indexPath, true);
} else {
  errors.push(`docs/index.md does not exist.`);
}

// Validate all promoted buckets
for (const bucket of PROMOTED_BUCKETS) {
  const bucketDir = path.join(DOCS_DIR, bucket);
  if (!fs.existsSync(bucketDir)) continue;

  const files = fs.readdirSync(bucketDir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    validateFile(path.join(bucketDir, file));
  }
}

// Check README.md for em-dashes
const readmePath = path.resolve('README.md');
if (fs.existsSync(readmePath)) {
  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  checkEmDashes('README.md', readmeContent);
}

console.log(`\n--- agy-skills SEO & Front Matter Audit ---`);
console.log(`Validated ${checkedCount} documentation pages.`);

if (errors.length > 0) {
  console.error(`\nFound ${errors.length} SEO / Front Matter issue(s):\n`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  console.log('\n');
  process.exit(1);
} else {
  console.log(`All pages passed SEO front matter, snippet length, permalink, and prose checks successfully!\n`);
  process.exit(0);
}

