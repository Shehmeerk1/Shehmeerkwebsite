# The Valley by the hour: design system for shehmeerkanwar.com

**The idea.** Arizona is read by its light, so the site moves through the hours of a desert day. Each page, and each section within it, takes one hour's light as a full colour field. Type is set like a film's title cards. Photography is graded and grained like film stills. Shehmeer is the lead of the homepage.

This replaced the earlier "Sonoran Light" editorial system (cream paper, serif headings, one turquoise accent), which a Tastemaker review judged coherent but undecided: one repeated section pattern, no person at the centre.

## The hours (themes)

Set with `data-theme` on any section. Each hour defines `--bg`, `--fg`, `--muted`, `--line`, `--accent`, `--accent-fg`, `--surface`, `--error`; components only use these tokens (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`...), so they work on every hour.

| Hour | Ground | Accent | Used for |
|---|---|---|---|
| `basalt` (night) | `#0f0e0c` | ember `#ff6b3d` | Home hero, journal, footer, menu |
| `chalk` (noon light) | `#f3f1ec` | cobalt `#2537ee` | Search, listings, reading |
| `cobalt` (noon sky) | `#2537ee` | palo-verde `#f2d33b` | Marketing |
| `bloom` (palo verde in flower) | `#f2d33b` | cobalt | Free guides, valuation |
| `night` (after dark) | `#0a0e1a` | brass `#d9b26a` | Investors |
| `dawn` | `#f0d6c8` | oxblood `#a8321c` | About, communities |
| `ember` (dusk) | `#ff6b3d` | basalt | Contact, closing calls to action |

Each route opens in its own hour (`lib/themes.ts`); the page-transition wipe uses that colour.

## Type

- **Archivo** (variable width 62 to 125). Title cards at width 62, weight 800, upper case: `t-card` (hero names), `t-xl` (section titles), `t-l`. Interface and body text at normal width: `t-m`, `t-s`, `t-body`, `t-label` (expanded, sentence case).
- **Newsreader italic** is Shehmeer's own voice (`t-voice`): one personal line per page. Newsreader roman sets article bodies.
- No eyebrow labels above headings. No all-caps labels.

## Composition

- One `.wrap` (max 1720px) with equal edges; a 12-column grid. Asymmetry comes from column offsets and staggered rows, never uneven edges.
- Colour fields change from section to section; no two neighbouring sections share an hour.
- Corners: 1 to 1.5rem on photographs and panels, full pills on buttons and chips.
- Photographs carry a static film grain (`.grain`) where they lead.

## Signature moments

1. **Homepage title card** (`components/home/hero-cinema.tsx`): letterbox bars close to a cinema frame on load, the photograph settles, the name rises; a portrait slot sits beside the name; a live readout of the light in Phoenix (computed from the real sun position).
2. **Identity scroll**: a held portrait while "I sell homes. I invest in them. I market them." pass it.
3. **Three doors** (`doors.tsx`): a pinned horizontal scene, Homes, Capital and Growth, each in its own hour; a survey plat draws itself on the Capital panel. Stacks vertically on phones and under reduced motion; keyboard focus scrolls to the right panel.
4. **Neighbourhood index** (`components/map/neighborhood-index.tsx`): names as a giant list; the survey-grid map draws a line from downtown to the chosen place and gives the real distance.
5. **Sun and orientation tool** (`components/real-estate/sun-orientation.tsx`): real solar position for a month and hour, the house's shadow, and whether a yard facing N/E/S/W is in sun.
6. **Capital plat** (`components/invest/capital-plat.tsx`): a block divided into residential, multifamily and development parcels.
7. **Kinetic title** (`components/marketing/kinetic-title.tsx`): letters widen toward the pointer along the width axis.
8. **Stacking chapters** on Real estate: Buying, Selling, Luxury, Investment pin and slide over each other.

## Motion rules

- One entrance per page (title lines rise from a mask; supporting text fades after), plus that page's signature moment.
- Hover answers: underlines draw, photographs ease to 1.045, listing cards crossfade to an interior, arrows step.
- Scroll-linked effects stop when the reader stops; nothing autoplays longer than a few seconds.
- Everything rests under `prefers-reduced-motion`; pinned scenes become normal stacked sections.

## Honesty rules

- Sample listings carry two flags: "Sample listing" and "Stand-in photos". Their photographs are licensed photos of other properties.
- Portrait and case-study frames say "Photograph to come" / "Case study to come" with the art direction. Never a generated or drawn face.
- No invented credentials, numbers, testimonials or returns. Draft copy is marked with `<DraftNote>`.
