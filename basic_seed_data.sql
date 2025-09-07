-- Basic Seed Data for Marketing Pro Platform
-- Insert Users
INSERT INTO users (id, name, email, password, role, status, created_at, updated_at) VALUES
('user_1', 'أحمد محمد', 'ahmed@example.com', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'admin', 'active', datetime('now'), datetime('now')),
('user_2', 'فاطمة علي', 'fatima@example.com', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'user', 'active', datetime('now'), datetime('now')),
('user_3', 'محمد خالد', 'mohammed@example.com', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'user', 'active', datetime('now'), datetime('now'));

-- Insert Contacts
INSERT INTO contacts (id, name, email, phone, company, position, lead_score, tags, status, source, created_at, updated_at) VALUES
('contact_1', 'سارة أحمد', 'sara@company1.com', '+966501234567', 'شركة التكنولوجيا المتقدمة', 'مديرة التسويق', 85, 'vip,technology', 'active', 'website', datetime('now'), datetime('now')),
('contact_2', 'خالد محمد', 'khalid@company2.com', '+966502345678', 'مؤسسة الابتكار', 'مدير المبيعات', 75, 'lead,innovation', 'active', 'referral', datetime('now'), datetime('now')),
('contact_3', 'نور علي', 'noor@company3.com', '+966503456789', 'دار الإبداع', 'مطورة ويب', 65, 'developer,creative', 'active', 'social_media', datetime('now'), datetime('now'));

-- Insert Contact Lists
INSERT INTO contact_lists (id, name, description, contact_count, created_at, updated_at) VALUES
('list_1', 'العملاء المميزون', 'قائمة العملاء ذوي القيمة العالية', 15, datetime('now'), datetime('now')),
('list_2', 'العملاء المحتملون', 'قائمة العملاء المهتمين بالخدمات', 25, datetime('now'), datetime('now')),
('list_3', 'النشرة الأسبوعية', 'مشتركي النشرة الإخبارية الأسبوعية', 150, datetime('now'), datetime('now'));

-- Insert Email Templates
INSERT INTO email_templates (id, name, subject, html_content, text_content, category, is_active, created_at, updated_at) VALUES
('template_1', 'نشرة ترحيبية', 'مرحباً بك في منصة التسويق الاحترافية', '<h1>مرحباً بك!</h1><p>نحن سعداء بانضمامك إلينا.</p>', 'مرحباً بك! نحن سعداء بانضمامك إلينا.', 'welcome', true, datetime('now'), datetime('now')),
('template_2', 'تحديث المنتج', 'آخر التحديثات على منتجاتنا', '<h2>تحديثات جديدة</h2><p>اكتشف الميزات الجديدة.</p>', 'تحديثات جديدة: اكتشف الميزات الجديدة.', 'product', true, datetime('now'), datetime('now')),
('template_3', 'عرض خاص', 'عرض حصري لعملائنا الكرام', '<h2>عرض خاص</h2><p>خصم 30% على جميع الخدمات.</p>', 'عرض خاص: خصم 30% على جميع الخدمات.', 'promotional', true, datetime('now'), datetime('now'));

-- Insert Email Campaigns
INSERT INTO email_campaigns (id, name, subject, template_id, contact_list_id, status, scheduled_at, sent_count, opened_count, clicked_count, created_at, updated_at) VALUES
('campaign_1', 'حملة الترحيب الجديدة', 'مرحباً بك معنا', 'template_1', 'list_1', 'sent', datetime('now', '-1 day'), 15, 12, 3, datetime('now'), datetime('now')),
('campaign_2', 'إعلان المنتج الجديد', 'منتج جديد متاح الآن', 'template_2', 'list_2', 'scheduled', datetime('now', '+1 day'), 0, 0, 0, datetime('now'), datetime('now')),
('campaign_3', 'عرض نهاية الشهر', 'لا تفوت العرض الخاص', 'template_3', 'list_3', 'draft', NULL, 0, 0, 0, datetime('now'), datetime('now'));

