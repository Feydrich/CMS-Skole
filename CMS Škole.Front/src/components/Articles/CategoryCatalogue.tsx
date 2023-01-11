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
    }
  }, []);

  useEffect(() => {
    categoriesStore.selectedCategory &&
      categoriesStore.getArticlesForId(categoriesStore.selectedCategory.id);
  }, [categoriesStore.selectedCategory]);

  return (
    <main>
      <h1 className="categoryTitle">
        {categoriesStore.selectedCategory?.name}
      </h1>

      <div className="item-info">
        {categoriesStore.selectedCategory!.subCategories && (
          <div className="sideNav">
            <ul>
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
            </ul>
          </div>
        )}

        <div
          className="singleItemContent"
          style={{
            width: categoriesStore.selectedCategory!.subCategories
              ? "80%"
              : "100%",
          }}
        >
          {categoriesStore.articleList?.map((x, index) => (
            <ArticleCard key={"articleCard" + index} article={x} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default observer(CategoryCatalogue);
