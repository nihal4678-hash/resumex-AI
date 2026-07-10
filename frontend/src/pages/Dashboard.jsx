import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaFileAlt,
  FaChartLine,
  FaRobot,
  FaBriefcase,
  FaUpload,
  FaFileSignature,
  FaMicrophone,
  FaArrowUp,
} from "react-icons/fa";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatCard from "../components/dashboard/StatCard";
import DashboardCharts from "../components/dashboard/DashboardCharts";

import { getToken } from "../services/authService";
import { getMyResumes } from "../services/resumeService";
import { getProfile } from "../services/userService";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "User",
    email: "",
    profilePicture: "",
  });

  const [stats, setStats] = useState({
    total: 0,
    averageScore: 0,
    analyzed: 0,
    jobMatches: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const profile = await getProfile();

      setUser({
        name: profile.user.name,
        email: profile.user.email,
        profilePicture: profile.user.profilePicture,
      });

      const data = await getMyResumes();

      const resumes = data.resumes || [];

      const total = resumes.length;

      const analyzed = resumes.filter(
        (resume) => resume.atsScore > 0
      ).length;

      const averageScore =
        total > 0
          ? Math.round(
              resumes.reduce(
                (sum, resume) => sum + (resume.atsScore || 0),
                0
              ) / total
            )
          : 0;

      setStats({
        total,
        averageScore,
        analyzed,
        jobMatches: analyzed,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl text-white p-8 mb-10">

          <div className="flex flex-col md:flex-row items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold">
                👋 Welcome Back,
              </h1>

              <h2 className="text-5xl font-extrabold mt-2">
                {user.name}
              </h2>

              <p className="mt-4 text-blue-100 text-lg">
                {user.email}
              </p>

              <p className="mt-3 text-blue-200">
                Build better resumes. Get higher ATS scores.
                Crack interviews with AI.
              </p>

            </div>

            <div className="mt-8 md:mt-0">

              {user.profilePicture ? (

                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-xl"
                />

              ) : (

                <div className="w-36 h-36 rounded-full bg-white text-blue-700 flex items-center justify-center text-6xl font-bold shadow-xl">

                  {user.name.charAt(0).toUpperCase()}

                </div>

              )}

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

          <StatCard
            title="Total Resumes"
            value={stats.total}
            subtitle="Uploaded"
            icon={<FaFileAlt />}
            color="bg-blue-100 text-blue-700"
          />

          <StatCard
            title="Average ATS"
            value={`${stats.averageScore}%`}
            subtitle="Performance"
            icon={<FaChartLine />}
            color="bg-green-100 text-green-700"
          />

          <StatCard
            title="AI Analysis"
            value={stats.analyzed}
            subtitle="Completed"
            icon={<FaRobot />}
            color="bg-purple-100 text-purple-700"
          />

          <StatCard
            title="Job Matches"
            value={stats.jobMatches}
            subtitle="Compared"
            icon={<FaBriefcase />}
            color="bg-orange-100 text-orange-700"
          />

        </div>

        {/* Quick Actions */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-7">
            ⚡ Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

            <Link
              to="/upload"
              className="bg-blue-600 hover:bg-blue-700 hover:-translate-y-2 duration-300 rounded-3xl shadow-xl p-8 text-white"
            >
              <FaUpload className="text-5xl mb-5" />

              <h3 className="text-2xl font-bold">
                Upload Resume
              </h3>

              <p className="mt-2 text-blue-100">
                Upload PDF or DOCX
              </p>

            </Link>

            <Link
              to="/my-resumes"
              className="bg-green-600 hover:bg-green-700 hover:-translate-y-2 duration-300 rounded-3xl shadow-xl p-8 text-white"
            >
              <FaFileAlt className="text-5xl mb-5" />

              <h3 className="text-2xl font-bold">
                My Resumes
              </h3>

              <p className="mt-2 text-green-100">
                View All Resumes
              </p>

            </Link>

            <Link
              to="/resume-builder"
              className="bg-purple-600 hover:bg-purple-700 hover:-translate-y-2 duration-300 rounded-3xl shadow-xl p-8 text-white"
            >
              <FaFileSignature className="text-5xl mb-5" />

              <h3 className="text-2xl font-bold">
                Resume Builder
              </h3>

              <p className="mt-2 text-purple-100">
                AI Resume Creator
              </p>

            </Link>

            <Link
              to="/interview"
              className="bg-orange-500 hover:bg-orange-600 hover:-translate-y-2 duration-300 rounded-3xl shadow-xl p-8 text-white"
            >
              <FaMicrophone className="text-5xl mb-5" />

              <h3 className="text-2xl font-bold">
                Mock Interview
              </h3>

              <p className="mt-2 text-orange-100">
                AI Interview Practice
              </p>

            </Link>

          </div>

        </div>
                {/* Getting Started */}

        <div className="mt-16 grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              🚀 Getting Started
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between items-center">
                <span>📄 Upload Resume</span>
                <span className="text-2xl">
                  {stats.total > 0 ? "✅" : "⭕"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>🤖 ATS Analysis</span>
                <span className="text-2xl">
                  {stats.analyzed > 0 ? "✅" : "⭕"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>💼 Job Match</span>
                <span className="text-2xl">
                  {stats.jobMatches > 0 ? "✅" : "⭕"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>📝 Resume Builder</span>
                <span className="text-2xl">✅</span>
              </div>

              <div className="flex justify-between items-center">
                <span>🎤 AI Interview</span>
                <span className="text-2xl">⭕</span>
              </div>

            </div>

            <div className="mt-8">

              <p className="font-semibold mb-3">
                Overall Progress
              </p>

              <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000"
                  style={{
                    width: `${Math.min(
                      (stats.total > 0 ? 20 : 0) +
                        (stats.analyzed > 0 ? 20 : 0) +
                        (stats.jobMatches > 0 ? 20 : 0) +
                        20,
                      100
                    )}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* AI Tips */}

          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl shadow-xl p-8 text-white">

            <h2 className="text-3xl font-bold mb-6">
              🤖 AI Career Tips
            </h2>

            <div className="space-y-5">

              <div className="bg-white/10 rounded-xl p-4">
                💡 Keep your ATS Score above 80%.
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                📄 Upload resumes tailored for each job.
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                🎤 Practice interviews every week.
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                📈 Improve missing skills suggested by AI.
              </div>

            </div>

          </div>

        </div>

        {/* Charts */}

        <DashboardCharts stats={stats} />

        {/* Recent Activity */}

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-8">
            🕒 Recent Activity
          </h2>

          <div className="space-y-6">

            <div className="flex justify-between border-b pb-3">

              <div className="flex items-center gap-3">

                <div className="bg-blue-100 text-blue-700 p-3 rounded-full">

                  <FaUpload />

                </div>

                <div>

                  <h3 className="font-bold">
                    Resume Uploaded
                  </h3>

                  <p className="text-gray-500">
                    Upload your latest resume.
                  </p>

                </div>

              </div>

              <span className="text-gray-400">
                Today
              </span>

            </div>

            <div className="flex justify-between border-b pb-3">

              <div className="flex items-center gap-3">

                <div className="bg-green-100 text-green-700 p-3 rounded-full">

                  <FaChartLine />

                </div>

                <div>

                  <h3 className="font-bold">
                    ATS Analysis
                  </h3>

                  <p className="text-gray-500">
                    AI analyzed your resume.
                  </p>

                </div>

              </div>

              <span className="text-gray-400">
                Today
              </span>

            </div>

            <div className="flex justify-between border-b pb-3">

              <div className="flex items-center gap-3">

                <div className="bg-orange-100 text-orange-700 p-3 rounded-full">

                  <FaBriefcase />

                </div>

                <div>

                  <h3 className="font-bold">
                    Job Match
                  </h3>

                  <p className="text-gray-500">
                    Resume compared with job description.
                  </p>

                </div>

              </div>

              <span className="text-gray-400">
                Today
              </span>

            </div>

            <div className="flex justify-between">

              <div className="flex items-center gap-3">

                <div className="bg-purple-100 text-purple-700 p-3 rounded-full">

                  <FaArrowUp />

                </div>

                <div>

                  <h3 className="font-bold">
                    Keep Improving
                  </h3>

                  <p className="text-gray-500">
                    Increase your ATS score above 90%.
                  </p>

                </div>

              </div>

              <span className="text-gray-400">
                AI
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;