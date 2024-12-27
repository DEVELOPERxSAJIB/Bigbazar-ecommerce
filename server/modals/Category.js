const mongoose = require("mongoose");

// Brand Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    photo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
