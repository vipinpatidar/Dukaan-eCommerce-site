import { Container, Button } from "./success.styled";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { makeUserRequest } from "../../utils/axios";
import { useState, useEffect, useRef } from "react";
import { address } from "../Payment/addressData";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  // const data = location.state?.stripeData;
  const cart = location.state?.products;
  const amount = location.state?.amount;
  const runOnce = useRef(false);

  // console.log(data);

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const createOrder = async () => {
      try {
        const res = await makeUserRequest.post("/orders/add", {
          signal: controller.signal,
          userId: currentUser._id,
          products: cart?.cartProducts.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: amount,
          address: address[Math.floor(Math.random() * address.length) + 1],
        });
        isMounted && setOrderId(res.data._id);
      } catch (err) {
        console.log(err);
      }
    };
    runOnce && createOrder();

    return () => {
      isMounted = false;
      runOnce.current = true;
      //isMounted && controller.abort();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <Container>
      <h2>
        Your order is being prepared. Your order id is {orderId}. Thanks for
        choosing DUKAAN.
      </h2>
      <Button to={"/"}>HOME</Button>
    </Container>
  );
};

export default Success;
