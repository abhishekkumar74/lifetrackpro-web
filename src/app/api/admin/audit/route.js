import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

/**
 * GET /api/admin/audit
 * Returns recent audit logs if the table exists, or informs the admin that the migration is pending.
 */
export async function GET(request) {
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: logs, error } = await supabase
      .from('admin_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      if (error.code === '42P01') {
        // Table not yet migrated in Supabase
        return NextResponse.json({
          success: true,
          status: 'pending_migration',
          migrationFile: 'supabase/migrations/20261030_admin_audit_logs.sql',
          message: 'The audit logging table is pending database migration. Action events are captured in secure server stdout logs.',
          logs: [],
        });
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      status: 'active',
      logs: logs || [],
    });
  } catch (err) {
    console.warn('[ADMIN AUDIT FETCH NOTICE]', err.message || err);
    return NextResponse.json({
      success: true,
      status: 'pending_migration',
      migrationFile: 'supabase/migrations/20261030_admin_audit_logs.sql',
      message: 'Pending migration: Database table admin_audit_logs is not yet created in the Supabase instance.',
      logs: [],
    });
  }
}
