import { action, makeObservable, observable, runInAction } from "mobx";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";
import CategoriesStore from "./CategoriesStore";

const apiActions = {
  testAxios: () => {
    // return requests.get(`category`);
  },
};

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
      setArticleForCreation: action,
      setArticleForEdit: action,

      //dataQueries
      getSelectedArticles: action,

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
  setArticleForCreation = (data: Article) => {
    this.articleForEdit = data;
  };
}
