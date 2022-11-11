import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";
import ArticleCard from "../Articles/ArticleCard";

function ArticleList() {
  const articleListPreflight = useRef(true);
  const navigate = useNavigate();

  const { sharedStore, categoriesStore, articleStore } = useStore();

  useEffect(() => {
    if (articleListPreflight.current) {
      articleListPreflight.current = false;
      sharedStore.user &&
        /* DELETE */
        !categoriesStore.articleList &&
        categoriesStore.getArticles({} as Category, sharedStore.user);
    }
  }, []);

  return (
    <main>
      <section className="crudHeader">
        <Button
          onClick={() => {
            articleStore.setArticleForCreation({} as Article);
            navigate("/Editor");
          }}
        >
          Dodaj novo
        </Button>
      </section>
      {categoriesStore.articleList
        ?.filter((x) => x.author.name === sharedStore.user?.name)
        .map((x) => (
          <ArticleCard article={x} />
        ))}
    </main>
  );
}

export default observer(ArticleList);
