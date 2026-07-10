import AdminCharts from "../components/admin/AdminCharts";

const AdminDashboard = () => {
    
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        🛠 Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-4xl font-bold text-blue-600">0</p>
        </div>
        <div className="mt-10">
          <AdminCharts />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">Total Resumes</h2>
          <p className="text-4xl font-bold text-green-600">0</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">Interviews</h2>
          <p className="text-4xl font-bold text-purple-600">0</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">AI Requests</h2>
          <p className="text-4xl font-bold text-red-600">0</p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;