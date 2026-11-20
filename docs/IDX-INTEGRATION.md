# Connecting live MLS listings (IDX)

The home search currently runs on bundled **sample data** (`lib/listings/demo-data.ts`). Every screen that shows it says so. No live integration exists yet and none is claimed.

## What you need first

1. **An active Arizona real estate license under a broker** who participates in the MLS.
2. **MLS membership** that covers your market. For Greater Phoenix that is ARMLS (Arizona Regional Multiple Listing Service). Other Arizona regions have their own MLS.
3. **Your broker's approval** for an IDX display, and a signed IDX agreement.
4. **An approved IDX vendor or data licence.** Two routes:
   - A hosted IDX vendor that offers an API (for example IDX Broker, iHomefinder, Showcase IDX). Simplest to approve.
   - A direct RESO Web API feed from the MLS, usually through an aggregator (for example Bridge Interactive, Spark/FBS, Trestle). More control, more compliance work.
5. From the vendor: **API base URL, API key or OAuth client ID and secret**, and the MLS's **display rules**.

Confirm current vendor options and fees with ARMLS and your broker; they change.

## What to build

The site talks to listings through one interface, `ListingsProvider`, in `lib/listings/types.ts`:

```ts
search(query)   // location text, min/max price, beds, baths, type, sort
getById(id)
getByIds(ids)   // saved homes
featured(limit) // homepage
```

Steps:

1. Create `lib/listings/<vendor>-provider.ts` implementing `ListingsProvider`. Map the vendor's fields to the `Listing` type. Set `isDemo: false`, fill `photos` and `attribution`.
2. Register it in `lib/listings/index.ts` and set `LISTINGS_PROVIDER=<vendor>` plus the vendor's keys as environment variables (server side only; never `NEXT_PUBLIC_`).
3. Add the vendor's image host to `images.remotePatterns` in `next.config.ts`.
4. In `components/listings/listing-card.tsx` and `app/homes/[id]/page.tsx`, render `listing.photos` when present instead of the drawn elevation.
5. Add caching (`fetch` with `next: { revalidate }`) within the refresh interval the MLS requires.
6. Delete `demo-data.ts` and `demo-provider.ts`. The demonstration banner disappears automatically when `isDemo` is false.

## Compliance to build in (from typical MLS IDX rules; verify against yours)

- Listing brokerage attribution on every listing, at the size the rules require.
- The MLS's disclaimer and logo, and a "last updated" timestamp.
- Limits on how many listings a search may return.
- No display of fields marked confidential.
- Refresh at least as often as the rules require.
- Your own brokerage name shown clearly on every page (set it in `lib/site.ts`).

## Already in place

- Search by location, price range, bedrooms, bathrooms and property type, as shareable URLs.
- Listing detail pages with facts, features and metadata.
- Saved homes, stored in the visitor's browser.
- Question and showing-request forms, tagged with the listing ID.
