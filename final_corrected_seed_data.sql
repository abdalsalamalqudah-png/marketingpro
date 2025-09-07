-- Final Corrected Simple Seed Data for Marketing Pro Platform

-- Insert Teams first
INSERT INTO teams (name, slug) VALUES
('الفريق الرئيسي', 'main-team'),
('فريق المحتوى', 'content-team'),
('فريق التحليل', 'analytics-team');

-- Insert Users
INSERT INTO users (email, name, password_hash, role, team_id) VALUES
('ahmed@example.com', 'أحمد محمد', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'admin', 1),
('fatima@example.com', 'فاطمة علي', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'marketer', 1),
('mohammed@example.com', 'محمد خالد', '$2b$12$LQv3c1yqBwEHFj/sdfasdf', 'analyst', 2);

-- Insert clients
INSERT INTO clients (team_id, name, email, phone, company, industry, status, lead_score, lead_source, assigned_to, total_value, lifetime_value, notes, tags) VALUES
(1, 'سارة أحمد', 'sara@company1.com', '+966501234567', 'شركة التكنولوجيا المتقدمة', 'تكنولوجيا', 'active', 85, 'website', 1, 15000.00, 15000.00, 'عميل مميز مع إمكانيات كبيرة', '["vip","technology"]'),
(1, 'خالد محمد', 'khalid@company2.com', '+966502345678', 'مؤسسة الابتكار', 'تطوير', 'active', 75, 'referral', 2, 25000.00, 25000.00, 'مهتم بالحلول الشاملة', '["lead","innovation"]'),
(2, 'نور علي', 'noor@company3.com', '+966503456789', 'دار الإبداع', 'إبداع', 'lead', 65, 'social_media', 1, 8000.00, 8000.00, 'مطورة ويب موهوبة', '["developer","creative"]');

-- Insert campaigns with valid types and status values
INSERT INTO campaigns (team_id, name, type, status, start_date, end_date, budget, spent, target_audience, goals, created_by) VALUES
(1, 'حملة البريد الإلكتروني', 'email', 'active', date('now', '-7 days'), date('now', '+23 days'), 5000.00, 1200.50, 'الشباب 18-35', '["زيادة الوعي بالعلامة التجارية بنسبة 40%"]', 1),
(1, 'حملة وسائل التواصل الاجتماعي', 'social', 'paused', date('now', '+3 days'), date('now', '+33 days'), 8000.00, 0.00, 'رجال الأعمال 25-50', '["الوصول إلى 10000 عميل محتمل"]', 2),
(2, 'حملة الإعلانات المدفوعة', 'ads', 'draft', date('now', '+60 days'), date('now', '+90 days'), 12000.00, 0.00, 'العائلات والشباب', '["زيادة المبيعات بنسبة 60%"]', 1);