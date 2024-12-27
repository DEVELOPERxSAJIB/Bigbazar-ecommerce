const express = require("express");
const {
  processRegistration,
  userAccountActivation,
  userLogin,
  userLogout,
  resetPassword,
  loggedInUser,
  forgotPassword,
  updatePassword,
  updateUserProfile,
} = require("../controllers/authController");
const { isAuthenticatedUser } = require("../middlewares/tokenVerify");
const {
  userRegistrationValidations,
  userLoginValidations,
  forgotPasswordValidations,
  resetPasswordValidations,
} = require("../validators/auth");
const runValidation = require("../validators");
const { userAvatar } = require("../utils/multer");

const authRoute = express.Router();

// init routes

authRoute
  .route("/process-register")
  .post(userAvatar, userRegistrationValidations, runValidation, processRegistration);
authRoute.route("/verify-register").post(userAccountActivation);
authRoute.route("/login").post(userLoginValidations, runValidation, userLogin);
authRoute.route("/logout").post(isAuthenticatedUser, userLogout);
authRoute
  .route("/forgot-password")
  .post(forgotPasswordValidations, runValidation, forgotPassword);
authRoute
  .route("/reset-password")
  .put(resetPasswordValidations, runValidation, resetPassword);
authRoute.route("/me").get(isAuthenticatedUser, loggedInUser);
authRoute.route("/update-password").put(isAuthenticatedUser, updatePassword);
authRoute.route("/update-profile/:id").put(userAvatar, updateUserProfile);

module.exports = authRoute;
