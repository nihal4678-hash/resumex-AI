const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateSummary,
} = require("../controllers/resumeBuilderController");

router.post("/summary", protect, generateSummary);

module.exports = router;