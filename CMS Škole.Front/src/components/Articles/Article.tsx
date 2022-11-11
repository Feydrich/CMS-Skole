import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Article } from "../../models/Article";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";
import { Link } from "react-router-dom";
import { Category } from "../../models/Category";


function ArticlePage() {
  const articlereflight = useRef(true);
  const { articleStore } = useStore();
  const { categoriesStore } = useStore();

  useEffect(() => {
    if (articlereflight.current) {
      articlereflight.current = false;
      categoriesStore.getArticles({} as Category);

    }
  }, []);

  return (
    <main>
      <div className="item-info">
        <div className="sideNav">
          <ul>
            {categoriesStore.selectedCategory!.subCategories && (
              <div className="subCategoryNav">
                {categoriesStore.selectedCategory!.subCategories.map((x, index) => (<li className="sideNavLi">
                  <Link className="sideNavLink"
                    to={"/Category"}
                    onClick={() => {
                      categoriesStore.setSelectedCategory(x);
                    }}
                    key={"subCategoryNav" + index}
                  >
                    {x.name}
                  </Link></li>

                ))}
              </div>
            )}
          </ul>
        </div>

        <div className="singleItemContent">

          <h1>{articleStore.selectedArticle?.name}</h1>
          <h3>Autor: {articleStore.selectedArticle?.author.name}</h3>
          <hr />
          <b>
            Objavljeno: {articleStore.selectedArticle?.creationDate.toDateString()}
          </b>
          <img src={articleStore.selectedArticle?.image} />

          {(() => {
            let x = [];
            for (let i = 0; i < 10; i++) {
              x.push(articleStore.selectedArticle?.description);
            }

            return x.map((y) => (
              <>
                <p>{y}</p>
                <br />
              </>
            ));
          })()}

        </div>
      </div>


    </main>
  );
}

export default observer(ArticlePage);
