# Demos Architecture

Interactive WebGL/Three.js demos are served from the **same repo** as the main site, under `public/apps/<slug>/`. They deploy together to GitHub Pages at `fabianlander.github.io/apps/<slug>/`.

This is a different pattern from the upstream `sjtSite` template (which uses a separate `sjtDemos` repo + Netlify subdomain). The single-repo approach is simpler at small scale — appropriate while the demo set is small and the total repo size is manageable.

---

## How it works

### Demos live in the main repo

```
sjtSite/                          (or whatever this repo is renamed to)
├── public/
│   └── apps/
│       ├── pointCloudViewer/
│       │   ├── index.html
│       │   ├── bundle.js
│       │   └── screenshot.png
│       ├── raymarchingflatsurfacesapp/   # placeholder for future demos
│       │   └── ...
│       └── ...
└── src/content/demos/
    └── 2025/
        └── point-cloud-viewer/
            ├── index.md
            └── screenshot.png
```

Each demo folder under `public/apps/` is **self-contained** — HTML + bundled JS + textures + screenshots. No build step is required for the demo itself; it's just static files served as-is.

### Metadata in the main site

For each demo, a metadata entry lives in `src/content/demos/<year>/<slug>/index.md`:

```yaml
---
title: Projective Point Cloud Viewer
date: 2025-08-18
description: Minimal Three.js viewer for loading and visualizing JSON point clouds in projective coordinates.
technique: threejs
url: /apps/pointCloudViewer/index.html
image: ./screenshot.png
subject:
  - visualization
tags:
  - threejs
  - point clouds
featured: false
collaborators: []
---

A dark-themed WebGL viewer for projective point cloud data. Load JSON files...
```

The `url` field points to the demo's path within the main site. The `image` is colocated with the metadata file.

---

## Embedding demos in blog posts

The `Experiment.astro` component wraps a demo in an iframe for inline embedding:

```mdx
import Experiment from '../../../../components/Experiment.astro'

<Experiment
  src="https://fabianlander.github.io/apps/pointCloudViewer/"
  title="Point Cloud Viewer"
  height="600px"
/>
```

Use the full GitHub Pages URL so the embed works the same in dev (when the dev server is on a different port) and in production.

---

## URL strategy

Demos are accessed at `fabianlander.github.io/apps/<slug>/`. The `/demos/` route on the main site shows the gallery; clicking through links to the demo URL.

If the demo set grows large enough that the main repo becomes unwieldy (rough threshold: > ~500MB of built assets, or noticeable clone slowness), the upstream pattern of a separate `<username>Demos` repo + subdomain becomes worth adopting. Until then, single-repo is simpler.

---

## Workflow: adding a new demo

1. Build the demo locally (produces a self-contained folder with `index.html` + assets).
2. Copy the built folder into `public/apps/<slug>/`.
3. Create `src/content/demos/<year>/<slug>/index.md` with metadata. A scaffolding script could automate this (see `scripts/` for any existing helpers).
4. Drop a `screenshot.png` next to the metadata file.
5. Run `npm run dev` to preview locally — the demo is at `http://localhost:4321/apps/<slug>/` and the gallery card shows on `/demos`.
6. Commit and push — GitHub Pages publishes both the main site and the demo together.

---

## Self-contained principle

Each demo folder under `public/apps/` is fully portable. It contains everything needed to run: HTML, bundled JavaScript (including Three.js), textures, environment maps. Copy the folder anywhere, open `index.html`, and it works. The website is also the code archive.

---

## Scaling considerations

If the single-repo pattern starts to hurt:

- **Repo size > 500MB:** consider moving demos to a separate `fabianlander-demos` repo, deployed as a separate GitHub Pages site at `<username>-demos.github.io` or a custom subdomain.
- **Build time grows:** GitHub Pages builds skip the `public/` directory contents from any preprocessing, so this is mostly a clone-speed issue, not a build-time issue.
- **Demo updates push the whole site:** acceptable while demo updates are infrequent. Annoying if demos churn weekly.

For now, single-repo is the right answer.
