function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;