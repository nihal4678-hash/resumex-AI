import api from "./api";

export const generateInterviewQuestions = async (resumeId) => {
  const response = await api.post(`/interview/${resumeId}`);
  return response.data;
};