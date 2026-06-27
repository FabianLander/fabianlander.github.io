// One-off: screenshot every demo's live URL into a screenshot.png next to its
// index.md, so the demos gallery has thumbnails. Uses the installed Chrome.
import puppeteer from 'puppeteer-core';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const ROOT = new URL('../src/content/demos', import.meta.url).pathname;

// Find every index.md under src/content/demos and read its url.
function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (name === 'index.md') out.push(p);
  }
  return out;
}

const entries = walk(ROOT).map((file) => {
  const src = readFileSync(file, 'utf8');
  const url = src.match(/^url:\s*(.+)\s*$/m)?.[1]?.trim();
  return { file, dir: dirname(file), url };
}).filter((e) => e.url && /^https?:\/\//.test(e.url));

console.log(`Found ${entries.length} demos with absolute URLs.`);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=metal'],
  defaultViewport: { width: 1200, height: 750, deviceScaleFactor: 1.5 },
});

let ok = 0, fail = 0;
for (const e of entries) {
  const out = join(e.dir, 'screenshot.png');
  const page = await browser.newPage();
  try {
    await page.goto(e.url, { waitUntil: 'load', timeout: 30000 });
    // Let WebGL/canvas content actually draw.
    await new Promise((r) => setTimeout(r, 4000));
    await page.screenshot({ path: out });
    ok++;
    console.log(`  ✓ ${e.url}`);
  } catch (err) {
    fail++;
    console.log(`  ✗ ${e.url}  (${err.message.split('\n')[0]})`);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`Done: ${ok} captured, ${fail} failed.`);
