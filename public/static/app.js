// Marketing Pro Main Application JavaScript

// Global app state
const app = {
    user: null,
    team: null,
    currentPage: 'dashboard',
    charts: {},
    
    // Initialize the application
    async init() {
        console.log('Marketing Pro initializing...');
        
        // Check authentication
        await this.checkAuth();
        
        // Set up axios defaults
        axios.defaults.withCredentials = true;
        
        // Initialize the app interface
        this.render();
        
        // Load initial data
        await this.loadDashboard();
        
        console.log('Marketing Pro initialized successfully');
    },
    
    // Check if user is authenticated
    async checkAuth() {
        try {
            const response = await axios.get('/api/auth/me');
            this.user = response.data.user;
            this.team = response.data.team;
        } catch (error) {
            console.log('Not authenticated, redirecting to login');
            window.location.href = '/login';
        }
    },
    
    // Render the main application interface
    render() {
        const appContainer = document.getElementById('app');
        const loadingDiv = document.getElementById('loading');
        
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }
        
        appContainer.innerHTML = `
            <!-- Header -->
            <header class="header">
                <div class="flex items-center">
                    <button id="sidebarToggle" class="md:hidden p-2 rounded-md hover:bg-gray-100">
                        <i class="fas fa-bars"></i>
                    </button>
                    <h1 class="text-xl font-semibold text-primary mr-4">
                        <i class="fas fa-rocket mr-2"></i>
                        Marketing Pro
                    </h1>
                    <span class="text-sm text-gray-600">${this.team?.name || ''}</span>
                </div>
                <div class="flex items-center space-x-4">
                    <div class="hidden md:block">
                        <span class="text-sm text-gray-600">مرحباً، ${this.user?.name || 'مستخدم'}</span>
                    </div>
                    <div class="relative">
                        <button id="userMenu" class="flex items-center p-2 rounded-full hover:bg-gray-100">
                            <i class="fas fa-user-circle text-xl text-gray-600"></i>
                        </button>
                        <div id="userMenuDropdown" class="hidden absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <i class="fas fa-user mr-2"></i>
                                الملف الشخصي
                            </a>
                            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <i class="fas fa-cog mr-2"></i>
                                الإعدادات
                            </a>
                            <hr class="my-1">
                            <a href="#" onclick="app.logout()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <i class="fas fa-sign-out-alt mr-2"></i>
                                تسجيل الخروج
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <div class="flex h-screen overflow-hidden">
                <!-- Sidebar -->
                <aside id="sidebar" class="sidebar w-64 transform -translate-x-full md:translate-x-0 transition-transform duration-300">
                    <nav class="mt-8">
                        <a href="#" onclick="app.navigateTo('dashboard')" class="sidebar-link ${this.currentPage === 'dashboard' ? 'active' : ''}">
                            <i class="fas fa-tachometer-alt ml-3"></i>
                            لوحة التحكم
                        </a>
                        <a href="#" onclick="app.navigateTo('campaigns')" class="sidebar-link ${this.currentPage === 'campaigns' ? 'active' : ''}">
                            <i class="fas fa-bullhorn ml-3"></i>
                            الحملات التسويقية
                        </a>
                        <a href="#" onclick="app.navigateTo('contacts')" class="sidebar-link ${this.currentPage === 'contacts' ? 'active' : ''}">
                            <i class="fas fa-address-book ml-3"></i>
                            جهات الاتصال
                        </a>
                        <a href="#" onclick="app.navigateTo('email')" class="sidebar-link ${this.currentPage === 'email' ? 'active' : ''}">
                            <i class="fas fa-envelope ml-3"></i>
                            البريد الإلكتروني
                        </a>
                        <a href="#" onclick="app.navigateTo('social')" class="sidebar-link ${this.currentPage === 'social' ? 'active' : ''}">
                            <i class="fas fa-share-alt ml-3"></i>
                            وسائل التواصل
                        </a>
                        <a href="#" onclick="app.navigateTo('content')" class="sidebar-link ${this.currentPage === 'content' ? 'active' : ''}">
                            <i class="fas fa-calendar ml-3"></i>
                            تقويم المحتوى
                        </a>
                        <a href="#" onclick="app.navigateTo('analytics')" class="sidebar-link ${this.currentPage === 'analytics' ? 'active' : ''}">
                            <i class="fas fa-chart-bar ml-3"></i>
                            التحليلات
                        </a>
                        <a href="#" onclick="app.navigateTo('ai')" class="sidebar-link ${this.currentPage === 'ai' ? 'active' : ''}">
                            <i class="fas fa-robot ml-3"></i>
                            المساعد الذكي
                        </a>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main id="mainContent" class="flex-1 overflow-auto bg-gray-50 p-6">
                    <div id="pageContent">
                        <!-- Page content will be loaded here -->
                    </div>
                </main>
            </div>

            <!-- Mobile overlay -->
            <div id="mobileOverlay" class="mobile-overlay hidden md:hidden" onclick="app.closeSidebar()"></div>
        `;
        
        // Set up event listeners
        this.setupEventListeners();
    },
    
    // Set up event listeners
    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        // User menu dropdown
        const userMenu = document.getElementById('userMenu');
        const userMenuDropdown = document.getElementById('userMenuDropdown');
        
        if (userMenu && userMenuDropdown) {
            userMenu.addEventListener('click', () => {
                userMenuDropdown.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target)) {
                    userMenuDropdown.classList.add('hidden');
                }
            });
        }
    },
    
    // Toggle sidebar (mobile)
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    },
    
    // Close sidebar (mobile)
    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileOverlay');
        
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    },
    
    // Navigate to different pages
    async navigateTo(page) {
        this.currentPage = page;
        
        // Update sidebar active state
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[onclick="app.navigateTo('${page}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Load page content
        switch(page) {
            case 'dashboard':
                await this.loadDashboard();
                break;
            case 'campaigns':
                await this.loadCampaigns();
                break;
            case 'contacts':
                await this.loadContacts();
                break;
            case 'email':
                await this.loadEmail();
                break;
            case 'social':
                await this.loadSocial();
                break;
            case 'content':
                await this.loadContent();
                break;
            case 'analytics':
                await this.loadAnalytics();
                break;
            case 'ai':
                await this.loadAI();
                break;
        }
        
        // Close mobile sidebar
        this.closeSidebar();
    },
    
    // Load dashboard page
    async loadDashboard() {
        const pageContent = document.getElementById('pageContent');
        
        try {
            // Show loading state
            pageContent.innerHTML = '<div class="text-center"><div class="loading-spinner h-8 w-8 mx-auto mb-4"></div><p>جارٍ تحميل البيانات...</p></div>';
            
            // Load dashboard data
            const [analyticsResponse, insightsResponse] = await Promise.all([
                axios.get('/api/dashboard/analytics'),
                axios.get('/api/dashboard/insights')
            ]);
            
            const analytics = analyticsResponse.data;
            const insights = insightsResponse.data.insights;
            
            pageContent.innerHTML = `
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
                    <p class="text-gray-600">نظرة عامة على أداء حملاتك التسويقية</p>
                </div>

                <!-- KPI Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="kpi-card">
                        <div class="kpi-value">${analytics.total_campaigns}</div>
                        <div class="kpi-label">إجمالي الحملات</div>
                        <div class="kpi-change positive">
                            <i class="fas fa-arrow-up"></i>
                            ${analytics.active_campaigns} نشط
                        </div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-value">${this.formatNumber(analytics.total_contacts)}</div>
                        <div class="kpi-label">جهات الاتصال</div>
                        <div class="kpi-change positive">
                            <i class="fas fa-arrow-up"></i>
                            +12% هذا الشهر
                        </div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-value">${analytics.conversion_rate}%</div>
                        <div class="kpi-label">معدل التحويل</div>
                        <div class="kpi-change positive">
                            <i class="fas fa-arrow-up"></i>
                            +0.5% هذا الأسبوع
                        </div>
                    </div>
                    
                    <div class="kpi-card">
                        <div class="kpi-value">${analytics.roi}%</div>
                        <div class="kpi-label">عائد الاستثمار</div>
                        <div class="kpi-change ${analytics.roi >= 0 ? 'positive' : 'negative'}">
                            <i class="fas fa-arrow-${analytics.roi >= 0 ? 'up' : 'down'}"></i>
                            ${analytics.roi >= 0 ? '+' : ''}${analytics.roi}% إجمالي
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Recent Campaigns -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">الحملات الأخيرة</h3>
                        </div>
                        <div class="space-y-4">
                            ${analytics.recent_campaigns?.map(campaign => `
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 class="font-medium text-gray-900">${campaign.name}</h4>
                                        <p class="text-sm text-gray-600">الميزانية: $${this.formatNumber(campaign.budget)}</p>
                                    </div>
                                    <div class="text-left">
                                        <span class="status-badge status-${campaign.status}">${this.getStatusText(campaign.status)}</span>
                                        <p class="text-sm text-gray-600 mt-1">المصروف: ${campaign.spend_rate}%</p>
                                    </div>
                                </div>
                            `).join('') || '<p class="text-gray-500 text-center py-4">لا توجد حملات حالياً</p>'}
                        </div>
                    </div>

                    <!-- AI Insights -->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-robot mr-2"></i>
                                توصيات ذكية
                            </h3>
                        </div>
                        <div class="space-y-4">
                            ${insights?.map(insight => `
                                <div class="ai-insight ${this.getConfidenceClass(insight.confidence_score)}">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <h4 class="font-medium text-gray-900 mb-1">${insight.title}</h4>
                                            <p class="text-sm text-gray-600">${insight.description}</p>
                                            <div class="flex items-center mt-2">
                                                <span class="text-xs text-gray-500">
                                                    دقة التوصية: ${Math.round(insight.confidence_score * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex space-x-2 mr-4">
                                            <button onclick="app.applyInsight(${insight.id})" class="btn btn-primary btn-sm">
                                                تطبيق
                                            </button>
                                            <button onclick="app.dismissInsight(${insight.id})" class="btn btn-outline btn-sm">
                                                تجاهل
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('') || '<p class="text-gray-500 text-center py-4">لا توجد توصيات جديدة</p>'}
                        </div>
                    </div>
                </div>
            `;
            
        } catch (error) {
            console.error('Dashboard loading error:', error);
            pageContent.innerHTML = '<div class="text-center text-red-600">حدث خطأ في تحميل لوحة التحكم</div>';
        }
    },
    
    // Utility functions
    formatNumber(num) {
        return new Intl.NumberFormat('ar-EG').format(num || 0);
    },
    
    getStatusText(status) {
        const statusMap = {
            'active': 'نشط',
            'draft': 'مسودة',
            'paused': 'متوقف',
            'completed': 'مكتمل',
            'archived': 'مؤرشف'
        };
        return statusMap[status] || status;
    },
    
    getConfidenceClass(confidence) {
        if (confidence >= 0.8) return 'high-confidence';
        if (confidence >= 0.6) return 'medium-confidence';
        return 'low-confidence';
    },
    
    // Logout function
    async logout() {
        try {
            await axios.post('/api/auth/logout');
            localStorage.removeItem('user');
            localStorage.removeItem('team');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
    
    // Placeholder functions for other pages
    async loadCampaigns() {
        document.getElementById('pageContent').innerHTML = '<h1 class="text-3xl font-bold text-gray-900 mb-6">الحملات التسويقية</h1><p class="text-gray-600">قريباً...</p>';
    },
    
    async loadContacts() {
        document.getElementById('pageContent').innerHTML = '<h1 class="text-3xl font-bold text-gray-900 mb-6">جهات الاتصال</h1><p class="text-gray-600">قريباً...</p>';
    },
    
    async loadEmail() {
        document.getElementById('pageContent').innerHTML = '<h1 class="text-3xl font-bold text-gray-900 mb-6">البريد الإلكتروني</h1><p class="text-gray-600">قريباً...</p>';
    },
    
    async loadSocial() {
        document.getElementById('pageContent').innerHTML = '<h1 class="text-3xl font-bold text-gray-900 mb-6">وسائل التواصل الاجتماعي</h1><p class="text-gray-600">قريباً...</p>';
    },
    
    async loadContent() {
        document.getElementById('pageContent').innerHTML = '<h1 class="text-3xl font-bold text-gray-900 mb-6">تقويم المحتوى</h1><p class="text-gray-600">قريباً...</p>';
    },
    
    async loadAnalytics() {
        document.getElementById('pageContent').innerHTML = '<h1 class="text-3xl font-bold text-gray-900 mb-6">التحليلات المتقدمة</h1><p class="text-gray-600">قريباً...</p>';
    },
    
    async loadAI() {
        document.getElementById('pageContent').innerHTML = '<h1 class="text-3xl font-bold text-gray-900 mb-6">المساعد الذكي</h1><p class="text-gray-600">قريباً...</p>';
    }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});