import { action, makeObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { Category } from "../../models/Category";
import { SiteInfo } from "../../models/SiteInfo";
import { User } from "../../models/User";
import { requests } from "../agent";

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
};

export default class SharedStore {
  isLoading: boolean = false;
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

  getRoles = async () => {
    try {
      const roles = await apiActions.getRoles();
      this.roleList = roles.content;
    } catch (error) {
      toast("Došlo je do greške pri dohvatu uloga.");
    }
  };

  /* FIX */
  createOrEditUser = async (data: User) => {
    try {
      const item = apiActions.createOrEditUser(data);
      console.log(item);
    } catch (error) {
      toast(
        "Došlo je do greške pri" + data.id
          ? " mijenjanju "
          : " stvaranju " + "korisnika."
      );
    }
  };

  deleteUser = (data: User) => {
    if (this.userList) {
      let local = this.userList.filter((x) => {
        return x.id !== data.id;
      });

      this.userList = local;
      toast('"' + data.name + '"je bio uspješno izbrisan');
    }
  };

  tryLogin = async (username: string, password: string) => {
    try {
      let item: { token: string; user: User } = await apiActions.login(
        username,
        password
      );
      toast("Welcome: " + item.user.name);
      this.setUser(item.user);
    } catch (error) {
      toast("Greška prilikom unosa");
    }

    // let found = null
    // if (found && found.password === password) {
    //   toast("Welcome: " + found.name);
    // } else {
    //   toast("Greška prilikom unosa");
    // }
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
