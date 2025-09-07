-- Marketing Pro - Advanced Schema for Full Features
-- تطوير قاعدة بيانات متقدمة لجميع الميزات المطلوبة

-- =====================================
-- ENHANCED CORE TABLES
-- =====================================

-- Enhanced Users with detailed permissions
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'marketer' CHECK(role IN ('admin', 'editor', 'marketer', 'analyst', 'viewer', 'client')),
  team_id INTEGER NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  department TEXT,
  position TEXT,
  permissions TEXT DEFAULT '{}', -- JSON permissions object
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'suspended', 'pending')),
  last_login_at DATETIME,
  login_count INTEGER DEFAULT 0,
  timezone TEXT DEFAULT 'Asia/Riyadh',
  language TEXT DEFAULT 'ar',
  two_factor_enabled BOOLEAN DEFAULT 0,
  two_factor_secret TEXT,
  email_verified BOOLEAN DEFAULT 0,
  email_verification_token TEXT,
  password_reset_token TEXT,
  password_reset_expires DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Enhanced Teams with subscription and limits
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK(plan IN ('free', 'starter', 'pro', 'enterprise')),
  subscription_id TEXT,
  subscription_status TEXT DEFAULT 'active',
  billing_cycle TEXT DEFAULT 'monthly' CHECK(billing_cycle IN ('monthly', 'yearly')),
  usage_limits TEXT DEFAULT '{}', -- JSON limits object
  current_usage TEXT DEFAULT '{}', -- JSON usage tracking
  settings TEXT DEFAULT '{}',
  industry TEXT,
  company_size TEXT,
  website TEXT,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3b82f6',
  secondary_color TEXT DEFAULT '#10b981',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- ADVANCED CLIENT MANAGEMENT (CRM)
-- =====================================

-- Enhanced Clients with CRM features
CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  industry TEXT,
  company_size TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Saudi Arabia',
  timezone TEXT DEFAULT 'Asia/Riyadh',
  status TEXT DEFAULT 'lead' CHECK(status IN ('lead', 'prospect', 'active', 'inactive', 'churned', 'archived')),
  lead_score INTEGER DEFAULT 0,
  lead_source TEXT,
  assigned_to INTEGER,
  account_manager INTEGER,
  total_value DECIMAL(12,2) DEFAULT 0,
  lifetime_value DECIMAL(12,2) DEFAULT 0,
  acquisition_cost DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  tags TEXT DEFAULT '[]', -- JSON array
  custom_fields TEXT DEFAULT '{}', -- JSON object
  social_profiles TEXT DEFAULT '{}', -- JSON object with social links
  communication_preferences TEXT DEFAULT '{}', -- JSON preferences
  last_contact_date DATETIME,
  next_followup_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (account_manager) REFERENCES users(id)
);

-- Client interactions and touchpoints
CREATE TABLE IF NOT EXISTS client_interactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('call', 'email', 'meeting', 'note', 'task', 'whatsapp', 'social')),
  subject TEXT NOT NULL,
  description TEXT,
  outcome TEXT,
  sentiment TEXT CHECK(sentiment IN ('positive', 'neutral', 'negative')),
  duration_minutes INTEGER,
  scheduled_at DATETIME,
  completed_at DATETIME,
  follow_up_required BOOLEAN DEFAULT 0,
  follow_up_date DATETIME,
  attachments TEXT DEFAULT '[]', -- JSON array of file URLs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Client deals and opportunities
CREATE TABLE IF NOT EXISTS client_deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  value DECIMAL(12,2) NOT NULL,
  stage TEXT DEFAULT 'qualification' CHECK(stage IN ('qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
  probability INTEGER DEFAULT 50, -- Percentage
  expected_close_date DATE,
  actual_close_date DATE,
  assigned_to INTEGER,
  created_by INTEGER NOT NULL,
  lost_reason TEXT,
  won_reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- =====================================
-- ADVANCED CAMPAIGN MANAGEMENT
-- =====================================

-- Enhanced Campaigns with multi-channel support
CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'paused', 'completed', 'archived')),
  type TEXT NOT NULL CHECK(type IN ('email', 'social', 'whatsapp', 'sms', 'ads', 'mixed', 'content')),
  objective TEXT,
  target_audience TEXT,
  audience_size INTEGER,
  budget DECIMAL(12,2) DEFAULT 0,
  spent DECIMAL(12,2) DEFAULT 0,
  daily_budget DECIMAL(10,2),
  bid_strategy TEXT,
  optimization_goal TEXT,
  start_date DATE,
  end_date DATE,
  timezone TEXT DEFAULT 'Asia/Riyadh',
  channels TEXT DEFAULT '[]', -- JSON array of channels
  platforms TEXT DEFAULT '[]', -- JSON array of platforms
  targeting_criteria TEXT DEFAULT '{}', -- JSON targeting options
  creative_assets TEXT DEFAULT '[]', -- JSON array of creative files
  tracking_parameters TEXT DEFAULT '{}', -- UTM and tracking codes
  ab_test_config TEXT DEFAULT '{}', -- A/B test configuration
  goals TEXT DEFAULT '[]', -- JSON array of SMART goals
  kpis TEXT DEFAULT '{}', -- Key Performance Indicators
  created_by INTEGER NOT NULL,
  assigned_to INTEGER,
  client_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Real-time campaign performance metrics
