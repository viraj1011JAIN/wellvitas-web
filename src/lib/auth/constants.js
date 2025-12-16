/**
 * Authentication constants and configuration
 */

export const AUTH_CONFIG = {
  // Session and token settings
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  REFRESH_TOKEN_INTERVAL: 60 * 60 * 1000, // 1 hour in milliseconds
  
  // Rate limiting
  RATE_LIMIT: {
    LOGIN_ATTEMPTS: 5,
    LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes in milliseconds
    SIGNUP_ATTEMPTS: 3,
    SIGNUP_WINDOW: 60 * 60 * 1000, // 1 hour in milliseconds
    PASSWORD_RESET_ATTEMPTS: 3,
    PASSWORD_RESET_WINDOW: 60 * 60 * 1000, // 1 hour in milliseconds
  },
  
  // Cookie configuration
  COOKIE_CONFIG: {
    SECURE: process.env.NODE_ENV === 'production',
    HTTP_ONLY: true,
    SAME_SITE: 'Lax',
    MAX_AGE: 24 * 60 * 60, // 24 hours
  },
  
  // Error messages
  ERRORS: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_ALREADY_EXISTS: 'An account with this email already exists',
    WEAK_PASSWORD: 'Password does not meet security requirements',
    SESSION_EXPIRED: 'Your session has expired. Please log in again',
    UNAUTHORIZED: 'You are not authorized to access this resource',
    EMAIL_NOT_CONFIRMED: 'Please confirm your email before logging in',
    INVALID_EMAIL: 'Please enter a valid email address',
    NETWORK_ERROR: 'A network error occurred. Please try again',
    UNKNOWN_ERROR: 'An unexpected error occurred. Please try again',
  },
  
  // Success messages
  SUCCESS: {
    SIGNUP_EMAIL_SENT: 'Check your email to confirm your account',
    PASSWORD_RESET_EMAIL_SENT: 'Check your email for password reset instructions',
    PASSWORD_RESET_SUCCESS: 'Your password has been successfully reset',
    LOGIN_SUCCESS: 'You have successfully logged in',
  },
  
  // Redirect URLs
  REDIRECT_URLS: {
    AFTER_LOGIN: '/dashboard',
    AFTER_SIGNUP: '/verify-email',
    AFTER_PASSWORD_RESET: '/login',
    LOGIN_PAGE: '/login',
    SIGNUP_PAGE: '/signup',
  },
}

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRES_UPPERCASE: true,
  REQUIRES_LOWERCASE: true,
  REQUIRES_NUMBERS: true,
  REQUIRES_SPECIAL_CHARS: true,
  SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings']

export const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password']
