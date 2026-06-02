#!/usr/bin/env node
/**
 * Scaffold a new photo collection (trip) interactively.
 *
 * Usage:  node scripts/new-photos.js
 *
 * Asks for: title, year-month, location, location tags
 *
 * Creates:
 *   src/content/photos/{year}/{slug}/index.md
 */

import { createInterface } from 'node:readline/promises';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q, fallback = '') =>
  rl.question(`${q} `).then((a) => a.trim() || fallback);

console.log('\n  New Photo Collection\n');

const title = await ask('Title:');
if (!title) { console.error('Title is required.'); process.exit(1); }

const now = new Date();
const defaultDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const date = await ask(`Date (YYYY-MM):`, defaultDate);
if (!/^\d{4}-\d{2}$/.test(date)) {
  console.error('Date must be YYYY-MM format.');
  process.exit(1);
}

const location = await ask('Location (e.g. "Paris, France"):');
const tagsRaw = await ask('Location tags (comma-separated, e.g. "france, paris"):');
const locationTags = tagsRaw
  ? tagsRaw.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean)
  : [];

const description = await ask('Description (optional):');
const featured = (await ask('Featured? (y/N):', 'n')).toLowerCase().startsWith('y');

rl.close();

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const year = date.slice(0, 4);

const dir = resolve('src/content/photos', year, slug);
if (existsSync(dir)) {
  console.error(`\nAlready exists: ${dir}`);
  process.exit(1);
}

await mkdir(dir, { recursive: true });

const lines = [
  `---`,
  `title: "${title}"`,
  `date: "${date}"`,
];
if (location) lines.push(`location: "${location}"`);
if (locationTags.length) {
  lines.push(`locationTags: [${locationTags.map((t) => `"${t}"`).join(', ')}]`);
} else {
  lines.push(`locationTags: []`);
}
if (description) lines.push(`description: "${description}"`);
lines.push(`featured: ${featured}`);
lines.push(`---\n`);

await writeFile(resolve(dir, 'index.md'), lines.join('\n'));

console.log(`\nCreated: src/content/photos/${year}/${slug}/`);
console.log(`  index.md — drop your photos in this folder`);
console.log(`  Then run: node scripts/optimize-photos.js ${year}/${slug}\n`);
