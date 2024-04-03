import { useState, useEffect } from "react";
import { Container } from "./CheckoutOrders.styled.js";
import { loadStripe } from "@stripe/stripe-js";
import { makeUserRequest } from "../../utils/axios";
import { Elements } from "@stripe/react-stripe-js";
import OrderCheckoutForm from "./OrderCheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const OrderPayment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const amount = location?.state?.amount;
  const products = location?.state?.products;

  // console.log(amount, products);

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

  return (
    <Container>
      <h1>Pay here</h1>
      <p>
        <span>NOTE: </span> Please enter the following details and then use this
        test card number: 4242 4242 4242 4242
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
          <OrderCheckoutForm amount={amount} products={products} />
        </Elements>
      )}
    </Container>
  );
};

export default OrderPayment;
