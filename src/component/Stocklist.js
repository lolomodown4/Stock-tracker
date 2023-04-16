import React from "react";
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsFillXOctagonFill,
} from "react-icons/bs";
import { useEffect, useState } from "react";
import finnHub from "../api/finnHub";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const Stocklist = () => {
  const [stock, setStock] = useState([]);

  const { watchList, deleteStock } = useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        /* basically the link is 
          https://finnhub.io/api/v1/quote?symbol=MSFT&token=cg7tithr01qsgaf0ikrgcg7tithr01qsgaf0iks0 
        */

        /* if nakaganto mas madali imanage ang mga params nila */

        /* const response = await finnHub.get("quote", {
          params: {
            symbol: "MSFT",
          },
        }); */

        const responses = await Promise.all(
          watchList.map((everyStock) => {
            return finnHub.get("quote", {
              params: {
                symbol: everyStock,
              },
            });
          })
        );

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });

        if (isMounted) {
          setStock(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [watchList]);

  const checkValue = (value) => {
    return value > 0 ? "success" : "danger";
  };

  const navigateToStockDetails = (stockName) => {
    navigate(`details/${stockName}`);
  };

  return (
    <>
      <table className="table hover mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">HIGH</th>
            <th scope="col">LOW</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
            <th scope="col" style={{ textAlign: "center" }}>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {stock.map((everyStock) => {
            return (
              <tr className="table-row" key={everyStock.symbol}>
                <th
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigateToStockDetails(everyStock.symbol)}
                >
                  {everyStock.symbol}
                </th>
                <td>{everyStock.data.c}</td>
                <th
                  scope="row"
                  className={`text-${checkValue(everyStock.data.d)}`}
                >
                  {everyStock.data.d}{" "}
                  {everyStock.data.d > 0 ? (
                    <BsFillCaretUpFill />
                  ) : (
                    <BsFillCaretDownFill />
                  )}
                </th>
                <th
                  scope="row"
                  className={`text-${checkValue(everyStock.data.dp)}`}
                >
                  {everyStock.data.dp}{" "}
                  {everyStock.data.dp > 0 ? (
                    <BsFillCaretUpFill />
                  ) : (
                    <BsFillCaretDownFill />
                  )}
                </th>
                <td>{everyStock.data.h}</td>
                <td>{everyStock.data.l}</td>
                <td>{everyStock.data.o}</td>
                <td>{everyStock.data.pc}</td>
                <td
                  onClick={() => deleteStock(everyStock.symbol)}
                  style={{ cursor: "pointer", textAlign: "center" }}
                  className="text-danger"
                >
                  <BsFillXOctagonFill />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Stocklist;
