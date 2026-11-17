# Linus Thofte, interface as instrument

## Brief

- **Subject:** Linus Thofte, cognitive scientist, AI developer, learning designer, and music maker.
- **Audience:** Recruiters and hiring managers first, with collaborators interested in DAWK, Weave, voice, and music.
- **Job:** Make the range legible quickly, then reward a slower read with working detail and a clear way to get in touch.
- **Language:** English.
- **Assets:** Existing resume data, project copy, music artwork, and external links already in the repository.
- **Constraint:** Keep the current Vite + React Router application and preserve its existing private/API surfaces.
- **Assumptions to replace:** `hello@linusthofte.com`, the generic LinkedIn and GitHub URLs in the footer, and any Unsplash/audio URLs retained by the older archive routes are placeholders until the owner supplies the canonical links and files.

## Concept card

### Chosen concept: Signal / score

The site behaves like a score sheet for a person who moves between human understanding, software systems, and sound.

- **Metaphor:** A music score crossed with a lab notebook. Horizontal rules mark time; marginal notes identify the instrument in use.
- **Signature:** The homepage is an index of signals. Hovering or focusing a row advances its short rule and shifts the accent marker, while the music chapter opens into two large record sleeves.
- **Emotion:** Quiet concentration in the first three seconds, followed by a sense of range and momentum.
- **Motion verb:** Settle, then advance. Elements land on a baseline and primary links push forward by one measured step.
- **Screenshot:** The name set huge across the page with a red timing line, followed by the two music sleeves in a precise split composition.

### Alternatives considered

1. **Workbench:** Layers of notes, tools, and prototypes arranged like a studio desk. Signature: a draggable tool tray. Originality 4, fit 5, feasibility 3, portability 3.
2. **Memory field:** Scroll through a field of connected fragments taken from the Weave and Kioku work. Signature: one thread linking every chapter. Originality 4, fit 4, feasibility 3, portability 4.
3. **Signal / score:** A score-like index that lets cognitive science, code, UX, and music share one rhythm. Signature: the active row advances in place and the music chapter becomes the visual crescendo. Originality 4, fit 5, feasibility 5, portability 2. **Chosen because it is anchored in the actual overlap of Linus's work, not a generic portfolio effect.**

## Art direction system

- **Palette:** paper `#f3f1eb`, ink `#171715`, muted `#67665f`, line `#d8d4c9`, accent red `#b74335`, curtain `#24231f`. The red is a score marker, not a gradient or decoration.
- **Type:** Switzer from Fontshare for all display, body, and navigation roles. Azeret Mono from Fontshare for small metadata and tool labels. Display uses tight tracking and a fluid scale from `clamp(4.5rem, 16vw, 15rem)`.
- **Grid:** 12 columns on desktop with a fluid 24 to 32px gutter. Main text hangs on columns 2 to 7, supporting information on 9 to 12. On mobile the grid collapses to one column with an 18px gutter.
- **Rhythm:** Full-viewport poster hero, tight index list, airy statement, then a full-bleed music diptych. Tools use a dense two-column table so the section feels like an instrument panel rather than another card grid.
- **Shape:** One rule only: 2px radius on media and buttons, no floating card shadows.
- **Motion:** `cubic-bezier(.16, 1, .3, 1)`, 350ms for hover/focus, 800ms for entrances. The primary interaction advances an index row and draws its rule. Reduced motion leaves every item visible and uses color/underline feedback only.
- **Idle state:** A thin red timing line in the hero travels slowly through a 12-second loop. It pauses when the hero is off-screen and stops under reduced motion.

## Composition plan

```text
HERO / POSTER
[LT / nav]                          [contact]
[                         LINUS]
[ cognitive scientist / AI developer ]
                         [scroll ↓]

WORK / INDEX LIST
[01] Vidhra       developer                 2025–now
[02] Kioku AI     market + user research   2024–25
[03] Sana Labs    learning design           2023–24

ABOUT / STATEMENT
[A clear paragraph about the overlap of cognition, code, and sound]
                                      [selected skills]

MUSIC / FULL-BLEED DIPTYCH
[ Urhymn / red sleeve ] [ Futurhymn / blue sleeve ]
[external link]         [external link]

TOOLS / DATA TABLE
[music] Ableton / Logic Pro X
[UX]    Figma / Adobe suite
[code]  TypeScript / React / Next.js / Supabase

FOOTER / FINALE
[Linus Thofte] [email] [LinkedIn] [GitHub]
```

## Genericness test

The original dark gradient, repeated rounded cards, and “AI resume” framing could belong to any developer portfolio. I changed the identity to a score-like index, gave the music section the visual crescendo, and made the tools section a working inventory rather than a proficiency meter.

## Refinement pass

The signature is now a live signal field behind the hero: rings, a measured waveform, and a timing line respond to pointer position and breathe at rest. This keeps the score metaphor active without introducing a second visual language. The waveform is decorative and the actual headline remains semantic HTML, so the reduced-motion version is complete and legible.
