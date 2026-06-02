# Design System — Fabian Lander Personal Website

## Overview

Austere, elegant personal website for a math PhD student. The aesthetic blends scholarly typographic sensibility with gallery-like whitespace. Content includes academic papers, mathematical exposition (blog), interactive demos, code samples, and graphics. Built with Astro 6, custom CSS, light/dark mode.

The design system was inherited from Steve Trettel's sjtSite template and is retained as-is — it's a strong starting point and changes should be infrequent and deliberate (see `anti-tinkering rules` in `/Users/lander/Documents/planning/CLAUDE.md`).

---

## Typography

### Font Stack

| Role | Font | Fallback | Source |
|------|------|----------|--------|
| **Body text** | EB Garamond (400, 500, 600, 700; italic 400, 500) | Georgia, serif | Google Fonts |
| **Headings, navigation, UI** | IBM Plex Sans (400, 500, 600, 700) | Helvetica Neue, sans-serif | Google Fonts |
| **Code** | JetBrains Mono (400, 500) | Menlo, monospace | Google Fonts |

### Google Fonts Import

```
https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

### Type Scale & Rhythm

- **Body size:** 1.175rem (~18.8px)
- **Body line-height:** 1.68
- **Heading line-height:** 1.2
- **Heading letter-spacing:** -0.02em
- **H1:** 2.5rem, weight 700
- **H2:** 1.5rem, weight 600
- **H3:** 1.15rem, weight 600
- **Code inline:** 0.88em relative to body
- **Code block:** 0.85rem, line-height 1.6
- **Navigation links:** 0.875rem
- **Captions / dates:** 0.8–0.85rem
- **Max content width (prose):** 40rem (~65–75 characters per line)
- **Wide content width (nav, full-bleed):** 54rem
- **Paragraph spacing:** margin-bottom 1.4em

### Design Rationale

EB Garamond provides literary warmth and scholarly character rooted in 16th-century type design. IBM Plex Sans creates modern contrast for headings and UI. JetBrains Mono has generous proportions and coding ligatures suited to GLSL/JS code samples. The serif body + sans heading pairing creates a "scholarly but modern" tension that suits a math researcher's portfolio.

---

## Color Palette

### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#F7F5F0` | Page background (warm off-white) |
| `--bg-subtle` | `#EDEBE6` | Cards, aside backgrounds, art placeholders |
| `--bg-code` | `#F0EDE8` | Code block backgrounds |
| `--text` | `#2C2C2C` | Body text (soft black) |
| `--text-heading` | `#1A1A1A` | Headings (near-black) |
| `--text-secondary` | `#6B6B6B` | Secondary text, captions |
| `--text-tertiary` | `#999999` | Dates, minor labels |
| `--accent` | `#3D5A80` | Links, interactive elements (muted steel blue) |
| `--accent-hover` | `#2C4560` | Link hover state |
| `--border` | `#DDD9D2` | Horizontal rules, card borders |
| `--border-subtle` | `#E6E3DC` | Code block borders, subtle dividers |
| `--code-text` | `#3C3C3C` | Inline and block code text |
| `--selection-bg` | `rgba(61, 90, 128, 0.15)` | Text selection highlight |
| `--shadow` | `rgba(0, 0, 0, 0.06)` | Box shadows |

### Dark Mode (Warm Gray)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#1e1d1b` | Page background (warm gray, not brown) |
| `--bg-subtle` | `#272623` | Cards, aside backgrounds |
| `--bg-code` | `#242320` | Code block backgrounds |
| `--text` | `#d5d3cf` | Body text (warm light gray) |
| `--text-heading` | `#eeecE8` | Headings |
| `--text-secondary` | `#9a9894` | Secondary text, captions |
| `--text-tertiary` | `#6d6b67` | Dates, minor labels |
| `--accent` | `#7a9abb` | Links, interactive elements (light steel blue) |
| `--accent-hover` | `#9ab4d0` | Link hover state |
| `--border` | `#383735` | Horizontal rules, card borders |
| `--border-subtle` | `#302f2d` | Code block borders, subtle dividers |
| `--code-text` | `#cbc9c5` | Inline and block code text |
| `--selection-bg` | `rgba(122, 154, 187, 0.2)` | Text selection highlight |
| `--shadow` | `rgba(0, 0, 0, 0.35)` | Box shadows |

