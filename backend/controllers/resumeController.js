const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");
const extractText = require("../utils/extractText");
const fs = require("fs");

const uploadResume = async (req, res) => {
  try {
    console.log("===== Upload Resume =====");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded",
      });
    }

    console.log("Local File:", req.file.path);

    // Extract text BEFORE uploading to Cloudinary
    const resumeText = await extractText(req.file.path);

    console.log("Extracted Text Length:", resumeText.length);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ResumeX-AI/Resumes",
      resource_type: "raw",
    });

    console.log("Cloudinary Upload Success");
    console.log(result.secure_url);

    // Save to MongoDB
    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      resumeText,
      atsScore: 0,
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Resume Uploaded Successfully",
      resume,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
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

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    await resume.deleteOne();

    res.json({
      success: true,
      message: "Resume Deleted Successfully",
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