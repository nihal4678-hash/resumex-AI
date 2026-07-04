const model = require("../services/geminiService");

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
You are an expert resume writer.

Generate a professional resume summary.

Candidate Name:
${fullName}

Education:
${education}

Experience:
${experience}

Skills:
${skills}

Projects:
${projects}

Return ONLY the professional summary.
`;

    const result = await model.generateContent(prompt);

    const summary = result.response.text();

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