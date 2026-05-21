import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const hasSmtp = env.smtpHost && env.smtpUser && env.smtpPass;

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpPort === 465,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass
      }
    })
  : null;

export const sendMail = async ({ to, subject, html, text }) => {
  if (!transporter) {
    console.log('SMTP not configured. Email payload:', { to, subject, text });
    return { skipped: true };
  }

  return transporter.sendMail({
    from: env.smtpFrom,
    to,
    subject,
    html,
    text
  });
};
