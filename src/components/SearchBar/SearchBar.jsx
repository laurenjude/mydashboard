import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch cryptocurrency suggestions
  const fetchCryptoSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );
      return response.data.coins.map((coin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        type: "crypto",
      }));
    } catch (error) {
      console.error("Error fetching crypto suggestions:", error);
      return [];
    }
  };

  // Fetch stock suggestions
  const fetchStockSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=YOUR_API_KEY`
      );
      // Check if the response contains the expected data
      if (response.data && response.data.bestMatches) {
        return response.data.bestMatches.map((stock) => ({
          id: stock["1. symbol"],
          name: stock["2. name"],
          symbol: stock["1. symbol"],
          type: "stock",
        }));
      }
      return []; // Return an empty array if the data is invalid
    } catch (error) {
      console.error("Error fetching stock suggestions:", error);
      return [];
    }
  };

  // Fetch combined suggestions
  const fetchSuggestions = async (query) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Add a delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const cryptoResults = await fetchCryptoSuggestions(query);
      const stockResults = await fetchStockSuggestions(query);
      const combinedResults = [...cryptoResults, ...stockResults];
      setSuggestions(combinedResults);
    } catch (error) {
      setError("Failed to fetch suggestions. Please try again later.");
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced fetch suggestions
  const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debouncedFetchSuggestions(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (asset) => {
    onSelect(asset); // Pass the selected asset to the parent component
    setQuery("");
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for stocks or cryptocurrencies..."
      />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSuggestionClick(item)}>
              {item.name} ({item.symbol}) - {item.type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
