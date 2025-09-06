-- Marketing Pro - Enhanced Seed Data
-- Sample data for all tables to demonstrate functionality

-- =====================================
-- CORE DATA
-- =====================================

-- Insert sample team
INSERT OR IGNORE INTO teams (id, name, slug, plan) VALUES 
(1, 'Marketing Pro Team', 'marketing-pro', 'pro');

-- Insert sample users
INSERT OR IGNORE INTO users (id, email, name, password_hash, role, team_id, department, position, status) VALUES 
(1, 'admin@marketingpro.com', 'أحمد المدير', 'hashed_password_1', 'admin', 1, 'الإدارة', 'مدير عام', 'active'),
(2, 'sara@marketingpro.com', 'سارة المسوقة', 'hashed_password_2', 'marketer', 1, 'التسويق', 'مسوقة رقمية', 'active'),
(3, 'omar@marketingpro.com', 'عمر المحلل', 'hashed_password_3', 'analyst', 1, 'التحليل', 'محلل بيانات', 'active'),
(4, 'rana@marketingpro.com', 'رنا المصممة', 'hashed_password_4', 'marketer', 1, 'التصميم', 'مصممة محتوى', 'active');

-- =====================================
-- CLIENTS DATA
-- =====================================

INSERT OR IGNORE INTO clients (id, team_id, name, email, phone, company, industry, website, address, city, country, status, lead_source, assigned_to, total_value) VALUES 
(1, 1, 'شركة النجاح للتجارة', 'info@najah-trade.com', '+966501234567', 'شركة النجاح للتجارة', 'التجارة الإلكترونية', 'https://najah-trade.com', 'شارع الملك فهد', 'الرياض', 'السعودية', 'active', 'موقع الويب', 2, 50000.00),
(2, 1, 'مطعم الذواقة', 'contact@zawaqrestaurant.com', '+966507654321', 'مطعم الذواقة', 'المطاعم', 'https://zawaq.com', 'شارع التحلية', 'جدة', 'السعودية', 'active', 'وسائل التواصل', 2, 30000.00),
(3, 1, 'عيادة الأسنان المتقدمة', 'info@advanceddental.com', '+966551122334', 'عيادة الأسنان المتقدمة', 'الرعاية الصحية', 'https://advanceddental.com', 'شارع الأمير محمد', 'الدمام', 'السعودية', 'prospect', 'إحالة', 3, 25000.00),
(4, 1, 'معهد التدريب التقني', 'admin@techtraining.edu', '+966544556677', 'معهد التدريب التقني', 'التعليم', 'https://techtraining.edu', 'شارع الجامعة', 'مكة', 'السعودية', 'active', 'معرض', 4, 75000.00),
(5, 1, 'شركة البناء الحديث', 'projects@modernbuild.com', '+966533445566', 'شركة البناء الحديث', 'الإنشاءات', 'https://modernbuild.com', 'شارع الصناعة', 'الخبر', 'السعودية', 'active', 'موقع الويب', 2, 120000.00);

-- Client interactions
INSERT OR IGNORE INTO client_interactions (client_id, user_id, type, title, description, outcome, completed_at) VALUES 
(1, 2, 'call', 'مكالمة المتابعة الأولى', 'مناقشة استراتيجية التسويق الرقمي', 'إيجابية - تم الاتفاق على الخطة', '2025-09-01 10:30:00'),
(1, 2, 'email', 'إرسال العرض التجاري', 'تم إرسال عرض شامل للخدمات', 'تم الإرسال بنجاح', '2025-09-02 14:15:00'),
(2, 2, 'meeting', 'اجتماع في المطعم', 'مناقشة حملة وسائل التواصل الاجتماعي', 'ممتازة - تم التوقيع', '2025-09-03 16:00:00'),
(3, 3, 'call', 'مكالمة استطلاعية', 'فهم احتياجات العيادة التسويقية', 'مهتمون - يحتاجون وقت للتفكير', '2025-09-04 11:00:00'),
(4, 4, 'email', 'إرسال نماذج التصميم', 'عرض نماذج من أعمال سابقة للمعهد', 'راضون عن الجودة', '2025-09-05 09:30:00');

