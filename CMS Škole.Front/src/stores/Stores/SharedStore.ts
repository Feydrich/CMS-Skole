import { action, makeObservable, observable, runInAction } from "mobx";
import { fakeCategories } from "../../helper/dummyData";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

const apiActions = {};

export default class SharedStore {
  isLoading: boolean = false;
  siteSettings: SiteInfo = { name: "Osnovna škola Sesvetska Sela", images: [] };
  notificationParameters: {
    style: "none" | "success" | "error" | "warning" | "info";
    message: string;
    icon: boolean;
    key: number;
  }[] = [];
  user: User | null = null;

  constructor() {
    makeObservable(this, {
      //Variables: observable
      isLoading: observable,
      siteSettings: observable,
      notificationParameters: observable,
      user: observable,

      //Methods: action
      changeLoading: action,
      createNotification: action,
      removeNotification: action,
      getImagesForCarousel: action,

      //dataQueries

      //Calculated values: computed
    });
  }

  changeLoading = (data: boolean) => {
    this.isLoading = data;
  };

  setUser = (data: User | null) => {
    this.user = data;
  };

  createNotification = (
    style: "none" | "success" | "error" | "warning" | "info",
    message: string,
    icon: boolean
  ) => {
    let localCopy = this.notificationParameters;
    let data = {
      style: style,
      message: message,
      icon: icon,
      key: Math.floor(Math.random() * Date.now()),
    };
    localCopy.push(data);
    this.notificationParameters = localCopy;
    const timer = setTimeout(() => {
      this.removeNotification(data.key);
    }, 2000);

    return () => clearTimeout(timer);
  };

  removeNotification = (key: number) => {
    let localCopy = this.notificationParameters;
    let filteredCopy = localCopy.filter((notification) => {
      return notification.key !== key;
    });
    runInAction(() => {
      this.notificationParameters = filteredCopy;
    });
  };

  getImagesForCarousel = () => {
    this.siteSettings = {
      ...this.siteSettings,
      images: [
        "https://wallpapers.com/images/hd/cute-cat-fuqkmbcov67c1nif.jpg",
        "https://www.enjpg.com/img/2020/cute-cat-2.jpg",
        "https://images2.alphacoders.com/121/1213770.jpg",
      ],
    };
  };
}
