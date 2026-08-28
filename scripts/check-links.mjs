// agy-skills Link and Anchor Integrity Gate
// Validates relative file links, internal permalinks, asset paths, and heading anchor hashes.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const IGNORED_DIRS = new Set(['node_modules', '.git', '.github', '_site', '.system_generated', 'wiki']);

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '') // remove HTML tags
    .replace(/[^\w\s-]/g, '') // remove punctuation
    .replace(/\s+/g, '-'); // replace whitespace with hyphen
}

function getMarkdownFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }
      files = files.concat(getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractHeadingsAndIds(rawContent) {
  const headingIds = new Set();
  const content = rawContent.replace(/\r\n/g, '\n');
  const lines = content.split('\n');

  for (const rawLine of lines) {
    const line = rawLine.trim();
    // Markdown headings # Heading or ## Heading
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (match) {
      const headingText = match[1].trim();
      // Handle custom kramdown id syntax: ## Heading {#custom-id}
      const customIdMatch = headingText.match(/\{#([^}]+)\}$/);
      if (customIdMatch) {
        headingIds.add(customIdMatch[1].trim());
        const cleanText = headingText.replace(/\{#[^}]+\}$/, '').trim();
        headingIds.add(slugify(cleanText));
      } else {
        headingIds.add(slugify(headingText));
      }
    }

    // HTML id attributes: id="some-id"
    const htmlIdMatches = line.matchAll(/id=["']([^"']+)["']/g);
    for (const htmlMatch of htmlIdMatches) {
      headingIds.add(htmlMatch[1].trim());
    }
  }

  return headingIds;
}

function stripCode(content) {
  return content
    .replace(/```[\s\S]*?```/g, '') // strip fenced code blocks
    .replace(/`[^`\n]+`/g, ''); // strip inline code spans
}

function checkLinks() {
  console.log('\n--- agy-skills Link & Anchor Integrity Audit ---');
  const files = getMarkdownFiles(rootDir);
  const fileHeadingMap = new Map();
  const errors = [];

  // 1. Build heading cache for all markdown files
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    fileHeadingMap.set(file, extractHeadingsAndIds(content));
  }

  let totalLinksChecked = 0;

  // 2. Validate links in each markdown file
  for (const file of files) {
    const relFile = path.relative(rootDir, file).replace(/\\/g, '/');
    const rawContent = fs.readFileSync(file, 'utf-8');
    const content = stripCode(rawContent.replace(/\r\n/g, '\n'));
    let dir = path.dirname(file);

    // If file is inside plugin distribution rules, resolve relative links against root
    if (relFile.startsWith('.agents/plugins/agy-skills/rules/')) {
      dir = rootDir;
    }

    // Match markdown links and images: [text](url) or ![alt](url)
    const linkRegex = /!?\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      totalLinksChecked++;
      const rawUrl = match[2].trim();

      // Ignore template tags, placeholders, or protocols
      if (
        rawUrl.includes('{{') ||
        rawUrl.includes('{%') ||
        rawUrl.includes('<') ||
        rawUrl.includes('>') ||
        rawUrl.startsWith('mailto:') ||
        rawUrl.startsWith('conversation://') ||
        rawUrl.startsWith('file://')
      ) {
        continue;
      }

      // Check external links with GitHub Pages domain
      if (rawUrl.startsWith('https://fderuiter.github.io/agy-skills/')) {
        const pathPart = rawUrl.replace('https://fderuiter.github.io/agy-skills/', '');
        const [pageSlug, fragment] = pathPart.split('#');

        if (pageSlug.startsWith('skills-')) {
          const skillName = pageSlug.replace('skills-', '');
          const engDoc = path.join(rootDir, 'docs', 'engineering', `${skillName}.md`);
          const prodDoc = path.join(rootDir, 'docs', 'productivity', `${skillName}.md`);
          if (!fs.existsSync(engDoc) && !fs.existsSync(prodDoc)) {
            errors.push({
              file: relFile,
              link: rawUrl,
              msg: `Doc page for skill "${skillName}" not found in docs/engineering/ or docs/productivity/`
            });
          }
        } else if (pageSlug.startsWith('dictionary/')) {
          const term = pageSlug.replace('dictionary/', '').replace(/\/$/, '');
          if (term && term !== 'index') {
            const dictDoc = path.join(rootDir, 'docs', 'dictionary', `${term}.md`);
            if (!fs.existsSync(dictDoc)) {
              errors.push({
                file: relFile,
                link: rawUrl,
                msg: `Dictionary doc for "${term}" not found in docs/dictionary/`
              });
            }
          }
        }
        continue;
      }

      // Ignore generic http / https external links
      if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
        continue;
      }

      // Handle internal relative / absolute paths
      let [filePath, fragment] = rawUrl.split('#');

      // Internal in-page anchor link (#some-anchor)
      if (!filePath && fragment) {
        const headings = fileHeadingMap.get(file);
        if (headings && !headings.has(fragment) && !headings.has(slugify(fragment))) {
          if (!['engineering-skills', 'productivity-skills', 'dictionary-concepts'].includes(fragment)) {
            errors.push({
              file: relFile,
              link: rawUrl,
              msg: `In-page anchor #${fragment} not found in ${relFile}`
            });
          }
        }
        continue;
      }

      // Asset links: /assets/... or assets/...
      if (filePath.startsWith('/assets/') || filePath.startsWith('assets/')) {
        const cleanAssetPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
        const assetTarget = path.join(rootDir, 'docs', cleanAssetPath);
        if (!fs.existsSync(assetTarget)) {
          errors.push({
            file: relFile,
            link: rawUrl,
            msg: `Asset not found: ${assetTarget}`
          });
        }
        continue;
      }

      // Dictionary links: /dictionary/...
      if (filePath.startsWith('/dictionary/')) {
        const term = filePath.replace('/dictionary/', '').replace(/\/$/, '').replace(/\.md$/, '');
        if (term && term !== 'index') {
          const dictTarget = path.join(rootDir, 'docs', 'dictionary', `${term}.md`);
          if (!fs.existsSync(dictTarget)) {
            errors.push({
              file: relFile,
              link: rawUrl,
              msg: `Dictionary target not found: docs/dictionary/${term}.md`
            });
          }
        }
        continue;
      }

      // Relative file path (e.g. ./SKILL.md, ../engineering/ask-fred/SKILL.md)
      if (filePath) {
        let resolvedTarget;
        if (filePath.startsWith('/')) {
          resolvedTarget = path.join(rootDir, filePath.slice(1));
        } else {
          resolvedTarget = path.resolve(dir, filePath);
        }

        if (!fs.existsSync(resolvedTarget)) {
          errors.push({
            file: relFile,
            link: rawUrl,
            msg: `Referenced file does not exist: ${filePath}`
          });
        } else if (fragment && resolvedTarget.endsWith('.md')) {
          const targetHeadings = fileHeadingMap.get(resolvedTarget);
          if (targetHeadings && !targetHeadings.has(fragment) && !targetHeadings.has(slugify(fragment))) {
            errors.push({
              file: relFile,
              link: rawUrl,
              msg: `Anchor #${fragment} not found in ${path.relative(rootDir, resolvedTarget)}`
            });
          }
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`Found ${errors.length} broken link/anchor issue(s):\n`);
    for (const err of errors) {
      console.error(`  - ${err.file}: ${err.msg} (link: ${err.link})`);
    }
    process.exit(1);
  }

  console.log(`Validated ${totalLinksChecked} markdown links and anchors across ${files.length} files.`);
  console.log('All links and anchor targets resolved successfully!\n');
}

checkLinks();

