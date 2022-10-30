import rateLimit from 'express-rate-limit';

/**
 * Requests limiter.
 * Used in login related route.
 */
export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50, // limit each IP to 30 requests per windowMs
});

/**
 * Requests limiter.
 * Used in extra route.
 */
export const extraLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 800, // limit each IP to 800 requests per windowMs
});

/**
 * Requests limiter.
 * Used in initial-setup route.
 */
export const initialSetupLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 1, // limit each IP to 1 requests per windowMs
});
