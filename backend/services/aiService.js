const aiService = async () => {
  return {
    atsScore: 82,
    strengths: [
      "Good education section",
      "Relevant technical skills",
      "Projects included"
    ],
    weaknesses: [
      "Resume could use more quantified achievements"
    ],
    missingKeywords: [
      "REST API",
      "MongoDB",
      "Express.js"
    ],
    suggestions: [
      "Add measurable accomplishments.",
      "Tailor keywords to the job description.",
      "Improve project descriptions."
    ]
  };
};

module.exports = aiService;