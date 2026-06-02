/**
 * rehype-figure — two-pass image enhancement for prose content.
 *
 * Pass 1: Wraps standalone <img> (sole child of <p>) in <figure>.
 *         Inside :::figure directives, unwraps the <p> instead.
 *         Alt text becomes <figcaption> when present.
 *
 * Pass 2: Detects <figure> elements with multiple images and
 *         converts them into a CSS-grid gallery with sub-figures.
 *         Auto-sets column count if not specified via :::figure{cols=N}.
 */

import { visit, SKIP } from 'unist-util-visit';

export default function rehypeFigure() {
  return (tree) => {
    // --- Pass 1: image wrapping / unwrapping ---
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || index == null || !parent) return;

      const meaningful = node.children.filter(
        (c) => !(c.type === 'text' && c.value.trim() === ''),
      );
      if (meaningful.length === 0) return;

      // Every meaningful child must be an <img>
      const allImages = meaningful.every(
        (c) => c.type === 'element' && c.tagName === 'img',
      );
      if (!allImages) return;

      const parentIsFigure =
        parent.type === 'element' && parent.tagName === 'figure';

      // Inside a :::figure directive — unwrap <p>, place imgs + captions directly
      if (parentIsFigure) {
        const items = [];
        for (const img of meaningful) {
          const alt = String(img.properties?.alt || '').trim();
          items.push(img);
          if (alt) items.push(makeFigcaption(alt));
        }
        parent.children.splice(index, 1, ...items);
        return [SKIP, index + items.length];
      }

      // Single standalone image — wrap in <figure>
      if (meaningful.length === 1) {
        const img = meaningful[0];
        const alt = String(img.properties?.alt || '').trim();
        parent.children[index] = makeFigure(img, alt);
        return SKIP;
      }

      // Multiple standalone images in one <p> — split into individual <figure>s
      const items = meaningful.map((img) => {
        const alt = String(img.properties?.alt || '').trim();
        return makeFigure(img, alt);
      });
      parent.children.splice(index, 1, ...items);
      return [SKIP, index + items.length];
    });

    // --- Pass 2: multi-image figures → gallery with sub-figures ---
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'figure') return;

      const imgs = node.children.filter(
        (c) => c.type === 'element' && c.tagName === 'img',
      );
      if (imgs.length <= 1) return;

      // Add gallery class if not already present (auto-detect)
      const classes = Array.isArray(node.properties.className)
        ? [...node.properties.className]
        : [];
      if (!classes.includes('prose-gallery')) {
        classes.push('prose-gallery');
        node.properties.className = classes;
      }

      // Set auto column count if not specified by :::figure{cols=N}
      const style = String(node.properties.style || '');
      if (!style.includes('--gallery-cols')) {
        const cols = Math.min(imgs.length, 4);
        node.properties.style = style
          ? `${style}; --gallery-cols: ${cols}`
          : `--gallery-cols: ${cols}`;
      }

      // Group each <img> + its following <figcaption> into a sub-figure
      const newChildren = [];
      const { children } = node;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === 'element' && child.tagName === 'img') {
          const sub = [child];
          const next = children[i + 1];
          if (next?.type === 'element' && next.tagName === 'figcaption') {
            sub.push(next);
            i++;
          }
          newChildren.push({
            type: 'element',
            tagName: 'figure',
            properties: { className: ['prose-figure-item'] },
            children: sub,
          });
        } else if (
          !(child.type === 'element' && child.tagName === 'figcaption')
        ) {
          newChildren.push(child);
        }
      }
      node.children = newChildren;
    });
  };
}

function makeFigure(img, alt) {
  const children = [img];
  if (alt) children.push(makeFigcaption(alt));
  return {
    type: 'element',
    tagName: 'figure',
    properties: { className: ['prose-figure'] },
    children,
  };
}

function makeFigcaption(text) {
  return {
    type: 'element',
    tagName: 'figcaption',
    properties: {},
    children: [{ type: 'text', value: text }],
  };
}