CREATE TABLE IF NOT EXISTS campaign_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER NOT NULL,
  date DATE NOT NULL,
  platform TEXT,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  conversion_value DECIMAL(10,2) DEFAULT 0,
  spend DECIMAL(10,2) DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  cpm DECIMAL(8,4) DEFAULT 0, -- Cost per mille
  cpc DECIMAL(8,4) DEFAULT 0, -- Cost per click
  ctr DECIMAL(6,4) DEFAULT 0, -- Click-through rate
  conversion_rate DECIMAL(6,4) DEFAULT 0,
  roas DECIMAL(8,4) DEFAULT 0, -- Return on ad spend
  reach INTEGER DEFAULT 0,
  frequency DECIMAL(6,2) DEFAULT 0,
  engagement INTEGER DEFAULT 0,
  engagement_rate DECIMAL(6,4) DEFAULT 0,
  video_views INTEGER DEFAULT 0,
  video_completion_rate DECIMAL(6,4) DEFAULT 0,
  custom_metrics TEXT DEFAULT '{}', -- JSON for platform-specific metrics
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE,
  UNIQUE(campaign_id, date, platform)
);

-- =====================================
-- EMAIL MARKETING ADVANCED
-- =====================================

-- Enhanced Email Templates with drag-drop support
CREATE TABLE IF NOT EXISTS email_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  html_content TEXT, -- Rich HTML content
  design_json TEXT, -- Drag-drop editor JSON
  type TEXT DEFAULT 'marketing' CHECK(type IN ('marketing', 'transactional', 'newsletter', 'welcome', 'followup')),
  category TEXT,
  tags TEXT DEFAULT '[]',
  variables TEXT DEFAULT '[]', -- Available merge tags
  is_active BOOLEAN DEFAULT 1,
  is_responsive BOOLEAN DEFAULT 1,
  thumbnail_url TEXT,
  usage_count INTEGER DEFAULT 0,
  performance_score DECIMAL(5,2) DEFAULT 0,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Advanced Email Campaigns with A/B testing
CREATE TABLE IF NOT EXISTS email_campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_id INTEGER,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  reply_to_email TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled')),
  send_at DATETIME,
  timezone TEXT DEFAULT 'Asia/Riyadh',
  recipient_lists TEXT DEFAULT '[]', -- JSON array of list IDs
  segment_criteria TEXT DEFAULT '{}', -- Segmentation rules
  ab_test_enabled BOOLEAN DEFAULT 0,
  ab_test_config TEXT DEFAULT '{}', -- A/B test configuration
  personalization_enabled BOOLEAN DEFAULT 1,
  tracking_enabled BOOLEAN DEFAULT 1,
  sent_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  bounced_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  unsubscribed_count INTEGER DEFAULT 0,
  complained_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  conversion_value DECIMAL(10,2) DEFAULT 0,
  open_rate DECIMAL(6,4) DEFAULT 0,
  click_rate DECIMAL(6,4) DEFAULT 0,
  unsubscribe_rate DECIMAL(6,4) DEFAULT 0,
  deliverability_score DECIMAL(5,2) DEFAULT 0,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Email automation sequences
CREATE TABLE IF NOT EXISTS email_sequences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL CHECK(trigger_type IN ('signup', 'purchase', 'abandon_cart', 'birthday', 'custom')),
  trigger_conditions TEXT DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'paused', 'archived')),
  delay_type TEXT DEFAULT 'immediate' CHECK(delay_type IN ('immediate', 'scheduled', 'optimal')),
  delay_value INTEGER DEFAULT 0, -- Minutes/hours/days
  delay_unit TEXT DEFAULT 'minutes' CHECK(delay_unit IN ('minutes', 'hours', 'days')),
  enrollment_count INTEGER DEFAULT 0,
  completion_count INTEGER DEFAULT 0,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- =====================================
