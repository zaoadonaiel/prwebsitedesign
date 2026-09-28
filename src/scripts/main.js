/**
 * Client entry point. Astro bundles this as a deferred module.
 * - Header behaviour always runs (it is functional, not decorative).
 * - GSAP + ScrollTrigger are loaded lazily and only when motion is allowed.
 */
import { initHeader } from './header.js';

initHeader();

const root = document.documentElement;

if (root.classList.contains('motion')) {
  import('./animations.js')
    .then(({ initAnimations }) => initAnimations())
    .catch((error) => {
      console.error('[motion] animations failed to start', error);
      root.classList.remove('motion');
    });
}
