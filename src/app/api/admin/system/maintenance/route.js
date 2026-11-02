import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

/**
 * POST /api/admin/system/maintenance
 * Toggles global maintenance mode in app_config.
 */
export async function POST(request) {
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  const { enabled, message } = body || {};
  const isEnabled = Boolean(enabled);
  const cleanMessage = typeof message === 'string' && message.trim()
    ? message.trim().slice(0, 500)
    : 'LifeTrack Pro is briefly offline for scheduled system optimization. Please check back shortly.';

  const maintenanceValue = {
    enabled: isEnabled,
    message: cleanMessage,
    updated_at: new Date().toISOString(),
    updated_by: adminSession.email || 'administrator',
  };

  try {
    const supabase = getSupabaseAdmin();

    const { data: upserted, error: upsertError } = await supabase
      .from('app_config')
      .upsert({
        key: 'maintenance_mode',
        value: maintenanceValue,
        description: 'Global maintenance mode gate. When enabled: true, the mobile app halts API requests and shows a maintenance screen.',
        is_public: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' })
      .select()
      .single();

    if (upsertError) throw upsertError;

    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: isEnabled ? 'MAINTENANCE_MODE_ENABLED' : 'MAINTENANCE_MODE_DISABLED',
      targetType: 'system_config',
      targetId: null,
      details: {
        enabled: isEnabled,
        message: cleanMessage,
      },
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      maintenance: upserted.value,
      message: isEnabled ? 'Maintenance mode enabled.' : 'Maintenance mode disabled (Normal operations).',
    });
  } catch (err) {
    console.error('[ADMIN SYSTEM MAINTENANCE ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to update maintenance mode in database.' },
      { status: 500 }
    );
  }
}
