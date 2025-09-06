-- Minimal Seed Data for Marketing Pro Platform

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

-- Insert minimal contacts
INSERT INTO contacts (name, email, phone, company, position, lead_score, status, source) VALUES
('سارة أحمد', 'sara@company1.com', '+966501234567', 'شركة التكنولوجيا المتقدمة', 'مديرة التسويق', 85, 'active', 'website'),
('خالد محمد', 'khalid@company2.com', '+966502345678', 'مؤسسة الابتكار', 'مدير المبيعات', 75, 'active', 'referral'),
('نور علي', 'noor@company3.com', '+966503456789', 'دار الإبداع', 'مطورة ويب', 65, 'active', 'social_media');

-- Insert contact lists
INSERT INTO contact_lists (name, contact_count) VALUES
('العملاء المميزون', 15),
('العملاء المحتملون', 25),
('النشرة الأسبوعية', 150);

-- Insert email templates
INSERT INTO email_templates (name, subject, html_content, text_content, category, is_active) VALUES
('نشرة ترحيبية', 'مرحباً بك في منصة التسويق الاحترافية', '<h1>مرحباً بك!</h1><p>نحن سعداء بانضمامك إلينا.</p>', 'مرحباً بك! نحن سعداء بانضمامك إلينا.', 'welcome', true),
('تحديث المنتج', 'آخر التحديثات على منتجاتنا', '<h2>تحديثات جديدة</h2><p>اكتشف الميزات الجديدة.</p>', 'تحديثات جديدة: اكتشف الميزات الجديدة.', 'product', true),
('عرض خاص', 'عرض حصري لعملائنا الكرام', '<h2>عرض خاص</h2><p>خصم 30% على جميع الخدمات.</p>', 'عرض خاص: خصم 30% على جميع الخدمات.', 'promotional', true);

-- Insert campaigns
INSERT INTO campaigns (name, type, status, start_date, end_date, budget, spent_amount, target_audience, goals) VALUES
('حملة التوعية بالعلامة التجارية', 'awareness', 'active', datetime('now', '-7 days'), datetime('now', '+23 days'), 5000.00, 1200.50, 'الشباب 18-35', 'زيادة الوعي بالعلامة التجارية بنسبة 40%'),
('حملة الإطلاق الجديد', 'product_launch', 'scheduled', datetime('now', '+3 days'), datetime('now', '+33 days'), 8000.00, 0.00, 'رجال الأعمال 25-50', 'الوصول إلى 10000 عميل محتمل'),
('حملة نهاية العام', 'seasonal', 'draft', datetime('now', '+60 days'), datetime('now', '+90 days'), 12000.00, 0.00, 'العائلات والشباب', 'زيادة المبيعات بنسبة 60%');

-- Insert email campaigns
INSERT INTO email_campaigns (name, subject, template_id, contact_list_id, status, sent_count, opened_count, clicked_count) VALUES
('حملة الترحيب الجديدة', 'مرحباً بك معنا', 1, 1, 'sent', 15, 12, 3),
('إعلان المنتج الجديد', 'منتج جديد متاح الآن', 2, 2, 'scheduled', 0, 0, 0),
('عرض نهاية الشهر', 'لا تفوت العرض الخاص', 3, 3, 'draft', 0, 0, 0);

-- Insert social media posts
INSERT INTO social_media_posts (platform, content, media_urls, scheduled_date, engagement_count, status) VALUES
('facebook', 'إعلان عن خدماتنا الجديدة في التسويق الرقمي! 🚀', '[]', datetime('now', '+2 hours'), 0, 'scheduled'),
('twitter', 'نصائح للتسويق الفعال عبر وسائل التواصل الاجتماعي #تسويق #نصائح', '[]', datetime('now', '-1 day'), 25, 'posted'),
('instagram', 'صور من فعاليتنا الأخيرة 📸✨', '["image1.jpg", "image2.jpg"]', datetime('now', '-2 days'), 45, 'posted');

-- Insert WhatsApp templates
INSERT INTO whatsapp_templates (name, content, category, is_approved, language) VALUES
('رسالة ترحيب', 'أهلاً وسهلاً بك! نحن سعداء بتواصلك معنا. كيف يمكننا مساعدتك اليوم؟', 'welcome', true, 'ar'),
('تأكيد الموعد', 'تم تأكيد موعدك بتاريخ {{date}} في تمام الساعة {{time}}. نتطلع لرؤيتك!', 'appointment', true, 'ar'),
('عرض خاص', 'عرض محدود! خصم 25% على جميع خدماتنا. استخدم الكود: SPECIAL25', 'promotional', true, 'ar');