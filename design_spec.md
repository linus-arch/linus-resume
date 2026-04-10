Philosophy

Two registers, hard contrast between them. Every screen either lives in the quiet ground (warm parchment, small text, editorial restraint) or the loud bleed (full-canvas image, oversized white type, zero margin). Nothing in between. The tension between those two states is the aesthetic.

1. Color Tokens
css/* tokens.css */
:root {
  /* Ground — the dominant surface */
  --color-ground:       #E8E4DC;   /* warm parchment, not quite white */
  --color-ground-dark:  #D9D4CA;   /* slightly deeper variant for cards */

  /* Ink */
  --color-ink:          #1A1917;   /* off-black, not pure #000 */
  --color-ink-muted:    #6B6860;   /* photo captions, meta labels */
  --color-ink-ghost:    #9B978F;   /* tertiary — numbers, hash IDs */

  /* On-dark (for full-bleed spreads) */
  --color-on-dark:      #F5F3EE;   /* slightly warm white */
  --color-on-dark-dim:  rgba(245, 243, 238, 0.55);

  /* Accent — used sparingly, never as a primary surface */
  --color-accent-mint:  #B8DDCA;   /* from cover gradient */
  --color-accent-lilac: #C9BEDE;   /* from cover gradient */

  /* Absolute */
  --color-black:        #0D0C0B;
  --color-white:        #FDFCFA;
}

2. Typography
The report uses a dual-register type system: a high-contrast Display serif for hero moments, and a clean grotesque for body/labels.
css/* fonts — import in index.html or globals.css */
/* Closest free equivalents to what Stills uses */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

/* If you have access to a grotesque (Neue Haas, Aktiv, etc.) use that instead of DM Sans */

:root {
  /* Display — used for hero headings ONLY */
  --font-display:       'DM Serif Display', Georgia, serif;

  /* UI / Body — everything else */
  --font-body:          'DM Sans', system-ui, sans-serif;

  /* Scale */
  --text-hero:          clamp(4rem, 10vw, 11rem);   /* "PHOTOGRAPHY IN DESIGN" size */
  --text-section:       clamp(2rem, 5vw, 4.5rem);   /* "Candid Photos" heading */
  --text-subhead:       1.0625rem;                  /* bold intro sentence */
  --text-body:          0.9375rem;                  /* body copy — slightly small */
  --text-caption:       0.75rem;                    /* photo credit names */
  --text-meta:          0.6875rem;                  /* hash IDs, e.g. #226108 */

  /* Letter spacing */
  --tracking-hero:      -0.02em;
  --tracking-label:     0.12em;   /* for ALL-CAPS utility labels */
  --tracking-meta:      0.04em;

  /* Weight */
  --weight-black:       900;   /* hero type */
  --weight-regular:     400;
  --weight-light:       300;
}

3. Spacing & Layout
The report uses a 14-column implicit grid but you can approximate it with these rules:
css:root {
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-3:   0.75rem;
  --space-4:   1rem;
  --space-6:   1.5rem;
  --space-8:   2rem;
  --space-12:  3rem;
  --space-16:  4rem;
  --space-24:  6rem;
  --space-32:  8rem;

  /* Page margins */
  --margin-page:  clamp(1.5rem, 4vw, 4rem);

  /* Content max-width */
  --content-max:  1400px;

  /* Column gap in grids */
  --gap-grid:     clamp(0.75rem, 1.5vw, 1.5rem);
}
The single most important layout rule from the report: text and images do NOT share equal weight. Text takes ≤40% of horizontal width on content pages; images command the rest. On spreads, images take 100% and text is overlaid.

4. Core Components
4a. The Content Page Layout
This is the "quiet ground" template — used for section intros (pages 3, 7, 11, 15…):
jsx// ContentPage.jsx
import './ContentPage.css';

