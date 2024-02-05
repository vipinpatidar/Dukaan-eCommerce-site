import { Container, Button, Close } from "./announcement.styled";

const AdminAnnouncement = ({ onClose }) => {
  return (
    <Container>
      <p>Want to Become Admin and Sell your own products</p>
      <Button to={"/adminPolicy"}>Check here</Button>
      <Close onClick={onClose}>X</Close>
    </Container>
  );
};

export default AdminAnnouncement;
