import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Productivity",
        data: [30, 40, 50, 70, 90, 80, 70, 90, 100, 50, 60, 80],
        borderColor: "rgba(248, 249, 66)",
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Quality of Work",
        data: [50, 55, 60, 65, 70, 30, 40, 50, 70, 90, 80, 70],
        borderColor: "rgba(66, 137, 249)",
        backgroundColor: "rgba(66, 137, 249)",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Performance Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PerformanceChart;
