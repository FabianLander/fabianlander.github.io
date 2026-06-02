/**
 * remark-directives — custom container/leaf directive handlers.
 *
 * Requires remark-directive to run first (parses :::directive syntax).
 * This plugin transforms the parsed nodes into HTML elements.
 *
 * Supported:
 *   :::figure                 → <figure>, auto-grids if multiple images
 *   :::figure{width="60%"}   → custom width via CSS variable
 *   :::figure{cols=3}        → explicit grid column count
 *   :::figure{cols=2 width="90%"} → both
 *
 *   Shader embeds (all produce <shader-sandbox> custom elements):
 *   ::shader{src="name"}                         → folder mode, 16:9 default
 *   ::shader{src="name.glsl"}                    → single-file mode
 *   ::shader{src="name" size="square"}           → 1:1 aspect ratio
 *   ::shader{src="name" size="wide"}             → 16:9, wider than text column
 *   ::shader{src="name" size="square" width="80%"} → 1:1, 80% of text width
 *   ::shader{src="name" controls}                → show playback controls (off by default)
 *   :::shader{size="square"}                     → inline mode (GLSL from code block child)
 *     ```glsl
 *     void mainImage(...) { ... }
 *     ```
 *   :::
 *
 *   Size presets: square (1:1), wide (16:9), 3x4 (3:4), 4x3 (4:3)
 *   Width: any CSS value (e.g. "80%", "30rem"); controls max-width via --shader-width
 */

import { visit } from 'unist-util-visit';

export default function remarkCustomDirectives() {
  return (tree, file) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective') {
        if (node.name === 'figure') handleFigure(node);
        if (node.name === 'shader') handleShader(node, file);
      }
      if (node.type === 'leafDirective') {
        if (node.name === 'shader') handleShader(node, file);
      }
    });
  };
}

function handleFigure(node) {
  const data = node.data || (node.data = {});
  const attrs = node.attributes || {};
  const classes = ['prose-figure'];
  const styles = [];

  if (attrs.width) styles.push(`--figure-width: ${attrs.width}`);
  if (attrs.cols) {
    classes.push('prose-gallery');
    styles.push(`--gallery-cols: ${attrs.cols}`);
  }

  data.hName = 'figure';
  data.hProperties = {
    className: classes,
    ...(styles.length && { style: styles.join('; ') }),
  };
}

// Size presets: name → aspect-ratio CSS value
const SIZE_PRESETS = {
  square: '1',
  wide: '16/9',
  '3x4': '3/4',
  '4x3': '4/3',
};

function handleShader(node, file) {
  const attrs = node.attributes || {};
  const src = attrs.src;

  const data = node.data || (node.data = {});
  data.hName = 'shader-sandbox';

  // Consume sizing attributes (handled via CSS, not passed to the element)
  const size = attrs.size;
  const width = attrs.width;

  // Build properties: pass through all attributes except consumed ones
  const props = {};
  const skip = new Set(['src', 'class', 'size', 'width']);
  for (const [k, v] of Object.entries(attrs)) {
    if (!skip.has(k)) props[k] = v;
  }
  if (attrs.class) props.className = attrs.class;

  // Default to no controls unless author explicitly enables them
  if (!('controls' in attrs)) {
    props.controls = 'false';
  }

  // Build inline styles from size/width
  const styles = [];
  if (size && SIZE_PRESETS[size]) {
    styles.push(`aspect-ratio: ${SIZE_PRESETS[size]}`);
  }
  if (width) {
    styles.push(`--shader-width: ${width}`);
  }
  if (styles.length) {
    props.style = styles.join('; ');
  }

  if (src) {
    // --- Folder or single-file mode ---
    // Resolve src to a /_blog-assets/ URL from the blog content directory
    const filePath = file.history?.[0] || file.path || '';
    const match = filePath.match(/src\/content\/blog\/(.+?)\/index\.md(x)?$/);
    if (!match) return;

    const blogDir = match[1];
    const isSingleFile = /\.(glsl|frag|vert)$/.test(src);
    props.src = isSingleFile
      ? `/_blog-assets/${blogDir}/shaders/${src}`
      : `/_blog-assets/${blogDir}/shaders/${src}/`;
  } else {
    // --- Inline mode ---
    // Extract GLSL source from the first code block child
    const codeNode = node.children?.find((c) => c.type === 'code');
    if (!codeNode) return;

    // Set code as text content of the <shader-sandbox> element
    node.children = [{ type: 'text', value: codeNode.value }];
  }

  data.hProperties = props;
  if (src) node.children = [];
}
