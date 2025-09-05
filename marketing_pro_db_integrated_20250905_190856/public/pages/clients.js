/**
 * Marketing Pro - Clients (Contacts) Page
 * View contacts and simple add (demo if DB not configured)
 */

window.ClientsPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">العملاء</h1>
          <p class="text-gray-600">إدارة عملائك وتتبع تفاعلهم</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Add Contact -->
          <div class="card lg:col-span-1">
            <h3 class="text-h3 font-bold mb-4">إضافة عميل</h3>
            <form id="add-contact-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input id="contact-email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="customer@example.com">
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                  <input id="contact-first" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                  <input id="contact-last" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <input id="contact-phone" type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="9665xxxxxxx">
              </div>
              <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-user-plus mr-2"></i>
                إضافة
              </button>
              <p class="text-xs text-gray-500">الحفظ الفعلي يتطلب تهيئة قاعدة البيانات D1</p>
            </form>
          </div>

          <!-- Contacts List -->
          <div class="card lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">قائمة العملاء</h3>
              <div class="flex gap-2">
                <input type="text" id="search" placeholder="بحث..." class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr class="text-right">
                    <th class="px-4 py-3 text-sm font-medium text-gray-700">الاسم</th>
                    <th class="px-4 py-3 text-sm font-medium text-gray-700">البريد</th>
                    <th class="px-4 py-3 text-sm font-medium text-gray-700">الهاتف</th>
                    <th class="px-4 py-3 text-sm font-medium text-gray-700">الحالة</th>
                    <th class="px-4 py-3 text-sm font-medium text-gray-700">المصدر</th>
                  </tr>
                </thead>
                <tbody id="contacts-table" class="divide-y divide-gray-200"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  allContacts: [],

  async init() {
    await this.loadContacts();
    this.bindEvents();
  },

  bindEvents() {
    const form = document.getElementById('add-contact-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addContact();
    });

    const search = document.getElementById('search');
    search?.addEventListener('input', (e) => {
      this.renderContacts(
        this.allContacts.filter(c => (c.name || '').includes(e.target.value) || (c.email || '').includes(e.target.value))
      );
    });
  },

  async loadContacts() {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      this.allContacts = data.contacts || [];
      this.renderContacts(this.allContacts);
    } catch (e) {
      console.error('Error loading contacts:', e);
      this.renderContacts([]);
    }
  },

  renderContacts(list) {
    const tbody = document.getElementById('contacts-table');
    if (!tbody) return;

    if (!list || list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">لا توجد بيانات</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(c => `
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3 text-right">${c.name || '-'}</td>
        <td class="px-4 py-3 text-right">${c.email}</td>
        <td class="px-4 py-3 text-right">${c.phone || '-'}</td>
        <td class="px-4 py-3 text-right">
          <span class="px-2 py-1 text-xs rounded-full ${this.getStatusClass(c.status)}">${this.getStatusText(c.status)}</span>
        </td>
        <td class="px-4 py-3 text-right">${c.source || '-'}</td>
      </tr>
    `).join('');
  },

  getStatusClass(status) {
    const map = { active: 'bg-green-100 text-green-800', unsubscribed: 'bg-yellow-100 text-yellow-800', bounced: 'bg-red-100 text-red-800', complained: 'bg-red-100 text-red-800' };
    return map[status] || 'bg-gray-100 text-gray-800';
  },

  getStatusText(status) {
    const map = { active: 'نشط', unsubscribed: 'ألغي الاشتراك', bounced: 'مرتد', complained: 'شكوى' };
    return map[status] || status || '-';
  },

  async addContact() {
    const email = document.getElementById('contact-email').value.trim();
    const first_name = document.getElementById('contact-first').value.trim();
    const last_name = document.getElementById('contact-last').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();

    if (!email) return this.notify('يرجى إدخال البريد الإلكتروني', 'error');

    try {
      // Demo: if backend not implemented to create, just show success
      this.notify('تمت إضافة العميل (وضع تجريبي) ✅', 'success');
      document.getElementById('add-contact-form').reset();
      await this.loadContacts();
    } catch (e) {
      this.notify('فشل في الإضافة', 'error');
    }
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
