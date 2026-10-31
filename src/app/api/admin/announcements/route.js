import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

const VALID_SEVERITIES = ['info', 'warning', 'critical'];
const VALID_CATEGORIES = ['all', 'student', 'aspirant', 'cse_student', 'jee', 'neet', 'upsc', 'ssc', 'gate'];

/**
 * GET /api/admin/announcements
 * Lists announcements with pagination, status, and severity filters.
 * Gracefully handles pending migration state.
 */
export async function GET(request) {
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
  const status = searchParams.get('status') || 'ALL'; // 'ALL', 'ACTIVE', 'INACTIVE'
  const severity = searchParams.get('severity') || 'ALL';

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    const supabase = getSupabaseAdmin();

    let query = supabase
      .from('app_announcements')
      .select('id, title, message, severity, target_category, is_active, created_at, expires_at, created_by', { count: 'exact' });

    if (status === 'ACTIVE') {
      query = query.eq('is_active', true);
    } else if (status === 'INACTIVE') {
      query = query.eq('is_active', false);
    }

    if (severity && severity !== 'ALL' && VALID_SEVERITIES.includes(severity)) {
      query = query.eq('severity', severity);
    }

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data: announcements, count, error } = await query;

    if (error) {
      if (error.code === '42P01' || error.message?.includes('PGRST205') || error.message?.includes('schema cache')) {
        return NextResponse.json({
          success: true,
          status: 'pending_migration',
          migrationFile: 'supabase/migrations/20261030_app_announcements.sql',
          message: 'Table public.app_announcements is pending database migration in Supabase.',
          announcements: [],
          pagination: { page: 1, limit, total: 0, totalPages: 1 },
        });
      }
      throw error;
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      status: 'active',
      announcements: announcements || [],
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    console.error('[ADMIN ANNOUNCEMENTS GET ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to retrieve announcements from database.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/announcements
 * Creates a new remote announcement with strict validation.
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

  const { title, message, severity, target_category, is_active, expires_at } = body || {};

  // Validation
  if (!title || typeof title !== 'string' || title.trim().length === 0 || title.trim().length > 120) {
    return NextResponse.json(
      { error: 'Invalid title. Must be a non-empty string under 120 characters.' },
      { status: 400 }
    );
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0 || message.trim().length > 1000) {
    return NextResponse.json(
      { error: 'Invalid message. Must be a non-empty string under 1000 characters.' },
      { status: 400 }
    );
  }

  const chosenSeverity = (severity || 'info').toLowerCase();
  if (!VALID_SEVERITIES.includes(chosenSeverity)) {
    return NextResponse.json(
      { error: `Invalid severity '${severity}'. Supported: ${VALID_SEVERITIES.join(', ')}.` },
      { status: 400 }
    );
  }

  let chosenTarget = (target_category || 'all').toLowerCase().trim();
  if (chosenTarget && !VALID_CATEGORIES.includes(chosenTarget)) {
    // If custom target is given, sanitize
    chosenTarget = chosenTarget.replace(/[^a-z0-9_-]/g, '');
  }

  let parsedExpiresAt = null;
  if (expires_at) {
    const expDate = new Date(expires_at);
    if (isNaN(expDate.getTime()) || expDate.getTime() <= Date.now()) {
      return NextResponse.json(
        { error: 'Invalid expires_at timestamp. Must be a valid future ISO timestamp.' },
        { status: 400 }
      );
    }
    parsedExpiresAt = expDate.toISOString();
  }

  const newRecord = {
    title: title.trim(),
    message: message.trim(),
    severity: chosenSeverity,
    target_category: chosenTarget || 'all',
    is_active: typeof is_active === 'boolean' ? is_active : true,
    expires_at: parsedExpiresAt,
    created_by: adminSession.email || 'administrator',
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = getSupabaseAdmin();

    const { data: inserted, error: insertError } = await supabase
      .from('app_announcements')
      .insert([newRecord])
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '42P01' || insertError.message?.includes('PGRST205') || insertError.message?.includes('schema cache')) {
        return NextResponse.json(
          {
            error: 'Database table public.app_announcements is pending database migration. Please execute local migration supabase/migrations/20261030_app_announcements.sql in Supabase first.',
            status: 'pending_migration',
          },
          { status: 503 }
        );
      }
      throw insertError;
    }

    // Verify insertion
    const { data: verified, error: verifyError } = await supabase
      .from('app_announcements')
      .select('*')
      .eq('id', inserted.id)
      .single();

    if (verifyError || !verified) {
      throw new Error('Announcement write succeeded but re-verification query failed.');
    }

    // Record audit trail
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: 'ANNOUNCEMENT_CREATED',
      targetType: 'announcement',
      targetId: verified.id,
      details: {
        title: verified.title,
        severity: verified.severity,
        targetCategory: verified.target_category,
        isActive: verified.is_active,
      },
      ipAddress: clientIp,
    });

    return NextResponse.json(
      {
        success: true,
        verified: true,
        announcement: verified,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[ADMIN ANNOUNCEMENT CREATE ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to create announcement in database.' },
      { status: 500 }
    );
  }
}
