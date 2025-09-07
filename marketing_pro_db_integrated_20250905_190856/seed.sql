-- Marketing Pro Seed Data
-- Test data for development and demo

-- Insert demo team
INSERT OR IGNORE INTO teams (name, slug, plan, settings) VALUES 
  ('Marketing Agency Pro', 'marketing-agency-pro', 'pro', '{"theme": "dark", "timezone": "UTC", "currency": "USD"}'),
  ('StartupCo Marketing', 'startupco-marketing', 'starter', '{"theme": "light", "timezone": "America/New_York", "currency": "USD"}');

-- Insert demo users
INSERT OR IGNORE INTO users (email, name, password_hash, role, team_id, settings) VALUES 
  ('admin@marketingpro.com', 'Ahmed Hassan', '$2b$10$dummyhash1', 'admin', 1, '{"notifications": true, "language": "ar"}'),
  ('marketer@marketingpro.com', 'Sara Ahmed', '$2b$10$dummyhash2', 'marketer', 1, '{"notifications": true, "language": "ar"}'),
  ('analyst@marketingpro.com', 'Mohamed Ali', '$2b$10$dummyhash3', 'analyst', 1, '{"notifications": false, "language": "en"}'),
  ('client@startupco.com', 'Fatima Omar', '$2b$10$dummyhash4', 'client', 2, '{"notifications": true, "language": "ar"}');

-- Insert demo campaigns
INSERT OR IGNORE INTO campaigns (team_id, name, description, status, type, budget, spent, start_date, end_date, target_audience, goals, created_by) VALUES 
  (1, 'حملة إطلاق المنتج الجديد', 'حملة شاملة لإطلاق منتج SaaS جديد تستهدف الشركات الناشئة', 'active', 'mixed', 50000.00, 12500.00, '2024-01-01', '2024-03-31', '{"age_range": "25-45", "interests": ["technology", "business"], "company_size": "1-50"}', '{"leads": 1000, "conversions": 100, "roas": 4.0}', 1),
  (1, 'حملة البريد الإلكتروني للعملاء المحتملين', 'سلسلة رسائل إلكترونية لتحويل العملاء المحتملين', 'active', 'email', 15000.00, 8200.00, '2024-01-15', '2024-04-15', '{"segment": "warm_leads", "industry": "tech"}', '{"open_rate": 25, "click_rate": 5, "conversions": 50}', 2),
  (2, 'Social Media Brand Awareness', 'Increase brand visibility across social platforms', 'active', 'social', 20000.00, 5600.00, '2024-02-01', '2024-05-01', '{"demographics": "millennials", "interests": ["startups", "innovation"]}', '{"reach": 100000, "engagement_rate": 3.5}', 4);

-- Insert demo audiences
INSERT OR IGNORE INTO audiences (team_id, name, description, criteria, estimated_size, created_by) VALUES 
  (1, 'العملاء المحتملين المهتمون', 'عملاء زاروا الموقع أكثر من 3 مرات', '{"page_views": {"min": 3}, "last_visit": {"days": 30}}', 2500, 1),
  (1, 'المشتركون النشطون', 'مشتركون فتحوا آخر 3 رسائل إلكترونية', '{"email_opens": {"last_emails": 3, "min_opens": 3}}', 1800, 2),
  (2, 'Startup Founders', 'C-level executives at startups', '{"job_title": ["CEO", "CTO", "Founder"], "company_size": "1-50"}', 850, 4);

-- Insert demo contacts
INSERT OR IGNORE INTO contacts (team_id, email, first_name, last_name, phone, company, position, tags, custom_fields, source) VALUES 
  (1, 'contact1@example.com', 'أحمد', 'محمود', '+201234567890', 'تك إنوفيشن', 'مدير التسويق', '["hot_lead", "enterprise"]', '{"budget": "50000", "timeline": "Q2"}', 'website'),
  (1, 'contact2@example.com', 'فاطمة', 'السيد', '+201987654321', 'ستارت أب برو', 'مؤسس', '["warm_lead", "startup"]', '{"employees": "15", "industry": "fintech"}', 'referral'),
  (1, 'contact3@example.com', 'محمد', 'عبدالله', '+201555123456', 'ديجيتال سوليوشنز', 'نائب الرئيس', '["qualified_lead"]', '{"interest": "marketing_automation"}', 'content_download'),
  (2, 'startup1@example.com', 'Sarah', 'Johnson', '+1234567890', 'TechStart Inc', 'CEO', '["decision_maker", "tech"]', '{"funding_stage": "Series A"}', 'linkedin');

-- Insert demo email sequences
INSERT OR IGNORE INTO email_sequences (team_id, campaign_id, name, description, trigger_type, trigger_conditions, status, created_by) VALUES 
  (1, 1, 'سلسلة الترحيب للعملاء الجدد', 'رسائل ترحيبية وتعريفية للمشتركين الجدد', 'signup', '{"form_id": "newsletter_signup"}', 'active', 1),
  (1, 2, 'سلسلة المتابعة للعملاء المحتملين', 'متابعة العملاء الذين حملوا المحتوى', 'manual', '{}', 'active', 2),
  (2, 3, 'Product Demo Follow-up', 'Follow up after product demo requests', 'manual', '{}', 'active', 4);

