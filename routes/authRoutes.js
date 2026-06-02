const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getAuthStudents,
  getCurrentUser,
  getProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// ======================================
// AUTH ROUTES
// ======================================

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API is working",
    routes: [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/auth/students",
      "GET /api/auth/me",
      "GET /api/auth/profile"
    ]
  });
});

router.get("/register", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Use POST /api/auth/register with JSON body { name, email, password }",
    example: {
      name: "Teju",
      email: "teju@gmail.com",
      password: "123456"
    }
  });
});

router.get("/login", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Use POST /api/auth/login with JSON body { email, password }",
    example: {
      email: "teju@gmail.com",
      password: "123456"
    }
  });
});

router.get("/students", protect, getAuthStudents);
router.get("/me", protect, getCurrentUser);
router.get("/profile", protect, getProfile);

// REGISTER
router.post(
  "/register",
  registerUser
);

// LOGIN
router.post(
  "/login",
  loginUser
);

// ======================================
// EXPORT
// ======================================

module.exports = router;