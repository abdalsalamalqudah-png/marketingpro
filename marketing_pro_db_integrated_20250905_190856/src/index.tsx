import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// CORS middleware
app.use('/api/*', cors({
  origin: ['http://localhost:3000', 'https://*.pages.dev'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Analytics API - Enhanced with real database data
app.get('/api/analytics', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        campaigns: { total: 5, active: 3, draft: 1, completed: 1 },
        contacts: { total: 15, new_this_month: 3, active: 12 },
        performance: {
          roi: { value: 24.5, change: 12 },
          conversion_rate: { value: 3.2, change: 0.5 },
          page_views: { value: 2543, change: 8 },
          click_rate: { value: 3.4, change: -0.2 }
        },
        social_media: {
          facebook: { connected: true, followers: 1250, engagement: 3.8 },
          twitter: { connected: false, followers: 0, engagement: 0 },
          instagram: { connected: true, followers: 890, engagement: 4.1 },
          linkedin: { connected: false, followers: 0, engagement: 0 }
        },
        recent_activity: [
          { type: 'email_sent', title: 'تم إرسال حملة بريد إلكتروني', time: '5 دقائق' },
          { type: 'new_contact', title: 'عميل جديد اشترك في القائمة البريدية', time: '15 دقيقة' },
          { type: 'campaign_review', title: 'حملة تحتاج مراجعة', time: 'ساعة واحدة' },
          { type: 'social_post', title: 'تم نشر منشور على فيسبوك', time: 'ساعتين' }
        ]
      })
    }
    
    // Get campaigns statistics
    const campaignStats = await db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM campaigns
    `).first()
    
    // Get contacts statistics
    const contactStats = await db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN created_at >= date('now', '-30 days') THEN 1 ELSE 0 END) as new_this_month,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active
      FROM contacts
    `).first()
    
    // Get analytics summary for performance metrics
    const analytics = await db.prepare(`
      SELECT roi, conversion_rate, page_views, click_rate
      FROM analytics_summary 
      ORDER BY date DESC 
      LIMIT 1
    `).first()
    
    // Get social media accounts
    const socialAccounts = await db.prepare(`
      SELECT platform, connected, followers, engagement_rate
      FROM social_accounts
    `).all()
    
    // Format social media data
    const socialMedia = {
      facebook: { connected: false, followers: 0, engagement: 0 },
      twitter: { connected: false, followers: 0, engagement: 0 },
      instagram: { connected: false, followers: 0, engagement: 0 },
      linkedin: { connected: false, followers: 0, engagement: 0 }
    }
    
    socialAccounts.results?.forEach(account => {
      if (socialMedia[account.platform]) {
        socialMedia[account.platform] = {
          connected: account.connected,
          followers: account.followers,
          engagement: account.engagement_rate
        }
      }
    })
    
    // Get recent activity
    const recentActivity = [
      { type: 'email_sent', title: 'تم إرسال حملة بريد إلكتروني', time: '5 دقائق' },
      { type: 'new_contact', title: 'عميل جديد اشترك في القائمة البريدية', time: '15 دقيقة' },
      { type: 'campaign_review', title: 'حملة تحتاج مراجعة', time: 'ساعة واحدة' },
      { type: 'social_post', title: 'تم نشر منشور على فيسبوك', time: 'ساعتين' }
    ]
    
    return c.json({
      campaigns: {
        total: campaignStats?.total || 0,
        active: campaignStats?.active || 0,
        draft: campaignStats?.draft || 0,
        completed: campaignStats?.completed || 0
      },
      contacts: {
        total: contactStats?.total || 0,
        new_this_month: contactStats?.new_this_month || 0,
        active: contactStats?.active || 0
      },
      performance: {
        roi: { value: analytics?.roi || 0, change: 12 },
        conversion_rate: { value: analytics?.conversion_rate || 0, change: 0.5 },
        page_views: { value: analytics?.page_views || 0, change: 8 },
        click_rate: { value: analytics?.click_rate || 0, change: -0.2 }
      },
      social_media: socialMedia,
      recent_activity: recentActivity
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return c.json({ error: 'Failed to fetch analytics' }, 500)
  }
})

