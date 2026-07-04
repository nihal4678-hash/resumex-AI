import api from "./api";

export const generateSummary = async (data) => {
  const response = await api.post(
    "/builder/summary",
    data
  );

  return response.data;
};