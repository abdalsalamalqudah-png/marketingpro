/**
 * Marketing Pro - Users & Permissions Page
 * - RTL Arabic UI
 * - Autosave on input change
 */

window.UsersPage = {
  state: {
    users: [],
    saving: {},
    error: null,
  },

  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-h1 font-bold mb-1">المستخدمون والصلاحيات</h1>
            <p class="text-gray-600">إدارة أعضاء الفريق وتحديث صلاحياتهم</p>
          </div>
          <button id="add-user-btn" class="btn btn-primary">
            <i class="fas fa-user-plus"></i>
            إضافة مستخدم
          </button>
        </div>

        <div id="users-container" class="card">
          <div id="users-loading" class="flex items-center gap-3 text-gray-600">
            <div class="loading w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span>جارٍ تحميل المستخدمين...</span>
          </div>
          <div id="users-error" class="error-message hidden"></div>
          <div id="users-list" class="mt-4"></div>
        </div>
      </div>
    `;
  },

  async init() {
    await this.loadUsers();
    const addBtn = document.getElementById('add-user-btn');
    if (addBtn) addBtn.addEventListener('click', () => this.addUser());
  },

  async loadUsers() {
    const loading = document.getElementById('users-loading');
    const errorBox = document.getElementById('users-error');
    const list = document.getElementById('users-list');
    errorBox.classList.add('hidden');

    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      this.state.users = data.users || [];
      loading?.classList.add('hidden');
      this.renderList(list);
    } catch (e) {
      loading?.classList.add('hidden');
      errorBox.textContent = 'تعذر تحميل المستخدمين. سيتم استخدام بيانات تجريبية.';
      errorBox.classList.remove('hidden');
      // Fallback demo
      this.state.users = [
        { id: 1, name: 'مستخدم تجريبي', email: 'demo@marketingpro.com', role: 'admin' },
        { id: 2, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'marketer' },
        { id: 3, name: 'فاطمة علي', email: 'fatima@example.com', role: 'analyst' }
      ];
      this.renderList(list);
    }
  },

  renderList(container) {
    if (!container) return;
    container.innerHTML = `
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الاسم</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">البريد الإلكتروني</th>
              <th class="px-4 py-3 text-right text-sm font-semibold text-gray-700">الصلاحية</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            ${this.state.users.map(u => `
              <tr data-id="${u.id}">
                <td class="px-4 py-3">
                  <input type="text" class="w-full border rounded px-3 py-2" value="${u.name || ''}" 
                    data-field="name" placeholder="الاسم" />
                </td>
                <td class="px-4 py-3">
                  <input type="email" class="w-full border rounded px-3 py-2" value="${u.email || ''}" 
                    data-field="email" placeholder="البريد الإلكتروني" />
                </td>
                <td class="px-4 py-3">
                  <select class="w-full border rounded px-3 py-2" data-field="role">
                    ${['admin','marketer','analyst','client'].map(r => `
                      <option value="${r}" ${u.role===r?'selected':''}>${this.roleLabel(r)}</option>
                    `).join('')}
                  </select>
                </td>
                <td class="px-4 py-3 text-left text-sm">
                  <span class="text-gray-500" id="save-status-${u.id}"></span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Bind autosave
    container.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('input', (e) => this.handleChange(e));
      el.addEventListener('change', (e) => this.handleChange(e));
    });
  },

  roleLabel(r){
    const map = { admin:'مدير', marketer:'مسوّق', analyst:'محلل', client:'عميل' };
    return map[r] || r;
  },

  handleChange(e){
    const input = e.target;
    const tr = input.closest('tr');
    const id = Number(tr?.getAttribute('data-id'));
    const field = input.getAttribute('data-field');
    const value = input.value;

    // Update local state immediately so UI reflects changes
    const idx = this.state.users.findIndex(u => u.id === id);
    if (idx >= 0) {
      this.state.users[idx] = { ...this.state.users[idx], [field]: value };
    }

    // Debounced autosave per user
    clearTimeout(this.state.saving[id]);
    this.state.saving[id] = setTimeout(() => this.autosave(id), 600);

    const status = document.getElementById(`save-status-${id}`);
    if (status) status.textContent = '...جارٍ الحفظ';
  },

  async autosave(id){
    const user = this.state.users.find(u => u.id === id);
    if (!user) return;
    const status = document.getElementById(`save-status-${id}`);
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user.name, email: user.email, role: user.role })
      });
      if (!res.ok) throw new Error('save failed');
      const data = await res.json();
      if (status) status.textContent = 'تم الحفظ تلقائياً';
    } catch (err){
      if (status) status.textContent = 'تعذر الحفظ (وضع تجريبي)';
    }
  },

  async addUser(){
    // Simple demo add - creates a local user row and tries POST
    const tempId = Math.max(0, ...this.state.users.map(u => u.id || 0)) + 1;
    const newUser = { id: tempId, name: '', email: '', role: 'client' };
    this.state.users = [newUser, ...this.state.users];
    const list = document.getElementById('users-list');
    this.renderList(list);
  }
};
