const Resume = require("../models/Resume");
const Interview = require("../models/Interview");

const generateInterviewQuestions = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const questions = [
      "Tell me about yourself.",
      "Explain your strongest technical skill.",
      "Describe a challenging project you worked on.",
      "Why should we hire you?",
      "What are your strengths and weaknesses?",
      "Where do you see yourself in five years?",
      "Describe a time you solved a difficult problem.",
      "Why are you interested in this role?",
      "Explain a project from your resume.",
      "Do you have any questions for us?",
    ];

    const interview = await Interview.create({
      resume: resume._id,
      user: req.user.id,
      questions,
    });

    res.json({
      success: true,
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
};