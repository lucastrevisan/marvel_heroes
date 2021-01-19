import React from "react";
import { Span } from "./styles";

export const icons = {
  PokeBall: require("./PokeBall").default,
  Pokemon: require("./Pokemon").default,
  Star: require("./Star").default,
  Remove: require("./Remove").default,
};

function Icon({ type, color, width, height }) {
  const IconSvg = icons[type];
  if (IconSvg) {
    return (
      <Span color={color} width={width} height={height}>
        <IconSvg />
      </Span>
    );
  }
  return null;
}

export default Icon;
