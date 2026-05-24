import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import xssClean from "xss-clean";
import crypto from "node:crypto";
import "./config/loadEnv.js";
import { allowedOrigins, corsOptions, securityConfig } from "./config/security/index.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
import { csrfProtection } from "./middleware/security/csrf.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import achievementsRoutes from "./routes/achievementsRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";

export const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use((request, response, next) => {
  request.requestId = crypto.randomUUID();
  response.setHeader("X-Request-Id", request.requestId);
  next();
});

app.use(cors(corsOptions));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(compression());
app.use(cookieParser(process.env.COOKIE_SECRET || undefined));
app.use(express.json({ limit: securityConfig.requestBodyLimit }));
app.use(express.urlencoded({ extended: false, limit: securityConfig.requestBodyLimit, parameterLimit: 20 }));
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

morgan.token("id", (request) => request.requestId || "-");
app.use(
  morgan(
    process.env.NODE_ENV === "production"
      ? ":remote-addr :method :url :status :res[content-length] - :response-time ms req=:id"
      : "dev",
  ),
);

app.use(rateLimiter);
app.use(csrfProtection);

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/contact", contactRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/achievements", achievementsRoutes);

app.get("/sitemap.xml", async (_request, response) => {
  const items = ["", "blog", "admin", "contact"];
  const clientUrl =
    allowedOrigins[0] || "https://virabhadra-portfolio-frontend.vercel.app";
  const urls = items
    .map(
      (item) =>
        `<url><loc>${clientUrl}/${item}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    )
    .join("");
  response
    .type("application/xml")
    .send(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    );
});

app.get("/robots.txt", (_request, response) => {
  const clientUrl =
    allowedOrigins[0] || "https://virabhadra-portfolio-frontend.vercel.app";
  response
    .type("text/plain")
    .send(`User-agent: *\nAllow: /\nSitemap: ${clientUrl}/sitemap.xml`);
});

app.use(notFoundHandler);
app.use(errorHandler);
