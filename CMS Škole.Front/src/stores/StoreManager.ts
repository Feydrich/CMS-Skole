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

export const store: Store = {
  sharedStore: sharedStore,
  categoriesStore: new CategoriesStore(),
  articleStore: new ArticleStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
