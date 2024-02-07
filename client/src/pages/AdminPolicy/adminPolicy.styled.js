import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

export const HeadingDiv = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const Heading = styled.h1`
  font-size: 26px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const HeadPera = styled.p``;

export const PolicyContainer = styled.div`
  padding: 1rem 3rem;
  ${mobile({ padding: "1rem" })}
`;

export const Policy = styled.div`
  margin-bottom: 8px;
`;

export const PolicyHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;

  & span {
    color: #554;
    margin-right: 5px;
    font-weight: 500;
  }
`;

export const PolicyLists = styled.ul`
  margin-left: 2.4rem;
`;

export const PolicyItem = styled.li`
  margin-bottom: 4px;
  line-height: 22px;
`;

export const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 0 30px;
  gap: 2rem;
  background-color: #ddd;
  padding: 12px 8px;
  text-transform: uppercase;
  ${mobile({ padding: "8px", gap: "1rem" })}

  & h2 {
    font-size: 18px;
    font-weight: 500;
    ${mobile({ fontSize: "16px", flexBasis: "60%" })}
  }
`;

export const Button = styled.button`
  padding: 8px 14px;
  background-color: teal;
  color: #fff;
  font-size: 15px;
  outline: none;
  border: none;
  text-decoration: none;
  display: block;
  width: max-content;
  cursor: pointer;
`;
