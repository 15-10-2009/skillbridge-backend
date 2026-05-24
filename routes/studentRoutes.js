const express = require("express");
const router = express.Router();

// Ensure the filename in the 'controllers' folder matches exactly!
const {
  getStudents,
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
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;