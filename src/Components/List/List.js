import React from "react";
import {
  Section,
  Card,
  Name,
  Title,
  Img,
  BackIcon,
  Types,
  Type,
  Content,
  Fav,
} from "./styles";
import { typeColors } from "../../utils/commonStyles";
import Icon from "../Icon";

const List = ({
  collection,
  title,
  emptyMessage,
  onFavoritize,
  favorites,
  onSelect,
}) => {
  return (
    <Section>
      <Title>{title}</Title>
      {collection.length
        ? collection.map((item, index) => {
            const hasBeenFavoritize = favorites?.find(
              (favorite) => favorite.name === item.name
            );
            const types = item.info.types;
            const image = item.info.sprites;
            const type = favorites ? "Star" : "Remove";

            return (
              <Card
                key={`${item.name}${item.id}`}
                color={typeColors[types[0].type.name]}
                delay={(index + 1) * 100}
                onClick={() => onSelect(item)}
              >
                <Name>{item.name}</Name>
                <Fav
                  favotitized={hasBeenFavoritize}
                  onClick={(e) => {
                    e.stopPropagation();
                    !hasBeenFavoritize && onFavoritize(item, favorites != null);
                  }}
                >
                  <Icon
                    type={type}
                    width={favorites ? 35 : 25}
                    height={favorites ? 35 : 25}
                  />
                </Fav>
                <Content>
                  <Types>
                    {types.map((typeItem, index) => (
                      <Type key={index} color={typeColors[typeItem.type.name]}>
                        {typeItem.type.name}
                      </Type>
                    ))}
                  </Types>
                  <Img alt={item.name} src={image} />
                </Content>
                <BackIcon>
                  <Icon type="PokeBall" width={200} height={200} />
                </BackIcon>
              </Card>
            );
          })
        : emptyMessage}
    </Section>
  );
};

export default List;
