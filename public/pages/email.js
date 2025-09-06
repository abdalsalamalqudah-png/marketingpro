/**
 * Marketing Pro - Advanced Email Management System
 * Full-featured drag & drop email editor with A/B testing
 */

window.EmailPage = {
  currentTemplate: null,
  currentCampaign: null,
  templates: [],
  campaigns: [],
  isDragging: false,
  draggedElement: null,

  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <!-- Email Management Header -->
        <div class="mb-8">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-h1 font-bold mb-2">إدارة البريد الإلكتروني المتقدمة</h1>
              <p class="text-gray-600">نظام شامل لإنشاء وإدارة حملات البريد الإلكتروني مع محرر متقدم</p>
            </div>
            <div class="flex gap-3">
              <button id="create-campaign-btn" class="btn btn-primary">
                <i class="fas fa-plus"></i> حملة جديدة
              </button>
              <button id="create-template-btn" class="btn btn-outline">
                <i class="fas fa-file-alt"></i> قالب جديد
              </button>
              <button id="import-contacts-btn" class="btn btn-outline">
                <i class="fas fa-upload"></i> استيراد جهات الاتصال
              </button>
            </div>
          </div>
        </div>

        <!-- Email Management Tabs -->
        <div class="mb-6">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button class="email-tab active" data-tab="campaigns">
                <i class="fas fa-bullhorn"></i> الحملات
              </button>
              <button class="email-tab" data-tab="templates">
                <i class="fas fa-file-alt"></i> القوالب
              </button>
              <button class="email-tab" data-tab="contacts">
                <i class="fas fa-users"></i> جهات الاتصال
              </button>
              <button class="email-tab" data-tab="analytics">
                <i class="fas fa-chart-bar"></i> التحليلات
              </button>
              <button class="email-tab" data-tab="automation">
                <i class="fas fa-cogs"></i> الأتمتة
              </button>
            </nav>
          </div>
        </div>

        <!-- Tab Content -->
        <div id="email-content">
          <!-- Campaigns Tab -->
          <div id="campaigns-tab" class="email-tab-content active">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Campaign Stats -->
              <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">إجمالي الحملات</p>
                      <p class="text-2xl font-bold" id="total-campaigns">0</p>
                    </div>
                    <i class="fas fa-bullhorn text-blue-500 text-2xl"></i>
                  </div>
                </div>
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">معدل الفتح</p>
                      <p class="text-2xl font-bold" id="open-rate">0%</p>
                    </div>
                    <i class="fas fa-envelope-open text-green-500 text-2xl"></i>
                  </div>
                </div>
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">معدل النقر</p>
                      <p class="text-2xl font-bold" id="click-rate">0%</p>
                    </div>
                    <i class="fas fa-mouse-pointer text-yellow-500 text-2xl"></i>
                  </div>
                </div>
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">معدل التحويل</p>
                      <p class="text-2xl font-bold" id="conversion-rate">0%</p>
                    </div>
                    <i class="fas fa-chart-line text-purple-500 text-2xl"></i>
                  </div>
                </div>
              </div>

              <!-- Campaigns List -->
              <div class="lg:col-span-2">
                <div class="card">
                  <div class="flex items-center justify-between p-4 border-b">
                    <h3 class="text-lg font-bold">الحملات الأخيرة</h3>
                    <button class="text-blue-600 text-sm">عرض الكل</button>
                  </div>
                  <div id="campaigns-list" class="p-4">
                    <!-- Campaigns will be loaded here -->
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="lg:col-span-1">
                <div class="card p-4">
                  <h3 class="text-lg font-bold mb-4">إجراءات سريعة</h3>
                  <div class="space-y-3">
                    <button class="w-full btn btn-outline" id="quick-newsletter">
                      <i class="fas fa-newspaper"></i> نشرة إخبارية
                    </button>
                    <button class="w-full btn btn-outline" id="quick-promotion">
                      <i class="fas fa-percentage"></i> عرض ترويجي
                    </button>
                    <button class="w-full btn btn-outline" id="quick-welcome">
                      <i class="fas fa-hand-wave"></i> رسالة ترحيب
                    </button>
                    <button class="w-full btn btn-outline" id="quick-follow-up">
                      <i class="fas fa-reply"></i> رسالة متابعة
                    </button>
                  </div>
                </div>

                <!-- A/B Testing Results -->
                <div class="card p-4 mt-4">
                  <h3 class="text-lg font-bold mb-4">نتائج اختبار A/B</h3>
                  <div id="ab-test-results">
                    <!-- A/B test results will be loaded here -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Templates Tab -->
          <div id="templates-tab" class="email-tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <!-- Template Categories -->
              <div class="lg:col-span-1">
                <div class="card p-4">
                  <h3 class="text-lg font-bold mb-4">فئات القوالب</h3>
                  <div class="space-y-2">
                    <button class="template-category w-full text-right p-2 rounded hover:bg-gray-100 active" data-category="all">
                      جميع القوالب
                    </button>
                    <button class="template-category w-full text-right p-2 rounded hover:bg-gray-100" data-category="newsletter">
                      نشرات إخبارية
                    </button>
                    <button class="template-category w-full text-right p-2 rounded hover:bg-gray-100" data-category="promotional">
                      عروض ترويجية
                    </button>
                    <button class="template-category w-full text-right p-2 rounded hover:bg-gray-100" data-category="welcome">
                      رسائل ترحيب
                    </button>
                    <button class="template-category w-full text-right p-2 rounded hover:bg-gray-100" data-category="event">
                      دعوات أحداث
                    </button>
                    <button class="template-category w-full text-right p-2 rounded hover:bg-gray-100" data-category="custom">
                      قوالب مخصصة
                    </button>
                  </div>
                </div>
              </div>

              <!-- Templates Grid -->
              <div class="lg:col-span-3">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="templates-grid">
                  <!-- Templates will be loaded here -->
                </div>
              </div>
            </div>
          </div>

          <!-- Contacts Tab -->
          <div id="contacts-tab" class="email-tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Contact Stats -->
              <div class="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">إجمالي المشتركين</p>
                      <p class="text-2xl font-bold" id="total-subscribers">0</p>
                    </div>
                    <i class="fas fa-users text-blue-500 text-2xl"></i>
                  </div>
                </div>
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">مشتركين جدد</p>
                      <p class="text-2xl font-bold" id="new-subscribers">0</p>
                    </div>
                    <i class="fas fa-user-plus text-green-500 text-2xl"></i>
                  </div>
                </div>
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">إلغاء الاشتراك</p>
                      <p class="text-2xl font-bold" id="unsubscribed">0</p>
                    </div>
                    <i class="fas fa-user-minus text-red-500 text-2xl"></i>
                  </div>
                </div>
                <div class="card p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600">معدل التفاعل</p>
                      <p class="text-2xl font-bold" id="engagement-rate">0%</p>
                    </div>
                    <i class="fas fa-heart text-pink-500 text-2xl"></i>
                  </div>
                </div>
              </div>

              <!-- Contact Lists -->
              <div class="lg:col-span-2">
                <div class="card">
                  <div class="flex items-center justify-between p-4 border-b">
                    <h3 class="text-lg font-bold">قوائم جهات الاتصال</h3>
                    <button id="create-list-btn" class="btn btn-sm btn-primary">
                      <i class="fas fa-plus"></i> قائمة جديدة
                    </button>
                  </div>
                  <div id="contact-lists" class="p-4">
                    <!-- Contact lists will be loaded here -->
                  </div>
                </div>
              </div>

              <!-- Contact Management -->
              <div class="lg:col-span-1">
                <div class="card p-4">
                  <h3 class="text-lg font-bold mb-4">إدارة جهات الاتصال</h3>
                  <div class="space-y-3">
                    <button class="w-full btn btn-outline" id="bulk-import">
                      <i class="fas fa-file-import"></i> استيراد مجمع
                    </button>
                    <button class="w-full btn btn-outline" id="export-contacts">
                      <i class="fas fa-file-export"></i> تصدير جهات الاتصال
                    </button>
                    <button class="w-full btn btn-outline" id="segment-contacts">
                      <i class="fas fa-filter"></i> تقسيم المشتركين
                    </button>
                    <button class="w-full btn btn-outline" id="clean-list">
                      <i class="fas fa-broom"></i> تنظيف القائمة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Analytics Tab -->
          <div id="analytics-tab" class="email-tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Performance Chart -->
              <div class="card p-4">
                <h3 class="text-lg font-bold mb-4">أداء الحملات</h3>
                <canvas id="email-performance-chart" width="400" height="300"></canvas>
              </div>

              <!-- Open Rates Chart -->
              <div class="card p-4">
                <h3 class="text-lg font-bold mb-4">معدلات الفتح</h3>
                <canvas id="open-rates-chart" width="400" height="300"></canvas>
              </div>

              <!-- Top Performing Campaigns -->
              <div class="card p-4">
                <h3 class="text-lg font-bold mb-4">أفضل الحملات أداءً</h3>
                <div id="top-campaigns" class="space-y-3">
                  <!-- Top campaigns will be loaded here -->
                </div>
              </div>

              <!-- Subscriber Growth -->
              <div class="card p-4">
                <h3 class="text-lg font-bold mb-4">نمو المشتركين</h3>
                <canvas id="subscriber-growth-chart" width="400" height="300"></canvas>
              </div>
            </div>
          </div>

          <!-- Automation Tab -->
          <div id="automation-tab" class="email-tab-content">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Automation Workflows -->
              <div class="lg:col-span-2">
                <div class="card">
                  <div class="flex items-center justify-between p-4 border-b">
                    <h3 class="text-lg font-bold">سير العمل التلقائي</h3>
                    <button id="create-automation-btn" class="btn btn-primary">
                      <i class="fas fa-plus"></i> سير عمل جديد
                    </button>
                  </div>
                  <div id="automation-workflows" class="p-4">
                    <!-- Automation workflows will be loaded here -->
                  </div>
                </div>
              </div>

              <!-- Automation Templates -->
              <div class="lg:col-span-1">
                <div class="card p-4">
                  <h3 class="text-lg font-bold mb-4">قوالب الأتمتة</h3>
                  <div class="space-y-3">
                    <button class="w-full btn btn-outline automation-template" data-template="welcome-series">
                      <i class="fas fa-hand-wave"></i> سلسلة ترحيب
                    </button>
                    <button class="w-full btn btn-outline automation-template" data-template="abandoned-cart">
                      <i class="fas fa-shopping-cart"></i> عربة مهجورة
                    </button>
                    <button class="w-full btn btn-outline automation-template" data-template="birthday">
                      <i class="fas fa-birthday-cake"></i> عيد ميلاد
                    </button>
                    <button class="w-full btn btn-outline automation-template" data-template="re-engagement">
                      <i class="fas fa-sync"></i> إعادة تفاعل
                    </button>
                    <button class="w-full btn btn-outline automation-template" data-template="post-purchase">
                      <i class="fas fa-receipt"></i> ما بعد الشراء
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Email Editor Modal -->
        <div id="email-editor-modal" class="modal">
          <div class="modal-content max-w-7xl">
            <div class="modal-header">
              <h3 class="text-lg font-bold">محرر البريد الإلكتروني</h3>
              <div class="flex gap-2">
                <button id="save-template-btn" class="btn btn-outline">
                  <i class="fas fa-save"></i> حفظ كقالب
                </button>
                <button id="preview-email-btn" class="btn btn-outline">
                  <i class="fas fa-eye"></i> معاينة
                </button>
                <button id="send-test-btn" class="btn btn-outline">
                  <i class="fas fa-paper-plane"></i> إرسال تجريبي
                </button>
                <button class="modal-close">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            <div class="modal-body p-0">
              <div class="grid grid-cols-1 lg:grid-cols-4 h-full min-h-[600px]">
                <!-- Components Panel -->
                <div class="lg:col-span-1 bg-gray-50 p-4 border-l">
                  <h4 class="font-bold mb-4">مكونات البريد الإلكتروني</h4>
                  
                  <!-- Drag & Drop Components -->
                  <div class="space-y-3">
                    <div class="component-category mb-4">
                      <h5 class="font-semibold text-sm text-gray-700 mb-2">المحتوى</h5>
                      <div class="grid grid-cols-2 gap-2">
                        <div class="email-component" draggable="true" data-type="text">
                          <i class="fas fa-font"></i>
                          <span>نص</span>
                        </div>
                        <div class="email-component" draggable="true" data-type="heading">
                          <i class="fas fa-heading"></i>
                          <span>عنوان</span>
                        </div>
                        <div class="email-component" draggable="true" data-type="image">
                          <i class="fas fa-image"></i>
                          <span>صورة</span>
                        </div>
                        <div class="email-component" draggable="true" data-type="button">
                          <i class="fas fa-square"></i>
                          <span>زر</span>
                        </div>
                        <div class="email-component" draggable="true" data-type="divider">
                          <i class="fas fa-minus"></i>
                          <span>فاصل</span>
                        </div>
                        <div class="email-component" draggable="true" data-type="spacer">
                          <i class="fas fa-arrows-alt-v"></i>
                          <span>مساحة</span>
                        </div>
                      </div>
                    </div>

                    <div class="component-category mb-4">
                      <h5 class="font-semibold text-sm text-gray-700 mb-2">التخطيط</h5>
                      <div class="grid grid-cols-2 gap-2">
                        <div class="email-component" draggable="true" data-type="container">
                          <i class="fas fa-square-full"></i>
                          <span>حاوي</span>
                        </div>
                        <div class="email-component" draggable="true" data-type="columns">
                          <i class="fas fa-columns"></i>
                          <span>أعمدة</span>
                        </div>
                      </div>
                    </div>

                    <div class="component-category mb-4">
                      <h5 class="font-semibold text-sm text-gray-700 mb-2">التفاعل</h5>
                      <div class="grid grid-cols-2 gap-2">
                        <div class="email-component" draggable="true" data-type="social">
                          <i class="fas fa-share-alt"></i>
                          <span>اجتماعي</span>
                        </div>
                        <div class="email-component" draggable="true" data-type="video">
                          <i class="fas fa-play"></i>
                          <span>فيديو</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Email Canvas -->
                <div class="lg:col-span-2 bg-white relative">
                  <div class="email-canvas-header p-4 border-b bg-gray-100">
                    <div class="flex items-center justify-between">
                      <div class="flex gap-2">
                        <button class="btn btn-sm" id="undo-btn">
                          <i class="fas fa-undo"></i>
                        </button>
                        <button class="btn btn-sm" id="redo-btn">
                          <i class="fas fa-redo"></i>
                        </button>
                      </div>
                      <div class="flex gap-2">
                        <button class="btn btn-sm active" id="desktop-view">
                          <i class="fas fa-desktop"></i>
                        </button>
                        <button class="btn btn-sm" id="mobile-view">
                          <i class="fas fa-mobile-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div class="email-canvas p-4" id="email-canvas">
                    <div class="email-preview" id="email-preview">
                      <div class="drop-zone" id="main-drop-zone">
                        <div class="drop-zone-placeholder">
                          <i class="fas fa-plus"></i>
                          <p>اسحب المكونات هنا لبناء بريدك الإلكتروني</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Properties Panel -->
                <div class="lg:col-span-1 bg-gray-50 p-4 border-r">
                  <h4 class="font-bold mb-4">خصائص العنصر</h4>
                  
                  <div id="element-properties" class="space-y-4">
                    <div class="text-center text-gray-500 py-8">
                      <i class="fas fa-mouse-pointer text-3xl mb-2"></i>
                      <p class="text-sm">اختر عنصراً لتعديل خصائصه</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <div class="flex justify-between items-center">
                <div class="flex gap-2">
                  <button id="ab-test-btn" class="btn btn-outline">
                    <i class="fas fa-flask"></i> اختبار A/B
                  </button>
                  <button id="schedule-btn" class="btn btn-outline">
                    <i class="fas fa-calendar"></i> جدولة الإرسال
                  </button>
                </div>
                <div class="flex gap-2">
                  <button class="btn btn-outline modal-close">إلغاء</button>
                  <button id="save-campaign-btn" class="btn btn-primary">
                    <i class="fas fa-save"></i> حفظ الحملة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- A/B Test Modal -->
        <div id="ab-test-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="text-lg font-bold">إعداد اختبار A/B</h3>
              <button class="modal-close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <div class="modal-body">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Version A -->
                <div class="border rounded-lg p-4">
                  <h4 class="font-bold mb-3">النسخة A</h4>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1">عنوان الرسالة</label>
                      <input type="text" id="ab-subject-a" class="form-input" placeholder="عنوان النسخة A">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">نسبة التوزيع</label>
                      <input type="range" id="ab-split-a" min="10" max="50" value="50" class="w-full">
                      <span class="text-sm text-gray-600" id="ab-percentage-a">50%</span>
                    </div>
                  </div>
                </div>

                <!-- Version B -->
                <div class="border rounded-lg p-4">
                  <h4 class="font-bold mb-3">النسخة B</h4>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium mb-1">عنوان الرسالة</label>
                      <input type="text" id="ab-subject-b" class="form-input" placeholder="عنوان النسخة B">
                    </div>
                    <div>
                      <label class="block text-sm font-medium mb-1">نسبة التوزيع</label>
                      <input type="range" id="ab-split-b" min="10" max="50" value="50" class="w-full">
                      <span class="text-sm text-gray-600" id="ab-percentage-b">50%</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Test Settings -->
              <div class="mt-6 space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1">معيار الفوز</label>
                  <select id="ab-winner-criteria" class="form-select">
                    <option value="open_rate">معدل الفتح</option>
                    <option value="click_rate">معدل النقر</option>
                    <option value="conversion_rate">معدل التحويل</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">مدة الاختبار (ساعات)</label>
                  <input type="number" id="ab-duration" min="1" max="168" value="24" class="form-input">
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">الحد الأدنى للعينة</label>
                  <input type="number" id="ab-min-sample" min="100" value="1000" class="form-input">
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <div class="flex gap-2">
                <button class="btn btn-outline modal-close">إلغاء</button>
                <button id="create-ab-test-btn" class="btn btn-primary">إنشاء الاختبار</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    console.log('Initializing Email Management System...');
    
    // Initialize tabs
    this.initializeTabs();
    
    // Initialize drag and drop
    this.initializeDragAndDrop();
    
    // Load initial data
    await this.loadCampaigns();
    await this.loadTemplates();
    await this.loadContacts();
    await this.loadAnalytics();
    
    // Bind events
    this.bindEvents();
    
    console.log('Email Management System initialized successfully');
  },

  initializeTabs() {
    const tabs = document.querySelectorAll('.email-tab');
    const tabContents = document.querySelectorAll('.email-tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const targetTab = e.target.closest('.email-tab').dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === `${targetTab}-tab`) {
            content.classList.add('active');
          }
        });
        
        // Load tab-specific data
        this.loadTabData(targetTab);
      });
    });
  },

  async loadTabData(tabName) {
    switch (tabName) {
      case 'campaigns':
        await this.loadCampaigns();
        break;
      case 'templates':
        await this.loadTemplates();
        break;
      case 'contacts':
        await this.loadContacts();
        break;
      case 'analytics':
        await this.loadAnalytics();
        break;
      case 'automation':
        await this.loadAutomation();
        break;
    }
  },

  async loadCampaigns() {
    try {
      const response = await fetch('/api/email/campaigns');
      const data = await response.json();
      
      this.campaigns = data.campaigns || [];
      this.renderCampaigns();
      this.updateCampaignStats();
    } catch (error) {
      console.error('Error loading campaigns:', error);
      this.campaigns = this.getMockCampaigns();
      this.renderCampaigns();
      this.updateCampaignStats();
    }
  },

  renderCampaigns() {
    const container = document.getElementById('campaigns-list');
    if (!container) return;

    if (this.campaigns.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8">
          <i class="fas fa-bullhorn text-4xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 mb-4">لا توجد حملات بريد إلكتروني حتى الآن</p>
          <button class="btn btn-primary" id="create-first-campaign">
            <i class="fas fa-plus"></i> إنشاء أول حملة
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.campaigns.map(campaign => `
      <div class="campaign-item border-b border-gray-100 py-4 last:border-b-0">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h4 class="font-semibold mb-1">${campaign.name}</h4>
            <p class="text-sm text-gray-600 mb-2">${campaign.subject}</p>
            <div class="flex gap-4 text-xs text-gray-500">
              <span><i class="fas fa-users"></i> ${campaign.recipients || 0} مستلم</span>
              <span><i class="fas fa-envelope-open"></i> ${campaign.open_rate || 0}% فتح</span>
              <span><i class="fas fa-mouse-pointer"></i> ${campaign.click_rate || 0}% نقر</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="campaign-status ${campaign.status}">${this.getStatusText(campaign.status)}</span>
            <div class="dropdown">
              <button class="btn btn-sm btn-outline">
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <div class="dropdown-menu">
                <button class="dropdown-item" onclick="window.EmailPage.editCampaign(${campaign.id})">
                  <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="dropdown-item" onclick="window.EmailPage.duplicateCampaign(${campaign.id})">
                  <i class="fas fa-copy"></i> نسخ
                </button>
                <button class="dropdown-item" onclick="window.EmailPage.viewReports(${campaign.id})">
                  <i class="fas fa-chart-bar"></i> التقارير
                </button>
                <hr class="dropdown-divider">
                <button class="dropdown-item text-red-600" onclick="window.EmailPage.deleteCampaign(${campaign.id})">
                  <i class="fas fa-trash"></i> حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  updateCampaignStats() {
    const totalElement = document.getElementById('total-campaigns');
    const openRateElement = document.getElementById('open-rate');
    const clickRateElement = document.getElementById('click-rate');
    const conversionRateElement = document.getElementById('conversion-rate');

    if (totalElement) totalElement.textContent = this.campaigns.length;
    
    // Calculate averages
    if (this.campaigns.length > 0) {
      const avgOpenRate = this.campaigns.reduce((sum, campaign) => sum + (campaign.open_rate || 0), 0) / this.campaigns.length;
      const avgClickRate = this.campaigns.reduce((sum, campaign) => sum + (campaign.click_rate || 0), 0) / this.campaigns.length;
      const avgConversionRate = this.campaigns.reduce((sum, campaign) => sum + (campaign.conversion_rate || 0), 0) / this.campaigns.length;

      if (openRateElement) openRateElement.textContent = `${avgOpenRate.toFixed(1)}%`;
      if (clickRateElement) clickRateElement.textContent = `${avgClickRate.toFixed(1)}%`;
      if (conversionRateElement) conversionRateElement.textContent = `${avgConversionRate.toFixed(1)}%`;
    }
  },

  async loadTemplates() {
    try {
      const response = await fetch('/api/email/templates');
      const data = await response.json();
      
      this.templates = data.templates || [];
      this.renderTemplates();
    } catch (error) {
      console.error('Error loading templates:', error);
      this.templates = this.getMockTemplates();
      this.renderTemplates();
    }
  },

  renderTemplates() {
    const container = document.getElementById('templates-grid');
    if (!container) return;

    if (this.templates.length === 0) {
      container.innerHTML = `
        <div class="col-span-3 text-center py-8">
          <i class="fas fa-file-alt text-4xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 mb-4">لا توجد قوالب متاحة</p>
          <button class="btn btn-primary" id="create-first-template">
            <i class="fas fa-plus"></i> إنشاء أول قالب
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.templates.map(template => `
      <div class="template-card card p-4 cursor-pointer hover:shadow-lg transition-shadow" data-template-id="${template.id}">
        <div class="template-preview mb-3">
          <img src="${template.thumbnail || '/images/email-template-default.png'}" alt="${template.name}" class="w-full h-32 object-cover rounded">
        </div>
        <h4 class="font-semibold mb-1">${template.name}</h4>
        <p class="text-sm text-gray-600 mb-3">${template.description}</p>
        <div class="flex justify-between items-center">
          <span class="text-xs px-2 py-1 bg-gray-100 rounded">${template.category}</span>
          <div class="flex gap-1">
            <button class="btn btn-sm btn-outline" onclick="window.EmailPage.previewTemplate(${template.id})">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-primary" onclick="window.EmailPage.useTemplate(${template.id})">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  async loadContacts() {
    try {
      const response = await fetch('/api/email/contacts');
      const data = await response.json();
      
      this.renderContactStats(data.stats);
      this.renderContactLists(data.lists);
    } catch (error) {
      console.error('Error loading contacts:', error);
      this.renderContactStats(this.getMockContactStats());
      this.renderContactLists(this.getMockContactLists());
    }
  },

  renderContactStats(stats) {
    const elements = {
      'total-subscribers': stats.total || 0,
      'new-subscribers': stats.new || 0,
      'unsubscribed': stats.unsubscribed || 0,
      'engagement-rate': `${stats.engagement_rate || 0}%`
    };

    Object.keys(elements).forEach(id => {
      const element = document.getElementById(id);
      if (element) element.textContent = elements[id];
    });
  },

  renderContactLists(lists) {
    const container = document.getElementById('contact-lists');
    if (!container) return;

    container.innerHTML = lists.map(list => `
      <div class="contact-list-item flex items-center justify-between p-3 border border-gray-200 rounded mb-2">
        <div class="flex items-center gap-3">
          <i class="fas fa-users text-blue-500"></i>
          <div>
            <h4 class="font-semibold">${list.name}</h4>
            <p class="text-sm text-gray-600">${list.subscribers} مشترك</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-sm btn-outline" onclick="window.EmailPage.editList(${list.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-sm btn-outline" onclick="window.EmailPage.viewList(${list.id})">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    `).join('');
  },

  async loadAnalytics() {
    try {
      const response = await fetch('/api/email/analytics');
      const data = await response.json();
      
      this.renderAnalyticsCharts(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
      this.renderAnalyticsCharts(this.getMockAnalytics());
    }
  },

  renderAnalyticsCharts(data) {
    // Render performance chart
    this.renderPerformanceChart(data.performance);
    
    // Render open rates chart
    this.renderOpenRatesChart(data.openRates);
    
    // Render subscriber growth chart
    this.renderSubscriberGrowthChart(data.subscriberGrowth);
    
    // Render top campaigns
    this.renderTopCampaigns(data.topCampaigns);
  },

  async loadAutomation() {
    try {
      const response = await fetch('/api/email/automation');
      const data = await response.json();
      
      this.renderAutomationWorkflows(data.workflows);
    } catch (error) {
      console.error('Error loading automation:', error);
      this.renderAutomationWorkflows(this.getMockAutomation());
    }
  },

  initializeDragAndDrop() {
    // Initialize drag and drop for email components
    const components = document.querySelectorAll('.email-component');
    const dropZone = document.getElementById('main-drop-zone');

    components.forEach(component => {
      component.addEventListener('dragstart', this.handleDragStart.bind(this));
      component.addEventListener('dragend', this.handleDragEnd.bind(this));
    });

    if (dropZone) {
      dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
      dropZone.addEventListener('drop', this.handleDrop.bind(this));
    }
  },

  handleDragStart(e) {
    this.isDragging = true;
    this.draggedElement = e.target.closest('.email-component');
    e.dataTransfer.setData('text/plain', this.draggedElement.dataset.type);
    e.dataTransfer.effectAllowed = 'copy';
  },

  handleDragEnd(e) {
    this.isDragging = false;
    this.draggedElement = null;
  },

  handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  },

  handleDrop(e) {
    e.preventDefault();
    const componentType = e.dataTransfer.getData('text/plain');
    this.addComponentToCanvas(componentType, e.target);
  },

  addComponentToCanvas(type, targetElement) {
    const component = this.createEmailComponent(type);
    
    // Find the appropriate drop zone
    let dropZone = targetElement.closest('.drop-zone') || document.getElementById('main-drop-zone');
    
    // Remove placeholder if exists
    const placeholder = dropZone.querySelector('.drop-zone-placeholder');
    if (placeholder) {
      placeholder.remove();
    }
    
    // Add the component
    dropZone.appendChild(component);
    
    // Make it selectable
    this.makeComponentSelectable(component);
  },

  createEmailComponent(type) {
    const component = document.createElement('div');
    component.className = 'email-component-instance';
    component.dataset.type = type;

    switch (type) {
      case 'text':
        component.innerHTML = `
          <div class="component-wrapper">
            <div class="component-content">
              <p class="editable-text">اكتب نصك هنا...</p>
            </div>
            <div class="component-controls">
              <button class="btn btn-sm" onclick="window.EmailPage.editComponent(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm" onclick="window.EmailPage.removeComponent(this)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        break;
      case 'heading':
        component.innerHTML = `
          <div class="component-wrapper">
            <div class="component-content">
              <h2 class="editable-heading">عنوان رئيسي</h2>
            </div>
            <div class="component-controls">
              <button class="btn btn-sm" onclick="window.EmailPage.editComponent(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm" onclick="window.EmailPage.removeComponent(this)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        break;
      case 'image':
        component.innerHTML = `
          <div class="component-wrapper">
            <div class="component-content">
              <img src="/images/placeholder-image.png" alt="صورة" class="max-w-full h-auto">
            </div>
            <div class="component-controls">
              <button class="btn btn-sm" onclick="window.EmailPage.editComponent(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm" onclick="window.EmailPage.removeComponent(this)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        break;
      case 'button':
        component.innerHTML = `
          <div class="component-wrapper">
            <div class="component-content text-center">
              <a href="#" class="btn btn-primary editable-button">انقر هنا</a>
            </div>
            <div class="component-controls">
              <button class="btn btn-sm" onclick="window.EmailPage.editComponent(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm" onclick="window.EmailPage.removeComponent(this)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        break;
      case 'divider':
        component.innerHTML = `
          <div class="component-wrapper">
            <div class="component-content">
              <hr class="border-gray-300">
            </div>
            <div class="component-controls">
              <button class="btn btn-sm" onclick="window.EmailPage.editComponent(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm" onclick="window.EmailPage.removeComponent(this)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        break;
      case 'spacer':
        component.innerHTML = `
          <div class="component-wrapper">
            <div class="component-content">
              <div class="spacer" style="height: 20px;"></div>
            </div>
            <div class="component-controls">
              <button class="btn btn-sm" onclick="window.EmailPage.editComponent(this)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-sm" onclick="window.EmailPage.removeComponent(this)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
        break;
      default:
        component.innerHTML = `
          <div class="component-wrapper">
            <div class="component-content">
              <p>مكون غير معروف</p>
            </div>
          </div>
        `;
    }

    return component;
  },

  makeComponentSelectable(component) {
    component.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Remove selection from other components
      document.querySelectorAll('.email-component-instance.selected').forEach(el => {
        el.classList.remove('selected');
      });
      
      // Select this component
      component.classList.add('selected');
      
      // Show properties panel
      this.showComponentProperties(component);
    });
  },

  showComponentProperties(component) {
    const propertiesPanel = document.getElementById('element-properties');
    if (!propertiesPanel) return;

    const type = component.dataset.type;
    let propertiesHTML = '';

    switch (type) {
      case 'text':
        propertiesHTML = this.getTextProperties(component);
        break;
      case 'heading':
        propertiesHTML = this.getHeadingProperties(component);
        break;
      case 'image':
        propertiesHTML = this.getImageProperties(component);
        break;
      case 'button':
        propertiesHTML = this.getButtonProperties(component);
        break;
      case 'divider':
        propertiesHTML = this.getDividerProperties(component);
        break;
      case 'spacer':
        propertiesHTML = this.getSpacerProperties(component);
        break;
      default:
        propertiesHTML = '<p>لا توجد خصائص متاحة</p>';
    }

    propertiesPanel.innerHTML = propertiesHTML;
  },

  getTextProperties(component) {
    const textElement = component.querySelector('.editable-text');
    return `
      <div class="space-y-4">
        <h5 class="font-semibold">خصائص النص</h5>
        
        <div>
          <label class="block text-sm font-medium mb-1">النص</label>
          <textarea class="form-textarea" rows="3" onchange="window.EmailPage.updateTextContent(this)">${textElement.textContent}</textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">حجم الخط</label>
          <select class="form-select" onchange="window.EmailPage.updateTextSize(this)">
            <option value="12">12px</option>
            <option value="14" selected>14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">لون النص</label>
          <input type="color" class="form-input" value="#000000" onchange="window.EmailPage.updateTextColor(this)">
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">محاذاة النص</label>
          <div class="flex gap-2">
            <button class="btn btn-sm" onclick="window.EmailPage.updateTextAlign('right')">
              <i class="fas fa-align-right"></i>
            </button>
            <button class="btn btn-sm" onclick="window.EmailPage.updateTextAlign('center')">
              <i class="fas fa-align-center"></i>
            </button>
            <button class="btn btn-sm" onclick="window.EmailPage.updateTextAlign('left')">
              <i class="fas fa-align-left"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  getButtonProperties(component) {
    const buttonElement = component.querySelector('.editable-button');
    return `
      <div class="space-y-4">
        <h5 class="font-semibold">خصائص الزر</h5>
        
        <div>
          <label class="block text-sm font-medium mb-1">نص الزر</label>
          <input type="text" class="form-input" value="${buttonElement.textContent}" onchange="window.EmailPage.updateButtonText(this)">
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">رابط الزر</label>
          <input type="url" class="form-input" value="${buttonElement.href}" onchange="window.EmailPage.updateButtonLink(this)">
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">لون الخلفية</label>
          <input type="color" class="form-input" value="#3b82f6" onchange="window.EmailPage.updateButtonColor(this)">
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">نمط الزر</label>
          <select class="form-select" onchange="window.EmailPage.updateButtonStyle(this)">
            <option value="primary">أساسي</option>
            <option value="secondary">ثانوي</option>
            <option value="outline">محدد</option>
          </select>
        </div>
      </div>
    `;
  },

  bindEvents() {
    // Create campaign button
    const createCampaignBtn = document.getElementById('create-campaign-btn');
    if (createCampaignBtn) {
      createCampaignBtn.addEventListener('click', this.openEmailEditor.bind(this));
    }

    // Create template button
    const createTemplateBtn = document.getElementById('create-template-btn');
    if (createTemplateBtn) {
      createTemplateBtn.addEventListener('click', this.openTemplateEditor.bind(this));
    }

    // Quick action buttons
    document.querySelectorAll('[id^="quick-"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.id.replace('quick-', '');
        this.createQuickCampaign(action);
      });
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', this.closeModals.bind(this));
    });

    // A/B test button
    const abTestBtn = document.getElementById('ab-test-btn');
    if (abTestBtn) {
      abTestBtn.addEventListener('click', this.openABTestModal.bind(this));
    }

    // Template category buttons
    document.querySelectorAll('.template-category').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.filterTemplates(category);
      });
    });

    // Email canvas click to deselect
    const emailCanvas = document.getElementById('email-canvas');
    if (emailCanvas) {
      emailCanvas.addEventListener('click', (e) => {
        if (e.target === emailCanvas) {
          this.deselectAllComponents();
        }
      });
    }
  },

  openEmailEditor(template = null) {
    const modal = document.getElementById('email-editor-modal');
    if (modal) {
      modal.classList.add('active');
      
      if (template) {
        this.loadTemplateInEditor(template);
      } else {
        this.initializeEmptyEditor();
      }
    }
  },

  openTemplateEditor() {
    this.openEmailEditor();
  },

  openABTestModal() {
    const modal = document.getElementById('ab-test-modal');
    if (modal) {
      modal.classList.add('active');
    }
  },

  closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.remove('active');
    });
  },

  createQuickCampaign(type) {
    // Load appropriate template based on type
    const templates = {
      newsletter: 'newsletter-template',
      promotion: 'promotional-template',
      welcome: 'welcome-template',
      'follow-up': 'followup-template'
    };

    const templateId = templates[type];
    if (templateId) {
      this.openEmailEditor(templateId);
    }
  },

  // Component editing methods
  editComponent(button) {
    const component = button.closest('.email-component-instance');
    component.click(); // Select the component to show properties
  },

  removeComponent(button) {
    const component = button.closest('.email-component-instance');
    if (confirm('هل أنت متأكد من حذف هذا المكون؟')) {
      component.remove();
    }
  },

  updateTextContent(textarea) {
    const selectedComponent = document.querySelector('.email-component-instance.selected');
    if (selectedComponent) {
      const textElement = selectedComponent.querySelector('.editable-text');
      if (textElement) {
        textElement.textContent = textarea.value;
      }
    }
  },

  updateButtonText(input) {
    const selectedComponent = document.querySelector('.email-component-instance.selected');
    if (selectedComponent) {
      const buttonElement = selectedComponent.querySelector('.editable-button');
      if (buttonElement) {
        buttonElement.textContent = input.value;
      }
    }
  },

  deselectAllComponents() {
    document.querySelectorAll('.email-component-instance.selected').forEach(el => {
      el.classList.remove('selected');
    });
    
    // Clear properties panel
    const propertiesPanel = document.getElementById('element-properties');
    if (propertiesPanel) {
      propertiesPanel.innerHTML = `
        <div class="text-center text-gray-500 py-8">
          <i class="fas fa-mouse-pointer text-3xl mb-2"></i>
          <p class="text-sm">اختر عنصراً لتعديل خصائصه</p>
        </div>
      `;
    }
  },

  // Mock data methods for development
  getMockCampaigns() {
    return [
      {
        id: 1,
        name: 'حملة عروض الصيف',
        subject: 'خصومات حصرية تصل إلى 50%',
        status: 'sent',
        recipients: 1250,
        open_rate: 24.5,
        click_rate: 3.2,
        conversion_rate: 1.8,
        created_at: '2024-01-15'
      },
      {
        id: 2,
        name: 'نشرة المنتجات الجديدة',
        subject: 'اكتشف مجموعتنا الجديدة',
        status: 'scheduled',
        recipients: 890,
        open_rate: 28.1,
        click_rate: 4.5,
        conversion_rate: 2.1,
        created_at: '2024-01-14'
      },
      {
        id: 3,
        name: 'رسالة ترحيب للعملاء الجدد',
        subject: 'مرحباً بك في عائلتنا',
        status: 'draft',
        recipients: 0,
        open_rate: 0,
        click_rate: 0,
        conversion_rate: 0,
        created_at: '2024-01-13'
      }
    ];
  },

  getMockTemplates() {
    return [
      {
        id: 1,
        name: 'قالب النشرة الإخبارية',
        description: 'قالب أنيق للنشرات الإخبارية',
        category: 'newsletter',
        thumbnail: '/images/newsletter-template.png'
      },
      {
        id: 2,
        name: 'قالب العرض الترويجي',
        description: 'قالب مخصص للعروض والخصومات',
        category: 'promotional',
        thumbnail: '/images/promo-template.png'
      },
      {
        id: 3,
        name: 'قالب رسالة الترحيب',
        description: 'قالب ترحيبي للعملاء الجدد',
        category: 'welcome',
        thumbnail: '/images/welcome-template.png'
      }
    ];
  },

  getMockContactStats() {
    return {
      total: 2150,
      new: 45,
      unsubscribed: 12,
      engagement_rate: 68.5
    };
  },

  getMockContactLists() {
    return [
      { id: 1, name: 'العملاء المميزون', subscribers: 450 },
      { id: 2, name: 'المشتركون الجدد', subscribers: 230 },
      { id: 3, name: 'عملاء متكررون', subscribers: 680 },
      { id: 4, name: 'قائمة VIP', subscribers: 125 }
    ];
  },

  getStatusText(status) {
    const statusTexts = {
      draft: 'مسودة',
      scheduled: 'مجدولة',
      sending: 'يتم الإرسال',
      sent: 'تم الإرسال',
      paused: 'متوقفة'
    };
    return statusTexts[status] || status;
  }
};

// Add CSS for email management
const emailStyles = `
<style>
.email-tab {
  @apply py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent;
}

.email-tab.active {
  @apply text-blue-600 border-blue-600;
}

.email-tab-content {
  @apply hidden;
}

.email-tab-content.active {
  @apply block;
}

.campaign-status {
  @apply px-2 py-1 text-xs rounded-full;
}

.campaign-status.draft {
  @apply bg-gray-100 text-gray-800;
}

.campaign-status.scheduled {
  @apply bg-blue-100 text-blue-800;
}

.campaign-status.sending {
  @apply bg-yellow-100 text-yellow-800;
}

.campaign-status.sent {
  @apply bg-green-100 text-green-800;
}

.campaign-status.paused {
  @apply bg-red-100 text-red-800;
}

.template-card:hover {
  @apply transform scale-105;
}

.template-category.active {
  @apply bg-blue-100 text-blue-600;
}

.modal {
  @apply fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden;
}

.modal.active {
  @apply flex;
}

.modal-content {
  @apply bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden;
}

.modal-header {
  @apply flex items-center justify-between p-4 border-b;
}

.modal-body {
  @apply overflow-y-auto;
  max-height: calc(90vh - 140px);
}

.modal-footer {
  @apply p-4 border-t bg-gray-50;
}

.email-component {
  @apply flex flex-col items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded cursor-move hover:border-blue-400 hover:bg-blue-50 transition-colors;
}

.email-component i {
  @apply text-xl mb-1;
}

.email-component span {
  @apply text-xs;
}

.drop-zone {
  @apply min-h-[400px] border-2 border-dashed border-gray-300 rounded p-4;
}

.drop-zone-placeholder {
  @apply flex flex-col items-center justify-center h-full text-gray-500 py-20;
}

.drop-zone-placeholder i {
  @apply text-4xl mb-4;
}

.email-component-instance {
  @apply relative mb-4 border border-transparent hover:border-blue-400 rounded p-2;
}

.email-component-instance.selected {
  @apply border-blue-500 bg-blue-50;
}

.component-wrapper {
  @apply relative;
}

.component-controls {
  @apply absolute top-0 left-0 flex gap-1 opacity-0 hover:opacity-100 transition-opacity;
}

.email-component-instance:hover .component-controls {
  @apply opacity-100;
}

.form-input, .form-select, .form-textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}
</style>
`;

// Inject styles
if (!document.getElementById('email-styles')) {
  const styleElement = document.createElement('div');
  styleElement.id = 'email-styles';
  styleElement.innerHTML = emailStyles;
  document.head.appendChild(styleElement);
}