import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import type { Bindings, AnalyticsData } from '../types';

const dashboard = new Hono<{ Bindings: Bindings }>();

// Get dashboard analytics
dashboard.get('/analytics', async (c) => {
  try {
    // Set demo context when no middleware
    let team_id = c.get('team_id');
    if (!team_id) {
      c.set('team_id', 1);
      team_id = 1;
    }

    const db = new DatabaseService(c.env.DB);
    
    // Get basic analytics
    const analytics = await db.getTeamAnalytics(team_id);

    // Get recent campaign performance
    const recentCampaigns = await c.env.DB.prepare(`
      SELECT name, status, budget, spent, 
             CASE WHEN budget > 0 THEN ROUND((spent / budget) * 100, 2) ELSE 0 END as spend_rate
      FROM campaigns 
      WHERE team_id = ? AND status IN ('active', 'completed')
      ORDER BY created_at DESC 
      LIMIT 5
    `).bind(team_id).all();

    // Get funnel events for conversion rate
    const funnelStats = await c.env.DB.prepare(`
      SELECT 
        COUNT(CASE WHEN event_type = 'page_view' THEN 1 END) as page_views,
        COUNT(CASE WHEN event_type = 'form_submit' THEN 1 END) as form_submits,
        COUNT(CASE WHEN event_type = 'purchase' THEN 1 END) as purchases,
        COALESCE(SUM(CASE WHEN event_type = 'purchase' THEN revenue ELSE 0 END), 0) as total_revenue
      FROM funnel_events 
      WHERE team_id = ? 
        AND created_at >= datetime('now', '-30 days')
    `).bind(team_id).first();

    // Calculate conversion rates
    const conversion_rate = funnelStats?.page_views > 0 
      ? Math.round((funnelStats.form_submits / funnelStats.page_views) * 100 * 100) / 100
      : 0;

    const purchase_rate = funnelStats?.form_submits > 0 
      ? Math.round((funnelStats.purchases / funnelStats.form_submits) * 100 * 100) / 100
      : 0;

    // Get email performance
    const emailStats = await c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_emails,
        AVG(CASE 
          WHEN json_extract(metrics, '$.opens') IS NOT NULL 
          THEN json_extract(metrics, '$.opens') 
          ELSE 0 
        END) as avg_opens,
        AVG(CASE 
          WHEN json_extract(metrics, '$.clicks') IS NOT NULL 
          THEN json_extract(metrics, '$.clicks') 
          ELSE 0 
        END) as avg_clicks
      FROM social_posts 
      WHERE team_id = ? AND platform = 'email'
    `).bind(team_id).first();

    const email_open_rate = emailStats?.avg_opens || 0;
    const click_through_rate = emailStats?.avg_clicks || 0;

    // Calculate ROI
    const total_revenue = funnelStats?.total_revenue || 0;
    const roi = analytics.total_spent > 0 
      ? Math.round(((total_revenue - analytics.total_spent) / analytics.total_spent) * 100 * 100) / 100
      : 0;

    const dashboardData: AnalyticsData & { recent_campaigns: any[] } = {
      total_campaigns: analytics.total_campaigns,
      active_campaigns: analytics.active_campaigns,
      total_contacts: analytics.total_contacts,
      total_revenue,
      conversion_rate,
      email_open_rate,
      click_through_rate,
      roi,
      recent_campaigns: recentCampaigns.results || []
    };

    return c.json(dashboardData);

  } catch (error) {
    console.error('Dashboard analytics error:', error);
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// Get recent activity
dashboard.get('/activity', async (c) => {
  try {
    const team_id = c.get('team_id');
    if (!team_id) {
      return c.json({ error: 'Team context required' }, 400);
    }

    // Get recent campaigns
    const recentCampaigns = await c.env.DB.prepare(`
      SELECT 'campaign' as type, name as title, status, created_at
      FROM campaigns 
      WHERE team_id = ?
      ORDER BY created_at DESC 
      LIMIT 5
    `).bind(team_id).all();

    // Get recent social posts
    const recentPosts = await c.env.DB.prepare(`
      SELECT 'social_post' as type, 
             platform || ' post' as title, 
             status, 
             scheduled_at as created_at
      FROM social_posts 
      WHERE team_id = ?
      ORDER BY created_at DESC 
      LIMIT 5
    `).bind(team_id).all();

    // Get recent content items
    const recentContent = await c.env.DB.prepare(`
      SELECT 'content' as type, title, status, created_at
      FROM content_items 
      WHERE team_id = ?
      ORDER BY created_at DESC 
      LIMIT 5
    `).bind(team_id).all();

    // Combine and sort all activity
    const allActivity = [
      ...(recentCampaigns.results || []),
      ...(recentPosts.results || []),
      ...(recentContent.results || [])
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
     .slice(0, 10);

    return c.json({ activity: allActivity });

  } catch (error) {
    console.error('Dashboard activity error:', error);
    return c.json({ error: 'Failed to fetch activity' }, 500);
  }
});

// Get AI insights for dashboard
dashboard.get('/insights', async (c) => {
  try {
    const team_id = c.get('team_id');
    if (!team_id) {
      return c.json({ error: 'Team context required' }, 400);
    }

    const db = new DatabaseService(c.env.DB);
    const insights = await db.getAIInsights(team_id, 'pending', 5);

    return c.json({ insights });

  } catch (error) {
    console.error('Dashboard insights error:', error);
    return c.json({ error: 'Failed to fetch insights' }, 500);
  }
});

export default dashboard;