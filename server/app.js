require("colors");
const express = require("express");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const orderRoute = require("./routes/orderRoute");
const cors = require("cors");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const { errorResponse } = require("./controllers/responseController");
const paymentRoute = require("./routes/paymentRoute");
const brandRoute = require("./routes/brandRoute");
const bannerRoute = require("./routes/bannerRouter");
const categoryRoute = require("./routes/categoryRouter");

const app = express();

// init JSON middleware for express
app.use(
  cors({
    origin: [process.env.DOMAIN.split(',')],
    credentials: true,
  })
);
// const rateLimiter = rateLimit({
//   windowMS: 1 * 60 * 1000,
//   max: 50,
//   message: "Too many request from this IP",
// });
// app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static folder
app.use('/public', express.static('public'));

// app routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/banner", bannerRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/payment", paymentRoute);

// Client error handling
app.use((req, res, next) => {
  next(createError(404, "Router Not Found"));
});

// // server error handling
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

// module exports
module.exports = app;
