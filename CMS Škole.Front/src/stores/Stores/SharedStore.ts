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
  siteSettings: SiteInfo = {
    name: "Osnovna škola Sesvetska Sela",
    description: "OŠ Sesvetska Sela započela je s radom 03. rujna 2007. godine. Nalazi se u Letničkoj ulici u Sesvetskim Selima, koja su dio Gradske četvrti Sesvete. Ponosni smo na naziv škole i na okoliš koji stvara jedan lijep ugođaj: spaja seoski mir i ljepotu prirode s gradskom organizacijom i uređenjem života.",
    images: [],
    colorSchemes: {
      primaryColor: "#cbe4f294",
      primaryColorDark: "#07689f",
      primaryColorTransparent: "#42a1d8",
      secondaryColor: "#d3edd5",
      secondaryColorDark: "#3d8141",
      background: "#f5f5f5",
      legend: "#ffffff",
      fontColor: "#000000"
    },
  };
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
      changeStyles: action,

      //dataQueries
      getImagesForCarousel: action,
      getUsers: action,
      setUser: action,
      setLoginIsOpen: action,
      tryLogin: action,
      createUser: action,
      editUser: action,
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

  getUsers = () => {
    this.userList = fakeUsers;
  };

  /* FIX */
  createUser = (data: User) => {
    this.userList?.push({ ...data, id: new Date().toISOString() });
    toast('"' + data.name + '"je bio uspješno stvoren');
  };
  editUser = (data: User) => {
    if (this.userList) {
      let local = this.userList.map((x) => {
        if (x.id === data.id) {
          return data;
        } else return x;
      });
      this.userList = local;
      toast('"' + data.name + '"je bio uspješno izmijenjen');
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

  tryLogin = (mail: string, password: string) => {
    let found = fakeUsers.find((x) => x.mail === mail);
    if (found && found.password === password) {
      this.setUser(found);
      toast("Welcome: " + found.name);
    } else {
      toast("Greška prilikom unosa");
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
    fontColor:string;
  }) => {
    this.siteSettings.colorSchemes = colors;
  };
}
