import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../stores/StoreManager";
import ArticleCard from "./Articles/ArticleCard";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Carousel from "./global/Carousel";
import { Button } from "react-bootstrap";
import { requests } from "../stores/agent";

function Home() {
  const homePreflight = useRef(true);

  const { sharedStore, categoriesStore } = useStore();

  useEffect(() => {
    if (homePreflight.current) {
      homePreflight.current = false;
      categoriesStore.getCategories();
      categoriesStore.latestArticles();
    }
  }, []);

  return (
    <main>
      <Carousel />
      <div className="dividerContainerIcons">
        <div className="dividerContent">
          <a href="#">
            <FontAwesomeIcon icon={faSchool} />
          </a>
          <p>O školi</p>
        </div>
        <div className="dividerContent">
          <a href="#">
            <FontAwesomeIcon icon={faBook} />
          </a>
          <p>Nastava</p>
        </div>
        <div className="dividerContent">
          <a href="#">
            <FontAwesomeIcon icon={faPeopleRoof} />
          </a>
          <p>Za roditelje</p>
        </div>
        <div className="dividerContent">
          <a href="#">
            <FontAwesomeIcon icon={faBullhorn} />
          </a>
          <p>Novosti</p>
        </div>
      </div>

      <div className="homeContainer">
        {categoriesStore.articleList &&
          (categoriesStore.articleList.length > 5
            ? categoriesStore.articleList
                .slice(0, 5)
                .map(
                  (x, index) =>
                    index < 5 && (
                      <ArticleCard key={"articleCard" + index} article={x} />
                    )
                )
            : categoriesStore.articleList
                .slice(0, categoriesStore.articleList.length)
                .map(
                  (x, index) =>
                    index < 5 && (
                      <ArticleCard key={"articleCard" + index} article={x} />
                    )
                ))}
      </div>

      <div className="dividerContainerImages">
        <div className="dividerImg">
          <img src={require("../styles/images/biologija.jpg")} />
        </div>
        <div className="dividerImg">
          <img src={require("../styles/images/svemir.jpg")} />
        </div>
        <div className="dividerImg">
          <img src={require("../styles/images/umjetnost.jpg")} />
        </div>
        <div className="dividerImg">
          <img src={require("../styles/images/smotra.jpg")} />
        </div>
      </div>

      <div className="homeContainer">
        {categoriesStore.articleList &&
          categoriesStore.articleList.length > 5 &&
          (categoriesStore.articleList.length < 10
            ? categoriesStore.articleList
                .slice(5, categoriesStore.articleList.length)
                .map(
                  (x, index) =>
                    index < 5 && (
                      <ArticleCard key={"articleCard" + index} article={x} />
                    )
                )
            : categoriesStore.articleList
                .slice(5, 10)
                .map(
                  (x, index) =>
                    index < 5 && (
                      <ArticleCard key={"articleCard" + index} article={x} />
                    )
                ))}
      </div>
    </main>
  );
}

export default observer(Home);
