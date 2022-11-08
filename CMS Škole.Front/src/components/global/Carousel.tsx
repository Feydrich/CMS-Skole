import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
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
      <section className="card">
        <div
          className="card_part card_part-one"
          style={{
            backgroundImage: imageManager(0),
          }}
        ></div>

        <div
          className="card_part card_part-two"
          style={{
            backgroundImage: imageManager(1),
          }}
        ></div>

        <div
          className="card_part card_part-three"
          style={{
            backgroundImage: imageManager(2),
          }}
        ></div>

        <div
          className="card_part card_part-four"
          style={{
            backgroundImage: imageManager(3),
          }}
        ></div>
      </section>
    </>
  );
}

export default observer(Carousel);
