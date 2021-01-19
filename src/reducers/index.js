import {
  FETCH_POKEMONS,
  SEARCH_POKEMONS,
  FETCH_ALL_POKEMONS,
  SET_FAVORITES,
  FETCH_VERSION_GROUPS,
} from "../utils/constants";

const initialState = {
  heroes: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_POKEMONS:
      return {
        ...state,
        pokemons: payload.results,
        pagination: {
          count: payload.count,
          limit: payload.limit,
          offset: payload.offset,
        },
      };
    case SEARCH_POKEMONS:
      return {
        ...state,
        pokemons: payload,
      };
    case FETCH_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: payload.results,
      };
    case FETCH_VERSION_GROUPS:
      return {
        ...state,
        versionGroups: payload.results,
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
