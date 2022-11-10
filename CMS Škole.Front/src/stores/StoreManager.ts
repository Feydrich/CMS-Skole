import { createContext, useContext } from "react";
import ArticleStore from "./Stores/ArticleStore";
import CategoriesStore from "./Stores/CategoriesStore";
import SharedStore from "./Stores/SharedStore";

interface Store {
  sharedStore: SharedStore;
  categoriesStore: CategoriesStore;
  articleStore: ArticleStore;
}
const sharedStore = new SharedStore();
const categoriesStore = new CategoriesStore();

export const store: Store = {
  sharedStore: sharedStore,
  categoriesStore: categoriesStore,
  articleStore: new ArticleStore(categoriesStore),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
