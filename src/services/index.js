import { DEFAULT_PAGE_SIZE } from "../utils/constants";

export const fetchPokemonsApi = async ({
  offset = 0,
  limit = DEFAULT_PAGE_SIZE,
}) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  const list = await response.json();
  return list;
};

export const fetchVersionGroupsApi = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/version-group`);
  const list = await response.json();
  return list;
};
