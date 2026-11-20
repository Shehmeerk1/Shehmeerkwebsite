/**
 * Solar position for Phoenix, Arizona (NOAA general solar equations).
 * Arizona keeps Mountain Standard Time all year, so the offset is a constant -7h.
 */
const LAT = 33.4484;
const LON = -112.074;
const UTC_OFFSET_MIN = -7 * 60;
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

export type SunDay = {
  /** Minutes after local midnight. */
  sunrise: number;
  sunset: number;
  /** Sun elevation in degrees at a given local minute of this day. */
  elevationAt: (localMinute: number) => number;
};

export function phoenixMinuteNow(now = new Date()): number {
  const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes() + now.getUTCSeconds() / 60;
  return (((utcMin + UTC_OFFSET_MIN) % 1440) + 1440) % 1440;
}

export function sunDay(now = new Date()): SunDay {
  const local = new Date(now.getTime() + UTC_OFFSET_MIN * 60_000);
  const startOfYear = Date.UTC(local.getUTCFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()) - startOfYear) / 86_400_000);
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);

  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const cosH0 = Math.cos(rad(90.833)) / (Math.cos(rad(LAT)) * Math.cos(decl)) - Math.tan(rad(LAT)) * Math.tan(decl);
  const h0 = deg(Math.acos(Math.min(1, Math.max(-1, cosH0))));
  const toLocal = (utcMin: number) => (((utcMin + UTC_OFFSET_MIN) % 1440) + 1440) % 1440;
  const sunrise = toLocal(720 - 4 * (LON + h0) - eqTime);
  const sunset = toLocal(720 - 4 * (LON - h0) - eqTime);

  const elevationAt = (localMinute: number) => {
    const utcMin = localMinute - UTC_OFFSET_MIN;
    const trueSolar = utcMin + eqTime + 4 * LON;
    const hourAngle = rad(trueSolar / 4 - 180);
    const cosZenith = Math.sin(rad(LAT)) * Math.sin(decl) + Math.cos(rad(LAT)) * Math.cos(decl) * Math.cos(hourAngle);
    return 90 - deg(Math.acos(Math.min(1, Math.max(-1, cosZenith))));
  };

  return { sunrise, sunset, elevationAt };
}

export function formatClock(minute: number): string {
  const m = ((Math.round(minute) % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const mm = String(m % 60).padStart(2, "0");
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${mm} ${h24 < 12 ? "AM" : "PM"}`;
}

type RGB = [number, number, number];
const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a: RGB, b: RGB, t: number) =>
  `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)} ${Math.round(a[1] + (b[1] - a[1]) * t)} ${Math.round(a[2] + (b[2] - a[2]) * t)})`;

/** Sky keyframes by sun elevation (degrees). Observed, not invented: indigo night, ember dusk, hard blue noon. */
const STOPS: { e: number; top: RGB; low: RGB; far: RGB; near: RGB; ground: RGB }[] = [
  { e: -14, top: hex("#0b1119"), low: hex("#182230"), far: hex("#141b25"), near: hex("#0c1016"), ground: hex("#090c10") },
  { e: -6, top: hex("#15243a"), low: hex("#7a4a3c"), far: hex("#2a2a33"), near: hex("#15161b"), ground: hex("#0e0e11") },
  { e: -1, top: hex("#274266"), low: hex("#e0824a"), far: hex("#4a3a3c"), near: hex("#231c1c"), ground: hex("#171312") },
  { e: 5, top: hex("#3f6b9c"), low: hex("#efbd84"), far: hex("#7a5f58"), near: hex("#3b2c27"), ground: hex("#2a201c") },
  { e: 18, top: hex("#2f6fb3"), low: hex("#b9d3e4"), far: hex("#8d7a72"), near: hex("#5a463c"), ground: hex("#463529") },
  { e: 60, top: hex("#2866ad"), low: hex("#a9cbe2"), far: hex("#96857c"), near: hex("#665043"), ground: hex("#523f31") },
];

export function skyFor(elevation: number) {
  const e = Math.min(60, Math.max(-14, elevation));
  let i = 0;
  while (i < STOPS.length - 2 && e > STOPS[i + 1].e) i++;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const t = (e - a.e) / (b.e - a.e);
  return {
    top: mix(a.top, b.top, t),
    low: mix(a.low, b.low, t),
    far: mix(a.far, b.far, t),
    near: mix(a.near, b.near, t),
    ground: mix(a.ground, b.ground, t),
    /** 0 in daylight, 1 at night: drives stars, city lights, lit windows. */
    night: Math.min(1, Math.max(0, (2 - e) / 10)),
  };
}

/** Sun elevation and azimuth (degrees clockwise from north) over Phoenix for a day of year and local minute. */
export function sunAt(dayOfYear: number, localMinute: number): { elevation: number; azimuth: number } {
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1 + (localMinute / 60 - 12) / 24);
  const eqTime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma) - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));
  const decl =
    0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma) - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma) - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);
  const utcMin = localMinute + 7 * 60;
  const trueSolar = utcMin + eqTime + 4 * -112.074;
  const ha = rad(trueSolar / 4 - 180);
  const lat = rad(33.4484);
  const cosZ = Math.sin(lat) * Math.sin(decl) + Math.cos(lat) * Math.cos(decl) * Math.cos(ha);
  const zen = Math.acos(Math.min(1, Math.max(-1, cosZ)));
  const cosAz = (Math.sin(lat) * Math.cos(zen) - Math.sin(decl)) / (Math.cos(lat) * Math.sin(zen));
  let az = deg(Math.acos(Math.min(1, Math.max(-1, cosAz))));
  az = ha > 0 ? (az + 180) % 360 : (540 - az) % 360;
  return { elevation: 90 - deg(zen), azimuth: az };
}
