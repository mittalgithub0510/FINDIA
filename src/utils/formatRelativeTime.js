/**
 * Formats a date, timestamp, or relative time string into a concise human-readable relative format.
 *
 * @param {Date|string|number} dateInput - Date object, ISO string, timestamp, or pre-formatted string
 * @returns {string} Relative time string (e.g. "just now", "4 min ago", "2 hr ago")
 */
export function formatRelativeTime(dateInput) {
  if (!dateInput) return '';

  // If already formatted like "4 min ago" or "just now", return as-is
  if (typeof dateInput === 'string' && (dateInput.includes('ago') || dateInput === 'just now')) {
    return dateInput;
  }

  let date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === 'number') {
    date = new Date(dateInput);
  } else if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  }

  if (!date || isNaN(date.getTime())) {
    return String(dateInput);
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0) {
    return 'just now';
  }

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} d ago`;
  }

  // Older dates
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

export default formatRelativeTime;
