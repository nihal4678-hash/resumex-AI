const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateSkills,
} = require("../controllers/skillsController");

router.post(
  "/generate",
  protect,
  generateSkills
);

module.exports = router;