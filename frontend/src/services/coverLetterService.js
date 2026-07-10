import api from "./api";

export const generateCoverLetter = async (data) => {
  const response = await api.post("/cover-letter", data);

  return response.data;
};