import { Hono } from 'hono';
import { DatabaseService } from '../utils/database';
import type { Bindings } from '../types';

const campaigns = new Hono<{ Bindings: Bindings }>();

// Get all campaigns for team
campaigns.get('/', async (c) => {
  try {
    let team_id = c.get('team_id');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = (page - 1) * limit;

    if (!team_id) {
      c.set('team_id', 1);
      team_id = 1;
    }

    const db = new DatabaseService(c.env.DB);
    const campaigns = await db.getCampaigns(team_id, limit, offset);

    // Get total count
    const totalResult = await c.env.DB.prepare(`
      SELECT COUNT(*) as total FROM campaigns WHERE team_id = ?
    `).bind(team_id).first();
    
    const total = totalResult?.total || 0;

    return c.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get campaigns error:', error);
    return c.json({ error: 'Failed to fetch campaigns' }, 500);
  }
});

// Get single campaign
campaigns.get('/:id', async (c) => {
  try {
    const campaignId = parseInt(c.req.param('id'));
    const team_id = c.get('team_id');

    if (!team_id) {
      return c.json({ error: 'Team context required' }, 400);
    }

    const db = new DatabaseService(c.env.DB);
    const campaign = await db.getCampaign(campaignId, team_id);

    if (!campaign) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    // Parse JSON fields
    const campaignData = {
      ...campaign,
      target_audience: JSON.parse(campaign.target_audience || '{}'),
      goals: JSON.parse(campaign.goals || '{}')
    };

    return c.json(campaignData);

  } catch (error) {
    console.error('Get campaign error:', error);
    return c.json({ error: 'Failed to fetch campaign' }, 500);
  }
});

// Create new campaign
campaigns.post('/', async (c) => {
  try {
    const team_id = c.get('team_id');
    const user = c.get('user');
    
    if (!team_id || !user) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    const campaignData = await c.req.json();
    
    // Validate required fields
    if (!campaignData.name || !campaignData.type) {
      return c.json({ error: 'Name and type are required' }, 400);
    }

    const db = new DatabaseService(c.env.DB);
    const campaign = await db.createCampaign({
      ...campaignData,
      team_id,
      created_by: user.id
    });

    return c.json(campaign, 201);

  } catch (error) {
    console.error('Create campaign error:', error);
    return c.json({ error: 'Failed to create campaign' }, 500);
  }
});

// Update campaign
campaigns.put('/:id', async (c) => {
  try {
    const campaignId = parseInt(c.req.param('id'));
    const team_id = c.get('team_id');
    const user = c.get('user');
    
    if (!team_id || !user) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    const updateData = await c.req.json();

    // Check if campaign exists and belongs to team
    const existing = await c.env.DB.prepare(`
      SELECT id FROM campaigns WHERE id = ? AND team_id = ?
    `).bind(campaignId, team_id).first();

    if (!existing) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    // Update campaign
    const result = await c.env.DB.prepare(`
      UPDATE campaigns 
      SET name = COALESCE(?, name),
          description = COALESCE(?, description),
          status = COALESCE(?, status),
          budget = COALESCE(?, budget),
          target_audience = COALESCE(?, target_audience),
          goals = COALESCE(?, goals),
          start_date = COALESCE(?, start_date),
          end_date = COALESCE(?, end_date),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND team_id = ?
      RETURNING *
    `).bind(
      updateData.name || null,
      updateData.description || null,
      updateData.status || null,
      updateData.budget || null,
      updateData.target_audience ? JSON.stringify(updateData.target_audience) : null,
      updateData.goals ? JSON.stringify(updateData.goals) : null,
      updateData.start_date || null,
      updateData.end_date || null,
      campaignId,
      team_id
    ).first();

    return c.json(result);

  } catch (error) {
    console.error('Update campaign error:', error);
    return c.json({ error: 'Failed to update campaign' }, 500);
  }
});

// Delete campaign
campaigns.delete('/:id', async (c) => {
  try {
    const campaignId = parseInt(c.req.param('id'));
    const team_id = c.get('team_id');
    const user = c.get('user');
    
    if (!team_id || !user) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Check permissions (only admin or campaign creator can delete)
    const campaign = await c.env.DB.prepare(`
      SELECT created_by FROM campaigns WHERE id = ? AND team_id = ?
    `).bind(campaignId, team_id).first();

    if (!campaign) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    if (user.role !== 'admin' && campaign.created_by !== user.id) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    // Soft delete by setting status to archived
    await c.env.DB.prepare(`
      UPDATE campaigns 
      SET status = 'archived', updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND team_id = ?
    `).bind(campaignId, team_id).run();

    return c.json({ success: true, message: 'Campaign archived' });

  } catch (error) {
    console.error('Delete campaign error:', error);
    return c.json({ error: 'Failed to delete campaign' }, 500);
  }
});

// Get campaign performance metrics
campaigns.get('/:id/metrics', async (c) => {
  try {
    const campaignId = parseInt(c.req.param('id'));
    const team_id = c.get('team_id');

    if (!team_id) {
      return c.json({ error: 'Team context required' }, 400);
    }

    // Get campaign basic info
    const campaign = await c.env.DB.prepare(`
      SELECT budget, spent FROM campaigns WHERE id = ? AND team_id = ?
    `).bind(campaignId, team_id).first();

    if (!campaign) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    // Get funnel events for this campaign
    const events = await c.env.DB.prepare(`
      SELECT 
        event_type,
        COUNT(*) as count,
        COALESCE(SUM(revenue), 0) as revenue
      FROM funnel_events 
      WHERE team_id = ? 
        AND properties LIKE '%"campaign_id":' || ? || '%'
      GROUP BY event_type
    `).bind(team_id, campaignId).all();

    const eventMap = (events.results || []).reduce((acc: any, event: any) => {
      acc[event.event_type] = event;
      return acc;
    }, {});

    // Calculate metrics
    const page_views = eventMap.page_view?.count || 0;
    const form_submits = eventMap.form_submit?.count || 0;
    const purchases = eventMap.purchase?.count || 0;
    const revenue = eventMap.purchase?.revenue || 0;

    const conversion_rate = page_views > 0 ? (form_submits / page_views) * 100 : 0;
    const purchase_rate = form_submits > 0 ? (purchases / form_submits) * 100 : 0;
    const roas = campaign.spent > 0 ? (revenue / campaign.spent) : 0;

    return c.json({
      campaign_id: campaignId,
      budget: campaign.budget,
      spent: campaign.spent,
      revenue,
      page_views,
      form_submits,
      purchases,
      conversion_rate: Math.round(conversion_rate * 100) / 100,
      purchase_rate: Math.round(purchase_rate * 100) / 100,
      roas: Math.round(roas * 100) / 100,
      roi: Math.round(((revenue - campaign.spent) / campaign.spent * 100) * 100) / 100
    });

  } catch (error) {
    console.error('Campaign metrics error:', error);
    return c.json({ error: 'Failed to fetch campaign metrics' }, 500);
  }
});

export default campaigns;