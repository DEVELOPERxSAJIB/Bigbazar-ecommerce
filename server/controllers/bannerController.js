const createHttpError = require("http-errors");
const Brand = require("../modals/Brand");
const { successResponse, errorResponse } = require("./responseController");
const { singleImageUpload, singleImageDelete } = require("../utils/cloudinary");
const Banner = require("../modals/Banner");

/**
 * @DESC get all Banner
 * @ROUTE api/v1/banner/
 * @Method GET
 * @access protected
 */
const getAllBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find();

    if (banner?.length > 0) {
      createHttpError(400, "No Banner found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "All banner fetched successfully",
      payload: {
        banner
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC create banner
 * @ROUTE api/v1/banner/
 * @Method POST
 * @access protected
 */
const createBanner= async (req, res, next) => {
  try {

    // Validate inputs
    if (!req.file) {
      throw createHttpError(400, "Banner image must be provided");
    }

    // Upload image if provided
    let image = null;
    if (req.file) {
      image = await singleImageUpload(req.file);
    }

    // Create brand
    const banner = await Banner.create({
      photo: {
        public_id: image?.public_id,
        url: image?.url,
      },
    });

    // Success response
    successResponse(res, {
      statusCode: 201,
      message: "Banner created successfully",
      payload: {
        banner,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC delete banner
 * @ROUTE api/v1/banner/:id
 * @Method DELETE
 * @access protected
 */
const deleteBanner= async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingBanner= await Banner.findById(id);
    if (!existingBanner) {
      throw createHttpError(404, "Banner with this id not found");
    }

    // delete image if exists
    if (existingBanner?.photo?.public_id) {
      await singleImageDelete(existingBanner?.photo?.public_id);
    }

    const deletedBanner = await Banner.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Banner deleted successfully",
      payload: {
        banner : deletedBanner,
      },
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllBanner,
  createBanner,
  deleteBanner,
};
