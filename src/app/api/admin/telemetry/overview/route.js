import { NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

export async function GET(request) {
  // 1. Enforce Server-Side Admin Authorization
  const adminSession = verifyAdminRequest(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Valid administrator session required.' },
      { status: 401 }
    );
  }

  const startTime = Date.now();

  try {
    const supabase = getSupabaseAdmin();

    // 2. Execute parallel aggregation queries
    const [
      profilesRes,
      proProfilesRes,
      focusSessionsRes,
      activeRoomsRes,
      habitsRes,
      focusDurationsRes,
      recentProfilesRes,
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_premium', true),
      supabase.from('focus_sessions').select('*', { count: 'exact', head: true }),
      supabase.from('study_rooms').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('habits').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('focus_sessions').select('duration_min'),
      supabase
        .from('profiles')
        .select('id, name, category, xp_points, level, is_premium, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    // Check for query errors
    if (profilesRes.error) throw profilesRes.error;
    if (proProfilesRes.error) throw proProfilesRes.error;
    if (focusSessionsRes.error) throw focusSessionsRes.error;
    if (activeRoomsRes.error) throw activeRoomsRes.error;

    // 3. Aggregate focus duration safely
    const durationRows = focusDurationsRes.data || [];
    const totalFocusMinutes = durationRows.reduce((acc, row) => acc + (Number(row.duration_min) || 0), 0);
    const totalFocusHours = Number((totalFocusMinutes / 60).toFixed(1));

    const responseTimeMs = Date.now() - startTime;

    // 4. Return clean, structured telemetry response
    return NextResponse.json({
      success: true,
      database: {
        status: 'connected',
        latencyMs: responseTimeMs,
        projectRef: 'zvfeafmixnevqbelxnqp',
      },
      metrics: {
        totalUsers: profilesRes.count ?? 0,
        proUsers: proProfilesRes.count ?? 0,
        freeUsers: Math.max(0, (profilesRes.count ?? 0) - (proProfilesRes.count ?? 0)),
        totalFocusSessions: focusSessionsRes.count ?? 0,
        focusTime: {
          totalMinutes: totalFocusMinutes,
          totalHours: totalFocusHours,
          unit: 'hours',
        },
        activeStudyRooms: activeRoomsRes.count ?? 0,
        activeHabits: habitsRes.count ?? 0,
      },
      recentRegistrations: (recentProfilesRes.data || []).map((p) => ({
        id: p.id,
        name: p.name || 'Anonymous Student',
        category: p.category || 'General',
        xp: p.xp_points || 0,
        level: p.level || 1,
        isPro: Boolean(p.is_premium),
        registeredAt: p.created_at,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[ADMIN TELEMETRY ERROR]', err.message || err);
    return NextResponse.json(
      { 
        error: 'Database connection failed or query could not be completed.',
        database: {
          status: 'error',
          message: 'Unable to communicate with the Supabase data layer.',
        }
      },
      { status: 503 }
    );
  }
}
