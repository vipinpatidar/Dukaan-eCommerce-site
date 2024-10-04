import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { makeUserRequest } from "../../utils/axios";

import {
  Button,
  Form,
  Input,
  InputDiv,
  Label,
  InputsContainer,
} from "./CheckoutOrders.styled.js";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { addToCart } from "../../redux/slice/cartSlice.js";

const OrderCheckoutForm = ({ amount, products }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [locate, setLocate] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // console.log(currentUser);

  const [orderData, setOrderData] = useState({
    name: `${currentUser?.firstName} ${currentUser?.lastName}`,
    email: currentUser?.email,
    address: "",
    phone: "",
    pin: "",
  });

  // console.log(products);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const orderInputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({ ...prevState, [name]: value }));
  };

  const { mutate } = useMutation(
    (data) => {
      return makeUserRequest.delete(`/carts/clearCart/${data}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
    }
  );

  // if Payment successful post order
  const makeOrderHandler = async () => {
    try {
      await makeUserRequest.post("/orders/add", {
        userId: currentUser._id,
        products: products?.cartProducts.map((item) => ({
          productId: item._id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          status: "Order Placed",
        })),
        amount: amount,
        address: orderData.address,
        phone: orderData.phone,
        pin: orderData.pin,
        orderDate: Date.now(),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //Handling payments

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        return;
      }

      if (
        !orderData.address ||
        !orderData.phone ||
        !orderData.pin ||
        !orderData.email ||
        !orderData.name
      ) {
        setMessage("Please fill all the details then order");
        return;
      }

      setIsProcessing(true);

      const { error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
      }
      if (!error) {
        elements.getElement(PaymentElement).clear();
        await makeOrderHandler();
        await mutate(currentUser._id);
        setLocate(true);
      }

      // navigate("/login");

      setIsProcessing(false);
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (locate === true) {
      dispatch(addToCart({ totalProducts: 0 }));
      queryClient.invalidateQueries("cart");
      navigate("/orderStatus");
    }
    //eslint-disable-next-line
  }, [locate, navigate]);

  return (
    <Form onSubmit={handlePaySubmit}>
      <InputsContainer>
        <InputDiv>
          <Label htmlFor="name">
            <p>Name</p>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter Name"
              value={orderData.name}
              onChange={orderInputsChangeHandler}
            />
          </Label>
          <Label htmlFor="email">
            <p>Email</p>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={orderData.email}
              onChange={orderInputsChangeHandler}
            />
          </Label>
        </InputDiv>
        <Label htmlFor="address">
          <p>Address</p>
          <Input
            type="text"
            id="address"
            name="address"
            placeholder="Enter Address"
            value={orderData.address}
            onChange={orderInputsChangeHandler}
          />
        </Label>
        <InputDiv>
          <Label htmlFor="phone">
            <p>Phone Number</p>
            <Input
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter Phone Number"
              value={orderData.phone}
              onChange={orderInputsChangeHandler}
            />
          </Label>
          <Label htmlFor="pin">
            <p>Pin Code</p>
            <Input
              type="text"
              id="pin"
              name="pin"
              placeholder="Enter Pin Code"
              value={orderData.pin}
              onChange={orderInputsChangeHandler}
            />
          </Label>
        </InputDiv>
        <InputDiv>
          <Label htmlFor="">
            <p>Amount(in $)</p>
            <Input
              type="Number"
              placeholder="Enter Amount"
              name="amount"
              value={amount}
              disabled
            />
          </Label>
          <Label htmlFor="">
            <p>Number of Products</p>
            <Input
              type="Number"
              name="totalProducts"
              value={products?.cartProducts.length}
              disabled
            />
          </Label>
        </InputDiv>
      </InputsContainer>
      <PaymentElement />
      <Button disabled={!stripe}>
        {isProcessing ? "Processing..." : "Order Now"}
      </Button>
      {message && (
        <p
          style={{
            color: "red",
            fontSize: "15px",
            fontWeight: "500",
            margin: "10px 0px 0px",
          }}
        >
          {message}
        </p>
      )}
    </Form>
  );
};

export default OrderCheckoutForm;
