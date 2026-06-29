import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-6">
          ResumeX AI
        </h1>

        <p className="text-xl mb-8">
          Build, Analyze and Improve your Resume using AI.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;