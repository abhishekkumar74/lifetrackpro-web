export type CollabPlatform = 'youtube' | 'instagram' | 'telegram' | 'campus' | 'other';

export type CollabDestinationType = 'play_store' | 'website' | 'custom';

export interface CollabLinkRecord {
  id: string;
  name: string;
  slug: string;
  platform: CollabPlatform;
  campaign: string;
  custom_notes: string | null;
  destination_type: CollabDestinationType;
  is_active: boolean;
  clicks_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCollabLinkInput {
  name: string;
  slug: string;
  platform: CollabPlatform;
  campaign: string;
  customNotes?: string;
  destinationType?: CollabDestinationType;
}

export interface UpdateCollabLinkInput {
  name?: string;
  platform?: CollabPlatform;
  campaign?: string;
  customNotes?: string;
  destinationType?: CollabDestinationType;
  isActive?: boolean;
}

export interface CollabLinkApiResponse {
  success: boolean;
  data?: CollabLinkRecord;
  error?: string;
}

export interface CollabLinksListResponse {
  success: boolean;
  links: CollabLinkRecord[];
  total: number;
  error?: string;
}

export interface PostHogCollabEventProperties {
  collab_partner: string;
  partner_name: string;
  utm_source: string;
  utm_campaign: string;
  referred_by: string;
  destination: string;
  referrer_url?: string;
  user_agent?: string;
}
