import {
  Container,
  Wrapper,
  Left,
  Language,
  Center,
  Right,
  Logo,
  MenuItem,
  Input,
  ProfileItem,
  MenuDiv,
  MenuLink,
  MenuContainer,
  SearchMobileContainer,
} from "./navbar.styled";
import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined, Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchCategory from "../SearchCategory/SearchCategory";

const Navbar = ({ logoutHandler }) => {
  const totalProducts = useSelector((state) => state.cart.totalProducts);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isDown, setIsDown] = useState("translateY(0)");
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        if (window.scrollY < lastPosition) {
          setIsDown("translateY(0)");
        } else if (window.scrollY > lastPosition) {
          setIsDown("translateY(-100%)");
        }
      } else {
        setIsDown("translateY(0)");
      }
      setLastPosition(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastPosition]);

  const closeOpenMenu = () => {
    setIsOpen((preState) => !preState);
    setIsOpenSearch(false);
    setSearchQuery("");
  };
  const closeOpenSearch = () => {
    setIsOpenSearch((preState) => !preState);
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleLogout = () => {
    logoutHandler();
    closeOpenMenu();
  };

  return (
    <Container $translateY={isDown}>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          {searchQuery.length > 0 && (
            <SearchCategory
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsOpenSearch={setIsOpenSearch}
            />
          )}

          <Input
            placeholder="Search"
            name="search"
            type="search"
            $isOpenSearch={isOpenSearch}
            autoComplete="off"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <div className="searchDiv">
            <Search style={{ color: "#333", fontSize: 16 }} />
          </div>

          <SearchMobileContainer onClick={closeOpenSearch}>
            <Search style={{ color: "#fff", fontSize: 16 }} />
          </SearchMobileContainer>
        </Left>
        <Center>
          <Logo to={"/"}>DUKAAN.</Logo>
        </Center>
        <Right>
          <MenuContainer>
            <Menu onClick={closeOpenMenu} style={{ cursor: "pointer" }} />
            {isOpen && (
              <MenuDiv>
                <MenuLink onClick={closeOpenMenu} to={"/"}>
                  Home
                </MenuLink>
                <MenuLink onClick={closeOpenMenu} to={"/products"}>
                  Products
                </MenuLink>
                {isLoggedIn && (
                  <MenuLink onClick={closeOpenMenu} to={"/wishlist"}>
                    Wishlist
                  </MenuLink>
                )}
                {isLoggedIn && (
                  <MenuLink onClick={closeOpenMenu} to={"/orderStatus"}>
                    Orders
                  </MenuLink>
                )}
                {isLoggedIn && user?.isAdmin ? (
                  <MenuLink
                    onClick={closeOpenMenu}
                    to={"/profile"}
                    state={{ isAdmin: true }}
                  >
                    Admin Dash
                  </MenuLink>
                ) : (
                  isLoggedIn && (
                    <MenuLink onClick={closeOpenMenu} to={"/profile"}>
                      Profile
                    </MenuLink>
                  )
                )}
                {isLoggedIn ? (
                  <MenuLink onClick={handleLogout}>Logout</MenuLink>
                ) : (
                  <MenuLink onClick={closeOpenMenu} to={"/login"}>
                    Sign In
                  </MenuLink>
                )}
                {!isLoggedIn && (
                  <MenuLink onClick={closeOpenMenu} to={"/register"}>
                    Register
                  </MenuLink>
                )}
              </MenuDiv>
            )}
          </MenuContainer>

          <MenuItem to={"/cart"}>
            <Badge badgeContent={totalProducts} color="primary">
              <ShoppingCartOutlined style={{ width: "28px", height: "28px" }} />
            </Badge>
          </MenuItem>

          {isLoggedIn && (
            <ProfileItem to={"/profile"}>
              <div className="profileName">{user?.firstName}</div>
              <img
                src={`${
                  user.profileImg ||
                  "https://i.pinimg.com/736x/1b/88/39/1b8839790b0d919db215769661b698db.jpg"
                }`}
                alt="profile image"
              />
            </ProfileItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
