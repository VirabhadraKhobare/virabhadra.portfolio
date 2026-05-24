import crypto from "node:crypto";
import { HttpError } from "../../utils/httpError.js";
import { csrfCookieOptions, securityConfig } from "../../config/security/index.js";

const csrfCookieName = securityConfig.csrfCookieName;

export const issueCsrfToken = (response) => {
  const token = crypto.randomBytes(32).toString("hex");

  response.cookie(csrfCookieName, token, {
    ...csrfCookieOptions,
    maxAge: securityConfig.authCookieMaxAge,
  });

  return token;
};

export const clearCsrfCookie = (response) => {
  response.clearCookie(csrfCookieName, {
    ...csrfCookieOptions,
    maxAge: undefined,
  });
};

export const csrfProtection = (request, _response, next) => {
  const safeMethods = ["GET", "HEAD", "OPTIONS"];

  if (safeMethods.includes(request.method)) {
    return next();
  }

  const cookieToken = request.cookies?.[csrfCookieName];
  const headerToken = request.get("X-CSRF-Token") || request.get("x-csrf-token");

  if (!cookieToken || !headerToken) {
    return next(new HttpError(403, "Invalid security token"));
  }

  const cookieBuffer = Buffer.from(String(cookieToken));
  const headerBuffer = Buffer.from(String(headerToken));

  if (
    cookieBuffer.length !== headerBuffer.length ||
    !crypto.timingSafeEqual(cookieBuffer, headerBuffer)
  ) {
    return next(new HttpError(403, "Invalid security token"));
  }

  return next();
};