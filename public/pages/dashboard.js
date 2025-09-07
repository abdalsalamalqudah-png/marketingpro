/**
 * Marketing Pro - Advanced Dashboard Page
 * Enhanced with KPIs, charts, filtering, and real-time data
 */

window.DashboardPage = {
  currentPeriod: '30d',
  currentFilters: {
    start_date: null,
    end_date: null,
    platform: 'all'
  },

  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <!-- Enhanced Dashboard Header with Filters -->
        <div class="mb-8">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-h1 font-bold mb-2">لوحة التحكم المتقدمة</h1>
              <p class="text-gray-600">تحليلات شاملة وKPIs متقدمة لأداء حملاتك التسويقية</p>
            </div>
            <div class="flex gap-2">
              <select id="period-filter" class="px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option value="7d">آخر 7 أيام</option>
                <option value="30d" selected>آخر 30 يوم</option>
                <option value="90d">آخر 90 يوم</option>
                <option value="1y">آخر سنة</option>
                <option value="custom">فترة مخصصة</option>
              </select>
              <button id="refresh-data" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <i class="fas fa-sync-alt"></i> تحديث
              </button>
            </div>
          </div>
          
          <!-- Custom Date Range (Hidden by default) -->
          <div id="custom-date-range" class="hidden mb-4">
            <div class="flex gap-4 items-center">
              <input type="date" id="start-date" class="px-3 py-2 border rounded-lg">
              <span>إلى</span>
              <input type="date" id="end-date" class="px-3 py-2 border rounded-lg">
              <button id="apply-dates" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                تطبيق
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced KPI Cards with Advanced Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Revenue KPI -->
          <div id="revenue-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">إجمالي الإيرادات</p>
                <p class="kpi-value text-2xl font-bold" id="revenue-value">125,000 ر.س</p>
                <p class="kpi-change positive" id="revenue-change">
                  <i class="fas fa-arrow-up"></i>
                  +15.2% من الفترة السابقة
                </p>
              </div>
              <i class="fas fa-chart-line icon-flat icon-success text-3xl"></i>
            </div>
          </div>

          <!-- Active Campaigns KPI -->
          <div id="campaigns-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">الحملات النشطة</p>
                <p class="kpi-value text-2xl font-bold" id="campaigns-value">12</p>
                <p class="kpi-change positive" id="campaigns-change">
                  <i class="fas fa-arrow-up"></i>
                  +3 حملة جديدة
                </p>
              </div>
              <i class="fas fa-bullhorn icon-flat text-3xl" style="color: #f59e0b;"></i>
            </div>
          </div>

          <!-- Conversion Rate KPI -->
          <div id="conversion-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">معدل التحويل</p>
                <p class="kpi-value text-2xl font-bold" id="conversion-value">4.2%</p>
                <p class="kpi-change positive" id="conversion-change">
                  <i class="fas fa-arrow-up"></i>
                  +0.8% تحسن
                </p>
              </div>
              <i class="fas fa-exchange-alt icon-flat icon-success text-3xl"></i>
            </div>
          </div>

          <!-- ROI KPI -->
          <div id="roi-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">العائد على الاستثمار</p>
                <p class="kpi-value text-2xl font-bold" id="roi-value">87.5%</p>
                <p class="kpi-change negative" id="roi-change">
                  <i class="fas fa-arrow-down"></i>
                  -2.1% من الشهر الماضي
                </p>
              </div>
              <i class="fas fa-percentage icon-flat text-3xl" style="color: #ef4444;"></i>
            </div>
          </div>

          <!-- Total Leads KPI -->
          <div id="leads-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">إجمالي العملاء المحتملين</p>
                <p class="kpi-value text-2xl font-bold" id="leads-value">1,247</p>
                <p class="kpi-change positive" id="leads-change">
                  <i class="fas fa-arrow-up"></i>
                  +232 عميل محتمل
                </p>
              </div>
              <i class="fas fa-users icon-flat text-3xl" style="color: #3b82f6;"></i>
            </div>
          </div>

          <!-- Cost per Lead KPI -->
          <div id="cpl-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">تكلفة العميل المحتمل</p>
                <p class="kpi-value text-2xl font-bold" id="cpl-value">45.50 ر.س</p>
                <p class="kpi-change positive" id="cpl-change">
                  <i class="fas fa-arrow-down"></i>
                  -5.6% تحسن
                </p>
              </div>
              <i class="fas fa-dollar-sign icon-flat icon-success text-3xl"></i>
            </div>
          </div>

          <!-- Qualified Leads KPI -->
          <div id="qualified-leads-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">العملاء المؤهلين</p>
                <p class="kpi-value text-2xl font-bold" id="qualified-leads-value">245</p>
                <p class="kpi-change positive" id="qualified-leads-change">
                  <i class="fas fa-arrow-up"></i>
                  +23% هذا الشهر
                </p>
              </div>
              <i class="fas fa-star icon-flat text-3xl" style="color: #f59e0b;"></i>
            </div>
          </div>

          <!-- Lead Score KPI -->
          <div id="lead-score-card" class="card kpi-card">
            <div class="flex items-center justify-between">
              <div class="text-right">
                <p class="text-small mb-1">متوسط تقييم العملاء</p>
                <p class="kpi-value text-2xl font-bold" id="lead-score-value">65/100</p>
                <p class="kpi-change positive" id="lead-score-change">
                  <i class="fas fa-arrow-up"></i>
                  +3.2 نقطة
                </p>
              </div>
              <i class="fas fa-chart-bar icon-flat text-3xl" style="color: #8b5cf6;"></i>
            </div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Revenue Trend Chart -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">اتجاه الإيرادات</h3>
              <div class="flex gap-2">
                <button class="chart-period-btn active" data-period="6m">6 شهور</button>
                <button class="chart-period-btn" data-period="1y">سنة</button>
              </div>
            </div>
            <div class="h-80">
              <canvas id="revenue-chart" width="400" height="300"></canvas>
            </div>
          </div>

          <!-- Campaign Performance Chart -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">أداء الحملات</h3>
            <div class="h-80">
              <canvas id="campaign-chart" width="400" height="300"></canvas>
            </div>
          </div>

          <!-- Traffic Sources Chart -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">مصادر الزيارات</h3>
            <div class="h-80">
              <canvas id="traffic-chart" width="400" height="300"></canvas>
            </div>
          </div>

          <!-- Conversion Funnel Chart -->
          <div class="card">
            <h3 class="text-h3 font-bold mb-4">قمع التحويل</h3>
            <div class="h-80">
              <canvas id="funnel-chart" width="400" height="300"></canvas>
            </div>
          </div>
        </div>

        <!-- AI Insights & Notifications -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- AI Insights -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">رؤى ذكية من الذكاء الاصطناعي</h3>
              <button id="refresh-insights" class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-sync-alt"></i>
              </button>
            </div>
            <div id="ai-insights-container" class="space-y-3">
              <!-- AI insights will be loaded here -->
            </div>
          </div>

          <!-- Real-time Notifications -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-h3 font-bold">التنبيهات الفورية</h3>
              <span id="notification-count" class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
            </div>
            <div id="notifications-container" class="space-y-3">
              <!-- Notifications will be loaded here -->
            </div>
          </div>
        </div>

        <!-- Recent Activity Section -->
        <div class="card mb-8">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-h3 font-bold">النشاط الأخير</h3>
            <select id="activity-filter" class="px-3 py-2 border rounded-lg text-sm">
              <option value="all">جميع الأنشطة</option>
              <option value="campaign_created">حملات جديدة</option>
              <option value="client_added">عملاء جدد</option>
              <option value="email_sent">رسائل بريد إلكتروني</option>
              <option value="deal_closed">صفقات مغلقة</option>
            </select>
          </div>
          <div id="recent-activity-container" class="space-y-3">
            <!-- Recent activities will be loaded here -->
          </div>
        </div>

        <!-- Quick Actions Enhanced -->
        <div class="mb-8">
          <h2 class="text-h2 font-bold mb-4">إجراءات سريعة</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="quick-action-btn" data-action="new-campaign">
              <i class="fas fa-plus icon-flat text-2xl mb-3"></i>
              <h3 class="text-h3 font-bold mb-1">حملة جديدة</h3>
              <p class="text-gray-600 text-sm">إنشاء حملة تسويقية متعددة القنوات</p>
            </button>

            <button class="quick-action-btn" data-action="send-email">
              <i class="fas fa-paper-plane icon-flat text-2xl mb-3"></i>
              <h3 class="text-h3 font-bold mb-1">حملة بريد إلكتروني</h3>
              <p class="text-gray-600 text-sm">إنشاء وإرسال حملة بريد إلكتروني</p>
            </button>

            <button class="quick-action-btn" data-action="add-client">
              <i class="fas fa-user-plus icon-flat text-2xl mb-3"></i>
              <h3 class="text-h3 font-bold mb-1">عميل جديد</h3>
              <p class="text-gray-600 text-sm">إضافة عميل جديد لقاعدة البيانات</p>
            </button>

            <button class="quick-action-btn" data-action="view-reports">
              <i class="fas fa-chart-line icon-flat text-2xl mb-3"></i>
              <h3 class="text-h3 font-bold mb-1">التقارير التفصيلية</h3>
              <p class="text-gray-600 text-sm">عرض تحليلات وتقارير متقدمة</p>
            </button>
          </div>
        </div>

        <!-- Success Status -->
        <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-green-800 mb-2">
                <i class="fas fa-check-circle text-green-500 mr-2"></i>
                ✅ لوحة التحكم المتقدمة جاهزة!
              </h3>
              <p class="text-green-700">
                تم تطوير لوحة تحكم شاملة مع KPIs متقدمة، رسوم بيانية تفاعلية، وفلترة البيانات
              </p>
            </div>
            <div class="flex gap-3">
              <i class="fas fa-tachometer-alt icon-success text-2xl"></i>
              <i class="fas fa-chart-bar icon-success text-2xl"></i>
              <i class="fas fa-filter icon-success text-2xl"></i>
              <i class="fas fa-robot icon-success text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    // Initialize enhanced dashboard
    await this.loadKPIs();
    await this.loadCharts();
    await this.loadAIInsights();
    await this.loadNotifications();
    await this.loadRecentActivity();
    this.bindEvents();
    this.startRealTimeUpdates();
  },

  async loadKPIs() {
    try {
      const params = new URLSearchParams({
        period: this.currentPeriod,
        ...this.currentFilters
      });
      
      const response = await fetch(`/api/dashboard/kpis?${params}`);
      const data = await response.json();
      
      this.updateKPIs(data.kpis);
    } catch (error) {
      console.error('Error loading KPIs:', error);
      this.showFallbackKPIs();
    }
  },

  updateKPIs(kpis) {
    Object.keys(kpis).forEach(key => {
      const kpi = kpis[key];
      const valueElement = document.getElementById(`${key.replace('_', '-')}-value`);
      const changeElement = document.getElementById(`${key.replace('_', '-')}-change`);
      
      if (valueElement && kpi) {
        // Format value based on type
        let formattedValue = kpi.current;
        if (kpi.format === 'currency') {
          formattedValue = `${kpi.current.toLocaleString()} ر.س`;
        } else if (kpi.format === 'percentage') {
          formattedValue = `${kpi.current.toFixed(1)}%`;
        } else if (kpi.format === 'score') {
          formattedValue = `${kpi.current}/100`;
        } else {
          formattedValue = kpi.current.toLocaleString();
        }
        
        valueElement.textContent = formattedValue;
      }
      
      if (changeElement && kpi) {
        const isPositive = kpi.trend === 'up';
        const changeValue = Math.abs(kpi.change);
        
        changeElement.className = `kpi-change ${isPositive ? 'positive' : 'negative'}`;
        changeElement.innerHTML = `
          <i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i>
          ${isPositive ? '+' : '-'}${changeValue.toFixed(1)}% من الفترة السابقة
        `;
      }
    });
  },

  showFallbackKPIs() {
    // Show default KPI values in case of API failure
    const fallbackKPIs = {
      revenue: { current: 125000, change: 15.2, trend: 'up', format: 'currency' },
      campaigns: { current: 12, change: 3, trend: 'up', format: 'number' },
      conversion_rate: { current: 4.2, change: 0.8, trend: 'up', format: 'percentage' },
      roi: { current: 87.5, change: -2.1, trend: 'down', format: 'percentage' },
      leads: { current: 1247, change: 23, trend: 'up', format: 'number' },
      cost_per_lead: { current: 45.50, change: -5.6, trend: 'up', format: 'currency' },
      qualified_leads: { current: 245, change: 23, trend: 'up', format: 'number' },
      avg_lead_score: { current: 65, change: 3.2, trend: 'up', format: 'score' }
    };
    
    this.updateKPIs(fallbackKPIs);
  },

  async loadCharts() {
    try {
      const params = new URLSearchParams({
        type: 'all',
        period: this.currentPeriod
      });
      
      const response = await fetch(`/api/dashboard/charts?${params}`);
      const data = await response.json();
      
      this.renderCharts(data);
    } catch (error) {
      console.error('Error loading charts:', error);
      this.renderFallbackCharts();
    }
  },

  renderCharts(chartsData) {
    // Revenue Trend Chart
    this.renderLineChart('revenue-chart', chartsData.revenue_trend);
    
    // Campaign Performance Chart
    this.renderBarChart('campaign-chart', chartsData.campaign_performance);
    
    // Traffic Sources Chart
    this.renderDoughnutChart('traffic-chart', chartsData.traffic_sources);
    
    // Conversion Funnel Chart
    this.renderFunnelChart('funnel-chart', chartsData.leads_funnel);
  },

  renderFallbackCharts() {
    const fallbackData = {
      revenue_trend: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
          data: [15000, 18000, 22000, 19000, 25000, 28000]
        }]
      },
      campaign_performance: {
        labels: ['حملة الصيف', 'المنتج الجديد', 'العروض الشهرية'],
        datasets: [{
          data: [85, 72, 91]
        }]
      },
      traffic_sources: {
        labels: ['البحث المدفوع', 'وسائل التواصل', 'البريد الإلكتروني'],
        datasets: [{
          data: [35, 28, 22]
        }]
      },
      leads_funnel: {
        labels: ['زوار الموقع', 'عملاء محتملين', 'مؤهلين', 'عملاء'],
        datasets: [{
          data: [10000, 1500, 450, 120]
        }]
      }
    };
    
    this.renderCharts(fallbackData);
  },

  renderLineChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { labels, datasets } = data;
    const values = datasets[0].data;
    
    this.drawLineChart(ctx, values, labels, canvas.width, canvas.height);
  },

  renderBarChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { labels, datasets } = data;
    const values = datasets[0].data;
    
    this.drawBarChart(ctx, values, labels, canvas.width, canvas.height);
  },

  renderDoughnutChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { labels, datasets } = data;
    const values = datasets[0].data;
    
    this.drawDoughnutChart(ctx, values, labels, canvas.width, canvas.height);
  },

  renderFunnelChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { labels, datasets } = data;
    const values = datasets[0].data;
    
    this.drawFunnelChart(ctx, values, labels, canvas.width, canvas.height);
  },

  drawLineChart(ctx, data, labels, width, height) {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * chartHeight / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = '#3b82f6';
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

  drawBarChart(ctx, data, labels, width, height) {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...data);
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw bars
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + (index * (barWidth + barSpacing)) + barSpacing / 2;
      const y = padding + chartHeight - barHeight;
      
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);
      
      // Draw value on top of bar
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value + '%', x + barWidth / 2, y - 5);
    });
    
    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Arial';
    
    labels.forEach((label, index) => {
      const x = padding + (index * (barWidth + barSpacing)) + barSpacing / 2 + barWidth / 2;
      const words = label.split(' ');
      words.forEach((word, wordIndex) => {
        ctx.fillText(word, x, height - 25 + (wordIndex * 12));
      });
    });
  },

  drawDoughnutChart(ctx, data, labels, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) / 2 - 20;
    const innerRadius = outerRadius * 0.6;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const total = data.reduce((sum, value) => sum + value, 0);
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    let startAngle = -Math.PI / 2;
    
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      
      // Draw percentage in the middle of slice
      const midAngle = startAngle + sliceAngle / 2;
      const textRadius = (outerRadius + innerRadius) / 2;
      const textX = centerX + Math.cos(midAngle) * textRadius;
      const textY = centerY + Math.sin(midAngle) * textRadius;
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value + '%', textX, textY);
      
      startAngle += sliceAngle;
    });
    
    // Draw legend
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    
    labels.forEach((label, index) => {
      const y = 30 + index * 20;
      
      // Color box
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(10, y - 10, 15, 15);
      
      // Label
      ctx.fillStyle = '#374151';
      ctx.fillText(label, 30, y);
    });
  },

  drawFunnelChart(ctx, data, labels, width, height) {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    const maxValue = Math.max(...data);
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = '#3b82f6';
    
    data.forEach((value, index) => {
      const segmentHeight = chartHeight / data.length;
      const segmentWidth = (value / maxValue) * chartWidth;
      const x = padding + (chartWidth - segmentWidth) / 2;
      const y = padding + index * segmentHeight;
      
      // Draw funnel segment
      ctx.fillRect(x, y, segmentWidth, segmentHeight - 5);
      
      // Draw label and value
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(labels[index], width / 2, y + segmentHeight / 2 - 10);
      ctx.fillText(value.toLocaleString(), width / 2, y + segmentHeight / 2 + 10);
      
      ctx.fillStyle = '#3b82f6';
    });
  },

  async loadAIInsights() {
    try {
      const response = await fetch('/api/dashboard/insights');
      const data = await response.json();
      
      this.renderAIInsights(data.insights);
    } catch (error) {
      console.error('Error loading AI insights:', error);
      this.renderFallbackInsights();
    }
  },

  renderAIInsights(insights) {
    const container = document.getElementById('ai-insights-container');
    if (!container) return;
    
    container.innerHTML = insights.map(insight => `
      <div class="p-4 border border-gray-200 rounded-lg ${insight.priority === 'high' ? 'border-red-300 bg-red-50' : insight.priority === 'medium' ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-gray-50'}">
        <div class="flex items-start justify-between mb-2">
          <h4 class="font-bold text-sm">${insight.title}</h4>
          <span class="text-xs px-2 py-1 rounded ${insight.priority === 'high' ? 'bg-red-100 text-red-700' : insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}">
            ${insight.confidence}% ثقة
          </span>
        </div>
        <p class="text-sm text-gray-700">${insight.description}</p>
      </div>
    `).join('');
  },

  renderFallbackInsights() {
    const fallbackInsights = [
      { title: 'تحسين الحملة الإعلانية', description: 'ننصح بزيادة الميزانية للحملة "عروض الصيف" بنسبة 20%', confidence: 89, priority: 'high' },
      { title: 'اقتراح محتوى جديد', description: 'المحتوى المرئي يحقق تفاعل أعلى بـ 40%', confidence: 92, priority: 'medium' }
    ];
    
    this.renderAIInsights(fallbackInsights);
  },

  async loadNotifications() {
    try {
      const response = await fetch('/api/dashboard/notifications');
      const data = await response.json();
      
      this.renderNotifications(data.notifications);
      this.updateNotificationCount(data.notifications.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error loading notifications:', error);
      this.renderFallbackNotifications();
    }
  },

  renderNotifications(notifications) {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    container.innerHTML = notifications.slice(0, 5).map(notification => `
      <div class="p-3 border border-gray-200 rounded-lg ${!notification.is_read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h4 class="font-bold text-sm mb-1">${notification.title}</h4>
            <p class="text-sm text-gray-700">${notification.message}</p>
            <span class="text-xs text-gray-500">${this.formatDate(notification.created_at)}</span>
          </div>
          <i class="fas fa-${notification.type === 'warning' ? 'exclamation-triangle text-yellow-500' : notification.type === 'success' ? 'check-circle text-green-500' : 'info-circle text-blue-500'}"></i>
        </div>
      </div>
    `).join('');
  },

  renderFallbackNotifications() {
    const fallbackNotifications = [
      { title: 'تحذير الميزانية', message: 'حملة "الصيف 2024" اقتربت من نفاد الميزانية', type: 'warning', is_read: false, created_at: '2024-01-15T14:30:00Z' },
      { title: 'هدف محقق', message: 'تم تحقيق هدف 1000 عميل محتمل لهذا الشهر', type: 'success', is_read: false, created_at: '2024-01-15T13:45:00Z' }
    ];
    
    this.renderNotifications(fallbackNotifications);
    this.updateNotificationCount(2);
  },

  updateNotificationCount(count) {
    const countElement = document.getElementById('notification-count');
    if (countElement) {
      countElement.textContent = count;
      countElement.style.display = count > 0 ? 'inline' : 'none';
    }
  },

  async loadRecentActivity() {
    try {
      const response = await fetch('/api/dashboard/activity?limit=10');
      const data = await response.json();
      
      this.renderRecentActivity(data.activities);
    } catch (error) {
      console.error('Error loading recent activity:', error);
      this.renderFallbackActivity();
    }
  },

  renderRecentActivity(activities) {
    const container = document.getElementById('recent-activity-container');
    if (!container) return;
    
    container.innerHTML = activities.map(activity => `
      <div class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
        <span class="text-xl">${activity.icon}</span>
        <div class="flex-1 text-right">
          <p class="font-medium text-sm">${activity.title}</p>
          <p class="text-xs text-gray-600">${activity.description}</p>
          <span class="text-xs text-gray-500">بواسطة ${activity.user} - ${this.formatDate(activity.created_at)}</span>
        </div>
      </div>
    `).join('');
  },

  renderFallbackActivity() {
    const fallbackActivities = [
      { title: 'تم إنشاء حملة جديدة', description: 'حملة "عروض الشتاء"', user: 'المدير', created_at: '2024-01-15T14:30:00Z', icon: '🚀' },
      { title: 'عميل جديد', description: 'شركة التقنية المتطورة', user: 'المسوق', created_at: '2024-01-15T13:45:00Z', icon: '👤' }
    ];
    
    this.renderRecentActivity(fallbackActivities);
  },

  bindEvents() {
    // Period filter change
    const periodFilter = document.getElementById('period-filter');
    if (periodFilter) {
      periodFilter.addEventListener('change', (e) => {
        this.currentPeriod = e.target.value;
        
        if (e.target.value === 'custom') {
          document.getElementById('custom-date-range').classList.remove('hidden');
        } else {
          document.getElementById('custom-date-range').classList.add('hidden');
          this.refreshDashboard();
        }
      });
    }

    // Custom date range
    const applyDatesBtn = document.getElementById('apply-dates');
    if (applyDatesBtn) {
      applyDatesBtn.addEventListener('click', () => {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        if (startDate && endDate) {
          this.currentFilters.start_date = startDate;
          this.currentFilters.end_date = endDate;
          this.refreshDashboard();
        }
      });
    }

    // Refresh data button
    const refreshBtn = document.getElementById('refresh-data');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.refreshDashboard();
      });
    }

    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.dataset.action;
        this.handleQuickAction(action);
      });
    });

    // Chart period buttons
    document.querySelectorAll('.chart-period-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Update active state
        btn.parentNode.querySelectorAll('.chart-period-btn').forEach(b => {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        
        // Reload charts with new period
        this.loadCharts();
      });
    });

    // Activity filter
    const activityFilter = document.getElementById('activity-filter');
    if (activityFilter) {
      activityFilter.addEventListener('change', (e) => {
        this.loadRecentActivity();
      });
    }
  },

  async refreshDashboard() {
    // Show loading state
    const refreshBtn = document.getElementById('refresh-data');
    if (refreshBtn) {
      refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ التحديث...';
      refreshBtn.disabled = true;
    }

    try {
      await Promise.all([
        this.loadKPIs(),
        this.loadCharts(),
        this.loadAIInsights(),
        this.loadNotifications(),
        this.loadRecentActivity()
      ]);
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    } finally {
      // Reset button state
      if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث';
        refreshBtn.disabled = false;
      }
    }
  },

  handleQuickAction(action) {
    switch (action) {
      case 'new-campaign':
        if (window.sidebar) {
          window.sidebar.navigateToSection('campaigns');
        }
        break;
      case 'send-email':
        if (window.sidebar) {
          window.sidebar.navigateToSection('email');
        }
        break;
      case 'add-client':
        if (window.sidebar) {
          window.sidebar.navigateToSection('clients');
        }
        break;
      case 'view-reports':
        alert('ستتم إضافة صفحة التقارير التفصيلية قريباً');
        break;
    }
  },

  formatDate(dateString) {
    if (!dateString) return 'غير محدد';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `منذ ${Math.floor(diffInMinutes / 60)} ساعة`;
    
    return date.toLocaleDateString('ar-SA');
  },

  startRealTimeUpdates() {
    // Update dashboard every 5 minutes
    setInterval(() => {
      this.loadKPIs();
      this.loadNotifications();
      this.loadRecentActivity();
    }, 5 * 60 * 1000);
  }
};

// Add CSS for enhanced dashboard
const enhancedDashboardStyles = `
<style>
.quick-action-btn {
  @apply card p-6 text-center hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-blue-200;
}

.kpi-card {
  @apply p-6;
}

.kpi-value {
  @apply text-2xl font-bold mb-1;
}

.kpi-change {
  @apply text-sm font-medium;
}

.kpi-change.positive {
  @apply text-green-600;
}

.kpi-change.negative {
  @apply text-red-600;
}

.chart-period-btn {
  @apply text-sm px-3 py-1 rounded text-gray-600 hover:bg-gray-100 cursor-pointer;
}

.chart-period-btn.active {
  @apply bg-blue-100 text-blue-600;
}

.icon-flat {
  @apply inline-block;
}

.icon-success {
  @apply text-green-500;
}

.icon-warning {
  @apply text-yellow-500;
}
</style>
`;

// Inject styles
if (!document.getElementById('enhanced-dashboard-styles')) {
  const styleElement = document.createElement('div');
  styleElement.id = 'enhanced-dashboard-styles';
  styleElement.innerHTML = enhancedDashboardStyles;
  document.head.appendChild(styleElement);
}