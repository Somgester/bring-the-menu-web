/**
 * Input validation and sanitization utilities
 * Provides secure input validation and sanitization functions
 */

/**
 * Sanitize string input to prevent XSS attacks
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers
}

/**
 * Validate and sanitize email address
 */
export function validateEmail(email: string): { isValid: boolean; sanitized: string } {
  const sanitized = sanitizeString(email).toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(sanitized) && sanitized.length <= 254;

  return { isValid, sanitized };
}

/**
 * Validate password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (password.length > 128) {
    errors.push("Password must be less than 128 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate restaurant name
 */
export function validateRestaurantName(name: string): {
  isValid: boolean;
  sanitized: string;
  errors: string[];
} {
  const errors: string[] = [];
  const sanitized = sanitizeString(name);

  if (sanitized.length < 2) {
    errors.push("Restaurant name must be at least 2 characters");
  }
  if (sanitized.length > 100) {
    errors.push("Restaurant name must be less than 100 characters");
  }
  if (!/^[a-zA-Z0-9\s\-'&.,()]+$/.test(sanitized)) {
    errors.push("Restaurant name contains invalid characters");
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}

/**
 * Sanitize numeric input
 */
export function sanitizeNumber(value: string | number): number {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num) || !isFinite(num)) {
    return 0;
  }
  return num;
}

/**
 * Validate price (must be positive and reasonable)
 */
export function validatePrice(price: number): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (price < 0) {
    errors.push("Price cannot be negative");
  }
  if (price > 10000) {
    errors.push("Price seems unreasonably high");
  }
  if (price !== Math.round(price * 100) / 100) {
    errors.push("Price can only have up to 2 decimal places");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
