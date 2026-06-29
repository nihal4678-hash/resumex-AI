const express = require("express");
const router = express.Router();

const {
  generateInterviewQuestions,
} = require("../controllers/interviewController");

const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/:resumeId",
  authMiddleware,
  generateInterviewQuestions
);

module.exports = router;