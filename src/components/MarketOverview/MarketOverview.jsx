import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MarketOverview.css";

const MarketOverview = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarketData = async () => {
    try {
      // Check if data is cached and less than 5 minutes old
      const cachedData = localStorage.getItem("marketData");
      if (cachedData) {
        const { crypto, stock, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < 5 * 60 * 1000) {
          setCryptoData(crypto);
          setStockData(stock);
          setLoading(false);
          return;
        }
      }

      // Fetch top 5 cryptocurrencies
      const cryptoResponse = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1"
      );

      // Fetch top 5 stocks (example using Alpha Vantage)
      const stockResponse = await axios.get(
        `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=YOUR_API_KEY`
      );

      // Cache the new data
      const marketData = {
        crypto: cryptoResponse.data,
        stock: stockResponse.data.top_gainers || [],
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("marketData", JSON.stringify(marketData));

      setCryptoData(marketData.crypto);
      setStockData(marketData.stock);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setError("Failed to fetch market data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  if (loading) {
    return <p>Loading market data...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="market-overview">
      <h2>Market Overview</h2>
      <div className="crypto-section">
        <h3>Top Cryptocurrencies</h3>
        {cryptoData.map((crypto) => (
          <div
            key={crypto.id}
            className="asset-item">
            <span>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </span>
            <span>${crypto.current_price}</span>
          </div>
        ))}
      </div>
      <div className="stock-section">
        <h3>Top Stocks</h3>
        {stockData.map((stock) => (
          <div
            key={stock.ticker}
            className="asset-item">
            <span>{stock.ticker}</span>
            <span>${stock.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverview;
