// Marketing Pro Types
export type Bindings = {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
  AI: any;
}

export type UserRole = 'admin' | 'marketer' | 'analyst' | 'client';
export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';
export type CampaignType = 'email' | 'social' | 'ads' | 'mixed';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  team_id: number;
  avatar_url?: string;
  settings: Record<string, any>;
  last_login_at?: string;
  created_at: string;
}

export interface Team {
  id: number;
  name: string;
  slug: string;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  settings: Record<string, any>;
  created_at: string;
}

export interface Campaign {
  id: number;
  team_id: number;
  name: string;
  description?: string;
  status: CampaignStatus;
  type: CampaignType;
  budget: number;
  spent: number;
  start_date?: string;
  end_date?: string;
  target_audience: Record<string, any>;
  goals: Record<string, any>;
  created_by: number;
  created_at: string;
}

export interface Contact {
  id: number;
  team_id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  position?: string;
  tags: string[];
  custom_fields: Record<string, any>;
  status: 'active' | 'unsubscribed' | 'bounced' | 'complained';
  source?: string;
  created_at: string;
}

export interface EmailSequence {
  id: number;
  team_id: number;
  campaign_id?: number;
  name: string;
  description?: string;
  trigger_type: 'manual' | 'signup' | 'purchase' | 'date' | 'behavior';
  trigger_conditions: Record<string, any>;
  status: 'draft' | 'active' | 'paused' | 'archived';
  created_by: number;
  created_at: string;
}

export interface EmailStep {
  id: number;
  sequence_id: number;
  step_order: number;
  name: string;
  subject_line: string;
  content: string;
  send_delay_hours: number;
  conditions?: Record<string, any>;
  created_at: string;
}

export interface SocialPost {
  id: number;
  team_id: number;
  campaign_id?: number;
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok';
  content: string;
  media_urls?: string[];
  hashtags?: string[];
  scheduled_at?: string;
  published_at?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  external_id?: string;
  metrics: Record<string, any>;
  created_by: number;
  created_at: string;
}

export interface ContentItem {
  id: number;
  team_id: number;
  campaign_id?: number;
  title: string;
  type: 'blog_post' | 'social_post' | 'email' | 'video' | 'infographic' | 'ad_creative';
  content?: string;
  status: 'idea' | 'in_progress' | 'review' | 'approved' | 'published' | 'archived';
  assigned_to?: number;
  due_date?: string;
  published_date?: string;
  tags?: string[];
  notes?: string;
  created_by: number;
  created_at: string;
}

export interface AIInsight {
  id: number;
  team_id: number;
  type: 'best_send_time' | 'subject_optimization' | 'budget_recommendation' | 'audience_suggestion' | 'content_idea';
  title: string;
  description: string;
  data?: Record<string, any>;
  confidence_score?: number;
  status: 'pending' | 'applied' | 'dismissed' | 'expired';
  applies_to_type?: string;
  applies_to_id?: number;
  generated_at: string;
  expires_at?: string;
  applied_at?: string;
}

export interface AnalyticsData {
  total_campaigns: number;
  active_campaigns: number;
  total_contacts: number;
  total_revenue: number;
  conversion_rate: number;
  email_open_rate: number;
  click_through_rate: number;
  roi: number;
}

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'chart' | 'table' | 'metric';
  title: string;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  config: Record<string, any>;
}