-- WHATSAPP BUSINESS ADVANCED
-- =====================================

-- Enhanced WhatsApp Business configuration
CREATE TABLE IF NOT EXISTS whatsapp_business (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  business_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  phone_number_id TEXT,
  business_account_id TEXT,
  access_token TEXT,
  webhook_url TEXT,
  webhook_token TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'active', 'suspended', 'disconnected')),
  verification_status TEXT DEFAULT 'unverified' CHECK(verification_status IN ('unverified', 'pending', 'verified')),
  messaging_limit TEXT DEFAULT 'tier_1' CHECK(messaging_limit IN ('tier_1', 'tier_2', 'tier_3', 'unlimited')),
  quality_rating TEXT DEFAULT 'unknown' CHECK(quality_rating IN ('unknown', 'high', 'medium', 'low')),
  settings TEXT DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  UNIQUE(team_id, phone_number)
);

-- WhatsApp message templates (official)
CREATE TABLE IF NOT EXISTS whatsapp_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'ar',
  category TEXT NOT NULL CHECK(category IN ('marketing', 'utility', 'authentication')),
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected', 'disabled')),
  header_type TEXT CHECK(header_type IN ('text', 'image', 'video', 'document')),
  header_content TEXT,
  body_content TEXT NOT NULL,
  footer_content TEXT,
  buttons TEXT DEFAULT '[]', -- JSON array of buttons
  variables TEXT DEFAULT '[]', -- Available variables
  rejection_reason TEXT,
  usage_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  UNIQUE(team_id, name, language)
);

-- Enhanced WhatsApp contacts with conversation context
CREATE TABLE IF NOT EXISTS whatsapp_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  phone_number TEXT NOT NULL,
  name TEXT,
  profile_pic_url TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'blocked', 'unsubscribed')),
  opt_in_status BOOLEAN DEFAULT 0,
  opt_in_date DATETIME,
  last_message_at DATETIME,
  last_message_direction TEXT CHECK(last_message_direction IN ('inbound', 'outbound')),
  conversation_status TEXT DEFAULT 'open' CHECK(conversation_status IN ('open', 'closed', 'pending')),
  assigned_agent INTEGER,
  total_messages INTEGER DEFAULT 0,
  unread_count INTEGER DEFAULT 0,
  labels TEXT DEFAULT '[]',
  tags TEXT DEFAULT '[]',
  custom_fields TEXT DEFAULT '{}',
  client_id INTEGER, -- Link to CRM client
  lead_score INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_agent) REFERENCES users(id),
  FOREIGN KEY (client_id) REFERENCES clients(id),
  UNIQUE(team_id, phone_number)
);

-- Enhanced WhatsApp messages with rich content
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  contact_id INTEGER NOT NULL,
  campaign_id INTEGER,
  message_id TEXT UNIQUE,
  conversation_id TEXT,
  type TEXT DEFAULT 'text' CHECK(type IN ('text', 'image', 'document', 'audio', 'video', 'sticker', 'location', 'contact', 'template', 'interactive', 'button', 'list')),
  content TEXT NOT NULL,
  media_url TEXT,
  media_mime_type TEXT,
  media_size INTEGER,
  template_name TEXT,
  template_language TEXT,
  template_variables TEXT DEFAULT '{}',
  interactive_content TEXT DEFAULT '{}', -- For buttons, lists, etc.
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  direction TEXT DEFAULT 'outbound' CHECK(direction IN ('inbound', 'outbound')),
  sent_by INTEGER,
  replied_to_message_id TEXT,
  forwarded BOOLEAN DEFAULT 0,
  error_code TEXT,
  error_message TEXT,
  sent_at DATETIME,
  delivered_at DATETIME,
  read_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES whatsapp_contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
  FOREIGN KEY (sent_by) REFERENCES users(id)
);

-- =====================================
-- SOCIAL MEDIA MANAGEMENT ADVANCED
-- =====================================

