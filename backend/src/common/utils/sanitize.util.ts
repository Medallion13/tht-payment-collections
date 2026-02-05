// Sanitizer (to avoid sensitive information)
const SENSITIVE_KEYS = ['token', 'password', 'secret', 'authorization', 'bearer', 'clientsecret'];

export function sanitize<T>(obj: T): T {
  if (obj === null || obj == undefined) return obj;
  if (typeof obj !== 'object') return obj;

  // Arrays
  if (Array.isArray(obj)) {
    return obj.map(sanitize) as T;
  }

  // Objects
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object') {
      sanitized[key] = sanitize(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
}
