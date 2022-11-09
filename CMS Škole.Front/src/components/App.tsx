import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "../stores/StoreManager";
import ArticlePage from "./Articles/Article";
import ArticleCard from "./Articles/ArticleCard";
import CategoryCatalogue from "./CategoryCatalogue";
import LegendComponent from "./global/LegendComponent";
import Login from "./global/Login";
import NavbarComponent from "./global/NavbarComponent";
import Home from "./Home";
import Carousel from "./global/Carousel";


function App() {
  const appPreFlight = useRef(true);

  useEffect(() => {
    if (appPreFlight.current) {
      appPreFlight.current = false;
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <LegendComponent />
        <NavbarComponent />
        <Carousel />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Category" element={<CategoryCatalogue />} />
            <Route path="/Article" element={<ArticlePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