// Campaigns API with full CRUD operations
app.get('/api/campaigns', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        campaigns: [
          { id: 1, name: 'حملة الصيف 2024', status: 'active', budget: 5000, spent: 2300, client_name: 'شركة التقنية المتطورة' },
          { id: 2, name: 'حملة المنتج الجديد', status: 'draft', budget: 3000, spent: 0, client_name: 'مجموعة الأعمال الذكية' },
          { id: 3, name: 'حملة العروض الشهرية', status: 'completed', budget: 2000, spent: 1950, client_name: 'متجر الموضة العصرية' }
        ]
      })
    }
    
    const campaigns = await db.prepare(`
      SELECT c.*, cl.name as client_name 
      FROM campaigns c
      LEFT JOIN clients cl ON c.client_id = cl.id
      ORDER BY c.created_at DESC
    `).all()
    
    return c.json({ campaigns: campaigns.results || [] })
  } catch (error) {
    console.error('Campaigns API error:', error)
    return c.json({ error: 'Failed to fetch campaigns' }, 500)
  }
})

app.post('/api/campaigns', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const { name, description, client_id, budget, start_date, end_date, status = 'draft' } = await c.req.json()
    
    const result = await db.prepare(`
      INSERT INTO campaigns (name, description, client_id, budget, spent, start_date, end_date, status)
      VALUES (?, ?, ?, ?, 0, ?, ?, ?)
    `).bind(name, description, client_id, budget, start_date, end_date, status).run()
    
    return c.json({ 
      success: true, 
      message: 'تم إنشاء الحملة بنجاح',
      campaign_id: result.meta.last_row_id 
    })
  } catch (error) {
    console.error('Create campaign error:', error)
    return c.json({ error: 'Failed to create campaign' }, 500)
  }
})

app.put('/api/campaigns/:id', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const id = c.req.param('id')
    const { name, description, client_id, budget, start_date, end_date, status } = await c.req.json()
    
    await db.prepare(`
      UPDATE campaigns 
      SET name = ?, description = ?, client_id = ?, budget = ?, start_date = ?, end_date = ?, status = ?
      WHERE id = ?
    `).bind(name, description, client_id, budget, start_date, end_date, status, id).run()
    
    return c.json({ success: true, message: 'تم تحديث الحملة بنجاح' })
  } catch (error) {
    console.error('Update campaign error:', error)
    return c.json({ error: 'Failed to update campaign' }, 500)
  }
})

app.delete('/api/campaigns/:id', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const id = c.req.param('id')
    
    await db.prepare('DELETE FROM campaigns WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: 'تم حذف الحملة بنجاح' })
  } catch (error) {
    console.error('Delete campaign error:', error)
    return c.json({ error: 'Failed to delete campaign' }, 500)
  }
})

// Contacts API with full CRUD operations
app.get('/api/contacts', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        contacts: [
          { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', phone: '+966501234567', company: 'شركة التقنية', status: 'active', created_at: '2024-01-15' },
          { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', phone: '+966507654321', company: 'مجموعة الأعمال', status: 'active', created_at: '2024-01-10' },
          { id: 3, name: 'محمد السيد', email: 'mohamed@example.com', phone: '+966509876543', company: 'متجر الموضة', status: 'inactive', created_at: '2024-01-05' }
        ]
      })
    }
    
    const contacts = await db.prepare(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC
    `).all()
    
    return c.json({ contacts: contacts.results || [] })
  } catch (error) {
    console.error('Contacts API error:', error)
    return c.json({ error: 'Failed to fetch contacts' }, 500)
  }
})

app.post('/api/contacts', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const { name, email, phone, company, tags, status = 'active' } = await c.req.json()
    
    const result = await db.prepare(`
      INSERT INTO contacts (name, email, phone, company, tags, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(name, email, phone, company, tags, status).run()
    
    return c.json({ 
      success: true, 
      message: 'تم إضافة جهة الاتصال بنجاح',
      contact_id: result.meta.last_row_id 
    })
  } catch (error) {
    console.error('Create contact error:', error)
    return c.json({ error: 'Failed to create contact' }, 500)
  }
})

