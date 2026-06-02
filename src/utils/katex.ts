import katex from 'katex';

/**
 * Render inline LaTeX ($...$) and display LaTeX ($$...$$) in a string to HTML.
 * Runs at build time — zero client-side JS.
 */
export function renderMath(text: string): string {
  // Display math first ($$...$$) to avoid matching as two inline $...$
  let result = text.replace(/\$\$([^$]+)\$\$/g, (_, math) =>
    katex.renderToString(math.trim(), { throwOnError: false, displayMode: true })
  );

  // Inline math ($...$)
  result = result.replace(/\$([^$]+)\$/g, (_, math) =>
    katex.renderToString(math.trim(), { throwOnError: false, displayMode: false })
  );

  return result;
}