-- =====================================
-- CAMPAIGNS DATA
-- =====================================

INSERT OR IGNORE INTO campaigns (id, team_id, name, description, status, type, budget, spent, target_audience, goals, start_date, end_date, created_by, assigned_to) VALUES 
(1, 1, 'حملة العودة للمدارس', 'حملة تسويقية شاملة لموسم العودة للمدارس', 'active', 'mixed', 15000.00, 8500.00, 'أولياء الأمور والطلاب', 'زيادة المبيعات بنسبة 30%', '2025-08-15', '2025-09-30', 2, 2),
(2, 1, 'حملة الجمعة البيضاء', 'حملة خاصة بتخفيضات الجمعة البيضاء', 'draft', 'social', 25000.00, 0.00, 'المتسوقين عبر الإنترنت', 'تحقيق أعلى مبيعات في العام', '2025-11-20', '2025-11-30', 2, 3),
(3, 1, 'حملة اليوم الوطني', 'احتفالاً باليوم الوطني السعودي', 'completed', 'social', 10000.00, 9200.00, 'المواطنين والمقيمين', 'تعزيز الهوية الوطنية للعلامة التجارية', '2025-09-20', '2025-09-25', 2, 4),
(4, 1, 'حملة التجارة الإلكترونية', 'تطوير متاجر إلكترونية للعملاء', 'active', 'email', 20000.00, 5600.00, 'أصحاب الأعمال الصغيرة', 'جذب 50 عميل جديد', '2025-09-01', '2025-12-31', 3, 2),
(5, 1, 'حملة الصحة والعافية', 'توعية صحية مع العيادات الطبية', 'paused', 'whatsapp', 12000.00, 3200.00, 'المرضى والمهتمين بالصحة', 'زيادة الوعي الصحي', '2025-08-01', '2025-10-31', 4, 3);

-- Campaign metrics
INSERT OR IGNORE INTO campaign_metrics (campaign_id, date, impressions, clicks, conversions, spend, revenue) VALUES 
(1, '2025-09-01', 15000, 1200, 85, 850.00, 4250.00),
(1, '2025-09-02', 18000, 1450, 102, 920.00, 5100.00),
(1, '2025-09-03', 22000, 1800, 124, 1100.00, 6200.00),
(1, '2025-09-04', 19000, 1600, 98, 980.00, 4900.00),
(1, '2025-09-05', 25000, 2100, 156, 1200.00, 7800.00),
(3, '2025-09-21', 50000, 4200, 280, 2100.00, 14000.00),
(3, '2025-09-22', 55000, 4800, 320, 2400.00, 16000.00),
(3, '2025-09-23', 48000, 4000, 275, 2000.00, 13750.00),
(4, '2025-09-01', 8000, 640, 32, 320.00, 1600.00),
(4, '2025-09-02', 8500, 680, 34, 340.00, 1700.00);

-- =====================================
-- EMAIL MARKETING DATA
-- =====================================

INSERT OR IGNORE INTO email_templates (id, team_id, name, subject, content, type, category, created_by) VALUES 
(1, 1, 'رسالة الترحيب', 'مرحباً بك في عائلتنا!', '<h1>مرحباً {{name}}</h1><p>نسعد بانضمامك إلينا...</p>', 'marketing', 'ترحيب', 2),
(2, 1, 'عرض خاص', 'عرض حصري خاص بك!', '<h1>عرض لا يُفوت</h1><p>احصل على خصم {{discount}}%...</p>', 'marketing', 'عروض', 2),
(3, 1, 'تأكيد الطلب', 'تم تأكيد طلبك رقم {{order_id}}', '<h1>شكراً لطلبك</h1><p>تم تأكيد الطلب بنجاح...</p>', 'transactional', 'طلبات', 3),
(4, 1, 'النشرة الإخبارية', 'آخر أخبارنا وتحديثاتنا', '<h1>نشرتنا الشهرية</h1><p>إليك آخر الأخبار...</p>', 'newsletter', 'أخبار', 4);

