import styled from "styled-components";
import { mobile } from "../../../responsive";
// import { Link } from "react-router-dom";

export const Container = styled.div`
  /* margin: 30px auto 40px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3rem;
  margin: 30px auto;
  padding: 0 16px;
  ${mobile({ padding: "0 6px" })}

  & h1 {
    font-size: 1.6rem;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    margin: 0 auto;

    ${mobile({ fontSize: "1.6rem" })}
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;

  & ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    list-style: none;
  }
`;

export const PaginationItem = styled.li`
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  border: 1px solid ${(props) => props.$color};
  cursor: pointer;
`;
