import { HttpError } from '../utils/httpError.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = (request, _response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new HttpError(401, 'Not authenticated'));
  }

  try {
    request.user = verifyToken(authHeader.slice(7));
    next();
  } catch (_error) {
    next(new HttpError(401, 'Invalid or expired token'));
  }
};

export const requireRole = (...roles) => (request, _response, next) => {
  if (!request.user || !roles.includes(request.user.role)) {
    return next(new HttpError(403, 'Forbidden'));
  }

  next();
};
