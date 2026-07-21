const model = require("../services/geminiService");
const getJobPrompt = require("../utils/jobPrompt");

const compareResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and Job Description are required",
      });
    }

    const prompt = getJobPrompt(resumeText, jobDescription);

    let result;

    for (let i = 0; i < 3; i++) {
      try {
        result = await model.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});
        break;
      } catch (err) {
        if (err.message.includes("503") && i < 2) {
          console.log(`Retry ${i + 1}...`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          throw err;
        }
      }
    }

    let text = result.text;

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const analysis = JSON.parse(text);

    res.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  compareResume,
};