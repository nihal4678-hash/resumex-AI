import { useEffect, useState } from "react";
import {
  getToken,
  logoutUser,
} from "../services/authService";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { getMyResumes } from "../services/resumeService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("User");

  const [stats, setStats] = useState({
    total: 0,
    averageScore: 0,
    analyzed: 0,
  });

  useEffect(() => {
    fetchDashboard();

    const token = getToken();

    if (token) {
      try {
        const payload = JSON.parse(
          atob(token.split(".")[1])
        );

        if (payload.email) {
          setUserEmail(payload.email);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const fetchDashboard = async () => {
    try {
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
                (sum, resume) =>
                  sum + (resume.atsScore || 0),
                0
              ) / total
            )
          : 0;

      setStats({
        total,
        averageScore,
        analyzed,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-10 flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              ResumeX AI Dashboard
            </h1>

            <p className="text-lg text-blue-600 mt-2">
              Welcome back, {userEmail} 👋
            </p>

            <p className="text-gray-500 mt-2">
              AI Powered Resume Analyzer
            </p>

          </div>

          <button
            onClick={handleLogout}
           className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 hover:scale-105 transition duration-300 font-semibold"
          >
            Logout
          </button>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">
            <h2 className="text-gray-500">
              Total Resumes
            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-3">
              {stats.total}
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-gray-500">
              Average ATS Score
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-3">
              {stats.averageScore}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-500">
              AI Analyses
            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-3">
              {stats.analyzed}
            </p>
          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <Link
              to="/upload"
              className="bg-blue-600 text-white py-4 rounded-lg text-center hover:bg-blue-700 hover:scale-105 transition duration-300 font-semibold"
            >
              📄 Upload Resume
            </Link>
          <Link
            to="/profile"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700
            hover:scale-105 transition duration-300 font-semibold "
          > 
            👤 Profile
          </Link>
            <Link
              to="/my-resumes"
              className="bg-green-600 text-white py-4 rounded-lg text-center hover:bg-green-700 hover:scale-105 transition duration-300 font-semibold"
            >
              📁 My Resumes
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;