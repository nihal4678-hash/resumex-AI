const model = require("../services/geminiService");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required",
      });
    }

    const prompt = `
You are an ATS Resume Expert.

Analyze this resume.

Return ONLY valid JSON.

{
  "atsScore": 85,
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const analysis = JSON.parse(text);

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