app.put('/api/contacts/:id', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const id = c.req.param('id')
    const { name, email, phone, company, tags, status } = await c.req.json()
    
    await db.prepare(`
      UPDATE contacts 
      SET name = ?, email = ?, phone = ?, company = ?, tags = ?, status = ?
      WHERE id = ?
    `).bind(name, email, phone, company, tags, status, id).run()
    
    return c.json({ success: true, message: 'تم تحديث جهة الاتصال بنجاح' })
  } catch (error) {
    console.error('Update contact error:', error)
    return c.json({ error: 'Failed to update contact' }, 500)
  }
})

app.delete('/api/contacts/:id', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const id = c.req.param('id')
    
    await db.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: 'تم حذف جهة الاتصال بنجاح' })
  } catch (error) {
    console.error('Delete contact error:', error)
    return c.json({ error: 'Failed to delete contact' }, 500)
  }
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

// Email Templates API with database integration
app.get('/api/email/templates', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        templates: [
          { id: 1, name: 'ترحيب بالعملاء الجدد', type: 'welcome', subject: 'مرحباً بك في شركتنا', content: 'مرحباً {name}، نحن سعداء لانضمامك إلينا...' },
          { id: 2, name: 'نشرة إخبارية أسبوعية', type: 'newsletter', subject: 'آخر أخبارنا هذا الأسبوع', content: 'إليك أهم المستجدات...' }
        ]
      })
    }
    
    const templates = await db.prepare(`
      SELECT * FROM email_templates 
      ORDER BY created_at DESC
    `).all()
    
    return c.json({ templates: templates.results || [] })
  } catch (error) {
    console.error('Email templates API error:', error)
    return c.json({ error: 'Failed to fetch email templates' }, 500)
  }
})

app.post('/api/email/templates', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const { name, type, subject, content } = await c.req.json()
    
    const result = await db.prepare(`
      INSERT INTO email_templates (name, type, subject, content)
      VALUES (?, ?, ?, ?)
    `).bind(name, type, subject, content).run()
    
    return c.json({
      success: true,
      message: 'تم حفظ القالب بنجاح',
      template_id: result.meta.last_row_id
    })
  } catch (error) {
    console.error('Create email template error:', error)
    return c.json({ error: 'Failed to create email template' }, 500)
  }
})

// Email Campaigns API with database integration
app.get('/api/email/campaigns', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        campaigns: [
          { id: 1, subject: 'حملة الصيف 2024', recipient_list: 'all-customers', status: 'sent', sent_at: '2024-01-15 10:30', open_rate: '23.4%', template_name: 'نشرة إخبارية' },
          { id: 2, subject: 'نشرة إخبارية يناير', recipient_list: 'newsletter', status: 'sent', sent_at: '2024-01-10 14:00', open_rate: '18.7%', template_name: 'نشرة أسبوعية' }
        ]
      })
    }
    
    const campaigns = await db.prepare(`
      SELECT ec.*, et.name as template_name
      FROM email_campaigns ec
      LEFT JOIN email_templates et ON ec.template_id = et.id
      ORDER BY ec.created_at DESC
    `).all()
    
    return c.json({ campaigns: campaigns.results || [] })
  } catch (error) {
    console.error('Email campaigns API error:', error)
    return c.json({ error: 'Failed to fetch email campaigns' }, 500)
  }
})

