import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { HttpError } from '../utils/httpError.js';
import { signToken } from '../utils/jwt.js';

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
  const { email, password } = request.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const token = signToken({ id: user._id.toString(), role: user.role, email: user.email, name: user.name });

  response.json({
    token,
    user: safeUser(user)
  });
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
