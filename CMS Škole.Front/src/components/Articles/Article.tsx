import { Markup } from "interweave";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useStore } from "../../stores/StoreManager";
import { Link, useNavigate } from "react-router-dom";
import { Category } from "../../models/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function ArticlePage() {
  const articlereflight = useRef(true);
  const { articleStore, sharedStore } = useStore();
  const { categoriesStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (articlereflight.current) {
      articlereflight.current = false;
      categoriesStore.getArticles({} as Category);
      articleStore.testArticle();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!articleStore.selectedArticle) {
      navigate("Home");
    }
  }, [articleStore]);

  return (
    <main>
      <div className="singleItemContent">
        {articleStore.selectedArticle?.author.name ===
          sharedStore.user?.name && (
          <span
            className="CRUDCardButton"
            onClick={() => {
              articleStore.selectedArticle &&
                articleStore.setArticleForEdit(articleStore.selectedArticle.id);
              navigate("/Editor");
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </span>
        )}
        <h1>{articleStore.selectedArticle?.name}</h1>
        <h3>Autor: {articleStore.selectedArticle?.author.name}</h3>
        <hr />
        <b>
          Objavljeno:
          {articleStore.selectedArticle?.creationDate.toDateString()}
        </b>
        <img
          className="articleImage"
          src={articleStore.selectedArticle?.image}
        />

        <Markup content={articleStore.selectedArticle?.content} />
      </div>
    </main>
  );
}

export default observer(ArticlePage);
