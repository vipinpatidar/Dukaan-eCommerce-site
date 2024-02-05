import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  gap: 1rem;
  text-align: center;
  padding: 1rem;
  & h1 {
    font-size: 23px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  & h2 {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 9px 16px;
  background: teal;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  display: block;
  margin-top: 10px;
  letter-spacing: 1px;
  cursor: pointer;
  ${mobile({ fontSize: "14px" })}
`;
