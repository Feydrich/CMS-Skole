import { Markup } from "interweave";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
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
        {categoriesStore.selectedCategory?.subCategories && (
          <div className="sideNav">
            <ul>
              <div className="subCategoryNav">
                {categoriesStore.selectedCategory?.subCategories?.map(
                  (x, index) => (
                    <li key={"subCategoryNav" + index} className="sideNavLi">
                      <Link
                        className="sideNavLink"
                        to={"/Category"}
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

        <div className="singleItemContent">
          <h1>{articleStore.selectedArticle?.name}</h1>
          <h3>Autor: {articleStore.selectedArticle?.author.name}</h3>
          <hr />
          <b>
            Objavljeno:{" "}
            {articleStore.selectedArticle?.creationDate.toDateString()}
          </b>
          <img src={articleStore.selectedArticle?.image} />

          <Markup content={articleStore.selectedArticle?.content} />
        </div>
      </div>
    </main>
  );
}

export default observer(ArticlePage);
