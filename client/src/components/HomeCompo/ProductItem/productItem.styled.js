import styled from "styled-components";
import { mobile, tab } from "../../../responsive";

export const Container = styled.div`
  width: 230px;
  position: relative;
  margin-bottom: 18px;

  & .link {
    text-decoration: none;
    display: block;
  }
  ${tab({ width: "235px" })}
  ${mobile({ width: "280px" })}
`;

export const FavoriteBtn = styled.span`
  position: absolute;
  top: 8px;
  right: 15px;
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
  text-decoration: none;
  color: #111;
`;

/*
export const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 400ms;
  cursor: pointer;
`;
export const IconsDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Container = styled.div`
  flex: 1;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

export const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

export const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #fff;
  padding: 4px 8px;
`;

export const Price = styled.h2`
  font-size: 36px;
  margin-bottom: 16px;
  font-weight: 400;
  color: #fff;
  padding: 4px 8px;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  color: #111 !important;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
*/
