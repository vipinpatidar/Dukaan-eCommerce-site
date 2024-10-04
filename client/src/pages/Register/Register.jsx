import { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Agreement,
  Button,
  StyledLink,
} from "./register.styled";
import { makePublicRequest } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    conPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (inputs.conPassword !== inputs.password) {
        setError("Passwords do not match please confirm same password");
        return;
      }
      const res = await makePublicRequest.post(`/auth/register`, inputs);

      if (res.data) {
        setInputs({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          conPassword: "",
        });
        setError(null);
        navigate("/login");
      }
    } catch (error) {
      const err = error?.response?.data?.error;
      setError(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={submitHandler}>
          <Input
            placeholder="first name"
            name="firstName"
            onChange={inputsChangeHandler}
            value={inputs.firstName}
          />
          <Input
            placeholder="last name"
            name="lastName"
            onChange={inputsChangeHandler}
            value={inputs.lastName}
          />
          <Input
            placeholder="username"
            name="username"
            onChange={inputsChangeHandler}
            value={inputs.username}
          />
          <Input
            placeholder="email"
            name="email"
            onChange={inputsChangeHandler}
            value={inputs.email}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={inputsChangeHandler}
            value={inputs.password}
          />
          <Input
            placeholder="confirm password"
            name="conPassword"
            type="password"
            onChange={inputsChangeHandler}
            value={inputs.conPassword}
          />
          {error && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {error}
            </p>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
        <StyledLink to={"/login"}>Already have an account?</StyledLink>
      </Wrapper>
    </Container>
  );
};

export default Register;
