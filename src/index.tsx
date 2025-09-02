import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { authMiddleware, teamIsolation } from './middleware/auth'
import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import campaignRoutes from './routes/campaigns'
import type { Bindings } from './types'

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for frontend-backend communication
app.use('/api/*', cors())

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }))

// Auth routes (no auth required)
app.route('/api/auth', authRoutes)

// Protected API routes
app.use('/api/*', authMiddleware, teamIsolation)
app.route('/api/dashboard', dashboardRoutes)
app.route('/api/campaigns', campaignRoutes)

// Main app route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Marketing Pro - منصة إدارة التسويق الشاملة</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#0B3D91',
                  secondary: '#FF6B35',
                  accent: '#FFA500'
                }
              }
            }
          }
        </script>
    </head>
    <body class="bg-gray-50 font-sans">
        <!-- App Container -->
        <div id="app" class="min-h-screen">
            <!-- Loading State -->
            <div id="loading" class="flex items-center justify-center min-h-screen">
                <div class="text-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p class="text-gray-600">جارٍ التحميل...</p>
                </div>
            </div>
        </div>

        <!-- Scripts -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/dayjs@1.11.10/dayjs.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

// Login page
app.get('/login', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>تسجيل الدخول - Marketing Pro</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#0B3D91',
                  secondary: '#FF6B35'
                }
              }
            }
          }
        </script>
    </head>
    <body class="bg-gradient-to-br from-primary to-blue-800 min-h-screen flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-primary mb-2">
                    <i class="fas fa-rocket mr-2"></i>
                    Marketing Pro
                </h1>
                <p class="text-gray-600">منصة إدارة التسويق الشاملة</p>
            </div>

            <form id="loginForm" class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input type="email" id="email" required 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                           placeholder="example@company.com">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
                    <input type="password" id="password" required 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                           placeholder="••••••••">
                </div>

                <button type="submit" 
                        class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200">
                    <i class="fas fa-sign-in-alt mr-2"></i>
                    تسجيل الدخول
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-gray-600">ليس لديك حساب؟ 
                    <a href="/register" class="text-primary hover:underline">إنشاء حساب جديد</a>
                </p>
            </div>

            <div id="error" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-700 text-sm"></p>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/auth.js"></script>
    </body>
    </html>
  `)
})

// Register page
app.get('/register', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>إنشاء حساب جديد - Marketing Pro</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#0B3D91',
                  secondary: '#FF6B35'
                }
              }
            }
          }
        </script>
    </head>
    <body class="bg-gradient-to-br from-primary to-blue-800 min-h-screen flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-primary mb-2">
                    <i class="fas fa-rocket mr-2"></i>
                    Marketing Pro
                </h1>
                <p class="text-gray-600">إنشاء حساب وفريق جديد</p>
            </div>

            <form id="registerForm" class="space-y-6">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                        <input type="text" id="name" required 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                               placeholder="أحمد محمد">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                        <input type="email" id="email" required 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                               placeholder="ahmed@company.com">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
                    <input type="password" id="password" required 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                           placeholder="••••••••">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">اسم الشركة/الفريق</label>
                    <input type="text" id="team_name" required 
                           class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                           placeholder="شركة التسويق المحترف">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">رابط الفريق (بالإنجليزية)</label>
                    <div class="flex">
                        <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            marketingpro.com/
                        </span>
                        <input type="text" id="team_slug" required 
                               class="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-transparent" 
                               placeholder="my-marketing-team" 
                               pattern="[a-z0-9-]+">
                    </div>
                    <p class="text-xs text-gray-500 mt-1">أحرف إنجليزية صغيرة وأرقام وشرطات فقط</p>
                </div>

                <button type="submit" 
                        class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200">
                    <i class="fas fa-user-plus mr-2"></i>
                    إنشاء الحساب
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-gray-600">لديك حساب بالفعل؟ 
                    <a href="/login" class="text-primary hover:underline">تسجيل الدخول</a>
                </p>
            </div>

            <div id="error" class="hidden mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-700 text-sm"></p>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/auth.js"></script>
    </body>
    </html>
  `)
})

export default app
