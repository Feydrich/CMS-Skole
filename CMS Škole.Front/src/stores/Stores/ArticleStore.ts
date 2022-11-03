import { action, makeObservable, observable, runInAction } from "mobx";
import { fakeArticles, fakeCategories } from "../../helper/dummyData";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

const apiActions = {};

export default class ArticleStore {
  selectedArticle: Article | undefined = undefined;

  constructor() {
    makeObservable(this, {
      //Variables: observable
      selectedArticle: observable,

      //Methods: action

      //dataQueries
      getSelectedArticles: action,

      //Calculated values: computed
    });
  }

  getSelectedArticles = (id: string) => {
    this.selectedArticle = fakeArticles.find((x) => x.id === id);
  };
}
