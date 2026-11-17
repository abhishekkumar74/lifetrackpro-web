-- ====================================================================
-- Migration: Add partner_token to collab_links
-- Description: Adds a unique, unguessable partner token for public read-only stats dashboard
-- ====================================================================

-- 1. Add partner_token column if it does not exist
ALTER TABLE public.collab_links 
ADD COLUMN IF NOT EXISTS partner_token VARCHAR(64);

-- 2. Populate any existing rows where partner_token is NULL
UPDATE public.collab_links 
SET partner_token = replace(gen_random_uuid()::text, '-', '') 
WHERE partner_token IS NULL;

-- 3. Set default value for future inserts
ALTER TABLE public.collab_links 
ALTER COLUMN partner_token SET DEFAULT replace(gen_random_uuid()::text, '-', '');

-- 4. Create unique index for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_collab_links_partner_token 
ON public.collab_links (partner_token);

-- 5. Update RLS policies to allow public reading of active links by partner_token
DROP POLICY IF EXISTS "Public can view active collab links by token" ON public.collab_links;
CREATE POLICY "Public can view active collab links by token"
  ON public.collab_links
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);
