import api from "./api";

// =========================
// Register
// =========================
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

// =========================
// Login
// =========================
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  if (response.data.success) {
    // Save JWT
    localStorage.setItem("token", response.data.token);

    // Save User
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // Save Role
    localStorage.setItem(
      "role",
      response.data.user.role
    );
  }

  return response.data;
};

// =========================
// Logout
// =========================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};

// =========================
// Get Token
// =========================
export const getToken = () => {
  return localStorage.getItem("token");
};

// =========================
// Get Logged User
// =========================
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// =========================
// Check Admin
// =========================
export const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};