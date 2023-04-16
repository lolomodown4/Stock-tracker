import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../api/finnHub";
import StockChart from "../component/StockChart";
import StockData from "../component/StockData";

const StockDetails = () => {
  const { symbol } = useParams();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const date = new Date();
    const currentTime = Math.floor(date.getTime() / 1000);
    let oneDay = currentTime - 60 * 60 * 24;
    let oneWeek = currentTime - 7 * 60 * 60 * 24;
    let oneYear = currentTime - 365 * 60 * 60 * 24;

    /* because the stock market is closed on weekends */
    if (date.getDay() === 6) {
      oneDay = currentTime - 2 * 60 * 60 * 24;
    } else if (date.getDay() === 0) {
      oneDay = currentTime - 3 * 60 * 60 * 24;
    } else {
      oneDay = currentTime - 60 * 60 * 24;
    }

    const formatData = (data) => {
      return data.t.map((el, index) => {
        return {
          x: el * 1000,
          y: data.c[index].toFixed(2),
        };
      });
    };
    const fetchData = async () => {
      try {
        /* all */
        const responses = await Promise.all([
          finnHub.get("stock/candle", {
            params: {
              symbol,
              resolution: 30,
              from: oneDay,
              to: currentTime,
            },
          }),
          finnHub.get("stock/candle", {
            params: {
              symbol,
              resolution: 60,
              from: oneWeek,
              to: currentTime,
            },
          }),
          finnHub.get("stock/candle", {
            params: {
              symbol,
              resolution: "W",
              from: oneYear,
              to: currentTime,
            },
          }),
        ]);

        if (isMounted) {
          setChartData({
            day: formatData(responses[0].data),
            week: formatData(responses[1].data),
            year: formatData(responses[2].data),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [symbol]);

  return (
    <div>
      {chartData && <StockChart chartData={chartData} symbol={symbol} />}
      <StockData symbol={symbol} />
    </div>
  );
};

export default StockDetails;
