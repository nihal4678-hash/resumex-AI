import api from "./api";

export const generateSkills = async (data) => {
  const response = await api.post(
    "/skills/generate",
    data
  );

  return response.data;
};