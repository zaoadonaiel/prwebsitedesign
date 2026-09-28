/**
 * Generates the site's original raster assets from hand-authored SVG:
 *   - src/assets/work/*.png   concept-project website mockups (Astro converts to AVIF/WebP at build)
 *   - public/images/og-image.png
 *   - public/favicon.svg + public/icons/*.png
 *
 * Run with: npm run assets
 * The outputs are committed, so this only needs re-running when artwork changes.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => resolve(root, p);

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

/* ---------- tiny helpers ---------- */
const bar = (x, y, w, h = 10, fill = '#d9d4ca', r) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r ?? h / 2}" fill="${fill}"/>`;
const text = (x, y, str, { size = 16, fill = '#111', weight = 400, family = SANS, anchor = 'start', ls = 0, style = '' } = {}) =>
  `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${ls}" ${style}>${str}</text>`;
const pill = (x, y, w, h, fill, label, color, size = 18, weight = 600) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>` +
  text(x + w / 2, y + h / 2 + size * 0.36, label, { size, fill: color, weight, anchor: 'middle' });
const svg = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${
    bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''
  }${body}</svg>`;

/* ---------- 1. Moss & Mineral — botanical skincare e-commerce ---------- */
function mossMineral() {
  const green = '#2f4a3a';
  const cream = '#f2f0e7';
  const mint = '#cfe3d4';
  const clay = '#d9a58a';
  const bottle = (x, y, w, h, body, cap, label = true) => `
    <rect x="${x + w * 0.3}" y="${y - h * 0.18}" width="${w * 0.4}" height="${h * 0.2}" rx="6" fill="${cap}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w * 0.22}" fill="${body}"/>
    ${label ? `<rect x="${x + w * 0.16}" y="${y + h * 0.36}" width="${w * 0.68}" height="${h * 0.3}" rx="6" fill="${cream}" opacity=".9"/>
    ${bar(x + w * 0.26, y + h * 0.45, w * 0.48, 7, green)}${bar(x + w * 0.32, y + h * 0.55, w * 0.36, 5, '#9bb3a3')}` : ''}`;
  const leaf = (cx, cy, rx, ry, rot, fill) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="${fill}"/>
     <line x1="${cx}" y1="${cy - ry}" x2="${cx}" y2="${cy + ry}" stroke="${cream}" stroke-width="2" opacity=".5" transform="rotate(${rot} ${cx} ${cy})"/>`;
  const product = (x, name, price, body, tint) => `
    <rect x="${x}" y="880" width="330" height="250" rx="18" fill="${tint}"/>
    ${bottle(x + 128, 930, 74, 150, body, green)}
    ${text(x, 1165, name, { size: 22, fill: green, weight: 600 })}
    ${text(x + 330, 1165, price, { size: 22, fill: green, anchor: 'end' })}`;

  return svg(1600, 1200, `
    <rect width="1600" height="44" fill="${green}"/>
    ${text(800, 29, 'Small-batch botanicals · Carbon-neutral shipping', { size: 16, fill: cream, anchor: 'middle', ls: 1 })}
    ${text(80, 118, 'Moss &amp; Mineral', { size: 34, fill: green, family: SERIF, style: 'font-style="italic"' })}
    ${['Shop', 'Rituals', 'Ingredients', 'Journal'].map((l, i) => text(620 + i * 130, 112, l, { size: 19, fill: green })).join('')}
    ${text(1400, 112, 'Search', { size: 19, fill: green })}
    <circle cx="1510" cy="106" r="22" fill="${green}"/>${text(1510, 113, '2', { size: 17, fill: cream, anchor: 'middle', weight: 700 })}

    <!-- hero copy -->
    ${pill(80, 220, 210, 42, mint, 'NEW · Dew Serum', green, 16)}
    ${text(80, 380, 'Skin,', { size: 148, fill: green, family: SERIF })}
    ${text(80, 530, 'grounded.', { size: 148, fill: green, family: SERIF, style: 'font-style="italic"' })}
    ${bar(84, 590, 470, 12, '#b9c4b8')}${bar(84, 616, 420, 12, '#b9c4b8')}${bar(84, 642, 300, 12, '#b9c4b8')}
    ${pill(80, 700, 250, 66, green, 'Shop the ritual', cream, 20)}
    ${text(370, 741, 'Take the skin quiz →', { size: 20, fill: green, weight: 600 })}

    <!-- hero art -->
    <path d="M820 800V500a330 330 0 0 1 660 0v300z" fill="${mint}"/>
    <circle cx="1320" cy="380" r="80" fill="${clay}"/>
    ${leaf(930, 520, 40, 120, -28, '#8fb49b')}${leaf(1000, 470, 34, 110, -8, green)}${leaf(1400, 560, 38, 118, 24, '#8fb49b')}
    <rect x="880" y="700" width="540" height="100" rx="8" fill="#e6dccb"/>
    <rect x="860" y="690" width="580" height="22" rx="8" fill="#efe6d6"/>
    ${bottle(960, 480, 120, 210, green, clay)}
    ${bottle(1110, 560, 96, 130, clay, green)}
    ${bottle(1240, 520, 104, 170, '#f6f2ea', green)}

    <!-- products -->
    ${text(80, 845, 'Bestsellers', { size: 34, fill: green, family: SERIF })}
    ${text(1520, 845, 'View all', { size: 19, fill: green, anchor: 'end', weight: 600 })}
    ${product(80, 'Dew Serum', '$48', green, '#e3ecdf')}
    ${product(440, 'Clay Mask', '$36', clay, '#f1e2d6')}
    ${product(800, 'Root Oil', '$54', '#f6f2ea', '#e8e3d6')}
    ${product(1160, 'Moss Mist', '$28', '#8fb49b', '#dfe9e8')}
  `, cream);
}

/* ---------- 2. Atelier Nord — architecture studio portfolio ---------- */
function atelierNord() {
  const bg = '#ecebe6';
  const ink = '#161616';
  const building = (x, y, s = 1) => `
    <g transform="translate(${x} ${y}) scale(${s})">
      <polygon points="0,260 220,210 220,420 0,440" fill="#cfccc4"/>
      <polygon points="220,210 470,250 470,430 220,420" fill="#a9a59c"/>
      <polygon points="0,260 220,210 470,250 250,300" fill="#e2dfd8"/>
      <polygon points="80,120 300,80 300,230 80,262" fill="#d8d5ce"/>
      <polygon points="300,80 430,110 430,248 300,230" fill="#8f8b82"/>
      <polygon points="80,120 300,80 430,110 210,150" fill="#f1efea"/>
      ${[0, 1, 2].map((i) => `<polygon points="${255 + i * 70},${275 + i * 6} ${300 + i * 70},${282 + i * 6} ${300 + i * 70},${400} ${255 + i * 70},${398}" fill="#3c3a36" opacity=".85"/>`).join('')}
      <polygon points="110,140 280,110 280,200 110,228" fill="#2c2b28" opacity=".8"/>
      <rect x="-40" y="436" width="560" height="14" fill="#b8b4ab"/>
    </g>`;
  return svg(1600, 1200, `
    <!-- grid lines -->
    ${[400, 800, 1200].map((x) => `<line x1="${x}" y1="0" x2="${x}" y2="1200" stroke="${ink}" stroke-opacity=".07"/>`).join('')}
    ${text(80, 100, 'ATELIER NORD', { size: 22, fill: ink, weight: 700, ls: 6 })}
    ${['Projects', 'Practice', 'Journal', 'Contact'].map((l, i) => text(820 + i * 170, 100, l, { size: 19, fill: ink })).join('')}
    <line x1="80" y1="140" x2="1520" y2="140" stroke="${ink}"/>

    ${text(76, 320, 'Quiet', { size: 160, fill: ink, weight: 300, ls: -6 })}
    ${text(76, 480, 'structures.', { size: 160, fill: ink, weight: 300, ls: -6 })}
    ${bar(84, 570, 360, 10, '#b3afa6')}${bar(84, 594, 300, 10, '#b3afa6')}${bar(84, 618, 330, 10, '#b3afa6')}

    <!-- hero photo (illustrated) -->
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d7dde0"/><stop offset="1" stop-color="#eeeae2"/></linearGradient>
    </defs>
    <rect x="820" y="190" width="700" height="600" fill="url(#sky)"/>
    <circle cx="1400" cy="290" r="44" fill="#f4efe6"/>
    ${building(930, 230, 1)}
    <rect x="820" y="690" width="700" height="100" fill="#c9c5bb"/>
    ${text(820, 830, 'Villa Sjö — Coastal residence', { size: 19, fill: ink, weight: 600 })}
    ${text(1520, 830, '01 / 12', { size: 19, fill: ink, anchor: 'end' })}

    <!-- index -->
    ${[['02', 'Harbour Library', 'Civic'], ['03', 'Birch House', 'Residential'], ['04', 'Studio Kvarn', 'Workplace']]
      .map(([n, t, c], i) => `
        <line x1="80" y1="${720 + i * 70}" x2="700" y2="${720 + i * 70}" stroke="${ink}" stroke-opacity=".2"/>
        ${text(80, 760 + i * 70, n, { size: 18, fill: '#7a766e' })}
        ${text(160, 760 + i * 70, t, { size: 26, fill: ink })}
        ${text(700, 760 + i * 70, c, { size: 18, fill: '#7a766e', anchor: 'end' })}`)
      .join('')}

    <!-- thumbs -->
    ${[0, 1, 2].map((i) => `
      <rect x="${80 + i * 490}" y="930" width="460" height="230" fill="${['#d6d2c9', '#c6cbcc', '#ddd6cb'][i]}"/>
      <g transform="translate(${80 + i * 490} 930)">
        <polygon points="${[
          '60,230 60,110 240,70 240,230',
          '120,230 120,60 330,60 330,230',
          '40,230 200,90 380,230',
        ][i]}" fill="${['#9d998f', '#8e9495', '#a3998a'][i]}"/>
        <rect x="${[250, 150, 170][i]}" y="${[120, 100, 160][i]}" width="${[120, 40, 50][i]}" height="${[110, 130, 70][i]}" fill="#3a3834" opacity=".75"/>
      </g>`).join('')}
  `, bg);
}

/* ---------- 3. Ledgerline — fintech SaaS ---------- */
function ledgerline() {
  const navy = '#10203f';
  const blue = '#2f5bff';
  const bg = '#f3f6fb';
  const soft = '#dfe7f5';
  const chart = 'M0 180 C60 170 90 120 150 128 S240 70 300 90 390 40 450 52 540 10 600 20';
  return svg(1600, 1200, `
    <defs>
      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${blue}" stop-opacity=".28"/><stop offset="1" stop-color="${blue}" stop-opacity="0"/></linearGradient>
      <radialGradient id="glow" cx=".5" cy=".3" r=".6"><stop offset="0" stop-color="#cfe0ff"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1600" height="1200" fill="url(#glow)"/>
    <circle cx="96" cy="92" r="16" fill="${blue}"/><rect x="88" y="84" width="16" height="16" rx="3" fill="#fff" opacity=".9"/>
    ${text(124, 100, 'Ledgerline', { size: 26, fill: navy, weight: 700, ls: -0.5 })}
    ${['Product', 'Solutions', 'Pricing', 'Customers', 'Docs'].map((l, i) => text(520 + i * 135, 99, l, { size: 18, fill: '#43506b' })).join('')}
    ${text(1300, 99, 'Sign in', { size: 18, fill: navy, weight: 600 })}
    ${pill(1390, 70, 130, 46, navy, 'Get started', '#fff', 17)}

    ${pill(640, 170, 320, 40, '#fff', '●  New — Real-time cash flow', navy, 16, 500)}
    ${text(800, 300, 'Finance that finally', { size: 92, fill: navy, weight: 700, anchor: 'middle', ls: -3 })}
    ${text(800, 400, 'makes sense.', { size: 92, fill: blue, weight: 700, anchor: 'middle', ls: -3 })}
    ${bar(560, 440, 480, 12, '#c3cde0')}${bar(620, 466, 360, 12, '#c3cde0')}
    ${pill(620, 510, 190, 58, blue, 'Start free trial', '#fff', 18)}
    ${pill(826, 510, 160, 58, '#fff', 'Book a demo', navy, 18)}

    <!-- dashboard -->
    <rect x="180" y="630" width="1240" height="640" rx="24" fill="#fff" stroke="${soft}" stroke-width="2"/>
    <rect x="180" y="630" width="230" height="640" rx="24" fill="#f8faff"/>
    <rect x="386" y="630" width="24" height="640" fill="#f8faff"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="210" y="${690 + i * 52}" width="18" height="18" rx="5" fill="${i === 1 ? blue : '#c9d3e6'}"/>${bar(240, 694 + i * 52, [110, 90, 120, 80, 100, 70][i], 10, i === 1 ? navy : '#d3dbea')}`).join('')}

    ${[['Cash balance', '$482,190', '+12.4%'], ['Monthly burn', '$38,420', '−3.1%'], ['Runway', '18.6 mo', '+2.0']]
      .map(([l, v, d], i) => `
        <rect x="${440 + i * 320}" y="660" width="296" height="128" rx="16" fill="${i === 0 ? navy : '#f5f8fd'}"/>
        ${text(466 + i * 320, 700, l, { size: 16, fill: i === 0 ? '#9fb0d4' : '#6b7894' })}
        ${text(466 + i * 320, 752, v, { size: 38, fill: i === 0 ? '#fff' : navy, weight: 700, ls: -1 })}
        ${pill(636 + i * 320, 680, 80, 28, i === 0 ? '#2b3f6b' : '#e3f4ea', d, i === 0 ? '#8ff0b6' : '#1f8a4c', 14)}`)
      .join('')}

    <rect x="440" y="812" width="616" height="330" rx="16" fill="#f5f8fd"/>
    ${text(466, 850, 'Cash flow', { size: 18, fill: navy, weight: 700 })}
    <g transform="translate(466 900)">
      ${[0, 1, 2, 3].map((i) => `<line x1="0" y1="${i * 60}" x2="564" y2="${i * 60}" stroke="${soft}"/>`).join('')}
      <path d="${chart} V220 H0Z" fill="url(#fill)" transform="scale(.94 1)"/>
      <path d="${chart}" fill="none" stroke="${blue}" stroke-width="4" stroke-linecap="round" transform="scale(.94 1)"/>
      <circle cx="${450 * 0.94}" cy="52" r="9" fill="#fff" stroke="${blue}" stroke-width="4"/>
    </g>

    <rect x="1080" y="812" width="316" height="330" rx="16" fill="#f5f8fd"/>
    ${text(1106, 850, 'Spend by team', { size: 18, fill: navy, weight: 700 })}
    ${[120, 190, 90, 150, 60].map((h, i) => `<rect x="${1110 + i * 54}" y="${1110 - h}" width="34" height="${h}" rx="8" fill="${i === 1 ? blue : '#c9d6f2'}"/>`).join('')}

    <!-- floating notification -->
    <g transform="translate(1210 560)">
      <rect width="300" height="96" rx="18" fill="#fff" stroke="${soft}" stroke-width="2"/>
      <circle cx="44" cy="48" r="22" fill="#e3f4ea"/><path d="M34 48l7 7 13-14" stroke="#1f8a4c" stroke-width="4" fill="none" stroke-linecap="round"/>
      ${text(80, 42, 'Invoice paid', { size: 18, fill: navy, weight: 700 })}
      ${text(80, 68, '$12,400 · just now', { size: 15, fill: '#6b7894' })}
    </g>
  `, bg);
}

