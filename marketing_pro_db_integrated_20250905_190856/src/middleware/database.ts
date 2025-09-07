import { Context, Next } from 'hono';
import type { Bindings } from '../types';

export interface DatabaseContext extends Context {
  env: Bindings;
}

// Middleware to check if database is available
export const databaseMiddleware = async (c: DatabaseContext, next: Next) => {
  try {
    // Check if DB binding exists
    if (!c.env.DB) {
      return c.json({
        error: 'Database not configured',
        message: 'D1 database is not set up. This is expected in development without Cloudflare configuration.',
        setup_instructions: {
          local: 'Run: npx wrangler d1 create marketing-pro-production',
          production: 'Configure D1 database in Cloudflare Dashboard'
        }
      }, 503);
    }

    // Test database connection with a simple query
    try {
      await c.env.DB.prepare('SELECT 1 as test').first();
    } catch (dbError) {
      console.error('Database connection test failed:', dbError);
      return c.json({
        error: 'Database connection failed',
        message: 'Database exists but is not responding. Migrations may not be applied.',
        setup_instructions: {
          local: 'Run: npx wrangler d1 migrations apply marketing-pro-production --local',
          production: 'Run: npx wrangler d1 migrations apply marketing-pro-production'
        }
      }, 503);
    }

    await next();
  } catch (error) {
    console.error('Database middleware error:', error);
    return c.json({
      error: 'Database system error',
      message: 'An unexpected database error occurred',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
};

// Demo mode middleware - creates mock responses when DB is not available
export const demoModeMiddleware = async (c: DatabaseContext, next: Next) => {
  try {
    await next();
  } catch (error) {
    // If it's a database error, provide demo response
    if (error instanceof Error && error.message.includes('DB')) {
      console.log('Running in demo mode - database not available');
      
      // For auth endpoints, provide demo responses
      const url = new URL(c.req.url);
      
      if (url.pathname.includes('/api/auth/register')) {
        return c.json({
          success: false,
          error: 'Demo mode - Registration disabled',
          message: 'Database not configured. This is a demo version.',
          demo_credentials: {
            email: 'demo@marketingpro.com',
            password: 'demo123',
            note: 'Use these credentials for demo login (when DB is configured)'
          }
        }, 503);
      }
      
      if (url.pathname.includes('/api/auth/login')) {
        return c.json({
          success: false,
          error: 'Demo mode - Login disabled',
          message: 'Database not configured. Configure D1 database first.',
          setup_url: 'https://developers.cloudflare.com/d1/'
        }, 503);
      }
    }
    
    throw error;
  }
};