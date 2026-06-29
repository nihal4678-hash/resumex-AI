import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-screen flex items-center">

      {/* Background Blur Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-400 font-semibold mb-4">
            🚀 AI Powered Resume Platform
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Build
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {" "}ATS Ready{" "}
            </span>
            Resume
            <br />
            Using AI
          </h1>

          <p className="mt-8 text-lg text-gray-300">
            Upload your resume, improve ATS score,
            compare with job descriptions, generate interview
            questions, and build your personal portfolio.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-blue-600 px-8 py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-500 px-8 py-4 rounded-xl hover:bg-slate-800 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl w-full max-w-md">

            <h3 className="text-2xl font-bold mb-6">
              Resume Analytics
            </h3>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between">
                  <span>ATS Score</span>
                  <span>92%</span>
                </div>

                <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                  <div className="bg-green-500 h-3 rounded-full w-[92%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Resume Strength</span>
                  <span>88%</span>
                </div>

                <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                  <div className="bg-blue-500 h-3 rounded-full w-[88%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Job Match</span>
                  <span>81%</span>
                </div>

                <div className="w-full bg-slate-700 rounded-full h-3 mt-2">
                  <div className="bg-purple-500 h-3 rounded-full w-[81%]"></div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;