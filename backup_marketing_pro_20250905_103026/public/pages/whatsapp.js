/**
 * Marketing Pro - WhatsApp Business Page
 * WhatsApp Business API integration
 */

window.WhatsAppPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <!-- WhatsApp Header -->
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">واتساب بزنس</h1>
          <p class="text-gray-600">إدارة وإرسال رسائل واتساب للعملاء</p>
        </div>

        <!-- Connection Status -->
        <div class="card mb-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fab fa-whatsapp text-green-600 text-2xl"></i>
              </div>
              <div>
                <h3 class="text-h3 font-bold">حالة الاتصال</h3>
                <p id="connection-status" class="text-gray-600">غير متصل</p>
              </div>
            </div>
            
            <div class="flex gap-3">
              <button id="setup-whatsapp" class="btn btn-primary">
                <i class="fas fa-cog mr-2"></i>
                إعداد الاتصال
              </button>
              <button id="test-whatsapp" class="btn btn-outline" disabled>
                <i class="fas fa-vial mr-2"></i>
                اختبار الاتصال
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">إجمالي المرسل</p>
                <p class="kpi-value text-xl">5,642</p>
              </div>
              <i class="fab fa-whatsapp text-green-600 text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل التسليم</p>
                <p class="kpi-value text-xl">97.2%</p>
              </div>
              <i class="fas fa-check-double text-green-600 text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل القراءة</p>
                <p class="kpi-value text-xl">84.6%</p>
              </div>
              <i class="fas fa-eye icon-flat text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل الرد</p>
                <p class="kpi-value text-xl">23.1%</p>
              </div>
              <i class="fas fa-reply icon-success text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Send Message -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">إرسال رسالة</h3>
            
            <form id="send-message-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                <div class="flex">
                  <select class="px-3 py-2 border border-gray-300 rounded-r-lg border-l-0 bg-gray-50">
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+965">🇰🇼 +965</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+968">🇴🇲 +968</option>
                    <option value="+973">🇧🇭 +973</option>
                  </select>
                  <input type="tel" id="phone-number" required
                         class="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                         placeholder="501234567">
                </div>
                <p class="text-xs text-gray-500 mt-1">أدخل الرقم بدون الصفر الأول</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">نوع الرسالة</label>
                <select id="message-type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="text">نص عادي</option>
                  <option value="template">قالب معتمد</option>
                  <option value="media">رسالة مع ملف</option>
                </select>
              </div>

              <div id="text-message" class="message-type-content">
                <label class="block text-sm font-medium text-gray-700 mb-2">نص الرسالة</label>
                <textarea id="message-text" rows="4" required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                          placeholder="اكتب رسالتك هنا..."></textarea>
                <p class="text-xs text-gray-500 mt-1">الحد الأقصى: 4096 حرف</p>
              </div>

              <div id="template-message" class="message-type-content hidden">
                <label class="block text-sm font-medium text-gray-700 mb-2">اختر القالب</label>
                <select id="template-select" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">اختر قالب معتمد</option>
                  <!-- Templates will be loaded here -->
                </select>
              </div>

              <div id="media-message" class="message-type-content hidden">
                <label class="block text-sm font-medium text-gray-700 mb-2">نوع الملف</label>
                <select id="media-type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4">
                  <option value="image">صورة</option>
                  <option value="document">مستند</option>
                  <option value="audio">صوت</option>
                  <option value="video">فيديو</option>
                </select>
                
                <input type="file" id="media-file" accept="image/*,application/pdf,audio/*,video/*" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                
                <textarea id="media-caption" rows="2" 
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mt-2" 
                          placeholder="تعليق اختياري..."></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full">
                <i class="fab fa-whatsapp mr-2"></i>
                إرسال الرسالة
              </button>
            </form>
          </div>

          <!-- Bulk Send -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">إرسال جماعي</h3>
            
            <form id="bulk-send-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">طريقة اختيار الأرقام</label>
                <div class="flex gap-4 mb-4">
                  <label class="flex items-center">
                    <input type="radio" name="bulk-method" value="contacts" class="ml-2">
                    <span>من قائمة العملاء</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="bulk-method" value="manual" checked class="ml-2">
                    <span>إدخال يدوي</span>
                  </label>
                  <label class="flex items-center">
                    <input type="radio" name="bulk-method" value="file" class="ml-2">
                    <span>استيراد ملف</span>
                  </label>
                </div>
              </div>

              <div id="bulk-manual" class="bulk-method-content">
                <label class="block text-sm font-medium text-gray-700 mb-2">أرقام الهواتف</label>
                <textarea id="bulk-numbers" rows="4" required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                          placeholder="أدخل الأرقام مفصولة بفاصلة أو سطر جديد&#10;مثال:&#10;966501234567&#10;966501234568&#10;966501234569"></textarea>
                <p class="text-xs text-gray-500 mt-1">أدخل الأرقام مع كود البلد بدون علامة +</p>
              </div>

              <div id="bulk-contacts" class="bulk-method-content hidden">
                <label class="block text-sm font-medium text-gray-700 mb-2">فئة العملاء</label>
                <select id="contacts-segment" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="all">جميع العملاء</option>
                  <option value="active">العملاء النشطون</option>
                  <option value="new">العملاء الجدد</option>
                  <option value="vip">العملاء المميزون</option>
                </select>
              </div>

              <div id="bulk-file" class="bulk-method-content hidden">
                <label class="block text-sm font-medium text-gray-700 mb-2">ملف الأرقام (Excel/CSV)</label>
                <input type="file" id="numbers-file" accept=".xlsx,.xls,.csv" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <p class="text-xs text-gray-500 mt-1">يجب أن يحتوي الملف على عمود "phone" أو "هاتف"</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">رسالة الإرسال الجماعي</label>
                <textarea id="bulk-message" rows="4" required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                          placeholder="اكتب الرسالة الجماعية..."></textarea>
              </div>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-center gap-2">
                  <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                  <p class="text-sm text-yellow-800">
                    تأكد من الالتزام بسياسات واتساب لتجنب حظر الرقم
                  </p>
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-full">
                <i class="fas fa-users mr-2"></i>
                إرسال جماعي
              </button>
            </form>
          </div>
        </div>

        <!-- Message Templates -->
        <div class="card mb-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">قوالب الرسائل المعتمدة</h3>
            <button id="new-whatsapp-template" class="btn btn-primary">
              <i class="fas fa-plus mr-2"></i>
              قالب جديد
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="whatsapp-templates-grid">
            <!-- Templates will be loaded here -->
          </div>
        </div>

        <!-- Conversation History -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">سجل المحادثات</h3>
            <div class="flex gap-2">
              <input type="date" id="date-filter" 
                     class="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent">
              <button class="btn btn-outline">
                <i class="fas fa-download mr-1"></i>
                تصدير
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr class="text-right">
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الهاتف</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الرسالة</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الحالة</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">التاريخ</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody id="conversations-table" class="divide-y divide-gray-200">
                <!-- Conversations will be loaded here -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modals Container -->
        <div id="whatsapp-modals-container"></div>
      </div>
    `;
  },

  async init() {
    await this.checkConnectionStatus();
    await this.loadTemplates();
    await this.loadConversations();
    this.bindEvents();
  },

  bindEvents() {
    // Setup WhatsApp connection
    const setupBtn = document.getElementById('setup-whatsapp');
    if (setupBtn) {
      setupBtn.addEventListener('click', () => {
        this.showSetupModal();
      });
    }

    // Test connection
    const testBtn = document.getElementById('test-whatsapp');
    if (testBtn) {
      testBtn.addEventListener('click', () => {
        this.testConnection();
      });
    }

    // Message type change
    const messageType = document.getElementById('message-type');
    if (messageType) {
      messageType.addEventListener('change', (e) => {
        this.handleMessageTypeChange(e.target.value);
      });
    }

    // Single message form
    const sendForm = document.getElementById('send-message-form');
    if (sendForm) {
      sendForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSendMessage();
      });
    }

    // Bulk send method change
    const bulkMethods = document.querySelectorAll('input[name="bulk-method"]');
    bulkMethods.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.handleBulkMethodChange(e.target.value);
      });
    });

    // Bulk send form
    const bulkForm = document.getElementById('bulk-send-form');
    if (bulkForm) {
      bulkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleBulkSend();
      });
    }

    // New template button
    const newTemplateBtn = document.getElementById('new-whatsapp-template');
    if (newTemplateBtn) {
      newTemplateBtn.addEventListener('click', () => {
        this.showTemplateModal();
      });
    }
  },

  async checkConnectionStatus() {
    try {
      const response = await fetch('/api/whatsapp/status');
      const data = await response.json();
      
      this.updateConnectionStatus(data.connected || false);
    } catch (error) {
      console.error('Error checking WhatsApp status:', error);
      this.updateConnectionStatus(false);
    }
  },

  updateConnectionStatus(connected) {
    const statusElement = document.getElementById('connection-status');
    const testBtn = document.getElementById('test-whatsapp');
    
    if (connected) {
      statusElement.textContent = 'متصل ✅';
      statusElement.className = 'text-green-600 font-medium';
      if (testBtn) testBtn.disabled = false;
    } else {
      statusElement.textContent = 'غير متصل ❌';
      statusElement.className = 'text-red-600 font-medium';
      if (testBtn) testBtn.disabled = true;
    }
  },

  handleMessageTypeChange(type) {
    // Hide all message type contents
    document.querySelectorAll('.message-type-content').forEach(el => {
      el.classList.add('hidden');
    });

    // Show selected type content
    const contentMap = {
      'text': 'text-message',
      'template': 'template-message',
      'media': 'media-message'
    };

    const targetElement = document.getElementById(contentMap[type]);
    if (targetElement) {
      targetElement.classList.remove('hidden');
    }
  },

  handleBulkMethodChange(method) {
    // Hide all bulk method contents
    document.querySelectorAll('.bulk-method-content').forEach(el => {
      el.classList.add('hidden');
    });

    // Show selected method content
    const contentMap = {
      'manual': 'bulk-manual',
      'contacts': 'bulk-contacts',
      'file': 'bulk-file'
    };

    const targetElement = document.getElementById(contentMap[method]);
    if (targetElement) {
      targetElement.classList.remove('hidden');
    }
  },

  async handleSendMessage() {
    const countryCode = document.querySelector('select').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const fullPhone = countryCode + phoneNumber;
    const messageType = document.getElementById('message-type').value;

    let messageData = {
      phone: fullPhone,
      type: messageType
    };

    try {
      if (messageType === 'text') {
        messageData.message = document.getElementById('message-text').value;
      } else if (messageType === 'template') {
        messageData.template = document.getElementById('template-select').value;
      } else if (messageType === 'media') {
        const mediaFile = document.getElementById('media-file').files[0];
        const mediaCaption = document.getElementById('media-caption').value;
        
        if (!mediaFile) {
          this.showNotification('يرجى اختيار ملف', 'error');
          return;
        }

        // For demo purposes, we'll simulate file upload
        messageData.media_type = document.getElementById('media-type').value;
        messageData.caption = mediaCaption;
        messageData.filename = mediaFile.name;
      }

      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification('تم إرسال الرسالة بنجاح! ✅', 'success');
        document.getElementById('send-message-form').reset();
        this.handleMessageTypeChange('text'); // Reset to text view
        this.loadConversations(); // Refresh conversations
      } else {
        this.showNotification('فشل في الإرسال: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في الإرسال: ' + error.message, 'error');
    }
  },

  async handleBulkSend() {
    const method = document.querySelector('input[name="bulk-method"]:checked').value;
    const message = document.getElementById('bulk-message').value;

    let numbers = [];

    try {
      if (method === 'manual') {
        const numbersText = document.getElementById('bulk-numbers').value;
        numbers = numbersText.split(/[\n,]/).map(n => n.trim()).filter(n => n);
      } else if (method === 'contacts') {
        const segment = document.getElementById('contacts-segment').value;
        // Fetch numbers from contacts API based on segment
        const response = await fetch(`/api/contacts?segment=${segment}`);
        const data = await response.json();
        numbers = data.contacts.map(c => c.phone).filter(p => p);
      } else if (method === 'file') {
        const file = document.getElementById('numbers-file').files[0];
        if (!file) {
          this.showNotification('يرجى اختيار ملف الأرقام', 'error');
          return;
        }
        // For demo, we'll simulate file processing
        numbers = ['966501234567', '966501234568', '966501234569'];
      }

      if (numbers.length === 0) {
        this.showNotification('لا توجد أرقام للإرسال إليها', 'error');
        return;
      }

      const response = await fetch('/api/whatsapp/bulk-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numbers, message })
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification(`تم إرسال الرسالة لـ ${numbers.length} رقم بنجاح! ✅`, 'success');
        document.getElementById('bulk-send-form').reset();
        this.handleBulkMethodChange('manual'); // Reset to manual view
        this.loadConversations(); // Refresh conversations
      } else {
        this.showNotification('فشل في الإرسال الجماعي: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في الإرسال الجماعي: ' + error.message, 'error');
    }
  },

  async loadTemplates() {
    try {
      const response = await fetch('/api/whatsapp/templates');
      const data = await response.json();
      
      this.renderWhatsAppTemplates(data.templates || []);
      this.updateTemplateSelect(data.templates || []);
    } catch (error) {
      console.error('Error loading WhatsApp templates:', error);
      this.renderWhatsAppTemplates([]);
    }
  },

  renderWhatsAppTemplates(templates) {
    const grid = document.getElementById('whatsapp-templates-grid');
    if (!grid) return;

    if (templates.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-8">
          <i class="fab fa-whatsapp text-4xl text-gray-400 mb-4"></i>
          <p class="text-gray-600">لا توجد قوالب واتساب معتمدة</p>
          <button class="btn btn-outline mt-4" onclick="window.WhatsAppPage.showTemplateModal()">
            إنشاء أول قالب
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = templates.map(template => `
      <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center gap-3 mb-3">
          <i class="fab fa-whatsapp text-green-600"></i>
          <div class="flex-1">
            <h4 class="font-medium">${template.name}</h4>
            <p class="text-sm text-gray-600">${template.language || 'عربي'}</p>
          </div>
          <span class="text-xs px-2 py-1 rounded ${
            template.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }">
            ${template.status === 'approved' ? 'معتمد' : 'قيد المراجعة'}
          </span>
        </div>
        
        <div class="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">
          ${template.content}
        </div>
        
        <div class="flex gap-2">
          <button class="btn btn-outline flex-1" onclick="window.WhatsAppPage.useTemplate('${template.id}')">
            استخدام
          </button>
          <button class="btn btn-outline" onclick="window.WhatsAppPage.editTemplate('${template.id}')">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
    `).join('');
  },

  updateTemplateSelect(templates) {
    const select = document.getElementById('template-select');
    if (!select) return;

    const approvedTemplates = templates.filter(t => t.status === 'approved');
    
    select.innerHTML = '<option value="">اختر قالب معتمد</option>' + 
      approvedTemplates.map(template => 
        `<option value="${template.id}">${template.name}</option>`
      ).join('');
  },

  async loadConversations() {
    try {
      const response = await fetch('/api/whatsapp/conversations');
      const data = await response.json();
      
      this.renderConversations(data.conversations || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
      this.renderConversations([]);
    }
  },

  renderConversations(conversations) {
    const tbody = document.getElementById('conversations-table');
    if (!tbody) return;

    if (conversations.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-8 text-center text-gray-500">
            لا توجد محادثات
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = conversations.map(conv => `
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3 text-right">${conv.phone}</td>
        <td class="px-4 py-3 text-right">
          <div class="max-w-xs truncate">${conv.message}</div>
        </td>
        <td class="px-4 py-3">
          <span class="px-2 py-1 text-xs rounded-full ${this.getStatusColor(conv.status)}">
            ${this.getStatusText(conv.status)}
          </span>
        </td>
        <td class="px-4 py-3 text-right">${conv.sent_at}</td>
        <td class="px-4 py-3">
          <div class="flex gap-2">
            <button class="text-blue-600 hover:text-blue-800" onclick="window.WhatsAppPage.viewConversation('${conv.id}')">
              <i class="fas fa-eye"></i>
            </button>
            <button class="text-green-600 hover:text-green-800" onclick="window.WhatsAppPage.replyToConversation('${conv.id}')">
              <i class="fas fa-reply"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  getStatusColor(status) {
    const statusColors = {
      'sent': 'bg-blue-100 text-blue-800',
      'delivered': 'bg-green-100 text-green-800',
      'read': 'bg-gray-100 text-gray-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  },

  getStatusText(status) {
    const statusText = {
      'sent': 'مرسل',
      'delivered': 'تم التسليم',
      'read': 'تم القراءة',
      'failed': 'فاشل'
    };
    return statusText[status] || status;
  },

  showSetupModal() {
    const modal = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="setup-modal">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">إعداد واتساب بزنس API</h3>
            <button onclick="window.WhatsAppPage.closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="space-y-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="font-semibold text-blue-800 mb-2">متطلبات الإعداد:</h4>
              <ul class="text-blue-700 space-y-1 text-sm">
                <li>• حساب واتساب بزنس معتمد</li>
                <li>• رقم هاتف مخصص للأعمال</li>
                <li>• Access Token من Meta for Developers</li>
                <li>• Phone Number ID من إعدادات واتساب</li>
              </ul>
            </div>

            <form id="whatsapp-setup-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
                <input type="password" id="wa-access-token" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                       placeholder="EAAx...">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number ID</label>
                <input type="text" id="wa-phone-id" required
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                       placeholder="123456789012345">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Webhook Verify Token (اختياري)</label>
                <input type="text" id="wa-verify-token" 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                       placeholder="my_verify_token">
              </div>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-center gap-2">
                  <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                  <p class="text-sm text-yellow-800">
                    سيتم حفظ هذه البيانات في متغيرات البيئة الآمنة
                  </p>
                </div>
              </div>

              <div class="flex gap-4 pt-4">
                <button type="submit" class="btn btn-primary flex-1">حفظ الإعدادات</button>
                <button type="button" onclick="window.WhatsAppPage.closeModal()" class="btn btn-outline flex-1">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    document.getElementById('whatsapp-modals-container').innerHTML = modal;

    // Bind form submission
    document.getElementById('whatsapp-setup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveWhatsAppSetup();
    });
  },

  async saveWhatsAppSetup() {
    const accessToken = document.getElementById('wa-access-token').value;
    const phoneId = document.getElementById('wa-phone-id').value;
    const verifyToken = document.getElementById('wa-verify-token').value;

    try {
      const response = await fetch('/api/whatsapp/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          access_token: accessToken, 
          phone_number_id: phoneId,
          verify_token: verifyToken
        })
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification('تم حفظ إعدادات واتساب بنجاح! ✅', 'success');
        this.closeModal();
        this.checkConnectionStatus();
      } else {
        this.showNotification('فشل في حفظ الإعدادات: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في حفظ الإعدادات: ' + error.message, 'error');
    }
  },

  async testConnection() {
    try {
      const response = await fetch('/api/whatsapp/test', {
        method: 'POST'
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification('تم اختبار الاتصال بنجاح! ✅', 'success');
      } else {
        this.showNotification('فشل في الاتصال: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في اختبار الاتصال: ' + error.message, 'error');
    }
  },

  closeModal() {
    document.getElementById('whatsapp-modals-container').innerHTML = '';
  },

  showTemplateModal() {
    // Implementation for template creation modal
    console.log('Show template modal - to be implemented');
  },

  useTemplate(templateId) {
    console.log('Using template:', templateId);
    // Implementation for using template
  },

  editTemplate(templateId) {
    console.log('Editing template:', templateId);
    // Implementation for editing template
  },

  viewConversation(conversationId) {
    console.log('Viewing conversation:', conversationId);
    // Implementation for viewing conversation details
  },

  replyToConversation(conversationId) {
    console.log('Replying to conversation:', conversationId);
    // Implementation for replying to conversation
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