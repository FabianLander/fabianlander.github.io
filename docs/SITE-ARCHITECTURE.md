# Site Architecture Summary

Reference document for the Fabian Lander personal website. Captures the key decisions, content collections, and patterns. Adapted from Steve Trettel's sjtSite template; framework retained, content rebuilt for Fabian.

---

## Who This Is For

**Fabian Lander** — PhD student in geometry, groups and dynamics at the Max Planck Institute for Mathematics in the Sciences (MPI MiS), Leipzig, Germany. The site is a personal portfolio spanning research papers, mathematical exposition (blog), interactive WebGL/math visualizations (demos), code projects, and graphics. Audiences: future employers and future-self (per `/Users/lander/Documents/planning/workflow.md`).

---

## Content Types & Schemas

All content collections are defined in [`src/content.config.ts`](../src/content.config.ts) and live under `src/content/<type>/`. The site uses Astro 6's content layer with `glob`-loaders.

| Collection | Type | Storage |
|---|---|---|
| `papers` | YAML data | `src/content/papers/<slug>.yaml` |
| `writing` | YAML data | `src/content/writing/<slug>.yaml` |
| `projects` | YAML data | `src/content/projects/<slug>.yaml` |
| `blog` | Markdown content | `src/content/blog/<year>/<slug>/index.{md,mdx}` |
| `demos` | Markdown content | `src/content/demos/<year>/<slug>/index.md` |
| `graphics` | Markdown content | `src/content/graphics/<year>/<slug>/index.md` |
| `software` | Markdown content | `src/content/software/<slug>.md` |
| `talks` | Markdown content | `src/content/talks/<slug>/index.md` |
| `photos` | Markdown content | `src/content/photos/<year>/<slug>/index.md` |
| `food` | Markdown content | `src/content/food/<...>` (currently unused) |
| `now` | Markdown content | `src/content/now/current.md` (single entry) |

### Papers

```yaml
title: string
authors: string[]               # array of names
venue: string                   # e.g. "Submitted", "Bridges 2025"
venueUrl?: string
status: 'published' | 'preprint'
date: date
url?: string
arxiv?: string
abstract?: string
subject: string[]               # topic tags
tags: string[]
featured: boolean
```

### Writing

```yaml
title: string
type: 'textbook' | 'course-notes' | 'expository'
description: string
url?: string
date?: date
subject: string[]
tags: string[]
featured: boolean
collaborators: string[]         # slugs from collaborators.json
```

### Projects

```yaml
title: string
url: string                     # external project URL
description: string
image?: string
date?: date
subject: string[]
tags: string[]
featured: boolean
collaborators: string[]
```

### Blog

```yaml
title: string
date: date
description?: string
draft: boolean                  # drafts excluded from production builds
image?: string
subject: string[]
tags: string[]
featured: boolean
collaborators: string[]
```

Body: full markdown / MDX with LaTeX math (KaTeX), custom directives, and `Experiment` component for embedding interactive demos.

### Demos

```yaml
title: string
date: date
description?: string
technique?: string              # e.g. "threejs", "webgl"
url: string                     # path to embedded app
image: string                   # screenshot path
subject: string[]
tags: string[]
featured: boolean
collaborators: string[]
```

Demo apps are stored under `public/apps/<slug>/` and served at `fabianlander.github.io/apps/<slug>/` — see [demos.md](demos.md) for the embedding workflow.

### Graphics

```yaml
title: string
date: date
description?: string
technique?: string
image: string
subject: string[]
tags: string[]
featured: boolean
collaborators: string[]
```

### Software

```yaml
title: string
description: string
tech: string                    # e.g. "JavaScript / Three.js"
github?: string
license?: string
status?: 'active' | 'archived'
subject: string[]
tags: string[]
featured: boolean
collaborators: string[]
```

### Talks

```yaml
title: string
venues: { name: string; date: date; url?: string }[]
abstract?: string
slides?: string                 # URL or path
video?: string                  # URL
subject: string[]
tags: string[]
featured: boolean
```

### Photos

```yaml
title: string
date: string                    # YYYY-MM format only
tags: string[]
description?: string
cover?: string
featured: boolean
```

### Now

```yaml
updated: date                   # last update timestamp
```

Body: short markdown with three sections — Reading / Working on / Open question. Updated weekly via the `/now` slash command (see workflow.md).

### Collaborators (shared data, not a collection)

