/**
 * Marketing Pro - Dashboard Page
 * Preserves the current flat icons design with enhanced functionality
 */

window.DashboardPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <!-- Dashboard Header -->
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">لوحة التحكم الرئيسية</h1>
          <p class="text-gray-600">نظرة شاملة على أداء حملاتك التسويقية</p>
        </div>

        <!-- KPI Cards - Enhanced from current design -->
        <div class="kpi-grid mb-8">
          <div id="roi-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">العائد على الاستثمار</p>
                <p class="kpi-value" id="roi-value">24.5%</p>
                <p class="kpi-change positive" id="roi-change">
                  <i class="fas fa-arrow-up"></i>
                  +12% هذا الشهر
                </p>
              </div>
              <i class="fas fa-percentage icon-flat icon-success text-2xl"></i>
            </div>
          </div>

          <div id="views-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">المشاهدات</p>
                <p class="kpi-value" id="views-value">45.2K</p>
                <p class="kpi-change positive" id="views-change">
                  <i class="fas fa-arrow-up"></i>
                  +8% هذا الشهر
                </p>
              </div>
              <i class="fas fa-eye icon-flat text-2xl"></i>
            </div>
          </div>

          <div id="clicks-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل النقر</p>
                <p class="kpi-value" id="clicks-value">3.4%</p>
                <p class="kpi-change negative" id="clicks-change">
                  <i class="fas fa-arrow-down"></i>
                  -0.2% هذا الشهر
                </p>
              </div>
              <i class="fas fa-mouse-pointer icon-flat icon-warning text-2xl"></i>
            </div>
          </div>

          <div id="conversion-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل التحويل</p>
                <p class="kpi-value" id="conversion-value">3.2%</p>
                <p class="kpi-change positive" id="conversion-change">
                  <i class="fas fa-arrow-up"></i>
                  +0.5% هذا الشهر
                </p>
              </div>
              <i class="fas fa-exchange-alt icon-flat icon-success text-2xl"></i>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="mb-8">
          <h2 class="text-h2 font-bold mb-4">إجراءات سريعة</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button class="card card-compact flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer">
              <i class="fas fa-plus icon-flat text-2xl"></i>
              <div class="text-right">
                <h3 class="text-h3 font-bold">حملة جديدة</h3>
                <p class="text-gray-600 text-sm">إنشاء حملة تسويقية جديدة</p>
              </div>
            </button>

            <button class="card card-compact flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer">
              <i class="fas fa-paper-plane icon-flat text-2xl"></i>
              <div class="text-right">
                <h3 class="text-h3 font-bold">إرسال بريد إلكتروني</h3>
                <p class="text-gray-600 text-sm">إرسال حملة بريد إلكتروني</p>
              </div>
            </button>

            <button class="card card-compact flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer">
              <i class="fas fa-chart-line icon-flat text-2xl"></i>
              <div class="text-right">
                <h3 class="text-h3 font-bold">عرض التقارير</h3>
                <p class="text-gray-600 text-sm">تحليلات مفصلة للأداء</p>
              </div>
            </button>
          </div>
        </div>

        <!-- Recent Activity & Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Performance Chart -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">أداء الحملات</h3>
              <div class="flex gap-2">
                <button class="text-sm px-3 py-1 rounded bg-blue-100 text-blue-600">أسبوع</button>
                <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100">شهر</button>
                <button class="text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100">سنة</button>
              </div>
            </div>
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <canvas id="performance-chart" width="400" height="200"></canvas>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">النشاط الأخير</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <i class="fas fa-check-circle icon-success"></i>
                <div class="flex-1 text-right">
                  <p class="font-medium">تم إرسال حملة بريد إلكتروني</p>
                  <p class="text-small">منذ 5 دقائق</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <i class="fas fa-user-plus icon-flat"></i>
                <div class="flex-1 text-right">
                  <p class="font-medium">عميل جديد اشترك في القائمة البريدية</p>
                  <p class="text-small">منذ 15 دقيقة</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <i class="fas fa-exclamation-triangle icon-warning"></i>
                <div class="flex-1 text-right">
                  <p class="font-medium">حملة تحتاج مراجعة</p>
                  <p class="text-small">منذ ساعة واحدة</p>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <i class="fas fa-share-alt" style="color: #8b5cf6;"></i>
                <div class="flex-1 text-right">
                  <p class="font-medium">تم نشر منشور على فيسبوك</p>
                  <p class="text-small">منذ ساعتين</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Features Section - Enhanced from current design -->
        <div class="mb-8">
          <h2 class="text-h2 font-bold mb-4">الميزات الذكية</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Content Generator -->
            <div class="card cursor-pointer hover:shadow-lg transition-all">
              <div class="flex items-center justify-between mb-4">
                <div class="text-right">
                  <h3 class="text-h3 font-bold mb-1">مولد المحتوى</h3>
                  <p class="text-gray-600 text-sm">إنشاء محتوى احترافي بالذكاء الاصطناعي</p>
                </div>
                <i class="fas fa-edit icon-flat" style="color: #8b5cf6;" class="text-2xl"></i>
              </div>
              <button class="btn btn-outline w-full">تجربة الآن</button>
            </div>

            <!-- Smart Analytics -->
            <div class="card cursor-pointer hover:shadow-lg transition-all">
              <div class="flex items-center justify-between mb-4">
                <div class="text-right">
                  <h3 class="text-h3 font-bold mb-1">تحليلات ذكية</h3>
                  <p class="text-gray-600 text-sm">رؤى وتوصيات مدعومة بالذكاء الاصطناعي</p>
                </div>
                <i class="fas fa-chart-line icon-flat icon-success text-2xl"></i>
              </div>
              <button class="btn btn-outline w-full">عرض التحليلات</button>
            </div>

            <!-- Campaign Optimizer -->
            <div class="card cursor-pointer hover:shadow-lg transition-all">
              <div class="flex items-center justify-between mb-4">
                <div class="text-right">
                  <h3 class="text-h3 font-bold mb-1">محسن الحملات</h3>
                  <p class="text-gray-600 text-sm">تحسين أداء الحملات تلقائياً</p>
                </div>
                <i class="fas fa-cogs icon-flat text-2xl"></i>
              </div>
              <button class="btn btn-outline w-full">تحسين تلقائي</button>
            </div>
          </div>
        </div>

        <!-- Social Media & Integrations Preview -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Social Media Status -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">منصات التواصل الاجتماعي</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fab fa-facebook icon-flat text-xl"></i>
                  <span class="font-medium">فيسبوك</span>
                </div>
                <span class="text-sm px-2 py-1 bg-green-100 text-green-600 rounded">متصل</span>
              </div>

              <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fab fa-twitter icon-flat text-xl" style="color: #1da1f2;"></i>
                  <span class="font-medium">تويتر</span>
                </div>
                <span class="text-sm px-2 py-1 bg-gray-100 text-gray-600 rounded">غير متصل</span>
              </div>

              <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div class="flex items-center gap-3">
                  <i class="fab fa-instagram icon-flat text-xl" style="color: #e4405f;"></i>
                  <span class="font-medium">إنستغرام</span>
                </div>
                <span class="text-sm px-2 py-1 bg-green-100 text-green-600 rounded">متصل</span>
              </div>
            </div>
            <button class="btn btn-primary w-full mt-4">إدارة الاتصالات</button>
          </div>

          <!-- Contact Statistics -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">إحصائيات العملاء</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <i class="fas fa-users icon-flat text-2xl mb-2" style="color: #0891b2;"></i>
                <p class="kpi-value text-xl">1,247</p>
                <p class="text-small">إجمالي العملاء</p>
              </div>

              <div class="text-center p-4 bg-green-50 rounded-lg">
                <i class="fas fa-user-plus icon-success text-2xl mb-2"></i>
                <p class="kpi-value text-xl">156</p>
                <p class="text-small">عملاء جدد</p>
              </div>

              <div class="text-center p-4 bg-yellow-50 rounded-lg">
                <i class="fas fa-star icon-flat text-2xl mb-2"></i>
                <p class="kpi-value text-xl">89</p>
                <p class="text-small">عملاء نشطون</p>
              </div>

              <div class="text-center p-4 bg-purple-50 rounded-lg">
                <i class="fas fa-chart-pie icon-flat text-2xl mb-2" style="color: #8b5cf6;"></i>
                <p class="kpi-value text-xl">3.2%</p>
                <p class="text-small">معدل التحويل</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Message from Current Design -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <i class="fas fa-check-circle text-green-500 text-3xl mb-4"></i>
          <h3 class="text-lg font-bold text-green-800 mb-2">✅ تم تطوير لوحة التحكم بنجاح!</h3>
          <p class="text-green-700 mb-4">لوحة تحكم شاملة مع شريط جانبي متجاوب وميزات متقدمة</p>
          <div class="flex justify-center items-center gap-4 flex-wrap">
            <span class="text-green-600 font-medium">الميزات المتاحة:</span>
            <div class="flex gap-3">
              <i class="fas fa-tachometer-alt icon-success"></i>
              <i class="fas fa-chart-line icon-success"></i>
              <i class="fas fa-users icon-success"></i>
              <i class="fas fa-envelope icon-success"></i>
              <i class="fas fa-cogs icon-success"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    // Initialize dashboard functionality
    await this.loadAnalytics();
    this.initChart();
    this.bindEvents();
    this.startRealTimeUpdates();
  },

  async loadAnalytics() {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      
      this.updateKPIs(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  },

  updateKPIs(data) {
    // Update ROI
    if (data.performance?.roi) {
      const roiElement = document.getElementById('roi-value');
      const roiChange = document.getElementById('roi-change');
      if (roiElement) roiElement.textContent = `${data.performance.roi.value}%`;
      if (roiChange) {
        const change = data.performance.roi.change;
        roiChange.className = `kpi-change ${change >= 0 ? 'positive' : 'negative'}`;
        roiChange.innerHTML = `
          <i class="fas fa-arrow-${change >= 0 ? 'up' : 'down'}"></i>
          ${change >= 0 ? '+' : ''}${change}% هذا الشهر
        `;
      }
    }

    // Update Page Views
    if (data.performance?.page_views) {
      const viewsElement = document.getElementById('views-value');
      const viewsChange = document.getElementById('views-change');
      if (viewsElement) {
        const value = data.performance.page_views.value;
        viewsElement.textContent = value >= 1000 ? `${(value/1000).toFixed(1)}K` : value.toString();
      }
      if (viewsChange) {
        const change = data.performance.page_views.change;
        viewsChange.className = `kpi-change ${change >= 0 ? 'positive' : 'negative'}`;
        viewsChange.innerHTML = `
          <i class="fas fa-arrow-${change >= 0 ? 'up' : 'down'}"></i>
          ${change >= 0 ? '+' : ''}${change}% هذا الشهر
        `;
      }
    }

    // Update Click Rate
    if (data.performance?.click_rate) {
      const clicksElement = document.getElementById('clicks-value');
      const clicksChange = document.getElementById('clicks-change');
      if (clicksElement) clicksElement.textContent = `${data.performance.click_rate.value}%`;
      if (clicksChange) {
        const change = data.performance.click_rate.change;
        clicksChange.className = `kpi-change ${change >= 0 ? 'positive' : 'negative'}`;
        clicksChange.innerHTML = `
          <i class="fas fa-arrow-${change >= 0 ? 'up' : 'down'}"></i>
          ${change >= 0 ? '+' : ''}${change}% هذا الشهر
        `;
      }
    }

    // Update Conversion Rate
    if (data.performance?.conversion_rate) {
      const conversionElement = document.getElementById('conversion-value');
      const conversionChange = document.getElementById('conversion-change');
      if (conversionElement) conversionElement.textContent = `${data.performance.conversion_rate.value}%`;
      if (conversionChange) {
        const change = data.performance.conversion_rate.change;
        conversionChange.className = `kpi-change ${change >= 0 ? 'positive' : 'negative'}`;
        conversionChange.innerHTML = `
          <i class="fas fa-arrow-${change >= 0 ? 'up' : 'down'}"></i>
          ${change >= 0 ? '+' : ''}${change}% هذا الشهر
        `;
      }
    }
  },

  initChart() {
    const canvas = document.getElementById('performance-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Simple chart implementation - can be replaced with Chart.js later
    const data = [65, 78, 85, 92, 88, 95, 102];
    const labels = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
    
    this.drawChart(ctx, data, labels, canvas.width, canvas.height);
  },

  drawChart(ctx, data, labels, width, height) {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set RTL text direction
    ctx.direction = 'rtl';
    ctx.textAlign = 'right';
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw line chart
    ctx.strokeStyle = '#3b82f6';
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    data.forEach((value, index) => {
      const x = padding + (index * chartWidth / (data.length - 1));
      const y = padding + chartHeight - ((value - minValue) / range * chartHeight);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#3b82f6';
    data.forEach((value, index) => {
      const x = padding + (index * chartWidth / (data.length - 1));
      const y = padding + chartHeight - ((value - minValue) / range * chartHeight);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
      const x = padding + (index * chartWidth / (data.length - 1));
      ctx.fillText(label, x, height - 10);
    });
  },

  bindEvents() {
    // Quick action buttons
    document.querySelectorAll('.card.cursor-pointer').forEach(button => {
      button.addEventListener('click', (e) => {
        const text = button.querySelector('h3')?.textContent;
        if (text?.includes('حملة جديدة')) {
          this.handleNewCampaign();
        } else if (text?.includes('بريد إلكتروني')) {
          this.handleSendEmail();
        } else if (text?.includes('التقارير')) {
          this.handleViewReports();
        }
      });
    });

    // Chart period buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent === 'أسبوع' || btn.textContent === 'شهر' || btn.textContent === 'سنة') {
        btn.addEventListener('click', (e) => {
          // Update active state
          btn.parentNode.querySelectorAll('button').forEach(b => {
            b.className = 'text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100';
          });
          btn.className = 'text-sm px-3 py-1 rounded bg-blue-100 text-blue-600';
          
          // Load new chart data based on period
          this.updateChartPeriod(btn.textContent);
        });
      }
    });
  },

  handleNewCampaign() {
    if (window.sidebar) {
      window.sidebar.navigateToSection('campaigns');
    }
  },

  handleSendEmail() {
    if (window.sidebar) {
      window.sidebar.navigateToSection('email');
    }
  },

  handleViewReports() {
    // Show reports modal or navigate to reports section
    alert('ستتم إضافة صفحة التقارير قريباً');
  },

  updateChartPeriod(period) {
    console.log(`Updating chart for period: ${period}`);
    // Here you would fetch new data based on the selected period
    // and redraw the chart
  },

  startRealTimeUpdates() {
    // Update analytics every 5 minutes
    setInterval(() => {
      this.loadAnalytics();
    }, 5 * 60 * 1000);
  }
};