import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/userService";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    name: "User",
    profilePicture: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setUser({
        name: res.user.name || "User",
        profilePicture: res.user.profilePicture || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const active =
    "text-yellow-300 font-bold border-b-2 border-yellow-300 pb-1";

  const normal =
    "hover:text-yellow-200 transition duration-300";

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 shadow-2xl">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="text-3xl font-extrabold text-white tracking-wide hover:scale-105 transition"
        >
          🚀 ResumeX AI
        </Link>

        {/* Navigation */}

        <div className="hidden lg:flex items-center gap-6 text-white font-medium">

          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? active : normal}
          >
            Dashboard
          </Link>

          <Link
            to="/upload"
            className={location.pathname === "/upload" ? active : normal}
          >
            Upload
          </Link>

          <Link
            to="/my-resumes"
            className={location.pathname === "/my-resumes" ? active : normal}
          >
            My Resumes
          </Link>

          <Link
            to="/resume-builder"
            className={location.pathname === "/resume-builder" ? active : normal}
          >
            Resume Builder
          </Link>

          <Link
            to="/job-match"
            className={location.pathname === "/job-match" ? active : normal}
          >
            Job Match
          </Link>

          <Link
            to="/interview"
            className={location.pathname === "/interview" ? active : normal}
          >
            Interview
          </Link>

          <Link
            to="/cover-letter"
            className={location.pathname === "/cover-letter" ? active : normal}
          >
            Cover Letter
          </Link>

          <Link
            to="/job-tracker"
            className={location.pathname === "/job-tracker" ? active : normal}
          >
            Job Tracker
          </Link>

          <Link
            to="/admin"
            className={location.pathname === "/admin" ? active : normal}
          >
            Admin
          </Link>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          {/* Profile */}

          <Link
            to="/profile"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition"
          >

            {user.profilePicture ? (

              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-white"
              />

            ) : (

              <div className="w-11 h-11 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>

            )}

            <div className="hidden md:block">

              <p className="text-white font-semibold">
                {user.name}
              </p>

              <p className="text-blue-100 text-sm">
                View Profile
              </p>

            </div>

          </Link>

          {/* Logout */}

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full text-white font-semibold shadow-lg transition hover:scale-105"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;