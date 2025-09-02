import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import type { Bindings } from '../types';

const simpleAuth = new Hono<{ Bindings: Bindings }>();

// Simple registration for testing
simpleAuth.post('/register', async (c) => {
  try {
    console.log('Registration attempt started');
    
    const body = await c.req.json();
    console.log('Request body:', body);
    
    const { name, email, password, team_name, team_slug } = body;

    if (!name || !email || !password || !team_name || !team_slug) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Check if database is available
    if (!c.env.DB) {
      return c.json({ error: 'Database not available' }, 503);
    }

    console.log('Database check passed');

    // Test database connection
    await c.env.DB.prepare('SELECT 1').first();
    console.log('Database connection test passed');

    // Check if team slug exists
    const existingTeam = await c.env.DB.prepare('SELECT id FROM teams WHERE slug = ?')
      .bind(team_slug).first();
      
    if (existingTeam) {
      return c.json({ error: 'Team slug already taken' }, 409);
    }

    // Check if user exists
    const existingUser = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email).first();
      
    if (existingUser) {
      return c.json({ error: 'User already exists' }, 409);
    }

    console.log('Validation checks passed');

    // Create team
    const teamResult = await c.env.DB.prepare(`
      INSERT INTO teams (name, slug, plan, settings)
      VALUES (?, ?, 'free', '{}')
      RETURNING id, name, slug, plan
    `).bind(team_name, team_slug).first();

    if (!teamResult) {
      return c.json({ error: 'Failed to create team' }, 500);
    }

    console.log('Team created:', teamResult);

    // Simple password hash (for demo)
    const password_hash = btoa(password + 'salt');

    // Create user
    const userResult = await c.env.DB.prepare(`
      INSERT INTO users (email, name, password_hash, role, team_id, settings)
      VALUES (?, ?, ?, 'admin', ?, '{}')
      RETURNING id, email, name, role, team_id
    `).bind(email, name, password_hash, teamResult.id).first();

    if (!userResult) {
      return c.json({ error: 'Failed to create user' }, 500);
    }

    console.log('User created:', userResult);

    // Generate simple token
    const token = btoa(JSON.stringify({
      user_id: userResult.id,
      email: userResult.email,
      iat: Date.now()
    }));

    // Set cookie
    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60
    });

    return c.json({
      success: true,
      message: 'Registration successful!',
      user: {
        id: userResult.id,
        name: userResult.name,
        email: userResult.email,
        role: userResult.role,
        team_id: userResult.team_id
      },
      team: {
        id: teamResult.id,
        name: teamResult.name,
        slug: teamResult.slug,
        plan: teamResult.plan
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ 
      error: 'Registration failed', 
      message: error instanceof Error ? error.message : String(error) 
    }, 500);
  }
});

// Simple login for testing
simpleAuth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password required' }, 400);
    }

    if (!c.env.DB) {
      return c.json({ error: 'Database not available' }, 503);
    }

    // Get user with team info
    const user = await c.env.DB.prepare(`
      SELECT u.*, t.name as team_name, t.slug as team_slug
      FROM users u
      JOIN teams t ON u.team_id = t.id
      WHERE u.email = ?
    `).bind(email).first();

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Simple password check
    const expected_hash = btoa(password + 'salt');
    if (user.password_hash !== expected_hash) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate token
    const token = btoa(JSON.stringify({
      user_id: user.id,
      email: user.email,
      iat: Date.now()
    }));

    setCookie(c, 'auth_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60
    });

    return c.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        team_id: user.team_id
      },
      team: {
        name: user.team_name,
        slug: user.team_slug
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Test route
simpleAuth.get('/test', async (c) => {
  try {
    if (!c.env.DB) {
      return c.json({ error: 'Database not available' }, 503);
    }
    
    // Test database connection
    const result = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first();
    console.log('Test route - database query result:', result);
    
    return c.json({ 
      success: true, 
      message: 'Simple auth is working!', 
      database: 'connected',
      user_count: result.count
    });
  } catch (error) {
    console.error('Test route error:', error);
    return c.json({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// Get current user
simpleAuth.get('/me', async (c) => {
  try {
    // Check for auth token in cookies
    const token = c.req.cookie('auth_token');
    
    if (!token) {
      return c.json({ error: 'Not authenticated' }, 401);
    }

    // Decode and validate token
    let decoded;
    try {
      console.log('Attempting to decode token:', token);
      decoded = JSON.parse(atob(token));
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.error('Token decode error:', error);
      return c.json({ error: 'Invalid token format', debug: error.message }, 401);
    }

    if (!decoded.user_id || !decoded.email) {
      return c.json({ error: 'Invalid token format' }, 401);
    }

    // Check if database is available
    if (!c.env.DB) {
      return c.json({ error: 'Database not available' }, 503);
    }

    // Get user with team info
    const user = await c.env.DB.prepare(`
      SELECT u.*, t.name as team_name, t.slug as team_slug, t.plan as team_plan
      FROM users u
      JOIN teams t ON u.team_id = t.id
      WHERE u.id = ? AND u.email = ?
    `).bind(decoded.user_id, decoded.email).first();

    if (!user) {
      return c.json({ error: 'User not found' }, 401);
    }

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
        id: user.team_id,
        name: user.team_name,
        slug: user.team_slug,
        plan: user.team_plan
      }
    });

  } catch (error) {
    console.error('Me endpoint error:', error);
    return c.json({ error: 'Authentication check failed' }, 500);
  }
});

// Logout
simpleAuth.post('/logout', async (c) => {
  // Clear the auth cookie
  setCookie(c, 'auth_token', '', {
    httpOnly: true,
    maxAge: 0, // Delete the cookie
    path: '/'
  });
  
  return c.json({ success: true, message: 'Logged out successfully' });
});

export default simpleAuth;