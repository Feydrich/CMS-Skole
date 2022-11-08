import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles/scss/styles.scss";
import "./styles/scss/responsive.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
