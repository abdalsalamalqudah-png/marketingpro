-- Safe migration script for advanced features
-- Only adds missing tables and columns

-- Create client_deals table for advanced CRM
CREATE TABLE IF NOT EXISTS client_deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    value DECIMAL(10,2) DEFAULT 0,
    stage TEXT DEFAULT 'prospecting' CHECK (stage IN ('prospecting', 'qualification', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
    probability INTEGER DEFAULT 0 CHECK (probability >= 0 AND probability <= 100),
    expected_close_date DATE,
    assigned_to INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

-- Create email_sequences table for advanced email automation
CREATE TABLE IF NOT EXISTS email_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    trigger_event TEXT NOT NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
    total_steps INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create email_sequence_steps table
CREATE TABLE IF NOT EXISTS email_sequence_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sequence_id INTEGER NOT NULL,
    step_order INTEGER NOT NULL,
    template_id INTEGER NOT NULL,
    delay_hours INTEGER DEFAULT 0,
    conditions TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sequence_id) REFERENCES email_sequences(id) ON DELETE CASCADE,
    FOREIGN KEY (template_id) REFERENCES email_templates(id) ON DELETE CASCADE
);

-- Create whatsapp_business table for Business API features
CREATE TABLE IF NOT EXISTS whatsapp_business (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    business_name TEXT NOT NULL,
    phone_number_id TEXT NOT NULL,
    access_token TEXT NOT NULL,
    webhook_url TEXT,
    verify_token TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    features TEXT DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create ai_insights table for AI-powered analytics
CREATE TABLE IF NOT EXISTS ai_insights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    insight_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    confidence_score DECIMAL(3,2) DEFAULT 0.0 CHECK (confidence_score >= 0 AND confidence_score <= 1),
    data TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'viewed', 'applied', 'dismissed')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create google_ads_accounts table for Google Ads integration
CREATE TABLE IF NOT EXISTS google_ads_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    account_id TEXT NOT NULL UNIQUE,
    account_name TEXT NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    currency TEXT DEFAULT 'USD',
    timezone TEXT DEFAULT 'UTC',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
    last_sync DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create adsense_accounts table for AdSense integration
CREATE TABLE IF NOT EXISTS adsense_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    account_id TEXT NOT NULL UNIQUE,
    account_name TEXT NOT NULL,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    currency TEXT DEFAULT 'USD',
    timezone TEXT DEFAULT 'UTC',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
    last_sync DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create wordpress_sites table for WordPress integration
CREATE TABLE IF NOT EXISTS wordpress_sites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    site_url TEXT NOT NULL,
    site_name TEXT NOT NULL,
    username TEXT NOT NULL,
    app_password TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    last_sync DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Create notifications table for in-app notifications
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_deals_client_id ON client_deals(client_id);
CREATE INDEX IF NOT EXISTS idx_client_deals_team_id ON client_deals(team_id);
CREATE INDEX IF NOT EXISTS idx_client_deals_stage ON client_deals(stage);
CREATE INDEX IF NOT EXISTS idx_email_sequences_team_id ON email_sequences(team_id);
CREATE INDEX IF NOT EXISTS idx_email_sequence_steps_sequence_id ON email_sequence_steps(sequence_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_business_team_id ON whatsapp_business(team_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_team_id ON ai_insights(team_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON ai_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_team_id ON notifications(team_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Add some sample advanced data
INSERT OR IGNORE INTO client_deals (client_id, team_id, title, description, value, stage, probability, expected_close_date, assigned_to)
SELECT 
    c.id,
    c.team_id,
    'صفقة ' || c.company,
    'صفقة محتملة مع ' || c.company || ' لتطوير استراتيجية التسويق الرقمي',
    50000.00,
    'qualification',
    60,
    DATE('now', '+30 days'),
    1
FROM clients c
LIMIT 3;

INSERT OR IGNORE INTO email_sequences (team_id, name, description, trigger_event, status, total_steps) VALUES
(1, 'ترحيب بالعملاء الجدد', 'سلسلة رسائل ترحيبية للعملاء الجدد', 'signup', 'active', 3),
(1, 'استعادة العربة المهجورة', 'سلسلة لاستعادة العملاء الذين تركوا عربة التسوق', 'abandon_cart', 'active', 2),
(1, 'متابعة ما بعد الشراء', 'رسائل متابعة وطلب تقييم المنتج', 'purchase', 'active', 4);

INSERT OR IGNORE INTO ai_insights (team_id, insight_type, title, description, confidence_score, data, status) VALUES
(1, 'campaign_recommendation', 'تحسين الحملة الإعلانية', 'ننصح بزيادة الميزانية للحملة "عروض الصيف" بنسبة 20% لتحسين النتائج', 0.85, '{"campaign_id": 1, "recommended_budget": 12000, "expected_roi": 2.5}', 'new'),
(1, 'content_suggestion', 'اقتراح محتوى جديد', 'المحتوى المرئي يحقق تفاعل أعلى بـ 40% من المحتوى النصي', 0.92, '{"content_type": "video", "engagement_increase": 0.4}', 'new'),
(1, 'performance_alert', 'تنبيه أداء', 'انخفاض في معدل فتح الرسائل الإلكترونية بنسبة 15%', 0.78, '{"metric": "email_open_rate", "change": -0.15, "period": "last_7_days"}', 'new');

INSERT OR IGNORE INTO notifications (user_id, team_id, title, message, type, is_read) VALUES
(1, 1, 'حملة جديدة تم إنشاؤها', 'تم إنشاء حملة "عروض الشتاء" بنجاح', 'success', FALSE),
(1, 1, 'تحديث في العميل', 'تم تحديث بيانات العميل "شركة الابتكار"', 'info', FALSE),
(1, 1, 'تنبيه ميزانية', 'اقتربت حملة "عروض الصيف" من نفاد الميزانية', 'warning', FALSE);