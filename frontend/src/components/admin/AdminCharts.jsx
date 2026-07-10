import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", users: 20, resumes: 35 },
  { month: "Feb", users: 45, resumes: 60 },
  { month: "Mar", users: 70, resumes: 95 },
  { month: "Apr", users: 90, resumes: 120 },
  { month: "May", users: 130, resumes: 180 },
  { month: "Jun", users: 160, resumes: 240 },
];

const AdminCharts = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Monthly Growth
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#2563eb" />
          <Bar dataKey="resumes" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminCharts;