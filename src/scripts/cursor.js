/**
 * Soft circular cursor follower shown over portfolio previews (fine pointers only).
 */
export function initCursor(gsap) {
  const cursor = document.querySelector('[data-work-cursor]');
  const targets = document.querySelectorAll('[data-cursor]');
  if (!cursor || !targets.length) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const label = cursor.querySelector('[data-work-cursor-label]');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.5, ease: 'power3.out' });

  window.addEventListener(
    'pointermove',
    (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    },
    { passive: true },
  );

  targets.forEach((target) => {
    target.addEventListener('pointerenter', () => {
      if (label) label.textContent = target.dataset.cursor || '';
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.5, ease: 'expo.out' });
    });
    target.addEventListener('pointerleave', () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.4, ease: 'power3.out' });
    });
  });
}
