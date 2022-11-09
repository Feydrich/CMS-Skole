import { action, makeObservable, observable, runInAction } from "mobx";
import { fakeArticles, fakeCategories } from "../../helper/dummyData";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

const apiActions = {};

export default class CategoriesStore {
  categories: Category[] = [];
  selectedCategory: Category | undefined = undefined;
  articleList: Article[] | null = null;

  constructor() {
    makeObservable(this, {
      //Variables: observable
      categories: observable,
      selectedCategory: observable,
      articleList: observable,

      //Methods: action
      setSelectedCategory: action,
      getArticles: action,
      latestArticles: action,
      //dataQueries
      getCategories: action,

      //Calculated values: computed
    });
  }

  getCategories = () => {
    this.categories = fakeCategories;
  };
  latestArticles = () => {
    this.articleList = fakeArticles;
  };
  getArticles = (Category?: Category, User?: User) => {
    const randomCase = Math.floor(Math.random() * 2);
    let local: Article[] = [];
    switch (randomCase) {
      case 0:
        fakeArticles.forEach((x, index) => {
          if ((index + 1) % 2 == 0) local.push(x);
        });

        break;
      case 1:
        fakeArticles.forEach((x, index) => {
          if ((index + 1) % 2 == 1) local.push(x);
        });
        break;
    }
    this.articleList = local;

    /* DELETE ME */
    if (User) {
      let list = fakeArticles.filter((x) => x.author.name === User.name);
      this.articleList = list;
    }
  };
  setSelectedCategory = (x: Category | undefined) => {
    this.selectedCategory = x;
  };
}
