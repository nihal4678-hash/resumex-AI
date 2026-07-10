const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobTrackerController");

// Get all jobs
router.get("/", protect, getJobs);

// Add new job
router.post("/", protect, addJob);

// Update job
router.put("/:id", protect, updateJob);

// Delete job
router.delete("/:id", protect, deleteJob);



module.exports = router;