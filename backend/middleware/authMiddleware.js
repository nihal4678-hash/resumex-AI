const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ====================================
// Protect Logged-in User
// ====================================
const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log("Auth Middleware Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

// ====================================
// Admin Only
// ====================================
const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin Access Only",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};