export function ContentPage({ category, heading, subhead, body, images }) {
  return (
    <div className="content-page">
      <header className="content-page__header">
        <span className="content-page__category">{category}</span>
      </header>

      <div className="content-page__text-zone">
        <h2 className="content-page__heading">{heading}</h2>
        <p className="content-page__subhead">{subhead}</p>
        <div className="content-page__body-cols">
          {body.map((para, i) => (
            <p key={i} className="content-page__body">{para}</p>
          ))}
        </div>
      </div>

      {/* Staggered image fan — images bleed in from bottom-right */}
      <div className="content-page__image-fan">
        {images.map((img, i) => (
          <figure key={i} className="content-page__image-wrap" style={{ '--fan-index': i }}>
            <img src={img.src} alt={img.alt} className="content-page__image" />
            <figcaption className="content-page__caption">
              <span className="content-page__caption-name">{img.author}</span>
              <span className="content-page__caption-id">{img.id}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
css/* ContentPage.css */
.content-page {
  min-height: 100vh;
  background: var(--color-ground);
  padding: var(--space-12) var(--margin-page);
  display: grid;
  grid-template-rows: auto auto 1fr;
  overflow: hidden;
  position: relative;
}

.content-page__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-24);
}

.content-page__category {
  font-family: var(--font-body);
  font-size: var(--text-meta);
  font-weight: var(--weight-regular);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-muted);
}

.content-page__heading {
  font-family: var(--font-display);
  font-size: var(--text-section);
  font-weight: var(--weight-black);
  color: var(--color-ink);
  letter-spacing: var(--tracking-hero);
  line-height: 1.0;
  margin: 0 0 var(--space-4) 0;
  max-width: 12ch;
}

.content-page__subhead {
  font-family: var(--font-body);
  font-size: var(--text-subhead);
  font-weight: 600;
  color: var(--color-ink);
  margin: 0 0 var(--space-12) 0;
  max-width: 55ch;
}

.content-page__body-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  max-width: 760px;
}

.content-page__body {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-light);
  color: var(--color-ink);
  line-height: 1.65;
  margin: 0;
}

/* The image fan: 5 images staggered in from bottom-right */
.content-page__image-fan {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: flex-end;
  gap: 0;
  width: 65%;
  height: 65%;
}

.content-page__image-wrap {
  flex: 0 0 auto;
  width: 20%;
  position: relative;
  /* Each image is pushed up by a different amount */
  transform: translateY(calc(var(--fan-index) * -4%));
  margin: 0;
}

/* The middle image (index 2) is tallest */
.content-page__image-wrap:nth-child(3) {
  width: 24%;
  transform: translateY(-8%);
}

.content-page__image {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
}

.content-page__caption {
  display: flex;
  flex-direction: column;
  padding-top: var(--space-2);
}

.content-page__caption-name {
  font-family: var(--font-body);
  font-size: var(--text-caption);
  color: var(--color-ink);
}

.content-page__caption-id {
  font-family: var(--font-body);
  font-size: var(--text-meta);
  color: var(--color-ink-ghost);
  letter-spacing: var(--tracking-meta);
}

4b. Full-Bleed Spread (the "loud" state)
This is the dark editorial page — image fills the entire viewport, large white type over it.
jsx// BleedSpread.jsx
export function BleedSpread({ image, eyebrow, headline, subline }) {
  return (
    <div className="bleed-spread">
      <img src={image.src} alt={image.alt} className="bleed-spread__bg" />
      <div className="bleed-spread__overlay" />

      <div className="bleed-spread__content">
        <p className="bleed-spread__eyebrow">{eyebrow}</p>
        <h2 className="bleed-spread__headline">{headline}</h2>
        <p className="bleed-spread__subline">{subline}</p>
      </div>

      {/* Rotated vertical label on left edge */}
      <span className="bleed-spread__edge-label">{image.category}</span>
    </div>
  );
}
css/* BleedSpread.css */
.bleed-spread {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--color-black);
}

.bleed-spread__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  /* Slight darkening — images shouldn't be pure-color, they're moody */
  mix-blend-mode: normal;
}

/* Subtle bottom gradient so text always reads */
.bleed-spread__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(13, 12, 11, 0.6) 0%,
    rgba(13, 12, 11, 0.0) 50%
  );
  pointer-events: none;
}

.bleed-spread__content {
  position: absolute;
  bottom: var(--space-16);
  left: var(--margin-page);
  right: var(--margin-page);
  z-index: 2;
}

.bleed-spread__eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-meta);
  font-weight: var(--weight-regular);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-on-dark-dim);
  margin: 0 0 var(--space-3) 0;
}

.bleed-spread__headline {
  font-family: var(--font-body);   /* Note: grotesque, NOT serif, for bleed spreads */
  font-size: var(--text-hero);
  font-weight: var(--weight-black);
  letter-spacing: -0.03em;
  line-height: 0.92;
  color: var(--color-on-dark);
  text-transform: uppercase;
  margin: 0 0 var(--space-6) 0;
  max-width: 14ch;
}

