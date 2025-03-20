import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./PriceChart.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceChart = ({ assetId }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${assetId}/market_chart?vs_currency=usd&days=7`
        );
        const prices = response.data.prices;

        setChartData({
          labels: prices.map((price) =>
            new Date(price[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Price",
              data: prices.map((price) => price[1]),
              borderColor: "var(--primary-color)",
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    if (assetId) {
      fetchChartData();
    }
  }, [assetId]);

  return (
    <div className="price-chart-container">
      {chartData.datasets.length > 0 ? (
        <Line
          data={chartData}
          options={{
            responsive: true, // Ensure the chart is responsive
            maintainAspectRatio: false, // Allow the chart to fill the container
          }}
        />
      ) : (
        <p>No data available for the selected asset.</p>
      )}
    </div>
  );
};

export default PriceChart;
