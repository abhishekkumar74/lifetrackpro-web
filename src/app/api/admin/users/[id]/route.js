import { NextResponse } from 'next/server';
import { verifyAdminSession, isValidUUID } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';

export async function PATCH(request, context) {
  // 1. Strict Session Verification
  const adminSession = verifyAdminSession(request);
  if (!adminSession) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required.' },
      { status: 401 }
    );
  }

  // Next.js 16 params are asynchronous
  const params = await context.params;
  const targetId = params?.id;

  // 2. Strict UUID Validation
  if (!isValidUUID(targetId)) {
    return NextResponse.json(
      { error: 'Invalid user identifier. Target ID must be a valid UUIDv4.' },
      { status: 400 }
    );
  }

  // 3. Parse and Validate Request Body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload.' }, { status: 400 });
  }

  const { is_premium, category } = body || {};
  const updates = {};

  if (typeof is_premium === 'boolean') {
    updates.is_premium = is_premium;
  }

  if (typeof category === 'string' && category.trim().length > 0) {
    updates.category = category.trim();
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: 'No valid update fields provided. Supported: is_premium (boolean), category (string).' },
      { status: 400 }
    );
  }

  updates.updated_at = new Date().toISOString();

  try {
    const supabase = getSupabaseAdmin();

    // 4. Check if profile exists before mutation
    const { data: existingUser, error: checkError } = await supabase
      .from('profiles')
      .select('id, name, is_premium, category')
      .eq('id', targetId)
      .single();

    if (checkError || !existingUser) {
      return NextResponse.json({ error: 'Student profile not found in database.' }, { status: 404 });
    }

    // 5. Execute Update
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', targetId);

    if (updateError) throw updateError;

    // 6. Verify Database Value After Mutation
    const { data: verifiedRecord, error: verifyError } = await supabase
      .from('profiles')
      .select('id, name, is_premium, category, updated_at')
      .eq('id', targetId)
      .single();

    if (verifyError || !verifiedRecord) {
      throw new Error('Database write succeeded but re-verification query failed.');
    }

    if (typeof is_premium === 'boolean' && verifiedRecord.is_premium !== is_premium) {
      throw new Error('Database value mismatch during verification check.');
    }

    // 7. Record Audit Trail
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';
    let actionName = 'PROFILE_UPDATED';
    if (typeof is_premium === 'boolean') {
      actionName = is_premium ? 'PRO_ENTITLEMENT_GRANTED' : 'PRO_ENTITLEMENT_REVOKED';
    }

    await recordAdminAudit({
      adminEmail: adminSession.email,
      action: actionName,
      targetType: 'user',
      targetId,
      details: {
        previousState: { is_premium: existingUser.is_premium, category: existingUser.category },
        newState: { is_premium: verifiedRecord.is_premium, category: verifiedRecord.category },
      },
      ipAddress: clientIp,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      user: {
        id: verifiedRecord.id,
        name: verifiedRecord.name,
        isPremium: verifiedRecord.is_premium,
        category: verifiedRecord.category,
        updatedAt: verifiedRecord.updated_at,
      },
    });
  } catch (err) {
    console.error('[ADMIN USER UPDATE ERROR]', err.message || err);
    return NextResponse.json(
      { error: 'Failed to update student profile in database.' },
      { status: 500 }
    );
  }
}
