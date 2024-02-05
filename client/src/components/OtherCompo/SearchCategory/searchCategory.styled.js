import styled from "styled-components";
import { mobile, desktop } from "../../../responsive";

export const Container = styled.div`
  position: absolute;
  top: 136%;
  width: 220px;
  z-index: 100;
  background-color: #222;
  ${desktop({ left: "26%" })}
  ${mobile({ top: "106px", left: "40px", width: "250px" })}
`;

export const Square = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -16px;
  background-color: #222;
  z-index: -1;
  left: 18px;
  transform: rotate(45deg) translateY(50%);
`;

export const SearchedList = styled.ul`
  list-style: none;
  color: #fff;
  padding: 5px 0px;
`;
export const SearchedItem = styled.li`
  padding: 9px 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #555;
  }
`;
