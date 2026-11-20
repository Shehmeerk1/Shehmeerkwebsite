# Shehmeer Kanwar: personal brand and real estate website

Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn-style components, Motion, Lucide.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other commands: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## What is real and what is a stand-in

| Area | Status |
|---|---|
| All pages, navigation, responsive layouts, SEO metadata, sitemap | Working |
| Property search, filters, detail pages with galleries, saved homes | Working on **sample data**, clearly labelled, with licensed stand-in photos of other properties. See `docs/IDX-INTEGRATION.md` |
| Forms: validation, consent, spam trap, lead tagging by type and source | Working |
| Lead delivery | Local file in development; needs `LEADS_WEBHOOK_URL` in production. See `docs/LEADS.md` |
| Free resources: sign-up, tagging, signed download links | Working. The PDFs are **placeholders** |
| Journal (MDX), categories, related posts, video embeds | Working. The five articles are **sample drafts** |
| Brokerage disclosure, license, phone, email, social, booking link | **Not set.** Fill in `lib/site.ts` |
| Photography | CC0 and CC BY stand-ins, credited on `/credits`; every photo of Shehmeer is a reserved frame with its brief (`docs/SHOT-LIST.md`) |

Before launch, work through `docs/LAUNCH-CHECKLIST.md`.

## Editing content

- **Facts about Shehmeer and the business:** `lib/site.ts`
- **Articles:** add a `.mdx` file to `content/journal/`. Front matter: `title`, `date`, `category` (Real Estate, Business, Marketing, Investing, Personal Insights), `excerpt`, optional `cover` (a key from `lib/photos.ts`), optional `resource` (a slug from `lib/resources.ts`), `sample: false`. In the body you can use `<Video youtube="ID" title="..." />`, `<Video vimeo="ID" title="..." />` and `<PullQuote>...</PullQuote>`.
- **Free resources:** `lib/resources.ts`, files in `content/resources/files/`
- **Communities:** `lib/communities.ts`
- **Photographs:** `public/photos/` and `lib/photos.ts`
- **Design system:** `DESIGN.md` and `app/globals.css` (the hours are `data-theme` values)

## Structure

```
app/            routes (pages, API routes, sitemap, robots)
components/     ui (shadcn-style primitives), site, home, listings, forms, journal, map, resources
lib/            site config, listings provider, leads, journal, resources, sun position
content/        journal articles (MDX) and gated resource files
docs/           IDX integration, lead delivery, launch checklist
```

## Deploying to Vercel

The project needs no special configuration. Set the environment variables from `.env.example` in the Vercel project (at minimum `NEXT_PUBLIC_SITE_URL`, `LEADS_WEBHOOK_URL` and `LEAD_TOKEN_SECRET`). Nothing has been deployed or published.
