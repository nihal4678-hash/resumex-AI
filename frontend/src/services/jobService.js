import api from "./api";

export const compareResume = async (resumeText, jobDescription) => {
  const response = await api.post("/job/compare", {
    resumeText,
    jobDescription,
  });

  return response.data;
};