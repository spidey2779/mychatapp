import { Line, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  LinearScale,
  Filler,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from "chart.js";
import { orange, purpleColor, purpleLightColor } from "../../constants/color";
import { getLast7Days } from "../../lib/features";
ChartJS.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  Filler,
  PointElement,
  ArcElement,
  Legend,
  LineElement,
  plugins,
  scales
);
const labels = getLast7Days();
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  title: {
    display: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        fill: true,
        backgroundColor: purpleLightColor,
        borderColor: purpleColor,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};
const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: 60,
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        fill: true,
        backgroundColor: [purpleLightColor, "lightblue"],
        borderColor: [purpleColor, "lightblue"],
        offset: 40,
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={doughnutChartOptions}
      style={{ zIndex: 10, cursor: "pointer" }}
    />
  );
};

export { LineChart, DoughnutChart };
