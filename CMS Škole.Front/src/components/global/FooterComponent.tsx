import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Category } from "../../models/Category";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import "../../styles/scss/styles.scss";
import { useStore } from "../../stores/StoreManager";

function FooterComponent() {
  const footerPreflight = useRef(true);
  useEffect(() => {
    if (footerPreflight.current) {
      footerPreflight.current = false;
      categoriesStore.getCategories();
    }
  }, []);
  const { sharedStore, categoriesStore } = useStore();

  return (
    <footer>
      <div className="footer-info">
        <div className="footer-info-left">
          <h6 className="footerTitle">O nama</h6>
          <p className="footerAbout">{sharedStore.siteSettings.description}</p>
        </div>
        <div className="footer-info-center">
          <h6 className="footerTitle">Kategorije</h6>
          <ul>
            {(() => {
              return categoriesStore.categories?.map((x, index) => (
                <li key={"categoryLi" + index}>
                  <Link
                    to={"/Category"}
                    onClick={() => {
                      categoriesStore.setSelectedCategory(x);
                    }}
                  >
                    {x.name}
                  </Link>
                </li>
              ));
            })()}
          </ul>
        </div>
        <div className="footer-info-right">
          <h6 className="footerTitle">Brzi linkovi</h6>
          <ul>
            <li key="f1">
              <a href="#">About Us</a>
            </li>
            <li key="f2">
              <a href="#">Contact Us</a>
            </li>
            <li key="f3">
              <a href="#">Contribute</a>
            </li>
            <li key="f4">
              <a href="#">Privacy Policy</a>
            </li>
            <li key="f5">
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-info">
        Copyright &copy; 2022 Sva prava pridržana od strane &nbsp;
        <a href="#"> TVZ</a>.
      </p>
    </footer>
  );
}

export default observer(FooterComponent);
