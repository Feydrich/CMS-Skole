import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";
import ArticleCard from "../Articles/ArticleCard";

function ArticleList() {
  const categoryCataloguePreflight = useRef(true);

  const { sharedStore, categoriesStore } = useStore();

  useEffect(() => {
    if (categoryCataloguePreflight.current) {
      categoryCataloguePreflight.current = false;
      sharedStore.user &&
        categoriesStore.getArticles({} as Category, sharedStore.user);
    }
  }, []);

  return (
    <main>
      <section className="crudHeader">
        <button>Dodaj novo</button>
      </section>
      <h1>Vaše objave</h1>
      {categoriesStore.articleList?.map((x) => (
        <ArticleCard article={x} />
      ))}
    </main>
  );
}

export default observer(ArticleList);
