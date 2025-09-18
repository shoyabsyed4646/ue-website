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

  // Create semantic elements
  const blockquote = document.createElement('blockquote');
  blockquote.innerHTML = (quoteField && quoteField.innerHTML) ? quoteField.innerHTML.trim() : '';


  if (quoteField) moveInstrumentation(quoteField, blockquote);

  let cite = null;
  if (authorField) {
    cite = document.createElement('cite');
    cite.textContent = authorField.textContent.trim();
    if (authorField) moveInstrumentation(authorField, cite);
  }
  if (cite) block.replaceChildren(blockquote, cite);
  else block.replaceChildren(blockquote);
}