/* ---------- 4. Fournée Bakehouse — artisan bakery ---------- */
function fournee() {
  const brown = '#4f2e1d';
  const cream = '#fbf1e3';
  const butter = '#f2cf73';
  const terra = '#d6744a';
  const loaf = (cx, cy, rx, ry, fill = '#c98a4b') => `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"/>
    <ellipse cx="${cx}" cy="${cy - ry * 0.12}" rx="${rx * 0.92}" ry="${ry * 0.8}" fill="#dca060"/>
    ${[-0.45, 0, 0.45].map((o) => `<path d="M${cx + o * rx - rx * 0.16} ${cy - ry * 0.45} q${rx * 0.2} ${ry * 0.4} ${rx * 0.32} ${ry * 0.8}" stroke="#f3d7a8" stroke-width="${ry * 0.1}" fill="none" stroke-linecap="round"/>`).join('')}`;
  const croissant = (cx, cy) => {
    // Five baked segments along a gentle arc; centre drawn last so it sits on top.
    const segs = [
      [-118, 34, 30, 24, -58],
      [118, 34, 30, 24, 58],
      [-68, 2, 40, 34, -30],
      [68, 2, 40, 34, 30],
      [0, -12, 50, 44, 0],
    ];
    return segs
      .map(
        ([dx, dy, rx, ry, rot]) =>
          `<ellipse cx="${cx + dx}" cy="${cy + dy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx + dx} ${cy + dy})" fill="#d99650" stroke="#b36c35" stroke-width="4"/>
           <ellipse cx="${cx + dx}" cy="${cy + dy - ry * 0.3}" rx="${rx * 0.5}" ry="${ry * 0.28}" transform="rotate(${rot} ${cx + dx} ${cy + dy})" fill="#f0bd7a" opacity=".7"/>`
      )
      .join('');
  };
  const bun = (cx, cy) => `
    <circle cx="${cx}" cy="${cy}" r="72" fill="#d99650"/>
    <path d="M${cx} ${cy} m-6 0 a6 6 0 1 1 12 0 a16 16 0 1 1 -30 0 a28 28 0 1 1 52 0 a42 42 0 1 1 -76 0" stroke="#8a4f28" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M${cx - 50} ${cy - 30} q20 -18 40 -4" stroke="#fff6e8" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>`;
  const card = (x, fill, art, name, price) => `
    <rect x="${x}" y="820" width="440" height="330" rx="28" fill="${fill}"/>
    ${art}
    ${text(x + 32, 1110, name, { size: 30, fill: brown, family: SERIF })}
    ${pill(x + 300, 1078, 110, 44, brown, price, cream, 18)}`;
  return svg(1600, 1200, `
    ${text(80, 110, 'Fournée', { size: 44, fill: brown, family: SERIF, style: 'font-style="italic"' })}
    ${text(248, 110, 'BAKEHOUSE', { size: 15, fill: brown, weight: 700, ls: 4 })}
    ${['Menu', 'Pre-order', 'Our story', 'Visit'].map((l, i) => text(760 + i * 140, 104, l, { size: 20, fill: brown })).join('')}
    ${pill(1340, 70, 180, 54, terra, 'Order ahead', '#fff', 18)}

    ${text(80, 330, 'Baked at dawn,', { size: 104, fill: brown, family: SERIF })}
    ${text(80, 450, 'gone by noon.', { size: 104, fill: terra, family: SERIF, style: 'font-style="italic"' })}
    ${bar(84, 510, 440, 12, '#e1cdb4')}${bar(84, 536, 380, 12, '#e1cdb4')}
    ${pill(80, 592, 240, 66, brown, 'See today’s bakes', cream, 19)}
    ${text(350, 633, 'Open 7am — 2pm', { size: 20, fill: brown, weight: 600 })}

    <!-- hero art -->
    <circle cx="1150" cy="440" r="300" fill="${butter}"/>
    <circle cx="1150" cy="440" r="240" fill="none" stroke="${brown}" stroke-width="2" stroke-dasharray="4 12"/>
    <ellipse cx="1150" cy="640" rx="300" ry="36" fill="#e8b85a" opacity=".6"/>
    ${loaf(1150, 470, 230, 130)}
    <g transform="rotate(-12 1400 220)">
      <circle cx="1400" cy="220" r="78" fill="${terra}"/>
      ${text(1400, 212, 'FRESH', { size: 22, fill: '#fff', weight: 700, anchor: 'middle', ls: 3 })}
      ${text(1400, 242, 'daily', { size: 26, fill: '#fff', family: SERIF, anchor: 'middle', style: 'font-style="italic"' })}
    </g>
    ${[[880, 250], [930, 690], [1440, 640]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${brown}"/>`).join('')}

    ${text(80, 780, 'This morning’s menu', { size: 36, fill: brown, family: SERIF })}
    ${card(80, '#f6dfc6', croissant(300, 950), 'Butter croissant', '$4.5')}
    ${card(580, '#f3e2b6', loaf(800, 960, 150, 84), 'Sourdough', '$9')}
    ${card(1080, '#f2d0c0', bun(1300, 950), 'Cardamom bun', '$5')}
  `, cream);
}

/* ---------- Brand mark (used for favicon + icons + OG) ---------- */
const markInner = (s = 1, ink = '#1c1b18', bg = '#f7f2ea', accent = '#ff5a1f') => `
  <rect width="${40 * s}" height="${40 * s}" rx="${11 * s}" fill="${ink}"/>
  <g transform="scale(${s})">
    <path d="M13 29.5V11h8.2a6 6 0 0 1 0 12H13" fill="none" stroke="${bg}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M21 23l7.5 7.5" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
  </g>`;

function ogImage() {
  const star = 'M20 0c1.6 10.2 9.8 18.4 20 20-10.2 1.6-18.4 9.8-20 20-1.6-10.2-9.8-18.4-20-20C10.2 18.4 18.4 10.2 20 0z';
  return svg(1200, 630, `
    <defs><filter id="b" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="60"/></filter></defs>
    <circle cx="1020" cy="120" r="260" fill="#ffd9c4" filter="url(#b)"/>
    <circle cx="880" cy="560" r="220" fill="#cfe7d6" filter="url(#b)"/>
    <circle cx="1060" cy="420" r="150" fill="#f7e6a4" filter="url(#b)"/>
    <g transform="translate(72 64)">${markInner(1.6)}</g>
    ${text(150, 108, '<tspan font-weight="800">PR</tspan> Website Design', { size: 30, fill: '#1c1b18', weight: 500 })}
    ${text(72, 300, 'Websites that make your', { size: 76, fill: '#1c1b18', weight: 700, ls: -3 })}
    ${text(72, 390, 'business <tspan fill="#ff5a1f">impossible</tspan>', { size: 76, fill: '#1c1b18', weight: 700, ls: -3 })}
    ${text(72, 480, 'to ignore.', { size: 76, fill: '#1c1b18', weight: 700, ls: -3 })}
    <path d="M398 406C480 396 610 394 752 404" stroke="#1c1b18" stroke-width="6" fill="none" stroke-linecap="round"/>
    ${text(72, 568, 'Custom web design &amp; development · prwebsitedesign.com', { size: 24, fill: '#45413a' })}
    <g transform="translate(990 250) scale(3)"><path d="${star}" fill="#ff5a1f"/></g>
  `, '#f7f2ea');
}

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">${markInner(1)}</svg>\n`;

