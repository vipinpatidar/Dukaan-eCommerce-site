import styled from "styled-components";
import { mobile, tab, smallMobile } from "../../../responsive";

export const Container = styled.div`
  background-color: rgb(229 231 235);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 52vh;
  padding: 10px;
  ${tab({ height: "35vh" })}
  ${mobile({ height: "42vh" })}
  ${smallMobile({ height: "50vh" })}

  & p {
    margin-bottom: 40px;
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }
`;
export const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8710d8;
  ${mobile({ fontSize: "24px" })}

  & span {
    color: #333;
    margin-top: 2px;
  }
`;

export const Desc = styled.div`
  font-size: 36px;
  font-weight: 500;
  color: #333;
  ${mobile({ textAlign: "center", fontSize: "30px" })}
`;

export const InputContainer = styled.div`
  width: 50%;
  height: 48px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "90%" })}
`;

export const Input = styled.input`
  border: none;
  flex: 9;
  padding: 15px 15px;
  outline: none;
  ${tab({ flex: "5" })}
  ${mobile({ flex: "6" })}
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
