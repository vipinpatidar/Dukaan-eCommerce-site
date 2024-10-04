import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0px auto;

  .page-title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 30px;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 7rem;
  margin: 40px auto 0px;
  padding: 10px;
  ${mobile({ gap: "2rem" })}
`;

export const Button = styled.button`
  outline: none;
  background-color: ${(props) => (props.$isActive ? "#a435f0" : "transparent")};
  padding: 10px 20px;

  color: ${(props) => (props.$isActive ? "#fff" : "#a435f0")};

  border: ${(props) =>
    props.$isActive ? "2px solid #a435f0" : "2px solid #a435f0"};

  border-radius: 10rem;
  text-transform: capitalize;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$isActive ? "#8710d8" : "transparent"};
    border: ${(props) =>
      props.$isActive ? "2px solid #8710d8" : "2px solid #a435f0"};
  }
`;

export const OuterContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 10px;
`;
