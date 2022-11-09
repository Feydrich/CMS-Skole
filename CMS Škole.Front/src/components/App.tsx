import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "../stores/StoreManager";
import ArticlePage from "./Articles/Article";
import ArticleCard from "./Articles/ArticleCard";
import CategoryCatalogue from "./Articles/CategoryCatalogue";
import LegendComponent from "./global/LegendComponent";
import Login from "./global/Login";
import NavbarComponent from "./global/NavbarComponent";
import Home from "./Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArticleList from "./Admin/ArticleList";
import Editor from "./Admin/Editor";

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

          <ToastContainer />
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Category" element={<CategoryCatalogue />} />
            <Route path="/Article" element={<ArticlePage />} />

            {/* ADMIN */}
            {sharedStore.user && (
              <>
                <Route path="/ArticleList" element={<ArticleList />} />
                <Route path="/Editor" element={<Editor />} />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
