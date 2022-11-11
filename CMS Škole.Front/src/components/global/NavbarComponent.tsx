import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

function NavbarComponent() {
  const navbarPreflight = useRef(true);
  useEffect(() => {
    if (navbarPreflight.current) {
      navbarPreflight.current = false;
      categoriesStore.getCategories();
    }
  }, []);

  const { sharedStore, categoriesStore } = useStore();
  const [openFlag, setOpenFlag] = useState<Category | null>(null);

  useEffect(() => {
    setOpenFlag(null);
  }, [categoriesStore.selectedCategory]);
  useEffect(() => {
    sharedStore.setLoginIsOpen(false);
  }, [sharedStore.user]);

  const animateHamburger = (e: HTMLButtonElement) => {
    let top = e.getElementsByClassName("top")[0] as HTMLElement;
    let middle = e.getElementsByClassName("middle")[0] as HTMLElement;
    let bottom = e.getElementsByClassName("bottom")[0] as HTMLElement;

    if (openFlag) {
      top.style.transform = "";
      top.style.top = "0";

      middle.style.transform = "";
      middle.style.left = "0";

      bottom.style.transform = "";
      bottom.style.top = "20px";

      setOpenFlag(null);
    } else {
      top.style.transform = "rotate(-30deg)";
      top.style.top = "3px";

      middle.style.transform = "rotate(90deg)";
      middle.style.left = "12px";

      bottom.style.transform = "rotate(30deg)";
      bottom.style.top = "17px";

      setOpenFlag({} as Category);
    }
  };

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
            if (categoriesStore.categories)
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
                  <span>
                    {x.name}
                    <Icon icon="bxs:chevron-down" />
                  </span>
                </Link>
              ));
          })()}
        </section>
        <section
          className="navBar"
          style={
            openFlag
              ? { opacity: 1, padding: "5%" }
              : { opacity: 0, pointerEvents: "none" }
          }
        >
          {(() => {
            return openFlag?.subCategories?.map((x, index) => (
              <Link
                className="subCategoryItem"
                key={"subCategory" + index + x.name}
                to="/Category"
                onClick={() => categoriesStore.setSelectedCategory(x)}
              >
                <span>{x.name}</span>
              </Link>
            ));
          })()}
        </section>
      </nav>
      <nav className="navBarWrapper MobileView">
        <section className="navBarHeader">
          <button
            onClick={(e) => animateHamburger(e.currentTarget)}
            className="hamburgerMenu"
          >
            <div className="top"></div>
            <div className="middle"></div>
            <div className="bottom"></div>
          </button>
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
        </section>
        <section
          className="navBar"
          style={
            openFlag
              ? { opacity: 1, padding: "5%", width: "100%" }
              : { opacity: 0, width: 0, pointerEvents: "none" }
          }
        >
          <span key={"categoryMobile1"}>
            <Link to={"/Home"} onClick={() => setOpenFlag(null)}>
              Početna
            </Link>
          </span>
          {(() => {
            if (categoriesStore.categories)
              return categoriesStore.categories.map((x, index) => (
                <div className="mobileWrapper" key={"mobileWrapper" + index}>
                  <hr />
                  <br />
                  <span key={"categoryMobile2" + index}>
                    <Link
                      to={"/Category"}
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
                </div>
              ));
          })()}
        </section>
      </nav>
    </>
  );
}

export default observer(NavbarComponent);
