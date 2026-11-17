# Rebuild checklist

## 2026 visual refinement

- [x] Define a single signal-field signature for the hero and carry it into existing hover states.
- [x] Add pointer-responsive hero motion with a reduced-motion fallback.
- [ ] Verify production build, responsive screenshots, keyboard focus, and reduced motion.

- [x] Establish the score/index concept and art direction in `DESIGN.md`.
- [x] Rebuild the global visual system and navigation around the score concept.
- [x] Recompose the homepage into hero, work index, music diptych, tools inventory, and contact.
- [x] Add editable music and tools data without removing existing resume data.
- [x] Preserve existing detail routes and make the new visual system responsive.
- [x] Run lint, tests, and a production build.
- [x] Review the production page for overflow, focus states, and reduced-motion behavior.

## Review

The production build, targeted lint, and Vitest suite pass. A real Chromium pass covered the homepage, music archive, Urhymn detail route, releases, travel, trends, and 404. It verified one h1 per route, zero horizontal overflow, zero page errors, mobile menu Escape behavior, 44px primary targets, reduced-motion visibility, hover movement, and both music sleeve colors. The Awwwards audit still reports the expected client-rendered SPA 404 status limitation at the Vite preview layer.
