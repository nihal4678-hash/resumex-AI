const model = require("../services/geminiService");

const generateSkills = async (req, res) => {
  try {
    const { education, experience, projects } = req.body;

    const prompt = `
You are an expert resume writer.

Based on the following candidate information, generate a list of professional skills.

Education:
${education}

Experience:
${experience}

Projects:
${projects}

Return ONLY a comma-separated list.

Example:
React, Node.js, Express.js, MongoDB, REST API, Git, JavaScript
`;

    const result = await model.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

    const skills = result.text;

    res.json({
      success: true,
      skills,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateSkills,
};