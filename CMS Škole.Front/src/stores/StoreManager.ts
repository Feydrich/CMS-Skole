import { createContext, useContext } from "react";
import CategoriesStore from "./Stores/CategoriesStore";
import SharedStore from "./Stores/SharedStore";

interface Store {
  sharedStore: SharedStore;
  categoriesStore: CategoriesStore;
}
const sharedStore = new SharedStore();

export const store: Store = {
  sharedStore: sharedStore,
  categoriesStore: new CategoriesStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
