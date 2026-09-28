# PR Website Design — prwebsitedesign.com

Static Astro site for PR Website Design, a web design and development studio.

## Commands

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm install`     | Install dependencies                                                |
| `npm run dev`     | Start the dev server at `http://localhost:4321`                     |
| `npm run build`   | Build the production site into `dist/`                              |
| `npm run preview` | Serve the production build locally                                  |
| `npm run assets`  | Regenerate the mockups, OG image and icons from `tools/generate-assets.mjs` |

Requires Node 22.12 or newer (Astro 7).

## Design system

- **Palette:** warm ivory `#f7f2ea`, charcoal ink `#1c1b18`, "Signal" vermilion `#ff5a1f` (use `#c2390b` for small accent text), plus peach, mint, butter, sky and blush pastels. The tokens live in `src/styles/tokens.css`.
- **Type:** Bricolage Grotesque for display and Instrument Sans for body text. Both are Google Fonts, self-hosted from `public/fonts`.
- **Motion:** The hero entrance is pure CSS, so it starts on first paint. Scroll animations use GSAP + ScrollTrigger, which load lazily and only when the visitor hasn't asked for reduced motion. Without JavaScript or with reduced motion on, all content is still visible.

## Structure

```
src/
  components/          Header, Footer, Logo, Button, Marquee, WorkCard, ServiceGlyph
    sections/          Hero, HeroVisual, Services, Work, WhyUs, Process, CallToAction
  data/site.ts         All copy, navigation, services, projects and contact details
  layouts/             BaseLayout (SEO, Open Graph, JSON-LD, fonts, icons)
  pages/               index, 404
  scripts/             main (entry), header, animations, split, cursor, magnetic
  styles/              fonts, tokens, base, utilities
  assets/work/         Concept mockups (converted to AVIF/WebP at build)
public/                fonts/, images/, icons/, favicon.svg, robots.txt, site.webmanifest
tools/                 generate-assets.mjs (SVG → PNG artwork generator)
```

## Before launch

Update the placeholder contact details and social URLs in `src/data/site.ts` (`email`, `phone`, `location`, `socials`). The portfolio pieces are clearly labelled concept projects. Replace them with real case studies when you have them.
