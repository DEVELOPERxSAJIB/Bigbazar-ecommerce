const createHttpError = require("http-errors");
const Brand = require("../modals/Brand");
const { successResponse, errorResponse } = require("./responseController");
const { singleImageUpload, singleImageDelete } = require("../utils/cloudinary");
const Category = require("../modals/Category");

/**
 * @DESC get all category
 * @ROUTE api/v1/category/
 * @Method GET
 * @access protected
 */
const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.find();

    if (category?.length > 0) {
      createHttpError(400, "No Category found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Category fetched successfully",
      payload: { category },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC create category
 * @ROUTE api/v1/category/
 * @Method POST
 * @access protected
 */
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // check if category exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      throw createHttpError(400, "This category already exists");
    }

    // Validate inputs
    if (!name || !req.file) {
      throw createHttpError(400, "Name and Image must be provided");
    }

    // Upload image if provided
    let image = null;
    if (req.file) {
      image = await singleImageUpload(req.file);
    }

    // Create brand
    const category = await Category.create({
      name: name.trim(),
      photo: {
        public_id: image?.public_id,
        url: image?.url,
      },
    });

    // Success response
    successResponse(res, {
      statusCode: 201,
      message: "Category created successfully",
      payload: {
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC delete category
 * @ROUTE api/v1/category/:id
 * @Method DELETE
 * @access protected
 */

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      throw createHttpError(404, "Category with this id not found");
    }

    // delete image if exists
    if (existingCategory?.photo?.public_id) {
      await singleImageDelete(existingCategory?.photo?.public_id);
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Category deleted successfully",
      payload: {
        category : deletedCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC edit category
 * @ROUTE api/v1/category/:id
 * @Method PUT
 * @access protected
 */

const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // existing brand check
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      throw createHttpError(404, "Category not found");
    }

    // upload image
    let image = null;
    if (req.file) {
      const public_id = existingCategory?.photo?.public_id;
      if (public_id) {
        await singleImageDelete(public_id);
      }
      image = await singleImageUpload(req.file);
    }

    const data = {
      name,
      photo: {
        public_id: image?.public_id
          ? image?.public_id
          : existingCategory?.photo?.public_id,
        url: image?.url ? image?.url : existingCategory.photo?.url,
      },
    };

    // Updated brand
    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });

    successResponse(res, {
      statusCode: 201,
      message: "Brand updated successfully",
      payload: {
        category: updatedCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  deleteCategory,
  editCategory,
};
