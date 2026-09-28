/**
 * Central content + configuration for the site.
 * Update contact placeholders and social URLs here — every component reads from this file.
 */

export const site = {
  name: 'PR Website Design',
  url: 'https://prwebsitedesign.com',
  title: 'PR Website Design — Custom Web Design & Development Studio',
  description:
    'PR Website Design is an independent studio crafting custom websites, WordPress builds and e-commerce experiences that make ambitious businesses impossible to ignore.',
  tagline: 'Websites that make your business impossible to ignore.',
  locale: 'en_US',
  ogImage: '/images/og-image.png',
  // Placeholder email — replace before launch.
  email: 'hello@prwebsitedesign.com',
  phone: '+1 939 229 9233',
  phoneHref: 'tel:+19392299233',
  address: {
    street: 'S, 72 Calle 65 De Infanteria #117',
    city: 'Lajas',
    postalCode: '00667',
    region: 'Puerto Rico',
    country: 'PR',
  },
} as const;

export const projectMailto = `mailto:${site.email}?subject=${encodeURIComponent('New project enquiry')}`;

export const navLinks = [
  { label: 'Home', href: '/#top', id: 'top' },
  { label: 'Services', href: '/#services', id: 'services' },
  { label: 'Our Work', href: '/#work', id: 'work' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Contact', href: '/#contact', id: 'contact' },
] as const;

// Placeholder profiles — swap `#` for real profile URLs.
export const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Behance', href: '#' },
] as const;

export type ServiceGlyph = 'design' | 'develop' | 'wordpress' | 'commerce' | 'redesign' | 'care';

export interface Service {
  title: string;
  description: string;
  glyph: ServiceGlyph;
  tags: string[];
  tint: string;
}

export const services: Service[] = [
  {
    title: 'Custom Website Design',
    description:
      'Art-directed, pixel-considered interfaces shaped around your brand, your audience and the one thing you need visitors to do.',
    glyph: 'design',
    tags: ['UI / UX', 'Art direction', 'Prototyping'],
    tint: 'var(--c-peach)',
  },
  {
    title: 'Website Development',
    description:
      'Hand-built, standards-first front ends that load fast, read beautifully on any screen and stay easy to extend.',
    glyph: 'develop',
    tags: ['Astro', 'Headless', 'Accessibility'],
    tint: 'var(--c-sky)',
  },
  {
    title: 'WordPress Development',
    description:
      'Bespoke WordPress themes and block-based editing so your team can publish confidently without breaking the design.',
    glyph: 'wordpress',
    tags: ['Custom themes', 'Gutenberg', 'Migrations'],
    tint: 'var(--c-butter)',
  },
  {
    title: 'E-commerce Solutions',
    description:
      'Storefronts designed to convert — considered product pages, frictionless checkout and a catalogue that is a joy to browse.',
    glyph: 'commerce',
    tags: ['Shopify', 'WooCommerce', 'Checkout UX'],
    tint: 'var(--c-mint)',
  },
  {
    title: 'Website Redesign',
    description:
      'We keep what works, rethink what does not and relaunch a sharper site without losing the search visibility you have earned.',
    glyph: 'redesign',
    tags: ['UX audit', 'Content strategy', 'SEO-safe'],
    tint: 'var(--c-blush)',
  },
  {
    title: 'Maintenance & Optimization',
    description:
      'Updates, backups, speed tuning and thoughtful improvements every month, so your website keeps getting better after launch.',
    glyph: 'care',
    tags: ['Care plans', 'Core Web Vitals', 'Security'],
    tint: 'var(--c-sand-deep)',
  },
];

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  services: string[];
  tint: string;
  layout: 'wide' | 'tall' | 'narrow' | 'offset';
}

/**
 * Concept projects — original explorations created by the studio to show range.
 * They are not client work; update with real case studies when available.
 */
export const projects: Project[] = [
  {
    slug: 'moss-mineral',
    title: 'Moss & Mineral',
    category: 'E-commerce · Botanical skincare',
    description:
      'A calm, tactile storefront for a small-batch skincare label — ingredient storytelling first, checkout in three quiet steps.',
    services: ['Design', 'Shopify', 'Art direction'],
    tint: 'var(--c-mint)',
    layout: 'wide',
  },
  {
    slug: 'atelier-nord',
    title: 'Atelier Nord',
    category: 'Portfolio · Architecture studio',
    description:
      'An editorial portfolio for an architecture practice where generous whitespace and a strict grid let the buildings speak.',
    services: ['Design', 'Astro', 'CMS'],
    tint: 'var(--c-sand-deep)',
    layout: 'tall',
  },
  {
    slug: 'ledgerline',
    title: 'Ledgerline',
    category: 'SaaS · Finance platform',
    description:
      'A product marketing site that turns a complex finance tool into a clear, confident story with interactive product moments.',
    services: ['UX', 'Development', 'Motion'],
    tint: 'var(--c-sky)',
    layout: 'narrow',
  },
  {
    slug: 'fournee',
    title: 'Fournée Bakehouse',
    category: 'Hospitality · Artisan bakery',
    description:
      'A warm WordPress site with online pre-orders, seasonal menus the owners edit themselves and a very tempting homepage.',
    services: ['WordPress', 'WooCommerce', 'Branding'],
    tint: 'var(--c-peach)',
    layout: 'offset',
  },
];

export const principles = [
  {
    title: 'Unique, custom-designed',
    text: 'No templates, no themes bought off a shelf. Every layout is drawn for your brand and your customers.',
    glyph: 'unique',
  },
  {
    title: 'Mobile-first & responsive',
    text: 'Designed from the smallest screen up, then refined for tablets, laptops and big desktop displays.',
    glyph: 'responsive',
  },
  {
    title: 'Performance-focused',
    text: 'Lean code, optimised images and static rendering for pages that feel instant and score well on Core Web Vitals.',
    glyph: 'performance',
  },
  {
    title: 'User-friendly experiences',
    text: 'Clear journeys, readable type and accessible interactions that make it effortless to say yes.',
    glyph: 'friendly',
  },
  {
    title: 'SEO-friendly structure',
    text: 'Semantic HTML, clean metadata, fast pages and a sensible content structure search engines understand.',
    glyph: 'seo',
  },
  {
    title: 'Reliable communication',
    text: 'One dedicated point of contact, honest timelines and support that continues long after launch day.',
    glyph: 'support',
  },
] as const;

export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    text: 'We dig into your business, audience and goals, then shape a clear plan, sitemap and content strategy.',
    outputs: ['Workshop', 'Sitemap', 'Project plan'],
  },
  {
    number: '02',
    title: 'Design',
    text: 'Moodboards become a visual direction, then polished, responsive designs you can click through and react to.',
    outputs: ['Art direction', 'UI design', 'Prototype'],
  },
  {
    number: '03',
    title: 'Develop',
    text: 'We build with clean, fast, accessible code, connect your CMS and test on every device that matters.',
    outputs: ['Build', 'CMS setup', 'QA testing'],
  },
  {
    number: '04',
    title: 'Launch',
    text: 'We go live carefully — redirects, analytics and SEO in place — then keep improving with ongoing support.',
    outputs: ['Go-live', 'Training', 'Care plan'],
  },
] as const;
