import { styled } from "styled-components";
import { mobile, tab, desktop } from "../../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
  height: 74px;
  border-bottom: 2px solid #eee;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #fff;
  transform: ${(props) => props.$translateY};
  transition: all 200ms ease-in-out;
  padding: 6px;
  ${mobile({ height: "66px", padding: "6px 4px" })}
`;

export const Wrapper = styled.div`
  padding: 10px 35px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  background-color: #111;
  border-radius: 10rem;
  color: #fff;
  ${tab({ padding: "10px 25px 10px 25px" })}
  ${mobile({ padding: "10px 15px 10px 15px", gap: "8px" })};
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;

  & .searchDiv {
    margin-left: -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ display: "none" })}
  }

  ${tab({ flex: "0", flexBasis: "max-content" })}
  ${mobile({ flex: "0", flexBasis: "max-content", position: "static" })}
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${tab({ display: "none" })}
`;

export const SearchMobileContainer = styled.div`
  border: 2px solid #eee;
  display: flex;
  align-items: center;
  border-radius: 100rem;
  padding: 6px;
  margin-inline: 10px;
  cursor: pointer;
  color: #fff;

  ${desktop({ display: "none" })}
`;

export const Input = styled.input`
  width: 70%;
  height: 100%;
  outline: none;
  border: 2px solid #eee;
  margin-left: 20px;
  padding: 7px 13px;
  border-radius: 10rem;
  transition: all 300ms;

  ${tab({
    marginLeft: "0px",
    width: "100%",
  })}
  ${mobile({
    position: "absolute",
    width: "100%",
    top: "100%",
    left: "0",
    right: "0",
    height: "40px",
    backgroundColor: "#222",
    borderRadius: "0",
    border: "none",
    color: "#fff",
    zIndex: "50",
    transition: "all 300ms",
    transform: (props) =>
      props.$isOpenSearch ? "translateX(0%)" : "translateX(-100%)",
  })}
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
  font-size: 1.2rem;
  ${tab({ flex: "0", order: "-1", width: "max-content" })}
  ${mobile({ order: "-1", width: "max-content" })}
`;

export const Logo = styled(Link)`
  text-decoration: none;
  display: block;
  font-weight: bold;
  color: inherit;
  font-size: 22px;
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
  ${tab({ flex: 2, gap: "1.8rem" })}
  ${mobile({ flex: 2, gap: "1.4rem" })}
`;

export const MenuItem = styled(Link)`
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  color: #fff;
  ${mobile({ fontSize: "15px", marginLeft: "0px" })}
`;

export const ProfileItem = styled(Link)`
  font-size: 16px;
  border: 1.5px solid #fff;
  cursor: pointer;
  text-decoration: none;
  padding: 3px 6px 3px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10rem;
  /* min-width: 80px; */
  gap: 16px;
  text-transform: capitalize;
  color: #fff;
  ${mobile({
    marginLeft: "0px",
    padding: "0",
    justifyContent: "center",
  })}

  & .profileName {
    ${mobile({ display: "none" })}
  }

  & img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: block;
    border: 1px solid #fff;
    ${mobile({
      border: "none",
    })}
  }
`;

export const MenuContainer = styled.div`
  position: relative;
  border: 1px solid #ddd;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border-radius: 50%;
`;

export const MenuDiv = styled.div`
  position: absolute;
  top: 110%;
  z-index: 60;
  left: -350%;
  background-color: #fff;
  padding: 6px 0px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.16);
`;

export const MenuLink = styled(Link)`
  padding: 10px 20px;
  min-width: 150px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  text-transform: capitalize;
  color: #111;

  &:not(:last-child) {
    border-bottom: 2px solid #eee;
  }

  &:hover {
    background-color: #eee;
  }
  ${mobile({ fontSize: "15px", marginLeft: "0px" })}
`;

//#8710d8
//#a435f0;
