const getJobPrompt = (resumeText, jobDescription) => {
  return `
You are an ATS Resume Expert.

Compare the resume with the job description.

Resume:

${resumeText}

Job Description:

${jobDescription}

Return ONLY valid JSON.

Format:

{
  "matchScore": number,
  "matchingSkills": [],
  "missingSkills": [],
  "missingKeywords": [],
  "suggestions": []
}
`;
};

module.exports = getJobPrompt;