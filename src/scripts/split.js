/**
 * Minimal word splitter that preserves inline markup (e.g. <span class="accent-text">).
 * Produces: <span class="split-word"><span>word</span></span>
 * Returns the inner spans so they can be animated.
 */
export function splitWords(element, { wrapperClass = 'split-word', inner = true } = {}) {
  const targets = [];

  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent.split(/(\s+)/);
        if (parts.every((p) => !p.trim())) return;

        const fragment = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (!part.trim()) {
            fragment.appendChild(document.createTextNode(part));
            return;
          }
          const outer = document.createElement('span');
          outer.className = wrapperClass;
          if (inner) {
            const innerSpan = document.createElement('span');
            innerSpan.textContent = part;
            outer.appendChild(innerSpan);
            targets.push(innerSpan);
          } else {
            outer.textContent = part;
            targets.push(outer);
          }
          fragment.appendChild(outer);
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('sr-only')) {
        walk(child);
      }
    });
  };

  walk(element);
  return targets;
}
