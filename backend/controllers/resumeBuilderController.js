const ai = require("../services/geminiService");

const generateSummary = async (req, res) => {
  try {
    const {
      fullName,
      education,
      experience,
      skills,
      projects,
    } = req.body;

    const prompt = `
Generate a professional resume summary.

Name: ${fullName}
Education: ${education}
Experience: ${experience}
Skills: ${skills}
Projects: ${projects}

Return only the summary.
`;

    const result = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

const summary = result.text;

res.json({
  success: true,
  summary,
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
  generateSummary,
};