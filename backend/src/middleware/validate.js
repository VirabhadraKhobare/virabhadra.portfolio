import { validationResult } from 'express-validator';
import { HttpError } from '../utils/httpError.js';

export const validateRequest = (request, _response, next) => {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return next(new HttpError(400, result.array()[0].msg));
  }

  next();
};
