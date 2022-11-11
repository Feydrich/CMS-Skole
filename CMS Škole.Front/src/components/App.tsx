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
import React from "react";
import Loading from "./global/Loading";
import FooterComponent from "./global/FooterComponent";

const ArticleList = React.lazy(() => import("./Admin/ArticleList"));
const Editor = React.lazy(() => import("./Admin/Editor"));
const UserList = React.lazy(() => import("./Admin/UserList"));
const SiteSettings = React.lazy(() => import("./Admin/SiteSettings"));

function App() {
  const appPreFlight = useRef(true);

  const { sharedStore } = useStore();
  useEffect(() => {
    if (appPreFlight.current) {
      appPreFlight.current = false;
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty(
      "--primary-color",
      sharedStore.siteSettings.colorSchemes.primaryColor
    );
    root?.style.setProperty(
      "--primary-color-dark",
      sharedStore.siteSettings.colorSchemes.primaryColorDark
    );
    root?.style.setProperty(
      "--primary-color-transparent",
      sharedStore.siteSettings.colorSchemes.primaryColorTransparent
    );
    root?.style.setProperty(
      "--secondary-color",
      sharedStore.siteSettings.colorSchemes.secondaryColor
    );
    root?.style.setProperty(
      "--secondary-color-dark",
      sharedStore.siteSettings.colorSchemes.secondaryColorDark
    );
    root?.style.setProperty(
      "--background",
      sharedStore.siteSettings.colorSchemes.background
    );
    root?.style.setProperty(
      "--legend",
      sharedStore.siteSettings.colorSchemes.legend
    );
    //root?.style.setProperty("--text-color", darkTheme ? "#fff" : "#262833");
  }, [sharedStore.siteSettings.colorSchemes]);

  return (
    <>
      <BrowserRouter>
        <LegendComponent />
        <NavbarComponent />
        {sharedStore.loginIsOpen && <Login />}

        <div className="mainContent">
          <ToastContainer />
          <Routes>
            <Route path="*" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Category" element={<CategoryCatalogue />} />
            <Route path="/Article" element={<ArticlePage />} />

            {/* ADMIN */}
            {sharedStore.user && (
              <>
                <Route
                  path="/ArticleList"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <ArticleList />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/Editor"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <Editor />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/UserList"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <UserList />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/SiteSettings"
                  element={
                    <React.Suspense fallback={<Loading />}>
                      <SiteSettings />
                    </React.Suspense>
                  }
                />
              </>
            )}
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default observer(App);
