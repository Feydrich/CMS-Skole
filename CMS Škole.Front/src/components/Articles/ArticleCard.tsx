import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
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

  return (
    <>
      <div className="articleCard" key={"article" + article.id}>
        {/* {article.author.name === sharedStore.user?.name && (
          <span
            className="CRUDCardButton"
            onClick={() => {
              articleStore.setArticleForEdit(article.id);
              navigate("/Editor");
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </span>
        )} */}
        <div
          onClick={() => {
            articleStore.getSelectedArticle(article.id);
            navigate("/Article");
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <img src={article.image} />
          <div className="cardContent">
            <div id="title">
              <h2>{article.title}</h2>
            </div>
            <div id="content">
              <p>{article.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(ArticleCard);