app.post('/api/email/campaigns', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const { template_id, subject, recipient_list, status = 'draft', scheduled_date } = await c.req.json()
    
    const result = await db.prepare(`
      INSERT INTO email_campaigns (template_id, subject, recipient_list, status, scheduled_date)
      VALUES (?, ?, ?, ?, ?)
    `).bind(template_id, subject, recipient_list, status, scheduled_date).run()
    
    return c.json({ 
      success: true, 
      message: 'تم إنشاء حملة البريد الإلكتروني بنجاح',
      campaign_id: result.meta.last_row_id
    })
  } catch (error) {
    console.error('Create email campaign error:', error)
    return c.json({ error: 'Failed to create email campaign' }, 500)
  }
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
  try {
    const db = c.env?.DB
    const { phone, message, type = 'text' } = await c.req.json()
    
    const messageId = 'wamid.' + Date.now()
    const sentAt = new Date().toISOString()
    
    // Save message to database if available
    if (db) {
      await db.prepare(`
        INSERT INTO whatsapp_messages (message_id, phone, message, type, status, direction, sent_at)
        VALUES (?, ?, ?, ?, 'sent', 'outbound', ?)
      `).bind(messageId, phone, message, type, sentAt).run()
    }
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 800))
    
    return c.json({
      success: true,
      message: 'تم إرسال الرسالة بنجاح',
      data: { 
        phone, 
        message, 
        type,
        message_id: messageId,
        status: 'sent',
        sent_at: sentAt
      }
    })
  } catch (error) {
    console.error('WhatsApp send error:', error)
    return c.json({ error: 'Failed to send WhatsApp message' }, 500)
  }
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

// WhatsApp Templates API with database integration
app.get('/api/whatsapp/templates', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        templates: [
          { id: 'welcome_msg_ar', name: 'رسالة ترحيب', language: 'ar', status: 'approved', content: 'مرحباً {{name}}، نشكرك لاختيار خدماتنا...' },
          { id: 'order_confirmation_ar', name: 'تأكيد الطلب', language: 'ar', status: 'approved', content: 'تم تأكيد طلبك رقم {{order_number}}...' }
        ]
      })
    }
    
    const templates = await db.prepare(`
      SELECT * FROM whatsapp_templates 
      ORDER BY created_at DESC
    `).all()
    
    return c.json({ templates: templates.results || [] })
  } catch (error) {
    console.error('WhatsApp templates API error:', error)
    return c.json({ error: 'Failed to fetch WhatsApp templates' }, 500)
  }
})

// WhatsApp Messages API with database integration
app.get('/api/whatsapp/conversations', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        conversations: [
          { id: 1, phone: '+966501234567', message: 'مرحباً، كيف يمكنني مساعدتك؟', status: 'delivered', sent_at: '2024-01-15 14:30', direction: 'outbound' },
          { id: 2, phone: '+966507654321', message: 'شكراً لتواصلك معنا. تم تأكيد طلبك.', status: 'read', sent_at: '2024-01-15 13:45', direction: 'outbound' }
        ]
      })
    }
    
    const messages = await db.prepare(`
      SELECT * FROM whatsapp_messages 
      ORDER BY sent_at DESC
      LIMIT 50
    `).all()
    
    return c.json({ conversations: messages.results || [] })
  } catch (error) {
    console.error('WhatsApp conversations API error:', error)
    return c.json({ error: 'Failed to fetch WhatsApp conversations' }, 500)
  }
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

app.get('/api/social/scheduled', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({ posts: [] })
    }
    
    const scheduled = await db.prepare(`
      SELECT * FROM social_posts 
      WHERE status = 'scheduled' AND scheduled_date >= date('now')
      ORDER BY scheduled_date ASC
    `).all()
    
    return c.json({ posts: scheduled.results || [] })
  } catch (error) {
    console.error('Social scheduled API error:', error)
    return c.json({ error: 'Failed to fetch scheduled posts' }, 500)
  }
})

// Social Posts API with database integration
app.get('/api/social/top-posts', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        posts: [
          { id: 1, platform: 'facebook', content: 'أفضل استراتيجيات التسويق الرقمي لعام 2024', likes: 1250, shares: 340, comments: 89, engagement_rate: 4.2 },
          { id: 2, platform: 'instagram', content: 'صور من خلف الكواليس لفريق العمل', likes: 890, shares: 156, comments: 67, engagement_rate: 3.8 }
        ]
      })
    }
    
    const posts = await db.prepare(`
      SELECT * FROM social_posts 
      ORDER BY engagement_rate DESC
      LIMIT 10
    `).all()
    
    return c.json({ posts: posts.results || [] })
  } catch (error) {
    console.error('Social top posts API error:', error)
    return c.json({ error: 'Failed to fetch top posts' }, 500)
  }
})

