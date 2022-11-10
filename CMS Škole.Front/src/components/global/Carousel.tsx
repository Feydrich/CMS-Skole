import { observer } from "mobx-react-lite";
import { CSSProperties, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useStore } from "../../stores/StoreManager";

import "../../styles/scss/carousel.scss";

const placeholder = require("../../styles/images/placeholder.jpg");

function Carousel() {
  const appPreFlight = useRef(true);
  const { sharedStore } = useStore();

  useEffect(() => {
    if (appPreFlight.current) {
      appPreFlight.current = false;
      sharedStore.getImagesForCarousel();
    }
  }, []);

  const imageManager = (index: number) => {
    let url = "url(";
    if (
      sharedStore.siteSettings &&
      sharedStore.siteSettings.images &&
      sharedStore.siteSettings.images[index]
    ) {
      url += sharedStore.siteSettings.images[index] + ")";
    } else {
      url += placeholder + ")";
    }

    return url;
  };

  return (
    <>
      {sharedStore.siteSettings && (
        <section className="card">
          {sharedStore.siteSettings &&
            sharedStore.siteSettings.images &&
            sharedStore.siteSettings.images.map((x, index) => (
              <div
                className="card_part"
                key={"card" + index}
                style={
                  {
                    backgroundImage: "url(" + x + ")",
                    zIndex: sharedStore.siteSettings.images.length - index,
                    animationDelay: 7 * index + "s",
                  } as CSSProperties
                }
              ></div>
            ))}
        </section>
      )}
    </>
  );
}

export default observer(Carousel);
