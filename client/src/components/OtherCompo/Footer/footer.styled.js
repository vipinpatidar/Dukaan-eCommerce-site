import styled from "styled-components";
import { mobile } from "../../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  padding: 20px 4px;
  background-color: #111;
  color: #fff;
  ${mobile({ flexDirection: "column" })}
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Logo = styled.h1`
  font-size: 22px;
  font-weight: 800;
`;

export const Desc = styled.p`
  margin: 15px 0px 0px;
`;

export const Button = styled(Link)`
  padding: 8px 14px;
  color: #fff;
  font-size: 15px;
  outline: none;
  border: none;
  margin-top: 10px;
  margin-bottom: 26px;
  text-decoration: none;
  display: block;
  width: max-content;
  background-color: #a435f0;

  &:hover {
    background-color: #8710d8;
  }
`;

export const SocialContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

export const Title = styled.h3`
  margin-bottom: 30px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

export const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

export const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

export const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const Payment = styled.img`
  width: 50%;
`;
