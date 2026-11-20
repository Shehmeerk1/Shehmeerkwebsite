/**
 * Featured communities. Positions are real coordinates, projected by the map.
 * Descriptions stick to geography. Replace them with Shehmeer's own notes on
 * each area; do not add prices or statistics without a dated source.
 */
export type Community = {
  slug: string;
  name: string;
  city: string;
  lat: number;
  lon: number;
  note: string;
};

export const communities: Community[] = [
  { slug: "paradise-valley", name: "Paradise Valley", city: "Paradise Valley", lat: 33.531, lon: -111.943, note: "A small town of large lots between Phoenix and Scottsdale, set against the north side of Camelback Mountain." },
  { slug: "arcadia", name: "Arcadia", city: "Phoenix", lat: 33.497, lon: -111.985, note: "A Phoenix neighborhood at the foot of Camelback, laid out on former citrus groves and still watered by the Arizona Canal." },
  { slug: "scottsdale", name: "Old Town Scottsdale", city: "Scottsdale", lat: 33.494, lon: -111.926, note: "The walkable centre of Scottsdale: galleries, restaurants and condominiums a few minutes from the canal." },
  { slug: "north-scottsdale", name: "North Scottsdale", city: "Scottsdale", lat: 33.66, lon: -111.89, note: "Higher desert toward the McDowell Mountains, with golf communities and trailheads into the Sonoran Preserve." },
  { slug: "biltmore", name: "Biltmore", city: "Phoenix", lat: 33.521, lon: -112.022, note: "A central Phoenix district around the Arizona Biltmore, below Piestewa Peak." },
  { slug: "downtown-phoenix", name: "Downtown Phoenix", city: "Phoenix", lat: 33.448, lon: -112.074, note: "The city's core: historic districts, new towers and the light rail line." },
  { slug: "tempe", name: "Tempe", city: "Tempe", lat: 33.425, lon: -111.94, note: "A university city on Tempe Town Lake, between Phoenix and the East Valley." },
  { slug: "chandler", name: "Chandler", city: "Chandler", lat: 33.306, lon: -111.841, note: "An East Valley city known for its technology employers and planned neighborhoods." },
  { slug: "gilbert", name: "Gilbert", city: "Gilbert", lat: 33.353, lon: -111.789, note: "A former farming town in the southeast Valley, organised around its Heritage District." },
];

export const communityBySlug = new Map(communities.map((c) => [c.slug, c]));
