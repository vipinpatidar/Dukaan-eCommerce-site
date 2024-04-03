import styled from "styled-components";
import { tab } from "../../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0px auto;
  max-width: 1100px;
  ${tab({ justifyContent: "center" })}
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
