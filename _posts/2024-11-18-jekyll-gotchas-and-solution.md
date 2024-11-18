---
layout: post
title: "Jekyll Gotchas and Solutions: A Personal Reference"
date: 2024-11-18
categories: [technical, reference]
---

# Jekyll Setup Reference

This is my personal reference for Jekyll setup issues and solutions I've encountered. Consider it a "note to future self."

## Directory Structure

```
my-blog/
├── _posts/             # Blog posts
├── _drafts/           # Draft posts (no date in filename needed)
├── _includes/         # Reusable components
│   └── head.html      # <head> section, includes MathJax
├── _layouts/          # Template files
├── assets/            # Static files
│   └── images/        # Image files
├── public/            # Theme assets
│   ├── css/          # CSS files
│   └── js/           # JavaScript files
└── _config.yml       # Site configuration
```

## MathJax Setup

### Where to Put MathJax Configuration

The MathJax configuration goes in `_includes/head.html`. Here's my working setup:

```html
<!-- MathJax Configuration -->
<script>
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      macros: {
        vec: ['{\\mathbf{#1}}', 1],
        RR: ['{\\mathbb{R}^{#1}}', 1],
        pitop: '{\\pi^{\\text{top}}}',
        pibot: '{\\pi^{\\text{bot}}}',
        alphatop: '{\\alpha^{\\text{top}}}',
        alphabot: '{\\alpha^{\\text{bot}}}',
        Acal: '{\\mathcal{A}}',
        RV: '{\\mathcal{RV}}',
        lambdab: '{\\left(\\lambda_{i}\\right)}'
      }
    },
    svg: {
      fontCache: 'global'
    }
  };
</script>
<script id="MathJax-script" async 
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
</script>
```

### Math Display Tips

1. **The Colon Issue**: Always add empty lines before and after display math blocks. This won't work:
```markdown
Here's a formula:
$$ f(x) = x^2 $$
```

Instead, use empty lines:
```markdown
Here's a formula:

$$ f(x) = x^2 $$
```

2. **Local Macro Definitions**: You can define macros locally in a post:
```latex
$\gdef\newmacro{\mathcal{N}}$
```

## Images in Jekyll

## Images in Jekyll

### Including Images

Basic markdown syntax:
```markdown
![Alt text](/assets/images/post-specific-folder/image.png)
```

For centered images with captions (flexible, inline styling):
```html
<div style="display: flex; flex-direction: column; align-items: center; margin: 50px auto; max-width: 800px;">
    <img src="assets/images/post-specific-folder/image.png" 
         alt="Alt text" 
         width="600" />
    <span style="font-style: italic; font-size: 14px; color: grey; margin-top: 10px;">
        Image caption here
    </span>
</div>
```

Style breakdown:
- `display: flex`: Creates a flex container
- `flex-direction: column`: Stacks image and caption vertically
- `align-items: center`: Centers both horizontally
- `margin: 50px auto`: Adds vertical space and centers the div
- `max-width: 800px`: Controls maximum width of the container

Common variations:
```html
<!-- Wider container -->
<div style="display: flex; flex-direction: column; align-items: center; margin: 50px auto; max-width: 1000px;">

<!-- Smaller margins -->
<div style="display: flex; flex-direction: column; align-items: center; margin: 20px auto; max-width: 800px;">

<!-- Different caption style -->
<span style="font-style: normal; font-size: 12px; color: #666; margin-top: 15px;">

<!-- Full width image -->
<div style="display: flex; flex-direction: column; align-items: center; margin: 50px auto;">
    <img src="path/to/image.png" alt="Alt text" style="width: 100%; max-width: 1200px;" />
```

### Image Best Practices
- Store images in organized folders under `assets/images/`
- Use descriptive filenames
- Always include alt text for accessibility
- Consider image size and loading time
- Use relative paths with `site.baseurl` if needed

## Front Matter Reference

Common front matter options:
```yaml
---
layout: post
title: "Your Post Title"
date: 2024-11-18
categories: [category1, category2]
tags: [tag1, tag2]
excerpt: "Custom excerpt for the post"
permalink: "/custom-url.html"
---
```

## Local Development

Common commands:
```bash
# Serve locally with draft posts
bundle exec jekyll serve --drafts

# Build site
bundle exec jekyll build

# Update dependencies
bundle update
```

## Theme Customization

### Important Files and Directories
- `_config.yml`: Site configuration
- `_includes/head.html`: Site-wide head section
- `_layouts/`: Custom layouts
- `public/css/`: CSS files
- `public/js/`: JavaScript files
- `assets/images/`: Image files

### Draft Posts
- Place draft posts in `_drafts/` folder
- No date needed in filename for drafts
- View drafts locally with `--drafts` flag

## Useful Links
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Lanyon Theme](https://github.com/poole/lanyon)
- [MathJax Documentation](https://docs.mathjax.org/)