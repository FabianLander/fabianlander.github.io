#!/usr/bin/env node
/**
 * Optimize photos in a collection folder before committing.
 *
 * Usage:  node scripts/optimize-photos.js 2026/paris
 *
 * What it does:
 *   1. Converts any .heic/.HEIC files to .jpg using macOS sips
 *   2. Resizes all images to max 3600px (longest side) at quality 85
 *      using sharp with metadata preserved (EXIF dates, etc.)
 *   3. Reports before/after sizes
 */

import { readdir, stat, rename, unlink } from 'node:fs/promises';
import { resolve, extname, basename, join } from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const folder = process.argv[2];
if (!folder) {
  console.error('Usage: node scripts/optimize-photos.js <year/slug>');
  console.error('  e.g. node scripts/optimize-photos.js 2026/paris');
  process.exit(1);
}

const dir = resolve('src/content/photos', folder);

try {
  await stat(dir);
} catch {
  console.error(`Folder not found: ${dir}`);
  process.exit(1);
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const HEIC_EXTS = new Set(['.heic']);
const MAX_DIM = 3600;
const QUALITY = 85;

const files = await readdir(dir);

// --- Step 1: Convert HEIC to JPG via sips ---
let converted = 0;
for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!HEIC_EXTS.has(ext)) continue;

  const src = join(dir, file);
  const dest = join(dir, basename(file, extname(file)) + '.jpg');
  console.log(`  Converting ${file} → ${basename(dest)}`);
  execSync(`sips -s format jpeg -s formatOptions ${QUALITY} "${src}" --out "${dest}"`, {
    stdio: 'pipe',
  });
  await unlink(src);
  converted++;
}
if (converted) console.log(`  Converted ${converted} HEIC file(s)\n`);

// --- Step 2: Resize + compress with sharp ---
const updatedFiles = await readdir(dir);
const images = updatedFiles.filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()));

if (images.length === 0) {
  console.log('No images found to optimize.');
  process.exit(0);
}

console.log(`  Optimizing ${images.length} image(s) in ${folder}/\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of images) {
  const fp = join(dir, file);
  const before = (await stat(fp)).size;
  totalBefore += before;

  const ext = extname(file).toLowerCase();
  const buf = await sharp(fp)
    .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true })
    .rotate()
    .withMetadata()
    [ext === '.png' ? 'png' : 'jpeg']({
      quality: QUALITY,
      ...(ext !== '.png' && { mozjpeg: true }),
    })
    .toBuffer();

  const { writeFile } = await import('node:fs/promises');
  await writeFile(fp, buf);
  totalAfter += buf.length;

  const pct = ((1 - buf.length / before) * 100).toFixed(0);
  const mb = (b) => (b / 1024 / 1024).toFixed(1);
  console.log(`  ${file}  ${mb(before)} → ${mb(buf.length)} MB  (${pct}% saved)`);
}

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.log(`\n  Total: ${mb(totalBefore)} → ${mb(totalAfter)} MB`);
console.log(`  Saved: ${mb(totalBefore - totalAfter)} MB (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)\n`);
