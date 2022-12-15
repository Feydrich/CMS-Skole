import { action, makeObservable, observable, runInAction } from "mobx";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";
import CategoriesStore from "./CategoriesStore";

const apiActions = {
  getArticleById: (id: number) => {
    return requests.get("article/" + id);
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
      // setArticleForEdit: action,

      //dataQueries
      getSelectedArticle: action,

      //Calculated values: computed
    });
  }

  /* FIX */
  getSelectedArticle = async (id: number) => {
    try {
      this.selectedArticle = await apiActions.getArticleById(id);
    } catch (error) {}
  };
  // setArticleForEdit = (id: string) => {
  //   this.categoryStore.articleList &&
  //     (this.articleForEdit = this.categoryStore.articleList.find(
  //       (x) => x.id === id
  //     ));
  // };
  setArticleForCreation = (data: Article) => {
    this.articleForEdit = data;
  };
}
