import { useState } from "react";
import {
  Container,
  NavContainer,
  Button,
  OuterContainer,
} from "./profile.styled";
import { useLocation } from "react-router-dom";
import ProfileAction from "../../components/ProfileComponents/ProfileAction/ProfileAction";
import AdminAction from "../../components/ProfileComponents/AdminAction/AdminAction";
import { useSelector } from "react-redux";

const Profile = () => {
  const location = useLocation();
  const isAdmin = location?.state?.isAdmin;

  const [isActive, setIsActive] = useState(isAdmin ? "admin" : "profile");

  const user = useSelector((state) => state.user.currentUser);

  const activeLinkHandler = (input) => {
    setIsActive(input);
  };
  return (
    <Container>
      <NavContainer>
        {user.isAdmin && (
          <Button
            $isActive={isActive === "profile"}
            onClick={() => activeLinkHandler("profile")}
          >
            My Profile
          </Button>
        )}
        {user.isAdmin && (
          <Button
            $isActive={isActive === "admin"}
            onClick={() => activeLinkHandler("admin")}
          >
            Admin actions
          </Button>
        )}
      </NavContainer>

      <OuterContainer>
        {isActive === "profile" && <ProfileAction user={user} />}
        {user.isAdmin && isActive === "admin" && <AdminAction user={user} />}
      </OuterContainer>
    </Container>
  );
};

export default Profile;
