const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    // Print Authorization Header
    console.log("Authorization Header:", req.headers.authorization);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    let token;

    // Check Bearer Token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. No Token",
      });
    }

    console.log("Received Token:", token);

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Verify Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Token Invalid",
    });
  }
};

module.exports = protect;