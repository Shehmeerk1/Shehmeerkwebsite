import "server-only";
import { demoProvider } from "./demo-provider";
import type { ListingsProvider } from "./types";

/**
 * Returns the active listings source. Only "demo" exists today.
 * To go live, write a provider that implements ListingsProvider against your
 * IDX vendor and register it here. See docs/IDX-INTEGRATION.md.
 */
export function getListingsProvider(): ListingsProvider {
  switch (process.env.LISTINGS_PROVIDER) {
    // case "your-idx-vendor": return yourIdxProvider;
    default:
      return demoProvider;
  }
}
