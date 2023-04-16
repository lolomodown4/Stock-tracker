import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList").split(",") || ["MSFT", "AMZN", "GOOGL"]
  );

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const addStock = (stock) => {
    if (watchList.includes(stock)) {
      return;
    } else {
      setWatchList((prev) => [...prev, stock]);
    }
  };

  const deleteStock = (stock) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== stock;
      })
    );
  };

  return (
    <AppContext.Provider value={{ watchList, addStock, deleteStock }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
