import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

/**
 * POST /api/admin/system/feature-flags
 * Updates dynamic mobile and web feature flags in app_config.
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

  const {
    enable_study_rooms,
    enable_ambient_sounds,
    enable_ai_insights,
    enable_flashcards,
  } = body || {};

  const flagsValue = {
    enable_study_rooms: Boolean(enable_study_rooms),
    enable_ambient_sounds: Boolean(enable_ambient_sounds),
    enable_ai_insights: Boolean(enable_ai_insights),
    enable_flashcards: Boolean(enable_flashcards),
    updated_at: new Date().toISOString(),
    updated_by: adminSession.email || 'administrator',
  };

  try {
    const supabase = getSupabaseAdmin();

    const { data: upserted, error: upsertError } = await supabase
      .from('app_config')
      .upsert({
        key: 'feature_flags',
        value: flagsValue,
        description: 'Dynamic feature flags controlling client-side module availability.',
        is_public: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' })
      .select()
      .single();

    if (upsertError) throw upsertError;

    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: 'FEATURE_FLAGS_UPDATED',
      targetType: 'system_config',
      targetId: null,
      details: flagsValue,
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      featureFlags: upserted.value,
      message: 'Feature flags saved and updated successfully.',
    });
  } catch (err) {
    console.error('[ADMIN SYSTEM FEATURE FLAGS ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to update feature flags in database.' },
      { status: 500 }
    );
  }
}
