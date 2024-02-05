import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { tab, mobile } from "../../../responsive";

export const Container = styled.div`
  background-color: #9f40e0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  padding-block: 6px;
  width: 100%;
  gap: 4rem;
  position: relative;

  & p {
    ${mobile({ flexBasis: "65%" })}
  }
  ${tab({ gap: "2.2rem" })}
  ${mobile({
    gap: "1rem",
    fontSize: "14px",
    padding: "8px 10px",
    justifyContent: "start",
  })}
`;

export const Button = styled(Link)`
  padding: 7px 12px;
  background-color: #222;
  color: #fff;
  font-size: 15px;
  outline: none;
  border: none;
  text-decoration: none;
  display: block;
  ${mobile({ fontSize: "13px", padding: "6px 10px" })}
`;
export const Close = styled.p`
  flex: 1;
  background-color: transparent;
  color: #fff;
  position: absolute;
  right: 15px;
  font-size: 15px;
  cursor: pointer;
  ${mobile({ right: "16px" })}
`;
