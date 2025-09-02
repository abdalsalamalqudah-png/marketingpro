import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { jwt } from 'hono/jwt';
import type { User, Bindings } from '../types';

export interface AuthContext extends Context {
  env: Bindings;
  get: {
    user?: User;
    team_id?: number;
  };
}

// JWT Secret (in production, use environment variable)
const JWT_SECRET = 'marketing-pro-jwt-secret-key-2024';

// Middleware to verify JWT token
export const authMiddleware = async (c: AuthContext, next: Next) => {
  try {
    // Get token from cookie or Authorization header
    const token = getCookie(c, 'auth_token') || 
                 c.req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Verify simple token (for development)
    let payload: { user_id: number; email: string };
    try {
      const tokenData = atob(token);
      payload = JSON.parse(tokenData);
    } catch {
      return c.json({ error: 'Invalid token format' }, 401);
    }
    
    if (!payload?.user_id) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Get user from database
    const user = await c.env.DB.prepare(
      `SELECT u.*, t.name as team_name, t.slug as team_slug 
       FROM users u 
       JOIN teams t ON u.team_id = t.id 
       WHERE u.id = ?`
    ).bind(payload.user_id).first();

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

    // Set user in context
    c.set('user', user as User);
    c.set('team_id', user.team_id);

    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.json({ error: 'Authentication failed' }, 401);
  }
};

// Middleware to check user role permissions
export const requireRole = (allowedRoles: string[]) => {
  return async (c: AuthContext, next: Next) => {
    const user = c.get('user');
    
    if (!user || !allowedRoles.includes(user.role)) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }
    
    await next();
  };
};

// Team isolation middleware - ensures data is scoped to user's team
export const teamIsolation = async (c: AuthContext, next: Next) => {
  const user = c.get('user');
  const team_id = c.get('team_id');
  
  if (!user || !team_id) {
    return c.json({ error: 'Team context required' }, 400);
  }

  // Add team_id to request context for use in queries
  c.set('team_id', team_id);
  
  await next();
};

// Helper function to generate JWT token
export const generateToken = async (userId: number, email: string): Promise<string> => {
  const payload = {
    user_id: userId,
    email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  };
  
  // Simple base64 token for development (replace with proper JWT in production)
  const tokenData = JSON.stringify(payload);
  return btoa(tokenData);
};

// Helper function to hash password
export const hashPassword = async (password: string): Promise<string> => {
  // In a real app, use bcrypt or similar
  // For this demo, we'll use a simple hash
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'marketing-pro-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Helper function to verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
};