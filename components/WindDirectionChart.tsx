"use client";

import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface WindDirectionChartProps {
  frequencyData: Record<string, number>;
}

const compassOrder = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const WindDirectionChart: React.FC<WindDirectionChartProps> = ({
  frequencyData,
}) => {
  const chartData = {
    labels: compassOrder,
    datasets: [
      {
        label: "Wind Direction Frequency",
        data: compassOrder.map((dir) => frequencyData[dir] || 0),
        backgroundColor: "rgba(255, 136, 84, 0.6)",
        borderColor: "rgba(255, 136, 84, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          color: "#ffffff",
          backdropColor: "transparent",
        },
        grid: {
          color: "#444444",
        },
        angleLines: {
          color: "#444444",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full max-w-[300px]  backdrop-blur-md p-4 rounded-xl">
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default WindDirectionChart;
