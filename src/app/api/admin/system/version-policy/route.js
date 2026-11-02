import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

/**
 * POST /api/admin/system/version-policy
 * Updates minimum supported version policy in app_config.
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

  const { min_version, latest_version, force_update, store_url } = body || {};

  const cleanMinVersion = typeof min_version === 'string' && min_version.trim()
    ? min_version.trim().slice(0, 20)
    : '1.0.0';
  const cleanLatestVersion = typeof latest_version === 'string' && latest_version.trim()
    ? latest_version.trim().slice(0, 20)
    : cleanMinVersion;
  const isForceUpdate = Boolean(force_update);
  const cleanStoreUrl = typeof store_url === 'string' && store_url.trim()
    ? store_url.trim().slice(0, 250)
    : 'https://play.google.com/store/apps/details?id=com.lifetrackpro.app';

  const policyValue = {
    min_version: cleanMinVersion,
    latest_version: cleanLatestVersion,
    force_update: isForceUpdate,
    store_url: cleanStoreUrl,
    updated_at: new Date().toISOString(),
    updated_by: adminSession.email || 'administrator',
  };

  try {
    const supabase = getSupabaseAdmin();

    const { data: upserted, error: upsertError } = await supabase
      .from('app_config')
      .upsert({
        key: 'min_supported_version',
        value: policyValue,
        description: 'Minimum required app version to ensure compatibility with backend database schemas.',
        is_public: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' })
      .select()
      .single();

    if (upsertError) throw upsertError;

    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: 'VERSION_POLICY_UPDATED',
      targetType: 'system_config',
      targetId: null,
      details: policyValue,
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      versionPolicy: upserted.value,
      message: 'App version policy saved successfully.',
    });
  } catch (err) {
    console.error('[ADMIN SYSTEM VERSION POLICY ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to update version policy in database.' },
      { status: 500 }
    );
  }
}
