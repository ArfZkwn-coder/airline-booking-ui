// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation (min 6 chars, at least 1 letter and 1 number)
export function isValidPassword(password: string): boolean {
  return password.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

// Validation error messages
export const ValidationErrors = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 6 characters with at least 1 letter and 1 number',
  MISSING_EMAIL: 'Email is required',
  MISSING_PASSWORD: 'Password is required',
  EMAIL_IN_USE: 'Email is already registered',
  USER_NOT_FOUND: 'Email not found',
  INVALID_CREDENTIALS: 'Invalid email or password',
};
