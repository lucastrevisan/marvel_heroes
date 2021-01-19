import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  App,
  Page,
  SlideWrapper,
  Button,
  Input,
  Head,
  Sticky,
  Loading,
} from "./styles";
import List from "./Components/List";
import ViewPokemon from "./Components/ViewPokemon";
import ReactPaginate from "react-paginate";
import {
  fetchPokemonsWithInfo,
  fetchAllPokemons,
  searchPokemon,
  setFavorite,
  fetchVersionGroups,
} from "./actions";
import { DEFAULT_PAGE_SIZE } from "./utils/constants";
import Icon from "./Components/Icon";

export const Application = function ({
  fetchPokemonsWithInfo,
  favorites,
  pokemons,
  pagination,
  fetchAllPokemons,
  searchPokemon,
  fetchVersionGroups,
  setFavorite,
  versionGroups,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    async function fetch() {
      await fetchVersionGroups();
      await fetchAllPokemons();
      await fetchPokemonsWithInfo({});
      setLoading(false);
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectAndScrollTop = (pokemon) => {
    setSelectedPokemon(pokemon);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageClick = async (e) => {
    setLoading(true);
    await fetchPokemonsWithInfo({ offset: e.selected * DEFAULT_PAGE_SIZE });
    setLoading(false);
  };

  const makeSearch = async () => {
    setLoading(true);
    await searchPokemon(searchValue);
    setLoading(false);
  };

  const clearSearch = async () => {
    setSearchValue("");
    await fetchPokemonsWithInfo({});
  };

  return (
    <App color={selectedPokemon?.info.types[0].type.name}>
      <Head>
        <Icon type="Pokemon" width={262} height={95} />
      </Head>
      <SlideWrapper>
        <Page flipped={!!!selectedPokemon}>
          <List
            collection={favorites}
            title="Favorite Pokemons"
            emptyMessage="Select your favorite Pokemons!!"
            onFavoritize={setFavorite}
            onSelect={selectAndScrollTop}
          />
          <Sticky flipped={!!selectedPokemon}>
            <Input
              type="text"
              value={searchValue}
              placeholder="Search a Pokemon with at least 3 letters"
              onInput={(e) => setSearchValue(e.target.value)}
            />
            <Button disabled={searchValue.length < 3} onClick={makeSearch}>
              SEARCH POKEMON
            </Button>
            <Button disabled={searchValue.length === 0} onClick={clearSearch}>
              CLEAR
            </Button>
            {searchValue === "" && (
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pagination.count / DEFAULT_PAGE_SIZE}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            )}
          </Sticky>

          {loading ? (
            <Loading>LOADING POKEMONS...</Loading>
          ) : (
            <List
              collection={pokemons}
              favorites={favorites}
              title="Pokemons"
              emptyMessage="Search a Pokemon at the bar above"
              onFavoritize={setFavorite}
              onSelect={selectAndScrollTop}
            />
          )}
        </Page>
        <Page flipped={!!selectedPokemon}>
          <ViewPokemon
            onBack={setSelectedPokemon}
            pokemon={selectedPokemon}
            groups={versionGroups}
          />
        </Page>
      </SlideWrapper>
    </App>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    fetchPokemonsWithInfo: (params) => dispatch(fetchPokemonsWithInfo(params)),
    fetchAllPokemons: () => dispatch(fetchAllPokemons()),
    fetchVersionGroups: () => dispatch(fetchVersionGroups()),
    searchPokemon: (value) => dispatch(searchPokemon(value)),
    setFavorite: (pokemon, isFavorite) =>
      dispatch(setFavorite(pokemon, isFavorite)),
  };
}

const mapStateToProps = ({
  pokemons,
  favorites,
  pagination,
  versionGroups,
}) => {
  return { pokemons, favorites, pagination, versionGroups };
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
