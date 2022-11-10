import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import { toast } from "react-toastify";
import { fakeArticles, fakeCategories } from "../../helper/dummyData";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

const apiActions = {};

export default class CategoriesStore {
  categories: Category[] | null = null;
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
      editArticle: action,
      createArticle: action,

      //Calculated values: computed
    });
  }

  getCategories = () => {
    this.categories = fakeCategories;
  };
  latestArticles = () => {
    /* DELETE ME */
    toast("latest");
    this.articleList = fakeArticles;
  };
  getArticles = (Category?: Category, User?: User) => {
    /* DELETE ME */
    toast("get");
    if (User && this.articleList) {
      let list = this.articleList.filter((x) => x.author.name === User.name);
      this.articleList = list;
    }
  };
  setSelectedCategory = (x: Category | undefined) => {
    this.selectedCategory = x;
  };
  editArticle = (data: Article) => {
    /* DELETE */
    toast("entered edit" + JSON.stringify(data));
    if (this.articleList) {
      let local = this.articleList.map((x) => {
        if (x.id === data.id) {
          return data;
        } else return x;
      });
      this.articleList = local;
    }
  };
  createArticle = (data: Article) => {
    /* DELETE */
    this.articleList?.push(data);
  };
}
