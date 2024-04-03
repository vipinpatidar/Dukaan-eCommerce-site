import { useQuery } from "react-query";
import {
  Container,
  PaginationContainer,
  PaginationItem,
} from "./adminOrders.styled";
import { makeUserRequest } from "../../../utils/axios";
import { useState } from "react";
import AdminOrdersCard from "../../AdminActionCompo/AdminOrdersCard.jsx/AdminOrdersCard";

const AdminOrders = ({ user }) => {
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useQuery(
    ["mangeOrders", page],
    async ({ signal }) => {
      const res = await makeUserRequest.get(
        `/orders/adminOrder/${user._id}?page=${page}`,
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

  const adminOrdersInfo = !isLoading && !error && data;
  // console.log(adminOrdersInfo);
  return (
    <Container>
      {isLoading && <h4 className="loadingContainer">Loading...</h4>}

      <div style={{ width: "100%" }}>
        {adminOrdersInfo &&
          adminOrdersInfo.orders &&
          adminOrdersInfo.orders?.length > 0 && (
            <div>
              <div>
                {adminOrdersInfo.orders.map((order, index) => (
                  <AdminOrdersCard
                    key={order._id}
                    order={order}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
      </div>

      {adminOrdersInfo && adminOrdersInfo.totalPage > 1 && (
        <PaginationContainer>
          <ul>
            {Array.from(
              { length: adminOrdersInfo.totalPage },
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

export default AdminOrders;
