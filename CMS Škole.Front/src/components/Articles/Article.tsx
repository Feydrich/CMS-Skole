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

  const navigate = useNavigate();

  useEffect(() => {
    if (articlereflight.current) {
      articlereflight.current = false;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!articleStore.selectedArticle) {
    //   navigate("Home");
    // }
  }, [articleStore]);

  return (
    <main>
      <div className="singleItemContent">
        {(articleStore.selectedArticle?.author?.id == sharedStore.user?.id ||
          sharedStore.user?.role?.name == "superAdmin") && (
          <span
            className="CRUDCardButton"
            onClick={() => {
              articleStore.selectedArticle &&
                articleStore.setArticleForEdit(
                  articleStore.selectedArticle.id,
                  articleStore.selectedArticle.images
                );
              navigate("/Editor");
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </span>
        )}
        <h1>{articleStore.selectedArticle?.title}</h1>
        <h3>Autor: {articleStore.selectedArticle?.author?.name}</h3>
        <hr />
        <b>
          Objavljeno:
          {JSON.stringify(articleStore.selectedArticle?.created)}
        </b>
        {!Array.isArray(articleStore.selectedArticle?.images) && (
          <img
            className="articleImage"
            src={articleStore.selectedArticle?.images}
          />
        )}

        <Markup content={articleStore.selectedArticle?.html} />
      </div>
    </main>
  );
}

export default observer(ArticlePage);
