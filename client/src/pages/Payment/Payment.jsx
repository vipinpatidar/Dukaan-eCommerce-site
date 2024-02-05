import { useState, useEffect } from "react";
import { Container } from "./payment.styled";
import { loadStripe } from "@stripe/stripe-js";
import { makeUserRequest } from "../../utils/axios";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const amount = location?.state;

  // console.log(amount);

  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await makeUserRequest.post(`/checkout/payment`, {
          amount: amount * 100 || 0,
        });

        setClientSecret(res.data);
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.error);
      }
    };
    makePayment();
  }, [amount]);

  // console.log(clientSecret);

  return (
    <Container>
      <h1>Pay here</h1>
      <p>
        <span>NOTE: </span> After Payment you will be redirect to Login page.
        Please Login Again. Thank you :)
      </p>
      {message && (
        <p
          style={{
            color: "red",
            fontSize: "16px",
            margin: "10px 0px 0px",
          }}
        >
          {message}
        </p>
      )}
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          key={clientSecret}
          options={{ clientSecret }}
        >
          <CheckOutForm />
        </Elements>
      )}
    </Container>
  );
};

export default Payment;
