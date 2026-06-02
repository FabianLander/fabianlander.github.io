# Collaborators System

## Data Source

Collaborator data lives in a single JSON file:

```
src/data/collaborators.json
```

Each entry is keyed by a slug ID:

```json
{
  "jane-smith": {
    "name": "Jane Smith",
    "website": "https://janesmith.com",
    "institution": "MIT"
  }
}
```

Fields: `name` (required), `website`, `institution`, `photo` (filename in `src/data/collaborator-photos/`).

This is **not** an Astro content collection. It's a plain JSON file imported directly wherever collaborator info is needed.

## How Collections Reference Collaborators

Every collection that can have collaborators stores them as **string IDs** in frontmatter:

```yaml
# blog, graphics, software, demos, writing, projects:
collaborators: [jane-smith, dan-margalit]

# papers:
authors: [jane-smith, dan-margalit]
```

The schema type for all of these is `z.array(z.string())` or `z.string().optional()`. No Astro `reference()` is used.

## Resolving at Render Time

At render time, import the JSON and look up by ID:

```astro
---
import collaborators from '../data/collaborators.json';

const post = Astro.props.post;
const authorInfo = post.data.author ? collaborators[post.data.author] : null;
---

{authorInfo && (
  <div class="guest-author">
    <span>Guest post by <a href={authorInfo.website}>{authorInfo.name}</a></span>
    <span>{authorInfo.institution}</span>
  </div>
)}
```

## Author Convention

The site has a single author by default: **Fabian Lander**. Posts and entries do not display author bylines unless a co-author needs explicit attribution.

If a future schema adds an `author` field to the blog collection (currently it does not — all posts are Fabian's), the convention would be:

- `author` field **absent or empty** → it's Fabian's post (the default, no attribution shown)
- `author: "jane-smith"` → guest post, look up from `collaborators.json` and display prominently

For now, co-authors on a paper or project are listed in the `authors` (papers) or `collaborators` (everything else) frontmatter array.

## Notes on the Current Workspace

- `collaborators.json` is currently empty (`{}`). Add entries here as joint work surfaces in publications, papers, or shared projects.
- The admin pages described in the original Steve Trettel template (`/admin/review-art/`, etc.) are not currently wired into this site. If/when bulk-content review becomes useful, see the upstream sjtSite reference for the pattern.
