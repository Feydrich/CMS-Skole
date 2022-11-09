import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../stores/StoreManager";
import { Icon } from "@iconify/react";
import Login from "./Login";

function LegendComponent() {
  const legendPreflight = useRef(true);

  useEffect(() => {
    if (legendPreflight.current) {
      legendPreflight.current = false;
    }
  }, []);
  const { sharedStore } = useStore();

  useEffect(() => {
    setLoginOpen(false);
  }, [sharedStore.user]);

  const [loginOpen, setLoginOpen] = useState(false);

  // TODO postaviti prijava / odjava
  return (
    <div className="legend">
      <h1>{sharedStore.siteSettings.name}</h1>
      <div className="items">
        <button onClick={() => setLoginOpen(!loginOpen)}>
          <Icon icon="akar-icons:lock-off" />
          {sharedStore.user ? sharedStore.user.name : "Prijava"}
        </button>
        {loginOpen && <Login />}
      </div>
    </div>
  );
}

export default observer(LegendComponent);
