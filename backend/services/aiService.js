const aiService = async (resumeText) => {

  console.log("Resume Length:", resumeText.length);

  return {
    atsScore: 82,

    strengths: [
      "Good Education Section",
      "Technical Skills Mentioned",
      "Projects Included",
      "Professional Layout",
    ],

    weaknesses: [
      "Need more quantified achievements",
      "Experience section can be improved",
    ],

    missingKeywords: [
      "Express.js",
      "MongoDB",
      "REST API",
      "JWT",
      "React",
    ],

    suggestions: [
      "Add measurable achievements.",
      "Improve project descriptions.",
      "Tailor resume according to job description.",
      "Include internships if available.",
    ],
  };
};

module.exports = aiService;