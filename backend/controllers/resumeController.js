const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");

const uploadResume = async (req, res) => {
  try {
    console.log("===== Upload Resume =====");
    console.log(req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded",
      });
    }

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      publicId: req.file.filename,
      atsScore: 0,
      resumeText: "",
    });

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
    console.log(error);

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

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized",
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
    console.log(error);

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