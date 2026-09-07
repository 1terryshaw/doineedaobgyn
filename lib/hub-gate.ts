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

export async function provinceRowCount(provinceCode: string): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from(LISTINGS_TABLE)
    .select("*", { count: "exact", head: true })
    .in("country", ["CA", "US"])
    .neq("is_published", false)
    .eq("province_state", provinceCode.toUpperCase());
  if (error) {
    // Throw, never 0 — see the note above.
    throw new Error(
      `provinceRowCount(${provinceCode}) failed: ${(error as { message?: string })?.message ?? "unknown"}`
    );
  }
  return count || 0;
}
