-- Marketing Pro - Complete Database Schema and Seed Data
-- Copy and paste this entire file into Cloudflare D1 Console

-- =====================================
-- SCHEMA: Create all tables
-- =====================================

-- Teams table for multi-tenancy
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT DEFAULT 'free' CHECK(plan IN ('free', 'starter', 'pro', 'enterprise')),
  settings TEXT DEFAULT '{}',
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
  settings TEXT DEFAULT '{}',
  last_login_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Campaigns table
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
  target_audience TEXT,
  goals TEXT,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'unsubscribed', 'bounced', 'complained')),
  source TEXT,
  tags TEXT DEFAULT '[]',
  custom_fields TEXT DEFAULT '{}',
  last_activity_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Email sequences table
CREATE TABLE IF NOT EXISTS email_sequences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'paused', 'completed')),
  trigger_event TEXT NOT NULL,
  trigger_conditions TEXT DEFAULT '{}',
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Email steps table
CREATE TABLE IF NOT EXISTS email_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sequence_id INTEGER NOT NULL,
  step_order INTEGER NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  send_delay_hours INTEGER DEFAULT 0,
  send_delay_days INTEGER DEFAULT 0,
  ab_test_config TEXT DEFAULT '{}',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sequence_id) REFERENCES email_sequences(id) ON DELETE CASCADE
);

-- Social posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  campaign_id INTEGER,
  platform TEXT NOT NULL CHECK(platform IN ('facebook', 'instagram', 'twitter', 'linkedin', 'tiktok')),
  content TEXT NOT NULL,
  media_urls TEXT DEFAULT '[]',
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'scheduled', 'published', 'failed')),
  scheduled_for DATETIME,
  published_at DATETIME,
  engagement_metrics TEXT DEFAULT '{}',
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Content items table
CREATE TABLE IF NOT EXISTS content_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('blog_post', 'video', 'image', 'infographic', 'ebook', 'webinar')),
  content TEXT,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'review', 'approved', 'published', 'archived')),
  assigned_to INTEGER,
  due_date DATE,
  tags TEXT DEFAULT '[]',
  seo_keywords TEXT DEFAULT '[]',
  performance_metrics TEXT DEFAULT '{}',
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Landing pages table
CREATE TABLE IF NOT EXISTS landing_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  campaign_id INTEGER,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  template TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  ab_test_config TEXT DEFAULT '{}',
  seo_settings TEXT DEFAULT '{}',
  conversion_goals TEXT DEFAULT '[]',
  published_at DATETIME,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- A/B tests table
CREATE TABLE IF NOT EXISTS ab_tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('email_subject', 'email_content', 'landing_page', 'social_ad')),
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'running', 'completed', 'paused')),
  variant_a_config TEXT NOT NULL,
  variant_b_config TEXT NOT NULL,
  traffic_split INTEGER DEFAULT 50,
  success_metric TEXT NOT NULL,
  min_sample_size INTEGER DEFAULT 100,
  confidence_level DECIMAL(3,2) DEFAULT 0.95,
  start_date DATETIME,
  end_date DATETIME,
  results TEXT DEFAULT '{}',
  winner TEXT CHECK(winner IN ('A', 'B', 'inconclusive')),
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Audiences table
CREATE TABLE IF NOT EXISTS audiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  criteria TEXT NOT NULL,
  size INTEGER DEFAULT 0,
  last_updated_at DATETIME,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Connected accounts table
CREATE TABLE IF NOT EXISTS connected_accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  platform TEXT NOT NULL,
  account_name TEXT NOT NULL,
  credentials TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'expired', 'error')),
  last_sync_at DATETIME,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Workflow automations table
CREATE TABLE IF NOT EXISTS workflow_automations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  trigger_config TEXT NOT NULL,
  actions_config TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'paused', 'archived')),
  last_run_at DATETIME,
  total_executions INTEGER DEFAULT 0,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Funnel events table
CREATE TABLE IF NOT EXISTS funnel_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  contact_id INTEGER,
  campaign_id INTEGER,
  event_type TEXT NOT NULL,
  event_data TEXT DEFAULT '{}',
  value DECIMAL(10,2),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);

-- AI insights table
CREATE TABLE IF NOT EXISTS ai_insights (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('campaign_optimization', 'audience_insights', 'content_recommendations', 'budget_allocation')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  confidence_score DECIMAL(3,2) NOT NULL,
  data TEXT DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'applied', 'dismissed')),
  applied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Analytics reports table
CREATE TABLE IF NOT EXISTS analytics_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('campaign_performance', 'roi_analysis', 'audience_engagement', 'custom')),
  config TEXT NOT NULL,
  schedule TEXT,
  last_generated_at DATETIME,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Report jobs table
