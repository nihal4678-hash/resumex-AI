import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <Link
          to="/dashboard"
          className="text-2xl font-bold"
        >
          ResumeX AI
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/dashboard">Dashboard</Link>

          <Link to="/upload">Upload</Link>

          <Link to="/my-resumes">My Resumes</Link>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;