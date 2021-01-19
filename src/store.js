import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { loadStore, saveStore } from "./utils/store";

const persistedStore = loadStore();
const store = createStore(rootReducer, persistedStore, applyMiddleware(thunk));

store.subscribe(() => {
  const { allPokemons, pokemons, ...rest } = store.getState();
  saveStore(rest);
});

export { store };
