import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../models/Category";
import { useStore } from "../../stores/StoreManager";
import ArticleCard from "../Articles/ArticleCard";

function AuthorList() {
  const authorListPreflight = useRef(true);

  const { sharedStore, categoriesStore } = useStore();

  useEffect(() => {
    if (authorListPreflight.current) {
      authorListPreflight.current = false;
      !sharedStore.userList && sharedStore.getUsers();
    }
  }, []);

  return (
    <main>
      <h1>Popis korisnika</h1>
      {categoriesStore.articleList?.map((x) => (
        <ArticleCard article={x} />
      ))}
    </main>
  );
}

export default observer(AuthorList);
