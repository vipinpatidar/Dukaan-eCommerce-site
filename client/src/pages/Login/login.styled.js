import styled from "styled-components";
import { mobile, tab } from "../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${tab({ width: "55%" })}
  ${mobile({ width: "92%" })}
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
`;

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 12px 18px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #a435f0;

  &:hover {
    background-color: #8710d8;
  }
`;

export const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

export const GuestLink = styled.div`
  margin-block: 8px;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;
