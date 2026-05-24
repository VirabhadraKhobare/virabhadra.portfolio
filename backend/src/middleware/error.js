import { HttpError } from '../utils/httpError.js';
import { logSecurityEvent } from '../monitoring/securityLogger.js';

export const notFoundHandler = (_request, _response, next) => {
  next(new HttpError(404, 'Route not found'));
};

export const errorHandler = (error, request, response, _next) => {
  const statusCode = error.statusCode || error.status || 500;

  if (error.code === 'EBADCSRFTOKEN') {
    void logSecurityEvent('csrf_rejected', {
      ip: request.ip,
      path: request.originalUrl,
      method: request.method,
    });

    return response.status(403).json({
      message: 'Invalid security token',
    });
  }

  if (statusCode >= 500) {
    void logSecurityEvent('server_error', {
      ip: request.ip,
      path: request.originalUrl,
      method: request.method,
      message: error.message,
    });
  }

  const message =
    statusCode >= 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : error.message || 'Something went wrong';

  response.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};
