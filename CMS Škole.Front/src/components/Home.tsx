import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { useStore } from "../stores/StoreManager";
import ArticleCard from "./Articles/ArticleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import Carousel from "./global/Carousel";

function Home() {
  const homePreflight = useRef(true);

  const { sharedStore, categoriesStore } = useStore();

  useEffect(() => {
    if (homePreflight.current) {
      homePreflight.current = false;
      categoriesStore.getCategories();
      categoriesStore.latestArticles();
      sharedStore.getAds();
    }
  }, []);

  return (
    <main>
      <Carousel />
      <div className="dividerContainerAds">
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
        {sharedStore.ads.map((x) => (
          <a
            className="dividerContent"
            href={x.link}
            style={{ backgroundImage: "url(" + x.image + ")" }}
          ></a>
        ))}
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