INSERT OR IGNORE INTO email_campaigns (id, team_id, name, subject, sender_name, sender_email, status, sent_count, delivered_count, opened_count, clicked_count, created_by) VALUES 
(1, 1, 'حملة العودة للمدارس - بريد إلكتروني', 'استعد للعام الدراسي الجديد', 'فريق التسويق', 'marketing@marketingpro.com', 'sent', 5000, 4850, 2425, 485, 2),
(2, 1, 'عرض الجمعة البيضاء', 'خصومات تصل إلى 70%!', 'فريق المبيعات', 'sales@marketingpro.com', 'sent', 8500, 8200, 4100, 820, 2),
(3, 1, 'النشرة الإخبارية - سبتمبر', 'آخر أخبار الشركة', 'إدارة المحتوى', 'news@marketingpro.com', 'sent', 12000, 11500, 3450, 345, 4),
(4, 1, 'تذكير بالدورة التدريبية', 'لا تفوت فرصة التسجيل', 'فريق التدريب', 'training@marketingpro.com', 'scheduled', 0, 0, 0, 0, 3);

-- =====================================
-- SOCIAL MEDIA DATA
-- =====================================

INSERT OR IGNORE INTO social_accounts (id, team_id, platform, account_name, account_id, is_active, followers_count, following_count, posts_count, created_by) VALUES 
(1, 1, 'facebook', 'Marketing Pro Official', 'marketingpro_official', 1, 15000, 500, 250, 2),
(2, 1, 'instagram', '@marketing_pro_sa', 'marketing_pro_sa', 1, 25000, 1000, 180, 2),
(3, 1, 'twitter', '@MarketingProSA', 'marketingprosa', 1, 8500, 2500, 320, 3),
(4, 1, 'linkedin', 'Marketing Pro Saudi Arabia', 'marketing-pro-saudi', 1, 5000, 3000, 95, 4),
(5, 1, 'tiktok', '@marketingpro.sa', 'marketingprosa', 1, 12000, 150, 45, 4),
(6, 1, 'youtube', 'Marketing Pro Channel', 'marketingprochannel', 1, 3500, 100, 25, 3);

INSERT OR IGNORE INTO social_posts (id, team_id, content, platforms, status, scheduled_at, published_at, engagement_rate, likes_count, shares_count, comments_count, reach, impressions, created_by) VALUES 
(1, 1, 'نصائح فعالة للتسويق الرقمي في 2025 📈', '["facebook", "instagram", "twitter"]', 'published', '2025-09-05 10:00:00', '2025-09-05 10:00:00', 4.5, 450, 85, 32, 12000, 15000, 2),
(2, 1, 'احتفالاً باليوم الوطني السعودي 🇸🇦', '["facebook", "instagram", "linkedin"]', 'published', '2025-09-23 14:00:00', '2025-09-23 14:00:00', 8.2, 1200, 250, 180, 25000, 35000, 4),
(3, 1, 'دليلك الشامل لإنشاء حملة إعلانية ناجحة', '["linkedin", "twitter"]', 'published', '2025-09-04 16:30:00', '2025-09-04 16:30:00', 3.8, 280, 45, 22, 8000, 10000, 3),
(4, 1, 'قريباً: ورشة عمل مجانية حول التسويق بالمحتوى', '["facebook", "instagram", "twitter", "linkedin"]', 'scheduled', '2025-09-08 12:00:00', NULL, 0, 0, 0, 0, 0, 0, 2),
(5, 1, 'شكراً لثقتكم - تجاوزنا 50 ألف متابع! 🎉', '["instagram", "tiktok"]', 'published', '2025-09-02 20:00:00', '2025-09-02 20:00:00', 12.5, 2500, 500, 350, 40000, 50000, 4);

