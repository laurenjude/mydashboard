import React, { useState } from "react";

import SearchBar from "./components/SearchBar/SearchBar";
import PriceDisplay from "./components/PriceDisplay/PriceDisplay";
import PriceChart from "./components/PriceChart/PriceChart";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import MarketOverview from "./components/MarketOverview/MarketOverview";
import Watchlist from "./components/Watchlist/Watchlist";
import DarkModeToggle from "./components/DarkModeToggle/DarkModeToggle";
import "./App.css";
import Navbar from "./components/NavBar/NavBar";

const App = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);

  return (
    <div className="app">
      <Navbar />
      <DarkModeToggle />
      <div className="container">
        <SearchBar onSelect={setSelectedAsset} />
        {selectedAsset && (
          <>
            <PriceDisplay assetId={selectedAsset.id} />
            <PriceChart assetId={selectedAsset.id} />
            <CurrencyConverter price={100} /> {/* Replace with actual price */}
          </>
        )}
        <MarketOverview />
        <Watchlist />
      </div>
    </div>
  );
};

export default App;
