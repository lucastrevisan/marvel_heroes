import { fetchPokemonsApi, fetchVersionGroupsApi } from "../services";
import {
  FETCH_POKEMONS,
  SEARCH_POKEMONS,
  FETCH_ALL_POKEMONS,
  SET_FAVORITES,
  DEFAULT_PAGE_SIZE,
  FETCH_VERSION_GROUPS,
} from "../utils/constants";

const getEachPokemonInfo = async (pokemons) => {
  await Promise.all(
    pokemons.map(async (item) => {
      const rawPokemonInfo = await fetch(item.url);
      const pokemonInfo = await rawPokemonInfo.json();
      item.info = {
        moves: pokemonInfo.moves,
        sprites: pokemonInfo.sprites.other["official-artwork"].front_default,
        stats: pokemonInfo.stats,
        types: pokemonInfo.types,
      };
    })
  );
  return pokemons;
};

export function fetchPokemonsWithInfo(params) {
  return async function (dispatch) {
    const json = await fetchPokemonsApi(params);
    json.results = await getEachPokemonInfo(json.results);
    json.offset = params.offset || 0;
    json.limit = params.limit || DEFAULT_PAGE_SIZE;

    return dispatch({ type: FETCH_POKEMONS, payload: json });
  };
}

export function fetchAllPokemons() {
  return async function (dispatch) {
    const json = await fetchPokemonsApi({ limit: 1120 });

    return dispatch({ type: FETCH_ALL_POKEMONS, payload: json });
  };
}

export function fetchVersionGroups() {
  return async function (dispatch) {
    const json = await fetchVersionGroupsApi();

    return dispatch({ type: FETCH_VERSION_GROUPS, payload: json });
  };
}

export function searchPokemon(value) {
  return async function (dispatch, getState) {
    const { allPokemons } = getState();
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.includes(value)
    );

    const filteredPokemonsWithInfo = await getEachPokemonInfo(filteredPokemons);

    return dispatch({
      type: SEARCH_POKEMONS,
      payload: filteredPokemonsWithInfo,
    });
  };
}

export function setFavorite(pokemon, isFavorite) {
  return function (dispatch, getState) {
    const { favorites } = getState();

    const newFavorites = isFavorite
      ? favorites.concat(pokemon)
      : favorites.filter((item) => item.name !== pokemon.name);

    return dispatch({ type: SET_FAVORITES, payload: newFavorites });
  };
}
