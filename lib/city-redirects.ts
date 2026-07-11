// lib/city-redirects.ts — 301/308 map for city slugs retired by the 2026-07-11
// empire city-string sweep (stripAdminPrefix + Census-arbitrated abbrev merge).
// Keyed "region/old-slug" -> "region/canonical-slug" (lowercase, no leading slash;
// region = province_state lowercased). 54 entries. MACHINE-GENERATED.
//
// Resolved in app/[region]/[city]/page.tsx via permanentRedirect (308, SEO-equivalent
// to 301) — gated on the page having ZERO listings, so it is INERT until the Phase-2
// DB write empties the old slug, then activates automatically. Stamper-v3 repos ban
// middleware.ts (owner-auth cookie handling), so this is page-level by design.

export const CITY_REDIRECTS: Readonly<Record<string, string>> = {
  "ca/saint-helena": "ca/st-helena",
  "co/ft-carson": "co/fort-carson",
  "fl/ft-lauderdale": "fl/fort-lauderdale",
  "fl/ft-myers": "fl/fort-myers",
  "fl/ft-walton-beach": "fl/fort-walton-beach",
  "fl/mt-dora": "fl/mount-dora",
  "fl/port-saint-lucie": "fl/port-st-lucie",
  "fl/saint-augustine": "fl/st-augustine",
  "fl/saint-cloud": "fl/st-cloud",
  "fl/saint-petersburg": "fl/st-petersburg",
  "fl/village-of-palmetto-bay": "fl/palmetto-bay",
  "ga/ft-gordon": "ga/fort-gordon",
  "ga/ft-oglethorpe": "ga/fort-oglethorpe",
  "ga/ft-stewart": "ga/fort-stewart",
  "ga/saint-marys": "ga/st-marys",
  "ia/ft-madison": "ia/fort-madison",
  "ia/mt-pleasant": "ia/mount-pleasant",
  "il/east-saint-louis": "il/east-st-louis",
  "il/mt-prospect": "il/mount-prospect",
  "in/saint-john": "in/st-john",
  "ks/ft-riley": "ks/fort-riley",
  "ky/ft-wright": "ky/fort-wright",
  "ky/mt-sterling": "ky/mount-sterling",
  "md/ft-washington": "md/fort-washington",
  "mi/mt-pleasant": "mi/mount-pleasant",
  "mi/saint-clair-shores": "mi/st-clair-shores",
  "mi/saint-johns": "mi/st-johns",
  "mi/saint-joseph": "mi/st-joseph",
  "mi/sault-sainte-marie": "mi/sault-ste-marie",
  "mn/saint-cloud": "mn/st-cloud",
  "mn/saint-louis-park": "mn/st-louis-park",
  "mn/saint-michael": "mn/st-michael",
  "mn/saint-paul": "mn/st-paul",
  "mo/saint-charles": "mo/st-charles",
  "mo/saint-joseph": "mo/st-joseph",
  "mo/saint-louis": "mo/st-louis",
  "mo/saint-peters": "mo/st-peters",
  "mo/sainte-genevieve": "mo/ste-genevieve",
  "ms/bay-saint-louis": "ms/bay-st-louis",
  "ny/mt-kisco": "ny/mount-kisco",
  "ny/mt-vernon": "ny/mount-vernon",
  "oh/saint-clairsville": "oh/st-clairsville",
  "oh/saint-marys": "oh/st-marys",
  "pa/mt-pleasant": "pa/mount-pleasant",
  "pa/saint-marys": "pa/st-marys",
  "sc/mt-pleasant": "sc/mount-pleasant",
  "tn/mt-juliet": "tn/mount-juliet",
  "tx/ft-worth": "tx/fort-worth",
  "tx/mt-pleasant": "tx/mount-pleasant",
  "ut/saint-george": "ut/st-george",
  "va/ft-belvoir": "va/fort-belvoir",
  "vt/saint-albans": "vt/st-albans",
  "wi/saint-croix-falls": "wi/st-croix-falls",
  "wv/saint-albans": "wv/st-albans",
};

/** Retired /{region}/{city} -> canonical pathname, or null. Bare 2-segment only. */
export function resolveCityRedirect(pathname: string): string | null {
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/");
  if (parts.length !== 2) return null;
  const key = `${parts[0].toLowerCase()}/${parts[1].toLowerCase()}`;
  const to = CITY_REDIRECTS[key];
  return to ? `/${to}` : null;
}
