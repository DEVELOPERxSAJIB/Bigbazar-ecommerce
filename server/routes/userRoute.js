const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUserbyAdmin,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/tokenVerify");
const { authorizedRoles } = require("../middlewares/authorizedRoles");

// init routes
const userRoute = express.Router();

// all routes
userRoute
  .route("/admin/get-single-user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser);
userRoute
  .route("/admin/get-all-users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
userRoute
  .route("/admin/update-user-role/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole);
userRoute
  .route("/admin/remove-user-by-admin/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUserbyAdmin);

module.exports = userRoute;
