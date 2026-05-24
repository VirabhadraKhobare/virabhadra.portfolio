import rateLimit from 'express-rate-limit';
import { securityConfig } from '../config/security/index.js';
import { logSecurityEvent } from '../monitoring/securityLogger.js';

const failedLoginAttempts = new Map();

const getLoginKey = (request, email = '') =>
  `${request.ip}:${String(email).trim().toLowerCase()}`;

const getAttemptRecord = (request, email = '') => {
  const key = getLoginKey(request, email);
  const record = failedLoginAttempts.get(key);

  if (!record) {
    return { key, record: null };
  }

  if (record.lockUntil && record.lockUntil < Date.now()) {
    failedLoginAttempts.delete(key);
    return { key, record: null };
  }

  return { key, record };
};

const buildRateLimitHandler = (eventName) => async (request, response, _next, options) => {
  await logSecurityEvent(eventName, {
    ip: request.ip,
    path: request.originalUrl,
    method: request.method,
  });

  response.status(options.statusCode).json({
    message:
      typeof options.message === 'string'
        ? options.message
        : options.message?.message || 'Too many requests',
  });
};

export const registerLoginFailure = (request, email = '') => {
  const { key, record } = getAttemptRecord(request, email);
  const attempts = (record?.attempts || 0) + 1;
  const lockUntil =
    attempts >= securityConfig.loginLockoutThreshold
      ? Date.now() + securityConfig.loginLockoutWindowMs
      : null;

  failedLoginAttempts.set(key, {
    attempts,
    lockUntil,
    lastFailureAt: Date.now(),
  });

  return { attempts, lockUntil };
};

export const clearLoginFailures = (request, email = '') => {
  failedLoginAttempts.delete(getLoginKey(request, email));
};

export const isLoginBlocked = (request, email = '') => {
  const { record } = getAttemptRecord(request, email);

  if (!record) {
    return false;
  }

  return Boolean(record.lockUntil && record.lockUntil > Date.now());
};

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  handler: buildRateLimitHandler('api_rate_limited'),
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: buildRateLimitHandler('auth_rate_limited'),
});

export const contactLimiter = rateLimit({
  windowMs: securityConfig.contactRateLimitWindowMs,
  limit: securityConfig.contactRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  handler: buildRateLimitHandler('contact_rate_limited'),
});
