/**
 * Marketing Pro - Integrations Page
 */

window.IntegrationsPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">التكامل مع المنصات</h1>
          <p class="text-gray-600">ربط الأدوات والخدمات الخارجية</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${[
            { name: 'SendGrid', icon: 'fas fa-paper-plane', color: '#1a73e8' },
            { name: 'Mailgun', icon: 'fas fa-envelope', color: '#c02a1d' },
            { name: 'Amazon SES', icon: 'fab fa-aws', color: '#f59e0b' },
            { name: 'Facebook', icon: 'fab fa-facebook', color: '#1877f2' },
            { name: 'Instagram', icon: 'fab fa-instagram', color: '#e4405f' },
            { name: 'LinkedIn', icon: 'fab fa-linkedin', color: '#0077b5' }
          ].map(p => `
            <div class="card">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <i class="${p.icon} text-2xl" style="color:${p.color}"></i>
                  <h4 class="font-bold">${p.name}</h4>
                </div>
                <span class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">غير متصل</span>
              </div>
              <button class="btn btn-primary w-full">ربط</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
  init() {}
};