-- Insert demo email steps
INSERT OR IGNORE INTO email_steps (sequence_id, step_order, name, subject_line, content, send_delay_hours) VALUES 
  (1, 1, 'رسالة الترحيب', 'مرحباً بك في Marketing Pro! 🎉', '<h2>أهلاً وسهلاً!</h2><p>نرحب بك في منصة Marketing Pro. نحن متحمسون لمساعدتك في تحقيق أهدافك التسويقية.</p>', 0),
  (1, 2, 'التعريف بالمنصة', 'اكتشف قوة Marketing Pro 🚀', '<h2>اكتشف إمكانيات لا محدودة</h2><p>تعرف على كيفية استخدام أدواتنا المتقدمة لتحسين حملاتك التسويقية.</p>', 24),
  (1, 3, 'نصائح للبداية', 'نصائح قيمة لبداية ناجحة 💡', '<h2>نصائح من خبرائنا</h2><p>إليك أهم النصائح للحصول على أفضل النتائج من Marketing Pro.</p>', 72),
  (2, 1, 'متابعة التحميل', 'هل استفدت من المحتوى؟ 📖', '<h2>نأمل أن تكون قد استفدت</h2><p>نود معرفة رأيك في المحتوى الذي حملته. هل تحتاج لمساعدة إضافية؟</p>', 48),
  (3, 1, 'Demo Follow-up', 'Thank you for your interest in our product', '<h2>Great to meet you!</h2><p>Thank you for taking the time to see our product demo. Do you have any questions?</p>', 2);

-- Insert demo social posts
INSERT OR IGNORE INTO social_posts (team_id, campaign_id, platform, content, hashtags, scheduled_at, status, created_by) VALUES 
  (1, 1, 'linkedin', 'إطلاق منتج جديد يحدث ثورة في عالم التسويق الرقمي! تعرف على Marketing Pro وكيف يمكن أن يغير مستقبل حملاتك التسويقية.', '["MarketingPro", "DigitalMarketing", "SaaS", "Innovation"]', '2024-01-15 10:00:00', 'scheduled', 1),
  (1, 3, 'facebook', 'نصائح قيمة: كيفية زيادة معدل التحويل في حملاتك الإعلانية بنسبة تصل إلى 300%', '["MarketingTips", "ConversionRate", "DigitalAds"]', '2024-01-16 14:00:00', 'scheduled', 2),
  (2, 3, 'twitter', 'Building a startup? Here are the top 5 marketing automation tools that will save you time and boost your growth 🚀', '["StartupLife", "MarketingAutomation", "Growth"]', '2024-01-17 09:00:00', 'scheduled', 4);

-- Insert demo content items
INSERT OR IGNORE INTO content_items (team_id, campaign_id, title, type, status, assigned_to, due_date, tags, created_by) VALUES 
  (1, 1, 'مقال: دليل شامل للتسويق الآلي', 'blog_post', 'in_progress', 2, '2024-01-20', '["seo", "content_marketing", "automation"]', 1),
  (1, 1, 'إنفوجرافيك: إحصائيات التسويق الرقمي 2024', 'infographic', 'review', 2, '2024-01-18', '["visual_content", "statistics"]', 2),
  (1, 2, 'فيديو: شرح منتج Marketing Pro', 'video', 'approved', 1, '2024-01-25', '["product_demo", "video_marketing"]', 1),
  (2, 3, 'LinkedIn Article: Startup Marketing Strategies', 'blog_post', 'idea', 4, '2024-01-30', '["thought_leadership", "b2b"]', 4);

-- Insert demo AI insights
INSERT OR IGNORE INTO ai_insights (team_id, type, title, description, data, confidence_score, status, applies_to_type, applies_to_id) VALUES 
  (1, 'best_send_time', 'أفضل وقت لإرسال الرسائل الإلكترونية', 'بناءً على سلوك جمهورك، أفضل وقت للإرسال هو الثلاثاء 10:00 صباحاً', '{"day": "tuesday", "hour": 10, "timezone": "UTC", "open_rate_improvement": "23%"}', 0.87, 'pending', 'email_sequence', 1),
  (1, 'budget_recommendation', 'توصية تحسين الميزانية', 'يمكن زيادة عائد الاستثمار بنسبة 34% عبر إعادة توزيع الميزانية', '{"current_allocation": {"email": 40, "social": 60}, "recommended_allocation": {"email": 55, "social": 45}, "expected_roi_improvement": "34%"}', 0.91, 'pending', 'campaign', 1),
  (2, 'audience_suggestion', 'اقتراح جمهور جديد', 'تم اكتشاف شريحة جديدة من العملاء المحتملين بمعدل تحويل عالي', '{"segment_criteria": {"job_titles": ["Marketing Manager", "Growth Manager"], "company_size": "51-200"}, "estimated_size": 1250, "predicted_conversion_rate": "12%"}', 0.76, 'pending', 'audience', 2);

-- Insert demo connected accounts
INSERT OR IGNORE INTO connected_accounts (team_id, provider, account_name, credentials, permissions, status, connected_by) VALUES 
  (1, 'sendgrid', 'Marketing Pro SendGrid', 'encrypted_credentials_1', '["send_emails", "view_stats"]', 'active', 1),
  (1, 'facebook', 'Marketing Agency Facebook', 'encrypted_credentials_2', '["manage_ads", "read_insights"]', 'active', 2),
  (2, 'google', 'StartupCo Google Ads', 'encrypted_credentials_3', '["manage_campaigns", "view_reports"]', 'active', 4);