### Design Rationale

Never pure black on pure white. Light mode uses a warm off-white (#F7F5F0) reminiscent of quality paper stock — flattering to EB Garamond and forgiving across diverse artwork colors. Dark mode is warm-side-of-gray (not brown, not cool) with a lighter steel blue accent that shares the same family as the light mode accent. Both modes feel related rather than being a mechanical inversion.

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 0.5rem | Tight gaps (caption above image, label padding) |
| `--space-sm` | 1rem | Heading-to-body gap, code block padding |
| `--space-md` | 2rem | Section subcomponent spacing, nav padding, blockquote indent |
| `--space-lg` | 4rem | Major section gaps, footer top padding |
| `--space-xl` | 6rem | Between top-level page sections |

### Spacing Principles

- More whitespace than you think you need. This is a gallery aesthetic — content floats in space.
- Vertical rhythm between major sections: 4–6rem minimum.
- Images get generous vertical padding; they are the primary content.
- Page margins should be generous on large screens; content should not fill edge-to-edge.

---

## Component Patterns

### Navigation
- Site name top-left in IBM Plex Sans, weight 600, linked
- Horizontal link list top-right in Plex Sans, 0.875rem, secondary color
- Dark/light toggle as a small bordered button with sun/moon icon
- Hamburger menu on small screens (mobile overlay)
- No logo — the name is the logo

### Links
- Underlined with `text-decoration-thickness: 1px` and `text-underline-offset: 2px`
- Accent color, darken on hover
- Smooth color transition (0.2s)

### Code
- Inline: 0.88em, code background color, 0.15em/0.4em padding, 3px border-radius
- Block: bordered, 6px border-radius, 1rem/2rem padding, horizontal overflow scroll

### Blockquotes
- 2px left border in border color
- Left padding 2rem
- Secondary text color, italic

### Horizontal Rules
- 1px top border only, border color
- 4rem vertical margin

### Images / Graphics Pieces
- Full content width or wider
- One piece at a time, not tight grids
- Caption below in Plex Sans 0.85rem, secondary color

### Footer
- Content width, top border
- Plex Sans 0.8rem, tertiary color

---

## Dark/Light Mode Implementation

Toggle by setting `data-theme="light"` or `data-theme="dark"` on the `<html>` element. All colors reference CSS custom properties. Transitions on background-color and color at 0.4s ease for smooth switching.

---

## CSS Custom Properties (Complete)

```css
:root {
  /* Spacing */
  --content-width: 40rem;
  --wide-width: 54rem;
  --body-size: 1.175rem;
  --body-lh: 1.68;
  --heading-lh: 1.2;
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;

  /* Fonts */
  --font-body: 'EB Garamond', 'Georgia', serif;
  --font-sans: 'IBM Plex Sans', 'Helvetica Neue', sans-serif;
  --font-mono: 'JetBrains Mono', 'Menlo', monospace;
}

[data-theme="light"] {
  --bg: #F7F5F0;
  --bg-subtle: #EDEBE6;
  --bg-code: #F0EDE8;
  --text: #2C2C2C;
  --text-heading: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-tertiary: #999999;
  --accent: #3D5A80;
  --accent-hover: #2C4560;
  --border: #DDD9D2;
  --border-subtle: #E6E3DC;
  --code-text: #3C3C3C;
  --selection-bg: rgba(61, 90, 128, 0.15);
  --shadow: rgba(0, 0, 0, 0.06);
}

[data-theme="dark"] {
  --bg: #1e1d1b;
  --bg-subtle: #272623;
  --bg-code: #242320;
  --text: #d5d3cf;
  --text-heading: #eeecE8;
  --text-secondary: #9a9894;
  --text-tertiary: #6d6b67;
  --accent: #7a9abb;
  --accent-hover: #9ab4d0;
  --border: #383735;
  --border-subtle: #302f2d;
  --code-text: #cbc9c5;
  --selection-bg: rgba(122, 154, 187, 0.2);
  --shadow: rgba(0, 0, 0, 0.35);
}
```
