const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");

// Upload Resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      publicId: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Resume Uploaded Successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in User Resumes
const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    // Delete from MongoDB
    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getMyResumes,
  deleteResume,
};