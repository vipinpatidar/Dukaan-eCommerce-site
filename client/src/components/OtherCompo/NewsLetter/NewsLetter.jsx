import {
  Input,
  Button,
  InputContainer,
  Container,
  Title,
  Desc,
} from "./newsLetter.styled";
import { Email, ShoppingBag } from "@mui/icons-material";

const NewsLetter = () => {
  return (
    <Container>
      <Title>
        <span>
          <ShoppingBag />
        </span>{" "}
        Newsletter
      </Title>
      <Desc>Get Best Offer And Updates.</Desc>
      <p>
        With the help of our Newsletter get our best offers and stay updated on
        our products and services.
      </p>
      <InputContainer>
        <Input placeholder="Enter Your Email Address" />
        <Button>
          <Email />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
