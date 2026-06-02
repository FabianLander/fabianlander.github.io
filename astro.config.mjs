// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import remarkCustomDirectives from './src/plugins/remark-directives.mjs';
import remarkLocalMacros from './src/plugins/remark-local-macros.mjs';
import rehypeFigure from './src/plugins/rehype-figure.mjs';
import blogShaders from './src/integrations/blog-shaders.mjs';
import yaml from '@rollup/plugin-yaml';

import mdx from '@astrojs/mdx';

// Parse src/macros.tex into a { '\\macro': 'expansion' } object for KaTeX
function loadMacros(path) {
  const src = fs.readFileSync(path, 'utf-8');
  const macros = {};
  for (const line of src.split('\n')) {
    const m = line.match(
      /^\\(?:re)?newcommand\{(\\[^}]+)\}(?:\[\d+\])?\{(.+)\}$/,
    );
    if (m) macros[m[1]] = m[2];
  }
  return macros;
}

const katexMacros = loadMacros(
  new URL('./src/macros.tex', import.meta.url).pathname,
);

// https://astro.build/config
export default defineConfig({
  site: 'https://fabianlander.github.io',
  output: 'static',
  devToolbar: { enabled: false },
  vite: { plugins: [yaml()] },
  integrations: [sitemap(), blogShaders(), mdx()],
  markdown: {
    remarkPlugins: [remarkMath, remarkLocalMacros, remarkDirective, remarkCustomDirectives],
    rehypePlugins: [[rehypeKatex, { macros: katexMacros }], rehypeFigure],
    shikiConfig: {
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      defaultColor: false,
    },
  },
});