-- Marketing Pro Database Schema
-- Initial migration with all core tables

-- Teams table for multi-tenancy
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK(plan IN ('free', 'starter', 'pro', 'enterprise')),
  settings TEXT DEFAULT '{}', -- JSON for team settings
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Users table with role-based access
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'marketer' CHECK(role IN ('admin', 'marketer', 'analyst', 'client')),
  team_id INTEGER NOT NULL,
  avatar_url TEXT,
  settings TEXT DEFAULT '{}', -- JSON for user preferences
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Campaigns table for multi-channel campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'paused', 'completed', 'archived')),
  type TEXT NOT NULL CHECK(type IN ('email', 'social', 'ads', 'mixed')),
  budget DECIMAL(10,2) DEFAULT 0,
  spent DECIMAL(10,2) DEFAULT 0,
  start_date DATE,
  end_date DATE,
  target_audience TEXT, -- JSON for audience targeting
  goals TEXT, -- JSON for campaign goals and KPIs
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Audiences table for dynamic segmentation
CREATE TABLE IF NOT EXISTS audiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  criteria TEXT NOT NULL, -- JSON for dynamic segmentation rules
  estimated_size INTEGER DEFAULT 0,
  last_calculated_at DATETIME,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Contacts table for customer data
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  company TEXT,
  position TEXT,
  tags TEXT, -- JSON array of tags
  custom_fields TEXT DEFAULT '{}', -- JSON for custom contact fields
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'unsubscribed', 'bounced', 'complained')),
  source TEXT, -- How they were acquired
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  UNIQUE(team_id, email)
);

-- Email sequences for automation
CREATE TABLE IF NOT EXISTS email_sequences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  campaign_id INTEGER,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL CHECK(trigger_type IN ('manual', 'signup', 'purchase', 'date', 'behavior')),
  trigger_conditions TEXT, -- JSON for trigger conditions
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'paused', 'archived')),
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Individual email steps in sequences
CREATE TABLE IF NOT EXISTS email_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sequence_id INTEGER NOT NULL,
  step_order INTEGER NOT NULL,
  name TEXT NOT NULL,
  subject_line TEXT NOT NULL,
  content TEXT NOT NULL, -- HTML email content
  send_delay_hours INTEGER DEFAULT 0, -- Hours after previous step or trigger
  conditions TEXT, -- JSON for conditional logic
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sequence_id) REFERENCES email_sequences(id) ON DELETE CASCADE
);

-- A/B tests for optimization
CREATE TABLE IF NOT EXISTS ab_tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('email_subject', 'email_content', 'landing_page', 'ad_creative')),
  target_type TEXT NOT NULL, -- 'email_step', 'landing_page', etc.
  target_id INTEGER NOT NULL, -- ID of the tested item
  variant_a TEXT NOT NULL, -- JSON for variant A data
  variant_b TEXT NOT NULL, -- JSON for variant B data
  traffic_split INTEGER DEFAULT 50, -- Percentage for variant A (rest goes to B)
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'running', 'completed', 'paused')),
  winner TEXT CHECK(winner IN ('a', 'b', 'inconclusive')),
  confidence_level DECIMAL(5,2),
  started_at DATETIME,
  ended_at DATETIME,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Social media posts scheduling
CREATE TABLE IF NOT EXISTS social_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  campaign_id INTEGER,
  platform TEXT NOT NULL CHECK(platform IN ('facebook', 'instagram', 'linkedin', 'twitter', 'tiktok')),
  content TEXT NOT NULL,
  media_urls TEXT, -- JSON array of media URLs
  hashtags TEXT, -- JSON array of hashtags
  scheduled_at DATETIME,
  published_at DATETIME,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'published', 'failed')),
  external_id TEXT, -- Platform-specific post ID
  metrics TEXT DEFAULT '{}', -- JSON for engagement metrics
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Content calendar items
CREATE TABLE IF NOT EXISTS content_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  campaign_id INTEGER,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('blog_post', 'social_post', 'email', 'video', 'infographic', 'ad_creative')),
  content TEXT,
  status TEXT DEFAULT 'idea' CHECK(status IN ('idea', 'in_progress', 'review', 'approved', 'published', 'archived')),
  assigned_to INTEGER,
  due_date DATE,
  published_date DATE,
  tags TEXT, -- JSON array of content tags
  notes TEXT,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Marketing automation workflows
CREATE TABLE IF NOT EXISTS workflow_automations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type TEXT NOT NULL CHECK(trigger_type IN ('form_submission', 'email_click', 'page_visit', 'purchase', 'date', 'api_webhook')),
  trigger_config TEXT NOT NULL, -- JSON for trigger configuration
  actions TEXT NOT NULL, -- JSON array of workflow actions
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'paused', 'archived')),
  last_run_at DATETIME,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Landing pages for conversion optimization
