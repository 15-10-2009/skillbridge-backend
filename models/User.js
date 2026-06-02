const mongoose = require("mongoose");

// ======================================
// USER SCHEMA
// ======================================

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      default: "student",
    },

    profileImage: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
  },
  {
    timestamps: true,
  }
);

// ======================================
// EXPORT MODEL
// ======================================

module.exports = mongoose.model(
  "User",
  userSchema
);