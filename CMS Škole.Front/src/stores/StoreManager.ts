import { createContext, useContext } from "react"
import SharedStore from "./SharedStore/SharedStore";

interface Store {
    sharedStore: SharedStore;
}
const sharedStore = new SharedStore()

export const store: Store = {
    sharedStore: sharedStore
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}