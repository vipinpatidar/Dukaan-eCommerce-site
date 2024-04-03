import styled from "styled-components";
// import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  padding: 1rem;
  & h1 {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }
  & p {
    margin-bottom: 30px;
    max-width: 600px;
    line-height: 25px;
  }

  & span {
    background-color: yellow;
    padding: 4px 5px;
    margin-right: 4px;
    font-weight: 500;
    width: max-content;
  }
`;
export const Form = styled.form`
  padding: 1.6rem;
  border-radius: 3px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  max-width: 450px;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  padding: 9px 16px;
  background: #111;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  display: block;
  margin-top: 20px;
  letter-spacing: 1px;
  cursor: pointer;
`;
