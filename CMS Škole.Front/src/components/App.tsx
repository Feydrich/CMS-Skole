import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "../stores/StoreManager";
import ArticleCard from "./ArticleCard";
import CategoryCatalogue from "./CategoryCatalogue";
import LegendComponent from "./global/LegendComponent";
import Login from "./global/Login";
import NavbarComponent from "./global/NavbarComponent";
import Home from "./Home";

function App() {
  const appPreFlight = useRef(true);

  const { sharedStore } = useStore();

  useEffect(() => {
    if (appPreFlight.current) {
      appPreFlight.current = false;
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <LegendComponent />
        <div className="mainContent">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Category" element={<CategoryCatalogue />} />
            <Route path="/Card" element={<ArticleCard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
