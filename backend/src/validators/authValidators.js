import { body } from "express-validator";

export const loginValidators = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail(),
  body("password")
    .isString()
    .isLength({ min: 8, max: 128 })
    .withMessage("Password required"),
];