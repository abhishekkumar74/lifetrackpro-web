import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession, verifyCsrfOrigin } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { recordAdminAudit } from '@/lib/auditLog';
import { isValidSlug, slugify } from '@/lib/collabUtils';
import { CollabPlatform, CreateCollabLinkInput, CollabLinkRecord } from '@/types/collab';

const ALLOWED_PLATFORMS: CollabPlatform[] = ['youtube', 'instagram', 'telegram', 'campus', 'other'];

/**
 * GET /api/admin/collab-links
 * Returns a list of all partner collab links, sorted by creation date descending.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = verifyAdminSession(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('collab_links')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === '42P01') {
        // Table not migrated yet
        return NextResponse.json({
          success: true,
          links: [],
          total: 0,
          pendingMigration: true,
        });
      }
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const links = (data || []) as CollabLinkRecord[];
    return NextResponse.json({
      success: true,
      links,
      total: links.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * POST /api/admin/collab-links
 * Creates a new partner collab link with strict slug uniqueness check.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
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

  let body: Partial<CreateCollabLinkInput>;
  try {
    body = (await request.json()) as Partial<CreateCollabLinkInput>;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Malformed JSON payload.' },
      { status: 400 }
    );
  }

  const { name, slug: rawSlug, platform, campaign, customNotes, destinationType } = body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: 'Creator / Partner Name is required.' },
      { status: 400 }
    );
  }

  const normalizedSlug = rawSlug ? slugify(rawSlug) : slugify(name);
  if (!isValidSlug(normalizedSlug)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid slug. Slugs must be 2-80 characters, lowercase alphanumeric, and hyphens only (e.g. "rohit-jee").',
      },
      { status: 400 }
    );
  }

  const selectedPlatform = (platform && ALLOWED_PLATFORMS.includes(platform as CollabPlatform))
    ? (platform as CollabPlatform)
    : 'other';

  const cleanCampaign = campaign && typeof campaign === 'string' && campaign.trim().length > 0
    ? campaign.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '_')
    : `collab_${normalizedSlug}`;

  const cleanDestination = destinationType === 'website' || destinationType === 'custom'
    ? destinationType
    : 'play_store';

  try {
    const supabase = getSupabaseAdmin();

    // Check for existing slug
    const { data: existing, error: checkError } = await supabase
      .from('collab_links')
      .select('id, slug')
      .ilike('slug', normalizedSlug)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      return NextResponse.json(
        { success: false, error: `Database error: ${checkError.message}` },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: `The slug "${normalizedSlug}" is already taken by another collab link. Please choose a unique slug.`,
        },
        { status: 409 }
      );
    }

    // Insert new link
    const newRecord = {
      name: name.trim(),
      slug: normalizedSlug,
      platform: selectedPlatform,
      campaign: cleanCampaign,
      custom_notes: customNotes?.trim() || null,
      destination_type: cleanDestination,
      is_active: true,
      clicks_count: 0,
    };

    const { data: inserted, error: insertError } = await supabase
      .from('collab_links')
      .insert([newRecord])
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { success: false, error: insertError.message },
        { status: 500 }
      );
    }

    const createdRecord = inserted as CollabLinkRecord;

    // Audit log
    await recordAdminAudit({
      adminEmail: session.email || 'admin@lifetrackpro.in',
      action: 'COLLAB_LINK_CREATED',
      targetType: 'collab_link',
      targetId: createdRecord.id,
      details: {
        slug: createdRecord.slug,
        platform: createdRecord.platform,
        campaign: createdRecord.campaign,
      },
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      data: createdRecord,
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
