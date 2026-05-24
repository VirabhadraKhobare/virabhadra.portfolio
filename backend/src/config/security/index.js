const splitOrigins = (value) =>
  String(value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const normalizeOrigin = (origin) => {
  if (!origin) {
    return "";
  }

  try {
    return new URL(origin).origin;
  } catch (_error) {
    return origin.trim();
  }
};

const isProduction = process.env.NODE_ENV === "production";
const cookieSecure =
  process.env.COOKIE_SECURE === "true" ? true : isProduction;

const defaultClientOrigins = [
  "http://localhost:5173",
  "https://virabhadra-portfolio-frontend.vercel.app",
];

const configuredOrigins = splitOrigins(process.env.CLIENT_URL).map(
  normalizeOrigin,
);

export const allowedOrigins = [
  ...new Set([...defaultClientOrigins, ...configuredOrigins].filter(Boolean)),
);

export const securityConfig = {
  isProduction,
  cookieSecure,
  sameSite: cookieSecure ? "none" : "lax",
  authCookieName: process.env.AUTH_COOKIE_NAME || "portfolio.auth",
  csrfCookieName: process.env.CSRF_COOKIE_NAME || "portfolio.csrf",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpire:
    process.env.JWT_EXPIRE || process.env.JWT_EXPIRES_IN || "7d",
  requestBodyLimit: process.env.REQUEST_BODY_LIMIT || "100kb",
  loginLockoutWindowMs:
    Number(process.env.LOGIN_LOCKOUT_WINDOW_MS) || 15 * 60 * 1000,
  loginLockoutThreshold:
    Number(process.env.LOGIN_LOCKOUT_THRESHOLD) || 5,
  contactRateLimitWindowMs:
    Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000,
  contactRateLimitMax: Number(process.env.CONTACT_RATE_LIMIT_MAX) || 5,
  authCookieMaxAge: 7 * 24 * 60 * 60 * 1000,
};

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-CSRF-Token",
    "X-Requested-With",
  ],
  exposedHeaders: ["X-Request-Id"],
  optionsSuccessStatus: 204,
};

export const authCookieOptions = {
  httpOnly: true,
  secure: cookieSecure,
  sameSite: securityConfig.sameSite,
  path: "/",
  maxAge: securityConfig.authCookieMaxAge,
};

export const csrfCookieOptions = {
  httpOnly: true,
  secure: cookieSecure,
  sameSite: securityConfig.sameSite,
  path: "/",
};