-- Enhanced social media accounts with detailed metrics
CREATE TABLE IF NOT EXISTS social_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  platform TEXT NOT NULL CHECK(platform IN ('facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'youtube', 'snapchat')),
  account_name TEXT NOT NULL,
  account_id TEXT NOT NULL,
  username TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at DATETIME,
  account_type TEXT CHECK(account_type IN ('personal', 'business', 'creator')),
  is_active BOOLEAN DEFAULT 1,
  is_verified BOOLEAN DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(6,4) DEFAULT 0,
  avg_reach INTEGER DEFAULT 0,
  profile_pic_url TEXT,
  bio TEXT,
  website TEXT,
  location TEXT,
  metrics_last_updated DATETIME,
  settings TEXT DEFAULT '{}',
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id),
  UNIQUE(team_id, platform, account_id)
);

-- Enhanced social media posts with rich scheduling
CREATE TABLE IF NOT EXISTS social_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  campaign_id INTEGER,
  content TEXT NOT NULL,
  content_type TEXT DEFAULT 'text' CHECK(content_type IN ('text', 'image', 'video', 'carousel', 'story', 'reel', 'live')),
  media_urls TEXT DEFAULT '[]',
  hashtags TEXT DEFAULT '[]',
  mentions TEXT DEFAULT '[]',
  platforms TEXT NOT NULL, -- JSON array of platform IDs
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'published', 'failed', 'archived')),
  visibility TEXT DEFAULT 'public' CHECK(visibility IN ('public', 'private', 'followers')),
  scheduled_at DATETIME,
  published_at DATETIME,
  optimal_time_suggested DATETIME,
  auto_schedule BOOLEAN DEFAULT 0,
  timezone TEXT DEFAULT 'Asia/Riyadh',
  
  -- Engagement metrics
  total_engagement INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  saves_count INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  engagement_rate DECIMAL(6,4) DEFAULT 0,
  
  -- A/B testing
  ab_test_group TEXT,
  ab_test_id INTEGER,
  
  -- Approval workflow
  approval_required BOOLEAN DEFAULT 0,
  approval_status TEXT DEFAULT 'approved' CHECK(approval_status IN ('pending', 'approved', 'rejected')),
  approved_by INTEGER,
  approved_at DATETIME,
  rejection_reason TEXT,
  
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (approved_by) REFERENCES users(id)
);

-- =====================================
-- CONTENT MANAGEMENT & AI
-- =====================================

-- Content library for reusable assets
CREATE TABLE IF NOT EXISTS content_library (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK(type IN ('text', 'image', 'video', 'audio', 'template', 'hashtag_set', 'caption_template')),
  category TEXT,
  content TEXT,
  file_url TEXT,
  file_size INTEGER,
  mime_type TEXT,
  dimensions TEXT, -- For images/videos: width x height
  duration INTEGER, -- For videos/audio: seconds
  tags TEXT DEFAULT '[]',
  usage_count INTEGER DEFAULT 0,
  performance_score DECIMAL(5,2) DEFAULT 0,
  ai_generated BOOLEAN DEFAULT 0,
  ai_model TEXT,
  ai_prompt TEXT,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Content calendar for planning and scheduling
CREATE TABLE IF NOT EXISTS content_calendar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK(content_type IN ('post', 'story', 'reel', 'video', 'article', 'email', 'campaign')),
  platforms TEXT DEFAULT '[]',
  status TEXT DEFAULT 'planned' CHECK(status IN ('planned', 'in_progress', 'review', 'approved', 'published', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to INTEGER,
  collaborators TEXT DEFAULT '[]', -- JSON array of user IDs
  due_date DATE,
  publish_date DATETIME,
  timezone TEXT DEFAULT 'Asia/Riyadh',
  tags TEXT DEFAULT '[]',
  notes TEXT,
  checklist TEXT DEFAULT '[]', -- JSON array of tasks
  
  -- Approval workflow
  approval_required BOOLEAN DEFAULT 0,
  approval_status TEXT DEFAULT 'approved' CHECK(approval_status IN ('pending', 'approved', 'rejected')),
  approved_by INTEGER,
  approved_at DATETIME,
  
  -- Links to content
  content_id INTEGER, -- Link to content_library
  social_post_id INTEGER, -- Link to social_posts
  email_campaign_id INTEGER, -- Link to email_campaigns
  
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (approved_by) REFERENCES users(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (content_id) REFERENCES content_library(id),
  FOREIGN KEY (social_post_id) REFERENCES social_posts(id),
  FOREIGN KEY (email_campaign_id) REFERENCES email_campaigns(id)
);

-- AI-powered content suggestions and insights
CREATE TABLE IF NOT EXISTS ai_insights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('content_suggestion', 'performance_prediction', 'audience_insight', 'trend_analysis', 'optimization_tip')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  confidence_score DECIMAL(5,4), -- AI confidence level
  data_sources TEXT DEFAULT '[]', -- What data was used
  recommendations TEXT DEFAULT '[]', -- JSON array of action items
  related_entity_type TEXT, -- campaigns, posts, etc.
  related_entity_id INTEGER,
  status TEXT DEFAULT 'new' CHECK(status IN ('new', 'viewed', 'applied', 'dismissed')),
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- =====================================
-- INTEGRATIONS & THIRD-PARTY
-- =====================================

-- Enhanced integrations with OAuth and webhooks
CREATE TABLE IF NOT EXISTS integrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('email', 'social', 'ads', 'analytics', 'crm', 'payment', 'sms', 'storage', 'ai')),
  provider TEXT NOT NULL,
  status TEXT DEFAULT 'disconnected' CHECK(status IN ('connected', 'disconnected', 'error', 'pending')),
  
  -- OAuth configuration
  client_id TEXT,
  client_secret TEXT,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at DATETIME,
  scope TEXT,
  
  -- API configuration
  api_key TEXT,
  api_secret TEXT,
  endpoint_url TEXT,
  webhook_url TEXT,
  webhook_secret TEXT,
  
  -- Settings and data
  config TEXT DEFAULT '{}',
  credentials TEXT DEFAULT '{}',
  sync_enabled BOOLEAN DEFAULT 1,
  last_sync_at DATETIME,
  sync_frequency INTEGER DEFAULT 3600, -- seconds
  sync_status TEXT DEFAULT 'success' CHECK(sync_status IN ('success', 'error', 'pending', 'disabled')),
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  
  -- Usage tracking
  requests_count INTEGER DEFAULT 0,
  requests_limit INTEGER,
  requests_reset_at DATETIME,
  
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id),
  UNIQUE(team_id, name, provider)
);

