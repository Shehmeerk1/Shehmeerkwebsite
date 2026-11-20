export type PropertyType = "Single family" | "Townhome" | "Condominium";
export type ElevationStyle = "desert-modern" | "ranch" | "courtyard" | "hillside" | "townhome" | "tower";

export type Listing = {
  id: string;
  /** True for bundled sample data. Real IDX records must set this to false. */
  isDemo: boolean;
  title: string;
  community: string;
  communitySlug: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number | null;
  yearBuilt: number;
  type: PropertyType;
  style: ElevationStyle;
  summary: string;
  description: string;
  features: string[];
  /**
   * Photos. From the MLS once IDX is connected. Demo records carry licensed
   * stand-in photography of other buildings, flagged with photosAreStandIns.
   */
  photos: { src: string; alt: string; width: number; height: number }[];
  photosAreStandIns: boolean;
  /** MLS attribution string required by the IDX provider (listing office, MLS number). */
  attribution: string | null;
};

export type ListingQuery = {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  type?: PropertyType;
  sort?: "price-asc" | "price-desc" | "newest";
};

export type ListingResult = { listings: Listing[]; total: number; isDemo: boolean };

/**
 * The contract an IDX integration has to satisfy. Swap the demo provider for
 * one that calls your MLS-approved vendor. See docs/IDX-INTEGRATION.md.
 */
export interface ListingsProvider {
  readonly name: string;
  readonly isDemo: boolean;
  search(query: ListingQuery): Promise<ListingResult>;
  getById(id: string): Promise<Listing | null>;
  getByIds(ids: string[]): Promise<Listing[]>;
  featured(limit: number): Promise<Listing[]>;
}

export const PROPERTY_TYPES: PropertyType[] = ["Single family", "Townhome", "Condominium"];
