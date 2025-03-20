import React, { useState } from "react";
import "./CurrencyConverter.css";

const CurrencyConverter = ({ price }) => {
  const [currency, setCurrency] = useState("USD");

  const convertPrice = (price) => {
    // Add conversion logic based on API or fixed rates
    switch (currency) {
      case "EUR":
        return (price * 0.85).toFixed(2);
      case "GBP":
        return (price * 0.73).toFixed(2);
      default:
        return price.toFixed(2);
    }
  };

  return (
    <div className="currency-converter">
      <h3>Currency Converter</h3>
      <div className="converter-input">
        <input
          type="number"
          value={price}
          readOnly
        />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <p>
        Converted Price: {convertPrice(price)} {currency}
      </p>
    </div>
  );
};

export default CurrencyConverter;
