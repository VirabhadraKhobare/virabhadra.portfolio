import { body } from "express-validator";
import { HttpError } from "../utils/httpError.js";
import { Message } from "../models/Message.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/email.js";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildEmailHtml = (message) => {
  const name = escapeHtml(message.name);
  const email = escapeHtml(message.email);
  const subject = escapeHtml(message.subject);
  const body = escapeHtml(message.message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin: 0 0 16px; font-size: 20px;">New portfolio message</h2>
      <p style="margin: 0 0 12px;"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p style="margin: 0 0 12px;"><strong>Subject:</strong> ${subject}</p>
      <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 12px; background: #f9fafb; white-space: normal;">
        ${body}
      </div>
    </div>
  `;
};

export const contactValidators = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("subject")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Subject is required"),
  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message should be at least 10 characters"),
];

export const createMessage = asyncHandler(async (request, response) => {
  const payload = {
    name: request.body.name.trim(),
    email: request.body.email.trim().toLowerCase(),
    subject: request.body.subject.trim(),
    message: request.body.message.trim(),
    source: request.body.source?.trim() || "website",
  };

  const message = await Message.create(payload);

  try {
    await sendMail({
      to: process.env.ADMIN_EMAIL || "admin@virbhadraportfolio.com",
      replyTo: message.email,
      subject: `Portfolio message: ${message.subject}`,
      text: `${message.name} <${message.email}>\n\n${message.message}`,
      html: buildEmailHtml(message),
    });

    await Message.findByIdAndUpdate(message._id, {
      emailStatus: "sent",
      emailSentAt: new Date(),
      emailError: null,
    });
  } catch (error) {
    await Message.findByIdAndUpdate(message._id, {
      emailStatus: "failed",
      emailError: error.message,
    });
  }

  response.status(201).json({
    message: "Thanks for reaching out. Your message was saved securely.",
    delivery: "stored",
  });
});

export const listMessages = asyncHandler(async (_request, response) => {
  const messages = await Message.find().sort("-createdAt").lean();
  response.json(messages);
});

export const markMessageRead = asyncHandler(async (request, response) => {
  const message = await Message.findByIdAndUpdate(
    request.params.id,
    { isRead: true },
    { new: true },
  );
  if (!message) {
    throw new HttpError(404, "Message not found");
  }

  response.json(message);
});
