import { photos, type PhotoKey } from "@/lib/photos";
import type { Listing } from "./types";

/**
 * SAMPLE DATA. None of these homes exist. The photographs are licensed
 * stand-ins of other buildings and rooms, chosen to suggest each home's
 * character; the interface labels them as such. Delete once IDX is live.
 */
const PHOTOS: Record<string, PhotoKey[]> = {
  "demo-01": ["villaPool", "kitchenWhite", "bedroomHotel"],
  "demo-02": ["tempeHome", "livingLibrary", "kitchenIsland"],
  "demo-03": ["terraces", "livingBright", "bedroomHotel"],
  "demo-04": ["duskGable", "livingWide", "kitchenSteel"],
  "demo-05": ["suburb", "livingGallery", "kitchenWood"],
  "demo-06": ["whiteTower", "livingGreen", "kitchenTile"],
  "demo-07": ["hermosaGarden", "livingWide", "kitchenIsland"],
  "demo-08": ["duskPool", "livingGallery", "kitchenWhite"],
  "demo-09": ["mountainPool", "livingLibrary", "kitchenWood"],
  "demo-10": ["camelback", "interiorView", "kitchenSteel"],
  "demo-11": ["interiorView", "livingBright", "kitchenWhite"],
  "demo-12": ["corner", "livingGreen", "bedroomHotel"],
};

const d = (l: Omit<Listing, "isDemo" | "photos" | "photosAreStandIns" | "attribution" | "title"> & { n: number }): Listing => ({
  ...l,
  title: `Sample residence ${String(l.n).padStart(2, "0")}`,
  isDemo: true,
  photos: (PHOTOS[l.id] ?? []).map((k) => ({ src: photos[k].src, alt: photos[k].alt, width: photos[k].width, height: photos[k].height })),
  photosAreStandIns: true,
  attribution: null,
});

