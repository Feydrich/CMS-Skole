import { action, makeObservable, observable, runInAction } from "mobx";
import { fakeArticles, fakeCategories } from "../../helper/dummyData";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";
import CategoriesStore from "./CategoriesStore";

const apiActions = {};

export default class ArticleStore {
  selectedArticle: Article | undefined = undefined;
  articleForEdit: Article | undefined = undefined;
  categoryStore: CategoriesStore;

  constructor(categoryStore: CategoriesStore) {
    this.categoryStore = categoryStore;
    makeObservable(this, {
      //Variables: observable
      selectedArticle: observable,
      articleForEdit: observable,

      //Methods: action

      //dataQueries
      getSelectedArticles: action,
      setArticleForEdit: action,

      //Calculated values: computed
    });
  }

  /* FIX */
  getSelectedArticles = (id: string) => {
    this.categoryStore.articleList &&
      (this.selectedArticle = this.categoryStore.articleList.find(
        (x) => x.id === id
      ));
  };
  setArticleForEdit = (id: string) => {
    this.categoryStore.articleList &&
      (this.articleForEdit = this.categoryStore.articleList.find(
        (x) => x.id === id
      ));
  };
}
