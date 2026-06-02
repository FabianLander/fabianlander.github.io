# Homepage Design Plan — Fabian Lander Personal Website

## Overview

Single-page scrolling homepage for a math PhD student at MPI MiS Leipzig. The page is both a curated portfolio and a directory to all site content. The aesthetic is "gallery meets textbook" — austere, generous whitespace, visual work shown large, text content treated typographically.

The homepage is organized into three creative domains (**Illustration**, **Code**, **Writing**) plus a compact academic section (papers, talks, courses, trips). A `/now` page tracks current work and is linked in the nav.

---

## Design System Reference

See [DESIGN.md](DESIGN.md) for the full color palette, typography, and spacing tokens. Key points:

- **Body text:** EB Garamond
- **Headings / UI / Nav:** IBM Plex Sans
- **Code:** JetBrains Mono
- **Light mode:** warm off-white `#F7F5F0`, steel blue accent `#3D5A80`
- **Dark mode:** warm gray `#1e1d1b`, light steel blue accent `#7a9abb`
- **Content width:** 40rem for prose, 54rem for wide elements
- **Dark/light toggle** via `data-theme` attribute on `<html>`

---

## Site Structure

### Content pages (in nav)

| Domain | Page | URL | Description |
|---|---|---|---|
| Illustration | Graphics | `/graphics` | Mathematical illustrations, year-by-year thumbnail grid |
| Code | Software | `/software` | Polished software projects with descriptions and GitHub links |
| Code | Demos | `/demos` | Interactive WebGL/Three.js apps — embedded via iframe |
| Writing | Blog | `/blog` | Posts: research notes, reading-group writeups, tutorials, Tier 2 archive |
| Status | Now | `/now` | What I'm currently reading, working on, and chewing on. Updated weekly. |

### Additional pages (not in main nav)

- `/papers` — full list of academic papers
- `/talks` — full list of talks with slides/recordings (when present)
- `/photos` — photo gallery (currently unused; reserved)

### Navigation bar

```
Fabian Lander          Graphics · Software · Demos · Blog · Now    ☼/☾
```

When on the homepage, these anchor-scroll to the relevant section. From any other page, they link to the dedicated page for that content type. Dark/light toggle as a small button at the right.

Academic content (papers, talks, courses, trips) does NOT appear in the main nav. It lives in the academic section at the bottom of the homepage.

---

## Homepage Sections (top to bottom)

### 1. Hero / Introduction

Compact. Profile photo on the left, intro text on the right.

- **Photo:** `src/assets/ProfilePic.png`
- **Name** as h1: "Fabian Lander"
- **2–3 sentences** of introduction in EB Garamond body text. Currently:
  > "Hello! I'm a PhD student in geometry, groups and dynamics at the Max Planck Institute for Mathematics in the Sciences in Leipzig, Germany. This site collects my illustration, code, and writing."

The work below is the real introduction.

---

### 2. Illustration (Graphics)

- **Label:** small uppercase "ILLUSTRATION"
- **Heading:** "Graphics" (linked to `/graphics`)
- **Content:** thumbnail grid of recent graphics entries (currently 0 — collection empty until Fabian adds entries).
- **Bottom bar:** "Showing N of M graphics / Browse all →" linking to `/graphics`

---

### 3. Code (Demos + Software)

#### Demos (subsection)

- **Label:** small uppercase "CODE"
- **Heading:** "Demos" (linked to `/demos`)
- **Content:** thumbnail grid of recent demos (currently 1: Projective Point Cloud Viewer).
- **Bottom bar:** "Showing N of M demos / Browse all →" linking to `/demos`

#### Software (subsection)

- **Heading:** "Software" (linked to `/software`)
- **Content:** vertical list of software projects (currently empty — Steve's `threejs-demos` was removed; add Fabian's repos as relevant).
- Each entry: title (linked to GitHub or detail page), description, tech meta line (JetBrains Mono).

---

### 4. Writing (Blog)

- **Label:** small uppercase "WRITING"
- **Heading:** "Blog" (linked to `/blog`)
- **Content:** dated list of recent posts. Each row: title (link) and date (right-aligned, IBM Plex Sans).
- Currently 8 posts spanning 2024–2026 covering reading seminars, math exposition, and tutorials.
- **Bottom bar:** "Showing 5 of N posts / All posts →" linking to `/blog`

---

### 5. Recent Papers

Compact two-column section at the bottom of the homepage.

- **Heading:** "Recent Papers"
- 5 most recent papers
- Each entry: title (linked to arXiv or venue), authors, venue + year in small secondary text
- "All papers →" link to `/papers`

Currently 2 papers:

- *Symplectic billiards for pairs of polygons* (Albers, Lander, Westermann — preprint, 2024)
- *Immersive Visualization of Flat Surfaces Using Ray Marching* (Lander, Taha — Bridges 2025)

---

### 6. Talks + Courses + Trips

Three small modules, two-column on desktop, single column on mobile.

- **Recent Talks:** 2–3 talks with venue and year. Currently empty (Steve's gravitational-photograph talk was removed; add Fabian's talks as they happen).
- **Currently Teaching / Courses:** loaded from `src/data/courses.json`. Filter for current term.
- **Upcoming Trips / Travel:** loaded from `src/data/trips.json`. Filter for upcoming.

---

### 7. Footer

Minimal. Content-width, top border.

- Name (Fabian Lander)
- Links: GitHub · LinkedIn · Email (mailto)
- IBM Plex Sans, 0.8rem, tertiary color

---

## Key Design Principles

### Visual hierarchy through treatment, not size

Graphics get thumbnails. Software gets descriptions. Blog gets a dated list. Each content type gets the presentation that suits it.

### "See more" bars as wayfinding

Every subsection on the homepage ends with a full-width bordered bar that:

1. Tells you how much you're seeing ("Showing 3 of 47")
2. Invites you to the full archive ("Browse all →")
3. Is a single clickable element with a hover state

### One click from homepage to any content

The homepage is a curated preview. Every piece shown on the homepage links directly to either the item itself or the archive page.

### Now page is the "alive" signal

The `/now` page is the main signal that this site is being maintained. Updated weekly during the Sunday ritual. See the workflow document at `/Users/lander/Documents/planning/workflow.md` for ritual details.

---

## Responsive Notes

- Hero: photo and text stack vertically on mobile
- Thumbnail grids: 4 columns → 3 columns on tablet → 2 columns on mobile
- Academic section: 2 columns → 1 column on mobile
- Nav: hamburger menu on small screens (already implemented in `Nav.astro`)

---

## Pages Not Detailed Here

Individual page designs (e.g. what `/blog` looks like, what a single blog post looks like) are not covered here. This document covers only the homepage layout and overall site structure.

---

## Notes on Adapted-from-sjtSite

This site was bootstrapped from Steve Trettel's `sjtSite` Astro template and has been rebranded for Fabian Lander. Sections that were specific to Steve's hobbies (food photography, Steve's photo galleries) have been removed. The structural framework — the design system, the content-collections approach, the demo embedding pattern — remains.
