/**
 * Marketing Pro - Content Calendar Page
 */

window.ContentCalendarPage = {
  async render() {
    return `
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-h1 font-bold mb-2">تقويم المحتوى</h1>
          <p class="text-gray-600">خطط وجدول المحتوى عبر المنصات</p>
        </div>

        <div class="card">
          <div class="grid grid-cols-2 md:grid-cols-7 gap-3" id="calendar-grid"></div>
        </div>
      </div>
    `;
  },

  init() {
    const grid = document.getElementById('calendar-grid');
    const days = ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
    grid.innerHTML = days.map(d => `
      <div class="border border-gray-200 rounded p-2 min-h-[120px]">
        <div class="text-small mb-2">${d}</div>
        <div class="text-xs text-gray-500">- لا توجد مهام -</div>
      </div>
    `).join('');
  }
};
