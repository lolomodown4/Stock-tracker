import React, { useState, useEffect } from "react";
import finnHub from "../api/finnHub";

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("stock/profile2", {
          params: {
            symbol,
          },
        });

        if (isMounted) {
          setStockData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(stockData);
    return () => {
      isMounted = false;
    };
  }, [symbol]);

  return (
    stockData && (
      <div className="border row shadow-sm mt-3 mb-5 p-4 rounded">
        <div className="col">
          <div>
            <span className="fw-bold">Name : </span>
            {stockData.name}
          </div>
          <div>
            <span className="fw-bold">Country : </span>
            {stockData.country}
          </div>
          <div>
            <span className="fw-bold">Ticker : </span>
            {stockData.ticker}
          </div>
        </div>

        <div className="col">
          <div>
            <span className="fw-bold">Exchange : </span>
            {stockData.exchange}
          </div>
          <div>
            <span className="fw-bold">Industry : </span>
            {stockData.finnhubIndustry}
          </div>
          <div>
            <span className="fw-bold">IPO : </span>
            {stockData.ipo}
          </div>
        </div>

        <div className="col">
          <div>
            <span className="fw-bold">Market Cap :</span>
            {stockData.marketCapitalization}
          </div>
          <div>
            <span className="fw-bold">Shares Outstanding : </span>
            {stockData.shareOutstanding}
          </div>
          <div>
            <span className="fw-bold">URL : </span>
            {stockData.weburl}
          </div>
        </div>
      </div>
    )
  );
};

export default StockData;
