import styled from "styled-components";
// import { mobile, tab } from "../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 900px;
  margin: 3rem auto;
  padding: 1rem;

  & h1 {
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 45px;
    text-align: center;
  }
`;

export const GreetHeader = styled.div`
  & h2 {
    font-weight: 600;
    color: #111;
    font-size: 1.1rem;
    text-transform: capitalize;
    margin-bottom: 8px;
  }

  & p {
    color: #333;
    font-size: 400;
  }
`;

export const PrevOrderContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PrevOrderBtn = styled(Link)`
  padding: 12px 20px;
  background-color: #704214;
  text-transform: uppercase;
  font-size: 15px;
  color: white;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;
`;

export const NoOrderContainer = styled.div`
  text-align: center;
  width: max-content;
  margin: 0 auto;
  padding-bottom: 2rem;
  border-bottom: 2px solid #555;

  & h2 {
    font-weight: 600;
    color: #111;
    font-size: 1.4rem;
    text-transform: capitalize;
    margin-bottom: 8px;
  }

  & p {
    font-size: 1.1rem;
    color: #333;
    font-size: 400;
  }

  & h3 {
    font-size: 1.1rem;
    margin-top: 10px;
    font-weight: 600;
    color: #444;
  }
`;

export const ProductBtn = styled(Link)`
  padding: 12px 20px;
  background-color: #836fff;
  text-transform: uppercase;
  font-size: 15px;
  color: white;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: max-content;
  margin: 14px auto;
`;