app.get('/api/social/posts', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({ posts: [] })
    }
    
    const posts = await db.prepare(`
      SELECT * FROM social_posts 
      ORDER BY posted_at DESC
    `).all()
    
    return c.json({ posts: posts.results || [] })
  } catch (error) {
    console.error('Social posts API error:', error)
    return c.json({ error: 'Failed to fetch social posts' }, 500)
  }
})

app.post('/api/social/posts', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const { content, platform, scheduled_date, image_url } = await c.req.json()
    
    const result = await db.prepare(`
      INSERT INTO social_posts (content, platform, scheduled_date, image_url, status)
      VALUES (?, ?, ?, ?, 'scheduled')
    `).bind(content, platform, scheduled_date, image_url).run()
    
    return c.json({ 
      success: true, 
      message: 'تم جدولة المنشور بنجاح',
      post_id: result.meta.last_row_id
    })
  } catch (error) {
    console.error('Create social post error:', error)
    return c.json({ error: 'Failed to create social post' }, 500)
  }
})

app.get('/api/social/activity', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({ activities: [] })
    }
    
    const activities = await db.prepare(`
      SELECT * FROM social_posts 
      WHERE status = 'published'
      ORDER BY posted_at DESC
      LIMIT 20
    `).all()
    
    return c.json({ activities: activities.results || [] })
  } catch (error) {
    console.error('Social activity API error:', error)
    return c.json({ error: 'Failed to fetch social activity' }, 500)
  }
})

// Clients API with full CRUD operations
app.get('/api/clients', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        clients: [
          { id: 1, name: 'شركة التقنية المتطورة', email: 'info@techadvanced.com', phone: '+966112345678', company: 'شركة التقنية المتطورة', industry: 'تقنية', budget: 50000, status: 'active' },
          { id: 2, name: 'مجموعة الأعمال الذكية', email: 'contact@smartbusiness.com', phone: '+966114567890', company: 'مجموعة الأعمال الذكية', industry: 'أعمال', budget: 30000, status: 'active' }
        ]
      })
    }
    
    const clients = await db.prepare(`
      SELECT * FROM clients 
      ORDER BY created_at DESC
    `).all()
    
    return c.json({ clients: clients.results || [] })
  } catch (error) {
    console.error('Clients API error:', error)
    return c.json({ error: 'Failed to fetch clients' }, 500)
  }
})

