import styled from "styled-components";
import { tab, mobile } from "../../../responsive";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  ${tab({ justifyContent: "center" })}
  ${mobile({ gap: "25px" })}
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
  letter-spacing: 1px;
  font-size: 15px;
  cursor: pointer;
`;
