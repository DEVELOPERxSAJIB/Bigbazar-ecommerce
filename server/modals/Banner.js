const mongoose = require("mongoose");

// Brand Schema
const bannerSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model("Banner", bannerSchema);