import { useState } from "react";
import {
  Container,
  Profile,
  Img,
  ImgDiv,
  InfoDiv,
  Info,
  InfoHeading,
  InfoData,
  UpdateBtn,
  UpdateHeading,
  AdInfoDiv,
  AdBtn,
} from "./profileAction.styled";
import Modal from "../Modal/Modal";

const ProfileAction = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeOpenHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  // console.log(user);
  return (
    <Container>
      {isOpen && <Modal user={user} onClose={closeOpenHandler} />}
      <Profile>
        <ImgDiv>
          <Img
            src={
              user.profileImg ||
              "https://i.pinimg.com/736x/1b/88/39/1b8839790b0d919db215769661b698db.jpg"
            }
            alt="profile image"
          />
        </ImgDiv>
      </Profile>
      <InfoDiv>
        <Info>
          <InfoHeading>First Name:-</InfoHeading>
          <InfoData>{user.firstName}</InfoData>
        </Info>
        <Info>
          <InfoHeading>Last Name:-</InfoHeading>
          <InfoData>{user.lastName}</InfoData>
        </Info>
        <Info>
          <InfoHeading>Username:-</InfoHeading>
          <InfoData>{user.username}</InfoData>
        </Info>
        <Info>
          <InfoHeading>Email:-</InfoHeading>
          <InfoData>{user.email}</InfoData>
        </Info>
        <UpdateBtn onClick={closeOpenHandler}>Update Profile</UpdateBtn>
      </InfoDiv>
      {!user.isAdmin && (
        <AdInfoDiv>
          <UpdateHeading>Want become Admin on this platform?</UpdateHeading>
          <ul>
            <li>Sell your own products</li>
            <li>Update your products</li>
            <li>Earn good money</li>
            <li>Create your own shop here</li>
            <li>Only in $1000</li>
          </ul>
          <AdBtn to={"/adminPolicy"}>Click here</AdBtn>
        </AdInfoDiv>
      )}
    </Container>
  );
};

export default ProfileAction;
