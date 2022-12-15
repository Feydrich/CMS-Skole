import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
  toJS,
} from "mobx";
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
  getImageById: (id: number) => {
    return requests.get("image/" + id, { responseType: "blob" });
  },
  getLatestArticles: () => {
    return requests.get("article?size=10&sort=created%2CDESC");
  },
  uploadImage: (id: number, file: any, id2: number) => {
    return requests.post("image/save?article=" + id + "&webPage=" + id2, file);
  },
  deleteArticle: (id: number) => {},
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
      appendImages: action,
      uploadImage: action,

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

  appendImages = async (items: Article[]) => {
    try {
      if (Array.isArray(items)) {
        for (let i = 0; i < items.length; i++) {
          if (Array.isArray(items[i].images) && items[i].images.length > 0) {
            if (items[i].images[0].id) {
              items[i].images = URL.createObjectURL(
                await apiActions.getImageById(items[i].images[0].id)
              );
            }
          }
        }
      }
    } catch (error) {
      toast("Došlo je do greške prilikom dohvata slika za članke");
    }
    return items;
  };

  uploadImage = async (id: number, data: any, id2: number) => {
    try {
      let file = new FormData();

      file.append("file", data);
      await apiActions.uploadImage(id, file, id2);
    } catch (error) {
      toast("Došlo je do greške prilikom učitavanja slike");
    }
  };

  latestArticles = async () => {
    try {
      const response = await apiActions.getLatestArticles();
      this.articleList = await this.appendImages(response.content);
    } catch (error) {
      toast("Došlo je do greške prilikom dohvaćanja članaka");
    }
  };

  getArticlesForId = async (id: number) => {
    try {
      const response = await apiActions.getArticlesForId(id);
      this.articleList = await this.appendImages(response.content);
    } catch (error) {
      toast("Došlo je do greške prilikom dohvaćanja članaka");
    }
  };
  getArticlesForUserId = async (id: number) => {
    try {
      const response = await apiActions.getArticlesForUserId(id);
      this.articleList = await this.appendImages(response.content);
    } catch (error) {
      toast("Došlo je do greške prilikom dohvaćanja članaka");
    }
  };
  setSelectedCategory = (x: Category | undefined) => {
    this.selectedCategory = x;
  };

  createOrEditArticle = async (data: Article, image?: any) => {
    try {
      if (!image || data.images) {
        delete data.images;
      }
      const response = await apiActions.createOrEditArticle(data);
      if (response.id && response.category.id && image) {
        this.uploadImage(response.id, image, response.category.id);
      }
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
