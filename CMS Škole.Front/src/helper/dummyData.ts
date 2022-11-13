import { Article } from "../models/Article";
import { Category } from "../models/Category";
import { User } from "../models/User";

export const fakeCategories: Category[] = [
  {
    id: "first",
    name: "O školi",
    subCategories: [
      { id: "first", name: "Povijest" },
      { id: "second", name: "Kontakti" },
      { id: "third", name: "Lokacija" },
      { id: "fourth", name: "Radno vrijeme" },
      { id: "fifth", name: "Popis djelatnika" },
      { id: "sixth", name: "Školski odbor" },
      { id: "seventh", name: "Popis djelatnika" },
    ],
  },
  {
    id: "second",
    name: "Oglasna ploča",
    subCategories: [
      { id: "first", name: "Obavijesti" },
      { id: "second", name: "Novosti" },
      { id: "third", name: "Znamenitosti" },
    ],
  },
  {
    id: "third",
    name: "Nastava",
    subCategories: [
      { id: "first", name: "Upisi u prvi razred" },
      { id: "second", name: "Informatika" },
      { id: "third", name: "Likovni" },
      { id: "third", name: "Vikendom u sportske dvorane" },
      { id: "fourth", name: "Izvannastavne aktivnosti" },
    ],
  },
];

export const fakeArticles: Article[] = [
  {
    id: "1",
    name: "Dan jabuka u Produženom boravku 1. razreda",
    creationDate: new Date(),
    description:
      "I ove školske godine obilježili smo Svjetski dan jabuka. Djeca su bila uključena u razne aktivnosti s ciljem da upoznaju koliko je jabuka važna u svakodnevnoj prehrani.",
    author: {
      name: "Professor 1",
    },
    image: "https://img.freepik.com/free-photo/red-apple-basket_74190-6134.jpg?w=1380&t=st=1668285796~exp=1668286396~hmac=b0dc5de2acac897a8bf8726543f89db0230075870ddc4b0177de50c00d0575ff",
  },
  {
    id: "2",
    name: "Opasnosti od strujnog udara na području željezničke infrastrukture",
    creationDate: new Date(),
    description:
      "U cilju prevencije mladih osoba od opasnosti kretanja po području željezničke infrastrukture na području grada Zagreba, objavljujemo u nastavku priložene letke i brošure u svrhu edukacije mladih i prevencije od strujnog udara na području željezničke infrastrukture.",
    author: {
      name: "Professor 1",
    },
    image:
      "https://cdn.pixabay.com/photo/2013/04/01/10/59/electricity-98829_960_720.png",
  },
  {
    id: "3",
    name: "Potvrde o školovanju dostupne u e-Dnevniku",
    creationDate: new Date(),
    description:
      "U e-Dnevniku za učenike i roditelje je napravljena nadogradnja kojom je omogućen ispis potvrda o statusu školovanja za učenike osnovnih i srednjih škola. ",
    author: {
      name: "Professor 1",
    },
    image: "https://cdn.pixabay.com/photo/2017/10/14/09/56/journal-2850091_960_720.jpg",
  },
  {
    id: "4",
    name: "Red vožnje",
    creationDate: new Date(),
    description:
      "Red vožnje organiziranog prijevoza učenika od 15. rujna 2022. - školski autobus linija 881",
    author: {
      name: "Developer",
    },
    image: "https://www.zagreb.info/wp-content/uploads/2015/11/12010760_1135413573155193_58493144524179038_o-e1466666556533.jpg",
  },
  {
    id: "5",
    name: "Učenici 4. b razrednog odjela osvojili nagradu Kauflanda za sve učenike naše škole",
    creationDate: new Date(),
    description:
      "Učenici 4. b razrednog odjela prošle školske godine sudjelovali su u natječaju Kauflanda Škola voća i povrća. ",
    author: {
      name: "Developer",
    },
    image: "http://os-sesvetska-sela-zg.skole.hr/upload/os-sesvetska-sela-zg/images/newsimg/1007/KAUFLAND.jpg",
  },
  {
    id: "6",
    name: "Matematička radionica u produženom boravku",
    creationDate: new Date(),
    description:
      "U sklopu Dana škole održana je Matematička radionica u organizaciji učiteljica iz produženog boravka. Učenici su uživali u  matematičkim igrama i zajedničkom druženju. Pogledajte kako nam je bilo.",
    author: {
      name: "Developer",
    },
    image: "https://cdn.pixabay.com/photo/2016/07/28/04/31/math-1547018_960_720.jpg",
  },
];

export const fakeUsers: User[] = [
  {
    id: "1",
    name: "Developer",
    mail: "dev@gmail.com",
    password: "dev",
    roles: ["Admin"],
  },
  {
    id: "2",
    name: "Tester",
    mail: "tester@gmail.com",
    password: "dev",
    roles: ["Regular user"],
  },
  {
    id: "3",
    name: "Professor 1",
    mail: "1@gmail.com",
    password: "dev",
    roles: ["Guest"],
  },
];
