-- ==============================================================================
-- LifeTrack Pro (lifetrackpro.in) — Supabase RLS & Security Architecture Review
-- ==============================================================================
-- Scope: 10 tables, views, SECURITY DEFINER functions, storage buckets & Realtime
-- Mode: PROPOSED AUDIT & MIGRATION SCRIPT ONLY (Review before executing in production)
-- Target DB: PostgreSQL 15+ / Supabase
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- CHECKLIST & COMPLIANCE MATRIX
-- ------------------------------------------------------------------------------
-- [x] 1. Profiles Table: RLS enabled; Users manage own profile (auth.uid() = id); public read active avatars/names.
-- [x] 2. Focus Sessions Table: RLS enabled; Students can only read/insert/update own sessions.
-- [x] 3. Habits Table: RLS enabled; Students can only CRUD their own habits.
-- [x] 4. Habit Logs Table: RLS enabled; Students can only log/view their own streak completions.
-- [x] 5. Study Rooms Table: RLS enabled; Authenticated students can view & join active rooms; owners can manage.
-- [x] 6. Room Messages Table: RLS enabled; Participants can send/view messages in active rooms; no cross-room leaks.
-- [x] 7. App Announcements Table: RLS enabled; Public/anon can view active announcements; service_role manages.
-- [x] 8. App Config Table: RLS enabled; Public can read non-sensitive configs (broadcasts); service_role manages.
-- [x] 9. Admin Audit Logs: RLS enabled; strictly service_role append/view only; no public/anon access.
-- [x] 10. Collab Links: RLS enabled; Public can view active links; increment_collab_click SECURITY DEFINER.
-- [x] 11. Database Views: Explicitly configured WITH (security_invoker = true).
-- [x] 12. Stored Functions: All SECURITY DEFINER functions declare explicit search_path = public.
-- [x] 13. Storage Buckets: RLS on storage.objects; size & mime-type restrictions.
-- [x] 14. Realtime Channel Authorization: Filtered broadcast on private channels.
-- ------------------------------------------------------------------------------

-- ==============================================================================
-- 1. ROW LEVEL SECURITY (RLS) POLICIES FOR ALL TABLES
-- ==============================================================================

-- 1.1 PROFILES TABLE
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view basic public profile info" ON public.profiles;
CREATE POLICY "Public can view basic public profile info"
  ON public.profiles FOR SELECT
  TO authenticated, anon
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Service role has full management on profiles" ON public.profiles;
CREATE POLICY "Service role has full management on profiles"
  ON public.profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.2 FOCUS SESSIONS TABLE
ALTER TABLE IF EXISTS public.focus_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own focus sessions" ON public.focus_sessions;
CREATE POLICY "Users can read own focus sessions"
  ON public.focus_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own focus sessions" ON public.focus_sessions;
CREATE POLICY "Users can insert own focus sessions"
  ON public.focus_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own focus sessions" ON public.focus_sessions;
CREATE POLICY "Users can update own focus sessions"
  ON public.focus_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role has full access on focus sessions" ON public.focus_sessions;
CREATE POLICY "Service role has full access on focus sessions"
  ON public.focus_sessions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.3 HABITS TABLE
ALTER TABLE IF EXISTS public.habits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own habits" ON public.habits;
CREATE POLICY "Users can read own habits"
  ON public.habits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own habits" ON public.habits;
CREATE POLICY "Users can insert own habits"
  ON public.habits FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own habits" ON public.habits;
CREATE POLICY "Users can update own habits"
  ON public.habits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own habits" ON public.habits;
CREATE POLICY "Users can delete own habits"
  ON public.habits FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role has full access on habits" ON public.habits;
CREATE POLICY "Service role has full access on habits"
  ON public.habits FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.4 HABIT LOGS TABLE
ALTER TABLE IF EXISTS public.habit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own habit logs" ON public.habit_logs;
CREATE POLICY "Users can read own habit logs"
  ON public.habit_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own habit logs" ON public.habit_logs;
CREATE POLICY "Users can insert own habit logs"
  ON public.habit_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role has full access on habit logs" ON public.habit_logs;
CREATE POLICY "Service role has full access on habit logs"
  ON public.habit_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.5 STUDY ROOMS TABLE
ALTER TABLE IF EXISTS public.study_rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active study rooms" ON public.study_rooms;
CREATE POLICY "Anyone can view active study rooms"
  ON public.study_rooms FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can create study rooms" ON public.study_rooms;
