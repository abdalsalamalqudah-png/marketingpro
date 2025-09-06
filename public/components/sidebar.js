/**
 * Marketing Pro - Sidebar Component
 * Collapsible responsive sidebar with RTL support
 */

class Sidebar {
  constructor() {
    this.isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    this.currentSection = 'dashboard';
    this.isMobile = window.innerWidth <= 768;
    this.showMobileSidebar = false;
    
    this.sections = [
      {
        id: 'dashboard',
        title: 'الصفحة الرئيسية',
        icon: 'fas fa-tachometer-alt',
        component: 'DashboardPage'
      },
      {
        id: 'marketing-strategy',
        title: 'استراتيجية التسويق',
        icon: 'fas fa-bullseye',
        component: 'MarketingStrategyPage'
      },
      {
        id: 'users',
        title: 'المستخدمون والصلاحيات',
        icon: 'fas fa-user-shield',
        component: 'UsersPage'
      },
      {
        id: 'clients',
        title: 'العملاء',
        icon: 'fas fa-users',
        component: 'ClientsPage'
      },
      {
        id: 'email',
        title: 'البريد الإلكتروني',
        icon: 'fas fa-envelope',
        component: 'EmailPage'
      },
      {
        id: 'whatsapp',
        title: 'ربط واتساب بزنس',
        icon: 'fab fa-whatsapp',
        component: 'WhatsAppPage'
      },
      {
        id: 'campaigns',
        title: 'الحملات',
        icon: 'fas fa-rocket',
        component: 'CampaignsPage'
      },
      {
        id: 'social-media',
        title: 'منصات التواصل الاجتماعي',
        icon: 'fas fa-share-alt',
        component: 'SocialMediaPage'
      },
      {
        id: 'content-creator',
        title: 'منشيء المحتوى',
        icon: 'fas fa-edit',
        component: 'ContentCreatorPage'
      },
      {
        id: 'ai-tools',
        title: 'الذكاء الاصطناعي',
        icon: 'fas fa-brain',
        component: 'AIToolsPage'
      },
      {
        id: 'content-calendar',
        title: 'تقويم المحتوى',
        icon: 'fas fa-calendar-alt',
        component: 'ContentCalendarPage'
      },
      {
        id: 'smart-assistant',
        title: 'مساعد ذكي',
        icon: 'fas fa-robot',
        component: 'SmartAssistantPage'
      },
      {
        id: 'integrations',
        title: 'التكامل مع المنصات',
        icon: 'fas fa-plug',
        component: 'IntegrationsPage'
      },
      {
        id: 'brand-settings',
        title: 'إعدادات الهوية البصرية',
        icon: 'fas fa-palette',
        component: 'BrandSettingsPage'
      }
    ];
    
    this.init();
  }
  
  init() {
    this.render();
    this.bindEvents();
    this.handleResize();
    this.loadSection(this.currentSection);
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }
  