`src/data/collaborators.json` — lookup table keyed by slug. See [COLLABORATORS.md](COLLABORATORS.md).

### Other data files

- `src/data/courses.json` — teaching history (course, number, term, university, sections)
- `src/data/trips.json` — conference / travel calendar (event, description, location, date, endDate, url)

---

## Routing Structure

```
/                           Home (anchored sections + curated previews)
/now                        Now page — current focus
/blog/                      Blog listing
/blog/<year>/<slug>/        Individual blog post
/demos/                     Demos listing
/demos/<year>/              Demos filtered by year
/papers/                    Papers listing
/talks/                     Talks listing
/talks/<slug>/              Individual talk page
/graphics/                  Graphics listing
/graphics/<year>/           Graphics filtered by year
/software/                  Software listing
/photos/                    Photos gallery (currently empty)
/photos/<year>/             Photos by year
/photos/<tag>/              Photos by tag
/photos/map/                Photo map view
```

---

## Key Display Patterns

### Blog

- Reverse-chronological list with date, title, description, tags
- Drafts (`draft: true`) excluded from production builds, included in dev
- Full markdown rendering with KaTeX math, theorem directives, custom image attributes (`{width=50%}`)

### Demos

- Year-tabbed grid of cards
- Each card: screenshot, title, link
- Detail pages can embed the interactive app via iframe (`Experiment.astro` component)

### Graphics

- Year-tabbed thumbnail grid
- Hover overlay shows title and metadata
- Lightbox (PhotoSwipe) when implemented

### Papers

- Bibliography-style list
- Featured papers at top
- Each entry: title (link to arXiv or venue), authors, venue + year, abstract toggle

---

## Image Optimization Strategy

All images go through Astro's `getImage()` with Sharp:

- **Thumbnails**: 600×600, WebP, quality 85
- **Full size**: 1600×1600, WebP, quality 90
- All gallery images use `loading="lazy"`

---

## Custom Markdown Plugins

### Math via remark-math + rehype-katex

Inline `$x^2$` and display `$$\int_0^1 f$$`. Custom LaTeX macros defined per-post.

### Theorem-style directives (via remark-directive)

```markdown
:::theorem{label="Pythagorean"}
For a right triangle: $a^2 + b^2 = c^2$
:::

:::definition{label="Group"}
A group is a set with...
:::

:::proof
By induction...
:::
```

Supported: `theorem`, `lemma`, `proposition`, `corollary`, `definition`, `example`, `exercise`, `fact`, `nonexample`, `proof`. Each renders as a styled box with a label.

### Image attributes

```markdown
![alt text](image.png){width=50% height=auto .my-class #my-id}
```

Default width 75%, auto-applies `blog-image` class and `loading="lazy"`.

---

## Tech Stack

- **Astro 6** — static site generator with content layer
- **KaTeX** — LaTeX math rendering
- **Sharp** — image optimization
- **exifr** — EXIF metadata extraction (photos collection)
- **remark-math + rehype-katex** — math in markdown
- **remark-directive** — container directives for theorem boxes
- **GitHub Pages** — hosting at https://fabianlander.github.io

---

## Build Scripts

In `scripts/`:

- `new-blog.js` — scaffold a new blog post
- `new-gfx.js` — scaffold a graphics entry
- `new-art.js` — scaffold an art entry (legacy; art collection has been removed)
- `new-photos.js` — scaffold a photo collection

Slash commands defined at `~/.claude/commands/` provide a higher-level interface for the publishing workflow (see `/Users/lander/Documents/planning/workflow.md`).

---

## What Worked Well in the Upstream Template

1. **Year-based directory structure** for blog/demos/graphics — natural organization
2. **Colocated assets** — images alongside `index.md`
3. **Featured flag** — simple boolean for grid prominence
4. **Theorem directive plugin** — essential for math posts
5. **Demo iframe pattern** — embeds interactive apps cleanly
6. **Dark/light toggle** — `data-theme` attribute on `<html>`

## Things to Reconsider for This Site

1. The `art` collection has been removed (Fabian doesn't have an art section yet — can be re-added later if needed)
2. The `food` collection schema is empty and unused — candidate for removal
3. The `writing` collection currently has no entries — defined in case Fabian writes course notes or expository pieces
4. Content collections still use `z` from `astro:content` (deprecated); minor refactor to import from `zod` directly is pending
5. Admin review pages from the upstream template are not wired up — add only if bulk-content review becomes useful
