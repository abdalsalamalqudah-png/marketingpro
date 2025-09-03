import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// CORS middleware
app.use('/api/*', cors({
  origin: ['http://localhost:3000', 'https://*.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Analytics API - Enhanced with more data
app.get('/api/analytics', (c) => {
  return c.json({
    campaigns: { 
      total: 12, 
      active: 8, 
      draft: 2, 
      completed: 2 
    },
    contacts: { 
      total: 1247, 
      new_this_month: 156, 
      active: 89 
    },
    performance: { 
      roi: { value: 24.5, change: 12 },
      conversion_rate: { value: 3.2, change: 0.5 },
      page_views: { value: 45231, change: 8 },
      click_rate: { value: 3.4, change: -0.2 }
    },
    social_media: {
      facebook: { connected: true, followers: 5420, engagement: 3.2 },
      twitter: { connected: false, followers: 0, engagement: 0 },
      instagram: { connected: true, followers: 2890, engagement: 4.1 },
      linkedin: { connected: false, followers: 0, engagement: 0 }
    },
    recent_activity: [
      { type: 'email_sent', title: 'تم إرسال حملة بريد إلكتروني', time: '5 دقائق' },
      { type: 'new_contact', title: 'عميل جديد اشترك في القائمة البريدية', time: '15 دقيقة' },
      { type: 'campaign_review', title: 'حملة تحتاج مراجعة', time: 'ساعة واحدة' },
      { type: 'social_post', title: 'تم نشر منشور على فيسبوك', time: 'ساعتين' }
    ]
  })
})

// Placeholder API endpoints for future integrations
app.get('/api/campaigns', (c) => {
  return c.json({
    campaigns: [
      { id: 1, name: 'حملة الصيف 2024', status: 'active', budget: 5000, spent: 2300 },
      { id: 2, name: 'حملة المنتج الجديد', status: 'draft', budget: 3000, spent: 0 },
      { id: 3, name: 'حملة العروض الشهرية', status: 'completed', budget: 2000, spent: 1950 }
    ]
  })
})

app.get('/api/contacts', (c) => {
  return c.json({
    contacts: [
      { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', status: 'active', created_at: '2024-01-15' },
      { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', status: 'active', created_at: '2024-01-10' },
      { id: 3, name: 'محمد السيد', email: 'mohamed@example.com', status: 'inactive', created_at: '2024-01-05' }
    ]
  })
})

// Email API endpoints
app.post('/api/email/send', async (c) => {
  const { to, subject, content } = await c.req.json()
  
  // Placeholder for email service integration
  return c.json({
    success: true,
    message: 'تم إرسال البريد الإلكتروني بنجاح (وضع تجريبي)',
    data: { to, subject, content, sent_at: new Date().toISOString() }
  })
})

app.post('/api/email/test', async (c) => {
  const { service, apiKey } = await c.req.json()
  
  // Simulate connection test
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return c.json({
    success: true,
    message: `تم اختبار الاتصال مع ${service} بنجاح`,
    service
  })
})

app.get('/api/email/templates', (c) => {
  return c.json({
    templates: [
      { 
        id: 1, 
        name: 'ترحيب بالعملاء الجدد', 
        type: 'welcome',
        subject: 'مرحباً بك في شركتنا',
        content: 'مرحباً {name}، نحن سعداء لانضمامك إلينا...'
      },
      { 
        id: 2, 
        name: 'نشرة إخبارية أسبوعية', 
        type: 'newsletter',
        subject: 'آخر أخبارنا هذا الأسبوع',
        content: 'إليك أهم المستجدات في شركتنا هذا الأسبوع...'
      },
      { 
        id: 3, 
        name: 'تذكير بالعروض', 
        type: 'promotion',
        subject: 'عرض خاص لفترة محدودة!',
        content: 'لا تفوت عرضنا الخاص المتاح حتى نهاية الشهر...'
      }
    ]
  })
})

app.post('/api/email/templates', async (c) => {
  const { name, type, subject, content } = await c.req.json()
  
  return c.json({
    success: true,
    message: 'تم حفظ القالب بنجاح',
    template: { id: Date.now(), name, type, subject, content }
  })
})

app.get('/api/email/campaigns', (c) => {
  return c.json({
    campaigns: [
      {
        id: 1,
        subject: 'حملة الصيف 2024',
        recipient: 'all-customers@list.com',
        status: 'sent',
        sent_at: '2024-01-15 10:30',
        open_rate: '23.4%'
      },
      {
        id: 2,
        subject: 'نشرة إخبارية يناير',
        recipient: 'newsletter@list.com',
        status: 'sent',
        sent_at: '2024-01-10 14:00',
        open_rate: '18.7%'
      }
    ]
  })
})

// WhatsApp API endpoints
app.get('/api/whatsapp/status', (c) => {
  return c.json({
    connected: false,
    message: 'يرجى إعداد WhatsApp Business API أولاً'
  })
})

app.post('/api/whatsapp/setup', async (c) => {
  const { access_token, phone_number_id, verify_token } = await c.req.json()
  
  // Simulate setup process
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return c.json({
    success: true,
    message: 'تم حفظ إعدادات WhatsApp بنجاح (وضع تجريبي)',
    data: { phone_number_id }
  })
})

app.post('/api/whatsapp/test', async (c) => {
  // Simulate connection test
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return c.json({
    success: true,
    message: 'تم اختبار الاتصال بنجاح'
  })
})

app.post('/api/whatsapp/send', async (c) => {
  const { phone, message, type } = await c.req.json()
  
  // Simulate sending message
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return c.json({
    success: true,
    message: 'تم إرسال الرسالة بنجاح (وضع تجريبي)',
    data: { 
      phone, 
      message, 
      type,
      message_id: 'wamid.' + Date.now(),
      status: 'sent',
      sent_at: new Date().toISOString()
    }
  })
})

app.post('/api/whatsapp/bulk-send', async (c) => {
  const { numbers, message } = await c.req.json()
  
  // Simulate bulk sending
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return c.json({
    success: true,
    message: `تم إرسال الرسالة لـ ${numbers.length} رقم بنجاح (وضع تجريبي)`,
    data: {
      total_numbers: numbers.length,
      sent_count: numbers.length,
      failed_count: 0
    }
  })
})

app.get('/api/whatsapp/templates', (c) => {
  return c.json({
    templates: [
      {
        id: 'welcome_msg_ar',
        name: 'رسالة ترحيب',
        language: 'ar',
        status: 'approved',
        content: 'مرحباً {{name}}، نشكرك لاختيار خدماتنا. فريقنا جاهز لخدمتك على مدار الساعة.'
      },
      {
        id: 'order_confirmation_ar',
        name: 'تأكيد الطلب',
        language: 'ar',
        status: 'approved',
        content: 'تم تأكيد طلبك رقم {{order_number}}. سيتم التواصل معك قريباً لترتيب التسليم.'
      },
      {
        id: 'appointment_reminder_ar',
        name: 'تذكير بالموعد',
        language: 'ar',
        status: 'pending',
        content: 'نذكرك بموعدك غداً في تمام الساعة {{time}}. يرجى التأكيد أو إعادة الجدولة.'
      }
    ]
  })
})

app.get('/api/whatsapp/conversations', (c) => {
  return c.json({
    conversations: [
      {
        id: 1,
        phone: '+966501234567',
        message: 'مرحباً، كيف يمكنني مساعدتك؟',
        status: 'delivered',
        sent_at: '2024-01-15 14:30',
        direction: 'outbound'
      },
      {
        id: 2,
        phone: '+966507654321',
        message: 'شكراً لتواصلك معنا. تم تأكيد طلبك.',
        status: 'read',
        sent_at: '2024-01-15 13:45',
        direction: 'outbound'
      },
      {
        id: 3,
        phone: '+966509876543',
        message: 'نذكرك بموعد اجتماعك غداً الساعة 10:00 صباحاً',
        status: 'sent',
        sent_at: '2024-01-15 12:00',
        direction: 'outbound'
      }
    ]
  })
})

// Social Media API endpoints
app.get('/api/social/:platform/status', (c) => {
  const platform = c.req.param('platform')
  
  // Simulate some platforms being connected
  const connectedPlatforms = ['facebook', 'instagram']
  const isConnected = connectedPlatforms.includes(platform)
  
  return c.json({
    platform,
    connected: isConnected,
    stats: isConnected ? {
      followers: Math.floor(Math.random() * 10000) + 1000,
      engagement: (Math.random() * 5 + 1).toFixed(1),
      posts: Math.floor(Math.random() * 100) + 10
    } : { followers: 0, engagement: 0, posts: 0 }
  })
})

app.post('/api/social/:platform/connect', async (c) => {
  const platform = c.req.param('platform')
  
  // Simulate OAuth process
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return c.json({
    success: true,
    message: `تم ربط ${platform} بنجاح (وضع تجريبي)`,
    platform,
    // In real implementation, this would be the OAuth URL
    auth_url: null // Simulate direct connection for demo
  })
})

app.post('/api/social/:platform/disconnect', async (c) => {
  const platform = c.req.param('platform')
  
  return c.json({
    success: true,
    message: `تم قطع الاتصال مع ${platform}`,
    platform
  })
})

app.post('/api/social/post', async (c) => {
  const { content, platforms, image } = await c.req.json()
  
  // Simulate posting to multiple platforms
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  return c.json({
    success: true,
    message: `تم نشر المنشور على ${platforms.join(', ')} بنجاح`,
    data: {
      content,
      platforms,
      post_ids: platforms.map(p => `${p}_${Date.now()}`),
      posted_at: new Date().toISOString()
    }
  })
})

app.get('/api/social/scheduled', (c) => {
  return c.json({
    posts: [
      {
        id: 1,
        content: 'منشور ترويجي للمنتج الجديد مع عرض خاص لفترة محدودة',
        platforms: ['facebook', 'instagram', 'twitter'],
        scheduled_date: '2024-01-20',
        scheduled_time: '14:00',
        status: 'scheduled'
      },
      {
        id: 2,
        content: 'شكراً لجميع عملائنا على ثقتهم ودعمهم المستمر',
        platforms: ['facebook', 'linkedin'],
        scheduled_date: '2024-01-22',
        scheduled_time: '10:30',
        status: 'scheduled'
      }
    ]
  })
})

app.get('/api/social/top-posts', (c) => {
  return c.json({
    posts: [
      {
        id: 1,
        platform: 'facebook',
        content: 'أفضل استراتيجيات التسويق الرقمي لعام 2024',
        likes: 1250,
        shares: 340,
        comments: 89,
        engagement_rate: 4.2
      },
      {
        id: 2,
        platform: 'instagram',
        content: 'صور من خلف الكواليس لفريق العمل',
        likes: 890,
        shares: 156,
        comments: 67,
        engagement_rate: 3.8
      },
      {
        id: 3,
        platform: 'linkedin',
        content: 'نصائح مهمة لرواد الأعمال المبتدئين',
        likes: 567,
        shares: 234,
        comments: 45,
        engagement_rate: 5.1
      }
    ]
  })
})

app.get('/api/social/activity', (c) => {
  return c.json({
    activities: [
      {
        id: 1,
        platform: 'facebook',
        content: 'نشكركم على تفاعلكم الرائع مع منشوراتنا',
        engagement: { likes: 245, shares: 67, comments: 23 },
        posted_at: '2024-01-15 14:30',
        status: 'published'
      },
      {
        id: 2,
        platform: 'instagram',
        content: 'صورة جديدة من مكتبنا الجديد في الرياض',
        engagement: { likes: 432, shares: 89, comments: 34 },
        posted_at: '2024-01-15 12:15',
        status: 'published'
      },
      {
        id: 3,
        platform: 'twitter',
        content: 'نحن متحمسون لإعلان شراكتنا الجديدة!',
        engagement: { likes: 156, shares: 78, comments: 12 },
        posted_at: '2024-01-15 10:45',
        status: 'published'
      },
      {
        id: 4,
        platform: 'linkedin',
        content: 'مقال جديد: كيفية بناء استراتيجية تسويق فعالة',
        engagement: { likes: 89, shares: 145, comments: 56 },
        posted_at: '2024-01-14 16:20',
        status: 'published'
      }
    ]
  })
})

// Main application with new sidebar structure
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Marketing Pro - منصة إدارة التسويق الشاملة</title>
        
        <!-- Styles -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <link rel="stylesheet" href="/styles/design-system.css">
        
        <!-- Tailwind Configuration -->
        <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: '#3b82f6',
                secondary: '#10b981',
                warning: '#f59e0b',
                danger: '#ef4444'
              },
              fontFamily: {
                sans: ['Segoe UI', 'Cairo', 'Noto Sans Arabic', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
              }
            }
          },
          plugins: []
        }
        </script>
        
        <style>
        /* Additional custom styles for the enhanced sidebar */
        body {
          font-family: 'Segoe UI', 'Cairo', 'Noto Sans Arabic', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f7f9fc;
          overflow-x: hidden;
        }
        
        /* Smooth transitions */
        * {
          box-sizing: border-box;
        }
        
        /* Loading animation */
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* Chart canvas styling */
        canvas {
          max-width: 100%;
          height: auto;
        }
        
        /* Responsive improvements */
        @media (max-width: 640px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
          
          .grid.md\\:grid-cols-3 {
            grid-template-columns: 1fr;
          }
          
          .grid.lg\\:grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
        </style>
    </head>
    <body>
        <!-- Application will be rendered here by JavaScript -->
        <div id="app-loading" class="flex items-center justify-center min-h-screen">
            <div class="text-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 class="text-xl font-bold text-gray-800 mb-2">Marketing Pro</h2>
                <p class="text-gray-600">جارٍ تحميل لوحة التحكم...</p>
            </div>
        </div>

        <!-- JavaScript Dependencies -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        
        <!-- Application Components -->
        <script src="/components/sidebar.js"></script>
        <script src="/pages/dashboard.js"></script>
        <script src="/pages/email.js"></script>
        <script src="/pages/whatsapp.js"></script>
        <script src="/pages/social-media.js"></script>
        
        <!-- Placeholder components for other pages -->
        <script>
        // Placeholder components for other sections
        window.MarketingStrategyPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">استراتيجية التسويق</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير هذا القسم لإدارة استراتيجيات التسويق</p>
                </div>
              </div>
            \`;
          }
        };

        window.ClientsPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">إدارة العملاء</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير هذا القسم لإدارة بيانات العملاء</p>
                </div>
              </div>
            \`;
          }
        };

        window.CampaignsPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">الحملات</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير هذا القسم لإدارة الحملات التسويقية</p>
                </div>
              </div>
            \`;
          }
        };

        // SocialMediaPage is loaded from separate file

        window.ContentCreatorPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">منشيء المحتوى</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير أدوات إنشاء المحتوى بالذكاء الاصطناعي</p>
                </div>
              </div>
            \`;
          }
        };

        window.AIToolsPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">أدوات الذكاء الاصطناعي</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير أدوات الذكاء الاصطناعي المتقدمة</p>
                </div>
              </div>
            \`;
          }
        };

        window.ContentCalendarPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">تقويم المحتوى</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير تقويم تخطيط ونشر المحتوى</p>
                </div>
              </div>
            \`;
          }
        };

        window.SmartAssistantPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">المساعد الذكي</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير المساعد الذكي لأتمتة المهام</p>
                </div>
              </div>
            \`;
          }
        };

        window.IntegrationsPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">التكامل مع المنصات</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير تكاملات مع APIs خارجية وأدوات الذكاء الاصطناعي</p>
                </div>
              </div>
            \`;
          }
        };

        window.BrandSettingsPage = {
          render() {
            return \`
              <div class="max-w-7xl mx-auto">
                <h1 class="text-h1 font-bold mb-4">إعدادات الهوية البصرية</h1>
                <div class="card">
                  <h2 class="text-h2 mb-4">قريباً</h2>
                  <p>سيتم تطوير إدارة الشعار وألوان العلامة التجارية</p>
                </div>
              </div>
            \`;
          }
        };
        </script>

        <!-- Application Initialization -->
        <script>
        // Initialize app when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
          // Hide loading screen
          const loading = document.getElementById('app-loading');
          if (loading) {
            loading.style.display = 'none';
          }
          
          // Initialize sidebar (sidebar.js will handle the rest)
          console.log('Marketing Pro initialized with enhanced sidebar!');
        });
        </script>
    </body>
    </html>
  `)
})

export default app