  handleResize() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      this.updateSidebarVisibility();
    }
  }
  
  render() {
    const sidebarHTML = `
      <!-- Sidebar -->
      <div id="sidebar" class="sidebar ${this.isCollapsed ? 'collapsed' : ''} ${this.isMobile && this.showMobileSidebar ? 'show' : ''}">
        <!-- Sidebar Header -->
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center ${this.isCollapsed ? 'justify-center' : 'justify-between'}">
            ${!this.isCollapsed ? `
              <div class="flex items-center gap-3">
                <i class="fas fa-rocket icon-flat text-xl"></i>
                <h2 class="text-h3 font-bold">Marketing Pro</h2>
              </div>
            ` : `
              <i class="fas fa-rocket icon-flat text-xl"></i>
            `}
            <button id="toggle-sidebar" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <i class="fas ${this.isCollapsed ? 'fa-chevron-left' : 'fa-chevron-right'} text-gray-500"></i>
            </button>
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="sidebar-nav">
          ${this.sections.map(section => `
            <div class="sidebar-item ${this.currentSection === section.id ? 'active' : ''}" 
                 data-section="${section.id}"
                 ${this.isCollapsed ? `data-tooltip="${section.title}"` : ''}
                 ${this.isCollapsed ? 'class="tooltip"' : ''}>
              <i class="${section.icon} icon text-lg"></i>
              <span class="text mr-3">${section.title}</span>
            </div>
          `).join('')}
          
          <!-- Logout Button in Sidebar -->
          <div class="sidebar-divider mt-4 pt-4 border-t border-gray-200">
            <div id="sidebar-logout-btn" class="sidebar-item logout-item">
              <i class="fas fa-sign-out-alt icon text-lg text-red-500"></i>
              <span class="text mr-3 text-red-600">تسجيل الخروج</span>
            </div>
          </div>
        </nav>
      </div>
      
      <!-- Mobile Overlay -->
      <div id="sidebar-overlay" class="sidebar-overlay ${this.isMobile && this.showMobileSidebar ? 'show' : ''}"></div>
      
      <!-- Main Content Area -->
      <div id="main-content" class="main-content">
        <!-- Header -->
        <header class="header">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <div class="flex items-center gap-4">
                ${this.isMobile ? `
                  <button id="mobile-menu" class="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
                    <i class="fas fa-bars text-gray-600"></i>
                  </button>
                ` : ''}
                <h1 class="text-h2 font-bold">Marketing Pro</h1>
              </div>
              <div class="flex items-center gap-4">
                <button class="p-2 rounded-lg hover:bg-gray-100">
                  <i class="fas fa-bell text-gray-600"></i>
                </button>
                <div class="flex items-center gap-2">
                  <button id="logout-btn" class="btn btn-outline">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="hidden sm:inline">خروج</span>
                  </button>
                  <i class="fas fa-user icon-flat"></i>
                  <span class="text-gray-700">مستخدم تجريبي</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <!-- Page Content -->
        <main id="page-content" class="p-6">
          <!-- Content will be loaded here -->
        </main>
      </div>
    `;
    
    document.body.innerHTML = sidebarHTML;
  }
  
  bindEvents() {
    // Toggle sidebar
    const toggleBtn = document.getElementById('toggle-sidebar');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.toggleSidebar();
      });
    }
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        this.toggleMobileSidebar();
      });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }
    
    // Sidebar logout button (in sidebar)
    const sidebarLogoutBtn = document.getElementById('sidebar-logout-btn');
    if (sidebarLogoutBtn) {
      sidebarLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }

    // Sidebar overlay
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.toggleMobileSidebar();
      });
    }
    
    // Sidebar navigation
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        this.navigateToSection(section);
      });
    });
  }
  
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebar-collapsed', this.isCollapsed.toString());
    this.updateSidebarVisibility();
  }
  
  toggleMobileSidebar() {
    if (this.isMobile) {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      
      this.showMobileSidebar = !this.showMobileSidebar;
      
      if (this.showMobileSidebar) {
        sidebar.classList.add('show');
        overlay.classList.add('show');
        // Prevent body scroll when sidebar is open
        document.body.classList.add('sidebar-open');
      } else {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        // Allow body scroll when sidebar is closed
        document.body.classList.remove('sidebar-open');
      }
    }
  }
  
  updateSidebarVisibility() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');
    const toggleIcon = toggleBtn?.querySelector('i');
    
    if (sidebar) {
      if (this.isMobile) {
        sidebar.className = `sidebar ${this.showMobileSidebar ? 'show' : ''}`;
      } else {
        sidebar.className = `sidebar ${this.isCollapsed ? 'collapsed' : ''}`;
      }
    }
    
    if (toggleIcon) {
      toggleIcon.className = `fas ${this.isCollapsed ? 'fa-chevron-left' : 'fa-chevron-right'} text-gray-500`;
    }
    
    // Update tooltips for collapsed state
    document.querySelectorAll('.sidebar-item').forEach(item => {
      const section = this.sections.find(s => s.id === item.getAttribute('data-section'));
      if (this.isCollapsed) {
        item.setAttribute('data-tooltip', section.title);
        item.classList.add('tooltip');
      } else {
        item.removeAttribute('data-tooltip');
        item.classList.remove('tooltip');
      }
    });
  }
  
  navigateToSection(sectionId) {
    if (this.currentSection === sectionId) return;
    
    // Update active state
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeItem) {
      activeItem.classList.add('active');
    }
    
    // Close mobile sidebar after navigation
    if (this.isMobile) {
      this.toggleMobileSidebar();
    }
    
    this.currentSection = sectionId;
    this.loadSection(sectionId);
    
    // Update URL without page reload
    window.history.pushState({section: sectionId}, '', `#${sectionId}`);
  }
  
  async loadSection(sectionId) {
    const section = this.sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const contentArea = document.getElementById('page-content');
    if (!contentArea) return;
    
    // Show loading state
    contentArea.innerHTML = `
      <div class="flex items-center justify-center min-h-[400px]">
        <div class="text-center">
          <div class="loading w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600">جارٍ تحميل ${section.title}...</p>
        </div>
      </div>
    `;
    
    try {
      // Load the component dynamically
      const component = window[section.component];
      if (component && typeof component.render === 'function') {
        const content = await component.render();
        contentArea.innerHTML = content;
        
        // Initialize component if it has an init method
        if (typeof component.init === 'function') {
          component.init();
        }
      } else {
        // Fallback to basic page
        contentArea.innerHTML = this.getBasicPageContent(section);
      }
    } catch (error) {
      console.error(`Error loading section ${sectionId}:`, error);
      contentArea.innerHTML = `
        <div class="error-message">
          <h3 class="font-bold mb-2">خطأ في تحميل الصفحة</h3>
          <p>حدث خطأ أثناء تحميل ${section.title}. يرجى المحاولة مرة أخرى.</p>
        </div>
      `;
    }
  }
  
  handleLogout() {
    // Show confirmation dialog
    if (confirm('هل تريد تسجيل الخروج؟')) {
      // Call logout API
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('auth_token') || ''
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Clear any stored data
          localStorage.removeItem('sidebar-collapsed');
          localStorage.removeItem('user-session');
          localStorage.removeItem('auth_token');
          
          // Redirect to landing page
          window.location.href = '/landing';
        } else {
          console.error('Logout failed:', data.error);
          // Still clear data and redirect on error
          localStorage.clear();
          window.location.href = '/landing';
        }
      })
      .catch(error => {
        console.error('Logout error:', error);
        // Clear data and redirect even on error
        localStorage.clear();
        window.location.href = '/landing';
      });
      
      // Close mobile sidebar if open
      if (this.isMobile && this.showMobileSidebar) {
        this.toggleMobileSidebar();
      }
    }
  }
  
  getBasicPageContent(section) {
    return `
      <div class="max-w-7xl mx-auto">
        <div class="mb-6">
          <h1 class="text-h1 font-bold mb-2">${section.title}</h1>
          <p class="text-gray-600">مرحباً بك في قسم ${section.title}</p>
        </div>
        
        <div class="card">
          <div class="flex items-center gap-4 mb-4">
            <i class="${section.icon} icon-flat text-3xl"></i>
            <div>
              <h2 class="text-h2 font-bold">قريباً</h2>
              <p class="text-gray-600">هذا القسم قيد التطوير</p>
            </div>
          </div>
          
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 class="font-bold text-blue-800 mb-2">الميزات المخطط لها:</h3>
            <ul class="text-blue-700 space-y-1">
              <li>• واجهة إدارة شاملة</li>
              <li>• تكامل مع APIs خارجية</li>
              <li>• تحليلات وتقارير متقدمة</li>
              <li>• أتمتة المهام</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.sidebar = new Sidebar();
});

// Handle browser navigation
window.addEventListener('popstate', (event) => {
  if (event.state && event.state.section) {
    window.sidebar.loadSection(event.state.section);
  }
});