CREATE TABLE IF NOT EXISTS report_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  report_id INTEGER NOT NULL,
  status TEXT DEFAULT 'queued' CHECK(status IN ('queued', 'processing', 'completed', 'failed')),
  file_url TEXT,
  file_type TEXT CHECK(file_type IN ('pdf', 'csv', 'xlsx')),
  requested_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (report_id) REFERENCES analytics_reports(id) ON DELETE CASCADE,
  FOREIGN KEY (requested_by) REFERENCES users(id)
);

-- Dashboards table
CREATE TABLE IF NOT EXISTS dashboards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  layout TEXT NOT NULL,
  widgets TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_by INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- =====================================
-- INDEXES: Create performance indexes
-- =====================================

-- Teams indexes
CREATE INDEX IF NOT EXISTS idx_teams_slug ON teams(slug);

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_team_id ON users(team_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Campaigns indexes
CREATE INDEX IF NOT EXISTS idx_campaigns_team_id ON campaigns(team_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_type ON campaigns(type);
CREATE INDEX IF NOT EXISTS idx_campaigns_created_by ON campaigns(created_by);

-- Contacts indexes
CREATE INDEX IF NOT EXISTS idx_contacts_team_id ON contacts(team_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);

-- Email sequences indexes
CREATE INDEX IF NOT EXISTS idx_email_sequences_team_id ON email_sequences(team_id);
CREATE INDEX IF NOT EXISTS idx_email_sequences_status ON email_sequences(status);

-- Email steps indexes
CREATE INDEX IF NOT EXISTS idx_email_steps_sequence_id ON email_steps(sequence_id);
CREATE INDEX IF NOT EXISTS idx_email_steps_order ON email_steps(sequence_id, step_order);

-- Social posts indexes
CREATE INDEX IF NOT EXISTS idx_social_posts_team_id ON social_posts(team_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_campaign_id ON social_posts(campaign_id);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);
CREATE INDEX IF NOT EXISTS idx_social_posts_status ON social_posts(status);

-- Content items indexes
CREATE INDEX IF NOT EXISTS idx_content_items_team_id ON content_items(team_id);
CREATE INDEX IF NOT EXISTS idx_content_items_status ON content_items(status);
CREATE INDEX IF NOT EXISTS idx_content_items_type ON content_items(type);
CREATE INDEX IF NOT EXISTS idx_content_items_assigned_to ON content_items(assigned_to);

-- Landing pages indexes
CREATE INDEX IF NOT EXISTS idx_landing_pages_team_id ON landing_pages(team_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_campaign_id ON landing_pages(campaign_id);
CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages(team_id, slug);

-- A/B tests indexes
CREATE INDEX IF NOT EXISTS idx_ab_tests_team_id ON ab_tests(team_id);
CREATE INDEX IF NOT EXISTS idx_ab_tests_status ON ab_tests(status);
CREATE INDEX IF NOT EXISTS idx_ab_tests_type ON ab_tests(type);

-- Audiences indexes
CREATE INDEX IF NOT EXISTS idx_audiences_team_id ON audiences(team_id);

-- Connected accounts indexes
CREATE INDEX IF NOT EXISTS idx_connected_accounts_team_id ON connected_accounts(team_id);
CREATE INDEX IF NOT EXISTS idx_connected_accounts_platform ON connected_accounts(platform);

-- Workflow automations indexes
CREATE INDEX IF NOT EXISTS idx_workflow_automations_team_id ON workflow_automations(team_id);
CREATE INDEX IF NOT EXISTS idx_workflow_automations_status ON workflow_automations(status);

-- Funnel events indexes
CREATE INDEX IF NOT EXISTS idx_funnel_events_team_id ON funnel_events(team_id);
CREATE INDEX IF NOT EXISTS idx_funnel_events_contact_id ON funnel_events(contact_id);
CREATE INDEX IF NOT EXISTS idx_funnel_events_campaign_id ON funnel_events(campaign_id);
CREATE INDEX IF NOT EXISTS idx_funnel_events_timestamp ON funnel_events(timestamp);

-- AI insights indexes
CREATE INDEX IF NOT EXISTS idx_ai_insights_team_id ON ai_insights(team_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON ai_insights(type);
CREATE INDEX IF NOT EXISTS idx_ai_insights_status ON ai_insights(status);

-- Analytics reports indexes
CREATE INDEX IF NOT EXISTS idx_analytics_reports_team_id ON analytics_reports(team_id);
CREATE INDEX IF NOT EXISTS idx_analytics_reports_type ON analytics_reports(type);

-- Report jobs indexes
CREATE INDEX IF NOT EXISTS idx_report_jobs_team_id ON report_jobs(team_id);
CREATE INDEX IF NOT EXISTS idx_report_jobs_status ON report_jobs(status);

-- Dashboards indexes
CREATE INDEX IF NOT EXISTS idx_dashboards_team_id ON dashboards(team_id);

-- =====================================
-- SEED DATA: Insert initial test data
-- =====================================

-- Insert demo teams
INSERT OR IGNORE INTO teams (id, name, slug, plan, settings) VALUES 
  (1, 'فريق التسويق الرقمي', 'digital-marketing', 'pro', '{"timezone": "Asia/Riyadh", "currency": "SAR"}'),
  (2, 'وكالة النمو الإبداعي', 'creative-growth', 'enterprise', '{"timezone": "Asia/Dubai", "currency": "AED"}');

-- Insert demo users with Arabic names
INSERT OR IGNORE INTO users (id, email, name, password_hash, role, team_id, settings) VALUES 
  (1, 'admin@marketing.sa', 'أحمد المدير', 'YWRtaW4xMjNzYWx0', 'admin', 1, '{"language": "ar", "notifications": true}'),
  (2, 'marketer@marketing.sa', 'فاطمة المسوقة', 'bWFya2V0ZXIxMjNzYWx0', 'marketer', 1, '{"language": "ar", "notifications": true}'),
  (3, 'analyst@marketing.sa', 'محمد المحلل', 'YW5hbHlzdDEyM3NhbHQ=', 'analyst', 1, '{"language": "ar", "notifications": false}'),
  (4, 'client@growth.ae', 'سارة العميلة', 'Y2xpZW50MTIzc2FsdA==', 'client', 2, '{"language": "ar", "notifications": true}');

-- Insert demo campaigns
INSERT OR IGNORE INTO campaigns (id, team_id, name, description, status, type, budget, spent, start_date, end_date, goals, created_by) VALUES 
  (1, 1, 'حملة إطلاق المنتج الجديد', 'حملة تسويقية شاملة لإطلاق المنتج الجديد عبر جميع القنوات', 'active', 'mixed', 50000.00, 12500.75, '2024-09-01', '2024-12-31', '{"leads": 1000, "sales": 500000, "roi": 4.0}', 1),
  (2, 1, 'حملة التوعية بالعلامة التجارية', 'زيادة الوعي بالعلامة التجارية في السوق المستهدف', 'active', 'social', 25000.00, 8750.25, '2024-09-15', '2024-11-30', '{"impressions": 5000000, "engagement": 2.5, "reach": 1000000}', 2),
  (3, 2, 'حملة البريد الإلكتروني الموسمية', 'حملة بريد إلكتروني مؤتمتة للعروض الموسمية', 'draft', 'email', 15000.00, 0.00, '2024-10-01', '2024-10-31', '{"open_rate": 25, "click_rate": 5, "conversions": 200}', 1);

-- Insert demo contacts
INSERT OR IGNORE INTO contacts (id, team_id, email, first_name, last_name, status, source, tags) VALUES 
  (1, 1, 'customer1@example.com', 'عبدالله', 'الأحمد', 'active', 'website', '["vip", "loyal_customer"]'),
  (2, 1, 'lead1@example.com', 'منى', 'السالم', 'active', 'social_media', '["lead", "interested"]'),
  (3, 2, 'subscriber@example.com', 'خالد', 'المحمد', 'active', 'email_campaign', '["subscriber", "newsletter"]');

-- Insert demo AI insights
INSERT OR IGNORE INTO ai_insights (id, team_id, type, title, description, confidence_score, data, status) VALUES 
  (1, 1, 'campaign_optimization', 'تحسين توقيت الحملة', 'يُنصح بتغيير توقيت نشر المحتوى إلى الساعة 8 مساءً لزيادة التفاعل بنسبة 23%', 0.87, '{"recommended_time": "20:00", "expected_improvement": "23%"}', 'pending'),
  (2, 1, 'audience_insights', 'اكتشاف شريحة جديدة', 'تم اكتشاف شريحة عملاء جديدة من الفئة العمرية 25-34 مع اهتمام عالي بالمنتجات التقنية', 0.92, '{"age_group": "25-34", "interests": ["technology", "innovation"], "potential_value": "high"}', 'pending'),
  (3, 2, 'content_recommendations', 'اقتراح محتوى جديد', 'ينصح بإنشاء محتوى فيديو قصير حول استخدامات المنتج لزيادة المبيعات', 0.78, '{"content_type": "short_video", "topic": "product_usage", "expected_impact": "15% sales increase"}', 'pending');

-- Insert demo dashboards
INSERT OR IGNORE INTO dashboards (id, team_id, name, layout, widgets, is_default, created_by) VALUES 
  (1, 1, 'لوحة التحكم الرئيسية', 'grid', '[{"type": "kpi", "title": "إجمالي الحملات", "value": "campaigns_count"}, {"type": "chart", "title": "الأداء الشهري", "data_source": "monthly_performance"}]', TRUE, 1),
  (2, 2, 'تحليلات العملاء', 'flex', '[{"type": "table", "title": "أفضل العملاء", "data_source": "top_customers"}, {"type": "pie_chart", "title": "مصادر العملاء", "data_source": "customer_sources"}]', FALSE, 4);