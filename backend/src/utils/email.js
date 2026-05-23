import nodemailer from "nodemailer";
import "../config/loadEnv.js";

const smtpHost = process.env.SMTP_HOST || "";
const smtpPort = Number(process.env.SMTP_PORT) || 587;
const smtpUser = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const smtpFrom = process.env.SMTP_FROM || "noreply@virabhadraportfolio.com";

const hasSmtp = smtpHost && smtpUser && smtpPass;

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

export const sendMail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    console.log("SMTP not configured. Email payload:", { to, subject, text });
    return { skipped: true };
  }

  return transporter.sendMail({
    from: smtpFrom,
    to,
    subject,
    html,
    text,
  });
};
