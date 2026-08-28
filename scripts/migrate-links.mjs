import fs from 'node:fs';
import path from 'node:path';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git')) {
        results = results.concat(getFiles(file));
      }
    } else {
      if (file.endsWith('.md') || file.endsWith('.mjs') || file.endsWith('.json') || file.endsWith('.yml')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = getFiles('.');
let totalReplacements = 0;
let modifiedFiles = 0;

for (const file of files) {
  if (file.includes('scripts/import-dictionary.mjs') || file.includes('scripts/migrate-links.mjs')) continue;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace aihero dictionary links
  content = content.replace(/https?:\/\/(?:www\.)?aihero\.dev\/ai-coding-dictionary\/([a-zA-Z0-9_-]+)/g, (match, slug) => {
    let cleanSlug = slug.toLowerCase();
    if (cleanSlug === 'agentsmd') cleanSlug = 'agents-md';
    return `https://fderuiter.github.io/agy-skills/dictionary/${cleanSlug}`;
  });

  // Replace aihero base dictionary link
  content = content.replace(/https?:\/\/(?:www\.)?aihero\.dev\/ai-coding-dictionary\/?/g, 'https://fderuiter.github.io/agy-skills/dictionary/');

  // Replace aihero skills links if any
  content = content.replace(/https?:\/\/(?:www\.)?aihero\.dev\/skills-([a-zA-Z0-9_-]+)/g, 'https://fderuiter.github.io/agy-skills/skills-$1');

  // Replace any generic aihero.dev text references in docs guidance
  if (file.endsWith('writing-docs.md')) {
    content = content.replace(/Because these pages are published on `aihero\.dev`/g, 'Because these pages are published on GitHub Pages');
    content = content.replace(/The ai-hero page template/g, 'The page template');
    content = content.replace(/change it in ai-hero;/g, 'change it in the docs site;');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nLink migration complete. Modified ${modifiedFiles} files.`);

