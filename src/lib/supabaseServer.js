import { createClient } from '@supabase/supabase-js';

// Enforce server-only execution
if (typeof window !== 'undefined') {
  throw new Error('Security Error: supabaseServer client must only be imported in server-side environments.');
}

let supabaseAdminClient = null;

/**
 * Returns a singleton server-side Supabase client initialized with the SERVICE_ROLE_KEY.
 * This client bypasses PostgreSQL Row Level Security (RLS) to perform administrative operations.
 * Must NEVER be called or exposed in client components.
 */
export function getSupabaseAdmin() {
  if (supabaseAdminClient) return supabaseAdminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase configuration error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in server environment.');
  }

  supabaseAdminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return supabaseAdminClient;
}
