import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from "../services/jobTrackerService";

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    jobLink: "",
    status: "Applied",
    notes: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data.jobs || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (job) => {
    setEditingId(job._id);

    setForm({
      company: job.company,
      role: job.role,
      location: job.location,
      jobLink: job.jobLink,
      status: job.status,
      notes: job.notes,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateJob(editingId, form);
        setEditingId(null);
      } else {
        await addJob(form);
      }

      setForm({
        company: "",
        role: "",
        location: "",
        jobLink: "",
        status: "Applied",
        notes: "",
      });

      loadJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await deleteJob(id);
      loadJobs();
    } catch (err) {
      console.log(err);
    }
  };

  const total = jobs.length;

  const applied = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interview = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offer = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejected = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      job.role
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      job.status === filter;

    return matchesSearch && matchesFilter;
  });

  const chartData = [
    {
      name: "Applied",
      value: applied,
    },
    {
      name: "Interview",
      value: interview,
    },
    {
      name: "Offer",
      value: offer,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  const COLORS = [
    "#2563EB",
    "#F59E0B",
    "#16A34A",
    "#DC2626",
  ];
    return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          💼 Job Application Tracker
        </h1>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <div className="bg-blue-600 text-white rounded-xl p-6">
            <h2 className="text-3xl font-bold">{applied}</h2>
            <p>Applied</p>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-6">
            <h2 className="text-3xl font-bold">{interview}</h2>
            <p>Interview</p>
          </div>

          <div className="bg-green-600 text-white rounded-xl p-6">
            <h2 className="text-3xl font-bold">{offer}</h2>
            <p>Offer</p>
          </div>

          <div className="bg-red-600 text-white rounded-xl p-6">
            <h2 className="text-3xl font-bold">{rejected}</h2>
            <p>Rejected</p>
          </div>

        </div>

        {/* Analytics */}

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            📊 Application Analytics
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Form */}

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">

            {editingId ? "✏ Edit Job" : "➕ Add Job"}

          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
              className="border rounded-lg p-3"
              required
            />

            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Role"
              className="border rounded-lg p-3"
              required
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="border rounded-lg p-3"
            />

            <input
              name="jobLink"
              value={form.jobLink}
              onChange={handleChange}
              placeholder="Job Link"
              className="border rounded-lg p-3"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <input
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="border rounded-lg p-3"
            />

            <button
              className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
            >
              {editingId ? "Update Job" : "Add Job"}
            </button>

          </form>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="🔍 Search Company or Role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg p-3 flex-1"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg p-3 w-56"
            >

              <option>All</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>

            </select>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            My Applications ({total})

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-4">Company</th>
                  <th className="text-left p-4">Role</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredJobs.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500"
                    >
                      No Applications Found
                    </td>

                  </tr>

                ) : (

                  filteredJobs.map((job) => (

                    <tr
                      key={job._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 font-semibold">
                        {job.company}
                      </td>

                      <td className="p-4">
                        {job.role}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            job.status === "Applied"
                              ? "bg-blue-100 text-blue-700"
                              : job.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700"
                              : job.status === "Offer"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {job.status}

                        </span>

                      </td>

                      <td className="p-4">
                        {job.location || "-"}
                      </td>

                      <td className="p-4 flex gap-2">

                        {job.jobLink && (

                          <a
                            href={job.jobLink}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                          >
                            Open
                          </a>

                        )}

                        <button
                          onClick={() => handleEdit(job)}
                          className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(job._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default JobTracker;