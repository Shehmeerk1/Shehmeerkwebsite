# Launch checklist

Nothing below has been assumed on your behalf. Each item is something only you can supply or verify.

## Facts to add (`lib/site.ts`)

- [ ] Brokerage name, your license number, office address (required in Arizona real estate advertising; confirm wording with your broker)
- [ ] Email and phone
- [ ] Social links
- [ ] Booking link (`NEXT_PUBLIC_SCHEDULING_URL`) for "Schedule a conversation"
- [ ] Your reply time (for example "within one business day"), to add to the form confirmations once you can commit to it
- [ ] Confirm the market: the site assumes Greater Phoenix (hero clock, map, communities). Change `lib/communities.ts` if your area differs.

## Content to replace

- [ ] Portraits and personal photographs: every reserved frame, see `SHOT-LIST.md`
- [ ] Showreel and four marketing case studies
- [ ] About page chapters and milestones (each has a prompt)
- [ ] Marketing page: background specifics and three case studies
- [ ] Investment philosophy wording
- [ ] Community descriptions, in your own words
- [ ] Five sample journal articles
- [ ] Four placeholder PDFs in `content/resources/files/`
- [ ] Stand-in photographs (most are 1024px; replace with your own at 2400px or more). Sample-listing photos disappear with the sample data once IDX is live
- [ ] Current market figures, with a dated source

## Integrations

- [ ] IDX provider (see `IDX-INTEGRATION.md`)
- [ ] Lead delivery webhook and CRM routing (see `LEADS.md`); send a test lead of each kind
- [ ] `LEAD_TOKEN_SECRET` set in production
- [ ] Email tool with unsubscribe handling, for newsletter opt-ins
- [ ] Analytics, if wanted (none is installed; update the privacy notice if you add any)

## Legal and compliance

- [ ] Attorney review of `/legal/privacy` and `/legal/terms`
- [ ] Broker review of the whole site, including the fair housing statement and disclosures
- [ ] Securities counsel review of `/invest` before discussing any specific offering
- [ ] MLS and IDX display rules applied once listings are live

## Go live

- [ ] Set `NEXT_PUBLIC_SHOW_DRAFT_NOTES=false`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain
- [ ] Run `npm run build` and check every page on a phone
- [ ] Create a Git repository, push, and connect it to Vercel