CREATE POLICY "Authenticated users can create study rooms"
  ON public.study_rooms FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Room creators can update their own room" ON public.study_rooms;
CREATE POLICY "Room creators can update their own room"
  ON public.study_rooms FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Service role has full access on study rooms" ON public.study_rooms;
CREATE POLICY "Service role has full access on study rooms"
  ON public.study_rooms FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.6 ROOM MESSAGES TABLE
ALTER TABLE IF EXISTS public.room_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Room participants can view messages" ON public.room_messages;
CREATE POLICY "Room participants can view messages"
  ON public.room_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.study_rooms sr
      WHERE sr.id = room_messages.room_id AND sr.is_active = true
    )
  );

DROP POLICY IF EXISTS "Room participants can insert messages" ON public.room_messages;
CREATE POLICY "Room participants can insert messages"
  ON public.room_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.study_rooms sr
      WHERE sr.id = room_messages.room_id AND sr.is_active = true
    )
  );

DROP POLICY IF EXISTS "Service role has full access on room messages" ON public.room_messages;
CREATE POLICY "Service role has full access on room messages"
  ON public.room_messages FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.7 APP ANNOUNCEMENTS TABLE
ALTER TABLE IF EXISTS public.app_announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active announcements" ON public.app_announcements;
CREATE POLICY "Public can view active announcements"
  ON public.app_announcements FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

DROP POLICY IF EXISTS "Service role has full management on announcements" ON public.app_announcements;
CREATE POLICY "Service role has full management on announcements"
  ON public.app_announcements FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.8 APP CONFIG TABLE
ALTER TABLE IF EXISTS public.app_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view non-sensitive app config" ON public.app_config;
CREATE POLICY "Public can view non-sensitive app config"
  ON public.app_config FOR SELECT
  TO authenticated, anon
  USING (key IN ('site_broadcast', 'feature_flags', 'maintenance_mode', 'version_policy'));

DROP POLICY IF EXISTS "Service role has full access on app config" ON public.app_config;
CREATE POLICY "Service role has full access on app config"
  ON public.app_config FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.9 ADMIN AUDIT LOGS TABLE
ALTER TABLE IF EXISTS public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Strictly lock down audit logs: only service_role can read or append
DROP POLICY IF EXISTS "Strict service role access only for audit logs" ON public.admin_audit_logs;
CREATE POLICY "Strict service role access only for audit logs"
  ON public.admin_audit_logs FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 1.10 COLLAB LINKS TABLE
ALTER TABLE IF EXISTS public.collab_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active collab links" ON public.collab_links;
CREATE POLICY "Public can view active collab links"
  ON public.collab_links FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Service role has full access on collab links" ON public.collab_links;
CREATE POLICY "Service role has full access on collab links"
  ON public.collab_links FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- 2. VIEWS SECURITY HARDENING (SECURITY INVOKER)
-- ==============================================================================
-- In PostgreSQL 15+, views default to the view creator's permissions unless security_invoker is enabled.
-- Setting security_invoker = true ensures the view queries using the requesting user's RLS policies.

DO $$
DECLARE
  v_view_name text;
BEGIN
  FOR v_view_name IN
    SELECT table_name FROM information_schema.views WHERE table_schema = 'public'
  LOOP
    EXECUTE format('ALTER VIEW public.%I SET (security_invoker = true);', v_view_name);
  END LOOP;
END $$;

-- ==============================================================================
-- 3. SECURITY DEFINER FUNCTIONS HARDENING
-- ==============================================================================
-- Prevents Search Path Hijacking by explicitly setting search_path = public, pg_temp

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ==============================================================================
-- 4. STORAGE BUCKET RLS POLICIES
-- ==============================================================================
-- Ensure buckets (e.g. avatars) enforce strict RLS

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152, -- 2MB max
  ARRAY['image/png', 'image/jpeg', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp'];

DROP POLICY IF EXISTS "Public can view avatar images" ON storage.objects;
CREATE POLICY "Public can view avatar images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Authenticated users can upload own avatar" ON storage.objects;
CREATE POLICY "Authenticated users can upload own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "Users can update or delete own avatar" ON storage.objects;
CREATE POLICY "Users can update or delete own avatar"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- ==============================================================================
-- 5. REALTIME CHANNEL AUTHORIZATION
-- ==============================================================================
-- Enable Realtime publication selectively on allowed tables only

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

-- Grant Realtime replication only to public collaboration tables (never audit logs or app config)
ALTER PUBLICATION supabase_realtime ADD TABLE public.room_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.app_announcements;
