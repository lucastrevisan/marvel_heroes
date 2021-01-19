import styled, { css } from "styled-components";
import {
  typeColors,
  logoDarkBlue,
  logoLightBlue,
  logoYellow,
} from "./utils/commonStyles";

export const App = styled.div`
  min-height: 100%;
  color: #262626;
  font-family: Signika;
  font-weight: 300;
  color: ${logoDarkBlue};
  transition: background 0.6s ease-in;

  ${({ color }) =>
    color &&
    css`
      background: ${typeColors[color]};
    `};
`;

export const SlideWrapper = styled.section`
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  background: rgba(255, 255, 255, 0.6);
  background: #fff;
  width: 1366px;
`;

export const Page = styled.div`
  backface-visibility: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: transform 0.6s ease-in;
  transform: rotateY(180deg);

  ${({ flipped }) =>
    flipped &&
    css`
      transform: rotateY(0);
    `};
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 25px;
  color: ${logoDarkBlue};
  display: inline-block;
  min-width: 450px;
  border: solid 1px ${logoYellow};
`;

export const Loading = styled.div`
  display: flex;
  height: 500px;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

export const Button = styled.button`
  padding: 18px;
  border-radius: 0 3px 3px 0;
  border: none;
  background: ${logoLightBlue};
  color: #fff;
  cursor: pointer;
  white-space: nowrap;

  :disabled {
    opacity: 0.4;
    cursor: default;
  }

  + button {
    margin-left: 20px;
    border-radius: 3px;
  }
`;

export const Sticky = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 10px 0;
  background: #fff;

  ${({ flipped }) =>
    flipped &&
    css`
      opacity: 0;
    `};
`;

export const Head = styled.header`
  padding: 15px 0;
  position: relative;
  text-align: center;

  * {
    position: relative;
    z-index: 1;
  }

  :before {
    content: "";
    height: 4px;
    position: absolute;
    left: 0;
    right: 0;
    background: ${logoLightBlue};
    top: calc(50%);
    border-top: solid 1px rgba(255, 255, 255, 0.5);
    z-index: 0;
  }
`;
