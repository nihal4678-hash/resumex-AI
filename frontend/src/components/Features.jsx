import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaBriefcase,
} from "react-icons/fa";

import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <FeatureCard
            icon={<FaRobot />}
            title="AI Resume Review"
            description="Receive AI-powered suggestions to improve your resume."
          />

          <FeatureCard
            icon={<FaFileAlt />}
            title="Resume Builder"
            description="Create professional ATS-friendly resumes with ease."
          />

          <FeatureCard
            icon={<FaChartLine />}
            title="ATS Score"
            description="Analyze your resume and improve your ATS compatibility."
          />

          <FeatureCard
            icon={<FaBriefcase />}
            title="Job Matching"
            description="Compare your resume with job descriptions instantly."
          />

        </div>
      </div>
    </section>
  );
}

export default Features;