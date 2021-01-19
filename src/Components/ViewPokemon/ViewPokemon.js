import React, { Fragment, useEffect, useState } from "react";
import { Img, Chart, Table, Tr, Th, Td, Name, Button } from "./styles";
import { ResponsivePie } from "@nivo/pie";

const ViewPokemon = ({ onBack, pokemon, groups }) => {
  const [data, setData] = useState(null);
  const image = pokemon?.info.sprites;

  useEffect(() => {
    pokemon &&
      setData(
        pokemon.info.stats.map((item, index) => ({
          id: item.stat.name,
          label: item.stat.name,
          value: item.base_stat,
        }))
      );
  }, [pokemon]);

  return pokemon ? (
    <Fragment>
      <Button onClick={() => onBack()}>BACK TO LISTS</Button>
      {data && (
        <Chart>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.8}
            padAngle={2}
            cornerRadius={5}
            colors={{ scheme: "nivo" }}
            borderWidth={2}
            borderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextColor="#333333"
            radialLabelsLinkColor={{ from: "color" }}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#333333"
            startAngle={-90}
            endAngle={90}
            theme={{ fontSize: "20px" }}
          />
          <Img alt={pokemon.name} src={image} />
        </Chart>
      )}
      <Name>{pokemon.name}</Name>
      <Table>
        <thead>
          <Tr>
            <Th colSpan={groups.length + 1}>
              Moves Availability by Game Versions
            </Th>
          </Tr>
          <Tr>
            <Th sticky>Move</Th>
            {groups.map((group, index) => (
              <Th sticky key={index}>
                {group.name}
              </Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {pokemon.info.moves.map((item) => {
            return (
              <Tr key={item.move.name}>
                <Td>{item.move.name}</Td>
                {groups.map((group) => {
                  const hasInGroup = item.version_group_details.find(
                    (vgItem) => vgItem.version_group.name === group.name
                  );
                  return (
                    <Td
                      painted={!!hasInGroup}
                      key={group.name}
                      colorized={pokemon.info.types[0].type.name}
                    ></Td>
                  );
                })}
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  ) : null;
};

export default ViewPokemon;
