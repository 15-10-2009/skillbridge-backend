const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

// Ensure the filename in the 'controllers' folder matches exactly!
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Debugging Middleware for this specific router
router.use((req, res, next) => {
  console.log(`📡 Route hit: ${req.method} /students${req.url}`);
  next();
});

// Standard Routes
router.get("/", getStudents);
router.get("/:id", protect, getStudentById);
router.post("/", protect, createStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);

module.exports = router;
