const { body } = require("express-validator");

const createProductValidation = [
  // Name validation
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product name must be between 3 and 100 characters"),

  // Brand validation
  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required"),

  // Category validation
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  // Seller validation
  body("seller")
    .trim()
    .notEmpty()
    .withMessage("Seller information is required"),

  // Price validation
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  // Description validation
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10})
    .withMessage("Description must be at least 10 characters"),

  // Stock validation
  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
];

// Module export
module.exports = {
  createProductValidation,
};
