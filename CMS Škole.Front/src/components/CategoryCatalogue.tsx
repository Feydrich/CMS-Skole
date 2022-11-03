import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Category } from "../models/Category";
import { useStore } from "../stores/StoreManager";
import ArticleCard from "./Articles/ArticleCard";

function CategoryCatalogue() {
  const categoryCataloguePreflight = useRef(true);

  const { categoriesStore } = useStore();

  useEffect(() => {
    if (categoryCataloguePreflight.current) {
      categoryCataloguePreflight.current = false;
      categoriesStore.getArticles({} as Category);
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

      {categoriesStore.articleList?.map((x, index) => (
        <ArticleCard key={"articleCard" + index} article={x} />
      ))}
    </main>
  );
}

export default observer(CategoryCatalogue);
