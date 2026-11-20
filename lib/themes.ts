/** The hour each route opens in. Drives the page-transition wipe and the first screen. */
export type Hour = "chalk" | "basalt" | "cobalt" | "bloom" | "night" | "dawn" | "ember";

export const HOUR_BG: Record<Hour, string> = {
  chalk: "#f3f1ec",
  basalt: "#0f0e0c",
  cobalt: "#2537ee",
  bloom: "#f2d33b",
  night: "#0a0e1a",
  dawn: "#f0d6c8",
  ember: "#ff6b3d",
};

export function hourForPath(path: string): Hour {
  if (path === "/") return "basalt";
  if (path.startsWith("/invest")) return "night";
  if (path.startsWith("/marketing")) return "cobalt";
  if (path.startsWith("/about")) return "dawn";
  if (path.startsWith("/resources")) return "bloom";
  if (path.startsWith("/contact")) return "ember";
  if (path.startsWith("/journal")) return "basalt";
  return "chalk";
}
