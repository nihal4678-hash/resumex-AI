const model = require("../services/geminiService");

const generateCoverLetter = async (req, res) => {
  try {
    const {
      fullName,
      jobRole,
      company,
      skills,
      experience,
      jobDescription,
    } = req.body;

    const prompt = `
You are an HR expert.

Write a professional cover letter.

Candidate:
${fullName}

Applying for:
${jobRole}

Company:
${company}

Skills:
${skills}

Experience:
${experience}

Job Description:
${jobDescription}

Return only the cover letter.
`;

    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      coverLetter: result.response.text(),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateCoverLetter,
};