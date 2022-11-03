import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { User } from "../models/User";

interface IArticleCardProps {
  name: string;
  creationDate: Date;
  content: string;
  author: User;
}

function ArticleCard(props: IArticleCardProps) {
  return <div className="articleCard"></div>;
}

export default observer(ArticleCard);
