import bcrypt from 'bcryptjs';
import validator from 'validator';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
import { clearAuthCookie, setAuthCookie, signToken } from '../utils/jwt.js';
import { securityConfig } from '../config/security/index.js';
import { clearLoginFailures, isLoginBlocked, registerLoginFailure } from '../middleware/rateLimiter.js';
import { clearCsrfCookie, issueCsrfToken } from '../middleware/security/csrf.js';

const sanitizeEmail = (value) =>
  validator.normalizeEmail(String(value || '').trim()) ||
  String(value || '').trim().toLowerCase();

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  title: user.title,
  avatarUrl: user.avatarUrl,
  githubUrl: user.githubUrl,
  leetcodeUrl: user.leetcodeUrl,
  codeforcesUrl: user.codeforcesUrl
});

export const login = asyncHandler(async (request, response) => {
  const email = sanitizeEmail(request.body.email);
  const password = String(request.body.password || '');

  if (isLoginBlocked(request, email)) {
    throw new HttpError(429, 'Too many failed login attempts. Try again later.');
  }

  const user = await User.findOne({ email });

  if (!user) {
    registerLoginFailure(request, email);
    throw new HttpError(401, 'Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    registerLoginFailure(request, email);
    throw new HttpError(401, 'Invalid credentials');
  }

  clearLoginFailures(request, email);

  const token = signToken({
    id: user._id.toString(),
    role: user.role,
    email: user.email,
    name: user.name,
  });

  setAuthCookie(response, token);

  response.json({
    user: safeUser(user),
    csrfToken: issueCsrfToken(response),
  });
});

export const getCsrfToken = asyncHandler(async (request, response) => {
  response.json({ csrfToken: issueCsrfToken(response) });
});

export const logout = asyncHandler(async (_request, response) => {
  clearAuthCookie(response);
  clearCsrfCookie(response);

  response.json({ message: 'Logged out securely' });
});

export const getProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id).lean();

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  response.json(safeUser(user));
});

export const refreshProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user.id).lean();

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  response.json({ user: safeUser(user) });
});
