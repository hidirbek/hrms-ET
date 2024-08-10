import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
      label: "Visitor Insights",
      data: [50, 100, 200, 500, 400, 300, 700, 300, 750, 300, 200, 100],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Visitor Insights",
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
        drawBorder: true,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: true,
      },
      ticks: {
        stepSize: 100,
        max: 800,
        callback: function (value) {
          return value;
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const VisitorsChart = () => {
  return <Line data={data} options={options} />;
};

export default VisitorsChart;