-- Insert Social Media Posts
INSERT INTO social_media_posts (id, platform, content, media_urls, scheduled_date, posted_at, engagement_count, status, created_at, updated_at) VALUES
('post_1', 'facebook', 'إعلان عن خدماتنا الجديدة في التسويق الرقمي! 🚀', '[]', datetime('now', '+2 hours'), NULL, 0, 'scheduled', datetime('now'), datetime('now')),
('post_2', 'twitter', 'نصائح للتسويق الفعال عبر وسائل التواصل الاجتماعي #تسويق #نصائح', '[]', datetime('now', '-1 day'), datetime('now', '-1 day'), 25, 'posted', datetime('now'), datetime('now')),
('post_3', 'instagram', 'صور من فعاليتنا الأخيرة 📸✨', '["image1.jpg", "image2.jpg"]', datetime('now', '-2 days'), datetime('now', '-2 days'), 45, 'posted', datetime('now'), datetime('now'));

-- Insert WhatsApp Templates
INSERT INTO whatsapp_templates (id, name, content, category, is_approved, language, created_at, updated_at) VALUES
('wa_template_1', 'رسالة ترحيب', 'أهلاً وسهلاً بك! نحن سعداء بتواصلك معنا. كيف يمكننا مساعدتك اليوم؟', 'welcome', true, 'ar', datetime('now'), datetime('now')),
('wa_template_2', 'تأكيد الموعد', 'تم تأكيد موعدك بتاريخ {{date}} في تمام الساعة {{time}}. نتطلع لرؤيتك!', 'appointment', true, 'ar', datetime('now'), datetime('now')),
('wa_template_3', 'عرض خاص', 'عرض محدود! خصم 25% على جميع خدماتنا. استخدم الكود: SPECIAL25', 'promotional', true, 'ar', datetime('now'), datetime('now'));

-- Insert Campaigns
INSERT INTO campaigns (id, name, type, status, start_date, end_date, budget, spent_amount, target_audience, goals, created_at, updated_at) VALUES
('camp_1', 'حملة التوعية بالعلامة التجارية', 'awareness', 'active', datetime('now', '-7 days'), datetime('now', '+23 days'), 5000.00, 1200.50, 'الشباب 18-35', 'زيادة الوعي بالعلامة التجارية بنسبة 40%', datetime('now'), datetime('now')),
('camp_2', 'حملة الإطلاق الجديد', 'product_launch', 'scheduled', datetime('now', '+3 days'), datetime('now', '+33 days'), 8000.00, 0.00, 'رجال الأعمال 25-50', 'الوصول إلى 10000 عميل محتمل', datetime('now'), datetime('now')),
('camp_3', 'حملة نهاية العام', 'seasonal', 'draft', datetime('now', '+60 days'), datetime('now', '+90 days'), 12000.00, 0.00, 'العائلات والشباب', 'زيادة المبيعات بنسبة 60%', datetime('now'), datetime('now'));

-- Insert Email Analytics
INSERT INTO email_analytics (id, campaign_id, metric_type, metric_value, recorded_at) VALUES
('analytics_1', 'campaign_1', 'open_rate', 80.0, datetime('now')),
('analytics_2', 'campaign_1', 'click_rate', 20.0, datetime('now')),
('analytics_3', 'campaign_1', 'bounce_rate', 2.5, datetime('now')),
('analytics_4', 'campaign_2', 'delivery_rate', 98.5, datetime('now'));

-- Insert A/B Tests
INSERT INTO ab_tests (id, campaign_id, test_name, variant_a, variant_b, status, sample_size, winner, confidence_level, created_at, updated_at) VALUES
('test_1', 'campaign_1', 'اختبار موضوع البريد', 'مرحباً بك في عائلتنا', 'أهلاً وسهلاً بك معنا', 'completed', 100, 'variant_b', 95.5, datetime('now'), datetime('now')),
('test_2', 'campaign_2', 'اختبار زر الدعوة للإجراء', 'اشترك الآن', 'ابدأ رحلتك', 'running', 200, NULL, 0, datetime('now'), datetime('now'));

-- Insert Contact List Memberships
INSERT INTO contact_list_memberships (contact_id, list_id, joined_at) VALUES
('contact_1', 'list_1', datetime('now')),
('contact_2', 'list_1', datetime('now')),
('contact_3', 'list_2', datetime('now')),
('contact_1', 'list_3', datetime('now')),
('contact_2', 'list_3', datetime('now'));