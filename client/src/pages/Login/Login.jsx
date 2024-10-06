import { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  Button,
  //   Link,
  StyledLink,
  GuestLink,
} from "./login.styled";
import { makePublicRequest } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slice/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ setAutoLogout }) => {
  const [inputs, setInputs] = useState({
    identity: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { state } = useLocation();

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await makePublicRequest.post(`/auth/login`, {
        identity: inputs.identity,
        password: inputs.password,
      });

      // console.log(res.data);

      if (res?.data?.token) {
        // console.log(res.data.token);
        dispatch(loginUser(res.data));

        const remainingMilliseconds = 24 * 60 * 60 * 1000;

        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        localStorage.setItem("expiryDate", expiryDate.toISOString());

        setAutoLogout(remainingMilliseconds);

        navigate(state?.path || "/");

        // window.location.href = state?.path || "/";
        // window.history.replaceState({}, "", "/");

        setError(null);
        setInputs({
          identity: "",
          password: "",
        });
      }
    } catch (error) {
      const err = error.response.data.error;
      setError(err);
      // console.log(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Your username or Email"
            name="identity"
            value={inputs.identity}
            onChange={inputChangeHandler}
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={inputChangeHandler}
            autoComplete="off"
          />
          <Button onClick={loginHandler} disabled={isLoading}>
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </Button>
          <GuestLink
            onClick={() => {
              setInputs({
                identity: "guestAdmin@gmail.com",
                password: "123456",
              });
            }}
          >
            Login As Guest Admin
          </GuestLink>
          <GuestLink
            onClick={() => {
              setInputs({
                identity: "guestUser@gmail.com",
                password: "123456",
              });
            }}
          >
            Login As Guest User
          </GuestLink>
          {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <StyledLink to={"/register"}>CREATE A NEW ACCOUNT</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
