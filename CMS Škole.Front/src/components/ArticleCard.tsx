import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Article } from "../models/Article";
import { User } from "../models/User";

interface IArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: IArticleCardProps) {
  return (
    <div className="articleCard">
      <img src={article.image} />
      <h2>{article.name}</h2>
      <h3>{article.author.name}</h3>
      <hr />
      <p>{article.description}</p>
    </div>
  );
}

export default observer(ArticleCard);
