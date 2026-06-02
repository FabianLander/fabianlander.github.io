# Fabian Lander — Personal Website

Astro 6 static site for a math PhD student. Hosted on GitHub Pages at `https://fabianlander.github.io`.

## Commands

- `npm run dev` — local dev server (localhost:4321)
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build locally

## Architecture

### Content collections (`src/content/`)

All content is managed via Astro content collections defined in `src/content.config.ts`.

| Collection | Format | Location |
|---|---|---|
| `blog` | `.md` or `.mdx` folders by year | `blog/{year}/{slug}/index.md(x)` |
| `papers` | `.yaml` flat files | `papers/{slug}.yaml` |
| `talks` | `.md` folders (flat) | `talks/{slug}/index.md` |
| `demos` | `.md` folders by year | `demos/{year}/{slug}/index.md` |
| `graphics` | `.md` folders by year | `graphics/{year}/{slug}/index.md` |
| `art` | `.md` folders by year | `art/{year}/{slug}/index.md` |
| `software` | `.md` flat files | `software/{slug}.md` |
| `writing` | `.yaml` flat files | `writing/{slug}.yaml` |
| `projects` | `.yaml` flat files | `projects/{slug}.yaml` |

### Blog posts

- Use `.md` for plain markdown posts.
- Use `.mdx` when you need to import components (e.g. embedding an interactive app).
- LaTeX math works in both via remark-math + rehype-katex. Custom macros are in `src/macros.tex`.
- Images go in an `img/` subfolder next to `index.md`.
- Scaffolding: `node scripts/new-blog.js`

### Embedding interactive apps in blog posts

Apps are hosted as separate GitHub repos deployed to GitHub Pages (e.g. `fabianlander.github.io/my-app/`). They are embedded in `.mdx` blog posts via the `Experiment` component:

```mdx
import Experiment from '../../../../components/Experiment.astro'

<Experiment src="https://fabianlander.github.io/my-app/" title="My App" height="600px" />
```

See `docs/embedding-experiments-in-astro.md` for the full workflow.

### Demos vs blog posts

- **Demo entries** (`src/content/demos/`) are metadata-only cards that appear on the Demos page and homepage grid. They link to an external URL where the app is hosted.
- **Blog posts** can embed the same app inline via iframe for a more narrative presentation.
- An app can have both a demo entry and a blog post about it.

### Markdown features

- KaTeX math: `$inline$` and `$$display$$`
- Custom macros: defined in `src/macros.tex`, available in all posts
- Figures: `:::figure` directive (supports `width`, `cols` attributes)
- Shaders: `::shader{src="name"}` directive (uses shader-sandbox)
- Local macros: per-post LaTeX macros via remark-local-macros

### Data files (`src/data/`)

- `courses.json` — teaching history (array of objects with course, number, term, university, sections)
- `trips.json` — conference/travel calendar (array with event, description, location, date, endDate, url)
- `collaborators.json` — collaborator lookup table (keyed by slug)

### Static assets

- `public/` — served as-is at the site root (favicons, static app builds if any)
- `src/assets/` — processed by Astro (profile photo, etc.)

### Key files

- `astro.config.mjs` — site config, markdown plugins, integrations
- `src/content.config.ts` — content collection schemas (source of truth for frontmatter fields)
- `src/layouts/Layout.astro` — base HTML layout (head, nav, footer, theme toggle)
- `src/components/Nav.astro` — navigation bar
- `src/components/Footer.astro` — footer with social links
- `src/components/Experiment.astro` — iframe wrapper for embedding apps
- `src/plugins/remark-directives.mjs` — custom markdown directives (figure, shader)

### Scaffolding scripts (`scripts/`)

- `node scripts/new-blog.js` — new blog post
- `node scripts/new-gfx.js` — new graphics entry
- `node scripts/new-art.js` — new art entry
- `node scripts/new-photos.js` — new photo collection

## Conventions

- Page titles follow the pattern: `"Page Name — Fabian Lander"`
- Content is organized by year where applicable (`blog/2025/`, `demos/2025/`, etc.)
- Slugs are lowercase, hyphen-separated
- Demo URLs should use full absolute URLs when pointing to external GitHub Pages apps
- The dev server requires a restart when adding new files to `public/`
