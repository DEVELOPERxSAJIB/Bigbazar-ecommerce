const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userShcema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxLength: [30, "Your name can't exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be longer then 6 characters"],
      set : (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userShcema);
