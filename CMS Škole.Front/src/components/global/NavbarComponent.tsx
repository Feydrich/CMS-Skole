import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";

function NavbarComponent() {
  const navbarPreflight = useRef(true);
  useEffect(() => {
    if (navbarPreflight.current) {
      navbarPreflight.current = false;
      categoriesStore.getCategories();
    }
  }, []);

  const { categoriesStore } = useStore();
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  return (
    <nav
      className="navBarWrapper"
      onMouseLeave={() => setHoveredCategory(null)}
    >
      <section className="navBarHeader">
        <span>
          <Link to={"/Home"} onMouseEnter={() => setHoveredCategory(null)}>
            Početna
          </Link>
        </span>
        {(() => {
          return categoriesStore.categories.map((x, index) => (
            <span>
              <Link
                to={"/Category"}
                onMouseEnter={() => setHoveredCategory(x)}
                onClick={() => {
                  setHoveredCategory(x);
                  categoriesStore.setSelectedCategory(x);
                }}
                key={"category" + index}
              >
                {x.name}
              </Link>
            </span>
          ));
        })()}
      </section>
      <section
        className="navBar"
        style={
          hoveredCategory
            ? { height: "200px", opacity: 1, padding: "5%" }
            : { height: "0px", opacity: 0 }
        }
      >
        {(() => {
          return hoveredCategory?.subCategories?.map((x, index) => (
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
  );
}

export default observer(NavbarComponent);
