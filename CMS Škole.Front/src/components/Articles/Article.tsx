import { Markup } from "interweave";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Article } from "../../models/Article";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";

function ArticlePage() {
  const articlereflight = useRef(true);
  const { articleStore } = useStore();

  useEffect(() => {
    if (articlereflight.current) {
      articlereflight.current = false;
    }
  }, []);

  return (
    <main>
      <h1>{articleStore.selectedArticle?.name}</h1>
      <h3>Autor: {articleStore.selectedArticle?.author.name}</h3>
      <hr />
      <b>
        Objavljeno: {articleStore.selectedArticle?.creationDate.toDateString()}
      </b>
      <img src={articleStore.selectedArticle?.image} />

      <Markup content={articleStore.selectedArticle?.content} />
    </main>
  );
}

export default observer(ArticlePage);