-- Google Ads integration specific tables
CREATE TABLE IF NOT EXISTS google_ads_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  integration_id INTEGER NOT NULL,
  account_id TEXT NOT NULL,
  account_name TEXT NOT NULL,
  currency_code TEXT DEFAULT 'SAR',
  timezone TEXT DEFAULT 'Asia/Riyadh',
  is_manager_account BOOLEAN DEFAULT 0,
  status TEXT DEFAULT 'active',
  spend_limit DECIMAL(12,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (integration_id) REFERENCES integrations(id) ON DELETE CASCADE,
  UNIQUE(team_id, account_id)
);

-- Google AdSense integration
CREATE TABLE IF NOT EXISTS adsense_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  integration_id INTEGER NOT NULL,
  account_id TEXT NOT NULL,
  account_name TEXT NOT NULL,
  currency_code TEXT DEFAULT 'USD',
  timezone TEXT DEFAULT 'Asia/Riyadh',
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (integration_id) REFERENCES integrations(id) ON DELETE CASCADE,
  UNIQUE(team_id, account_id)
);

-- =====================================
-- ANALYTICS & REPORTING
-- =====================================

-- Enhanced analytics with detailed breakdowns
CREATE TABLE IF NOT EXISTS analytics_summary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  date DATE NOT NULL,
  
  -- Campaign metrics
  total_campaigns INTEGER DEFAULT 0,
  active_campaigns INTEGER DEFAULT 0,
  completed_campaigns INTEGER DEFAULT 0,
  campaign_performance_score DECIMAL(5,2) DEFAULT 0,
  
  -- Client metrics
  total_clients INTEGER DEFAULT 0,
  new_clients INTEGER DEFAULT 0,
  active_clients INTEGER DEFAULT 0,
  client_satisfaction_score DECIMAL(5,2) DEFAULT 0,
  
  -- User activity metrics
  total_users INTEGER DEFAULT 0,
  active_users INTEGER DEFAULT 0,
  user_engagement_score DECIMAL(5,2) DEFAULT 0,
  
  -- Email metrics
  emails_sent INTEGER DEFAULT 0,
  emails_delivered INTEGER DEFAULT 0,
  emails_opened INTEGER DEFAULT 0,
  emails_clicked INTEGER DEFAULT 0,
  email_conversion_count INTEGER DEFAULT 0,
  email_performance_score DECIMAL(5,2) DEFAULT 0,
  
  -- WhatsApp metrics
  whatsapp_messages_sent INTEGER DEFAULT 0,
  whatsapp_messages_delivered INTEGER DEFAULT 0,
  whatsapp_messages_read INTEGER DEFAULT 0,
  whatsapp_conversations INTEGER DEFAULT 0,
  whatsapp_response_rate DECIMAL(6,4) DEFAULT 0,
  
  -- Social media metrics
  social_posts_published INTEGER DEFAULT 0,
  social_total_reach INTEGER DEFAULT 0,
  social_total_engagement INTEGER DEFAULT 0,
  social_avg_engagement_rate DECIMAL(6,4) DEFAULT 0,
  social_follower_growth INTEGER DEFAULT 0,
  
  -- Financial metrics
  total_revenue DECIMAL(12,2) DEFAULT 0,
  total_spend DECIMAL(12,2) DEFAULT 0,
  profit_margin DECIMAL(6,4) DEFAULT 0,
  roi DECIMAL(8,4) DEFAULT 0,
  roas DECIMAL(8,4) DEFAULT 0, -- Return on ad spend
  customer_acquisition_cost DECIMAL(10,2) DEFAULT 0,
  customer_lifetime_value DECIMAL(10,2) DEFAULT 0,
  
  -- Performance indicators
  conversion_rate DECIMAL(6,4) DEFAULT 0,
  click_through_rate DECIMAL(6,4) DEFAULT 0,
  cost_per_acquisition DECIMAL(10,2) DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  UNIQUE(team_id, date)
);

