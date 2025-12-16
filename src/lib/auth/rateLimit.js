/**
 * Rate limiting utility for protecting auth endpoints
 * In production, use Redis for distributed rate limiting
 */

const rateLimitStore = new Map()

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
}

/**
 * Check if request should be rate limited
 * @param key - Unique identifier (IP, email, etc.)
 * @param config - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || now > record.resetTime) {
    // New window
    const newRecord = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    rateLimitStore.set(key, newRecord)
    return {
      allowed: true,
      remaining: config.maxAttempts - 1,
      resetTime: newRecord.resetTime,
    }
  }

  record.count++

  return {
    allowed: record.count <= config.maxAttempts,
    remaining: Math.max(0, config.maxAttempts - record.count),
    resetTime: record.resetTime,
  }
}

/**
 * Reset rate limit for a key
 * @param key - Unique identifier
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key)
}

/**
 * Clean up expired rate limits (call periodically)
 */
export function cleanupExpiredRateLimits(): void {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Clean up every 5 minutes
setInterval(cleanupExpiredRateLimits, 5 * 60 * 1000)
