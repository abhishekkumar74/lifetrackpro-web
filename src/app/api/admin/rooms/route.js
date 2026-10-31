import { NextResponse } from 'next/server';
import { verifyAdminSession, sanitizeSearchQuery } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

/**
 * GET /api/admin/rooms
 * Lists study rooms with server-side pagination, search, and active/inactive filtering.
 * Strictly protected by administrator session verification.
 */
export async function GET(request) {
  // 1. Enforce strict session cookie authorization
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Valid administrator session required.' },
      { status: 401 }
    );
  }

  // 2. Parse query parameters
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
  const search = sanitizeSearchQuery(searchParams.get('search') || '');
  const status = searchParams.get('status') || 'ALL'; // 'ALL', 'ACTIVE', 'INACTIVE'

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    const supabase = getSupabaseAdmin();

    // 3. Build query with profile relation for host metadata
    let query = supabase
      .from('study_rooms')
      .select(
        'id, name, subject, host_id, room_type, timer_minutes, is_active, is_public, member_count, created_at, updated_at, profiles:host_id ( name, avatar_url )',
        { count: 'exact' }
      );

    if (status === 'ACTIVE') {
      query = query.eq('is_active', true);
    } else if (status === 'INACTIVE') {
      query = query.eq('is_active', false);
    }

    if (search) {
      // Filter by room name or subject
      query = query.or(`name.ilike.%${search}%,subject.ilike.%${search}%`);
    }

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data: rooms, count, error } = await query;
    if (error) throw error;

    // 4. Map structured records
    const formattedRooms = (rooms || []).map((r) => ({
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
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      rooms: formattedRooms,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    console.error('[ADMIN ROOMS FETCH ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to retrieve study rooms from database.' },
      { status: 500 }
    );
  }
}
