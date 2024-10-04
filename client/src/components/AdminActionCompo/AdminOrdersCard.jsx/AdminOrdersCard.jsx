import { useMutation, useQueryClient } from "react-query";
import {
  OrdersHeader,
  OrderProduct,
  Status,
  OrdersContainer,
  StatusPera,
  ProdLink,
} from "./adminOrdersCard.styled";
import { makeUserRequest } from "../../../utils/axios";
import StatusDropdown from "./StatusDropdown";

const AdminOrdersCard = ({ order, index }) => {
  const statusColors = {
    "Order Placed": "#007bff",
    Processing: "#ffc107",
    Shipped: "#28a745",
    "Out for Delivery": " #ff6c5c",
    Delivered: "#6c757d",
    Returned: "#FF62A5",
    Cancelled: "#dc3545",
    Refunded: "#6610f2",
    UnKnown: "#17a2b8",
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (prodData) => {
      return makeUserRequest.put(`/orders/update-order-status`, prodData);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("mangeOrders");
        await queryClient.invalidateQueries("orders");
        await queryClient.invalidateQueries("threeDayOldOrders");
      },
    }
  );

  const changeStatusHandler = (prodData) => {
    // console.log(prodData);
    mutate(prodData);
  };

  return (
    <OrdersContainer $margin={index === 0 ? "20px" : "3rem"}>
      <OrdersHeader>
        <div className="orderId">
          <p>
            Order Id: <span>#{order._id.slice(0, 20)}</span>
          </p>
          <p>
            Order Date:{" "}
            <span>
              {new Date(order.orderDate)?.toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </span>
          </p>
        </div>
        <address>
          <p>
            {" "}
            Address: <span>{order.address}</span>
          </p>
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "center",
              marginTop: "3px",
            }}
          >
            <p>
              Pin/Postal Code: <span>{order.pin}</span>
            </p>
            <p>
              Phone No.: <span>{order.phone}</span>
            </p>
          </div>
        </address>
      </OrdersHeader>
      {order.products &&
        order.products.flat(2).length > 0 &&
        order.products
          .flat(2)
          .map(
            ({
              matchedProducts: product,
              color,
              size,
              status,
              quantity,
              _id: id,
            }) => (
              <OrderProduct key={id}>
                <div className="product">
                  <ProdLink to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.title} />
                  </ProdLink>
                  <div className="productInfo">
                    <ProdLink to={`/product/${product._id}`} className="title">
                      {product.title}
                    </ProdLink>
                    <p>
                      Color: <span>{color}</span>
                    </p>
                    <p>
                      Size: <span>{size}</span>
                    </p>
                    <p>
                      Quantity: <span>{quantity}</span>
                    </p>
                    <p>
                      Price: <span>${product.price}</span>
                    </p>
                  </div>
                  <h2 className="totalPrice">${product.price * quantity}</h2>
                </div>
                <div className="orderStatus">
                  <Status
                    $bgColor={statusColors[status] || statusColors["UnKnown"]}
                  >
                    {/* Out for Delivery */}
                    {status}
                  </Status>
                  {status !== "Cancelled" ? (
                    <StatusDropdown
                      status={status}
                      changeStatusHandler={changeStatusHandler}
                      id={id}
                      orderId={order._id}
                    />
                  ) : (
                    <StatusPera $color={statusColors["Cancelled"]}>
                      This Order Was Cancelled.
                    </StatusPera>
                  )}
                </div>
              </OrderProduct>
            )
          )}
    </OrdersContainer>
  );
};

export default AdminOrdersCard;
