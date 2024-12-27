require("dotenv").config();
const { successResponse } = require("./responseController");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * @DESC Process the payment
 * @ROUTE api/v1/payment/process-payment
 * @method POST
 * @access Private
 */
const processPaymentRequest = async (req, res, next) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",

      metadata: { integration_check: "accept_a_payment" },
    });

    successResponse(res, {
      statusCode: 200,
      payload: {
        client_secret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Send Stripe kecret key to client
 * @ROUTE api/v1/payment/send-stripe-api-key
 * @method GET
 * @access Private
 */
const sendApiKeyOfStripe = async (req, res, next) => {
  try {
    successResponse(res, {
      statusCode: 200,
      payload: {
        secretKey: process.env.STRIPE_SECRET_KEY,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  processPaymentRequest,
  sendApiKeyOfStripe,
};
