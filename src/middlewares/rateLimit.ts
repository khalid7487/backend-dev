import rateLimit from 'express-rate-limit'

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: 'You have exceeded the 100 requests in 1 min limit!',
  standardHeaders: true,
  legacyHeaders: false,
})
