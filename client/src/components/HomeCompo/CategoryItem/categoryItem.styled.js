import styled from "styled-components";
import { mobile, tab } from "../../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 380px;
  position: relative;
  border: 1px solid #444;
  ${tab({ height: "320px", minWidth: "240px" })}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* ${mobile({ height: "30vh" })} */
`;

export const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 300ms;
  background-color: rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 17px;
  margin-bottom: 20px;
`;

export const Button = styled(Link)`
  border: none;
  padding: 10px 20px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  display: block;
`;
