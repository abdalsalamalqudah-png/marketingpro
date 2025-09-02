import { Hono } from 'hono';
import { setCookie, deleteCookie } from 'hono/cookie';
import { hashPassword, verifyPassword, generateToken } from '../middleware/auth';
import { DatabaseService } from '../utils/database';
import type { Bindings } from '../types';

const auth = new Hono<{ Bindings: Bindings }>();

// Register new user and team
auth.post('/register', async (c) => {
  try {
    const { name, email, password, team_name, team_slug } = await c.req.json();

    if (!name || !email || !password || !team_name || !team_slug) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const db = new DatabaseService(c.env.DB);

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return c.json({ error: 'User already exists' }, 409);
    }

    // Check if team slug is taken
    const existingTeam = await c.env.DB.prepare('SELECT id FROM teams WHERE slug = ?')
      .bind(team_slug).first();
    if (existingTeam) {
      return c.json({ error: 'Team slug already taken' }, 409);
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create team first
    const team = await db.createTeam(team_name, team_slug, 'free');

    // Create user as admin
    const user = await db.createUser({
      email,
      name,
      password_hash,
      role: 'admin',
      team_id: team.id
    });

    // Generate JWT token
    const token = await generateToken(user.id, user.email);

    // Set cookie
    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return c.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        team_id: user.team_id
      },
      team: {
        id: team.id,
        name: team.name,
        slug: team.slug,
        plan: team.plan
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// Login user
auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    const db = new DatabaseService(c.env.DB);

    // Get user by email
    const user = await db.getUserByEmail(email);
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Update last login
    await db.updateUserLastLogin(user.id);

    // Get team info
    const team = await db.getTeam(user.team_id);

    // Generate JWT token
    const token = await generateToken(user.id, user.email);

    // Set cookie
    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return c.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        team_id: user.team_id
      },
      team: {
        id: team?.id,
        name: team?.name,
        slug: team?.slug,
        plan: team?.plan
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Logout user
auth.post('/logout', async (c) => {
  deleteCookie(c, 'auth_token');
  return c.json({ success: true, message: 'Logged out successfully' });
});

// Get current user
auth.get('/me', async (c) => {
  try {
    // This would require auth middleware in the main app
    const user = c.get('user');
    const team_id = c.get('team_id');

    if (!user) {
      return c.json({ error: 'Not authenticated' }, 401);
    }

    const db = new DatabaseService(c.env.DB);
    const team = await db.getTeam(team_id);

    return c.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        team_id: user.team_id
      },
      team: {
        id: team?.id,
        name: team?.name,
        slug: team?.slug,
        plan: team?.plan
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Failed to get user info' }, 500);
  }
});

export default auth;