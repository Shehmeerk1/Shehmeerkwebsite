# Website project

## Design skills (installed in `.claude/skills/`)

Use these for all UI work on this site.

| Skill | Source (pinned commit) | Use for |
|---|---|---|
| `design-taste-frontend` | Leonxlnx/taste-skill @ f6b7657 (tasteskill 2.5.1) | Building/redesigning pages end to end, with its browser checker and finish gate |
| `impeccable` | pbakaus/impeccable @ 2b86d9c (4.9.1) | `/impeccable <command>`: shape, audit, critique, polish, typeset, layout, colorize, animate, harden, ... |
| Emil Kowalski skills (18) | emilkowalski/skills @ 64eb3de | Motion and interface craft: `emil-design-eng`, `animate`, `review-animations`, `improve-animations`, `remove-animations`, `find-animation-opportunities`, `choreograph`, `animation-performance`, `animation-vocabulary`, `gestures`, `apple-design`, `mobile-native`, `pick-ui-library`, `prototype`, `break-ui`, `learn-taste`, `ask-emil`, `ask-sonner` |
| `tastemaker` | Thecsiz/tastemaker @ e39f724 | `/tastemaker`: critique a design's craft (CR rules) and taste (TS principles), decide trade-offs, and cut scope before building. Judges taste only, not usability or accessibility |
| `frontend-design` | anthropics/skills @ 1780c5e | Distinctive, production-grade UI when creating pages and components |
| `high-end-visual-design` | user-supplied ZIP | Agency-level fonts, spacing, shadows, cards, motion |
| `vercel-react-best-practices` | vercel-labs/agent-skills @ 1a2c79d | React/Next.js performance rules while writing code |
| `web-design-guidelines` | vercel-labs/agent-skills @ 1a2c79d | Audit UI code against Vercel's Web Interface Guidelines (fetches the rules from raw.githubusercontent.com at review time) |
| `find-skills` | user-supplied ZIP | Suggests `npx skills` commands to find more skills; ask before running any |
| `deploy-to-vercel` | user-supplied ZIP (Vercel, v3.0.0) | Deploy scripts; never run without explicit approval |

## Workflow (user's instruction)

1. **Creation** — design skills: `design-taste-frontend`, `impeccable` (shape/craft), `frontend-design`, `high-end-visual-design`, Emil Kowalski skills for motion, and the active `DESIGN.md`.
2. **Development** — performance skill: `vercel-react-best-practices` whenever writing or refactoring React/Next.js code.
3. **After the first working version** — audit skills: `tastemaker`, `web-design-guidelines`, `impeccable audit|critique|polish`, plus `break-ui` and `review-animations`.

## Approval rules (user's instruction)

Do not execute external/third-party scripts (including skill scripts such as Taste Skill's `scripts/*.mjs`, Tastemaker's `scripts/*.js`, `deploy.sh`, and `npx` installers), download binaries (including Impeccable's engine), deploy, or publish anything without the user's approval.

Not installed (not web): Emil's `animate-expo`, `write-swift`.

Notes:
- Taste Skill scripts need Node 22+ and Chrome. Set `CHROME_PATH=/opt/pw-browsers/chromium` when running them here.
- Impeccable's launcher (`.claude/skills/impeccable/scripts/impeccable`) downloads a prebuilt engine binary from the pbakaus/impeccable GitHub releases on first run (SHA-256 checked against `scripts/engine-checksums.txt`). Its design hook and subagents are not installed. Do not download the engine or enable hooks without the user's approval.

## Design-system reference: GetDesign (getdesign.md)

GetDesign is a reference, not a skill. It provides `DESIGN.md` files (colors, type, spacing, components) analysed from real sites.

- The 86 free templates from the official `getdesign` npm package (v0.6.26) are in `design-references/getdesign/<brand>.md`, indexed by `manifest.json` (brand + one-line description). These are a library to choose from, not active rules.
- Once the user picks a brand/direction, make it active by copying that file to `DESIGN.md` at the project root (same result as `GETDESIGN_DISABLE_TELEMETRY=1 npx getdesign@latest add <brand>`; telemetry otherwise posts the brand name to getdesign.md).
- Templates suggest running `npx @google/design.md lint DESIGN.md`; that is a separate third-party package, so ask before running it.
- Catalog: https://getdesign.md — brand pages at `https://getdesign.md/<brand>/design-md`.
- When a `DESIGN.md` exists at the project root, treat it as the visual source of truth; Impeccable and `learn-taste` also read/write it.

## Updating

- `npx skills add Leonxlnx/taste-skill -a claude-code`
- `npx skills add pbakaus/impeccable -a claude-code` (or `npx impeccable update`)
- `npx skills@latest add emilkowalski/skills -a claude-code`
- Tastemaker: re-clone https://github.com/Thecsiz/tastemaker and copy `skills/tastemaker/.` into `.claude/skills/tastemaker/`

## The site (built)

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4, shadcn-style primitives in `components/ui`, Motion, Lucide. Run with `npm run dev`.
- Design source of truth: `DESIGN.md` ("The Valley by the hour": per-section `data-theme` hours, condensed Archivo title cards, graded photography). Components use only the theme tokens (`bg-bg`, `text-fg`, `text-muted`, `border-line`, `bg-accent`...).
- No eyebrow labels above headings; no invented facts. Unverified material goes in `lib/site.ts` as `null` or is marked with `<DraftNote>`. Where a photo of Shehmeer will go, use a compact `PhotoNote` (`components/site/photo.tsx`) until real ones exist (`docs/SHOT-LIST.md`). The home valuation is the primary action.
- Sample listings must keep both flags ("Sample listing", "Stand-in photos").
- Docs: `README.md`, `docs/IDX-INTEGRATION.md`, `docs/LEADS.md`, `docs/LAUNCH-CHECKLIST.md`, `docs/SHOT-LIST.md`.
- Impeccable runs (engine installed). Audit and critique reports live in `.impeccable/`.
