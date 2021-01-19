import styled, { css } from "styled-components";
import { logoLightBlue, typeColors } from "../../utils/commonStyles";

export const Img = styled.img`
  width: 475px;
  height: 475px;
  position: absolute;
  left: 50%;
  top: 120px;
  transform: translate(-50%);
`;

export const Chart = styled.section`
  position: relative;
  height: 500px;
  margin: 20px 0 80px 0;
`;

export const Name = styled.h1`
  padding: 20px;
  margin: 0;
  font-size: 80px;
  text-align: center;

  ::first-letter {
    text-transform: capitalize;
  }
`;

export const Th = styled.th`
  padding: 5px;
  top: 0;
  background: #fff;

  ${({ sticky }) =>
    sticky &&
    css`
      position: sticky;
    `};
`;

export const Tr = styled.tr``;

export const Td = styled.td`
  border: solid 1px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.05);

  ${({ painted, colorized }) =>
    painted &&
    colorized &&
    css`
      background: ${typeColors[colorized]};
    `};

  :first-child {
    padding: 10px 5px;
  }
`;

export const Table = styled.table`
  width: calc(100% - 20px);
  border-collapse: collapse;
  margin: 0 10px 20px 10px;
`;

export const Button = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 20px;
  border-radius: 15px;
  border: none;
  background: ${logoLightBlue};
  color: #fff;
  cursor: pointer;
  z-index: 1;
`;
