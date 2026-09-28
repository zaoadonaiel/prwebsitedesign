/**
 * Sticky header state, mobile menu and active-section highlighting.
 */
export function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const toggleLabel = document.querySelector('[data-menu-label]');
  let menuOpen = false;

  /* ---------- scroll state: background + hide on scroll down ---------- */
  let lastY = window.scrollY;
  let ticking = false;

  const updateScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);

    const delta = y - lastY;
    if (!menuOpen && y > 480 && delta > 6) header.classList.add('is-hidden');
    else if (delta < -6 || y < 480) header.classList.remove('is-hidden');

    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
  updateScroll();

  // Keyboard users tabbing into the header should always see it.
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  /* ---------- mobile menu ---------- */
  if (toggle && menu) {
    const links = [...menu.querySelectorAll('a')];

    const setOpen = (open) => {
      menuOpen = open;
      toggle.setAttribute('aria-expanded', String(open));
      if (toggleLabel) toggleLabel.textContent = open ? 'Close menu' : 'Open menu';
      document.body.style.overflow = open ? 'hidden' : '';
      header.classList.remove('is-hidden');

      if (open) {
        menu.hidden = false;
        // next frame so the clip-path transition runs from the closed state
        requestAnimationFrame(() => {
          requestAnimationFrame(() => menu.classList.add('is-open'));
        });
        setTimeout(() => links[0]?.focus({ preventScroll: true }), 350);
      } else {
        menu.classList.remove('is-open');
        menu.hidden = true;
      }
    };

    toggle.addEventListener('click', () => setOpen(!menuOpen));

    links.forEach((link) =>
      link.addEventListener('click', () => {
        if (menuOpen) setOpen(false);
      }),
    );

    document.addEventListener('keydown', (event) => {
      if (!menuOpen) return;

      if (event.key === 'Escape') {
        setOpen(false);
        toggle.focus();
        return;
      }

      // Simple focus trap: toggle button + menu links
      if (event.key === 'Tab') {
        const focusables = [toggle, ...links];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    // Close the overlay if the viewport grows into desktop layout.
    window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
      if (e.matches && menuOpen) setOpen(false);
    });
  }

  /* ---------- active nav link ---------- */
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const sections = navLinks
    .map((link) => document.getElementById(link.dataset.navLink))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) =>
      navLinks.forEach((link) => {
        const active = link.dataset.navLink === id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((section) => observer.observe(section));
  }
}
