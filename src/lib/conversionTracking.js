/**
 * LifeTrack Pro — Conversion Tracking & Play Store URL Generator
 * Privacy-first conversion tracking adhering to zero-PII principles.
 * Reuses the official LifeTrack Pro Google Play Store package identifier.
 */

export const OFFICIAL_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.lifetrackpro.app';

/**
 * Builds the official Google Play Store URL with standard, non-PII referrer/UTM parameters.
 *
 * @param {Object} options
 * @param {string} options.source - Traffic source identifier (e.g. 'study_timetable_tool', 'daily_routine_tool')
 * @param {string} options.medium - Referral medium (default: 'web_cta')
 * @param {string} options.campaign - Campaign name (default: 'routine_conversion')
 * @param {string} options.placement - Exact page location ('below_generated_routine', 'after_copy_action', 'after_pdf_action', 'related_features')
 * @returns {string} - Formatted Google Play Store URL
 */
export function buildPlayStoreUrl({
  source = 'study_timetable_tool',
  medium = 'web_cta',
  campaign = 'routine_conversion',
  placement = 'below_generated_routine',
} = {}) {
  // Google Play Store referrer format
  const referrerParams = [
    `utm_source=${encodeURIComponent(source)}`,
    `utm_medium=${encodeURIComponent(medium)}`,
    `utm_campaign=${encodeURIComponent(campaign)}`,
    `utm_content=${encodeURIComponent(placement)}`,
  ].join('&');

  return `${OFFICIAL_PLAY_STORE_URL}&referrer=${encodeURIComponent(referrerParams)}`;
}

/**
 * Detects whether visitor is on a mobile device or desktop.
 * Purely structural, collects no fingerprinting or personal identifiers.
 */
export function getDeviceCategory() {
  if (typeof window === 'undefined') return 'unknown';
  // Check viewport width and mobile user-agent hints safely
  const isSmallScreen = window.innerWidth <= 768;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  return isSmallScreen || isTouchDevice ? 'mobile' : 'desktop';
}

/**
 * Dispatches conversion measurement events to available analytics providers.
 * Supports window.gtag, window.dataLayer, and window.posthog.
 *
 * @param {Object} params
 * @param {'cta_impression' | 'cta_click'} params.event - Event type
 * @param {string} params.placement - Location identifier
 * @param {string} params.label - Human-readable label
 * @param {string} [params.source] - Tool / source name
 */
export function trackAppConversionEvent({
  event = 'cta_click',
  placement = 'below_generated_routine',
  label = 'Explore LifeTrack Pro App',
  source = 'study_timetable_tool',
} = {}) {
  if (typeof window === 'undefined') return;

  const device = getDeviceCategory();
  const payload = {
    event_category: 'App Promotion',
    event_action: event,
    event_label: label,
    cta_placement: placement,
    device_type: device,
    tool_source: source,
    timestamp: new Date().toISOString(),
  };

  // Google Analytics (gtag.js)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', event, payload);
    } catch {
      // Safe fallback
    }
  }

  // Google Tag Manager (dataLayer)
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: `lifetrack_${event}`,
        ...payload,
      });
    } catch {
      // Safe fallback
    }
  }

  // PostHog (privacy-friendly analytics if present)
  if (window.posthog && typeof window.posthog.capture === 'function') {
    try {
      window.posthog.capture(`app_${event}`, payload);
    } catch {
      // Safe fallback
    }
  }

  // Local development debug log
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[LifeTrack Pro Conversion]', event, payload);
  }
}
