import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { makeUserRequest } from "../../utils/axios";
import { useState } from "react";
import {
  Container,
  PaginationContainer,
  PaginationItem,
  TopButton,
} from "./orderHistory.styled";
import PrevOrderCard from "../../components/OrdersCompo/PrevOrderCards/PrevOrderCard";

const OrderHistory = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [page, setPage] = useState(1);
  // console.log(currentUser);

  //GET cart products
  const { isLoading, error, data } = useQuery(
    ["threeDayOldOrders", page],
    async ({ signal }) => {
      const res = await makeUserRequest.get(
        `/orders/threeDayOldOrders/${currentUser._id}?page=${page}`,
        {
          signal: signal,
        }
      );
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

  const prevOrderInfo = !isLoading && !error && data;
  // console.log(prevOrderInfo);

  return (
    <Container>
      <div className="historyHeader">
        <TopButton to={"/orderStatus"}>Back</TopButton>
        <h1>Your Previous Orders</h1>
      </div>

      {isLoading && <h4 className="loadingContainer">Loading...</h4>}

      <div>
        {prevOrderInfo &&
          prevOrderInfo.threeDayOldOrders &&
          prevOrderInfo.threeDayOldOrders?.length > 0 && (
            <div>
              <div>
                {prevOrderInfo.threeDayOldOrders.map((order, index) => (
                  <PrevOrderCard key={index} order={order} index={index} />
                ))}
              </div>
            </div>
          )}
      </div>

      {prevOrderInfo && prevOrderInfo.totalPage > 1 && (
        <PaginationContainer>
          <ul>
            {Array.from(
              { length: prevOrderInfo.totalPage },
              (_, index) => index + 1
            ).map((number) => (
              <PaginationItem
                $bgColor={number === page ? "#1A2634" : "none"}
                $color={number === page ? "#fff" : "#1A2634"}
                key={number}
                onClick={() => setPage(number)}
              >
                {number}
              </PaginationItem>
            ))}
          </ul>
        </PaginationContainer>
      )}
    </Container>
  );
};

export default OrderHistory;
