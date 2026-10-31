import { NextResponse } from 'next/server';
import { verifyAdminSession, isValidUUID } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

/**
 * GET /api/admin/rooms/[id]
 * Retrieves details for a specific study room, including host information and message count.
 */
export async function GET(request, context) {
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
      { error: 'Invalid room identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const [roomRes, msgCountRes] = await Promise.all([
      supabase
        .from('study_rooms')
        .select('id, name, subject, host_id, room_type, timer_minutes, is_active, is_public, member_count, created_at, updated_at, profiles:host_id(name, avatar_url)')
        .eq('id', targetId)
        .single(),
      supabase
        .from('room_messages')
        .select('id', { count: 'exact', head: true })
        .eq('room_id', targetId),
    ]);

    if (roomRes.error || !roomRes.data) {
      return NextResponse.json({ error: 'Study room not found in database.' }, { status: 404 });
    }

    const r = roomRes.data;
    const roomDetails = {
      id: r.id,
      name: r.name || 'Untitled Room',
      subject: r.subject || 'General Study',
      hostId: r.host_id,
      hostName: r.profiles?.name || 'Unknown Host',
      hostAvatar: r.profiles?.avatar_url || null,
      roomType: r.room_type || 'silent',
      timerMinutes: r.timer_minutes || 25,
      isActive: Boolean(r.is_active),
      isPublic: Boolean(r.is_public),
      memberCount: Math.max(1, r.member_count ?? 1),
      participantsCount: Math.max(1, r.member_count ?? 1),
      messageCount: msgCountRes.count ?? 0,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    };

    return NextResponse.json({
      success: true,
      room: roomDetails,
    });
  } catch (err) {
    console.error('[ADMIN ROOM GET ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to retrieve study room details.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/rooms/[id]
 * Safely deactivates/closes a study room by updating `is_active: false`.
 * Preserves all chat history in `room_messages` and unrelated user data.
 * Verifies update in database and logs audit entry.
 */
export async function PATCH(request, context) {
  // 1. Strict Session Verification
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  const params = await context.params;
  const targetId = params?.id;

  // 2. Strict UUID Validation
  if (!isValidUUID(targetId)) {
    return NextResponse.json(
      { error: 'Invalid room identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  // 3. Parse Request Body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  // Support { is_active: false } or { action: 'close' }
  const { is_active, action } = body || {};
  let targetActiveState = null;

  if (typeof is_active === 'boolean') {
    targetActiveState = is_active;
  } else if (action === 'close') {
    targetActiveState = false;
  }

  if (targetActiveState === null) {
    return NextResponse.json(
      { error: 'Invalid request body. Expected { is_active: boolean } or { action: "close" }.' },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    // 4. Check if room exists before mutation
    const { data: existingRoom, error: checkError } = await supabase
      .from('study_rooms')
      .select('id, name, host_id, is_active')
      .eq('id', targetId)
      .single();

    if (checkError || !existingRoom) {
      return NextResponse.json({ error: 'Study room not found in database.' }, { status: 404 });
    }

    const now = new Date().toISOString();

    // 5. Execute Update (Does not delete room or room_messages)
    const { error: updateError } = await supabase
      .from('study_rooms')
      .update({
        is_active: targetActiveState,
        updated_at: now,
      })
      .eq('id', targetId);

    if (updateError) throw updateError;

    // 6. Verify Database Value After Mutation
    const { data: verifiedRoom, error: verifyError } = await supabase
      .from('study_rooms')
      .select('id, name, is_active, updated_at')
      .eq('id', targetId)
      .single();

    if (verifyError || !verifiedRoom) {
      throw new Error('Database write succeeded but re-verification query failed.');
    }

    if (verifiedRoom.is_active !== targetActiveState) {
      throw new Error('Database value mismatch during verification check.');
    }

    // 7. Record Audit Trail
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    const auditAction = targetActiveState ? 'STUDY_ROOM_ACTIVATED' : 'STUDY_ROOM_CLOSED';

    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: auditAction,
      targetType: 'study_room',
      targetId,
      details: {
        roomName: existingRoom.name,
        hostId: existingRoom.host_id,
        previousState: { is_active: existingRoom.is_active },
        newState: { is_active: verifiedRoom.is_active },
      },
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      message: targetActiveState
        ? `Study room '${verifiedRoom.name}' has been reactivated.`
        : `Study room '${verifiedRoom.name}' has been closed (deactivated). Messages preserved.`,
      room: {
        id: verifiedRoom.id,
        name: verifiedRoom.name,
        isActive: verifiedRoom.is_active,
        updatedAt: verifiedRoom.updated_at,
      },
    });
  } catch (err) {
    console.error('[ADMIN ROOM UPDATE ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to update study room in database.' },
      { status: 500 }
    );
  }
}
