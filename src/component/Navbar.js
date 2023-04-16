import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">StockOverview</Link>
        </li>
        <li>
          <Link to="details/:symbol">StockDetails</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
