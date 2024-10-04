import styled from "styled-components";
import { tab } from "../../responsive";

export const Container = styled.div`
  margin: 30px 0px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 34px;
  text-transform: uppercase;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 2rem;
  margin-bottom: 50px;

  ${tab({ paddingInline: "0.5rem", alignItems: "flex-start" })}
`;

export const Filter = styled.div`
  margin: 20px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${tab({
    margin: "0px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "normal",
    justifyContent: "flex-start",
  })}
`;

export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 10px;
  ${tab({ marginRight: "0px" })}
`;

export const Select = styled.select`
  padding: 9px 12px;
  margin-right: 20px;
  outline: none;
  ${tab({ margin: "10px 0px" })}
`;
export const Option = styled.option`
  padding: 5px 10px;
`;

export const Button = styled.button`
  text-align: center;
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
