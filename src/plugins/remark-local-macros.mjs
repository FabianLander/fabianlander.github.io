/**
 * remark-local-macros — per-page KaTeX macro support.
 *
 * Finds a math block whose content is *only* \newcommand / \renewcommand
 * definitions, removes it from the tree, and prepends those definitions
 * to every remaining math node on the page so KaTeX can resolve them.
 */

import { visit } from 'unist-util-visit';

const macroRe = /^(\s*\\(?:re)?newcommand\{[^}]+\}(?:\[\d+\])?\{.+\}\s*)+$/;

export default function remarkLocalMacros() {
  return (tree) => {
    let macros = '';

    // First pass: find and remove macro-only math blocks.
    visit(tree, 'math', (node, index, parent) => {
      if (macroRe.test(node.value.trim())) {
        macros += node.value.trim() + '\n';
        parent.children.splice(index, 1);
        return index; // revisit same index after removal
      }
    });

    if (!macros) return;

    // Second pass: prepend collected macros to every remaining math node.
    visit(tree, ['math', 'inlineMath'], (node) => {
      node.value = macros + node.value;
    });
  };
}