/* ---------- write everything ---------- */
async function png(svgString, file, width) {
  await mkdir(dirname(out(file)), { recursive: true });
  let img = sharp(Buffer.from(svgString), { density: 144 });
  if (width) img = img.resize({ width });
  await img.png({ compressionLevel: 9 }).toFile(out(file));
  console.log('✓', file);
}

const work = { 'moss-mineral': mossMineral, 'atelier-nord': atelierNord, ledgerline, fournee };
for (const [slug, fn] of Object.entries(work)) {
  await png(fn(), `src/assets/work/${slug}.png`, 1600);
}

await png(ogImage(), 'public/images/og-image.png', 1200);

await writeFile(out('public/favicon.svg'), faviconSvg);
console.log('✓ public/favicon.svg');
const iconSvg = (size, pad = 0) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-pad} ${-pad} ${40 + pad * 2} ${40 + pad * 2}">${
    pad ? `<rect x="${-pad}" y="${-pad}" width="${40 + pad * 2}" height="${40 + pad * 2}" fill="#1c1b18"/>` : ''
  }${markInner(1)}</svg>`;
await png(iconSvg(32), 'public/icons/favicon-32.png', 32);
await png(iconSvg(180, 4), 'public/icons/apple-touch-icon.png', 180);
await png(iconSvg(192, 4), 'public/icons/icon-192.png', 192);
await png(iconSvg(512, 4), 'public/icons/icon-512.png', 512);
