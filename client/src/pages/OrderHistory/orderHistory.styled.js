import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;

  .historyHeader {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 45px;
    & h1 {
      font-size: 2rem;
      font-weight: 600;
      text-transform: uppercase;
      text-align: center;
      margin: 0 auto;

      ${mobile({ fontSize: "1.4rem" })}
    }
  }
`;

export const TopButton = styled(Link)`
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #222;
  background-color: transparent;
  color: #222;
  text-decoration: none;
  display: block;
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
