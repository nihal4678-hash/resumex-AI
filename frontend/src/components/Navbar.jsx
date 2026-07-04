import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold hover:text-gray-200"
        >
          ResumeX AI
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm md:text-base">

          <Link
            to="/dashboard"
            className="hover:text-gray-200"
          >
            Dashboard
          </Link>

          <Link
            to="/upload"
            className="hover:text-gray-200"
          >
            Upload
          </Link>

          <Link
            to="/my-resumes"
            className="hover:text-gray-200"
          >
            My Resumes
          </Link>

          <Link
            to="/resume-builder"
            className="hover:text-gray-200"
          >
            Resume Builder
          </Link>

          <Link
            to="/job-match"
            className="hover:text-gray-200"
          >
            Job Match
          </Link>

          <Link
            to="/interview"
            className="hover:text-gray-200"
          >
            Interview
          </Link>

          <Link
            to="/profile"
            className="hover:text-gray-200"
          >
            Profile
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;