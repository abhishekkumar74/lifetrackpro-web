import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';

/**
 * GET /api/admin/system
 * Returns live system health diagnostics, database table counts,
 * configuration state, and security posture for the Admin Console.
 */
export async function GET(request) {
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  const startTime = Date.now();

  try {
    const supabase = getSupabaseAdmin();

    // 1. Run live ping and table count queries in parallel
    const [
      profilesRes,
      roomsRes,
      announcementsRes,
      configRes,
      auditRes,
    ] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('study_rooms').select('id', { count: 'exact', head: true }),
      supabase.from('app_announcements').select('id', { count: 'exact', head: true }),
      supabase.from('app_config').select('*'),
      supabase.from('admin_audit_logs').select('id', { count: 'exact', head: true }),
    ]);

    const pingMs = Date.now() - startTime;

    // 2. Parse app_config entries
    const configs = {};
    if (configRes.data && Array.isArray(configRes.data)) {
      for (const row of configRes.data) {
        configs[row.key] = row.value;
      }
    }

    // 3. Security posture & Environment verification
    const envCheck = {
      supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      supabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      supabaseServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
      adminSessionSecret: Boolean(process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SECRET_KEY),
      adminEmail: Boolean(process.env.ADMIN_EMAIL),
      googleOAuthClientId: Boolean(process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID),
      sentryDsn: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
      posthogKey: Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY),
    };

    // 4. Runtime metrics
    const memUsage = process.memoryUsage();
    const runtime = {
      nodeVersion: process.version,
      platform: process.platform,
      uptimeSeconds: Math.floor(process.uptime()),
      memoryRssMb: Math.round(memUsage.rss / (1024 * 1024)),
      memoryHeapMb: Math.round(memUsage.heapUsed / (1024 * 1024)),
      environment: process.env.NODE_ENV || 'development',
    };

    // 5. Database Table Health
    const tables = {
      profiles: { count: profilesRes.count ?? 0, status: profilesRes.error ? 'error' : 'healthy' },
      studyRooms: { count: roomsRes.count ?? 0, status: roomsRes.error ? 'error' : 'healthy' },
      announcements: { count: announcementsRes.count ?? 0, status: announcementsRes.error ? 'error' : 'healthy' },
      appConfig: { count: configRes.data?.length ?? 0, status: configRes.error ? 'error' : 'healthy' },
      auditLogs: { count: auditRes.count ?? 0, status: auditRes.error ? 'error' : 'healthy' },
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      database: {
        status: 'connected',
        latencyMs: pingMs,
        tables,
      },
      configurations: {
        maintenanceMode: configs.maintenance_mode || { enabled: false, message: '' },
        featureFlags: configs.feature_flags || {
          enable_study_rooms: true,
          enable_ambient_sounds: true,
          enable_ai_insights: true,
          enable_flashcards: true,
        },
        versionPolicy: configs.min_supported_version || {
          min_version: '1.0.0',
          latest_version: '1.0.0',
          force_update: false,
          store_url: 'https://play.google.com/store/apps/details?id=com.lifetrackpro.app',
        },
      },
      security: {
        routeProtection: 'Next.js Proxy Server Guard (Enforced)',
        authAlgorithm: 'HMAC-SHA256 Cryptographic Cookie Token',
        rateLimiting: 'Dual-Key Sliding Window (5 attempts / 15m)',
        searchIndexing: 'noindex, nofollow (Robots & Meta headers)',
        credentialsProvisioned: envCheck,
      },
      runtime,
    });
  } catch (err) {
    console.error('[ADMIN SYSTEM STATUS ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to retrieve system status diagnostics.' },
      { status: 500 }
    );
  }
}
