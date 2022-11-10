import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { fakeCategories, fakeUsers } from "../../helper/dummyData";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

const apiActions = {};

export default class SharedStore {
  isLoading: boolean = false;
  siteSettings: SiteInfo = { name: "Osnovna škola Sesvetska Sela", images: [] };
  user: User | null = null;
  userList: User[] | null = null;
  loginIsOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      //Variables: observable
      isLoading: observable,
      siteSettings: observable,
      user: observable,
      userList: observable,
      loginIsOpen: observable,

      //Methods: action
      changeLoading: action,

      //dataQueries
      getImagesForCarousel: action,
      getUsers: action,
      setUser: action,
      setLoginIsOpen: action,
      tryLogin: action,

      //Calculated values: computed
    });
  }

  changeLoading = (data: boolean) => {
    this.isLoading = data;
  };

  setUser = (data: User | null) => {
    this.user = data;
  };
  setLoginIsOpen = (data: boolean) => {
    this.loginIsOpen = data;
  };

  getImagesForCarousel = () => {
    this.siteSettings = {
      ...this.siteSettings,
      images: [
        "https://www.daysoftheyear.com/wp-content/uploads/happy-cat-month-1.jpg",
        "https://www.beverlyhillsvets.com/blog/wp-content/uploads/2020/02/iStock-1149249445.jpg",
        "https://smb.ibsrv.net/imageresizer/image/blog_images/1200x1200/23330/97482/0443241001547141937.jpg",
        "https://images.theconversation.com/files/182925/original/file-20170822-30538-gebk45.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
      ],
    };
  };

  getUsers = () => {
    this.userList = fakeUsers;
  };

  tryLogin = (mail: string, password: string) => {
    let found = fakeUsers.find((x) => x.mail === mail);
    if (found && found.password === password) {
      this.setUser(found);
      toast("Welcome: " + found.name);
    } else {
      toast("Unable to login");
    }
  };
}
