import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import "./config/loadEnv.js";
import { notFoundHandler, errorHandler } from "./middleware/error.js";
import { rateLimiter } from "./middleware/rateLimiter.js";
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

const defaultClientOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://virabhadra-portfolio-frontend.vercel.app",
];

const allowedOrigins = (process.env.CLIENT_URL || defaultClientOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    return callback(null, true);
  }

  return callback(new Error("Not allowed by CORS"));
};

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(rateLimiter);

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

app.get("/sitemap.xml", async (_request, response) => {
  const items = ["", "blog", "admin", "contact"];
  const clientUrl = allowedOrigins[0] || "http://localhost:5173";
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
  const clientUrl = allowedOrigins[0] || "http://localhost:5173";
  response
    .type("text/plain")
    .send(`User-agent: *\nAllow: /\nSitemap: ${clientUrl}/sitemap.xml`);
});

app.use(notFoundHandler);
app.use(errorHandler);