.bleed-spread__subline {
  font-family: var(--font-display);  /* Serif for the subline — contrast with headline */
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: var(--weight-regular);
  font-style: italic;
  color: var(--color-on-dark);
  margin: 0;
}

/* Vertical edge label */
.bleed-spread__edge-label {
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-16);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-family: var(--font-body);
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-on-dark-dim);
  z-index: 2;
}

4c. Photo Grid (the "board" layout)
css/* PhotoGrid.css */
.photo-grid {
  background: var(--color-ground);
  padding: var(--space-8) var(--margin-page);
}

.photo-grid__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-8);
}

.photo-grid__section-title {
  font-family: var(--font-body);
  font-size: var(--text-meta);
  font-weight: var(--weight-regular);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink);
}

.photo-grid__action {
  font-family: var(--font-body);
  font-size: var(--text-meta);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--color-ink-ghost);
}

.photo-grid__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--gap-grid);
}

/* Images vary in height — this is intentional, not a bug */
.photo-grid__item:nth-child(3n+1) { aspect-ratio: 4/5; }
.photo-grid__item:nth-child(3n+2) { aspect-ratio: 3/4; }
.photo-grid__item:nth-child(3n)   { aspect-ratio: 2/3; }

.photo-grid__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-grid__meta {
  padding-top: var(--space-2);
}

.photo-grid__author {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-caption);
  font-weight: 500;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink);
}

.photo-grid__id {
  display: block;
  font-family: var(--font-body);
  font-size: var(--text-meta);
  color: var(--color-ink-ghost);
}

4d. Floating Keyword Cloud (the scattered word overlay)
Pages 5, 8, 9 feature words scattered at fixed positions across an image. Pattern: spaced-tracked caps, low opacity, grid-positioned.
jsx// KeywordCloud.jsx
const KEYWORDS = [
  { word: 'DEPTH',       col: 1, row: 1 },
  { word: 'ENGAGE',      col: 3, row: 1 },
  { word: 'TANGIBILITY', col: 5, row: 1 },
  { word: 'TEXTURE',     col: 1, row: 2 },
  { word: 'DIGITAL',     col: 3, row: 2 },
  { word: 'SOFTEN',      col: 5, row: 2 },
  // …
];

export function KeywordCloud({ keywords = KEYWORDS }) {
  return (
    <div className="keyword-cloud">
      {keywords.map(({ word, col, row }) => (
        <span
          key={word}
          className="keyword-cloud__word"
          style={{
            gridColumn: col,
            gridRow: row,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
css.keyword-cloud {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  position: absolute;
  inset: var(--space-8);
  pointer-events: none;
  z-index: 3;
}

.keyword-cloud__word {
  font-family: var(--font-body);
  font-size: clamp(0.6rem, 1vw, 0.875rem);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-on-dark);
  opacity: 0.75;
  align-self: center;
}

5. The Two Inviolable Rules
These are what make or break the aesthetic. Junior devs must internalize these:
Rule 1 — Never use pure black or pure white as a surface. Every background is #E8E4DC (ground) or a photography. #000000 is only for full-bleed moments, and even then the image is always underneath it.
Rule 2 — Typography only has two modes: microscopic or enormous. Caption text is 0.6875rem. Hero text is clamp(4rem, 10vw, 11rem). There is very little in the 1.25–3rem range. When in doubt, go bigger or go smaller — never middle.

6. Tailwind config (if you're on Tailwind)
js// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ground:     '#E8E4DC',
        'ground-dark': '#D9D4CA',
        ink:        '#1A1917',
        'ink-muted':'#6B6860',
        'ink-ghost':'#9B978F',
        'on-dark':  '#F5F3EE',
        'stills-black': '#0D0C0B',
        'stills-white': '#FDFCFA',
        mint:       '#B8DDCA',
        lilac:      '#C9BEDE',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero:    ['clamp(4rem,10vw,11rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        section: ['clamp(2rem,5vw,4.5rem)', { lineHeight: '1.0' }],
        caption: ['0.75rem', { letterSpacing: '0.04em' }],
        meta:    ['0.6875rem', { letterSpacing: '0.12em' }],
      },
      letterSpacing: {
        label: '0.12em',
        meta:  '0.04em',
        hero:  '-0.02em',
      },
    },
  },
};