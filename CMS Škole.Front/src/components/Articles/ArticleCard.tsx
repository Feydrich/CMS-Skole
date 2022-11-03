import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Article } from "../../models/Article";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";

interface IArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: IArticleCardProps) {
  const { articleStore } = useStore();
  const navigate = useNavigate();
  return (
    <div
      className="articleCard"
      onClick={() => {
        articleStore.getSelectedArticles(article.id);
        navigate("/Article");
      }}
    >
      <img src={article.image} />
      <h2>{article.name}</h2>
      <h3>{article.author.name}</h3>
      <hr />
      <p>{article.description}</p>
    </div>
  );
}

export default observer(ArticleCard);
