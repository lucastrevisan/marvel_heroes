import styled, { css, keyframes } from "styled-components";
import { logoYellow } from "../../utils/commonStyles";

const animateAppearing = keyframes`
  from {
    opacity: 0;
    top: 50px;
  }

  to {
    opacity: 1;
    top: 0;
  }
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin-bottom: 50px;

  ${({ centered }) =>
    centered &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;

export const Img = styled.img`
  transition: transform 0.2s ease-in-out;
  transform-origin: 0 0;
  width: 144px;
  height: 144px;
  display: inline-block;
  position: relative;
  z-index: 1;
`;

export const Card = styled.div`
  background-color: #000;
  position: relative;
  color: #fff;
  font-family: Signika;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  border-radius: 45px 0 45px 0;
  opacity: 0;
  top: 50px;

  :hover {
    ${Img} {
      transform: scale(1.2);
    }
  }

  ${({ delay }) =>
    delay &&
    css`
      animation: ${animateAppearing} ${delay}ms linear forwards;
    `};

  ${({ color }) =>
    color &&
    css`
      background: ${color};
    `};
`;

export const Name = styled.h3`
  margin: 0;
  padding: 20px 40px 20px 35px;
  font-size: 24px;
  text-shadow: 1px 1px 2px #000;

  :first-letter {
    text-transform: uppercase;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 35px;
  font-weight: 700;
  grid-column: 1 / 6;
`;

export const Content = styled.div`
  display: flex;
`;

export const Types = styled.ul`
  margin: 0;
  padding: 0;
  flex-grow: 1;
`;

export const Type = styled.li`
  margin: 0 10px 3px 10px;
  padding: 4px;
  border-radius: 5px;
  text-shadow: 1px 1px 2px #000;

  ${({ color }) =>
    color &&
    css`
      background: ${color};
      filter: brightness(90%);
    `};
`;

export const BackIcon = styled.span`
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  color: rgba(255, 255, 255, 0.3);
  transform: translate(20%, 20%);
`;

export const Fav = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  color: #fff;
  filter: drop-shadow(0 0 0 transparent);
  transition: all 0.2s linear;

  :hover {
    filter: drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.4));
    cursor: pointer;
  }

  ${({ favotitized }) =>
    favotitized &&
    css`
      color: ${logoYellow};
      filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.4));
    `};
`;
