import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 580px) {
      ${props}
    }
  `;
};

export const tab = (props) => {
  return css`
    @media only screen and (max-width: 1040px) {
      ${props}
    }
  `;
};
export const desktop = (props) => {
  return css`
    @media only screen and (min-width: 580px) {
      ${props}
    }
  `;
};
