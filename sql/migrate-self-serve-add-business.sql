-- TDL #655 self-serve migration (doineedaobgyn) — additive, metadata-only, idempotent
ALTER TABLE public.obgyn_listings
  ADD COLUMN IF NOT EXISTS submitted_via text NOT NULL DEFAULT 'seeded',
  ADD COLUMN IF NOT EXISTS submission_status text,
  ADD COLUMN IF NOT EXISTS submitted_by_email text,
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz,
  ADD COLUMN IF NOT EXISTS submitted_ip inet,
  ADD COLUMN IF NOT EXISTS gbp_url text,
  ADD COLUMN IF NOT EXISTS gbp_place_id text,
  ADD COLUMN IF NOT EXISTS gbp_cid text;
ALTER TABLE public.obgyn_listings DROP CONSTRAINT IF EXISTS obgyn_listings_submitted_via_chk,
  ADD CONSTRAINT obgyn_listings_submitted_via_chk CHECK (submitted_via IN ('seeded','self_serve','admin_added'));
ALTER TABLE public.obgyn_listings DROP CONSTRAINT IF EXISTS obgyn_listings_submission_status_chk,
  ADD CONSTRAINT obgyn_listings_submission_status_chk CHECK (submission_status IS NULL OR submission_status IN ('pending_verification','verified'));
CREATE INDEX IF NOT EXISTS idx_obgyn_listings_gbp_cid ON public.obgyn_listings (gbp_cid) WHERE gbp_cid IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_obgyn_listings_gbp_place_id ON public.obgyn_listings (gbp_place_id) WHERE gbp_place_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_obgyn_listings_submitted_ip_at ON public.obgyn_listings (submitted_ip, submitted_at DESC) WHERE submitted_ip IS NOT NULL;
