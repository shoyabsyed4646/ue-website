export default function decorate(block) {
  const [contentWrapper, tooltipWrapper] = block.children;

  const contentText = contentWrapper?.textContent?.trim() || '';
  const tooltipText = tooltipWrapper?.textContent?.trim() || '';

  const container = document.createElement('span');
  container.className = 'tooltip-container';
  container.tabIndex = 0;

  const trigger = document.createElement('span');
  trigger.className = 'tooltip-trigger';
  trigger.textContent = contentText || 'Info';

  const tip = document.createElement('span');
  tip.className = 'tooltip-bubble';
  tip.textContent = tooltipText || '';

  container.append(trigger, tip);
  block.replaceChildren(container);
}


