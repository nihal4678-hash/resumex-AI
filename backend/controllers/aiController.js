const Resume = require("../models/Resume");

const aiService = require("../services/aiService");

const analyzeResume = async (req, res) => {
  console.log("\n================ AI ANALYSIS START ================");

  try {
    console.log("Request Body:");
    console.log(req.body);

    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }

    console.log("Finding Resume...");

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    console.log("Resume Found");
    console.log("Resume ID:", resume._id);
    console.log("File Name:", resume.fileName);
    console.log("File URL:", resume.fileUrl);

    console.log("\nCalling Resume Parser...\n");

    const resumeText = resume.resumeText;

if (!resumeText || resumeText.trim() === "") {
  return res.status(400).json({
    success: false,
    message: "Resume text not found.",
  });
}

    console.log("\n=========== PARSER RESULT ===========");

    if (!resumeText) {
      console.log("Parser returned NULL or EMPTY.");
    } else {
      console.log("Extracted Length:", resumeText.length);
      console.log(
        "First 300 Characters:\n",
        resumeText.substring(0, 300)
      );
    }

    if (!resumeText || resumeText.trim() === "") {
      throw new Error("Resume parser returned empty text.");
    }

    console.log("\nCalling AI Service...\n");

    const analysis = await aiService(resumeText);

    console.log("AI Analysis Completed");

    resume.resumeText = resumeText;
    resume.atsScore = analysis.atsScore;

    await resume.save();

    console.log("Resume Saved Successfully");

    res.json({
      success: true,
      analysis,
    });

  } catch (error) {

    console.log("\n=========== AI CONTROLLER ERROR ===========");
    console.log(error);
    console.log("===========================================");

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};