-- =====================================
-- WHATSAPP DATA
-- =====================================

INSERT OR IGNORE INTO whatsapp_contacts (id, team_id, phone_number, name, status, last_message_at, total_messages) VALUES 
(1, 1, '+966501234567', 'أحمد النجاح', 'active', '2025-09-05 14:30:00', 15),
(2, 1, '+966507654321', 'مطعم الذواقة', 'active', '2025-09-04 16:45:00', 8),
(3, 1, '+966551122334', 'د. سارة الطبيبة', 'active', '2025-09-03 11:20:00', 5),
(4, 1, '+966544556677', 'معهد التدريب', 'active', '2025-09-05 09:15:00', 12),
(5, 1, '+966533445566', 'شركة البناء', 'active', '2025-09-01 13:00:00', 3);

INSERT OR IGNORE INTO whatsapp_messages (id, team_id, contact_id, type, content, status, direction, sent_by, sent_at, delivered_at, read_at) VALUES 
(1, 1, 1, 'text', 'مرحباً أحمد، نشكرك على اهتمامك بخدماتنا. متى يمكننا ترتيب اجتماع؟', 'read', 'outbound', 2, '2025-09-05 10:00:00', '2025-09-05 10:01:00', '2025-09-05 10:05:00'),
(2, 1, 1, 'text', 'شكراً لكم، يمكننا الاجتماع غداً في الساعة 2 ظهراً', 'read', 'inbound', NULL, '2025-09-05 10:10:00', '2025-09-05 10:10:00', '2025-09-05 10:11:00'),
(3, 1, 2, 'image', 'إليكم نماذج من تصاميم القوائم التي أنجزناها', 'delivered', 'outbound', 4, '2025-09-04 15:30:00', '2025-09-04 15:31:00', NULL),
(4, 1, 3, 'template', 'مرحباً د. سارة، لدينا عرض خاص للعيادات الطبية هذا الشهر', 'read', 'outbound', 3, '2025-09-03 09:00:00', '2025-09-03 09:01:00', '2025-09-03 11:20:00'),
(5, 1, 4, 'document', 'عرض الخدمات التسويقية الخاصة بالمعاهد التعليمية', 'delivered', 'outbound', 2, '2025-09-05 08:45:00', '2025-09-05 08:46:00', NULL);

-- =====================================
-- CONTENT CALENDAR DATA
-- =====================================

INSERT OR IGNORE INTO content_calendar (id, team_id, title, content, content_type, platforms, status, assigned_to, due_date, publish_date, tags, created_by) VALUES 
(1, 1, 'منشور نصائح التسويق الصباحية', 'نصيحة اليوم: استخدم الهاشتاقات المناسبة لزيادة الوصول', 'post', '["instagram", "twitter"]', 'published', 4, '2025-09-06', '2025-09-06 08:00:00', '["نصائح", "تسويق", "صباح"]', 2),
(2, 1, 'فيديو تعليمي: كيفية إنشاء حملة إعلانية', 'شرح مفصل لخطوات إنشاء حملة إعلانية فعالة', 'video', '["youtube", "facebook"]', 'in_progress', 3, '2025-09-08', '2025-09-10 16:00:00', '["تعليمي", "حملات", "فيديو"]', 2),
(3, 1, 'مقال: اتجاهات التسويق الرقمي 2025', 'مقال شامل حول أحدث اتجاهات التسويق الرقمي', 'article', '["linkedin", "website"]', 'review', 2, '2025-09-12', '2025-09-15 14:00:00', '["اتجاهات", "2025", "تسويق رقمي"]', 3),
(4, 1, 'قصة انستقرام: خلف الكواليس', 'لقطات من مكتبنا وفريق العمل', 'story', '["instagram"]', 'approved', 4, '2025-09-07', '2025-09-07 12:00:00', '["خلف الكواليس", "فريق"]', 4),
(5, 1, 'إنفوجرافيك: إحصائيات وسائل التواصل', 'تصميم إنفوجرافيك بأحدث إحصائيات المنصات', 'image', '["facebook", "instagram", "linkedin"]', 'planned', 4, '2025-09-10', '2025-09-12 11:00:00', '["إحصائيات", "إنفوجرافيك"]', 2);

