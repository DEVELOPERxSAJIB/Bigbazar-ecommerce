const { body } = require("express-validator");

// registration validations
const userRegistrationValidations = [
  body("name" || "email" || "password" || "gender")
    .notEmpty()
    .withMessage("All feilds are required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("name should contain at least 3 to maximum 32 character"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4, max: 32 })
    .withMessage("password should contain at least 4 to maximum 32 character"),
];

// login validations
const userLoginValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter your email address")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password").trim().notEmpty().withMessage("Please enter your password"),
];

// forgot password
const forgotPasswordValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Please enter your email address")
    .isEmail()
    .withMessage("Invalid email address"),
];

// reset password
const resetPasswordValidations = [
  body("token")
    .trim()
    .notEmpty()
    .withMessage("Unable to find your reset password token"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please enter your password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Enter confirmation password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
];

// module exports
module.exports = {
  userRegistrationValidations,
  userLoginValidations,
  forgotPasswordValidations,
  resetPasswordValidations,
};
