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
  getArticlesForId: (id: number) => {
    return requests.get("article/getByCategory/" + id);
  },
  getArticlesForUserId: (id: number) => {
    return requests.get("article/getByAuthorId/" + id);
  },
  getLatestArticles: () => {
    return requests.get("article?size=10");
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
      getArticlesForId: action,
      getArticlesForUserId: action,
      latestArticles: action,
      //dataQueries
      getCategories: action,
      createOrEditArticle: action,

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

  latestArticles = async () => {
    try {
      const response = await apiActions.getLatestArticles();
      this.articleList = response.content;
    } catch (error) {
      toast("Došlo je do greške prilikom dohvaćanja članaka");
    }
  };

  appendImages = (items: Article[]) => {};

  getArticlesForId = async (id: number) => {
    try {
      const response = await apiActions.getArticlesForId(id);
      this.articleList = response.content;
    } catch (error) {
      toast("Došlo je do greške prilikom dohvaćanja članaka");
    }
  };
  getArticlesForUserId = async (id: number) => {
    try {
      const response = await apiActions.getArticlesForUserId(id);
      this.articleList = response.content;
    } catch (error) {
      toast("Došlo je do greške prilikom dohvaćanja članaka");
    }
  };
  setSelectedCategory = (x: Category | undefined) => {
    this.selectedCategory = x;
  };

  createOrEditArticle = async (data: Article) => {
    try {
      toast(await apiActions.createOrEditArticle(data));
    } catch (error) {}
  };
  deleteArticle = (data: number) => {
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
