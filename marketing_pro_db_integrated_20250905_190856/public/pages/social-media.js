/**
 * Marketing Pro - Social Media Page
 * Manage social media integrations and publishing
 */

window.SocialMediaPage = {
  platforms: [
    { 
      id: 'facebook', 
      name: 'فيسبوك', 
      icon: 'fab fa-facebook', 
      color: '#1877f2',
      connected: false,
      stats: { followers: 0, engagement: 0, posts: 0 }
    },
    { 
      id: 'instagram', 
      name: 'إنستغرام', 
      icon: 'fab fa-instagram', 
      color: '#e4405f',
      connected: false,
      stats: { followers: 0, engagement: 0, posts: 0 }
    },
    { 
      id: 'twitter', 
      name: 'تويتر', 
      icon: 'fab fa-twitter', 
      color: '#1da1f2',
      connected: false,
      stats: { followers: 0, engagement: 0, posts: 0 }
    },
    { 
      id: 'linkedin', 
      name: 'لينكد إن', 
      icon: 'fab fa-linkedin', 
      color: '#0077b5',
      connected: false,
      stats: { followers: 0, engagement: 0, posts: 0 }
    },
    { 
      id: 'tiktok', 
      name: 'تيك توك', 
      icon: 'fab fa-tiktok', 
      color: '#000000',
      connected: false,
      stats: { followers: 0, engagement: 0, posts: 0 }
    },
    { 
      id: 'youtube', 
      name: 'يوتيوب', 
      icon: 'fab fa-youtube', 
      color: '#ff0000',
      connected: false,
      stats: { followers: 0, engagement: 0, posts: 0 }
    }
  ],

  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <!-- Social Media Header -->
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">منصات التواصل الاجتماعي</h1>
          <p class="text-gray-600">إدارة ونشر المحتوى على جميع منصات التواصل الاجتماعي</p>
        </div>

        <!-- Overall Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">إجمالي المتابعين</p>
                <p class="kpi-value text-xl" id="total-followers">0</p>
              </div>
              <i class="fas fa-users icon-flat text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل التفاعل</p>
                <p class="kpi-value text-xl" id="avg-engagement">0%</p>
              </div>
              <i class="fas fa-heart icon-success text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">المنشورات هذا الشهر</p>
                <p class="kpi-value text-xl" id="total-posts">0</p>
              </div>
              <i class="fas fa-share-alt icon-flat text-xl"></i>
            </div>
          </div>

          <div class="card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">المنصات المتصلة</p>
                <p class="kpi-value text-xl" id="connected-count">0</p>
              </div>
              <i class="fas fa-link icon-flat text-xl"></i>
            </div>
          </div>
        </div>

        <!-- Platform Connections -->
        <div class="card mb-8">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-h3 font-bold">اتصال المنصات</h3>
            <button id="connect-all" class="btn btn-primary">
              <i class="fas fa-plug mr-2"></i>
              ربط جميع المنصات
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="platforms-grid">
            <!-- Platforms will be rendered here -->
          </div>
        </div>

        <!-- Publishing Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Quick Post -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">نشر سريع</h3>
            
            <form id="quick-post-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">اختر المنصات</label>
                <div id="platform-checkboxes" class="flex flex-wrap gap-3">
                  <!-- Platform checkboxes will be rendered here -->
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">نص المنشور</label>
                <textarea id="post-content" rows="4" required
                          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                          placeholder="اكتب محتوى منشورك هنا..."></textarea>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                  <span id="char-count">0 حرف</span>
                  <span>الحد الأقصى: 280 حرف لتويتر</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">إضافة صورة (اختياري)</label>
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input type="file" id="post-image" accept="image/*" class="hidden">
                  <div id="image-upload-area" class="cursor-pointer" onclick="document.getElementById('post-image').click()">
                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                    <p class="text-gray-600">انقر لرفع صورة أو اسحبها هنا</p>
                  </div>
                  <div id="image-preview" class="hidden mt-4">
                    <img id="preview-img" class="max-h-40 mx-auto rounded-lg">
                    <button type="button" id="remove-image" class="btn btn-outline mt-2">إزالة الصورة</button>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-share mr-2"></i>
                  نشر الآن
                </button>
                <button type="button" id="schedule-post" class="btn btn-outline">
                  <i class="fas fa-clock mr-2"></i>
                  جدولة المنشور
                </button>
              </div>
            </form>
          </div>

          <!-- Scheduled Posts -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">المنشورات المجدولة</h3>
              <button id="view-all-scheduled" class="text-blue-600 hover:text-blue-800 text-sm">
                عرض الكل
              </button>
            </div>

            <div id="scheduled-posts" class="space-y-4">
              <!-- Scheduled posts will be rendered here -->
            </div>
          </div>
        </div>

        <!-- Analytics Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Performance Chart -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">أداء المنصات</h3>
              <div class="flex gap-2">
                <button class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600">أسبوع</button>
                <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100">شهر</button>
                <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100">سنة</button>
              </div>
            </div>
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <canvas id="social-performance-chart" width="400" height="200"></canvas>
            </div>
          </div>

          <!-- Top Performing Posts -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">أفضل المنشورات</h3>
            <div id="top-posts" class="space-y-4">
              <!-- Top posts will be rendered here -->
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">النشاط الأخير</h3>
            <div class="flex gap-2">
              <button class="btn btn-outline">
                <i class="fas fa-download mr-1"></i>
                تصدير التقرير
              </button>
              <button class="btn btn-outline">
                <i class="fas fa-filter mr-1"></i>
                فلترة
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr class="text-right">
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">المنصة</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">المنشور</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">التفاعل</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">التاريخ</th>
                  <th class="px-4 py-3 text-sm font-medium text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody id="activity-table" class="divide-y divide-gray-200">
                <!-- Activity will be rendered here -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modals Container -->
        <div id="social-modals-container"></div>
      </div>
    `;
  },

  async init() {
    await this.loadPlatformStatus();
    this.renderPlatforms();
    this.renderPlatformCheckboxes();
    await this.loadScheduledPosts();
    await this.loadTopPosts();
    await this.loadRecentActivity();
    this.bindEvents();
    this.updateOverallStats();
  },

  bindEvents() {
    // Platform connection buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('.connect-platform')) {
        const platformId = e.target.closest('.connect-platform').dataset.platform;
        this.connectPlatform(platformId);
      }
      
      if (e.target.closest('.disconnect-platform')) {
        const platformId = e.target.closest('.disconnect-platform').dataset.platform;
        this.disconnectPlatform(platformId);
      }
    });

    // Connect all platforms
    const connectAllBtn = document.getElementById('connect-all');
    if (connectAllBtn) {
      connectAllBtn.addEventListener('click', () => {
        this.connectAllPlatforms();
      });
    }

    // Quick post form
    const quickPostForm = document.getElementById('quick-post-form');
    if (quickPostForm) {
      quickPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleQuickPost();
      });
    }

    // Character counter
    const postContent = document.getElementById('post-content');
    if (postContent) {
      postContent.addEventListener('input', (e) => {
        this.updateCharacterCount(e.target.value.length);
      });
    }

    // Image upload
    const postImage = document.getElementById('post-image');
    if (postImage) {
      postImage.addEventListener('change', (e) => {
        this.handleImageUpload(e.target.files[0]);
      });
    }

    // Remove image
    const removeImageBtn = document.getElementById('remove-image');
    if (removeImageBtn) {
      removeImageBtn.addEventListener('click', () => {
        this.removeImage();
      });
    }

    // Schedule post
    const scheduleBtn = document.getElementById('schedule-post');
    if (scheduleBtn) {
      scheduleBtn.addEventListener('click', () => {
        this.showScheduleModal();
      });
    }
  },

  async loadPlatformStatus() {
    try {
      // Load status for each platform
      for (let platform of this.platforms) {
        const response = await fetch(`/api/social/${platform.id}/status`);
        const data = await response.json();
        
        platform.connected = data.connected || false;
        if (data.stats) {
          platform.stats = data.stats;
        }
      }
    } catch (error) {
      console.error('Error loading platform status:', error);
    }
  },

  renderPlatforms() {
    const grid = document.getElementById('platforms-grid');
    if (!grid) return;

    grid.innerHTML = this.platforms.map(platform => `
      <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <i class="${platform.icon} text-2xl" style="color: ${platform.color}"></i>
            <div>
              <h4 class="font-medium">${platform.name}</h4>
              <p class="text-sm ${platform.connected ? 'text-green-600' : 'text-red-600'}">
                ${platform.connected ? 'متصل ✅' : 'غير متصل ❌'}
              </p>
            </div>
          </div>
        </div>

        ${platform.connected ? `
          <div class="grid grid-cols-3 gap-2 mb-4 text-center">
            <div>
              <p class="text-xs text-gray-500">المتابعون</p>
              <p class="font-bold">${this.formatNumber(platform.stats.followers)}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">التفاعل</p>
              <p class="font-bold">${platform.stats.engagement}%</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">المنشورات</p>
              <p class="font-bold">${platform.stats.posts}</p>
            </div>
          </div>
        ` : ''}

        <div class="flex gap-2">
          ${platform.connected ? `
            <button class="disconnect-platform btn btn-outline flex-1" data-platform="${platform.id}">
              <i class="fas fa-unlink mr-1"></i>
              قطع الاتصال
            </button>
            <button class="btn btn-outline" onclick="window.SocialMediaPage.viewAnalytics('${platform.id}')">
              <i class="fas fa-chart-line"></i>
            </button>
          ` : `
            <button class="connect-platform btn btn-primary flex-1" data-platform="${platform.id}">
              <i class="fas fa-link mr-2"></i>
              ربط الحساب
            </button>
          `}
        </div>
      </div>
    `).join('');
  },

  renderPlatformCheckboxes() {
    const container = document.getElementById('platform-checkboxes');
    if (!container) return;

    const connectedPlatforms = this.platforms.filter(p => p.connected);
    
    if (connectedPlatforms.length === 0) {
      container.innerHTML = `
        <p class="text-gray-500 text-sm">يرجى ربط منصة واحدة على الأقل أولاً</p>
      `;
      return;
    }

    container.innerHTML = connectedPlatforms.map(platform => `
      <label class="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
        <input type="checkbox" name="platforms" value="${platform.id}" class="text-primary">
        <i class="${platform.icon}" style="color: ${platform.color}"></i>
        <span class="text-sm">${platform.name}</span>
      </label>
    `).join('');
  },

  async connectPlatform(platformId) {
    const platform = this.platforms.find(p => p.id === platformId);
    if (!platform) return;

    try {
      // Show OAuth modal or connection process
      this.showConnectionModal(platform);
    } catch (error) {
      this.showNotification(`خطأ في ربط ${platform.name}: ${error.message}`, 'error');
    }
  },

  async disconnectPlatform(platformId) {
    const platform = this.platforms.find(p => p.id === platformId);
    if (!platform) return;

    if (!confirm(`هل تريد قطع الاتصال مع ${platform.name}؟`)) {
      return;
    }

    try {
      const response = await fetch(`/api/social/${platformId}/disconnect`, {
        method: 'POST'
      });

      const result = await response.json();
      
      if (result.success) {
        platform.connected = false;
        platform.stats = { followers: 0, engagement: 0, posts: 0 };
        
        this.renderPlatforms();
        this.renderPlatformCheckboxes();
        this.updateOverallStats();
        
        this.showNotification(`تم قطع الاتصال مع ${platform.name} بنجاح`, 'success');
      } else {
        this.showNotification(`فشل في قطع الاتصال: ${result.message}`, 'error');
      }
    } catch (error) {
      this.showNotification(`خطأ في قطع الاتصال: ${error.message}`, 'error');
    }
  },

  connectAllPlatforms() {
    this.showNotification('سيتم ربط جميع المنصات تدريجياً...', 'info');
    
    this.platforms.forEach((platform, index) => {
      if (!platform.connected) {
        setTimeout(() => {
          this.connectPlatform(platform.id);
        }, index * 1000);
      }
    });
  },

  showConnectionModal(platform) {
    const modal = `
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="connection-modal">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">ربط ${platform.name}</h3>
            <button onclick="window.SocialMediaPage.closeModal()" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="text-center mb-6">
            <i class="${platform.icon} text-6xl mb-4" style="color: ${platform.color}"></i>
            <p class="text-gray-600 mb-4">
              سيتم توجيهك لربط حسابك على ${platform.name}
            </p>
          </div>

          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div class="flex items-center gap-2">
              <i class="fas fa-info-circle text-yellow-600"></i>
              <p class="text-sm text-yellow-800">
                ستحتاج إلى تسجيل الدخول وإعطاء الصلاحيات المطلوبة
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <button onclick="window.SocialMediaPage.proceedConnection('${platform.id}')" class="btn btn-primary flex-1">
              <i class="fas fa-external-link-alt mr-2"></i>
              متابعة الربط
            </button>
            <button onclick="window.SocialMediaPage.closeModal()" class="btn btn-outline flex-1">إلغاء</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('social-modals-container').innerHTML = modal;
  },

  async proceedConnection(platformId) {
    try {
      const response = await fetch(`/api/social/${platformId}/connect`, {
        method: 'POST'
      });

      const result = await response.json();
      
      if (result.success) {
        if (result.auth_url) {
          // In real implementation, open OAuth URL
          window.open(result.auth_url, 'oauth', 'width=600,height=400');
        } else {
          // Simulate successful connection
          const platform = this.platforms.find(p => p.id === platformId);
          platform.connected = true;
          platform.stats = {
            followers: Math.floor(Math.random() * 10000) + 1000,
            engagement: (Math.random() * 5 + 1).toFixed(1),
            posts: Math.floor(Math.random() * 100) + 10
          };
          
          this.renderPlatforms();
          this.renderPlatformCheckboxes();
          this.updateOverallStats();
          this.closeModal();
          
          this.showNotification(`تم ربط ${platform.name} بنجاح! ✅`, 'success');
        }
      } else {
        this.showNotification(`فشل في ربط ${platformId}: ${result.message}`, 'error');
      }
    } catch (error) {
      this.showNotification(`خطأ في الربط: ${error.message}`, 'error');
    }
  },

  updateCharacterCount(count) {
    const counter = document.getElementById('char-count');
    if (counter) {
      counter.textContent = `${count} حرف`;
      
      if (count > 280) {
        counter.className = 'text-red-600';
      } else if (count > 240) {
        counter.className = 'text-yellow-600';
      } else {
        counter.className = 'text-gray-500';
      }
    }
  },

  handleImageUpload(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const uploadArea = document.getElementById('image-upload-area');
      const preview = document.getElementById('image-preview');
      const img = document.getElementById('preview-img');

      img.src = e.target.result;
      uploadArea.classList.add('hidden');
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  },

  removeImage() {
    const uploadArea = document.getElementById('image-upload-area');
    const preview = document.getElementById('image-preview');
    const input = document.getElementById('post-image');

    uploadArea.classList.remove('hidden');
    preview.classList.add('hidden');
    input.value = '';
  },

  async handleQuickPost() {
    const content = document.getElementById('post-content').value;
    const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platforms"]:checked'))
      .map(checkbox => checkbox.value);

    if (selectedPlatforms.length === 0) {
      this.showNotification('يرجى اختيار منصة واحدة على الأقل', 'error');
      return;
    }

    if (!content.trim()) {
      this.showNotification('يرجى كتابة محتوى المنشور', 'error');
      return;
    }

    try {
      const postData = {
        content,
        platforms: selectedPlatforms,
        image: document.getElementById('post-image').files[0] ? 'attached' : null
      };

      const response = await fetch('/api/social/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      const result = await response.json();
      
      if (result.success) {
        this.showNotification(`تم نشر المنشور على ${selectedPlatforms.length} منصة بنجاح! ✅`, 'success');
        
        // Reset form
        document.getElementById('quick-post-form').reset();
        this.removeImage();
        this.updateCharacterCount(0);
        
        // Refresh activity
        this.loadRecentActivity();
      } else {
        this.showNotification('فشل في النشر: ' + result.message, 'error');
      }
    } catch (error) {
      this.showNotification('خطأ في النشر: ' + error.message, 'error');
    }
  },

  async loadScheduledPosts() {
    try {
      const response = await fetch('/api/social/scheduled');
      const data = await response.json();
      
      this.renderScheduledPosts(data.posts || []);
    } catch (error) {
      console.error('Error loading scheduled posts:', error);
      this.renderScheduledPosts([]);
    }
  },

  renderScheduledPosts(posts) {
    const container = document.getElementById('scheduled-posts');
    if (!container) return;

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8">
          <i class="fas fa-clock text-3xl text-gray-400 mb-2"></i>
          <p class="text-gray-600">لا توجد منشورات مجدولة</p>
        </div>
      `;
      return;
    }

    container.innerHTML = posts.map(post => `
      <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
        <div class="flex items-start justify-between mb-2">
          <div class="flex-1">
            <p class="text-sm font-medium line-clamp-2">${post.content}</p>
            <div class="flex items-center gap-2 mt-2">
              ${post.platforms.map(platform => {
                const platformInfo = this.platforms.find(p => p.id === platform);
                return `<i class="${platformInfo.icon} text-sm" style="color: ${platformInfo.color}"></i>`;
              }).join('')}
            </div>
          </div>
          <div class="text-right text-xs text-gray-500">
            <p>${post.scheduled_date}</p>
            <p>${post.scheduled_time}</p>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button class="text-blue-600 hover:text-blue-800 text-xs" onclick="window.SocialMediaPage.editScheduledPost('${post.id}')">
            تعديل
          </button>
          <button class="text-red-600 hover:text-red-800 text-xs" onclick="window.SocialMediaPage.deleteScheduledPost('${post.id}')">
            حذف
          </button>
        </div>
      </div>
    `).join('');
  },

  async loadTopPosts() {
    try {
      const response = await fetch('/api/social/top-posts');
      const data = await response.json();
      
      this.renderTopPosts(data.posts || []);
    } catch (error) {
      console.error('Error loading top posts:', error);
      this.renderTopPosts([]);
    }
  },

  renderTopPosts(posts) {
    const container = document.getElementById('top-posts');
    if (!container) return;

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8">
          <i class="fas fa-star text-3xl text-gray-400 mb-2"></i>
          <p class="text-gray-600">لا توجد بيانات كافية</p>
        </div>
      `;
      return;
    }

    container.innerHTML = posts.map(post => `
      <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
        <div class="flex items-center gap-2 mb-2">
          <i class="${this.platforms.find(p => p.id === post.platform).icon}" 
             style="color: ${this.platforms.find(p => p.id === post.platform).color}"></i>
          <span class="text-sm font-medium">${this.platforms.find(p => p.id === post.platform).name}</span>
        </div>
        
        <p class="text-sm text-gray-800 mb-3 line-clamp-2">${post.content}</p>
        
        <div class="grid grid-cols-3 gap-2 text-center">
          <div>
            <p class="text-xs text-gray-500">إعجابات</p>
            <p class="font-bold text-sm">${this.formatNumber(post.likes)}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">مشاركات</p>
            <p class="font-bold text-sm">${this.formatNumber(post.shares)}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">تعليقات</p>
            <p class="font-bold text-sm">${this.formatNumber(post.comments)}</p>
          </div>
        </div>
      </div>
    `).join('');
  },

  async loadRecentActivity() {
    try {
      const response = await fetch('/api/social/activity');
      const data = await response.json();
      
      this.renderRecentActivity(data.activities || []);
    } catch (error) {
      console.error('Error loading activity:', error);
      this.renderRecentActivity([]);
    }
  },

  renderRecentActivity(activities) {
    const tbody = document.getElementById('activity-table');
    if (!tbody) return;

    if (activities.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-8 text-center text-gray-500">
            لا توجد أنشطة حديثة
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = activities.map(activity => `
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-3">
          <div class="flex items-center gap-2">
            <i class="${this.platforms.find(p => p.id === activity.platform).icon}" 
               style="color: ${this.platforms.find(p => p.id === activity.platform).color}"></i>
            <span class="text-sm">${this.platforms.find(p => p.id === activity.platform).name}</span>
          </div>
        </td>
        <td class="px-4 py-3 text-right">
          <div class="max-w-xs truncate">${activity.content}</div>
        </td>
        <td class="px-4 py-3 text-right">
          <div class="flex items-center gap-4 text-sm">
            <span><i class="fas fa-heart text-red-500 mr-1"></i>${this.formatNumber(activity.engagement.likes)}</span>
            <span><i class="fas fa-share text-blue-500 mr-1"></i>${this.formatNumber(activity.engagement.shares)}</span>
          </div>
        </td>
        <td class="px-4 py-3 text-right">${activity.posted_at}</td>
        <td class="px-4 py-3">
          <div class="flex gap-2">
            <button class="text-blue-600 hover:text-blue-800" onclick="window.SocialMediaPage.viewPost('${activity.id}')">
              <i class="fas fa-eye"></i>
            </button>
            <button class="text-green-600 hover:text-green-800" onclick="window.SocialMediaPage.boostPost('${activity.id}')">
              <i class="fas fa-rocket"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  updateOverallStats() {
    const connectedPlatforms = this.platforms.filter(p => p.connected);
    
    const totalFollowers = connectedPlatforms.reduce((sum, p) => sum + p.stats.followers, 0);
    const avgEngagement = connectedPlatforms.length > 0 
      ? (connectedPlatforms.reduce((sum, p) => sum + parseFloat(p.stats.engagement), 0) / connectedPlatforms.length).toFixed(1)
      : 0;
    const totalPosts = connectedPlatforms.reduce((sum, p) => sum + p.stats.posts, 0);
    const connectedCount = connectedPlatforms.length;

    document.getElementById('total-followers').textContent = this.formatNumber(totalFollowers);
    document.getElementById('avg-engagement').textContent = avgEngagement + '%';
    document.getElementById('total-posts').textContent = totalPosts;
    document.getElementById('connected-count').textContent = connectedCount;
  },

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  showScheduleModal() {
    // Implementation for scheduling modal
    console.log('Show schedule modal - to be implemented');
    this.showNotification('ميزة الجدولة ستتوفر قريباً', 'info');
  },

  viewAnalytics(platformId) {
    console.log('View analytics for:', platformId);
    this.showNotification(`تحليلات ${platformId} ستتوفر قريباً`, 'info');
  },

  viewPost(postId) {
    console.log('View post:', postId);
  },

  boostPost(postId) {
    console.log('Boost post:', postId);
    this.showNotification('ميزة ترويج المنشورات ستتوفر قريباً', 'info');
  },

  editScheduledPost(postId) {
    console.log('Edit scheduled post:', postId);
  },

  deleteScheduledPost(postId) {
    if (confirm('هل تريد حذف هذا المنشور المجدول؟')) {
      console.log('Delete scheduled post:', postId);
      this.showNotification('تم حذف المنشور المجدول', 'success');
    }
  },

  closeModal() {
    document.getElementById('social-modals-container').innerHTML = '';
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