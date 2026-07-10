import CountUp from "react-countup";
import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon,
  color,
  subtitle,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
             {value}
        </h2>

          <p className="text-gray-400 text-sm mt-2">
            {subtitle}
          </p>
        </div>

        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${color}`}
        >
          {icon}
        </div>

      </div>
    </motion.div>
  );
};

export default StatCard;