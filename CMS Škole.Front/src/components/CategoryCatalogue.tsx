import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../stores/StoreManager";

function CategoryCatalogue() {
  const categoryCataloguePreflight = useRef(true);

  const { categoriesStore } = useStore();

  useEffect(() => {
    if (categoryCataloguePreflight.current) {
      categoryCataloguePreflight.current = false;
    }
  }, []);

  return (
    <main>
      <h1>{categoriesStore.selectedCategory!.name}</h1>
      {categoriesStore.selectedCategory!.parentCategory && (
        <Link
          to={"/Category"}
          onClick={() => {
            categoriesStore.setSelectedCategory(
              categoriesStore.selectedCategory!.parentCategory
            );
          }}
        >
          {categoriesStore.selectedCategory!.parentCategory.name}
        </Link>
      )}
      <hr />
      {categoriesStore.selectedCategory!.subCategories && (
        <section className="subCategoryCatalogue">
          {categoriesStore.selectedCategory!.subCategories.map((x, index) => (
            <Link
              to={"/Category"}
              //className={"subCategoryItem"}
              onClick={() => {
                categoriesStore.setSelectedCategory(x);
              }}
              key={"subCategoryCatalogue" + index}
            >
              {x.name}
            </Link>
          ))}
        </section>
      )}
      <hr />
    </main>
  );
}

export default observer(CategoryCatalogue);
