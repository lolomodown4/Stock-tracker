import React from "react";
import { useState, useEffect } from "react";
import finnHub from "../api/finnHub";
import { useGlobalContext } from "../context/context";

const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { addStock } = useGlobalContext();

  useEffect(() => {
    /* dito magfefetch */
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("search", {
          params: {
            q: search,
          },
        });

        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else if (search.length === 0) {
      setResults([]);
    }
    return () => {
      isMounted = false;
    };
  }, [search]);

  return (
    <div className="w-50 rounded  p-5 mx-auto">
      <div className="form-floating dropdown">
        <input
          id="searchBar"
          placeholder="Name of Stock"
          type="text"
          className="form-control"
          autoComplete="off"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <label htmlFor="searchBar">Name of Stock</label>

        <ul
          className={`dropdown-menu ${
            results.length > 0 ? "show" : ""
          } overflow-auto`}
          style={{ height: "30vh", cursor: "pointer" }}
        >
          {results.map((everyResult) => {
            return (
              <li
                key={everyResult.displaySymbol}
                className="dropdown-item"
                onClick={() => {
                  addStock(everyResult.symbol);
                  setResults([]);
                }}
              >
                {everyResult.description} ({everyResult.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AutoComplete;