-- =====================================
-- ANALYTICS DATA
-- =====================================

INSERT OR IGNORE INTO analytics_summary (team_id, date, total_campaigns, active_campaigns, total_clients, new_clients, total_users, active_users, email_sent, email_opened, whatsapp_sent, whatsapp_delivered, social_posts, social_engagement, total_revenue, total_spend, roi) VALUES 
(1, '2025-09-01', 5, 3, 5, 1, 4, 4, 2500, 1200, 150, 145, 8, 2500, 15000.00, 8000.00, 87.5),
(1, '2025-09-02', 5, 3, 5, 0, 4, 4, 2800, 1400, 180, 175, 6, 3200, 18500.00, 9200.00, 101.1),
(1, '2025-09-03', 5, 3, 5, 1, 4, 3, 3200, 1600, 200, 195, 10, 4100, 22000.00, 11000.00, 100.0),
(1, '2025-09-04', 5, 3, 5, 0, 4, 4, 2900, 1450, 220, 210, 7, 3800, 25000.00, 12500.00, 100.0),
(1, '2025-09-05', 5, 3, 5, 0, 4, 4, 3500, 1750, 250, 240, 9, 5200, 28000.00, 14000.00, 100.0);

-- =====================================
-- ACTIVITY LOG
-- =====================================

INSERT OR IGNORE INTO activity_log (team_id, user_id, action, resource_type, resource_id, description, ip_address) VALUES 
(1, 1, 'create', 'campaign', 1, 'تم إنشاء حملة جديدة: حملة العودة للمدارس', '192.168.1.100'),
(1, 2, 'update', 'client', 1, 'تم تحديث معلومات العميل: شركة النجاح للتجارة', '192.168.1.101'),
(1, 3, 'create', 'email_campaign', 1, 'تم إنشاء حملة بريد إلكتروني جديدة', '192.168.1.102'),
(1, 4, 'publish', 'social_post', 2, 'تم نشر منشور احتفالاً باليوم الوطني', '192.168.1.103'),
(1, 2, 'send', 'whatsapp_message', 1, 'تم إرسال رسالة واتساب لأحمد النجاح', '192.168.1.101'),
(1, 1, 'login', 'user', 1, 'تسجيل دخول المدير', '192.168.1.100'),
(1, 3, 'create', 'content', 3, 'تم إنشاء محتوى جديد: مقال اتجاهات التسويق', '192.168.1.102');

-- =====================================
-- INTEGRATIONS & SETTINGS
-- =====================================

INSERT OR IGNORE INTO integrations (team_id, name, type, provider, is_active, created_by) VALUES 
(1, 'SendGrid Email', 'email', 'sendgrid', 1, 1),
(1, 'Meta Business', 'social', 'facebook', 1, 2),
(1, 'Google Analytics', 'analytics', 'google', 1, 3),
(1, 'WhatsApp Business API', 'sms', 'whatsapp', 1, 2),
(1, 'Mailchimp', 'email', 'mailchimp', 0, 1);

INSERT OR IGNORE INTO brand_settings (team_id, primary_color, secondary_color, accent_color, brand_voice, guidelines, updated_by) VALUES 
(1, '#3b82f6', '#10b981', '#f59e0b', 'ودود ومهني ومفيد', 'نحن نتبع نهجاً احترافياً في التواصل مع العملاء مع الحفاظ على طابع ودود ومفيد. نستخدم اللغة العربية الفصحى المبسطة.', 1);