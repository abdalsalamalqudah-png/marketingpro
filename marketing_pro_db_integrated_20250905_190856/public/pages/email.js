/**
 * Marketing Pro - Email Page
 * Email management with SendGrid/Mailgun integration
 */

window.EmailPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <!-- Email Header -->
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">البريد الإلكتروني</h1>
          <p class="text-gray-600">إدارة وإرسال حملات البريد الإلكتروني</p>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">إجمالي المرسل</p>
                <p class="kpi-value text-xl">24,567</p>
              </div>
              <i class="fas fa-paper-plane icon-flat text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل الفتح</p>
                <p class="kpi-value text-xl">23.4%</p>
              </div>
              <i class="fas fa-envelope-open icon-success text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل النقر</p>
                <p class="kpi-value text-xl">4.2%</p>
              </div>
              <i class="fas fa-mouse-pointer icon-flat text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">إلغاء الاشتراك</p>
                <p class="kpi-value text-xl">0.8%</p>
              </div>
              <i class="fas fa-user-slash icon-warning text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Email Configuration -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Service Configuration -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">إعداد خدمة البريد الإلكتروني</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">اختر الخدمة</label>
                <select id="email-service" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">اختر خدمة البريد الإلكتروني</option>
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="ses">Amazon SES</option>
                </select>
              </div>

              <div id="service-config" class="hidden">
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-key text-yellow-600"></i>
                    <p class="text-sm text-yellow-800">
                      يجب إضافة مفتاح API في متغيرات البيئة
                    </p>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <input type="password" id="api-key" 
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                         placeholder="أدخل مفتاح API">
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني للمرسل</label>
                  <input type="email" id="sender-email" 
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                         placeholder="noreply@yourcompany.com">
                </div>

                <div class="mt-4">
                  <label class="block text-sm font-medium text-gray-700 mb-2">اسم المرسل</label>
                  <input type="text" id="sender-name" 
                         class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                         placeholder="شركة التسويق المحترف">
                </div>

                <button id="test-connection" class="btn btn-outline w-full mt-4">
                  <i class="fas fa-vial mr-2"></i>
                  اختبار الاتصال
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Send -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">إرسال سريع</h3>
            
            <form id="quick-send-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">إلى</label>
                <input type="email" id="quick-to" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                       placeholder="recipient@example.com">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                <input type="text" id="quick-subject" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                       placeholder="موضوع الرسالة">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                <textarea id="quick-content" rows="6" required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                          placeholder="محتوى الرسالة..."></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-paper-plane mr-2"></i>
                إرسال الآن
              </button>
            </form>
          </div>
        </div>

        <!-- Email Templates -->
        <div class="card mb-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">قوالب البريد الإلكتروني</h3>
            <button id="new-template" class="btn btn-primary">
              <i class="fas fa-plus mr-2"></i>
              قالب جديد
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="templates-grid">
            <!-- Templates will be loaded here -->
          </div>
        </div>

        <!-- Campaign History -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">سجل الحملات</h3>
            <div class="flex gap-2">
              <button class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600">الكل</button>
              <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100">مرسل</button>
              <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100">مسودة</button>
              <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100">فاشل</button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr class="text-right">
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الموضوع</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">المستقبل</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الحالة</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">تاريخ الإرسال</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">معدل الفتح</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody id="campaigns-table" class="divide-y divide-gray-200">
                <!-- Campaigns will be loaded here -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modals will be inserted here -->
        <div id="modals-container"></div>
      </div>
    `;
  },

  async init() {
    await this.loadTemplates();
    await this.loadCampaigns();
    this.bindEvents();
  },

  bindEvents() {
    // Service selection
    const serviceSelect = document.getElementById('email-service');
    if (serviceSelect) {
      serviceSelect.addEventListener('change', (e) => {
        this.handleServiceChange(e.target.value);
      });
    }

    // Test connection
    const testBtn = document.getElementById('test-connection');
    if (testBtn) {
      testBtn.addEventListener('click', () => {
        this.testConnection();
      });
    }

    // Quick send form
    const quickForm = document.getElementById('quick-send-form');
    if (quickForm) {
      quickForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleQuickSend();
      });
    }

    // New template button
    const newTemplateBtn = document.getElementById('new-template');
    if (newTemplateBtn) {
      newTemplateBtn.addEventListener('click', () => {
        this.showTemplateModal();
      });
    }
  },

  handleServiceChange(service) {
    const configDiv = document.getElementById('service-config');
    if (service) {
      configDiv.classList.remove('hidden');
    } else {
      configDiv.classList.add('hidden');
    }
  },

  async testConnection() {
    const service = document.getElementById('email-service').value;
    const apiKey = document.getElementById('api-key').value;

    if (!service || !apiKey) {
      this.showNotification('يرجى اختيار الخدمة وإدخال مفتاح API', 'error');
      return;
    }

    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, apiKey })
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification('تم اختبار الاتصال بنجاح! ✅', 'success');
      } else {
        this.showNotification('فشل في الاتصال: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في الاتصال: ' + error.message, 'error');
    }
  },

  async handleQuickSend() {
    const to = document.getElementById('quick-to').value;
    const subject = document.getElementById('quick-subject').value;
    const content = document.getElementById('quick-content').value;

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, content })
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification('تم إرسال البريد الإلكتروني بنجاح! ✅', 'success');
        document.getElementById('quick-send-form').reset();
        this.loadCampaigns(); // Refresh campaigns list
      } else {
        this.showNotification('فشل في الإرسال: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في الإرسال: ' + error.message, 'error');
    }
  },

  async loadTemplates() {
    try {
      const response = await fetch('/api/email/templates');
      const data = await response.json();
      
      this.renderTemplates(data.templates || []);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  },

  renderTemplates(templates) {
    const grid = document.getElementById('templates-grid');
    if (!grid) return;

    if (templates.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-8">
          <i class="fas fa-file-alt text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-600">لا توجد قوالب بريد إلكتروني</p>
          <button class="btn btn-outline mt-4" onclick="window.EmailPage.showTemplateModal()">
            إنشاء أول قالب
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = templates.map(template => `
      <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <i class="fas fa-file-alt icon-flat"></i>
          <div class="flex-1">
            <h4 class="font-medium">${template.name}</h4>
            <p class="text-sm text-gray-600">${template.type}</p>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button class="btn btn-outline flex-1" onclick="window.EmailPage.useTemplate(${template.id})">
            استخدام
          </button>
          <button class="btn btn-outline" onclick="window.EmailPage.editTemplate(${template.id})">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
    `).join('');
  },

  async loadCampaigns() {
    try {
      const response = await fetch('/api/email/campaigns');
      const data = await response.json();
      
      this.renderCampaigns(data.campaigns || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
      this.renderCampaigns([]);
    }
  },

  renderCampaigns(campaigns) {
    const tbody = document.getElementById('campaigns-table');
    if (!tbody) return;

    if (campaigns.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="px-4 py-8 text-center text-gray-500">
            لا توجد حملات بريد إلكتروني
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = campaigns.map(campaign => `
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3 text-right">${campaign.subject}</td>
        <td class="px-4 py-3 text-right">${campaign.recipient}</td>
        <td class="px-4 py-3">
          <span class="px-2 py-1 text-xs rounded-full 
                     ${campaign.status === 'sent' ? 'bg-green-100 text-green-800' : 
                       campaign.status === 'failed' ? 'bg-red-100 text-red-800' : 
                       'bg-yellow-100 text-yellow-800'}">
            ${this.getStatusText(campaign.status)}
          </span>
        </td>
        <td class="px-4 py-3 text-right">${campaign.sent_at || 'غير محدد'}</td>
        <td class="px-4 py-3 text-right">${campaign.open_rate || '0%'}</td>
        <td class="px-4 py-3">
          <div class="flex gap-2">
            <button class="text-blue-600 hover:text-blue-800" onclick="window.EmailPage.viewCampaign(${campaign.id})">
              <i class="fas fa-eye"></i>
            </button>
            <button class="text-green-600 hover:text-green-800" onclick="window.EmailPage.duplicateCampaign(${campaign.id})">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  getStatusText(status) {
    const statusMap = {
      'sent': 'مرسل',
      'failed': 'فاشل',
      'draft': 'مسودة',
      'sending': 'قيد الإرسال'
    };
    return statusMap[status] || status;
  },

  showTemplateModal() {
    const modal = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="template-modal">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">قالب بريد إلكتروني جديد</h3>
            <button onclick="window.EmailPage.closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form id="template-form" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">اسم القالب</label>
              <input type="text" id="template-name" required
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                     placeholder="مثال: رسالة ترحيب">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">نوع القالب</label>
              <select id="template-type" required
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="welcome">ترحيب</option>
                <option value="newsletter">نشرة إخبارية</option>
                <option value="promotion">عرض ترويجي</option>
                <option value="reminder">تذكير</option>
                <option value="other">أخرى</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
              <input type="text" id="template-subject" required
                     class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                     placeholder="موضوع البريد الإلكتروني">
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">المحتوى</label>
              <textarea id="template-content" rows="8" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                        placeholder="محتوى القالب..."></textarea>
            </div>

            <div class="flex gap-4 pt-4">
              <button type="submit" class="btn btn-primary flex-1">حفظ القالب</button>
              <button type="button" onclick="window.EmailPage.closeModal()" class="btn btn-outline flex-1">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById('modals-container').innerHTML = modal;

    // Bind form submission
    document.getElementById('template-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveTemplate();
    });
  },

  async saveTemplate() {
    const name = document.getElementById('template-name').value;
    const type = document.getElementById('template-type').value;
    const subject = document.getElementById('template-subject').value;
    const content = document.getElementById('template-content').value;

    try {
      const response = await fetch('/api/email/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, subject, content })
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification('تم حفظ القالب بنجاح! ✅', 'success');
        this.closeModal();
        this.loadTemplates();
      } else {
        this.showNotification('فشل في حفظ القالب: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في حفظ القالب: ' + error.message, 'error');
    }
  },

  closeModal() {
    document.getElementById('modals-container').innerHTML = '';
  },

  useTemplate(templateId) {
    console.log('Using template:', templateId);
    // Implement template usage
  },

  editTemplate(templateId) {
    console.log('Editing template:', templateId);
    // Implement template editing
  },

  viewCampaign(campaignId) {
    console.log('Viewing campaign:', campaignId);
    // Implement campaign viewing
  },

  duplicateCampaign(campaignId) {
    console.log('Duplicating campaign:', campaignId);
    // Implement campaign duplication
  },

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
      type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
      'bg-blue-100 text-blue-800 border border-blue-200'
    }`;
    
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fas ${
          type === 'success' ? 'fa-check-circle' :
          type === 'error' ? 'fa-exclamation-circle' :
          'fa-info-circle'
        }"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
};