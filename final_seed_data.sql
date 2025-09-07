-- Final Correct Seed Data for Marketing Pro Platform

-- Insert Teams first with required columns
INSERT INTO teams (name, slug) VALUES
('الفريق الرئيسي', 'main-team'),
('فريق المحتوى', 'content-team'),
('فريق التحليل', 'analytics-team');

-- Insert Users with correct column names
INSERT INTO users (email, name, password_hash, role, team_id) VALUES
('ahmed@example.com', 'أحمد محمد', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'admin', 1),
('fatima@example.com', 'فاطمة علي', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'marketer', 1),
('mohammed@example.com', 'محمد خالد', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'analyst', 2);

-- Insert clients with correct column names
INSERT INTO clients (team_id, name, email, phone, company, industry, status, lead_score, lead_source, assigned_to, total_value, lifetime_value, notes, tags, last_contact_date) VALUES
(1, 'سارة أحمد', 'sara@company1.com', '+966501234567', 'شركة التكنولوجيا المتقدمة', 'تكنولوجيا', 'active', 85, 'website', 1, 15000.00, 15000.00, 'عميل مميز مع إمكانيات كبيرة', '["vip","technology"]', datetime('now', '-2 days')),
(1, 'خالد محمد', 'khalid@company2.com', '+966502345678', 'مؤسسة الابتكار', 'تطوير', 'active', 75, 'referral', 2, 25000.00, 25000.00, 'مهتم بالحلول الشاملة', '["lead","innovation"]', datetime('now', '-1 day')),
(2, 'نور علي', 'noor@company3.com', '+966503456789', 'دار الإبداع', 'إبداع', 'lead', 65, 'social_media', 1, 8000.00, 8000.00, 'مطورة ويب موهوبة', '["developer","creative"]', datetime('now'));

-- Insert campaigns
INSERT INTO campaigns (name, type, status, start_date, end_date, budget, spent_amount, target_audience, goals) VALUES
('حملة التوعية بالعلامة التجارية', 'awareness', 'active', datetime('now', '-7 days'), datetime('now', '+23 days'), 5000.00, 1200.50, 'الشباب 18-35', 'زيادة الوعي بالعلامة التجارية بنسبة 40%'),
('حملة الإطلاق الجديد', 'product_launch', 'scheduled', datetime('now', '+3 days'), datetime('now', '+33 days'), 8000.00, 0.00, 'رجال الأعمال 25-50', 'الوصول إلى 10000 عميل محتمل'),
('حملة نهاية العام', 'seasonal', 'draft', datetime('now', '+60 days'), datetime('now', '+90 days'), 12000.00, 0.00, 'العائلات والشباب', 'زيادة المبيعات بنسبة 60%');

-- Insert email templates with correct column names
INSERT INTO email_templates (name, subject, content, preview_text, category, status, variables) VALUES
('نشرة ترحيبية', 'مرحباً بك في منصة التسويق الاحترافية', '<h1>مرحباً بك!</h1><p>نحن سعداء بانضمامك إلينا.</p>', 'رسالة ترحيب للعملاء الجدد', 'welcome', 'active', '{"name": "اسم العميل"}'),
('تحديث المنتج', 'آخر التحديثات على منتجاتنا', '<h2>تحديثات جديدة</h2><p>اكتشف الميزات الجديدة.</p>', 'إعلان عن التحديثات', 'product', 'active', '{"product": "اسم المنتج"}'),
('عرض خاص', 'عرض حصري لعملائنا الكرام', '<h2>عرض خاص</h2><p>خصم 30% على جميع الخدمات.</p>', 'عرض ترويجي محدود', 'promotional', 'active', '{"discount": "30%"}');

-- Insert WhatsApp templates
INSERT INTO whatsapp_templates (name, content, category, is_approved, language) VALUES
('رسالة ترحيب', 'أهلاً وسهلاً بك! نحن سعداء بتواصلك معنا. كيف يمكننا مساعدتك اليوم؟', 'welcome', true, 'ar'),
('تأكيد الموعد', 'تم تأكيد موعدك بتاريخ {{date}} في تمام الساعة {{time}}. نتطلع لرؤيتك!', 'appointment', true, 'ar'),
('عرض خاص', 'عرض محدود! خصم 25% على جميع خدماتنا. استخدم الكود: SPECIAL25', 'promotional', true, 'ar');

-- Insert social posts
INSERT INTO social_posts (platform, content, media_urls, scheduled_date, status, engagement) VALUES
('facebook', 'إعلان عن خدماتنا الجديدة في التسويق الرقمي! 🚀', '[]', datetime('now', '+2 hours'), 'scheduled', 0),
('twitter', 'نصائح للتسويق الفعال عبر وسائل التواصل الاجتماعي #تسويق #نصائح', '[]', datetime('now', '-1 day'), 'published', 25),
('instagram', 'صور من فعاليتنا الأخيرة 📸✨', '["image1.jpg", "image2.jpg"]', datetime('now', '-2 days'), 'published', 45);

-- Insert some basic activity log entries
INSERT INTO activity_log (user_id, action, description, metadata) VALUES
(1, 'user_login', 'تسجيل دخول المستخدم', '{"ip": "192.168.1.1", "device": "desktop"}'),
(2, 'campaign_created', 'إنشاء حملة جديدة', '{"campaign_name": "حملة التوعية"}'),
(1, 'client_added', 'إضافة عميل جديد', '{"client_name": "سارة أحمد"}');

-- Insert notifications
INSERT INTO notifications (user_id, type, title, message, status, action_url) VALUES
(1, 'campaign', 'حملة جديدة', 'تم إنشاء حملة جديدة بنجاح', 'unread', '/campaigns/1'),
(2, 'client', 'عميل جديد', 'تم إضافة عميل جديد للنظام', 'unread', '/clients/1'),
(1, 'system', 'تحديث النظام', 'تم تحديث النظام بميزات جديدة', 'read', '/updates');

-- Insert some campaign metrics
INSERT INTO campaign_metrics (campaign_id, metric_name, metric_value, recorded_date) VALUES
(1, 'impressions', 15000, datetime('now')),
(1, 'clicks', 1200, datetime('now')),
(1, 'conversions', 85, datetime('now')),
(2, 'impressions', 0, datetime('now'));

-- Insert client interactions
INSERT INTO client_interactions (client_id, user_id, type, subject, notes, outcome, follow_up_date) VALUES
(1, 1, 'email', 'استفسار عن الخدمات', 'العميل مهتم بحلول التسويق الرقمي', 'positive', datetime('now', '+7 days')),
(2, 2, 'call', 'مكالمة متابعة', 'مناقشة تفاصيل المشروع الجديد', 'positive', datetime('now', '+3 days')),
(3, 1, 'meeting', 'اجتماع تعريفي', 'عرض خدماتنا وإمكانياتنا', 'neutral', datetime('now', '+5 days'));