export const demoListings: Listing[] = [
  d({ n: 1, id: "demo-01", community: "Paradise Valley", communitySlug: "paradise-valley", city: "Paradise Valley", price: 4850000, beds: 5, baths: 5.5, sqft: 6420, lotSqft: 43560, yearBuilt: 2019, type: "Single family", style: "desert-modern", summary: "A long, low house turned toward the mountain.", description: "Sample description. A single-level plan arranged around a shaded courtyard, with the main rooms opening north to the mountain and a pool set along the south wall.", features: ["Single level", "Pool and spa", "Detached guest suite", "Three-car garage"] }),
  d({ n: 2, id: "demo-02", community: "Arcadia", communitySlug: "arcadia", city: "Phoenix", price: 2395000, beds: 4, baths: 3.5, sqft: 3880, lotSqft: 18200, yearBuilt: 1962, type: "Single family", style: "ranch", summary: "A rebuilt ranch house on an irrigated lot.", description: "Sample description. A mid-century ranch plan taken back to its frame and rebuilt, with mature citrus along the drive and a deep covered patio.", features: ["Irrigated lot", "Covered patio", "Renovated kitchen", "Pool"] }),
  d({ n: 3, id: "demo-03", community: "Old Town Scottsdale", communitySlug: "scottsdale", city: "Scottsdale", price: 865000, beds: 2, baths: 2, sqft: 1540, lotSqft: null, yearBuilt: 2016, type: "Condominium", style: "tower", summary: "A corner residence above the canal.", description: "Sample description. Two bedrooms on a corner plan with a wraparound terrace, a short walk from the galleries and restaurants of Old Town.", features: ["Corner plan", "Terrace", "Secured parking", "Fitness room"] }),
  d({ n: 4, id: "demo-04", community: "North Scottsdale", communitySlug: "north-scottsdale", city: "Scottsdale", price: 3150000, beds: 4, baths: 4.5, sqft: 5210, lotSqft: 52000, yearBuilt: 2008, type: "Single family", style: "hillside", summary: "A hillside house stepped into the granite.", description: "Sample description. Built in three stepped levels along a boulder outcrop, with city-light views to the south and the preserve behind.", features: ["City-light views", "Negative-edge pool", "Wine room", "Gated community"] }),
  d({ n: 5, id: "demo-05", community: "Biltmore", communitySlug: "biltmore", city: "Phoenix", price: 1275000, beds: 3, baths: 2.5, sqft: 2460, lotSqft: 4100, yearBuilt: 1998, type: "Townhome", style: "townhome", summary: "A two-storey townhome beside the golf course.", description: "Sample description. An end-unit townhome with a walled front court, a primary suite on the ground floor and a balcony toward Piestewa Peak.", features: ["End unit", "Ground-floor primary suite", "Two-car garage", "Community pool"] }),
  d({ n: 6, id: "demo-06", community: "Downtown Phoenix", communitySlug: "downtown-phoenix", city: "Phoenix", price: 545000, beds: 1, baths: 1.5, sqft: 980, lotSqft: null, yearBuilt: 2021, type: "Condominium", style: "tower", summary: "A one-bedroom loft near the light rail.", description: "Sample description. A double-height living room with west light, concrete floors and a balcony over the street.", features: ["Double-height living room", "Balcony", "Rooftop terrace", "Bike storage"] }),
  d({ n: 7, id: "demo-07", community: "Tempe", communitySlug: "tempe", city: "Tempe", price: 689000, beds: 3, baths: 2, sqft: 1820, lotSqft: 7400, yearBuilt: 1974, type: "Single family", style: "courtyard", summary: "A block house wrapped around a courtyard.", description: "Sample description. A slump-block house with an entry courtyard, an updated kitchen and a deep back yard under two old mesquites.", features: ["Entry courtyard", "Updated kitchen", "No homeowners association", "Mature shade trees"] }),
  d({ n: 8, id: "demo-08", community: "Chandler", communitySlug: "chandler", city: "Chandler", price: 925000, beds: 5, baths: 3.5, sqft: 3640, lotSqft: 10800, yearBuilt: 2014, type: "Single family", style: "ranch", summary: "A family house on a corner lot.", description: "Sample description. Five bedrooms over two floors, with a ground-floor guest room, a loft and a back yard built around a play pool.", features: ["Corner lot", "Ground-floor guest room", "Loft", "Play pool"] }),
  d({ n: 9, id: "demo-09", community: "Gilbert", communitySlug: "gilbert", city: "Gilbert", price: 775000, beds: 4, baths: 3, sqft: 2890, lotSqft: 9200, yearBuilt: 2017, type: "Single family", style: "courtyard", summary: "A single-level house with a split plan.", description: "Sample description. A single-level split plan with the primary suite on its own wing and sliding walls onto a covered patio.", features: ["Single level", "Split plan", "Covered patio", "Three-car garage"] }),
  d({ n: 10, id: "demo-10", community: "Paradise Valley", communitySlug: "paradise-valley", city: "Paradise Valley", price: 7200000, beds: 6, baths: 7, sqft: 8950, lotSqft: 61000, yearBuilt: 2023, type: "Single family", style: "hillside", summary: "A new house on the south slope.", description: "Sample description. A recent build in board-formed concrete and glass, with a separate guest house and a motor court below the main level.", features: ["Guest house", "Motor court", "Home theatre", "Mountain views"] }),
  d({ n: 11, id: "demo-11", community: "Arcadia", communitySlug: "arcadia", city: "Phoenix", price: 1640000, beds: 3, baths: 3, sqft: 2710, lotSqft: 12400, yearBuilt: 2020, type: "Single family", style: "desert-modern", summary: "A modern house behind a citrus hedge.", description: "Sample description. A flat-roofed house with clerestory light, a kitchen that opens along its full length to the yard, and a lap pool.", features: ["Clerestory windows", "Lap pool", "Casita", "Solar array"] }),
  d({ n: 12, id: "demo-12", community: "Old Town Scottsdale", communitySlug: "scottsdale", city: "Scottsdale", price: 1095000, beds: 3, baths: 3.5, sqft: 2380, lotSqft: 2600, yearBuilt: 2022, type: "Townhome", style: "townhome", summary: "A three-storey townhome with a roof deck.", description: "Sample description. Three floors over a two-car garage, with a roof deck facing Camelback and a lift serving every level.", features: ["Roof deck", "Private lift", "Two-car garage", "Lock-and-leave"] }),
];
