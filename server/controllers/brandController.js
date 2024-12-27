const createHttpError = require("http-errors");
const Brand = require("../modals/Brand");
const { successResponse, errorResponse } = require("./responseController");
const { singleImageUpload, singleImageDelete } = require("../utils/cloudinary");

/**
 * @DESC get all brand
 * @ROUTE api/v1/brand/
 * @Method GET
 * @access protected
 */
const getAllBrand = async (req, res, next) => {
  try {
    const brands = await Brand.find();

    if (brands?.length > 0) {
      createHttpError(400, "No brand found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Brands fetched successfully",
      payload: {brands},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC create brand
 * @ROUTE api/v1/brand/
 * @Method POST
 * @access protected
 */
const createBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    // check if brand exists
    const brandExists = await Brand.findOne({ name });
    if (brandExists) {
      throw createHttpError(400, "This brand already exists");
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
    const brand = await Brand.create({
      name: name.trim(),
      photo: {
        public_id: image?.public_id,
        url: image?.url,
      },
    });

    // Success response
    successResponse(res, {
      statusCode: 201,
      message: "Brand created successfully",
      payload: {
        brand,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC delete brand
 * @ROUTE api/v1/brand/:id
 * @Method DELETE
 * @access protected
 */

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      throw createHttpError(404, "Brand with this id not found");
    }

    // delete image if exists
    if (existingBrand?.photo?.public_id) {
      await singleImageDelete(existingBrand?.photo?.public_id);
    }

    const deletedBrand = await Brand.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Brand deleted successfully",
      payload: {
        brand: deletedBrand,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC edit brand
 * @ROUTE api/v1/brand/:id
 * @Method PUT
 * @access protected
 */

const editBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // existing brand check
    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      throw createHttpError(404, "Brand not found");
    }

    // upload image
    let image = null;
    if (req.file) {
      const public_id = existingBrand?.photo?.public_id;
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
          : existingBrand?.photo?.public_id,
        url: image?.url ? image?.url : existingBrand.photo?.url,
      },
    };

    // Updated brand
    const updatedBrand = await Brand.findByIdAndUpdate(id, data, { new: true });

    successResponse(res, {
      statusCode: 201,
      message: "Brand updated successfully",
      payload: {
        brand: updatedBrand,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBrand,
  createBrand,
  deleteBrand,
  editBrand,
};
