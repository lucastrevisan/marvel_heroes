import { STORAGE_KEY } from "./constants";

const storage = window.localStorage;
const loadStore = () =>
  JSON.parse(
    storage.getItem(STORAGE_KEY) ||
      '{"pokemons": [], "favorites": [], "pagination": {"total": 0}}'
  );
const saveStore = (store) =>
  storage.setItem(STORAGE_KEY, JSON.stringify(store));

export { loadStore, saveStore };
