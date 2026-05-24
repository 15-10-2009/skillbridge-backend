const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [3, "Name must contain at least 3 characters"],
    },

    course: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Minimum age should be 18"],
      max: [60, "Maximum age should be 60"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    skills: {
      type: [String],
      default: [],
    },

    learningStatus: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);