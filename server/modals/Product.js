const mongoose = require("mongoose");

const productShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
      trim: true,
      maxLength: [100, "product name can't exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "please enter product price"],
      maxLength: [5, "product amount can't exceed 5 characters"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Category",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "Brand",
    },
    seller: {
      type: String,
      required: [true, "please enter product seller"],
    },
    stock: {
      type: Number,
      required: [true, "please enter product stock"],
      maxLength: [5, "product stock can't exceed 5 characters"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productShcema);