CREATE TABLE IF NOT EXISTS landing_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  campaign_id INTEGER,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  template_id INTEGER,
  content TEXT NOT NULL, -- HTML content
  css_styles TEXT, -- Custom CSS
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  seo_title TEXT,
  seo_description TEXT,
  conversion_goal TEXT, -- What counts as a conversion
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id),
  UNIQUE(team_id, slug)
);

-- Funnel events tracking
CREATE TABLE IF NOT EXISTS funnel_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  contact_id INTEGER,
  session_id TEXT,
  event_type TEXT NOT NULL CHECK(event_type IN ('page_view', 'form_submit', 'email_open', 'email_click', 'purchase', 'custom')),
  event_name TEXT,
  page_url TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  properties TEXT DEFAULT '{}', -- JSON for custom event properties
  revenue DECIMAL(10,2) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL
);

-- Analytics reports configuration
CREATE TABLE IF NOT EXISTS analytics_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('campaign_performance', 'email_metrics', 'funnel_analysis', 'roi_analysis', 'audience_insights')),
  filters TEXT DEFAULT '{}', -- JSON for report filters
  date_range TEXT NOT NULL, -- JSON for date range config
  metrics TEXT NOT NULL, -- JSON array of metrics to include
  visualization_config TEXT DEFAULT '{}', -- JSON for chart configurations
  schedule TEXT, -- JSON for automated report schedule
  recipients TEXT, -- JSON array of email recipients
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Dashboard configurations
CREATE TABLE IF NOT EXISTS dashboards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  layout TEXT NOT NULL, -- JSON for dashboard widget layout
  widgets TEXT NOT NULL, -- JSON array of widgets configuration
  is_default BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- AI insights and recommendations
CREATE TABLE IF NOT EXISTS ai_insights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('best_send_time', 'subject_optimization', 'budget_recommendation', 'audience_suggestion', 'content_idea')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  data TEXT, -- JSON with insight data
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'applied', 'dismissed', 'expired')),
  applies_to_type TEXT, -- 'campaign', 'email_sequence', etc.
  applies_to_id INTEGER,
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  applied_at DATETIME,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Connected accounts for third-party integrations
CREATE TABLE IF NOT EXISTS connected_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  provider TEXT NOT NULL CHECK(provider IN ('sendgrid', 'mailchimp', 'facebook', 'google', 'linkedin', 'twitter', 'stripe', 'shopify')),
  account_name TEXT NOT NULL,
  credentials TEXT NOT NULL, -- Encrypted JSON for OAuth tokens/API keys
  permissions TEXT DEFAULT '[]', -- JSON array of granted permissions
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'expired', 'error', 'revoked')),
  last_sync_at DATETIME,
  connected_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (connected_by) REFERENCES users(id),
  UNIQUE(team_id, provider, account_name)
);

-- Report generation jobs
CREATE TABLE IF NOT EXISTS report_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  report_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'running', 'completed', 'failed')),
  format TEXT NOT NULL CHECK(format IN ('pdf', 'csv', 'json')),
  file_url TEXT, -- URL to generated file
  parameters TEXT DEFAULT '{}', -- JSON for report parameters
  error_message TEXT,
  requested_by INTEGER NOT NULL,
  started_at DATETIME,
  completed_at DATETIME,
  expires_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (report_id) REFERENCES analytics_reports(id) ON DELETE CASCADE,
  FOREIGN KEY (requested_by) REFERENCES users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_team_id ON users(team_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_campaigns_team_id ON campaigns(team_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_contacts_team_id ON contacts(team_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_email_sequences_team_id ON email_sequences(team_id);
CREATE INDEX IF NOT EXISTS idx_email_sequences_campaign_id ON email_sequences(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_steps_sequence_id ON email_steps(sequence_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_team_id ON social_posts(team_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_scheduled_at ON social_posts(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_content_items_team_id ON content_items(team_id);
CREATE INDEX IF NOT EXISTS idx_content_items_due_date ON content_items(due_date);
CREATE INDEX IF NOT EXISTS idx_funnel_events_team_id ON funnel_events(team_id);
CREATE INDEX IF NOT EXISTS idx_funnel_events_contact_id ON funnel_events(contact_id);
CREATE INDEX IF NOT EXISTS idx_funnel_events_created_at ON funnel_events(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_insights_team_id ON ai_insights(team_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_status ON ai_insights(status);
CREATE INDEX IF NOT EXISTS idx_connected_accounts_team_id ON connected_accounts(team_id);
CREATE INDEX IF NOT EXISTS idx_report_jobs_team_id ON report_jobs(team_id);
CREATE INDEX IF NOT EXISTS idx_report_jobs_status ON report_jobs(status);