-- =====================================
-- SYSTEM & AUDIT
-- =====================================

-- Enhanced activity log with detailed tracking
CREATE TABLE IF NOT EXISTS activity_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  user_id INTEGER,
  session_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id INTEGER,
  description TEXT NOT NULL,
  severity TEXT DEFAULT 'info' CHECK(severity IN ('debug', 'info', 'warning', 'error', 'critical')),
  ip_address TEXT,
  user_agent TEXT,
  location_country TEXT,
  location_city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  metadata TEXT DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- System notifications and alerts
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER,
  user_id INTEGER,
  type TEXT NOT NULL CHECK(type IN ('system', 'campaign', 'client', 'billing', 'integration', 'security')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'info' CHECK(severity IN ('info', 'warning', 'error', 'success')),
  status TEXT DEFAULT 'unread' CHECK(status IN ('unread', 'read', 'archived')),
  action_url TEXT,
  action_text TEXT,
  related_entity_type TEXT,
  related_entity_id INTEGER,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  read_at DATETIME,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =====================================
-- PERFORMANCE INDEXES
-- =====================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_team_email ON users(team_id, email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login_at);

-- Clients indexes
CREATE INDEX IF NOT EXISTS idx_clients_team_status ON clients(team_id, status);
CREATE INDEX IF NOT EXISTS idx_clients_assigned ON clients(assigned_to);
CREATE INDEX IF NOT EXISTS idx_clients_lead_score ON clients(lead_score);
CREATE INDEX IF NOT EXISTS idx_clients_created ON clients(created_at);

-- Campaigns indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_team_status ON campaigns(team_id, status);
CREATE INDEX IF NOT EXISTS idx_campaigns_type ON campaigns(type);
CREATE INDEX IF NOT EXISTS idx_campaigns_dates ON campaigns(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_campaigns_performance ON campaigns(team_id, status, start_date);

-- Email campaigns indexes
CREATE INDEX IF NOT EXISTS idx_email_campaigns_team_status ON email_campaigns(team_id, status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_send_at ON email_campaigns(send_at);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_performance ON email_campaigns(team_id, open_rate, click_rate);

-- Social posts indexes
CREATE INDEX IF NOT EXISTS idx_social_posts_team_status ON social_posts(team_id, status);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled ON social_posts(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_social_posts_published ON social_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_social_posts_performance ON social_posts(team_id, engagement_rate);

-- WhatsApp indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_contact ON whatsapp_messages(contact_id, created_at);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_team ON whatsapp_messages(team_id, created_at);
CREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_team ON whatsapp_contacts(team_id, status);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_team_date ON analytics_summary(team_id, date);
CREATE INDEX IF NOT EXISTS idx_campaign_metrics_campaign_date ON campaign_metrics(campaign_id, date);

-- Activity log indexes
CREATE INDEX IF NOT EXISTS idx_activity_log_team_date ON activity_log(team_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_date ON activity_log(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_log_resource ON activity_log(resource_type, resource_id);

-- Content indexes
CREATE INDEX IF NOT EXISTS idx_content_calendar_team_date ON content_calendar(team_id, publish_date);
CREATE INDEX IF NOT EXISTS idx_content_calendar_assigned ON content_calendar(assigned_to, status);
CREATE INDEX IF NOT EXISTS idx_content_library_team_type ON content_library(team_id, type);