import styled from "styled-components";
import { mobile, tab } from "../../responsive";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  max-height: 80vh;
  ${mobile({
    padding: "25px 10px",
    flexDirection: "column",
    maxHeight: "fit-content",
  })}
`;

export const ImgContainer = styled.div`
  flex: 1;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${tab({ height: "100%" })}
  ${mobile({ height: "35vh" })}
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 40px;
  ${mobile({ padding: "15px" })}
`;

export const Title = styled.h1`
  font-weight: 400;
  font-size: 24px;
`;

export const Desc = styled.p`
  margin: 20px 0px;
`;

export const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

export const FilterContainer = styled.div`
  width: 60%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${tab({ width: "100%" })}
  ${mobile({ width: "100%" })}
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

export const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: ${(props) => (props.$border ? "2px solid blue" : "none")};
  margin: 0px 5px;
  cursor: pointer;
`;

export const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

export const FilterSizeOption = styled.option``;

export const AddContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tab({ width: "100%" })}
  ${mobile({ width: "100%" })}
`;

export const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

export const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

export const Button = styled.button`
  padding: 15px;
  border: 2px solid #8710d8;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;
