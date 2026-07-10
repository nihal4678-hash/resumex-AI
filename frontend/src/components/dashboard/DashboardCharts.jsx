import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardCharts = ({ stats }) => {
  const barData = {
    labels: [
      "Uploaded",
      "Analyzed",
      "Job Matches",
      "ATS Avg",
    ],

    datasets: [
      {
        label: "Resume Analytics",

        data: [
          stats.total,
          stats.analyzed,
          stats.jobMatches,
          stats.averageScore,
        ],

        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f97316",
          "#7c3aed",
        ],

        borderRadius: 12,

        borderSkipped: false,
      },
    ],
  };

  const doughnutData = {
    labels: [
      "ATS Score",
      "Remaining",
    ],

    datasets: [
      {
        data: [
          stats.averageScore,
          100 - stats.averageScore,
        ],

        backgroundColor: [
          "#2563eb",
          "#e5e7eb",
        ],

        borderWidth: 0,

        cutout: "75%",
      },
    ],
  };

  const barOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#1e293b",

        titleColor: "#fff",

        bodyColor: "#fff",

        padding: 12,

        cornerRadius: 8,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          color: "#6b7280",
        },

        grid: {
          color: "#e5e7eb",
        },
      },

      x: {
        ticks: {
          color: "#6b7280",
        },

        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 20,

          color: "#374151",

          font: {
            size: 14,
          },
        },
      },

      tooltip: {
        backgroundColor: "#1e293b",

        titleColor: "#fff",

        bodyColor: "#fff",

        padding: 12,

        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-16">

      {/* Resume Analytics */}

      <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition duration-300">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              📊 Resume Analytics
            </h2>

            <p className="text-gray-500 mt-1">
              Uploads, Analysis & Job Matches
            </p>

          </div>

        </div>

        <div className="h-80">

          <Bar
            data={barData}
            options={barOptions}
          />

        </div>

      </div>

      {/* ATS Score */}

      <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition duration-300">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              🎯 ATS Performance
            </h2>

            <p className="text-gray-500 mt-1">
              Average Resume Score
            </p>

          </div>

        </div>

        <div className="relative h-80">

          <Doughnut
            data={doughnutData}
            options={doughnutOptions}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

            <h1 className="text-5xl font-bold text-blue-700">

              {stats.averageScore}%

            </h1>

            <p className="text-gray-500 mt-2">

              ATS Score

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardCharts;