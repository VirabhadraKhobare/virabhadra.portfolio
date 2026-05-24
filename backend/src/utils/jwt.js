import jwt from "jsonwebtoken";
import "../config/loadEnv.js";
import { authCookieOptions, securityConfig } from "../config/security/index.js";

if (!securityConfig.jwtSecret) {
  throw new Error("JWT_SECRET is required for authentication.");
}

const jwtSecret = securityConfig.jwtSecret;
const jwtExpire = securityConfig.jwtExpire;

export const signToken = (payload) =>
  jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpire,
    audience: "virbhadra-portfolio",
    issuer: "virbhadra-portfolio-api",
  });

export const verifyToken = (token) =>
  jwt.verify(token, jwtSecret, {
    audience: "virbhadra-portfolio",
    issuer: "virbhadra-portfolio-api",
  });

export const setAuthCookie = (response, token) => {
  response.cookie(securityConfig.authCookieName, token, {
    ...authCookieOptions,
    maxAge: authCookieOptions.maxAge,
  });
};

export const clearAuthCookie = (response) => {
  response.clearCookie(securityConfig.authCookieName, {
    ...authCookieOptions,
    maxAge: undefined,
  });
};
