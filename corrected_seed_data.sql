-- Corrected Seed Data for Marketing Pro Platform

-- Insert Teams first
INSERT INTO teams (name, description, created_at, updated_at) VALUES
('الفريق الرئيسي', 'فريق التسويق الرئيسي للشركة', datetime('now'), datetime('now')),
('فريق المحتوى', 'فريق إنتاج المحتوى والتصميم', datetime('now'), datetime('now')),
('فريق التحليل', 'فريق تحليل البيانات والإحصائيات', datetime('now'), datetime('now'));

-- Insert Users with correct column names
INSERT INTO users (email, name, password_hash, role, team_id, status, created_at, updated_at) VALUES
('ahmed@example.com', 'أحمد محمد', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'admin', 1, 'active', datetime('now'), datetime('now')),
('fatima@example.com', 'فاطمة علي', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'marketer', 1, 'active', datetime('now'), datetime('now')),
('mohammed@example.com', 'محمد خالد', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'analyst', 2, 'active', datetime('now'), datetime('now'));

-- Insert Contacts with correct columns
INSERT INTO contacts (name, email, phone, company, position, lead_score, tags, status, source, created_at, updated_at) VALUES
('سارة أحمد', 'sara@company1.com', '+966501234567', 'شركة التكنولوجيا المتقدمة', 'مديرة التسويق', 85, 'vip,technology', 'active', 'website', datetime('now'), datetime('now')),
('خالد محمد', 'khalid@company2.com', '+966502345678', 'مؤسسة الابتكار', 'مدير المبيعات', 75, 'lead,innovation', 'active', 'referral', datetime('now'), datetime('now')),
('نور علي', 'noor@company3.com', '+966503456789', 'دار الإبداع', 'مطورة ويب', 65, 'developer,creative', 'active', 'social_media', datetime('now'), datetime('now'));

-- Insert Contact Lists
INSERT INTO contact_lists (name, description, contact_count, created_at, updated_at) VALUES
('العملاء المميزون', 'قائمة العملاء ذوي القيمة العالية', 15, datetime('now'), datetime('now')),
('العملاء المحتملون', 'قائمة العملاء المهتمين بالخدمات', 25, datetime('now'), datetime('now')),
('النشرة الأسبوعية', 'مشتركي النشرة الإخبارية الأسبوعية', 150, datetime('now'), datetime('now'));

-- Insert Email Templates
INSERT INTO email_templates (name, subject, html_content, text_content, category, is_active, created_at, updated_at) VALUES
('نشرة ترحيبية', 'مرحباً بك في منصة التسويق الاحترافية', '<h1>مرحباً بك!</h1><p>نحن سعداء بانضمامك إلينا.</p>', 'مرحباً بك! نحن سعداء بانضمامك إلينا.', 'welcome', true, datetime('now'), datetime('now')),
('تحديث المنتج', 'آخر التحديثات على منتجاتنا', '<h2>تحديثات جديدة</h2><p>اكتشف الميزات الجديدة.</p>', 'تحديثات جديدة: اكتشف الميزات الجديدة.', 'product', true, datetime('now'), datetime('now')),
('عرض خاص', 'عرض حصري لعملائنا الكرام', '<h2>عرض خاص</h2><p>خصم 30% على جميع الخدمات.</p>', 'عرض خاص: خصم 30% على جميع الخدمات.', 'promotional', true, datetime('now'), datetime('now'));

-- Insert Email Campaigns
INSERT INTO email_campaigns (name, subject, template_id, contact_list_id, status, scheduled_at, sent_count, opened_count, clicked_count, created_at, updated_at) VALUES
('حملة الترحيب الجديدة', 'مرحباً بك معنا', 1, 1, 'sent', datetime('now', '-1 day'), 15, 12, 3, datetime('now'), datetime('now')),
('إعلان المنتج الجديد', 'منتج جديد متاح الآن', 2, 2, 'scheduled', datetime('now', '+1 day'), 0, 0, 0, datetime('now'), datetime('now')),
('عرض نهاية الشهر', 'لا تفوت العرض الخاص', 3, 3, 'draft', NULL, 0, 0, 0, datetime('now'), datetime('now'));

-- Insert Social Media Posts
INSERT INTO social_media_posts (platform, content, media_urls, scheduled_date, posted_at, engagement_count, status, created_at, updated_at) VALUES
('facebook', 'إعلان عن خدماتنا الجديدة في التسويق الرقمي! 🚀', '[]', datetime('now', '+2 hours'), NULL, 0, 'scheduled', datetime('now'), datetime('now')),
('twitter', 'نصائح للتسويق الفعال عبر وسائل التواصل الاجتماعي #تسويق #نصائح', '[]', datetime('now', '-1 day'), datetime('now', '-1 day'), 25, 'posted', datetime('now'), datetime('now')),
('instagram', 'صور من فعاليتنا الأخيرة 📸✨', '["image1.jpg", "image2.jpg"]', datetime('now', '-2 days'), datetime('now', '-2 days'), 45, 'posted', datetime('now'), datetime('now'));

-- Insert WhatsApp Templates
INSERT INTO whatsapp_templates (name, content, category, is_approved, language, created_at, updated_at) VALUES
('رسالة ترحيب', 'أهلاً وسهلاً بك! نحن سعداء بتواصلك معنا. كيف يمكننا مساعدتك اليوم؟', 'welcome', true, 'ar', datetime('now'), datetime('now')),
('تأكيد الموعد', 'تم تأكيد موعدك بتاريخ {{date}} في تمام الساعة {{time}}. نتطلع لرؤيتك!', 'appointment', true, 'ar', datetime('now'), datetime('now')),
('عرض خاص', 'عرض محدود! خصم 25% على جميع خدماتنا. استخدم الكود: SPECIAL25', 'promotional', true, 'ar', datetime('now'), datetime('now'));

-- Insert Campaigns
INSERT INTO campaigns (name, type, status, start_date, end_date, budget, spent_amount, target_audience, goals, created_at, updated_at) VALUES
('حملة التوعية بالعلامة التجارية', 'awareness', 'active', datetime('now', '-7 days'), datetime('now', '+23 days'), 5000.00, 1200.50, 'الشباب 18-35', 'زيادة الوعي بالعلامة التجارية بنسبة 40%', datetime('now'), datetime('now')),
('حملة الإطلاق الجديد', 'product_launch', 'scheduled', datetime('now', '+3 days'), datetime('now', '+33 days'), 8000.00, 0.00, 'رجال الأعمال 25-50', 'الوصول إلى 10000 عميل محتمل', datetime('now'), datetime('now')),
('حملة نهاية العام', 'seasonal', 'draft', datetime('now', '+60 days'), datetime('now', '+90 days'), 12000.00, 0.00, 'العائلات والشباب', 'زيادة المبيعات بنسبة 60%', datetime('now'), datetime('now'));

-- Insert Contact List Memberships
INSERT INTO contact_list_memberships (contact_id, list_id, joined_at) VALUES
(1, 1, datetime('now')),
(2, 1, datetime('now')),
(3, 2, datetime('now')),
(1, 3, datetime('now')),
(2, 3, datetime('now'));