import styled from "styled-components";
import { tab } from "../../../responsive";
import { Link } from "react-router-dom";

export const OrdersContainer = styled.div`
  border-bottom: 2px solid #777;
  margin-top: ${(props) => props.$margin};
`;

export const OrderCount = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: #000;
`;

export const OrdersHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 2px solid #777;
  padding: 1.2rem 2px;
  margin-top: 8px;

  .orderId {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    ${tab({ flexDirection: "column", alignItems: "flex-start" })}

    & span {
      font-weight: 600;
      color: #222;
    }
  }

  & address {
    & span {
      font-weight: 600;
      color: #444;
    }
  }
`;

export const OrderProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #ccc;
  padding: 1rem 2px;
  gap: 16px;

  ${tab({
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1rem 2px",
  })}

  .product {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 2rem;

    ${tab({
      justifyContent: "space-between",
    })}

    .productInfo {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title {
      font-weight: 600;
      color: #222;
    }

    .totalPrice {
      font-weight: 600;
      color: #333;
      font-size: 1.6rem;
    }
    & span {
      font-weight: 600;
      color: #222;
    }
    & img {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  }

  .orderStatus {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;

    ${tab({
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    })}

    & button {
      padding: 9px 18px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      background-color: red;
      color: #fff;
    }
  }
`;

export const ProdLink = styled(Link)`
  text-decoration: none;
  display: block;
  font-size: 20px;
`;

export const StatusPera = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => props.$color};
`;

export const Status = styled.h3`
  background-color: ${(props) => props.$bgColor};
  padding: 7px 14px;
  color: #fff;
  font-weight: 600;
  border-radius: 100rem;
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid #ccc;

  padding: 1.2rem 30px;

  & span {
    font-weight: 600;
    color: #222;
  }

  .totalInfo {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .totalAmount {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.2rem;
    & span {
      font-weight: 600;
      color: #444;
      font-size: 2.2rem;
    }
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const SelectedOptionButton = styled.button`
  padding: 10px 5px;
  background-color: #fff !important;
  color: ${(props) => props.$bgColor} !important;
  border: none;
  cursor: pointer;
  width: 185px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${(props) => props.$bgColor} !important;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 105%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const OptionItem = styled.li`
  padding: 13px 10px;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  color: #fff;
`;
