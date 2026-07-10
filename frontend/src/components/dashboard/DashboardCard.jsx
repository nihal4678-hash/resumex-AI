const DashboardCard = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-white shadow-md p-6 hover:shadow-xl transition">
      <h2 className="text-gray-500 text-sm">{title}</h2>

      <p className="text-3xl font-bold mt-3">{value}</p>
    </div>
  );
};

export default DashboardCard;