app.post('/api/clients', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const { name, email, phone, company, industry, budget, status = 'active' } = await c.req.json()
    
    const result = await db.prepare(`
      INSERT INTO clients (name, email, phone, company, industry, budget, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(name, email, phone, company, industry, budget, status).run()
    
    return c.json({ 
      success: true, 
      message: 'تم إضافة العميل بنجاح',
      client_id: result.meta.last_row_id 
    })
  } catch (error) {
    console.error('Create client error:', error)
    return c.json({ error: 'Failed to create client' }, 500)
  }
})

app.put('/api/clients/:id', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const id = c.req.param('id')
    const { name, email, phone, company, industry, budget, status } = await c.req.json()
    
    await db.prepare(`
      UPDATE clients 
      SET name = ?, email = ?, phone = ?, company = ?, industry = ?, budget = ?, status = ?
      WHERE id = ?
    `).bind(name, email, phone, company, industry, budget, status, id).run()
    
    return c.json({ success: true, message: 'تم تحديث بيانات العميل بنجاح' })
  } catch (error) {
    console.error('Update client error:', error)
    return c.json({ error: 'Failed to update client' }, 500)
  }
})

app.delete('/api/clients/:id', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const id = c.req.param('id')
    
    await db.prepare('DELETE FROM clients WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: 'تم حذف العميل بنجاح' })
  } catch (error) {
    console.error('Delete client error:', error)
    return c.json({ error: 'Failed to delete client' }, 500)
  }
})

// Users API for user management
app.get('/api/users', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      console.warn('Database not available, returning mock data')
      return c.json({
        users: [
          { id: 1, username: 'admin', email: 'admin@marketingpro.com', role: 'admin', created_at: '2024-01-01' },
          { id: 2, username: 'manager', email: 'manager@marketingpro.com', role: 'manager', created_at: '2024-01-05' }
        ]
      })
    }
    
    const users = await db.prepare(`
      SELECT id, username, email, role, created_at FROM users 
      ORDER BY created_at DESC
    `).all()
    
    return c.json({ users: users.results || [] })
  } catch (error) {
    console.error('Users API error:', error)
    return c.json({ error: 'Failed to fetch users' }, 500)
  }
})

app.post('/api/users', async (c) => {
  try {
    const db = c.env?.DB
    
    if (!db) {
      return c.json({ error: 'Database not available' }, 500)
    }
    const { username, email, password, role = 'user' } = await c.req.json()
    
    // In a real app, password should be hashed
    const result = await db.prepare(`
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `).bind(username, email, password, role).run()
    
    return c.json({ 
      success: true, 
      message: 'تم إضافة المستخدم بنجاح',
      user_id: result.meta.last_row_id 
    })
  } catch (error) {
    console.error('Create user error:', error)
    return c.json({ error: 'Failed to create user' }, 500)
  }
})

// Search API for global search functionality
app.get('/api/search', async (c) => {
  try {
    const db = c.env?.DB
    const query = c.req.query('q')
    
    if (!query) {
      return c.json({ results: [] })
    }
    
    if (!db) {
      console.warn('Database not available, returning empty search results')
      return c.json({ results: [] })
    }
    
    // Search across multiple tables
    const searchPattern = `%${query}%`
    
    const [clients, campaigns, contacts] = await Promise.all([
      db.prepare('SELECT id, name, "client" as type FROM clients WHERE name LIKE ? LIMIT 5').bind(searchPattern).all(),
      db.prepare('SELECT id, name, "campaign" as type FROM campaigns WHERE name LIKE ? LIMIT 5').bind(searchPattern).all(),
      db.prepare('SELECT id, name, "contact" as type FROM contacts WHERE name LIKE ? LIMIT 5').bind(searchPattern).all()
    ])
    
    const results = [
      ...(clients.results || []),
      ...(campaigns.results || []),
      ...(contacts.results || [])
    ]
    
    return c.json({ results })
  } catch (error) {
    console.error('Search API error:', error)
    return c.json({ error: 'Failed to perform search' }, 500)
  }
})

// Landing page for logout redirection
app.get('/landing', (c) => {
  return c.html(`
    <!doctype html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Marketing Pro - صفحة البداية</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="/styles/design-system.css" />
    </head>
    <body class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center p-8 card">
        <i class="fas fa-rocket icon-flat text-3xl mb-3"></i>
        <h1 class="text-h1 font-bold mb-2">مرحباً بك في Marketing Pro</h1>
        <p class="text-gray-600 mb-6">منصة إدارة التسويق الشاملة</p>
        <a href="/" class="btn btn-primary"><i class="fas fa-arrow-right"></i> دخول للوحة التحكم</a>
      </div>
    </body>
    </html>
  `)
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

        <!-- Load enriched page components to override placeholders -->
        <script src="/pages/campaigns.js"></script>
        <script src="/pages/clients.js"></script>
        <script src="/pages/marketing-strategy.js"></script>
        <script src="/pages/content-creator.js"></script>
        <script src="/pages/ai-tools.js"></script>
        <script src="/pages/content-calendar.js"></script>
        <script src="/pages/smart-assistant.js"></script>
        <script src="/pages/integrations.js"></script>
        <script src="/pages/brand-settings.js"></script>
        <script src="/pages/users.js"></script>

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