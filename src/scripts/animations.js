/**
 * Scroll-driven and interactive motion (GSAP + ScrollTrigger).
 * Only loaded when the visitor has not requested reduced motion.
 * The hero entrance itself is pure CSS so it starts on first paint.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from './split.js';
import { initCursor } from './cursor.js';
import { initMagnetic } from './magnetic.js';

const EASE = 'expo.out';

export function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  window.__motionReady = true;

  headings();
  reveals();
  heroParallax();
  work();
  statement();
  processTimeline();
  cta();

  initCursor(gsap);
  initMagnetic(gsap);

  // Web fonts change line lengths → recalculate trigger positions once they are ready.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/* Split headings rise word by word as they enter the viewport */
function headings() {
  gsap.utils.toArray('[data-split]').forEach((el) => {
    const words = splitWords(el);
    el.classList.add('is-split');
    gsap.set(words, { yPercent: 115, rotate: 4 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(words, {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: EASE,
          stagger: 0.05,
        }),
    });
  });
}

/* Generic fade-up reveals, batched so siblings stagger together */
function reveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: EASE,
        stagger: 0.09,
        overwrite: true,
        clearProps: 'transform',
      }),
  });
}

/* Hero: pointer parallax on the layered composition + gentle scroll drift */
function heroParallax() {
  const hero = document.querySelector('.hero');
  const visual = document.querySelector('[data-parallax-hero]');
  if (!hero || !visual) return;

  gsap.to(visual, {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });

  gsap.to('.hero__copy', {
    yPercent: -6,
    opacity: 0.35,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const layers = gsap.utils.toArray('[data-hero-visual] [data-depth]').map((layer) => ({
    depth: parseFloat(layer.dataset.depth) || 0.5,
    x: gsap.quickTo(layer, 'x', { duration: 1.2, ease: 'power3.out' }),
    y: gsap.quickTo(layer, 'y', { duration: 1.2, ease: 'power3.out' }),
  }));

  hero.addEventListener('pointermove', (e) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    layers.forEach(({ depth, x, y }) => {
      x(nx * depth * -28);
      y(ny * depth * -22);
    });
  });

  hero.addEventListener('pointerleave', () => layers.forEach(({ x, y }) => (x(0), y(0))));
}

/* Portfolio: clip-path unveil, image settle and offset-card parallax */
function work() {
  gsap.utils.toArray('[data-work-card]').forEach((card) => {
    const media = card.querySelector('.work-card__media');
    const picture = card.querySelector('[data-work-shot] picture');

    if (media) {
      gsap.fromTo(
        media,
        { clipPath: 'inset(14% 10% 14% 10% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 14px)',
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 45%', scrub: 0.6 },
        },
      );
    }

    if (picture) {
      gsap.fromTo(
        picture,
        { scale: 1.14, yPercent: 4 },
        {
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom 35%', scrub: true },
        },
      );
    }

    if (card.hasAttribute('data-parallax')) {
      gsap.fromTo(
        card,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    }
  });
}

/* "Why us" statement: words fill with ink as you read down the page */
function statement() {
  gsap.utils.toArray('[data-scrub-text]').forEach((el) => {
    const words = splitWords(el, { wrapperClass: 'scrub-word', inner: false });
    gsap.to(words, {
      color: '#1c1b18',
      ease: 'none',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 42%', scrub: 0.4 },
    });
  });

  const orbit = document.querySelector('[data-orbit]');
  if (orbit) {
    gsap.fromTo(
      orbit,
      { rotate: -25, scale: 0.85 },
      {
        rotate: 25,
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.why__layout', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  }
}

/* Process: progress line draws across (desktop) or down (mobile); steps light up in turn */
function processTimeline() {
  const timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;

  const progress = timeline.querySelector('[data-timeline-progress]');
  const steps = gsap.utils.toArray('[data-step]', timeline);

  // Batched so steps sharing a row (desktop) stagger together, while stacked steps (mobile) reveal one by one.
  gsap.set(steps, { opacity: 0, y: 48 });
  ScrollTrigger.batch(steps, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.14, clearProps: 'transform' }),
  });

  const activate = (p) =>
    steps.forEach((step, i) => step.classList.toggle('is-active', p > i / steps.length + 0.01));

  const mm = gsap.matchMedia();

  mm.add('(min-width: 861px)', () => {
    gsap.fromTo(
      progress,
      { scaleX: 0, scaleY: 1 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
          onUpdate: (self) => activate(self.progress),
        },
      },
    );
  });

  mm.add('(max-width: 860px)', () => {
    gsap.fromTo(
      progress,
      { scaleY: 0, scaleX: 1 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.6,
          onUpdate: (self) => activate(self.progress),
        },
      },
    );
  });
}

/* Final CTA panel grows into place as it scrolls in */
function cta() {
  const panel = document.querySelector('[data-cta]');
  if (!panel) return;

  gsap.fromTo(
    panel,
    { scale: 0.92, borderRadius: '72px' },
    {
      scale: 1,
      borderRadius: '40px',
      ease: 'none',
      scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 35%', scrub: true },
    },
  );
}
