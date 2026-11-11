import type { CollabPlatform } from '../types/collab';

export const PLAY_STORE_PACKAGE_ID = 'com.lifetrackpro.app';
export const BASE_PRODUCTION_URL = 'https://lifetrackpro.in';

/**
 * Normalizes any display string to a clean, URL-safe kebab-case slug.
 * e.g., "Rohit JEE 2026!" -> "rohit-jee-2026"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .replace(/[\s_-]+/g, '-') // collapse spaces and underscores into single dash
    .replace(/^-+|-+$/g, ''); // trim leading/trailing dashes
}

/**
 * Validates slug format: lowercase letters, numbers, and hyphens only.
 * Must not begin or end with a hyphen, and no consecutive hyphens.
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || slug.length < 2 || slug.length > 80) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Builds the sharable public landing URL.
 * e.g. https://lifetrackpro.in/c/rohit-jee?utm_source=youtube&utm_campaign=collab_rohit&referred_by=rohit-jee
 */
export function buildCollabShareUrl(
  slug: string,
  platform: CollabPlatform | string,
  campaign: string,
  baseUrl: string = BASE_PRODUCTION_URL
): string {
  const cleanSlug = encodeURIComponent(slug.trim().toLowerCase());
  const cleanPlatform = encodeURIComponent(platform.trim().toLowerCase());
  const cleanCampaign = encodeURIComponent(campaign.trim().toLowerCase());

  return `${baseUrl}/c/${cleanSlug}?utm_source=${cleanPlatform}&utm_campaign=${cleanCampaign}&referred_by=${cleanSlug}`;
}

/**
 * Encodes the Google Play install referrer with double-encoding requirements.
 * Google Play requires the referrer parameter value to be a standard query string that is URL-encoded.
 * Result: https://play.google.com/store/apps/details?id=com.lifetrackpro.app&referrer=utm_source%3D{platform}%26utm_campaign%3D{campaign}%26utm_content%3D{slug}
 */
export function buildPlayStoreDestinationUrl(
  platform: string,
  campaign: string,
  slug: string
): string {
  const referrerPayload = `utm_source=${encodeURIComponent(platform)}&utm_campaign=${encodeURIComponent(campaign)}&utm_content=${encodeURIComponent(slug)}`;
  const encodedReferrer = encodeURIComponent(referrerPayload);
  return `https://play.google.com/store/apps/details?id=${PLAY_STORE_PACKAGE_ID}&referrer=${encodedReferrer}`;
}
