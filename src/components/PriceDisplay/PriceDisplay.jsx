import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PriceDisplay.css";

const PriceDisplay = ({ assetId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${assetId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching asset data:", error);
        setError("Failed to fetch asset data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (assetId) {
      fetchData();
    }
  }, [assetId]);

  if (loading) {
    return <p>Loading asset data...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!data) {
    return <p>No data available for this asset.</p>;
  }

  return (
    <div className="price-display">
      <h2>
        {data.name} ({data.symbol.toUpperCase()})
      </h2>
      <div className="price-info">
        <p>Price: ${data.market_data.current_price.usd}</p>
        <p>24h Change: {data.market_data.price_change_percentage_24h}%</p>
        <p>Market Cap: ${data.market_data.market_cap.usd}</p>
        <p>Volume: ${data.market_data.total_volume.usd}</p>
      </div>
    </div>
  );
};

export default PriceDisplay;
