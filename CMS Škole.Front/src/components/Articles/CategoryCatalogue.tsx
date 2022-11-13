import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";
import ArticleCard from "./ArticleCard";

function CategoryCatalogue() {
  const categoryCataloguePreflight = useRef(true);

  const { categoriesStore } = useStore();

  useEffect(() => {
    if (categoryCataloguePreflight.current) {
      categoryCataloguePreflight.current = false;
      !categoriesStore.articleList &&
        categoriesStore.getArticles({} as Category);
    }
  }, []);

  return (
    <main>
      <h1 className="categoryTitle">{categoriesStore.selectedCategory!.name}</h1>
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

      <div className="item-info">
        <div className="sideNav">
          <ul>
            {categoriesStore.selectedCategory!.subCategories && (
              <div className="subCategoryNav">
                {categoriesStore.selectedCategory!.subCategories.map(
                  (x, index) => (
                    <li className="sideNavLi" key={"subCategoryNav" + index}>
                      <Link
                        className="sideNavLink"
                        to={"/Category"}
                        //className={"subCategoryItem"}
                        onClick={() => {
                          categoriesStore.setSelectedCategory(x);
                        }}
                      >
                        {x.name}
                      </Link>
                    </li>
                  )
                )}
              </div>
            )}
          </ul>
        </div>

        <div className="singleItemContent">
          {categoriesStore.articleList?.map((x, index) => (
            <ArticleCard key={"articleCard" + index} article={x} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default observer(CategoryCatalogue);
