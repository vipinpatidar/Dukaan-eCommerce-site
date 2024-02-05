import { Add, Remove, Delete } from "@mui/icons-material";
import {
  Container,
  Wrapper,
  Title,
  Top,
  TopButton,
  TopText,
  TopTexts,
  Bottom,
  Button,
  Image,
  Info,
  PriceDetail,
  Product,
  ProductAmount,
  ProductAmountContainer,
  ProductPrice,
  ProductColor,
  ProductDetail,
  ProductId,
  ProductName,
  ProductSize,
  Details,
  Summary,
  SummaryItem,
  SummaryItemPrice,
  SummaryItemText,
  SummaryTitle,
  NoItem,
  Loading,
  ProductDelete,
  WishText,
} from "./cart.styled";

import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { makeUserRequest } from "../../utils/axios";

const KEY = import.meta.env.VITE_STRIPE_KEY;

const Cart = ({ isLoading, error, carts }) => {
  const [stripeToken, setStripeToken] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = useSelector((state) => state.cart);

  // console.log(carts, isLoading, error);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // update cart products

  const mutation = useMutation(
    (button) => {
      if (button.type === "add") {
        return makeUserRequest.put(`/carts/addOneProduct`, {
          userId: button.product.userId,
          prodCartId: button.product.prodCartId,
        });
      } else if (button.type === "remove") {
        return makeUserRequest.put(`/carts/removeOneProduct`, {
          userId: button.product.userId,
          prodCartId: button.product.prodCartId,
        });
      } else if (button.type === "delete") {
        return makeUserRequest.delete(
          `/carts/delete/${button.product.userId}/${button.product.prodCartId}`
        );
      } else if (button.type === "clearCart") {
        return makeUserRequest.delete(
          `/carts/clearCart/${button.product.userId}`
        );
      }
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
    }
  );

  const addOneProductHandler = (product) => {
    mutation.mutate({
      type: "add",
      product: product,
    });
  };

  const removeOneProductHandler = (product) => {
    mutation.mutate({
      type: "remove",
      product: product,
    });
  };

  const deleteOneProductHandler = (product) => {
    mutation.mutate({
      type: "delete",
      product: product,
    });
  };

  // console.log(carts);

  /*============= TOTAL PRICE ====================== */

  useEffect(() => {
    if (!isLoading) {
      const total = carts?.cartProducts?.reduce((curr, acc) => {
        return curr + acc.quantity * acc.price;
      }, 0);
      setTotalPrice(total);
    }
  }, [carts, isLoading]);

  /*============= PAYMENT ====================== */
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makePayment = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/checkout/payment`,
          {
            amount: totalPrice * 100,
          }
        );

        mutation.mutate({
          type: "clearCart",
          product: {
            userId: carts?.userId,
          },
        });

        console.log(response.data);
        navigate("/success", {
          state: {
            stripeData: response.data,
            products: carts,
            amount: totalPrice,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    stripeToken && makePayment();
    //eslint-disable-next-line
  }, [stripeToken, navigate, totalPrice, carts]);

  // console.log(carts);

  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton to={-1}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({cart?.totalProducts})</TopText>
            <WishText to={"/wishlist"}>Your Wishlist</WishText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW</TopButton> */}
        </Top>
        {isLoading && (
          <Loading>
            <h1 style={{ textAlign: "center" }}>Loading...</h1>
          </Loading>
        )}
        {error && (
          <Loading>
            <h1 style={{ color: "red" }}>
              {error?.response?.data?.error || error.message}
            </h1>
          </Loading>
        )}
        {!isLoading && carts && carts?.cartProducts?.length > 0 ? (
          <Bottom>
            <Info>
              {carts?.cartProducts?.map((product) => (
                <Product key={product.prodCartId}>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor $color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add
                        onClick={() => addOneProductHandler(product)}
                        style={{ cursor: "pointer" }}
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove
                        onClick={() => removeOneProductHandler(product)}
                        style={{ cursor: "pointer" }}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price}</ProductPrice>
                    <ProductDelete>
                      <Delete
                        onClick={() => deleteOneProductHandler(product)}
                      />
                    </ProductDelete>
                  </PriceDetail>
                </Product>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem $type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              {/* ====== STRIPE PAYMENT ======= */}
              <StripeCheckout
                name="Dukaan"
                image="https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg"
                billingAddress
                shippingAddress
                description={`Your total shipping is $${totalPrice}`}
                amount={totalPrice * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        ) : (
          <NoItem>
            <h1>I Am Empty :( </h1>
          </NoItem>
        )}
      </Wrapper>
    </Container>
  );
};

export default Cart;
