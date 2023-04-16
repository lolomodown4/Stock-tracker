import React, { useState } from "react";
import Chart from "react-apexcharts";

const StockChart = ({ chartData, symbol }) => {
  const { day, week, year } = chartData;

  const [dateFormat, setDateFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  /* const myColor =
    determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y >
    0
      ? "#26C281"
      : "#ed3419";
 */
  /* apex charts configuration */

  const options = {
    /* colors: [myColor], */
    title: {
      text: symbol,
      align: "center",
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },

    xaxis: {
      type: "datetime",
      labels: {
        dateTimeUTC: false,
      },
    },

    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const selectedButton = (timePicked) => {
    let pickedButton = "";
    if (timePicked === dateFormat) {
      pickedButton = "btn btn-primary m-1";
    } else {
      pickedButton = "btn btn-outline-primary m-1";
    }
    return pickedButton;
  };

  return (
    <div className="border mt-5 p-5 shadow-sm rounded">
      <Chart options={options} series={series} width="100%" type="area" />
      <div>
        <button
          className={selectedButton("24h")}
          onClick={() => setDateFormat("24h")}
        >
          24 H
        </button>
        <button
          className={selectedButton("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7 D
        </button>
        <button
          className={selectedButton("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1 Y
        </button>
      </div>
    </div>
  );
};

export default StockChart;
