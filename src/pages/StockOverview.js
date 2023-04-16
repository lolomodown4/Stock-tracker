import React from "react";
import AutoComplete from "../component/AutoComplete";
import Stocklist from "../component/Stocklist";

const StockOverview = () => {
  return (
    <div>
      <h1>StockOverview</h1>
      <AutoComplete />
      <Stocklist />
    </div>
  );
};

export default StockOverview;
