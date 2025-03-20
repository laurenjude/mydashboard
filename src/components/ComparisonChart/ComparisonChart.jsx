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
import "./ComparisonChart.css";

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

const ComparisonChart = ({ assetIds }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data for all assetIds
        const datasets = await Promise.all(
          assetIds.map(async (id) => {
            const response = await axios.get(
              `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
            );
            if (!response.data || !response.data.prices) {
              throw new Error(`Invalid data for asset: ${id}`);
            }
            return {
              label: id,
              data: response.data.prices.map((price) => price[1]),
              borderColor: `#${Math.floor(Math.random() * 16777215).toString(
                16
              )}`,
              fill: false,
            };
          })
        );

        // Update chart data
        setChartData({
          labels: datasets[0].data.map((_, index) => `Day ${index + 1}`),
          datasets,
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if assetIds is not empty
    if (assetIds.length > 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [assetIds]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="comparison-chart">
      <h3>Comparison Chart</h3>
      {chartData.datasets.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No data available for comparison.</p>
      )}
    </div>
  );
};

export default ComparisonChart;
