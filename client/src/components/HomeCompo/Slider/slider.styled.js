import styled from "styled-components";
import { mobile, tab } from "../../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: calc(90vh);
  display: flex;
  /* align-items: center; */
  position: relative;
  overflow: hidden;
  ${tab({ height: "fit-content" })}
  ${mobile({ height: "fit-content" })}
`;

export const Arrow = styled.div`
  width: 44px;
  height: 44px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid #8710d8;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  color: #8710d8;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "2%"};
  right: ${(props) => props.direction === "right" && "2%"};
  margin: auto;
  cursor: pointer;
  opacity: 0.85;
  z-index: 2;
`;

export const Wrapper = styled.div`
  /* height: 100%; */
  display: flex;
  transition: all 400ms ease;
  transform: translateX(${(props) => props.$slideIndex * -100}vw);
`;

export const Slide = styled.div`
  width: 100vw;
  max-height: fit-content;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.$bg};
  ${mobile({ flexDirection: "column" })}
`;

export const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${tab({ height: "100%" })}
  ${mobile({ height: "fit-content", flex: "0", padding: "30px 10px" })}


  & .shape {
    position: absolute;
    background: linear-gradient(
      45deg,
      var(--primary) 0%,
      var(--secondary) 100%
    );
    animation: morph 8s ease-in-out infinite;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    height: 400px;
    transition: all 400ms ease-in-out;
    width: 400px;
    z-index: 0;

    ${tab({ height: "300px", width: "300px" })}
    ${mobile({ height: "260px", width: "260px" })}
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  z-index: 1;
  object-fit: contain;
  ${tab({ height: "400px" })}
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  ${tab({ padding: "20px 30px" })}
  ${mobile({
    padding: "50px 30px",
    height: "fit-content",
    flex: "0",
  })}
`;

export const Title = styled.h1`
  font-size: 60px;
  ${tab({ fontSize: "40px" })}
  ${mobile({ fontSize: "32px" })}
`;

export const Desc = styled.p`
  margin: 30px 0px;
  font-size: 20px;
  font-weight: 500;
  max-width: 560px;
  letter-spacing: 1px;
  text-transform: capitalize;
  ${tab({ margin: "25px 0px", fontSize: "17px" })}
  ${mobile({ margin: "20px 0px", fontSize: "17px" })}
`;

export const Button = styled(Link)`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #111;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: max-content;
  color: #fff;
  font-weight: 500;
  ${mobile({ fontSize: "16px" })}
`;
