# Embedding Standalone JS Projects in an Astro Blog

A workflow for writing math visualizations (Three.js, D3, etc.) as independent GitHub repos and embedding them in Astro blog posts — without copy-pasting build artifacts.

## Overview

The idea is simple: each experiment is its own repo, deployed to GitHub Pages automatically. Your Astro blog embeds it via iframe. The two projects are completely decoupled.

```
┌─────────────────────────┐       ┌──────────────────────────────┐
│  Experiment Repo         │       │  Astro Blog Repo              │
│  (e.g. fourier-viz)     │       │                                │
│                          │       │  src/content/blog/             │
│  src/main.js             │       │    fourier-post.mdx            │
│  package.json            │       │      └─ <iframe src="..."/>    │
│  vite.config.js          │       │                                │
│  .github/workflows/      │       │  src/components/               │
│    deploy.yml            │       │    Experiment.astro             │
│                          │       │                                │
│  push ──► GitHub Actions │       │                                │
│           ──► GitHub Pages│◄─────│  iframe loads from Pages URL   │
└─────────────────────────┘       └──────────────────────────────┘
```

## Part 1: Experiment Repo Setup

### Project structure

Use Vite as your bundler. A typical experiment repo looks like this:

```
fourier-viz/
├── src/
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml
```

### Vite config

GitHub Pages serves your project at `https://<user>.github.io/<repo-name>/`, so you need to set the `base` path:

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/fourier-viz/',  // must match your repo name
})
```

### .gitignore

Standard setup — don't commit build output or dependencies:

```
node_modules/
dist/
```

### GitHub Actions workflow

Create `.github/workflows/deploy.yml`. This installs dependencies, builds the project, and deploys to GitHub Pages automatically on every push to `main`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci

      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - id: deployment
        uses: actions/deploy-pages@v4
```

### Enable GitHub Pages

In your experiment repo, go to **Settings → Pages** and set the source to **GitHub Actions**.

### Development workflow

```bash
npm run dev      # develop locally as usual
git push         # push source code; GitHub Actions builds and deploys
```

Your experiment is now live at `https://<user>.github.io/fourier-viz/`.

---

## Part 2: Astro Blog Setup

### Install MDX support

MDX lets you use components inside your markdown blog posts:

```bash
npx astro add mdx
```

### Create an Experiment component

This is a reusable wrapper for embedding experiments. Create it at `src/components/Experiment.astro`:

```astro
---
const { src, title, height = "500px" } = Astro.props;
---

<figure class="experiment-embed">
  <iframe
    src={src}
    title={title}
    style={`width: 100%; height: ${height}; border: none; border-radius: 8px;`}
    loading="lazy"
    allow="fullscreen"
  />
  <figcaption>
    <a href={src} target="_blank" rel="noopener">Open in new tab ↗</a>
  </figcaption>
</figure>

<style>
  .experiment-embed {
    margin: 2rem 0;
  }
  figcaption {
    text-align: right;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
</style>
```

### Use it in a blog post

Write your blog posts as `.mdx` files so you can import the component:

```mdx
---
title: "Understanding Fourier Transforms"
date: 2025-02-20
---

import Experiment from '../../components/Experiment.astro'

# Understanding Fourier Transforms

The Fourier transform decomposes a function into its constituent frequencies.
Here's an interactive visualization:

<Experiment
  src="https://yourusername.github.io/fourier-viz/"
  title="Fourier Transform Visualizer"
  height="600px"
/>

As you can see in the demo above, adjusting the frequency slider...
```

You can also skip the component and write a plain iframe directly in MDX:

```html
<iframe
  src="https://yourusername.github.io/fourier-viz/"
  title="Fourier Transform Visualizer"
  style="width: 100%; height: 600px; border: none;"
  loading="lazy"
/>
```

The component just saves you from repeating styling boilerplate.

---

## Part 3: Math Content in Astro

For equations in your blog posts, install `remark-math` and `rehype-katex`:

```bash
npm install remark-math rehype-katex
```

Add them to `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})
```

Include the KaTeX stylesheet in your layout's `<head>`:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
/>
```

Now you can write LaTeX in your blog posts:

```mdx
The Fourier transform of $f(t)$ is defined as:

$$
\hat{f}(\xi) = \int_{-\infty}^{\infty} f(t) \, e^{-2\pi i \xi t} \, dt
$$
```

---

## Summary

The day-to-day workflow:

1. **Start a new experiment** — create a repo, add the GitHub Actions workflow, set `base` in Vite config.
2. **Develop locally** — `npm run dev`, iterate with Three.js / D3 / whatever.
3. **Push** — GitHub Actions builds and deploys to GitHub Pages.
4. **Write a blog post** — create an `.mdx` file in your Astro blog, embed the experiment with `<Experiment src="..." />` or a plain `<iframe>`.
5. **Deploy your blog** — the iframe points to the live GitHub Pages URL; the experiment updates independently.

No build artifacts in git. No copy-pasting. Push source code, everything else is automatic.
