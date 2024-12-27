const Product = require("../modals/Product");
const { successResponse } = require("./responseController");
const createError = require("http-errors");
const {
  cloudProductImagesUpload,
  cloudProductImagesDelete,
} = require("../utils/cloudinary");

/**
 * @DESC Get all products by admin
 * @ROUTE api/v1/product/admin/get-all-products
 * @method GET
 * @access private
 */
const getAllProductsByAdmin = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("brand");

    if (!products) {
      throw createError(404, "Can't get all products", 404);
    }

    successResponse(res, {
      statusCode: 200,
      payload: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get all products
 * @ROUTE api/v1/product
 * @method GET
 * @access public
 */
const getAllProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 8;
    const orderby = req.query.orderby || "default";

    const skip = (page - 1) * pageSize;

    // Extract additional filter parameters from the request query
    const filters = {};
    if (req.query.keyword) {
      filters.name = { $regex: new RegExp(req.query.keyword, "i") };
    }

    if (req.query.category && req.query.category !== "All") {
      filters.category = req.query.category;
    }
    if (req.query.brand) {
      let brandArray;
      if (Array.isArray(req.query.brand)) {
        brandArray = req.query.brand;
      } else {
        brandArray = req.query.brand.split(",");
      }
      filters.brand = { $in: brandArray };
    }
    
    // Add price range filter
    if (req.query.price) {
      const priceRange = req.query.price.split("-");
      filters.price = {
        $gte: priceRange[0],
        $lte: priceRange[1] <= 0 ? Infinity : priceRange[1],
      };
    } 

    // Add ratins filter
    if (req.query.ratings) {
      const ratings = req.query.ratings.split("-");
      filters.ratings = { $gte: Number(ratings[0]), $lte: Number(ratings[1]) };
    }

    // Add sorting based on orderby parameter
    const sortQuery = {};

    switch (orderby.toString()) {
      case "date":
        sortQuery.createdAt = -1; // sort by latest
        break;

      case "price-low":
        sortQuery.price = 1;
        break;

      case "price-high":
        sortQuery.price = -1;
        break;

      default:
        sortQuery.createdAt = -1;
        break;
    }

    // Fetch products with pagination and filters
    const products = await Product.find(filters)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize);
    const allProducts = await Product.find();

    // console.log(products);

    if (!products || products.length === 0) {
      throw createError(404, "No products found");
    }

    successResponse(res, {
      statusCode: 200,
      payload: {
        totalPage: page,
        productCount: allProducts.length,
        resPerPage: pageSize,
        products,
        pageInfo: {
          page,
          pageSize,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC get single product
 * @ROUTE api/v1/products/:id
 * @method GET
 * @access procted
 */
const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category")
      .populate("brand")
      .populate("user");

    if (!product) {
      throw createError(404, "Product not found");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Single product found",
      payload: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC create new product
 * @ROUTE api/v1/product/create-product
 * @method POST
 * @access proteted
 */
const createProduct = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name, price, description, seller, stock, category, brand } =
      req.body;

    if (req.files.length < 1) {
      throw createError(400, "Provide product photo to create");
    }

    // upload product photos
    let uploadedPhotos = null;
    if (req.files) {
      try {
        uploadedPhotos = await cloudProductImagesUpload(req);
      } catch (error) {
        throw createError(400, error.message);
      }
    }

    // separate data from uploaded photos
    let productPhoto = [];

    uploadedPhotos.forEach((file) => {
      productPhoto.push({
        public_id: file.public_id,
        url: file.secure_url,
      });
    });

    const data = {
      name,
      price,
      description,
      stock,
      seller,
      category,
      brand,
      user: id,
      images: productPhoto,
    };

    const product = await Product.create(data);

    successResponse(res, {
      statusCode: 200,
      message: "Product created successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC update product
 * @ROUTE api/v1/products/admin/:id
 * @method PUT
 * @access procted
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, seller, stock, category, brand } =
      req.body;

    let product = await Product.findById(id);
    if (!product) {
      throw createError(404, "Product not found");
    }

    // update product photo
    let productImages = product.images;

    if (req.files && req.files.length > 0) {
      // delete previous images
      let publicIds = [];
      productImages.map((image) => {
        publicIds.push(image.public_id);
      });
      await cloudProductImagesDelete(publicIds);

      // update product with new images
      productImages = await cloudProductImagesUpload(req);
    }

    // Seperate data from product Images
    let newProductImg = [];
    productImages.forEach((image) => {
      newProductImg.push({
        public_id: image.public_id,
        url: image.url,
      });
    });

    // update product data
    const data = {
      name,
      price,
      description,
      stock,
      seller,
      brand,
      category,
      images: req.files ? newProductImg : product.images,
    };
    const updatedproduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Product was updated",
      payload: {
        product: updatedproduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC delete product
 * @ROUTE /api/v1/products/admin/:id
 * @method delete
 * @access protected
 */
const deleteProduct = async (req, res, next) => {
  try {
    // find product
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw createError(404, "Product not found with this id");
    }

    // delete product photos
    let public_id = [];
    product.images.forEach((item) => {
      public_id.push(item.public_id);
    });
    await cloudProductImagesDelete(public_id);

    // delete product data
    await Product.deleteOne({ _id: product._id });

    successResponse(res, {
      statusCode: 200,
      message: "Product successfully deleted",
      payload: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Review a product
 * @ROUTE api/v1/products/review-product
 * @Method PUT
 * @access private
 */
const reviewProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    if (!rating) {
      throw createError(400, "Please provide a rating then submit");
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
    };

    const product = await Product.findById(id);

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    // make avarage rating of the product
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    product.save({ validateBeforeSave: false });

    successResponse(res, {
      statusCode: 200,
      message: "Review posted successfully",
      payload: {
        review: product.reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get product reviews
 * @ROUTE find-reviews-of-product?id=id
 * @method PUT
 * @access protected
 */
const getProductReviews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id.toString());

    successResponse(res, {
      statusCode: 200,
      message: "Fetched product reviews",
      payload: {
        reviews: product.reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC delete product review
 * @ROUTE api/v1/products/delete-product-review?productId
 * @method delete
 * @access protected
 */
const deleteProductReview = async (req, res, next) => {
  try {
    const { productId, reviewId } = req.body;

    const product = await Product.findById(productId);

    if (product || product.reviews.length > 0) {
      throw createError(404, "Review not found");
    }

    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId.toString()
    );

    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length;

    const numOfReviews = reviews.length;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    successResponse(res, {
      statusCode: 200,
      message: "Review deleted successfully",
      payload: {
        reviews: updatedProduct.reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getAllProductsByAdmin,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  reviewProduct,
  getProductReviews,
  deleteProductReview,
};
