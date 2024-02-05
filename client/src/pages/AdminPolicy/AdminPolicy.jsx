import {
  Container,
  Policy,
  PolicyContainer,
  PolicyHeading,
  PolicyItem,
  PolicyLists,
  Heading,
  HeadPera,
  HeadingDiv,
  Button,
  BtnDiv,
} from "./adminPolicy.styled";
import { policy } from "./policyData";
import { useNavigate } from "react-router-dom";

const AdminPolicy = () => {
  const navigate = useNavigate();

  const payHandler = () => {
    navigate("/pay", { state: 1000 });
  };

  return (
    <Container>
      <PolicyContainer>
        <HeadingDiv>
          <Heading>OUR Policies</Heading>
          <HeadPera>
            Read all policies and then pay for becoming admin of your products
          </HeadPera>
        </HeadingDiv>
        <BtnDiv>
          <h2>GET ADMIN MEMBERSHIP FOR ONE YEAR</h2>
          <Button onClick={payHandler}>PAY $1000</Button>
        </BtnDiv>
        {policy.map((policy) => (
          <Policy key={policy.id}>
            <PolicyHeading>
              <span>{policy.id}.</span>
              {policy.heading}:
            </PolicyHeading>
            <PolicyLists>
              {policy.points.map((point, idx) => (
                <PolicyItem key={idx}>{point}</PolicyItem>
              ))}
            </PolicyLists>
          </Policy>
        ))}
      </PolicyContainer>
    </Container>
  );
};

export default AdminPolicy;
