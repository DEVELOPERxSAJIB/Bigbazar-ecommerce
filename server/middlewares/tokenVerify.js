const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../modals/User");

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw createError(401, "Login in first to access this recourse");
    }

    const decode = JWT.verify(accessToken, process.env.JWT_ACCESS_KEY);

    if (!decode) {
      throw createError(400, "Invalid access token")
    }

    req.user = await User.findById(decode.user).select("-password");
    next();

  } catch (error) {
    next(error);
  }
};

module.exports = { isAuthenticatedUser };
