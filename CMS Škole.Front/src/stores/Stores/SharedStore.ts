import { action, makeObservable, observable, runInAction, toJS } from "mobx";
import { toast } from "react-toastify";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

import content from "../../catImages.json";

const apiActions = {
  login: (username: string, password: string) => {
    return requests.post(`login`, { password: password, username: username });
  },
  createOrEditUser: (user: User) => {
    return requests.post(`user/save`, user);
  },
  getUsers: () => {
    return requests.get("user/all?size=100000000");
  },
  getRoles: () => {
    return requests.get("role?size=100000000");
  },
  deleteUser: (id: number) => {
    return requests.delete("user?id=" + id);
  },
};

export default class SharedStore {
  isLoading: boolean = false;
  token: string = "";
  ads: { image: string; link: string }[] = [];
  siteSettings: SiteInfo = {
    name: "Osnovna škola Sesvetska Sela",
    description:
      "OŠ Sesvetska Sela započela je s radom 03. rujna 2007. godine. Nalazi se u Letničkoj ulici u Sesvetskim Selima, koja su dio Gradske četvrti Sesvete. Ponosni smo na naziv škole i na okoliš koji stvara jedan lijep ugođaj: spaja seoski mir i ljepotu prirode s gradskom organizacijom i uređenjem života.",
    images: [],
    colorSchemes: {
      primaryColor: "#cbe4f294",
      primaryColorDark: "#07689f",
      primaryColorTransparent: "#42a1d8",
      secondaryColor: "#d3edd5",
      secondaryColorDark: "#3d8141",
      background: "#f5f5f5",
      legend: "#ffffff",
      fontColor: "#000000",
    },
  };
  user: User | null = null;
  userList: User[] | null = null;
  roleList: { id: number; name: string }[] = [];
  loginIsOpen: boolean = false;

  constructor() {
    makeObservable(this, {
      //Variables: observable
      isLoading: observable,
      token: observable,
      ads: observable,
      siteSettings: observable,
      user: observable,
      userList: observable,
      roleList: observable,
      loginIsOpen: observable,

      //Methods: action
      changeLoading: action,
      changeStyles: action,

      //dataQueries
      getImagesForCarousel: action,
      getUsers: action,
      getAds: action,
      getRoles: action,
      setUser: action,
      setLoginIsOpen: action,
      tryLogin: action,
      createOrEditUser: action,
      deleteUser: action,

      //Calculated values: computed
    });
  }

  changeLoading = (data: boolean) => {
    this.isLoading = data;
  };

  setUser = (data: User | null) => {
    this.user = data;
    if (!data) {
      this.token = "";
    }
  };
  setLoginIsOpen = (data: boolean) => {
    this.loginIsOpen = data;
  };

  getImagesForCarousel = () => {
    this.siteSettings = {
      ...this.siteSettings,
      images: [
        "http://os-sesvetska-sela-zg.skole.hr/upload/os-sesvetska-sela-zg/images/headers/Image/naslovnica-web.jpg",
        "https://img.freepik.com/free-photo/classmates-friends-bag-school-education_53876-137717.jpg?w=1480&t=st=1668294152~exp=1668294752~hmac=01d8b789bad1108b87c6c2e516fe20cc07f8efa71837c86c00507d2e2a412418",
        "https://img.freepik.com/free-photo/students-knowing-right-answer_329181-14271.jpg?w=1380&t=st=1668294159~exp=1668294759~hmac=c84408d32380263de1d2e7cab249bbc472e7322878007be5488c260f28d7cc7e",
        "http://os-sesvetska-sela-zg.skole.hr/upload/os-sesvetska-sela-zg/album/171/large_img_111726.jpg",
      ],
    };
  };

  getUsers = async () => {
    try {
      const users = await apiActions.getUsers();
      this.userList = users.content;
    } catch (error) {
      toast("Došlo je do greške pri dohvatu korisnika.");
    }
  };
  getAds = async () => {
    try {
      this.ads = content.cats;
    } catch (error) {
      toast("Došlo je do greške pri dohvatu korisnika.");
    }
  };

  getRoles = async () => {
    try {
      const roles = await apiActions.getRoles();
      this.roleList = roles.content;
    } catch (error) {
      toast("Došlo je do greške pri dohvatu uloga.");
    }
  };

  createOrEditUser = async (data: User) => {
    try {
      let localUser = { ...data };
      if (localUser.id) {
        delete localUser.password;
      }
      const item = await apiActions.createOrEditUser(localUser);
    } catch (error) {
      toast(
        "Došlo je do greške pri" + data.id
          ? " mijenjanju "
          : " stvaranju " + "korisnika."
      );
    }
  };

  deleteUser = async (data: number) => {
    try {
      await apiActions.deleteUser(data);
      toast("Korisnik izbrisan");
    } catch (error) {
      toast("Greška prilikom brisanja");
    }
  };

  tryLogin = async (username: string, password: string) => {
    try {
      let item: { token: string; user: User } = await apiActions.login(
        username,
        password
      );
      //Potencijalno staviti u cookie, ali namjerno stavljeno u store da ne bi netko greškom ostao ulogiran - security
      //document.cookie = `jwt=` + item.token + `;path=/`;
      this.token = item.token;
      toast("Welcome: " + item.user.name);
      this.setUser(item.user);
    } catch (error) {
      toast("Greška prilikom unosa");
    }
  };

  getToken = async () => {
    try {
      return this.token;
    } catch (error) {
      return Promise.reject();
    }
  };

  changeStyles = (colors: {
    primaryColor: string;
    primaryColorDark: string;
    primaryColorTransparent: string;
    secondaryColor: string;
    secondaryColorDark: string;
    background: string;
    legend: string;
    fontColor: string;
  }) => {
    this.siteSettings.colorSchemes = colors;
  };
}
