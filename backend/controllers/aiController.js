const Resume = require("../models/Resume");
const parseResume = require("../services/resumeParser");
const aiService = require("../services/aiService");

const analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Extract resume text
    const resumeText = await parseResume(
      resume.fileUrl,
      resume.fileName
    );

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume",
      });
    }

    // Analyze using AI
    const result = await aiService(resumeText);

    // Save ATS Score
    resume.atsScore = result.atsScore || 0;
    await resume.save();

    res.status(200).json({
      success: true,
      analysis: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};