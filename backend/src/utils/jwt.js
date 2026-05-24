import jwt from "jsonwebtoken";
import "../config/loadEnv.js";

const jwtSecret = process.env.JWT_SECRET || "change-me-in-production";
const jwtExpire = process.env.JWT_EXPIRE || process.env.JWT_EXPIRES_IN || "7d";

export const signToken = (payload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });

export const verifyToken = (token) => jwt.verify(token, jwtSecret);
