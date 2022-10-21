import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "../stores/StoreManager";
import Login from "./global/Login";
import NavbarComponent from "./global/NavbarComponent";
import Home from "./Home";
import Test from "./Test";

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
        {sharedStore.user ? (
          <>
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default observer(App);
