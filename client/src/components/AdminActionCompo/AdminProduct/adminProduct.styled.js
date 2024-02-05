import styled from "styled-components";
import { mobile } from "../../../responsive";

export const Container = styled.div`
  width: 230px;
  position: relative;
  ${mobile({ width: "280px" })}
`;

export const DeleteBtn = styled.span`
  position: absolute;
  top: 10px;
  right: 22px;
  color: red;
  height: 20px;
  width: 20px;
  z-index: 2;
  cursor: pointer;
`;

export const EditBtn = styled.span`
  position: absolute;
  top: 10px;
  left: 12px;
  color: blue;
  height: 20px;
  width: 20px;
  z-index: 2;
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f5fbfd;
  position: relative;
  ${mobile({ height: "290px" })}
`;

export const Circle = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  z-index: 0;
`;

export const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

export const Info = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  transition: all 400ms;
  cursor: pointer;
  gap: 2px;
  padding: 6px 10px;
`;
export const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #111;
`;

export const Price = styled.h2`
  font-size: 22px;
  font-weight: 400;
  color: #111;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
`;

export const FilterColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  margin: 0px 4px;
  border: 1px solid blue;
`;

export const Desc = styled.p`
  margin-top: 6px;
  font-size: 14px;
`;
