/**
 * blog-shaders — Astro integration that serves shader files colocated
 * with blog posts (src/content/blog/<post>/shaders/) at predictable URLs.
 *
 * Dev:   Vite middleware serves /_blog-assets/<path> from src/content/blog/<path>
 * Build: Copies shaders/ directories into the output at /_blog-assets/<path>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIR = 'src/content/blog';
const URL_PREFIX = '/_blog-assets/';

export default function blogShaders() {
  let projectRoot;

  return {
    name: 'blog-shaders',
    hooks: {
      'astro:config:setup': ({ updateConfig, config }) => {
        projectRoot = fileURLToPath(config.root);
        const contentRoot = path.join(projectRoot, CONTENT_DIR);

        updateConfig({
          vite: {
            plugins: [
              {
                name: 'blog-shaders-serve',
                configureServer(server) {
                  server.middlewares.use((req, res, next) => {
                    if (!req.url?.startsWith(URL_PREFIX)) return next();

                    const relativePath = decodeURIComponent(
                      req.url.slice(URL_PREFIX.length).split('?')[0],
                    );

                    // Only serve files under shaders/ subdirectories
                    if (!relativePath.includes('/shaders/')) return next();

                    const filePath = path.resolve(contentRoot, relativePath);

                    // Security: stay inside content dir
                    if (!filePath.startsWith(path.resolve(contentRoot))) {
                      res.statusCode = 403;
                      return res.end();
                    }

                    try {
                      if (!fs.statSync(filePath).isFile()) return next();

                      const ext = path.extname(filePath).toLowerCase();
                      const mime = {
                        '.glsl': 'text/plain',
                        '.frag': 'text/plain',
                        '.vert': 'text/plain',
                        '.json': 'application/json',
                        '.png': 'image/png',
                        '.jpg': 'image/jpeg',
                        '.jpeg': 'image/jpeg',
                        '.webp': 'image/webp',
                      };
                      res.setHeader(
                        'Content-Type',
                        mime[ext] || 'application/octet-stream',
                      );
                      res.setHeader('Cache-Control', 'no-cache');
                      fs.createReadStream(filePath).pipe(res);
                    } catch {
                      next();
                    }
                  });
                },
              },
            ],
          },
        });
      },

      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const contentRoot = path.resolve(projectRoot, CONTENT_DIR);

        // Recursively find every shaders/ directory under blog content
        function walk(dirPath, base = '') {
          if (!fs.existsSync(dirPath)) return;
          for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
            const rel = path.join(base, entry.name);
            if (entry.isDirectory()) {
              if (entry.name === 'shaders') {
                copyDir(
                  path.join(dirPath, entry.name),
                  path.join(outDir, '_blog-assets', rel),
                );
              } else {
                walk(path.join(dirPath, entry.name), rel);
              }
            }
          }
        }

        walk(contentRoot);
      },
    },
  };
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
