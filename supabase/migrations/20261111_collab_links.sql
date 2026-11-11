-- ====================================================================
-- Migration: Collab & Campaign Links Table
-- Description: Stores creator/influencer links for marketing attribution
-- ====================================================================

-- 1. Create Enums if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'collab_platform') THEN
    CREATE TYPE collab_platform AS ENUM ('youtube', 'instagram', 'telegram', 'campus', 'other');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'collab_destination_type') THEN
    CREATE TYPE collab_destination_type AS ENUM ('play_store', 'website', 'custom');
  END IF;
END $$;

-- 2. Create collab_links Table
CREATE TABLE IF NOT EXISTS public.collab_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  platform collab_platform NOT NULL DEFAULT 'other',
  campaign VARCHAR(100) NOT NULL,
  custom_notes TEXT,
  destination_type collab_destination_type NOT NULL DEFAULT 'play_store',
  is_active BOOLEAN NOT NULL DEFAULT true,
  clicks_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION public.handle_collab_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_collab_links_updated_at ON public.collab_links;
CREATE TRIGGER trigger_collab_links_updated_at
  BEFORE UPDATE ON public.collab_links
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_collab_updated_at();

-- 4. Fast Atomic Increment Function for Clicks
CREATE OR REPLACE FUNCTION public.increment_collab_click(link_slug TEXT)
RETURNS SETOF public.collab_links AS $$
BEGIN
  RETURN QUERY
  UPDATE public.collab_links
  SET clicks_count = clicks_count + 1,
      updated_at = timezone('utc'::text, now())
  WHERE slug = link_slug AND is_active = true
  RETURNING *;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Indexes for fast query lookup
CREATE UNIQUE INDEX IF NOT EXISTS idx_collab_links_slug_lower ON public.collab_links (lower(slug));
CREATE INDEX IF NOT EXISTS idx_collab_links_platform ON public.collab_links (platform);
CREATE INDEX IF NOT EXISTS idx_collab_links_campaign ON public.collab_links (campaign);
CREATE INDEX IF NOT EXISTS idx_collab_links_is_active ON public.collab_links (is_active);
CREATE INDEX IF NOT EXISTS idx_collab_links_created_at ON public.collab_links (created_at DESC);

-- 6. Row Level Security (RLS)
ALTER TABLE public.collab_links ENABLE ROW LEVEL SECURITY;

-- Allow public read of active links for the redirect route (/c/[slug])
DROP POLICY IF EXISTS "Public can view active collab links" ON public.collab_links;
CREATE POLICY "Public can view active collab links"
  ON public.collab_links
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Allow server service_role full control for admin dashboard
DROP POLICY IF EXISTS "Service role has full management access" ON public.collab_links;
CREATE POLICY "Service role has full management access"
  ON public.collab_links
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
