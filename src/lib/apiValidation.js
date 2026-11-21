import { z } from 'zod';

/**
 * Zod Schemas for API Input Validation & Defense-in-Depth
 */

// 1. Broadcast Banner Schema
export const BroadcastBannerSchema = z.object({
  enabled: z.boolean().default(false),
  message: z.string().trim().max(300, 'Message cannot exceed 300 characters').default(''),
  severity: z.enum(['info', 'warning', 'critical', 'success']).default('info'),
  ctaText: z.string().trim().max(50, 'CTA text cannot exceed 50 characters').optional().default(''),
  ctaLink: z.string().trim().max(200, 'CTA link cannot exceed 200 characters').optional().default(''),
  allowDismiss: z.boolean().default(true),
});

// 2. Collab Link Create Schema
export const CollabLinkCreateSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  slug: z.string().trim().min(1, 'Slug is required').max(80, 'Slug cannot exceed 80 characters')
    .regex(/^[a-z0-9-_]+$/i, 'Slug must contain only alphanumeric characters, dashes, and underscores'),
  platform: z.enum(['youtube', 'instagram', 'telegram', 'campus', 'other']).default('other'),
  campaign: z.string().trim().min(1, 'Campaign is required').max(100, 'Campaign cannot exceed 100 characters'),
  custom_notes: z.string().trim().max(500, 'Notes cannot exceed 500 characters').optional().default(''),
  destination_type: z.enum(['play_store', 'website', 'custom']).default('play_store'),
  is_active: z.boolean().default(true),
});

// 3. Collab Link Update Schema
export const CollabLinkUpdateSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  platform: z.enum(['youtube', 'instagram', 'telegram', 'campus', 'other']).optional(),
  campaign: z.string().trim().min(1).max(100).optional(),
  custom_notes: z.string().trim().max(500).optional(),
  destination_type: z.enum(['play_store', 'website', 'custom']).optional(),
  is_active: z.boolean().optional(),
});

// 4. Announcement Schema
export const AnnouncementSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(150, 'Title cannot exceed 150 characters'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message cannot exceed 1000 characters'),
  type: z.enum(['general', 'feature', 'maintenance', 'exam_alert']).default('general'),
  target_audience: z.enum(['all', 'jee', 'neet', 'upsc', 'pro']).default('all'),
  is_active: z.boolean().default(true),
});

// 5. Admin User Profile Update Schema
export const UserProfileUpdateSchema = z.object({
  is_premium: z.boolean().optional(),
  is_suspended: z.boolean().optional(),
  admin_notes: z.string().trim().max(1000).optional(),
  category: z.string().trim().max(50).optional(),
});

// Helper for parsing with friendly errors
export function validateRequestBody(schema, data) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errorDetails = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return { success: false, error: errorDetails, data: null };
  }
  return { success: true, error: null, data: result.data };
}
