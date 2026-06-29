const model = require("../services/geminiService");

const analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    const prompt = `
You are an ATS Resume Expert.

Analyze the following resume and return:

1. ATS Score (0-100)
2. Strengths
3. Weaknesses
4. Missing Skills
5. Suggestions

Resume:
${resumeText}
`;

    let result;

    // Retry up to 3 times if Google returns 503
    for (let i = 0; i < 3; i++) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (err) {
        if (err.message.includes("503") && i < 2) {
          console.log(`Retry ${i + 1}...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          throw err;
        }
      }
    }

    const text = result.response.text();

    res.json({
      success: true,
      analysis: text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { analyzeResume };