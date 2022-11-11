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
    ],
  },
  {
    id: "second",
    name: "Oglasna ploča",
    subCategories: [
      { id: "first", name: "Obavijesti" },
      { id: "second", name: "Aktualnosti" },
      { id: "third", name: "Znamenitosti" },
    ],
  },
  {
    id: "third",
    name: "Novosti",
    subCategories: [
      { id: "first", name: "Placeholder 1" },
      { id: "second", name: "Placeholder 2" },
      { id: "third", name: "Placeholder 3" },
    ],
  },
  // {
  //   id: "fourth",
  //   name: "Presentation",
  //   subCategories: [
  //     { id: "first", name: "Some" },
  //     { id: "second", name: "Kind" },
  //     { id: "third", name: "Of interesting" },
  //     { id: "third", name: "Content" },
  //   ],
  // },
];

export const fakeArticles: Article[] = [
  {
    id: "1",
    name: "Placeholder",
    creationDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia pellentesque mi sed dignissim. Sed at erat imperdiet, viverra tortor quis, sollicitudin leo. Nam eu turpis cursus, porttitor ante non, fermentum nisi. Phasellus lorem erat, venenatis id posuere quis, venenatis quis justo. In molestie eleifend dapibus. Sed sed eros hendrerit, iaculis sapien nec, sagittis mauris. Integer malesuada ante eget bibendum imperdiet.",
    author: {
      name: "Professor 1",
    },
    image: "https://wallpaperaccess.com/full/32048.jpg",
  },
  {
    id: "2",
    name: "Placeholder",
    creationDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia pellentesque mi sed dignissim. Sed at erat imperdiet, viverra tortor quis, sollicitudin leo. Nam eu turpis cursus, porttitor ante non, fermentum nisi. Phasellus lorem erat, venenatis id posuere quis, venenatis quis justo. In molestie eleifend dapibus. Sed sed eros hendrerit, iaculis sapien nec, sagittis mauris. Integer malesuada ante eget bibendum imperdiet.",
    author: {
      name: "Professor 1",
    },
    image:
      "https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg?w=590&h=800&1966AE6B-E8E5-4D4A-AACA385519F64D03",
  },
  {
    id: "3",
    name: "Placeholder",
    creationDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia pellentesque mi sed dignissim. Sed at erat imperdiet, viverra tortor quis, sollicitudin leo. Nam eu turpis cursus, porttitor ante non, fermentum nisi. Phasellus lorem erat, venenatis id posuere quis, venenatis quis justo. In molestie eleifend dapibus. Sed sed eros hendrerit, iaculis sapien nec, sagittis mauris. Integer malesuada ante eget bibendum imperdiet.",
    author: {
      name: "Professor 1",
    },
    image: "https://wallpapers.com/images/featured/g9rdx9uk2425fip2.jpg",
  },
  {
    id: "4",
    name: "Placeholder",
    creationDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia pellentesque mi sed dignissim. Sed at erat imperdiet, viverra tortor quis, sollicitudin leo. Nam eu turpis cursus, porttitor ante non, fermentum nisi. Phasellus lorem erat, venenatis id posuere quis, venenatis quis justo. In molestie eleifend dapibus. Sed sed eros hendrerit, iaculis sapien nec, sagittis mauris. Integer malesuada ante eget bibendum imperdiet.",
    author: {
      name: "Developer",
    },
    image: "https://images2.alphacoders.com/121/1213770.jpg",
  },
  {
    id: "5",
    name: "Placeholder",
    creationDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia pellentesque mi sed dignissim. Sed at erat imperdiet, viverra tortor quis, sollicitudin leo. Nam eu turpis cursus, porttitor ante non, fermentum nisi. Phasellus lorem erat, venenatis id posuere quis, venenatis quis justo. In molestie eleifend dapibus. Sed sed eros hendrerit, iaculis sapien nec, sagittis mauris. Integer malesuada ante eget bibendum imperdiet.",
    author: {
      name: "Developer",
    },
    image: "https://www.enjpg.com/img/2020/cute-cat-2.jpg",
  },
  {
    id: "6",
    name: "Placeholder",
    creationDate: new Date(),
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia pellentesque mi sed dignissim. Sed at erat imperdiet, viverra tortor quis, sollicitudin leo. Nam eu turpis cursus, porttitor ante non, fermentum nisi. Phasellus lorem erat, venenatis id posuere quis, venenatis quis justo. In molestie eleifend dapibus. Sed sed eros hendrerit, iaculis sapien nec, sagittis mauris. Integer malesuada ante eget bibendum imperdiet.",
    author: {
      name: "Developer",
    },
    image: "https://wallpapers.com/images/hd/cute-cat-fuqkmbcov67c1nif.jpg",
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
