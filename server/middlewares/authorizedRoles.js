const createHttpError = require("http-errors");

const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }

    throw createHttpError(
      400`Role : ${req.user.role}, is not allowed to access this recourses`
    );
  };
};

module.exports = { authorizedRoles };
