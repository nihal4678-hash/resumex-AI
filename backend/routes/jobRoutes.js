const express = require("express");

const router = express.Router();

const { compareResume } = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/compare", authMiddleware, compareResume);

module.exports = router;