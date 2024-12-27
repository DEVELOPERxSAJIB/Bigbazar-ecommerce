const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/tokenVerify");
const { processPaymentRequest, sendApiKeyOfStripe } = require("../controllers/paymentController");

const paymentRoute = express.Router();

// init routes
paymentRoute
  .route("/process-payment")
  .post(isAuthenticatedUser, processPaymentRequest);
paymentRoute
  .route("/send-stripe-api-key")
  .get(isAuthenticatedUser, sendApiKeyOfStripe);

module.exports = paymentRoute;
