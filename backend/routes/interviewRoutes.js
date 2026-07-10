const express = require("express");
const router = express.Router();

const {
  generateInterviewQuestions,
} = require("../controllers/interviewController");

const { protect } = require("../middleware/authMiddleware");

router.post(
  "/:resumeId",
  protect,
  generateInterviewQuestions
);

module.exports = router;