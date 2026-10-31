import { getSupabaseAdmin } from './supabaseServer';

/**
 * Record an administrative action into the audit trail.
 * Attempts database insertion into public.admin_audit_logs.
 * If the table has not yet been migrated, falls back to structured server logging and marks persistence as pending.
 */
export async function recordAdminAudit({
  adminEmail,
  action,
  targetType,
  targetId,
  details = {},
  ipAddress = 'unknown',
}) {
  const timestamp = new Date().toISOString();
  const entry = {
    admin_email: adminEmail || 'unknown_admin',
    action,
    target_type: targetType,
    target_id: targetId,
    details,
    ip_address: ipAddress,
    created_at: timestamp,
  };

  // Safe structured server log (never includes credentials or secrets)
  console.log(`[ADMIN AUDIT] [${timestamp}] ${action} by ${entry.admin_email} on ${targetType}:${targetId}`, details);

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('admin_audit_logs').insert([entry]);

    if (error) {
      if (error.code === '42P01') {
        // PostgreSQL error 42P01: relation "admin_audit_logs" does not exist
        tableExistsChecked = false;
        return { success: true, persistent: false, status: 'pending_migration' };
      }
      console.warn('[AUDIT LOG WARNING] Failed to persist audit record to database:', error.message);
      return { success: false, persistent: false, error: error.message };
    }

    tableExistsChecked = true;
    return { success: true, persistent: true, status: 'persisted' };
  } catch (err) {
    console.warn('[AUDIT LOG EXCEPTION]', err.message || err);
    return { success: false, persistent: false, error: err.message };
  }
}
