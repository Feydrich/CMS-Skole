import { Button } from "@mui/material";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";
import ArticleCard from "../Articles/ArticleCard";

function ArticleList() {
  const navigate = useNavigate();

  const { sharedStore, categoriesStore, articleStore } = useStore();

  useEffect(() => {
    sharedStore.user &&
      sharedStore.user.id &&
      categoriesStore.getArticlesForUserId(sharedStore.user.id);
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
      {categoriesStore.articleList?.map((x, index) => (
        <ArticleCard key={"card" + index} article={x} />
      ))}
    </main>
  );
}

export default observer(ArticleList);
