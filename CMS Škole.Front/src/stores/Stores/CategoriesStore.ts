import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import { toast } from "react-toastify";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

const apiActions = {
  createOrEditArticle: (article: Article) => {
    return requests.post(`article/save`, article);
  },
  getCategories: () => {
    return requests.get("category/getSuperCategories");
  },
};

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
      createArticle: action,
      editArticle: action,
      deleteArticle: action,

      //Calculated values: computed
    });
  }

  getCategories = async () => {
    try {
      this.categories = await apiActions.getCategories();
    } catch {
      toast("Došlo je do greške prilikom dohvata kategorija");
    }
  };

  latestArticles = () => {};
  getArticles = (Category?: Category, User?: User) => {
    /* DELETE ME */
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
    if (this.articleList) {
      let local = this.articleList.map((x) => {
        if (x.id === data.id) {
          return data;
        } else return x;
      });
      this.articleList = local;
    }
    console.log(data.html);
    toast('"' + data.title + '"je bio uspješno izmijenjen');
  };
  createArticle = async (data: Article) => {
    try {
      toast(await apiActions.createOrEditArticle(data));
    } catch (error) {}
  };
  deleteArticle = (data: string) => {
    /* DELETE */
    if (this.articleList) {
      let local = this.articleList.filter((x) => {
        return x.id !== data;
      });

      this.articleList = local;
      toast("Objava uspješno obrisana!");
    }
  };
}
