import { motion } from "framer-motion";

const WelcomeCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-xl"
    >
      <h1 className="text-4xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mt-3 text-lg text-blue-100">
        AI Powered Resume Analyzer & Career Assistant
      </p>
    </motion.div>
  );
};

export default WelcomeCard;