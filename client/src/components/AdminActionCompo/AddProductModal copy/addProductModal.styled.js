import styled from "styled-components";
import { mobile, tab } from "../../../responsive";

export const Container = styled.div`
  position: fixed;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  ${tab({ maxWidth: "400px" })}
  ${mobile({ maxWidth: "370px" })}
`;
export const Backdrop = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  width: 100%;
  height: 100svh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
`;
export const Close = styled.div`
  position: absolute;
  top: 12px;
  right: 15px;
  width: 20px;
  height: 20px;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  border: 1px solid #111;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;
  background: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url("/assets/formCover2.jpg") center;
  background-size: cover;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 400;

  text-transform: uppercase;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  outline: none;
  border: 1px solid #eee;
`;

export const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

export const Button = styled.button`
  width: 40%;
  margin-top: 20px;
  border: none;
  padding: 12px 18px;

  color: white;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #a435f0;

  &:hover {
    background-color: #8710d8;
  }
`;
