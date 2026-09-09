// HUB OCCUPANCY GATE — empty-city-hubs-fan-v1 (2026-09-07). See K200.
//
// A known-but-empty hub must 404, not render an indexable "No OB/GYNs in X yet" at
// HTTP 200. The gate needs a count that FAILS LOUD: the hub reads in lib/supabase.ts
// swallow their errors and return [] / 0, so gating on those would turn a transient DB
// fault into a 404 on every live province hub at once.
//
// Own module so lib/supabase.ts is untouched. Same client, same row boundary
// (country + is_published) as getListingsByProvincePaged.
import { supabaseAdmin, LISTINGS_TABLE } from "@/lib/supabase";

// K216 / K224 — Next's prerender bail-out is NOT a DB fault and must not be laundered into
// one. A statically prerendered route raises DynamicServerError through the no-store client;
// supabase-js CATCHES it and hands it back as a normal `{ error }`, so re-throwing a generic
// Error over it turns the BUILD RED. Re-emit it carrying Next's own digest so Next recognises
// its bail-out and renders the route dynamically. A throwing GATE trips this exactly as a
// throwing READER does — measured on doineedanailsalon, 2026-09-09.
//
// This is the donor v16.14 canonical behaviour. Only the BEHAVIOUR is ported: this file keeps
// its own exports and its own predicate, which mirror THIS repo's hub readers. Swapping in the
// donor's file wholesale would import the donor's camp-specific predicate and break the
// callers that expect provinceRowCount/cityHubRowCount.
const PRERENDER_BAILOUT = /Dynamic server usage|DYNAMIC_SERVER_USAGE/;

function rethrowPrerenderBailout(error: unknown): void {
  const message = String((error as { message?: unknown })?.message ?? "");
  if (!PRERENDER_BAILOUT.test(message)) return;
  const bail = new Error(message) as Error & { digest?: string };
  bail.digest = "DYNAMIC_SERVER_USAGE";
  throw bail;
}

export async function provinceRowCount(provinceCode: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from(LISTINGS_TABLE)
    .select("*", { count: "exact", head: true })
    .in("country", ["CA", "US"])
    .neq("is_published", false)
    .eq("province_state", provinceCode.toUpperCase());
  if (error) {
    rethrowPrerenderBailout(error);
    // Throw, never 0 — see the note above.
    throw new Error(
      `provinceRowCount(${provinceCode}) failed: ${(error as { message?: string })?.message ?? "unknown"}`
    );
  }
  return count || 0;
}
