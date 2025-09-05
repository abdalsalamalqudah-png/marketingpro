import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import type { Bindings } from './types'

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for frontend-backend communication
app.use('/api/*', cors())

// Serve static files from public directory
app.use('/static/*', serveStatic({ root: './public' }))

// Main app route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Marketing Pro - منصة إدارة التسويق الشاملة</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        
        <!-- FontAwesome Icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="/static/styles.css?v=1701234567890" rel="stylesheet">
        
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
        
        <!-- Initialize timeout to show error if app doesn't load -->
        <script>
        // Fallback if app doesn't initialize within 10 seconds
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading && !window.app) {
                loading.innerHTML = \`
                    <div class="text-center">
                        <div class="text-red-500 text-xl mb-4">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <p class="text-red-600 mb-4">فشل في تحميل التطبيق</p>
                        <button onclick="window.location.reload()" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                            إعادة المحاولة
                        </button>
                    </div>
                \`;
            }
        }, 10000);
        </script>
        
        <script src="/static/app.js?v=1701234567890"></script>
    </body>
    </html>
  `)
})

export default app