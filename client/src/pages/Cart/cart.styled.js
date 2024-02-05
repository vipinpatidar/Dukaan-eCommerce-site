import styled from "styled-components";
import { mobile, tab } from "../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding: 40px 20px;
  ${tab({ padding: "40px 10px" })}
  ${mobile({ padding: "40px 10px" })}
`;

export const Title = styled.h1`
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  margin: 0px auto 25px;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 10px;
  ${mobile({ padding: "20px 10px" })}
`;

export const TopButton = styled(Link)`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #222;
  background-color: transparent;
  color: #222;
  text-decoration: none;
  display: block;
`;

export const TopTexts = styled.div``;

export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  ${mobile({ display: "none" })}
`;
export const WishText = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

export const Loading = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  ${mobile({ flexDirection: "column" })}
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  ${mobile({ flexDirection: "column" })}
`;

export const Info = styled.div`
  flex: 3;
  padding: 0px 20px;
`;

export const Product = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 1rem;
  ${tab({ flexDirection: "column" })}
`;

export const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;

export const Image = styled.img`
  width: 200px;
`;

export const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 16px;
`;

export const ProductName = styled.span``;

export const ProductId = styled.span``;

export const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${tab({ flexDirection: "row", gap: "2rem", marginTop: "1.6rem" })}
`;

export const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  ${tab({ margin: "0px" })}
`;

export const ProductAmount = styled.div`
  font-size: 20px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  ${tab({ margin: "0px 8px" })}
`;

export const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
export const ProductDelete = styled.div`
  width: 20px;
  height: 26px;
  color: red;
  cursor: pointer;
  ${mobile({ marginBottom: "20px" })}
`;

export const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: max-content;
  position: sticky;
  right: 0;
  top: 20px;
  ${mobile({ position: "static" })}
`;

export const SummaryTitle = styled.h1`
  font-weight: 200;
`;

export const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.$type === "total" && "500"};
  font-size: ${(props) => props.$type === "total" && "24px"};
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`;

export const NoItem = styled.div`
  width: 100%;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`;
