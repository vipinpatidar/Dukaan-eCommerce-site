import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { makeUserRequest } from "../../utils/axios";
import { updateUser } from "../../redux/slice/userSlice";

import { Button, Form } from "./payment.styled";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [locate, setLocate] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  // if Payment successful Make user Admin

  const makeAdminHandler = async () => {
    try {
      const res = await makeUserRequest.put(
        `/users/update/${currentUser._id}`,
        {
          isAdmin: true,
        }
      );
      if (res.data) {
        // console.log(res.data);
        dispatch(updateUser(res.data));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //Handling payments

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("clicked");

      if (!stripe || !elements) {
        return;
      }
      setIsProcessing(true);

      const { error } = await stripe.confirmPayment({
        elements,
        // confirmParams: {
        //   return_url: `${window.location.origin}/login`,
        // },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
      }
      if (!error) {
        elements.getElement(PaymentElement).clear();
        console.log("Payment success");
        await makeAdminHandler();
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
      navigate("/login");
    }
  }, [locate, navigate]);

  return (
    <Form onSubmit={handlePaySubmit}>
      <PaymentElement />
      <Button disabled={!stripe}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
      {message && (
        <p
          style={{
            color: "red",
            fontSize: "14px",
            margin: "10px 0px 0px",
          }}
        >
          {message}
        </p>
      )}
    </Form>
  );
};

export default CheckOutForm;
