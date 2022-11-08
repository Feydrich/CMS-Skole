import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../stores/StoreManager";
import { Icon } from '@iconify/react';

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
      <h1>{sharedStore.siteSettings.name}</h1>
      <div className="items">
        <button>Item</button>
        <button><Icon icon="akar-icons:lock-off" />Prijava</button>
      </div>
    </div>
  );
}

export default observer(LegendComponent);
