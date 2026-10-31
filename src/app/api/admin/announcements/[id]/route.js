import { NextResponse } from 'next/server';
import { verifyAdminSession, isValidUUID } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

const VALID_SEVERITIES = ['info', 'warning', 'critical'];

/**
 * PATCH /api/admin/announcements/[id]
 * Updates announcement fields (title, message, severity, target_category, is_active, expires_at).
 * Re-verifies written record in database and logs audit entry.
 */
export async function PATCH(request, context) {
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  const params = await context.params;
  const targetId = params?.id;

  if (!isValidUUID(targetId)) {
    return NextResponse.json(
      { error: 'Invalid announcement identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  const { title, message, severity, target_category, is_active, expires_at } = body || {};
  const updates = {};

  if (typeof title === 'string') {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0 || trimmedTitle.length > 120) {
      return NextResponse.json({ error: 'Title must be between 1 and 120 characters.' }, { status: 400 });
    }
    updates.title = trimmedTitle;
  }

  if (typeof message === 'string') {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0 || trimmedMessage.length > 1000) {
      return NextResponse.json({ error: 'Message must be between 1 and 1000 characters.' }, { status: 400 });
    }
    updates.message = trimmedMessage;
  }

  if (typeof severity === 'string') {
    const chosenSeverity = severity.toLowerCase().trim();
    if (!VALID_SEVERITIES.includes(chosenSeverity)) {
      return NextResponse.json(
        { error: `Invalid severity '${severity}'. Supported: ${VALID_SEVERITIES.join(', ')}.` },
        { status: 400 }
      );
    }
    updates.severity = chosenSeverity;
  }

  if (typeof target_category === 'string') {
    updates.target_category = target_category.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '') || 'all';
  } else if (target_category === null) {
    updates.target_category = 'all';
  }

  if (typeof is_active === 'boolean') {
    updates.is_active = is_active;
  }

  if (expires_at !== undefined) {
    if (expires_at === null) {
      updates.expires_at = null;
    } else {
      const expDate = new Date(expires_at);
      if (isNaN(expDate.getTime()) || expDate.getTime() <= Date.now()) {
        return NextResponse.json(
          { error: 'Invalid expires_at timestamp. Must be a valid future ISO timestamp.' },
          { status: 400 }
        );
      }
      updates.expires_at = expDate.toISOString();
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: 'No valid update fields provided.' },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    // Check existing record
    const { data: existing, error: checkError } = await supabase
      .from('app_announcements')
      .select('*')
      .eq('id', targetId)
      .single();

    if (checkError || !existing) {
      if (checkError?.code === '42P01' || checkError?.message?.includes('PGRST205')) {
        return NextResponse.json(
          { error: 'Table public.app_announcements is pending database migration in Supabase.' },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: 'Announcement not found in database.' }, { status: 404 });
    }

    // Execute update
    const { error: updateError } = await supabase
      .from('app_announcements')
      .update(updates)
      .eq('id', targetId);

    if (updateError) throw updateError;

    // Verify update
    const { data: verified, error: verifyError } = await supabase
      .from('app_announcements')
      .select('*')
      .eq('id', targetId)
      .single();

    if (verifyError || !verified) {
      throw new Error('Database write succeeded but re-verification query failed.');
    }

    // Audit trail
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: 'ANNOUNCEMENT_UPDATED',
      targetType: 'announcement',
      targetId,
      details: {
        previousState: {
          title: existing.title,
          severity: existing.severity,
          isActive: existing.is_active,
        },
        newState: {
          title: verified.title,
          severity: verified.severity,
          isActive: verified.is_active,
        },
      },
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      announcement: verified,
    });
  } catch (err) {
    console.error('[ADMIN ANNOUNCEMENT UPDATE ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to update announcement in database.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/announcements/[id]
 * Deletes an announcement permanently from database after verification.
 */
export async function DELETE(request, context) {
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  const params = await context.params;
  const targetId = params?.id;

  if (!isValidUUID(targetId)) {
    return NextResponse.json(
      { error: 'Invalid announcement identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    // Check existing record
    const { data: existing, error: checkError } = await supabase
      .from('app_announcements')
      .select('id, title, severity')
      .eq('id', targetId)
      .single();

    if (checkError || !existing) {
      if (checkError?.code === '42P01' || checkError?.message?.includes('PGRST205')) {
        return NextResponse.json(
          { error: 'Table public.app_announcements is pending database migration in Supabase.' },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: 'Announcement not found in database.' }, { status: 404 });
    }

    // Execute delete
    const { error: deleteError } = await supabase
      .from('app_announcements')
      .delete()
      .eq('id', targetId);

    if (deleteError) throw deleteError;

    // Verify deletion
    const { data: verifyDeleted } = await supabase
      .from('app_announcements')
      .select('id')
      .eq('id', targetId)
      .maybeSingle();

    if (verifyDeleted) {
      throw new Error('Database delete operation failed verification check.');
    }

    // Record audit trail
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: 'ANNOUNCEMENT_DELETED',
      targetType: 'announcement',
      targetId,
      details: {
        title: existing.title,
        severity: existing.severity,
      },
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      deletedId: targetId,
      message: `Announcement '${existing.title}' deleted successfully.`,
    });
  } catch (err) {
    console.error('[ADMIN ANNOUNCEMENT DELETE ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to delete announcement from database.' },
      { status: 500 }
    );
  }
}
