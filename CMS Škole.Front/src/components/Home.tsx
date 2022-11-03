import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "../stores/StoreManager";
import ArticleCard from "./ArticleCard";

function Home() {
  const homePreflight = useRef(true);

  const { sharedStore, categoriesStore } = useStore();

  useEffect(() => {
    if (homePreflight.current) {
      homePreflight.current = false;
      categoriesStore.latestArticles();
    }
  }, []);

  return (
    <main>
      {categoriesStore.articleList?.map((x, index) => (
        <ArticleCard key={"articleCard" + index} article={x} />
      ))}
    </main>
  );
}

export default observer(Home);
