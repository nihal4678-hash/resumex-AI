const JobApplication = require("../models/JobApplication");

// =====================================
// Get All Jobs
// =====================================
exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobApplication.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Add Job
// =====================================
exports.addJob = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      jobLink,
      status,
      notes,
    } = req.body;

    const job = await JobApplication.create({
      user: req.user.id,
      company,
      role,
      location,
      jobLink,
      status,
      notes,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Update Job
// =====================================
exports.updateJob = async (req, res) => {
  try {
    const job = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    job.company = req.body.company || job.company;
    job.role = req.body.role || job.role;
    job.location = req.body.location || job.location;
    job.jobLink = req.body.jobLink || job.jobLink;
    job.status = req.body.status || job.status;
    job.notes = req.body.notes || job.notes;

    await job.save();

    res.json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Delete Job
// =====================================
exports.deleteJob = async (req, res) => {
  try {
    const job = await JobApplication.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await job.deleteOne();

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};