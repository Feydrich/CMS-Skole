import { action, makeObservable, observable, runInAction } from "mobx";
import { fakeCategories } from "../../helper/dummyData";
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
      //dataQueries
      getCategories: action,

      //Calculated values: computed
    });
  }

  getCategories = () => {
    this.categories = fakeCategories;
  };
  getArticles = () => {
    this.articleList = fakeArticles;
  };
  setSelectedCategory = (x: Category | undefined) => {
    this.selectedCategory = x;
  };
}
