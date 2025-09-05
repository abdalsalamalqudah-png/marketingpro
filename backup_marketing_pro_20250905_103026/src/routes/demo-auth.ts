import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import type { Bindings } from '../types';

const demoAuth = new Hono<{ Bindings: Bindings }>();

// Register endpoint - demo mode
demoAuth.post('/register', async (c) => {
  try {
    const { name, email, password, team_name, team_slug } = await c.req.json();

    if (!name || !email || !password || !team_name || !team_slug) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Check if database is available
    if (!c.env.DB) {
      return c.json({
        success: false,
        error: 'قاعدة البيانات غير مُعدة',
        message: 'Marketing Pro يحتاج قاعدة بيانات Cloudflare D1 للعمل بشكل كامل.',
        demo_mode: true,
        setup_instructions: {
          local: 'npx wrangler d1 create marketing-pro-production && npx wrangler d1 migrations apply marketing-pro-production --local',
          production: 'Configure D1 database in Cloudflare Dashboard'
        },
        demo_credentials: {
          note: 'بعد إعداد قاعدة البيانات، يمكنك استخدام أي بيانات صحيحة للتسجيل',
          example: {
            email: 'demo@marketingpro.com',
            password: 'demo123',
            team_slug: 'demo-team'
          }
        }
      }, 503);
    }

    // If DB exists, try to test connection
    try {
      await c.env.DB.prepare('SELECT 1 as test').first();
    } catch (dbError) {
      return c.json({
        success: false,
        error: 'خطأ في الاتصال بقاعدة البيانات',
        message: 'قاعدة البيانات موجودة لكن لم يتم تطبيق الـ migrations بعد.',
        setup_instructions: {
          local: 'npx wrangler d1 migrations apply marketing-pro-production --local',
          production: 'npx wrangler d1 migrations apply marketing-pro-production'
        }
      }, 503);
    }

    return c.json({
      error: 'Registration temporarily disabled',
      message: 'Database exists but registration logic needs to be implemented after proper setup'
    }, 501);

  } catch (error) {
    console.error('Registration error:', error);
    return c.json({
      success: false,
      error: 'Registration failed',
      message: 'حدث خطأ غير متوقع في التسجيل',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Login endpoint - demo mode
demoAuth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    // Check if database is available
    if (!c.env.DB) {
      return c.json({
        success: false,
        error: 'قاعدة البيانات غير مُعدة',
        message: 'تسجيل الدخول غير متاح بدون قاعدة البيانات.',
        demo_mode: true,
        setup_instructions: {
          local: 'npx wrangler d1 create marketing-pro-production && npx wrangler d1 migrations apply marketing-pro-production --local',
          production: 'Configure D1 database in Cloudflare Dashboard'
        }
      }, 503);
    }

    return c.json({
      error: 'Login temporarily disabled',
      message: 'Database exists but login logic needs proper database setup'
    }, 501);

  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Logout
demoAuth.post('/logout', async (c) => {
  deleteCookie(c, 'auth_token');
  return c.json({ success: true, message: 'Logged out successfully' });
});

// Get current user - demo mode
demoAuth.get('/me', async (c) => {
  return c.json({
    error: 'Not authenticated',
    message: 'Database not configured - no user sessions available'
  }, 401);
});

export default demoAuth;