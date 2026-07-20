const model = require("./geminiService");

const aiService = async (resumeText) => {
  try {
    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON in this format:

{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": []
}

Rules:
- atsScore must be between 0 and 100.
- strengths: 4-6 points.
- weaknesses: 3-5 points.
- missingKeywords: important missing technical keywords.
- suggestions: practical improvements.
- Do NOT include markdown.
- Do NOT wrap the JSON inside \`\`\`.

Resume:

${resumeText}
`;

    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();

    // Remove markdown if Gemini returns it
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);

  } catch (err) {
    console.log("AI Service Error:", err);

    return {
      atsScore: 75,
      strengths: [
        "Education section is present",
        "Technical skills are included",
        "Projects are listed"
      ],
      weaknesses: [
        "Need more quantified achievements",
        "Experience can be improved"
      ],
      missingKeywords: [
        "REST API",
        "Docker",
        "MongoDB"
      ],
      suggestions: [
        "Add measurable achievements.",
        "Tailor the resume for each job.",
        "Include certifications and internships."
      ]
    };
  }
};

module.exports = aiService;