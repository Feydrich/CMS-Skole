import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useStore } from "../stores/StoreManager";
import ArticleCard from "./Articles/ArticleCard";
import Carousel from "./global/Carousel";

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
      <Carousel />
      {categoriesStore.articleList?.map((x, index) => (
        <ArticleCard key={"articleCard" + index} article={x} />
      ))}
      {categoriesStore.articleList?.map((x, index) => (
        <ArticleCard key={"articleCard" + index} article={x} />
      ))}
    </main>
  );
}

export default observer(Home);
