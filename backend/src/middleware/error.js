import { HttpError } from '../utils/httpError.js';

export const notFoundHandler = (_request, _response, next) => {
  next(new HttpError(404, 'Route not found'));
};

export const errorHandler = (error, _request, response, _next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  response.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  });
};
