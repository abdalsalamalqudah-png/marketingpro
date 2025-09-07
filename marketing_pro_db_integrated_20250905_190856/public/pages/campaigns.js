/**
 * Marketing Pro - Campaigns Page
 * Manage marketing campaigns (list, basic create form)
 */

window.CampaignsPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">الحملات</h1>
          <p class="text-gray-600">إدارة الحملات التسويقية عبر القنوات المختلفة</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Create Campaign -->
          <div class="card lg:col-span-1">
            <h3 class="text-h3 font-bold mb-4">إنشاء حملة جديدة</h3>
            <form id="create-campaign-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">اسم الحملة</label>
                <input id="campaign-name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="مثال: حملة إطلاق المنتج">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">نوع الحملة</label>
                <select id="campaign-type" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="email">بريد إلكتروني</option>
                  <option value="social">منصات التواصل</option>
                  <option value="ads">إعلانات</option>
                  <option value="mixed">مختلطة</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">الوصف (اختياري)</label>
                <textarea id="campaign-description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="وصف مختصر للحملة..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-rocket mr-2"></i>
                إنشاء الحملة
              </button>
              <p class="text-xs text-gray-500">قد يتطلب الإنشاء إعداد قاعدة البيانات D1 وتسجيل الدخول</p>
            </form>
          </div>

          <!-- Campaigns List -->
          <div class="card lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">جميع الحملات</h3>
              <div class="flex gap-2">
                <button class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600" data-filter="all">الكل</button>
                <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100" data-filter="active">نشطة</button>
                <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100" data-filter="draft">مسودة</button>
                <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100" data-filter="completed">مكتملة</button>
              </div>
            </div>

            <div id="campaigns-container" class="space-y-3">
              <!-- Campaign cards will be loaded here -->
            </div>

            <div class="flex items-center justify-between mt-4">
              <button id="prev-page" class="btn btn-outline text-sm">السابق</button>
              <span id="pagination-info" class="text-sm text-gray-600"></span>
              <button id="next-page" class="btn btn-outline text-sm">التالي</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  state: { page: 1, limit: 10, filter: 'all', campaigns: [], pagination: { total: 0, pages: 1 } },

  async init() {
    await this.loadCampaigns();
    this.bindEvents();
  },

  bindEvents() {
    // Create campaign form
    const form = document.getElementById('create-campaign-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.createCampaign();
      });
    }

    // Filters
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(b => b.className = 'text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100');
        btn.className = 'text-sm px-3 py-1 rounded bg-blue-100 text-blue-600';
        this.state.filter = btn.getAttribute('data-filter');
        this.renderCampaigns();
      });
    });

    // Pagination
    const prev = document.getElementById('prev-page');
    const next = document.getElementById('next-page');
    prev?.addEventListener('click', async () => {
      if (this.state.page > 1) { this.state.page--; await this.loadCampaigns(); }
    });
    next?.addEventListener('click', async () => {
      if (this.state.page < this.state.pagination.pages) { this.state.page++; await this.loadCampaigns(); }
    });
  },

  async loadCampaigns() {
    try {
      const res = await fetch(`/api/campaigns?page=${this.state.page}&limit=${this.state.limit}`);
      const data = await res.json();
      this.state.campaigns = data.campaigns || [];
      this.state.pagination = data.pagination || { total: 0, pages: 1 };
      this.renderCampaigns();
    } catch (e) {
      console.error('Error loading campaigns:', e);
      this.state.campaigns = [];
      this.renderCampaigns();
    }
  },

  renderCampaigns() {
    const container = document.getElementById('campaigns-container');
    const info = document.getElementById('pagination-info');
    if (!container) return;

    let campaigns = this.state.campaigns;
    if (this.state.filter !== 'all') {
      campaigns = campaigns.filter(c => c.status === this.state.filter);
    }

    if (campaigns.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8">
          <i class="fas fa-rocket text-3xl text-gray-400 mb-2"></i>
          <p class="text-gray-600">لا توجد حملات</p>
        </div>
      `;
    } else {
      container.innerHTML = campaigns.map(c => `
        <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h4 class="font-bold">${c.name}</h4>
              <p class="text-sm text-gray-600 mt-1">${c.description || ''}</p>
              <div class="flex items-center gap-3 text-xs text-gray-500 mt-2">
                <span><i class="fas fa-tag mr-1"></i>${c.type}</span>
                <span><i class="fas fa-wallet mr-1"></i>الميزانية: ${c.budget || 0}</span>
                <span><i class="fas fa-coins mr-1"></i>المصروف: ${c.spent || 0}</span>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-1 text-xs rounded-full ${this.getStatusClass(c.status)}">${this.getStatusText(c.status)}</span>
              <div class="flex gap-2 mt-2">
                <button class="btn btn-outline text-xs" onclick="window.CampaignsPage.viewMetrics(${c.id})">
                  <i class="fas fa-chart-line"></i>
                </button>
                <button class="btn btn-outline text-xs" onclick="window.CampaignsPage.edit(${c.id})">
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    if (info) {
      info.textContent = `صفحة ${this.state.page} من ${this.state.pagination.pages}`;
    }
  },

  getStatusClass(status) {
    const map = { draft: 'bg-yellow-100 text-yellow-800', active: 'bg-green-100 text-green-800', paused: 'bg-gray-100 text-gray-800', completed: 'bg-blue-100 text-blue-800', archived: 'bg-gray-200 text-gray-700' };
    return map[status] || 'bg-gray-100 text-gray-800';
  },

  getStatusText(status) {
    const map = { draft: 'مسودة', active: 'نشطة', paused: 'موقوفة', completed: 'مكتملة', archived: 'مؤرشفة' };
    return map[status] || status;
  },

  async createCampaign() {
    const name = document.getElementById('campaign-name').value.trim();
    const type = document.getElementById('campaign-type').value;
    const description = document.getElementById('campaign-description').value.trim();

    if (!name) { return this.notify('يرجى إدخال اسم الحملة', 'error'); }

    try {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, description })
      });
      const data = await res.json();
      if (res.ok) {
        this.notify('تم إنشاء الحملة بنجاح! ✅', 'success');
        document.getElementById('create-campaign-form').reset();
        await this.loadCampaigns();
      } else {
        // Likely unauthenticated or DB not configured
        this.notify(data.error || 'فشل في إنشاء الحملة. تأكد من إعداد قاعدة البيانات وتسجيل الدخول', 'error');
      }
    } catch (e) {
      this.notify('خطأ غير متوقع أثناء الإنشاء', 'error');
    }
  },

  async viewMetrics(id) {
    try {
      const res = await fetch(`/api/campaigns/${id}/metrics`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      this.showMetricsModal(data);
    } catch (e) {
      this.notify('فشل في جلب مؤشرات الأداء. قد تحتاج لتهيئة قاعدة البيانات.', 'error');
    }
  },

  showMetricsModal(data) {
    const modal = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="campaign-metrics-modal">
        <div class="bg-white rounded-lg p-6 w-full max-w-xl mx-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">مؤشرات أداء الحملة #${data.campaign_id}</h3>
            <button onclick="window.CampaignsPage.closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-blue-50 rounded">
              <p class="text-small">الميزانية</p>
              <p class="font-bold">${data.budget}</p>
            </div>
            <div class="p-3 bg-yellow-50 rounded">
              <p class="text-small">المصروف</p>
              <p class="font-bold">${data.spent}</p>
            </div>
            <div class="p-3 bg-green-50 rounded">
              <p class="text-small">العائد</p>
              <p class="font-bold">${data.revenue}</p>
            </div>
            <div class="p-3 bg-purple-50 rounded">
              <p class="text-small">ROI</p>
              <p class="font-bold">${data.roi}%</p>
            </div>
            <div class="p-3 bg-gray-50 rounded col-span-2">
              <p class="text-small">المشاهدات / التحويلات / المشتريات</p>
              <p class="font-bold">${data.page_views} / ${data.form_submits} / ${data.purchases}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    const container = document.createElement('div');
    container.innerHTML = modal;
    document.body.appendChild(container.firstElementChild);
  },

  closeModal() {
    const el = document.getElementById('campaign-metrics-modal');
    el?.remove();
  },

  edit(id) {
    this.notify('ميزة تعديل الحملة ستتوفر قريباً', 'info');
  },

  notify(message, type = 'info') {
    const el = document.createElement('div');
    el.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
      type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
      'bg-blue-100 text-blue-800 border border-blue-200'
    }`;
    el.innerHTML = `<div class="flex items-center gap-2"><i class="fas ${
      type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'
    }"></i><span>${message}</span></div>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
};
