#!/usr/bin/env node
/**
 * Scaffold a new art entry interactively.
 *
 * Usage:  node scripts/new-art.mjs
 *
 * Asks for: title, featured
 * Auto-fills: date (today), image (./{slug}.png)
 * Left blank: technique, medium, dimensions, description, exhibitions, tags
 *
 * Creates:
 *   src/content/art/{year}/{slug}/index.md
 */

import { createInterface } from 'node:readline/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, fallback = '') =>
  rl.question(`${q} `).then((a) => a.trim() || fallback);

console.log('\n  New Art Entry\n');

const title = await ask('Title:');
if (!title) { console.error('Title is required.'); process.exit(1); }

const featured = (await ask('Featured? (y/N):', 'n')).toLowerCase().startsWith('y');

rl.close();
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const year = new Date().getFullYear();
const date = new Date().toISOString().split('T')[0];

const dir = resolve('src/content/art', String(year), slug);
if (existsSync(dir)) {
  console.error(`\nAlready exists: ${dir}`);
  process.exit(1);
}

await mkdir(dir, { recursive: true });

const frontmatter = `---
title: "${title}"
technique: ""
medium: ""
date: ${date}
exhibitions: []
image: ./${slug}.png
dimensions: ""
description: ""
subject: []
tags: []
featured: ${featured}
---

`;

await writeFile(resolve(dir, 'index.md'), frontmatter);

console.log(`\nCreated: src/content/art/${year}/${slug}/`);
console.log(`  index.md  — drop ${slug}.png in this folder\n`);
