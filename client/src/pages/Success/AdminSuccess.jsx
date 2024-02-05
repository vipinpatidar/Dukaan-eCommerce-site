import { Container, Button } from "./success.styled";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AdminPaySuccess = () => {
  const location = useLocation();
  const isPaid = location?.state?.isPaid;
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate("/profile", { state: { isAdmin: true } });
  };

  if (!isPaid) {
    return (
      <Container>
        <h1>🚫 Wrong Action 🚫</h1>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button>GO TO HOME PAGE</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <h1>🎉 Congratulation 🎉</h1>
      <h2>You can add and sell your own products as an Admin</h2>
      <Button onClick={redirectHandler}>Click here to sell products</Button>
    </Container>
  );
};

export default AdminPaySuccess;
