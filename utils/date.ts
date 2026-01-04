/**
 * Format date string to Vietnamese format: "Thứ X, DD/MM/YYYY"
 */
export function formatVietnameseDate(dateString: string | undefined | null): string {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid

    // Format: "Thứ X, DD/MM/YYYY"
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const dayName = days[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${dayName}, ${day}/${month}/${year}`;
  } catch {
    return dateString; // Return original if parsing fails
  }
}

/**
 * Get date from news item, checking multiple possible fields
 */
export function getNewsDate(newsItem: {
  date?: string;
  created_at?: string;
  published_at?: string;
  createdAt?: string;
  publishedAt?: string;
}): string {
  return newsItem.date || 
         newsItem.created_at || 
         newsItem.published_at || 
         newsItem.createdAt || 
         newsItem.publishedAt || 
         '';
}

