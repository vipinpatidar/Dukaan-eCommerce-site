import styled from "styled-components";
import { mobile, tab } from "../../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 50vh;

  ${tab({ minHeight: "45vh" })}
`;
export const Profile = styled.div`
  margin-top: 80px;
  height: 1px;
  max-width: 300px;
  position: relative;
`;
export const ImgDiv = styled.div`
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: -50%;
  left: 50%;
  width: 120px;
  height: 120px;
  transform: translate(-50%, -50%);
  border: 3px solid #111;
  ${mobile({ width: "100px", height: "100px" })}
`;
export const Img = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  display: block;
  ${mobile({ width: "100px", height: "100px" })}
`;
export const InfoDiv = styled.div`
  width: 300px;
  background-color: #f6ebfe;
  display: flex;
  align-items: center;
  padding: 74px 10px 20px;
  justify-content: center;
  flex-direction: column;
  ${mobile({ padding: "65px 10px 20px" })}
`;
export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 5px;
`;

export const InfoHeading = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

export const InfoData = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

export const UpdateHeading = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;
export const UpdateBtn = styled.button`
  border: none;
  outline: none;
  padding: 9px 16px;
  background: #222;
  margin-top: 20px;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  display: block;
  letter-spacing: 1px;
  font-size: 15px;
  cursor: pointer;
`;

export const AdInfoDiv = styled.div`
  padding: 20px 20px;
  background-color: #fff;
  border: 2px solid red;
  margin: 10px auto 10px;

  & ul {
    margin: 15px;
    margin-left: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`;

export const AdBtn = styled(Link)`
  border: none;
  outline: none;
  padding: 9px 16px;
  font-size: 15px;
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 1px;
  width: max-content;
  cursor: pointer;
  margin-left: 10px;
  display: block;
  background-color: #a435f0;

  &:hover {
    background-color: #8710d8;
  }
`;
