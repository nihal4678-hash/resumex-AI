import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import DashboardCharts from "../components/dashboard/DashboardCharts";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const data = {
    labels: [
      "Resume 1",
      "Resume 2",
      "Resume 3",
      "Resume 4",
      "Resume 5",
    ],
    datasets: [
      {
        label: "ATS Score",
        data: [62, 74, 81, 88, 95],
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded-xl p-5 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        ATS Progress
      </h2>

      <Line data={data} />
    </div>
  );
};

export default DashboardChart;