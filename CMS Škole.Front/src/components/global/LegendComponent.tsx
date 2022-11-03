import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../../stores/StoreManager";

function LegendComponent() {
  const legendPreflight = useRef(true);
  useEffect(() => {
    if (legendPreflight.current) {
      legendPreflight.current = false;
    }
  }, []);

  const { sharedStore } = useStore();

  return (
    <div className="legend">
      <span>{sharedStore.siteSettings.name}</span>
      <span>items</span>
    </div>
  );
}

export default observer(LegendComponent);
