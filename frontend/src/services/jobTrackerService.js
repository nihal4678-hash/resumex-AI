import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Automatically attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =========================
// Get All Jobs
// =========================
export const getJobs = async () => {
  const res = await API.get("/job-tracker");
  return res.data;
};

// =========================
// Add Job
// =========================
export const addJob = async (jobData) => {
  const res = await API.post("/job-tracker", jobData);
  return res.data;
};

// =========================
// Update Job
// =========================
export const updateJob = async (id, jobData) => {
  const res = await API.put(`/job-tracker/${id}`, jobData);
  return res.data;
};

// =========================
// Delete Job
// =========================
export const deleteJob = async (id) => {
  const res = await API.delete(`/job-tracker/${id}`);
  return res.data;
};