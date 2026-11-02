import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

const VALID_SEVERITIES = ['info', 'warning', 'critical', 'success'];

/**
 * GET /api/admin/broadcast
 * Retrieves the current website announcement broadcast from app_config.
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
    const { data, error } = await supabase
      .from('app_config')
      .select('*')
      .eq('key', 'site_broadcast')
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    const broadcast = data?.value || {
      active: false,
      message: '',
      severity: 'info',
      link_url: '',
      link_text: '',
      updated_at: null,
      updated_by: null,
    };

    return NextResponse.json({
      success: true,
      broadcast,
    });
  } catch (err) {
    console.error('[ADMIN BROADCAST GET ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to retrieve broadcast configuration.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/broadcast
 * Creates or updates the global website announcement broadcast.
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

  const { active, message, severity, link_url, link_text } = body || {};

  const cleanMessage = typeof message === 'string' ? message.trim() : '';
  const isActive = Boolean(active);

  if (isActive && (!cleanMessage || cleanMessage.length > 300)) {
    return NextResponse.json(
      { error: 'Active broadcast must include a message under 300 characters.' },
      { status: 400 }
    );
  }

  const chosenSeverity = VALID_SEVERITIES.includes(severity) ? severity : 'info';
  const cleanLinkUrl = typeof link_url === 'string' ? link_url.trim().slice(0, 200) : '';
  const cleanLinkText = typeof link_text === 'string' ? link_text.trim().slice(0, 60) : '';

  const broadcastValue = {
    active: isActive,
    message: cleanMessage,
    severity: chosenSeverity,
    link_url: cleanLinkUrl || null,
    link_text: cleanLinkText || null,
    updated_at: new Date().toISOString(),
    updated_by: adminSession.email || 'administrator',
  };

  try {
    const supabase = getSupabaseAdmin();

    const { data: upserted, error: upsertError } = await supabase
      .from('app_config')
      .upsert({
        key: 'site_broadcast',
        value: broadcastValue,
        description: 'Live website announcement broadcast banner displayed to public visitors.',
        is_public: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' })
      .select()
      .single();

    if (upsertError) throw upsertError;

    // Record admin audit
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: isActive ? 'SITE_BROADCAST_PUBLISHED' : 'SITE_BROADCAST_DISABLED',
      targetType: 'site_broadcast',
      targetId: null,
      details: {
        active: isActive,
        message: cleanMessage,
        severity: chosenSeverity,
      },
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      broadcast: upserted.value,
      message: isActive ? 'Broadcast published successfully to website.' : 'Broadcast disabled successfully.',
    });
  } catch (err) {
    console.error('[ADMIN BROADCAST POST ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to update broadcast configuration in database.' },
      { status: 500 }
    );
  }
}
