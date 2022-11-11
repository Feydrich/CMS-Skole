import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../stores/StoreManager";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

function LegendComponent() {
  const legendPreflight = useRef(true);

  useEffect(() => {
    if (legendPreflight.current) {
      legendPreflight.current = false;
    }
  }, []);
  const { sharedStore } = useStore();

  // TODO postaviti prijava / odjava
  return (
    <div className="legend">
      <Link to="/">
        <h1>{sharedStore.siteSettings.name}</h1>
      </Link>
      <div className="items">
        <Button
          onClick={() => sharedStore.setLoginIsOpen(!sharedStore.loginIsOpen)}
        >
          {sharedStore.user ? (
            sharedStore.user.name
          ) : (
            <>
              <Icon icon="akar-icons:lock-off" />
              Prijava
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default observer(LegendComponent);
