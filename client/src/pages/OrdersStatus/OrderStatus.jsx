import { useQuery } from "react-query";
import { makeUserRequest } from "../../utils/axios";
import { useSelector } from "react-redux";

import {
  Container,
  GreetHeader,
  NoOrderContainer,
  PrevOrderBtn,
  PrevOrderContainer,
  ProductBtn,
} from "./orderStatus.styled";
import CurrentOrderCard from "../../components/OrdersCompo/CurrentOrderCard/CurrentOrderCard";

const OrderStatus = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser);

  //GET cart products
  const { isLoading, error, data } = useQuery(
    ["orders"],
    async ({ signal }) => {
      const res = await makeUserRequest.get(`/orders/find/${currentUser._id}`, {
        signal: signal,
      });
      return res.data;
    },
    {
      onError: (error) => {
        if (error.response?.status === 401) {
          // logoutHandler();
        }
      },
    }
  );

  const { currentOrder, threeDayOldOrders } = (!isLoading &&
    !error &&
    data) || { currentOrder: [], threeDayOldOrders: [] };

  // console.log(currentOrder);

  return (
    <Container>
      <h1>Your Orders</h1>

      {isLoading && <h4 className="loadingContainer">Loading...</h4>}

      <div>
        {currentOrder && currentOrder?.length > 0 ? (
          <div>
            <GreetHeader>
              <h2>
                Hey {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p>
                You purchase has been confirmed and will be shipped within 3 to
                4 business days.
              </p>
              <p
                style={{ color: "green", fontWeight: "bold", marginTop: "3px" }}
              >
                You can return products within 4 days after delivery.
              </p>
            </GreetHeader>

            <div>
              {currentOrder.map((order, index) => (
                <CurrentOrderCard order={order} key={order._id} index={index} />
              ))}
            </div>
          </div>
        ) : (
          !isLoading && (
            <NoOrderContainer>
              <h2>
                Hey {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p>You have not made any current purchase yet.</p>
              <h3>Order Some Products</h3>
              <ProductBtn to={"/products"}>Go To Products</ProductBtn>
            </NoOrderContainer>
          )
        )}
      </div>
      {threeDayOldOrders && threeDayOldOrders?.length > 0 && (
        <PrevOrderContainer>
          <PrevOrderBtn to={`/previous-orders`}>
            View Your Previous Orders
          </PrevOrderBtn>
        </PrevOrderContainer>
      )}
    </Container>
  );
};

export default OrderStatus;
