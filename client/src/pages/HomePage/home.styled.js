import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeadingDiv = styled.div`
  text-align: center;
  margin: 70px auto 50px;

  & p {
    font-size: 16px;
    text-transform: uppercase;
    color: #8710d8;
    font-weight: 600;
    margin-bottom: 10px;
  }

  & h1 {
    font-size: 28px;
    font-weight: 500;
  }
`;

export const ProdDiv = styled.div`
  margin-bottom: 60px;
`;
export const SeeMoreBtn = styled(Link)`
  text-align: center;
  margin: 30px auto 0;
  display: block;
  border: none;
  outline: none;
  padding: 10px 20px;
  font-size: 15px;
  background: #111;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  cursor: pointer;
  width: max-content;
`;
