// Load environment variables FIRST
const dotenv = require("dotenv");
dotenv.config();

// Core packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Database
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analysisRoutes = require("./routes/analysisRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
// Debug (Remove these later)
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/interview", interviewRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ResumeX AI Backend Running Successfully 🚀",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});