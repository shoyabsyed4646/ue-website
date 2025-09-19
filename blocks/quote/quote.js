// export default function decorate(block) {
//     const [quoteWrapper] = block.children;

//     const blockquote = document.createElement('blockquote');
//     blockquote.textContent = quoteWrapper.textContent.trim();
//     quoteWrapper.replaceChildren(blockquote);
//   }

import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cols = [...block.querySelectorAll(':scope > div > div')];

  const quoteCol = cols[0] || block.querySelector(':scope > div') || block;
  const authorCol = cols[1] || null;

  const findFieldEl = (col) => {
    if (!col) return col;
    const instrumented = col.querySelector('[data-aue-prop]');
    if (instrumented) return instrumented;
    return col.querySelector(':scope > div') || col.querySelector(':scope > *') || col;
  };

  const quoteField = findFieldEl(quoteCol);
  const authorField = findFieldEl(authorCol);

  // --- QUOTE ---
  const blockquote = document.createElement('blockquote');
  blockquote.innerHTML = (quoteField && quoteField.innerHTML) ? quoteField.innerHTML.trim() : '';

  if (quoteField) {
    moveInstrumentation(quoteField, blockquote);
  }
  // fallback if no data-aue-prop came from DOM
  if (!blockquote.hasAttribute('data-aue-prop')) {
    blockquote.setAttribute('data-aue-prop', 'quote');
  }

  // --- AUTHOR ---
  let cite = null;
  if (authorField) {
    cite = document.createElement('cite');
    cite.textContent = authorField.textContent.trim();

    moveInstrumentation(authorField, cite);

    if (!cite.hasAttribute('data-aue-prop')) {
      cite.setAttribute('data-aue-prop', 'author');
    }
  }

  // --- Replace with semantic HTML ---
  if (cite) {
    block.replaceChildren(blockquote, cite);
  } else {
    block.replaceChildren(blockquote);
  }
}
