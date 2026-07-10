const express = require("express");

const router = express.Router();

const profileUpload = require("../middleware/profileUpload");

const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Get Logged-in User
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

router.post(
  "/profile-picture",
  protect,
  profileUpload.single("profilePicture"),
  uploadProfilePicture
);

module.exports = router;