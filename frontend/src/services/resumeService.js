import api from "./api";

// Get all resumes
export const getMyResumes = async () => {
  const response = await api.get("/resume/my-resumes");
  return response.data;
};

// Delete resume
export const deleteResume = async (id) => {
  const response = await api.delete(`/resume/${id}`);
  return response.data;
};

// Analyze resume
export const analyzeResume = async (resumeId) => {
  const response = await api.post("/ai/analyze", {
    resumeId,
  });

  return response.data;
};