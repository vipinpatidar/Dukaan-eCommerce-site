import styled from "styled-components";
import { mobile } from "../../responsive";
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
    max-width: 400px;
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
  padding: 1rem;
  border-radius: 3px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: 460px;
  ${mobile({ width: "90%" })}
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

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 12px 0;
`;

export const InputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;

  & p {
    margin-bottom: 0;
    color: #111;
  }
`;

export const Input = styled.input`
  padding: 10px 10px;
  outline: none;
  border: 1px solid gray;
  width: 100%;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;
