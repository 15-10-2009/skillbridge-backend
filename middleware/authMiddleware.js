const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "skillbridge_secret_key";

// ======================================
// PROTECT ROUTES
// ======================================

exports.protect = async (
  req,
  res,
  next
) => {

  try {

    let token;

    // Get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];

    }

    // No token
    if (!token) {

      return res.status(401).json({
        success: false,
        message:
          "Not authorized",
      });

    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message:
        "Token failed",
    });

  }
};