import { action, makeObservable, observable } from "mobx";
import { toast } from "react-toastify";
import { Article } from "../../models/Article";
import { Category } from "../../models/Category";
import { requests } from "../agent";

const apiActions = {
  createOrEditArticle: (article: Article) => {
    return requests.post(`article/save`, article);
  },
  addCategory: (data: {
    id?: number;
    name: string;
    superCategory?: { id: number };
  }) => {
    return requests.post("category/save", data);
  },
  deleteCategory: (id: number) => {
    return requests.delete("category?id=" + id);
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
  deleteArticle: (id: number) => {
    return requests.delete("article?id=" + id);
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
      addCategory: action,
      createOrEditArticle: action,

      deleteArticle: action,
      deleteCategory: action,
      appendImages: action,
      uploadImage: action,

      //Calculated values: computed
    });
  }

  getCategories = async () => {
    try {
      this.categories = await apiActions.getCategories();
    } catch {
      toast("Do??lo je do gre??ke prilikom dohvata kategorija");
    }
  };
  addCategory = async (data: {
    id?: number;
    name: string;
    superCategory?: { id: number };
  }) => {
    try {
      await apiActions.addCategory(data);
      toast("Naslov dodan!");
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom dodavanja kategorija");
    }
  };

  appendImages = async (items: Article[]) => {
    try {
      if (Array.isArray(items)) {
        for (let i = 0; i < items.length; i++) {
          if (Array.isArray(items[i].images) && items[i].images.length > 0) {
            if (items[i].images[items[i].images.length - 1].id) {
              items[i].images = URL.createObjectURL(
                await apiActions.getImageById(
                  items[i].images[items[i].images.length - 1].id
                )
              );
            }
          }
        }
      }
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom dohvata slika za ??lanke");
    }
    return items;
  };

  uploadImage = async (id: number, data: any, id2: number) => {
    try {
      let file = new FormData();

      file.append("file", data);
      await apiActions.uploadImage(id, file, id2);
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom u??itavanja slike");
    }
  };

  latestArticles = async () => {
    try {
      const response = await apiActions.getLatestArticles();
      this.articleList = await this.appendImages(response.content);
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom dohva??anja ??lanaka");
    }
  };

  getArticlesForId = async (id: number) => {
    try {
      const response = await apiActions.getArticlesForId(id);
      this.articleList = await this.appendImages(response.content);
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom dohva??anja ??lanaka");
    }
  };
  getArticlesForUserId = async (id: number) => {
    try {
      const response = await apiActions.getArticlesForUserId(id);
      this.articleList = await this.appendImages(response.content);
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom dohva??anja ??lanaka");
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
      if (data.author) {
        const response = await apiActions.createOrEditArticle({
          ...data,
          author: { id: data.author.id },
        });
        if (response.id && response.category.id && image) {
          this.uploadImage(response.id, image, response.category.id);
        }
        toast("??lanak pohranjen!");
      }
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom spremanja ??lanka");
    }
  };
  deleteArticle = async (data: number) => {
    try {
      await apiActions.deleteArticle(data);
      toast("??lanak izbrisam!");
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom brisanja ??lanka");
    }
  };
  deleteCategory = async (data: number) => {
    try {
      await apiActions.deleteCategory(data);
      toast("Naslov izbrisam!");
    } catch (error) {
      toast("Do??lo je do gre??ke prilikom brisanja naslova");
    }
  };
}
