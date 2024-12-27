const express = require("express");
const { isAuthenticatedUser } = require("../middlewares/tokenVerify");
const { authorizedRoles } = require("../middlewares/authorizedRoles");
const {
  createOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const orderRoute = express.Router();

// init routes
orderRoute.route("/create-order").post(isAuthenticatedUser, createOrder);
orderRoute
  .route("/get-single-order/:id")
  .get(isAuthenticatedUser, getSingleOrder);
orderRoute.route("/my-orders").get(isAuthenticatedUser, myOrders);
orderRoute
  .route("/all-orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
orderRoute
  .route("/update-order/:id")
  .post(isAuthenticatedUser, authorizedRoles("admin"), updateOrder);
orderRoute
  .route("/delete-order/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = orderRoute;
