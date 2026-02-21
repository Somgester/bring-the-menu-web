/**
 * Security utilities and constants
 */

/**
 * Rate limiting configuration
 */
export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  SIGNUP_ATTEMPTS: 3,
  SIGNUP_WINDOW_MS: 60 * 60 * 1000, // 1 hour
} as const;

/**
 * Password requirements
 */
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 128,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: false, // Optional for now
} as const;

/**
 * Input length limits
 */
export const INPUT_LIMITS = {
  EMAIL_MAX: 254,
  RESTAURANT_NAME_MIN: 2,
  RESTAURANT_NAME_MAX: 100,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 128,
  DESCRIPTION_MAX: 1000,
  MENU_ITEM_NAME_MAX: 100,
} as const;

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * Sanitize error messages to prevent information leakage
 */
export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // In production, don't expose internal error details
    if (isProduction()) {
      return "An error occurred. Please try again later.";
    }
    return error.message;
  }
  return "An unexpected error occurred.";
}

/**
 * Log security events (in production, this should go to a monitoring service)
 */
export function logSecurityEvent(event: string, details?: Record<string, unknown>): void {
  if (isProduction()) {
    // In production, send to monitoring service (e.g., Sentry, LogRocket)
    console.warn(`[Security Event] ${event}`, details);
  } else {
    console.log(`[Security Event] ${event}`, details);
  }
}
