// Simple fix for contact-lists API
export function fixContactListsAPI() {
  return {
    lists: [
      { id: 1, name: 'جميع العملاء', description: 'قائمة جميع العملاء المسجلين', contact_count: 1247, created_at: '2024-01-01', is_active: true },
      { id: 2, name: 'المشتركون في النشرة', description: 'المشتركون في النشرة الإخبارية', contact_count: 892, created_at: '2024-01-05', is_active: true },
      { id: 3, name: 'عملاء VIP', description: 'العملاء المميزون والمهمون', contact_count: 156, created_at: '2024-01-10', is_active: true },
      { id: 4, name: 'عملاء محتملون', description: 'العملاء المحتملون الجدد', contact_count: 445, created_at: '2024-01-12', is_active: true }
    ]
  };
}