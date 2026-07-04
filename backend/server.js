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

// Connect Database
connectDB();

const app = express();

// ============================
// CORS Configuration
// ============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://resumex-ai-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Middleware
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