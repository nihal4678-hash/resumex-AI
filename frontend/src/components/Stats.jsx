import { motion } from "framer-motion";

const stats = [
  {
    number: "10K+",
    title: "Resumes Reviewed",
  },
  {
    number: "95%",
    title: "ATS Success Rate",
  },
  {
    number: "5000+",
    title: "Happy Users",
  },
  {
    number: "1500+",
    title: "Jobs Landed",
  },
];

function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Trusted by Thousands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <h3 className="text-5xl font-bold">
                {item.number}
              </h3>

              <p className="mt-3 text-lg">
                {item.title}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;