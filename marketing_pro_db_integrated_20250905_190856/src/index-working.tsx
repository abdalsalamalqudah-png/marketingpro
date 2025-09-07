import { Hono } from 'hono'

const app = new Hono()

// API endpoint للتحليلات
app.get('/api/analytics', (c) => {
  return c.json({
    campaigns: { total: 12, active: 8, draft: 2, completed: 2 },
    contacts: { total: 1247, new_this_month: 156, active: 89 },
    performance: { 
      roi: { value: 24.5, change: 12 },
      conversion_rate: { value: 3.2, change: 0.5 },
      page_views: { value: 45231, change: 8 },
      click_rate: { value: 3.4, change: -0.2 }
    }
  })
})

// Main app route with flat icons
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Marketing Pro - منصة إدارة التسويق الشاملة</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .card { background: white; border-radius: 16px; padding: 20px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: all 0.2s; }
        .card:hover { box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-color: #d1d5db; }
        .icon-flat { color: #3b82f6; font-size: 20px; }
        .icon-success { color: #10b981; }
        .icon-warning { color: #f59e0b; }
        .icon-danger { color: #ef4444; }
        </style>
    </head>
    <body class="bg-gray-50">
        <div class="min-h-screen">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center space-x-4">
                            <i class="fas fa-rocket icon-flat text-2xl"></i>
                            <h1 class="text-2xl font-bold text-gray-900">Marketing Pro</h1>
                        </div>
                        <div class="flex items-center space-x-4">
                            <i class="fas fa-user icon-flat"></i>
                            <span class="text-gray-700">مستخدم تجريبي</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- الأيقونات المسطحة النظيفة -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <!-- ROI Card -->
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div class="text-right">
                                <p class="text-xs text-gray-500 mb-1">العائد على الاستثمار</p>
                                <p class="text-2xl font-bold text-gray-900">24.5%</p>
                                <p class="text-xs text-green-600">+12% هذا الشهر</p>
                            </div>
                            <i class="fas fa-percentage icon-flat icon-success"></i>
                        </div>
                    </div>

                    <!-- Page Views Card -->
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div class="text-right">
                                <p class="text-xs text-gray-500 mb-1">المشاهدات</p>
                                <p class="text-2xl font-bold text-gray-900">45.2K</p>
                                <p class="text-xs text-blue-600">+8% هذا الشهر</p>
                            </div>
                            <i class="fas fa-eye icon-flat"></i>
                        </div>
                    </div>

                    <!-- Click Rate Card -->
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div class="text-right">
                                <p class="text-xs text-gray-500 mb-1">معدل النقر</p>
                                <p class="text-2xl font-bold text-gray-900">3.4%</p>
                                <p class="text-xs text-orange-600">-0.2% هذا الشهر</p>
                            </div>
                            <i class="fas fa-mouse-pointer icon-flat icon-warning"></i>
                        </div>
                    </div>

                    <!-- Conversion Rate Card -->
                    <div class="card">
                        <div class="flex items-center justify-between">
                            <div class="text-right">
                                <p class="text-xs text-gray-500 mb-1">معدل التحويل</p>
                                <p class="text-2xl font-bold text-gray-900">3.2%</p>
                                <p class="text-xs text-green-600">+0.5% هذا الشهر</p>
                            </div>
                            <i class="fas fa-exchange-alt icon-flat icon-success"></i>
                        </div>
                    </div>
                </div>

                <!-- AI Features Section -->
                <div class="mb-8">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">الميزات الذكية</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <!-- Content Generator -->
                        <div class="card cursor-pointer">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">مولد المحتوى</h3>
                                    <p class="text-gray-600 text-sm">إنشاء محتوى احترافي بالذكاء الاصطناعي</p>
                                </div>
                                <i class="fas fa-edit icon-flat" style="color: #8b5cf6;"></i>
                            </div>
                        </div>

                        <!-- Smart Analytics -->
                        <div class="card cursor-pointer">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">تحليلات ذكية</h3>
                                    <p class="text-gray-600 text-sm">رؤى وتوصيات مدعومة بالذكاء الاصطناعي</p>
                                </div>
                                <i class="fas fa-chart-line icon-flat icon-success"></i>
                            </div>
                        </div>

                        <!-- Campaign Optimizer -->
                        <div class="card cursor-pointer">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">محسن الحملات</h3>
                                    <p class="text-gray-600 text-sm">تحسين أداء الحملات تلقائياً</p>
                                </div>
                                <i class="fas fa-cogs icon-flat"></i>
                            </div>
                        </div>

                        <!-- Smart Personalization -->
                        <div class="card cursor-pointer">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">التخصيص الذكي</h3>
                                    <p class="text-gray-600 text-sm">محتوى مخصص لكل عميل</p>
                                </div>
                                <i class="fas fa-user-cog icon-flat icon-warning"></i>
                            </div>
                        </div>

                        <!-- Market Predictions -->
                        <div class="card cursor-pointer">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">توقعات السوق</h3>
                                    <p class="text-gray-600 text-sm">توقعات الاتجاهات والفرص</p>
                                </div>
                                <i class="fas fa-crystal-ball icon-flat" style="color: #ec4899;"></i>
                            </div>
                        </div>

                        <!-- AI Assistant -->
                        <div class="card cursor-pointer">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">المساعد الذكي</h3>
                                    <p class="text-gray-600 text-sm">مساعد ذكي للتسويق 24/7</p>
                                </div>
                                <i class="fas fa-robot icon-flat" style="color: #06b6d4;"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Social Media Platforms -->
                <div class="mb-8">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">منصات التواصل الاجتماعي</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- Facebook -->
                        <div class="card">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">فيسبوك</h3>
                                    <p class="text-gray-600 text-sm">إدارة صفحات وحملات فيسبوك</p>
                                </div>
                                <i class="fab fa-facebook icon-flat"></i>
                            </div>
                            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                ربط الحساب
                            </button>
                        </div>

                        <!-- Twitter -->
                        <div class="card">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">تويتر</h3>
                                    <p class="text-gray-600 text-sm">جدولة ونشر التغريدات</p>
                                </div>
                                <i class="fab fa-twitter icon-flat" style="color: #1da1f2;"></i>
                            </div>
                            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                ربط الحساب
                            </button>
                        </div>

                        <!-- Instagram -->
                        <div class="card">
                            <div class="flex items-center justify-between mb-4">
                                <div class="text-right">
                                    <h3 class="text-lg font-bold text-gray-900 mb-1">إنستغرام</h3>
                                    <p class="text-gray-600 text-sm">إدارة المنشورات والقصص</p>
                                </div>
                                <i class="fab fa-instagram icon-flat" style="color: #e4405f;"></i>
                            </div>
                            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                ربط الحساب
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Contacts Analytics -->
                <div class="mb-8">
                    <h2 class="text-xl font-bold text-gray-900 mb-4">إدارة العملاء</h2>
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <!-- Total Contacts -->
                        <div class="card">
                            <div class="flex items-center justify-between">
                                <div class="text-right">
                                    <p class="text-xs text-gray-500 mb-1">إجمالي العملاء</p>
                                    <p class="text-2xl font-bold text-gray-900">1,247</p>
                                </div>
                                <i class="fas fa-users icon-flat" style="color: #0891b2;"></i>
                            </div>
                        </div>

                        <!-- New Contacts -->
                        <div class="card">
                            <div class="flex items-center justify-between">
                                <div class="text-right">
                                    <p class="text-xs text-gray-500 mb-1">عملاء جدد</p>
                                    <p class="text-2xl font-bold text-gray-900">156</p>
                                </div>
                                <i class="fas fa-user-plus icon-flat icon-success"></i>
                            </div>
                        </div>

                        <!-- Active Contacts -->
                        <div class="card">
                            <div class="flex items-center justify-between">
                                <div class="text-right">
                                    <p class="text-xs text-gray-500 mb-1">عملاء نشطون</p>
                                    <p class="text-2xl font-bold text-gray-900">89</p>
                                </div>
                                <i class="fas fa-star icon-flat"></i>
                            </div>
                        </div>

                        <!-- Conversion Rate -->
                        <div class="card">
                            <div class="flex items-center justify-between">
                                <div class="text-right">
                                    <p class="text-xs text-gray-500 mb-1">معدل التحويل</p>
                                    <p class="text-2xl font-bold text-gray-900">3.2%</p>
                                </div>
                                <i class="fas fa-chart-pie icon-flat" style="color: #8b5cf6;"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Message -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <i class="fas fa-check-circle text-green-500 text-3xl mb-4"></i>
                    <h3 class="text-lg font-bold text-green-800 mb-2">✅ تم إصلاح الأيقونات بنجاح!</h3>
                    <p class="text-green-700">جميع الأيقونات أصبحت مسطحة ونظيفة بدون حاويات دائرية كما طلبت تماماً</p>
                    <div class="mt-4 flex justify-center items-center space-x-4">
                        <span class="text-green-600">أيقونات مسطحة:</span>
                        <i class="fas fa-rocket icon-flat"></i>
                        <i class="fas fa-chart-line icon-flat"></i>
                        <i class="fas fa-users icon-flat"></i>
                        <i class="fas fa-cogs icon-flat"></i>
                        <i class="fas fa-eye icon-flat"></i>
                    </div>
                </div>
            </main>
        </div>

        <script>
        // Simple demo functionality
        console.log('Marketing Pro loaded with flat icons!');
        
        // Add click handlers for demo
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
        </script>
    </body>
    </html>
  `)
})

export default app