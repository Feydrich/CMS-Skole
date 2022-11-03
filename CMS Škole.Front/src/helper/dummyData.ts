import { Category } from "../models/Category";

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
];
