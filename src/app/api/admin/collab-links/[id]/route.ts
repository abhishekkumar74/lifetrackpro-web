import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyCsrfOrigin } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';
import { CollabLinkRecord, UpdateCollabLinkInput } from '@/types/collab';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/collab-links/[id]
 * Update status (active/inactive) or notes of a collab link.
 */
export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  const session = verifyAdminSession(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required.' },
      { status: 401 }
    );
  }

  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { success: false, error: 'CSRF verification failed.' },
      { status: 403 }
    );
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Link ID is required.' }, { status: 400 });
  }

  let body: Partial<UpdateCollabLinkInput>;
  try {
    body = (await request.json()) as Partial<UpdateCollabLinkInput>;
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed JSON payload.' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (typeof body.isActive === 'boolean') updates.is_active = body.isActive;
  if (typeof body.customNotes === 'string') updates.custom_notes = body.customNotes.trim();
  if (typeof body.campaign === 'string') updates.campaign = body.campaign.trim();
  if (typeof body.name === 'string') updates.name = body.name.trim();

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ success: false, error: 'No valid update fields provided.' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('collab_links')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const updatedRecord = data as CollabLinkRecord;

    await recordAdminAudit({
      adminEmail: session.email || 'admin@lifetrackpro.in',
      action: 'COLLAB_LINK_UPDATED',
      targetType: 'collab_link',
      targetId: id,
      details: updates,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({ success: true, data: updatedRecord });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/collab-links/[id]
 * Deletes a collab link.
 */
export async function DELETE(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  const session = verifyAdminSession(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required.' },
      { status: 401 }
    );
  }

  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { success: false, error: 'CSRF verification failed.' },
      { status: 403 }
    );
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ success: false, error: 'Link ID is required.' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('collab_links').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    await recordAdminAudit({
      adminEmail: session.email || 'admin@lifetrackpro.in',
      action: 'COLLAB_LINK_DELETED',
      targetType: 'collab_link',
      targetId: id,
      details: {},
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
