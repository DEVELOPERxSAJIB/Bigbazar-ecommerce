const User = require("../modals/User");
const { errorResponse, successResponse } = require("./responseController");
const findWithId = require("../services/findWithId");
const { cloudDeleteAvatar } = require("../utils/cloudinary");

//@Admin Routes
/**
 * @DESC Get all users
 * @ROUTE /api/v1/auth/admin/get-all-users
 * @method GET
 * @access private
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return errorResponse(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Fetched all users successfully",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get single user by admin
 * @ROUTE api/v1/user//admin/get-single-user/:id
 * @method GET
 * @access private
 */
const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const options = { password: 0 };

    const user = await findWithId(User, id, options);

    successResponse(res, {
      statusCode: 200,
      message: `All details about ${user.name}`,
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC update role by admin
 * @ROUTE /api/v1/user/admin/update-user-role/:id
 * @method PUT
 * @access private
 */
const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        role,
      },
      {
        new: true,
      }
    );

    successResponse(res, {
      statusCode: 200,
      message: "User was updated successfully",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @Desc Delete user by Admin
 * @ROUTE /api/v1/auth/admin/remove-user-by-admin/:id
 * @method GET
 * @access private
 */
const deleteUserbyAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await findWithId(User, id);

    // remove user images from cloudnary
    const public_id = user.avatar.public_id;
    if (public_id) {
      await cloudDeleteAvatar(public_id);
    }

    // remove user from database
    const deletedUser = await User.findByIdAndDelete({
      _id: id,
      role: "admin",
    });

    successResponse(res, {
      statusCode: 200,
      message: "User was deleted successfully",
      payload: {
        user: deletedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUserbyAdmin,
};
