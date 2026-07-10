import api from "./api";

// Register
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Get Token
export const getToken = () => {
  return localStorage.getItem("token");
};