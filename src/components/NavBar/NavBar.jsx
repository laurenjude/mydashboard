import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Lauren'Fin</div>
      <div className="navbar-links">
        {/* using a tags instead of links cause im not using pages for this project */}
        <a href="#">Dashboard</a>
        <a href="#">Stocks</a>
        <a href="#">Crypto</a>
      </div>
    </nav>
  );
};

export default NavBar;
