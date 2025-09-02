import type { Bindings, User, Team } from '../types';

export class DatabaseService {
  constructor(private db: D1Database) {}

  // Teams
  async getTeam(teamId: number): Promise<Team | null> {
    const result = await this.db.prepare('SELECT * FROM teams WHERE id = ?')
      .bind(teamId).first();
    return result as Team | null;
  }

  async createTeam(name: string, slug: string, plan = 'free'): Promise<Team> {
    const result = await this.db.prepare(`
      INSERT INTO teams (name, slug, plan, settings)
      VALUES (?, ?, ?, ?)
      RETURNING *
    `).bind(name, slug, plan, '{}').first();
    
    return result as Team;
  }

  // Users
  async getUser(userId: number): Promise<User | null> {
    const result = await this.db.prepare('SELECT * FROM users WHERE id = ?')
      .bind(userId).first();
    return result as User | null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.prepare('SELECT * FROM users WHERE email = ?')
      .bind(email).first();
    return result as User | null;
  }

  async createUser(userData: {
    email: string;
    name: string;
    password_hash: string;
    role: string;
    team_id: number;
  }): Promise<User> {
    const result = await this.db.prepare(`
      INSERT INTO users (email, name, password_hash, role, team_id, settings)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *
    `).bind(
      userData.email,
      userData.name,
      userData.password_hash,
      userData.role,
      userData.team_id,
      '{}'
    ).first();
    
    return result as User;
  }

  async updateUserLastLogin(userId: number): Promise<void> {
    await this.db.prepare('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(userId).run();
  }

  // Campaigns
  async getCampaigns(teamId: number, limit = 50, offset = 0) {
    const result = await this.db.prepare(`
      SELECT c.*, u.name as created_by_name
      FROM campaigns c
      JOIN users u ON c.created_by = u.id
      WHERE c.team_id = ?
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(teamId, limit, offset).all();
    
    return result.results || [];
  }

  async getCampaign(campaignId: number, teamId: number) {
    const result = await this.db.prepare(`
      SELECT c.*, u.name as created_by_name
      FROM campaigns c
      JOIN users u ON c.created_by = u.id
      WHERE c.id = ? AND c.team_id = ?
    `).bind(campaignId, teamId).first();
    
    return result;
  }

  async createCampaign(campaignData: any) {
    const result = await this.db.prepare(`
      INSERT INTO campaigns (team_id, name, description, status, type, budget, target_audience, goals, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `).bind(
      campaignData.team_id,
      campaignData.name,
      campaignData.description || null,
      campaignData.status || 'draft',
      campaignData.type,
      campaignData.budget || 0,
      JSON.stringify(campaignData.target_audience || {}),
      JSON.stringify(campaignData.goals || {}),
      campaignData.created_by
    ).first();
    
    return result;
  }

  // Contacts
  async getContacts(teamId: number, limit = 50, offset = 0) {
    const result = await this.db.prepare(`
      SELECT * FROM contacts
      WHERE team_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(teamId, limit, offset).all();
    
    return result.results || [];
  }

  async createContact(contactData: any) {
    const result = await this.db.prepare(`
      INSERT INTO contacts (team_id, email, first_name, last_name, phone, company, position, tags, custom_fields, source)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `).bind(
      contactData.team_id,
      contactData.email,
      contactData.first_name || null,
      contactData.last_name || null,
      contactData.phone || null,
      contactData.company || null,
      contactData.position || null,
      JSON.stringify(contactData.tags || []),
      JSON.stringify(contactData.custom_fields || {}),
      contactData.source || null
    ).first();
    
    return result;
  }

  // Analytics
  async getTeamAnalytics(teamId: number) {
    // Get basic counts and metrics
    const [campaigns, contacts, totalSpent, emailMetrics] = await Promise.all([
      this.db.prepare('SELECT COUNT(*) as total, COUNT(CASE WHEN status = "active" THEN 1 END) as active FROM campaigns WHERE team_id = ?').bind(teamId).first(),
      this.db.prepare('SELECT COUNT(*) as total FROM contacts WHERE team_id = ? AND status = "active"').bind(teamId).first(),
      this.db.prepare('SELECT COALESCE(SUM(spent), 0) as total_spent FROM campaigns WHERE team_id = ?').bind(teamId).first(),
      this.db.prepare('SELECT COUNT(*) as total_sequences FROM email_sequences WHERE team_id = ? AND status = "active"').bind(teamId).first()
    ]);

    return {
      total_campaigns: campaigns?.total || 0,
      active_campaigns: campaigns?.active || 0,
      total_contacts: contacts?.total || 0,
      total_spent: totalSpent?.total_spent || 0,
      active_sequences: emailMetrics?.total_sequences || 0
    };
  }

  // AI Insights
  async getAIInsights(teamId: number, status = 'pending', limit = 10) {
    const result = await this.db.prepare(`
      SELECT * FROM ai_insights
      WHERE team_id = ? AND status = ?
      ORDER BY generated_at DESC
      LIMIT ?
    `).bind(teamId, status, limit).all();
    
    return result.results || [];
  }

  async createAIInsight(insightData: any) {
    const result = await this.db.prepare(`
      INSERT INTO ai_insights (team_id, type, title, description, data, confidence_score, applies_to_type, applies_to_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `).bind(
      insightData.team_id,
      insightData.type,
      insightData.title,
      insightData.description,
      JSON.stringify(insightData.data || {}),
      insightData.confidence_score || 0,
      insightData.applies_to_type || null,
      insightData.applies_to_id || null
    ).first();
    
    return result;
  }

  // Social Posts
  async getSocialPosts(teamId: number, limit = 20, offset = 0) {
    const result = await this.db.prepare(`
      SELECT sp.*, c.name as campaign_name, u.name as created_by_name
      FROM social_posts sp
      LEFT JOIN campaigns c ON sp.campaign_id = c.id
      JOIN users u ON sp.created_by = u.id
      WHERE sp.team_id = ?
      ORDER BY sp.scheduled_at DESC, sp.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(teamId, limit, offset).all();
    
    return result.results || [];
  }

  async createSocialPost(postData: any) {
    const result = await this.db.prepare(`
      INSERT INTO social_posts (team_id, campaign_id, platform, content, media_urls, hashtags, scheduled_at, status, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `).bind(
      postData.team_id,
      postData.campaign_id || null,
      postData.platform,
      postData.content,
      JSON.stringify(postData.media_urls || []),
      JSON.stringify(postData.hashtags || []),
      postData.scheduled_at || null,
      postData.status || 'draft',
      postData.created_by
    ).first();
    
    return result;
  }

  // Content Items
  async getContentItems(teamId: number, limit = 20, offset = 0) {
    const result = await this.db.prepare(`
      SELECT ci.*, c.name as campaign_name, u1.name as created_by_name, u2.name as assigned_to_name
      FROM content_items ci
      LEFT JOIN campaigns c ON ci.campaign_id = c.id
      JOIN users u1 ON ci.created_by = u1.id
      LEFT JOIN users u2 ON ci.assigned_to = u2.id
      WHERE ci.team_id = ?
      ORDER BY ci.due_date ASC, ci.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(teamId, limit, offset).all();
    
    return result.results || [];
  }
}