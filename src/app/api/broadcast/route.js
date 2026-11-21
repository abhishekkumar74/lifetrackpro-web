import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { checkApiRateLimit, normalizeClientIp } from '@/lib/rateLimit';

/**
 * GET /api/broadcast
 * Public endpoint to fetch currently active site broadcast banner.
 * Gracefully returns active: false if not set or inactive.
 */
export async function GET(request) {
  const clientIp = normalizeClientIp(request?.headers?.get('x-forwarded-for') || request?.ip || '127.0.0.1');
  const rateLimit = checkApiRateLimit(clientIp, 60, 60000); // 60 req/min per IP
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimit.resetMs / 1000)),
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  }

  const standardHeaders = {
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'X-Robots-Tag': 'noindex, nofollow',
  };

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('app_config')
      .select('value, updated_at')
      .eq('key', 'site_broadcast')
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.warn('[PUBLIC BROADCAST GET NOTICE]', error.message);
      return NextResponse.json(
        { success: true, broadcast: { active: false } },
        { headers: standardHeaders }
      );
    }

    const broadcast = data?.value;
    if (!broadcast || !broadcast.active || !broadcast.message) {
      return NextResponse.json(
        { success: true, broadcast: { active: false } },
        { headers: standardHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        broadcast: {
          active: true,
          message: broadcast.message,
          severity: broadcast.severity || 'info',
          link_url: broadcast.link_url || null,
          link_text: broadcast.link_text || null,
          updated_at: broadcast.updated_at || data?.updated_at || null,
        },
      },
      { headers: standardHeaders }
    );
  } catch (err) {
    console.error('[PUBLIC BROADCAST ERROR]', err.message || err);
    return NextResponse.json(
      { success: true, broadcast: { active: false } },
      { headers: standardHeaders }
    );
  }
}
