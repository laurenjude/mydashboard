import React, { useState } from "react";
import "./Watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", type: "crypto" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", type: "crypto" },
    { id: "apple", name: "Apple Inc.", symbol: "AAPL", type: "stock" },
    { id: "tesla", name: "Tesla Inc.", symbol: "TSLA", type: "stock" },
  ]);

  return (
    <div className="watchlist">
      <h2>Watchlist</h2>
      {watchlist.length > 0 ? (
        watchlist.map((asset) => (
          <div
            key={asset.id}
            className="watchlist-item">
            <span>
              {asset.name} ({asset.symbol})
            </span>
          </div>
        ))
      ) : (
        <p>No assets added to watchlist.</p>
      )}
    </div>
  );
};

export default Watchlist;
