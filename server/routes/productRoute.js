const express = require("express");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  getProductReviews,
  deleteProductReview,
  getAllProductsByAdmin,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/tokenVerify");
const { authorizedRoles } = require("../middlewares/authorizedRoles");
const { productsPhotoUpload } = require("../utils/multer");
const { createProductValidation } = require("../validators/product");
const runValidation = require("../validators");

// Init Router
const productRoute = express.Router();

// init routes
productRoute.route("/").get(getAllProducts);
productRoute
  .route("/admin/get-all-products")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllProductsByAdmin);
productRoute.route("/:id").get(getSingleProduct);

productRoute.route("/create-product").post(
  productsPhotoUpload,
  createProductValidation,
  runValidation,
  isAuthenticatedUser,
  authorizedRoles("admin"),
  createProduct
);

productRoute
  .route("/review-product/:id")
  .put(isAuthenticatedUser, reviewProduct);

productRoute
  .route("/find-reviews-of-product/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getProductReviews);

productRoute
  .route("/delete-product-review")
  .delete(deleteProductReview);

productRoute
  .route("/admin/:id")
  .put(productsPhotoUpload, isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

module.exports = productRoute;
