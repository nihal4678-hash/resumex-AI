const Resume = require("../models/Resume");
const parseResume = require("../services/resumeParser");
const aiService = require("../services/aiService");

const analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    console.log("Downloading:", resume.fileUrl);

    const resumeText = await parseResume(
      resume.fileUrl,
      resume.fileName
    );

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from resume",
      });
    }

    const analysis = await aiService(resumeText);

    resume.resumeText = resumeText;
    resume.atsScore = analysis.atsScore;

    await resume.save();

    res.json({
      success: true,
      analysis,
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
  analyzeResume,
};