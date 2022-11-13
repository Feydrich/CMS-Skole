import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Article } from "../../models/Article";
import { User } from "../../models/User";
import { useStore } from "../../stores/StoreManager";

interface IArticleCardProps {
  article: Article;
}

function ArticleCard({ article }: IArticleCardProps) {
  const { articleStore, sharedStore } = useStore();
  const navigate = useNavigate();
  const formattedDate =
    article.creationDate.getDate() +
    "." +
    article.creationDate.getMonth() +
    "." +
    article.creationDate.getFullYear() +
    ".";

  return (
    <>
      <div className="articleCard" key={"article" + article.id}>
        <div className="CRUDCardHeader">
          {article.author.name === sharedStore.user?.name && (
            <Button
              onClick={() => {
                articleStore.setArticleForEdit(article.id);
                navigate("/Editor");
              }}
            >
              Edit
            </Button>
          )}
        </div>
        <div
          onClick={() => {
            articleStore.getSelectedArticles(article.id);
            navigate("/Article");
          }}
        >
          <img src={article.image} />
          <div className="cardContent">
            <h2>{article.name}</h2>

            <h3>{article.author.name}</h3>
            <hr />
            <p>{article.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(ArticleCard);
