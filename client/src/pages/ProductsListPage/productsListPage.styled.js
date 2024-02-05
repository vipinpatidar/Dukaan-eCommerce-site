import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
  margin: 30px 0px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  text-transform: uppercase;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Filter = styled.div`
  margin: 20px 6px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;

export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  ${mobile({ marginRight: "0px" })}
`;

export const Select = styled.select`
  padding: 9px 12px;
  margin-right: 20px;
  outline: none;
  ${mobile({ margin: "10px 0px" })}
`;
export const Option = styled.option``;
