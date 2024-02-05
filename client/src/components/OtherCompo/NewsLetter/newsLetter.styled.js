import styled from "styled-components";
import { mobile, tab } from "../../../responsive";

export const Container = styled.div`
  background-color: #f9f5f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 55vh;
  padding: 10px;
  ${tab({ height: "40vh" })}
  ${mobile({ height: "35vh" })}
`;
export const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "50px" })}
`;

export const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", fontSize: "20px" })}
`;

export const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "90%" })}
`;

export const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 15px;
  outline: none;
`;

export const Button = styled.button`
  flex: 1;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  background-color: #a435f0;

  &:hover {
    background-color: #8710d8;
  }
`;
