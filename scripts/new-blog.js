#!/usr/bin/env node
/**
 * Scaffold a new blog post interactively.
 *
 * Usage:  node scripts/new-blog.js
 *
 * Asks for: title, description, tags, subject
 * Auto-fills: date (today)
 *
 * Creates:
 *   src/content/blog/{year}/{slug}/index.md
 *   + empty img/ subdirectory
 */

import { createInterface } from 'node:readline/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, fallback = '') =>
  rl.question(`${q} `).then((a) => a.trim() || fallback);

console.log('\n  New Blog Post\n');

const title = await ask('Title:');
if (!title) { console.error('Title is required.'); process.exit(1); }

const description = await ask('Description:');
const tagsRaw = await ask('Tags (comma-separated):');
const subjectRaw = await ask('Subject (comma-separated):');
rl.close();

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const year = new Date().getFullYear();
const date = new Date().toISOString().split('T')[0];

const dir = resolve('src/content/blog', String(year), slug);
if (existsSync(dir)) {
  console.error(`\nAlready exists: ${dir}`);
  process.exit(1);
}

await mkdir(dir, { recursive: true });
await mkdir(resolve(dir, 'img'), { recursive: true });

const yamlList = (items) =>
  items.length ? items.map((i) => `\n  - ${i}`).join('') : ' []';

const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];
const subject = subjectRaw ? subjectRaw.split(',').map((s) => s.trim()).filter(Boolean) : [];

const frontmatter = `---
title: "${title}"
date: '${date}'
description: "${description}"
draft: true
featured: false
tags:${yamlList(tags)}
subject:${yamlList(subject)}
---

`;

await writeFile(resolve(dir, 'index.md'), frontmatter);

const rel = `src/content/blog/${year}/${slug}/`;
console.log(`\nCreated: ${rel}`);
console.log(`  index.md + img/\n`);
