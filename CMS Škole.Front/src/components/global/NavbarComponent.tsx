import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";
import { Icon } from "@iconify/react";

function NavbarComponent() {
  const navbarPreflight = useRef(true);
  useEffect(() => {
    if (navbarPreflight.current) {
      navbarPreflight.current = false;
      categoriesStore.getCategories();
    }
  }, []);

  const { categoriesStore } = useStore();
  const [openFlag, setOpenFlag] = useState<Category | null>(null);

  return (
    <>
      <nav
        className="navBarWrapper PCView"
        onMouseLeave={() => setOpenFlag(null)}
      >
        <section className="navBarHeader">
          <span>
            <Link to={"/Home"} onMouseEnter={() => setOpenFlag(null)}>
              Početna
            </Link>
          </span>
          {(() => {
            return categoriesStore.categories.map((x, index) => (
              <Link
                to={"/Category"}
                onMouseEnter={() => setOpenFlag(x)}
                onClick={() => {
                  setOpenFlag(x);
                  categoriesStore.setSelectedCategory(x);
                }}
                key={"category" + index}
              >
                <span>{x.name}<Icon icon="bxs:chevron-down" /></span>
              </Link>
            ));
          })()}
        </section>
        <section
          className="navBar"
          style={openFlag ? { opacity: 1, padding: "5%" } : { opacity: 0 }}
        >
          {(() => {
            return openFlag?.subCategories?.map((x, index) => (
              <span
                className="subCategoryItem"
                key={"subCategory" + index + x.name}
              >
                <Link
                  to="/Category"
                  onClick={() => categoriesStore.setSelectedCategory(x)}
                >
                  {x.name}
                </Link>
              </span>
            ));
          })()}
        </section>
      </nav>
      <nav className="navBarWrapper MobileView">
        <section className="navBarHeader">
          <button onClick={() => setOpenFlag({} as Category)}>test</button>
          <button onClick={() => setOpenFlag(null)}>test</button>
        </section>
        <section
          className="navBar"
          style={
            openFlag
              ? { opacity: 1, padding: "5%", width: "100%" }
              : { opacity: 0, width: 0 }
          }
        >
          {(() => {
            return categoriesStore.categories.map((x, index) => (
              <>
                <span>
                  <Link
                    to={"/Category"}
                    onMouseEnter={() => setOpenFlag(x)}
                    onClick={() => {
                      setOpenFlag(x);
                      categoriesStore.setSelectedCategory(x);
                    }}
                    key={"category" + index}
                  >
                    {x.name}
                  </Link>
                </span>
                <hr />
                <br />
                {(() => {
                  return x.subCategories?.map((y, index) => (
                    <span
                      className="subCategoryItem"
                      key={"subCategory" + index + y.name}
                    >
                      <Link
                        to="/Category"
                        onClick={() => categoriesStore.setSelectedCategory(y)}
                      >
                        {y.name}
                      </Link>
                    </span>
                  ));
                })()}
                <br />
              </>
            ));
          })()}
        </section>
      </nav>
    </>
  );
}

export default observer(NavbarComponent);
