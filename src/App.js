import "./App.css";
import StockDetails from "./pages/StockDetails";
import StockOverview from "./pages/StockOverview";
import Navbar from "./component/Navbar";
import { Routes, Route } from "react-router-dom";

/* my API key in finnhub api = cg7tithr01qsgaf0ikrgcg7tithr01qsgaf0iks0 */

function App() {
  return (
    <div className="App container ">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<StockOverview />} />
        <Route path="details/:symbol" element={<StockDetails />} />
      </Routes>
    </div>
  );
}

export default App;
