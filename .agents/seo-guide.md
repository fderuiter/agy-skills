# agy-skills SEO & Discoverability Guide

This guide details the repository and documentation SEO configuration, metadata standards, and search engine optimization practices for **agy-skills**.

---

## 1. GitHub Repository Configuration

To ensure maximum discoverability on GitHub and AI search engines:

### Repository Description
> Curated, production-grade agent skills and workflows for Google Antigravity (AGY) and Claude Code.

### Recommended GitHub Topics / Tags
Configure these topics in the GitHub repository settings (About > Topics):
- `google-antigravity`
- `antigravity-skills`
- `agent-skills`
- `ai-coding`
- `agentic-workflows`
- `claude-code`
- `test-driven-development`
- `code-review`
- `developer-tools`
- `prompt-engineering`
- `llm-agents`

### Social Preview Card
Set the repository social preview image to `docs/assets/images/og-card.png` in GitHub Settings > General > Social preview.

---

## 2. Documentation SEO & Jekyll Pipeline

The documentation site is hosted on GitHub Pages at `https://fderuiter.github.io/agy-skills/` and built via Jekyll in `.github/workflows/deploy-docs.yml`.

### SEO Plugins
- `jekyll-seo-tag`: Injects OpenGraph meta tags, Twitter cards, canonical links, and baseline schema.
- `jekyll-sitemap`: Automatically compiles `sitemap.xml` listing all pages.
- `jekyll-relative-links`: Resolves markdown relative links to clean URLs.

### Structured Data (Schema.org JSON-LD)
`docs/_includes/head-custom.html` automatically injects JSON-LD graphs for:
- `SoftwareApplication` / `SoftwareSourceCode`: Identifies `agy-skills` as a developer tool suite.
- `BreadcrumbList`: Enables rich breadcrumb navigation on Google Search results.
- `TechArticle`: Provides article and metadata context for skill pages.

---

## 3. Front Matter Standards for New Skills

Every promoted doc page in `docs/engineering/` and `docs/productivity/` must provide YAML front matter:

```yaml
---
title: "<skill-name>: <Descriptive Role> | agy-skills"
description: "<150-160 character snippet describing what the skill does, invocation mode, and key value proposition.>"
keywords: ["antigravity skills", "<skill-name>", "<target keyword 1>", "<target keyword 2>"]
permalink: /skills-<skill-name>/
---
```

### Constraints Checklist:
1. `description` must be between 50 and 160 characters.
2. `keywords` must contain at least 3 relevant search terms.
3. `permalink` must strictly follow `/skills-<skill-name>/`.
4. No em-dashes anywhere in the prose.

---

## 4. Automated CI SEO Auditing

Run the SEO validation script locally:
```bash
npm run check-seo
```

This runs automatically on every pull request and push to `main` via `.github/workflows/deploy-docs.yml`.

---

## 5. Search Engine Submission

### Google Search Console
1. Add property `https://fderuiter.github.io/agy-skills/` in Google Search Console.
2. If using HTML tag verification, add your verification code to `docs/_config.yml`:
   ```yaml
   google_site_verification: "your_token_here"
   ```
3. Submit sitemap URL: `https://fderuiter.github.io/agy-skills/sitemap.xml`.

