import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import App, { Application } from "./App";

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
  myReducer: {
    someState: "ABC",
  },
};

const pokemons = [
  {
    name: "necrozma-dusk",
    url: "https://pokeapi.co/api/v2/pokemon/10155/",
    info: {
      moves: [
        {
          move: {
            name: "swords-dance",
            url: "https://pokeapi.co/api/v2/move/14/",
          },
          version_group_details: [
            {
              level_learned_at: 0,
              move_learn_method: {
                name: "machine",
                url: "https://pokeapi.co/api/v2/move-learn-method/4/",
              },
              version_group: {
                name: "ultra-sun-ultra-moon",
                url: "https://pokeapi.co/api/v2/version-group/18/",
              },
            },
          ],
        },
      ],
      sprites:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10155.png",
      stats: [
        {
          base_stat: 97,
          effort: 0,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/",
          },
        },
        {
          base_stat: 157,
          effort: 3,
          stat: {
            name: "attack",
            url: "https://pokeapi.co/api/v2/stat/2/",
          },
        },
      ],
      types: [
        {
          type: {
            name: "psychic",
            url: "https://pokeapi.co/api/v2/type/14/",
          },
        },
        {
          type: {
            name: "steel",
            url: "https://pokeapi.co/api/v2/type/9/",
          },
        },
      ],
    },
  },
];

const props = {
  fetchPokemonsWithInfo: jest.fn(),
  favorites: pokemons,
  pokemons: pokemons,
  pagination: {},
  fetchAllPokemons: jest.fn(),
  searchPokemon: jest.fn(),
  fetchVersionGroups: jest.fn(),
  setFavorite: jest.fn(),
  versionGroups: [],
};

const updateByAct = (wrapper) =>
  act(
    () =>
      new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      })
  );

describe("Application Component", () => {
  let store;
  let component;
  let ConnectedComponent;

  beforeEach(() => {
    store = mockStore(storeStateMock);
    ConnectedComponent = shallow(<App store={store} />);
    component = shallow(<Application {...props} />);
  });

  it("should match snapshot", async () => {
    component = mount(<Application {...props} />);
    await updateByAct(component);

    expect(component).toMatchSnapshot();
  });

  it("should call actions", async () => {
    component = mount(<Application {...props} />);
    await updateByAct(component);

    expect(props.fetchAllPokemons).toHaveBeenCalled();
    expect(props.fetchPokemonsWithInfo).toHaveBeenCalled();
    expect(props.fetchVersionGroups).toHaveBeenCalled();
  });

  it("should match snapshot with connected component", () => {
    expect(ConnectedComponent).toMatchSnapshot();
  });
});
