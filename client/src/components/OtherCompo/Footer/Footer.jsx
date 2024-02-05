import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import {
  Payment,
  Center,
  ContactItem,
  Container,
  Left,
  List,
  ListItem,
  Desc,
  Logo,
  SocialContainer,
  SocialIcon,
  Title,
  Right,
  Button,
} from "./footer.styled";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Container>
      <Left>
        <Logo>DUKAAN.</Logo>
        {user?.isAdmin ? (
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable.
          </Desc>
        ) : (
          <>
            <Desc>
              Become an admin and sell your product on your own price on Dukkan
              only in $1000 year. for more information:
            </Desc>
            <Button to={"/adminPolicy"}>Check here</Button>
          </>
        )}

        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 420 Gunda Gali, Khtarapur,
          Jaipur
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +91 964 622 4678
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@dukaan.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
