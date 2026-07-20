const ai = require("./geminiService");

const aiService = async (resumeText) => {
  try {
    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Return in this exact format:

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

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown if Gemini wraps JSON in ```json
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);

  } catch (err) {
    console.error("AI Service Error:", err);

    return {
      atsScore: 0,
      strengths: [],
      weaknesses: [],
      missingKeywords: [],
      suggestions: ["AI analysis failed."],
    };
  }
};

module.exports = aiService;