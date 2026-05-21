import { body } from 'express-validator';
import { Message } from '../models/Message.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendMail } from '../utils/email.js';

export const contactValidators = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().isLength({ min: 3 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message should be at least 10 characters')
];

export const createMessage = asyncHandler(async (request, response) => {
  const message = await Message.create(request.body);

  await sendMail({
    to: process.env.ADMIN_EMAIL || 'admin@virabhadraportfolio.com',
    subject: `Portfolio message: ${message.subject}`,
    text: `${message.name} <${message.email}>\n\n${message.message}`,
    html: `<p><strong>${message.name}</strong> &lt;${message.email}&gt;</p><p>${message.message}</p>`
  });

  response.status(201).json({ message: 'Thanks for reaching out. Message saved successfully.' });
});

export const listMessages = asyncHandler(async (_request, response) => {
  const messages = await Message.find().sort('-createdAt').lean();
  response.json(messages);
});

export const markMessageRead = asyncHandler(async (request, response) => {
  const message = await Message.findByIdAndUpdate(request.params.id, { isRead: true }, { new: true });
  response.json(message);
});
