import { body } from "express-validator";

export const contactValidators = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name is required"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("subject")
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage("Subject is required"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage("Message should be at least 10 characters"),
  body("source").optional().trim().isLength({ max: 50 }),
];