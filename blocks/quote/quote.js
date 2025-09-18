import { moveInstrumentation } from "../../scripts/scripts";

export default function decorate(block) {
  // Extract field wrappers: [quoteDiv, authorDiv]
  const [quoteWrapper, authorWrapper] = block.children;

  // --- QUOTE ---
  const blockquote = document.createElement('blockquote');
  blockquote.innerHTML = quoteWrapper.innerHTML.trim();

  // Move AEM instrumentation attributes (data-aue-prop) to <blockquote>
  moveInstrumentation(quoteWrapper, blockquote);


  // --- AUTHOR ---
  const cite = document.createElement('cite');
  cite.innerHTML = authorWrapper.textContent.trim();

  // Move AEM instrumentation attributes to <cite>
  moveInstrumentation(authorWrapper, cite);


  // --- Replace block contents with semantic HTML ---
  block.replaceChildren(blockquote, cite);
}