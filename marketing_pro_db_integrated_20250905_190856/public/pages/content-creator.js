/**
 * Marketing Pro - Content Creator Page
 */

window.ContentCreatorPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">منشيء المحتوى</h1>
          <p class="text-gray-600">إنشاء أفكار منشورات ورسائل تسويقية</p>
        </div>

        <div class="card">
          <h3 class="text-h3 font-bold mb-4">مولد الأفكار</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input id="topic" type="text" class="px-4 py-2 border border-gray-300 rounded-lg" placeholder="الموضوع"/>
            <select id="tone" class="px-4 py-2 border border-gray-300 rounded-lg">
              <option value="professional">احترافي</option>
              <option value="friendly">ودي</option>
              <option value="funny">مرح</option>
            </select>
            <button id="generate" class="btn btn-primary">توليد أفكار</button>
          </div>
          <div id="ideas" class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"></div>
        </div>
      </div>
    `;
  },

  init() {
    document.getElementById('generate')?.addEventListener('click', () => {
      const topic = (document.getElementById('topic').value || 'منتجك').trim();
      const tone = document.getElementById('tone').value;
      const examples = [
        `\u2728 ${topic}: 3 فوائد رئيسية لا يعرفها الجميع`,
        `\u23F0 لا تفوت العرض الخاص بـ ${topic} هذا الأسبوع!`,
        `\uD83D\uDCC8 كيف حقق ${topic} نتائج مذهلة مع عملائنا`,
        `\u2757 لماذا ${topic} هو الخيار الأفضل الآن؟`,
        `\uD83D\uDCF1 ${topic}: نصائح سريعة قابلة للتطبيق اليوم`
      ];
      document.getElementById('ideas').innerHTML = examples.map(t => `
        <div class="p-3 border border-gray-200 rounded">${t}</div>
      `).join('');
    });
  }
};
