const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
  getMyResumes,
  deleteResume,
} = require("../controllers/resumeController");

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get("/my-resumes", protect, getMyResumes);

router.delete("/:id", protect, deleteResume);

module.exports = router;