/**
 * Format price to USD currency
 * @param price Price in USD
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

/**
 * Format date to readable string
 * @param date Date object or ISO string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format time in HH:MM format
 * @param time Time string (HH:MM)
 * @returns Same time string for consistency
 */
export function formatTime(time: string): string {
  return time;
}

/**
 * Calculate flight duration in hours and minutes
 * @param duration Duration string (e.g., "2h 30m")
 * @returns Duration in minutes
 */
export function calculateDurationInMinutes(duration: string): number {
  const hoursMatch = duration.match(/(\d+)h/);
  const minutesMatch = duration.match(/(\d+)m/);

  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  return hours * 60 + minutes;
}

/**
 * Generate a booking reference code
 * @returns Random booking reference (e.g., BK123ABC)
 */
export function generateBookingReference(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'BK';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Validate email format
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format passenger count
 * @param count Number of passengers
 * @returns Formatted passenger string
 */
export function formatPassengers(count: number): string {
  return `${count} passenger${count !== 1 ? 's' : ''}`;
}

/**
 * Check if a date is in the future
 * @param date Date to check
 * @returns Boolean indicating if date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d > new Date();
}

/**
 * Truncate text to specified length
 * @param text Text to truncate
 * @param length Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, length: number): string {
  return text.length > length ? `${text.substring(0, length)}...` : text;
}
