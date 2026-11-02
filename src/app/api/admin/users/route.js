import { NextResponse } from 'next/server';
import { verifyAdminSession, sanitizeSearchQuery } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

export async function GET(request) {
  // 1. Enforce strict session cookie authorization
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Valid administrator session required.' },
      { status: 401 }
    );
  }

  // 2. Parse query parameters for pagination, search, and filters
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
  const search = sanitizeSearchQuery(searchParams.get('search') || '');
  const plan = searchParams.get('plan') || 'ALL'; // 'ALL', 'PRO', 'FREE'
  const category = searchParams.get('category') || 'ALL';

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    const supabase = getSupabaseAdmin();

    // 3. Build filtered database query
    let query = supabase
      .from('profiles')
      .select('id, name, avatar_url, category, sub_category, daily_hours, peak_time, xp_points, level, is_premium, created_at, updated_at', { count: 'exact' });

    if (plan === 'PRO') {
      query = query.eq('is_premium', true);
    } else if (plan === 'FREE') {
      query = query.eq('is_premium', false);
    }

    if (category && category !== 'ALL') {
      query = query.eq('category', category);
    }

    if (search) {
      // Search by student name
      query = query.ilike('name', `%${search}%`);
    }

    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data: profiles, count, error } = await query;
    if (error) throw error;

    // 4. Reconcile with auth.users to safely resolve emails, account status, and activity
    const emailMap = new Map();
    const authMetaMap = new Map();
    try {
      const { data: authData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 100 });
      if (authData?.users) {
        for (const u of authData.users) {
          if (u.id) {
            emailMap.set(u.id, u.email || null);
            const isBanned = Boolean(u.banned_until && new Date(u.banned_until) > new Date());
            const status = u.user_metadata?.status || (isBanned ? 'suspended' : 'active');
            authMetaMap.set(u.id, {
              status,
              lastSignInAt: u.last_sign_in_at || null,
            });
          }
        }
      }
    } catch (e) {
      console.warn('[AUTH RECONCILIATION NOTICE] Could not list auth metadata:', e.message);
    }

    // 5. Structure student response records
    let users = (profiles || []).map((p) => {
      const meta = authMetaMap.get(p.id) || {};
      return {
        id: p.id,
        name: p.name || 'Anonymous Student',
        email: emailMap.get(p.id) || 'Not provided',
        category: p.category || 'general',
        subCategory: p.sub_category || [],
        dailyHours: p.daily_hours || 4,
        peakTime: p.peak_time || 'morning',
        xp: p.xp_points || 0,
        level: p.level || 1,
        isPremium: Boolean(p.is_premium),
        status: meta.status || 'active',
        lastSignInAt: meta.lastSignInAt || p.updated_at || null,
        createdAt: p.created_at,
        updatedAt: p.updated_at,
      };
    });

    const statusFilter = searchParams.get('status');
    if (statusFilter && statusFilter !== 'ALL') {
      users = users.filter((u) => u.status === statusFilter.toLowerCase());
    }

    const total = count ?? 0;
    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    console.error('[ADMIN USERS FETCH ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to retrieve students from database.' },
      { status: 500 }
    );
  }
}
