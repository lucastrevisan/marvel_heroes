import styled, { css } from "styled-components";

export const Span = styled.span`
  display: inline-flex;

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};

  ${({ width, height }) =>
    width &&
    height &&
    css`
      svg {
        width: ${width}px;
        height: ${height}px;
      }
    `};
`;
