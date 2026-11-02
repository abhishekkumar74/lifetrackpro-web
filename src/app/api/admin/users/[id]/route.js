import { NextResponse } from 'next/server';
import { verifyAdminSession, isValidUUID, verifyCsrfOrigin } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

/**
 * GET /api/admin/users/[id]
 * Retrieves comprehensive student profile, study metrics, habits, room participation,
 * account status, and administrative audit history.
 * SECURITY: Never exposes passwords, password hashes, encryption keys, or recovery tokens.
 */
export async function GET(request, context) {
  // 1. Strict Session Verification
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  // Next.js 16 asynchronous params resolution
  const params = await context.params;
  const targetId = params?.id;

  // 2. Strict UUID Validation
  if (!isValidUUID(targetId)) {
    return NextResponse.json(
      { error: 'Invalid user identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    // 3. Parallel fetching of profile, auth metadata, study metrics, and audit history
    const [
      profileRes,
      authRes,
      focusRes,
      habitsRes,
      habitLogsRes,
      roomsRes,
      auditRes
    ] = await Promise.all([
      // Student Profile
      supabase
        .from('profiles')
        .select('id, name, avatar_url, category, sub_category, daily_hours, peak_time, xp_points, level, ai_insight, ai_insight_updated_at, created_at, updated_at, is_premium')
        .eq('id', targetId)
        .single(),

      // Auth Metadata (never returns credentials/password hashes)
      supabase.auth.admin.getUserById(targetId),

      // Focus sessions metrics
      supabase
        .from('focus_sessions')
        .select('id, session_goal, duration_min, subject, sound_used, mood, started_at, ended_at, created_at, status, focus_accuracy')
        .eq('user_id', targetId)
        .order('created_at', { ascending: false })
        .limit(30),

      // Habits
      supabase
        .from('habits')
        .select('id, title, emoji, frequency, order_index, is_active, custom_days, best_time, created_at, updated_at')
        .eq('user_id', targetId)
        .order('order_index', { ascending: true }),

      // Habit completion logs
      supabase
        .from('habit_logs')
        .select('id, habit_id, date, done, created_at')
        .eq('user_id', targetId)
        .order('date', { ascending: false })
        .limit(60),

      // Study rooms hosted / created by user
      supabase
        .from('study_rooms')
        .select('id, name, subject, host_id, room_type, timer_minutes, is_active, member_count, created_at')
        .eq('host_id', targetId)
        .order('created_at', { ascending: false }),

      // Support & Admin audit trail for this user
      supabase
        .from('admin_audit_logs')
        .select('id, admin_email, action, target_type, target_id, details, ip_address, created_at')
        .eq('target_id', targetId)
        .order('created_at', { ascending: false })
        .limit(30)
    ]);

    if (profileRes.error || !profileRes.data) {
      return NextResponse.json({ error: 'Student profile not found in database.' }, { status: 404 });
    }

    const profile = profileRes.data;
    const authUser = authRes.data?.user || null;

    // 4. Derive Account Status from auth metadata and ban status
    const isBanned = Boolean(authUser?.banned_until && new Date(authUser.banned_until) > new Date());
    const metadataStatus = authUser?.user_metadata?.status;
    let accountStatus = 'active';
    if (metadataStatus === 'deactivated') {
      accountStatus = 'deactivated';
    } else if (isBanned || metadataStatus === 'suspended') {
      accountStatus = 'suspended';
    }

    // 5. Aggregate Focus Metrics
    const focusRows = focusRes.data || [];
    const totalFocusMinutes = focusRows.reduce((acc, row) => acc + (Number(row.duration_min) || 0), 0);
    const totalFocusHours = Number((totalFocusMinutes / 60).toFixed(1));
    const completedSessions = focusRows.filter((r) => r.status === 'completed' || r.ended_at).length;
    const avgSessionMinutes = completedSessions > 0 ? Math.round(totalFocusMinutes / completedSessions) : 0;

    // Subject breakdown
    const subjectMap = {};
    for (const session of focusRows) {
      const subject = session.subject || 'General Focus';
      if (!subjectMap[subject]) {
        subjectMap[subject] = { subject, minutes: 0, count: 0 };
      }
      subjectMap[subject].minutes += Number(session.duration_min) || 0;
      subjectMap[subject].count += 1;
    }
    const subjectBreakdown = Object.values(subjectMap).sort((a, b) => b.minutes - a.minutes);

    // 6. Aggregate Habit Metrics
    const habitRows = habitsRes.data || [];
    const logRows = habitLogsRes.data || [];
    const activeHabitsCount = habitRows.filter((h) => h.is_active).length;
    const completedLogsCount = logRows.filter((l) => l.done).length;
    const completionRate = logRows.length > 0 ? Math.round((completedLogsCount / logRows.length) * 100) : 0;

    // 7. Sanitized Response Object (Zero secrets / private credentials)
    return NextResponse.json({
      success: true,
      student: {
        id: profile.id,
        name: profile.name || 'Anonymous Student',
        avatarUrl: profile.avatar_url || null,
        email: authUser?.email || 'Not provided',
        emailConfirmed: Boolean(authUser?.email_confirmed_at),
        accountStatus,
        suspensionReason: authUser?.user_metadata?.suspension_reason || null,
        deactivationReason: authUser?.user_metadata?.deactivation_reason || null,
        bannedUntil: authUser?.banned_until || null,
        lastSignInAt: authUser?.last_sign_in_at || profile.updated_at || null,
        createdAt: profile.created_at || authUser?.created_at,
        updatedAt: profile.updated_at,
        isPremium: Boolean(profile.is_premium),
        subscriptionTier: profile.is_premium ? 'PRO' : 'FREE',
        
        // Routines & Study Goals
        category: profile.category || 'General',
        subCategory: profile.sub_category || [],
        dailyHours: profile.daily_hours || 4,
        peakTime: profile.peak_time || 'morning',
        xp: profile.xp_points || 0,
        level: profile.level || 1,
        aiInsight: profile.ai_insight || null,
        aiInsightUpdatedAt: profile.ai_insight_updated_at || null,

        // Focus Analytics
        focusStats: {
          totalMinutes: totalFocusMinutes,
          totalHours: totalFocusHours,
          totalSessions: focusRows.length,
          completedSessions,
          avgSessionMinutes,
          subjectBreakdown,
          recentSessions: focusRows.slice(0, 10).map((s) => ({
            id: s.id,
            goal: s.session_goal || 'Deep Focus',
            subject: s.subject || 'General Focus',
            durationMin: s.duration_min,
            status: s.status || 'completed',
            mood: s.mood,
            startedAt: s.started_at,
            endedAt: s.ended_at,
            createdAt: s.created_at,
          })),
        },

        // Habits & Routines
        habitStats: {
          totalHabits: habitRows.length,
          activeHabits: activeHabitsCount,
          totalLogs: logRows.length,
          completedLogs: completedLogsCount,
          completionRate,
          habits: habitRows.map((h) => ({
            id: h.id,
            title: h.title,
            emoji: h.emoji || '🎯',
            frequency: h.frequency || 'daily',
            isActive: Boolean(h.is_active),
            bestTime: h.best_time,
            customDays: h.custom_days,
            createdAt: h.created_at,
          })),
          recentLogs: logRows.slice(0, 15).map((l) => ({
            id: l.id,
            habitId: l.habit_id,
            date: l.date,
            done: Boolean(l.done),
            createdAt: l.created_at,
          })),
        },

        // Study Rooms Participation
        studyRooms: {
          hostedCount: (roomsRes.data || []).length,
          rooms: (roomsRes.data || []).map((r) => ({
            id: r.id,
            name: r.name,
            subject: r.subject || 'Study Session',
            roomType: r.room_type || 'standard',
            timerMinutes: r.timer_minutes,
            isActive: Boolean(r.is_active),
            memberCount: r.member_count || 1,
            createdAt: r.created_at,
          })),
        },

        // Support History & Audit Trail
        auditHistory: (auditRes.data || []).map((a) => ({
          id: a.id,
          action: a.action,
          adminEmail: a.admin_email,
          details: a.details || {},
          ipAddress: a.ip_address,
          createdAt: a.created_at,
        })),
      },
    });
  } catch (err) {
    console.error('[ADMIN USER DETAILS GET ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to retrieve detailed student profile.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/users/[id]
 * Administrative Mutations:
 * - is_premium (boolean): Grant or revoke PRO subscription
 * - category (string): Update target exam category
 * - status ('active' | 'suspended' | 'deactivated'): Account suspension / reactivation
 * - support_note (string): Add internal support or incident note to user audit trail
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

  // 2. Strict CSRF Origin Verification for state mutations
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { error: 'Forbidden: Invalid request origin.' },
      { status: 403 }
    );
  }

  const params = await context.params;
  const targetId = params?.id;

  if (!isValidUUID(targetId)) {
    return NextResponse.json(
      { error: 'Invalid user identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  const { is_premium, category, status, suspension_reason, support_note } = body || {};
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

  try {
    const supabase = getSupabaseAdmin();

    // Check if profile exists
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id, name, is_premium, category')
      .eq('id', targetId)
      .single();

    if (checkError || !existingUser) {
      return NextResponse.json({ error: 'Student profile not found in database.' }, { status: 404 });
    }

    // Fetch existing auth metadata
    const { data: authUserData } = await supabase.auth.admin.getUserById(targetId);
    const existingAuthUser = authUserData?.user || null;

    let responsePayload = { success: true };

    // --- Action A: Subscription Entitlement (is_premium) ---
    if (typeof is_premium === 'boolean') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_premium, updated_at: new Date().toISOString() })
        .eq('id', targetId);

      if (updateError) throw updateError;

      await recordAdminAudit({
        adminEmail: adminSession.email,
        action: is_premium ? 'PRO_ENTITLEMENT_GRANTED' : 'PRO_ENTITLEMENT_REVOKED',
        targetType: 'user',
        targetId,
        details: {
          previousTier: existingUser.is_premium ? 'PRO' : 'FREE',
          newTier: is_premium ? 'PRO' : 'FREE',
          studentName: existingUser.name,
        },
        ipAddress: clientIp,
      });

      responsePayload.isPremium = is_premium;
      responsePayload.subscriptionTier = is_premium ? 'PRO' : 'FREE';
    }

    // --- Action B: Category Update ---
    if (typeof category === 'string' && category.trim().length > 0) {
      const cleanCategory = category.trim();
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ category: cleanCategory, updated_at: new Date().toISOString() })
        .eq('id', targetId);

      if (updateError) throw updateError;

      await recordAdminAudit({
        adminEmail: adminSession.email,
        action: 'USER_CATEGORY_UPDATED',
        targetType: 'user',
        targetId,
        details: {
          previousCategory: existingUser.category,
          newCategory: cleanCategory,
          studentName: existingUser.name,
        },
        ipAddress: clientIp,
      });

      responsePayload.category = cleanCategory;
    }

    // --- Action C: Account Status (Suspend / Reactivate / Deactivate) ---
    if (typeof status === 'string' && ['active', 'suspended', 'deactivated'].includes(status.toLowerCase())) {
      const targetStatus = status.toLowerCase();
      const currentMeta = existingAuthUser?.user_metadata || {};
      const reason = suspension_reason || (targetStatus === 'suspended' ? 'Administrative suspension' : null);

      let banDuration = 'none';
      if (targetStatus === 'suspended' || targetStatus === 'deactivated') {
        banDuration = '87600h'; // 10 years ban in Supabase Auth
      }

      const { error: authUpdateError } = await supabase.auth.admin.updateUserById(targetId, {
        ban_duration: banDuration,
        user_metadata: {
          ...currentMeta,
          status: targetStatus,
          suspension_reason: reason,
          status_updated_at: new Date().toISOString(),
          status_updated_by: adminSession.email,
        },
      });

      if (authUpdateError) {
        console.error('[AUTH STATUS UPDATE ERROR]', authUpdateError.message);
        throw authUpdateError;
      }

      let auditAction = 'USER_STATUS_UPDATED';
      if (targetStatus === 'suspended') auditAction = 'USER_SUSPENDED';
      else if (targetStatus === 'active') auditAction = 'USER_REACTIVATED';
      else if (targetStatus === 'deactivated') auditAction = 'USER_DEACTIVATED';

      await recordAdminAudit({
        adminEmail: adminSession.email,
        action: auditAction,
        targetType: 'user',
        targetId,
        details: {
          previousStatus: currentMeta.status || (existingAuthUser?.banned_until ? 'suspended' : 'active'),
          newStatus: targetStatus,
          reason,
          studentName: existingUser.name,
          studentEmail: existingAuthUser?.email,
        },
        ipAddress: clientIp,
      });

      responsePayload.accountStatus = targetStatus;
      responsePayload.suspensionReason = reason;
    }

    // --- Action D: Support / Incident Note ---
    if (typeof support_note === 'string' && support_note.trim().length > 0) {
      const cleanNote = support_note.trim();
      await recordAdminAudit({
        adminEmail: adminSession.email,
        action: 'SUPPORT_NOTE_ADDED',
        targetType: 'user',
        targetId,
        details: {
          note: cleanNote,
          studentName: existingUser.name,
          studentEmail: existingAuthUser?.email,
        },
        ipAddress: clientIp,
      });

      responsePayload.supportNoteRecorded = true;
    }

    return NextResponse.json(responsePayload);
  } catch (err) {
    console.error('[ADMIN USER UPDATE ERROR]', err.message || err);
    return NextResponse.json(
      { error: err.message || 'Failed to update student profile in database.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/users/[id]
 * Process Student Account Deletion Request:
 * Safely processes account deletion or deactivation with strict verification and audit logging.
 */
export async function DELETE(request, context) {
  // 1. Strict Session Verification
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  // 2. Strict CSRF Origin Verification
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { error: 'Forbidden: Invalid request origin.' },
      { status: 403 }
    );
  }

  const params = await context.params;
  const targetId = params?.id;

  if (!isValidUUID(targetId)) {
    return NextResponse.json(
      { error: 'Invalid user identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    // Body optional, fallback to default soft-deletion
  }

  const { reason = 'Account deletion requested by user/admin', permanent = false } = body;
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

  try {
    const supabase = getSupabaseAdmin();

    // Check if target user exists
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, name')
      .eq('id', targetId)
      .single();

    const { data: authData } = await supabase.auth.admin.getUserById(targetId);
    const userEmail = authData?.user?.email || 'unknown';
    const userName = profile?.name || 'Anonymous Student';

    if (permanent) {
      // Hard delete: remove auth user and related records
      await supabase.from('profiles').delete().eq('id', targetId);
      await supabase.auth.admin.deleteUser(targetId);
    } else {
      // Soft-deactivation (Recommended for regulatory audit retention)
      await supabase.auth.admin.updateUserById(targetId, {
        ban_duration: '87600h',
        user_metadata: {
          ...authData?.user?.user_metadata,
          status: 'deactivated',
          deactivation_reason: reason,
          deactivated_at: new Date().toISOString(),
          deactivated_by: adminSession.email,
        },
      });
    }

    // Immutable Audit Trail
    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: 'USER_DELETION_PROCESSED',
      targetType: 'user',
      targetId,
      details: {
        mode: permanent ? 'permanent_delete' : 'soft_deactivation',
        reason,
        studentName: userName,
        studentEmail: userEmail,
      },
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      message: permanent 
        ? `Student account for ${userName} (${userEmail}) was permanently deleted.`
        : `Student account for ${userName} (${userEmail}) was successfully deactivated and locked.`,
    });
  } catch (err) {
    console.error('[ADMIN USER DELETION ERROR]', err.message || err);
    return NextResponse.json(
      { error: err.message || 'Failed to process student deletion request.' },
      { status: 500 }
    );
  }
}
