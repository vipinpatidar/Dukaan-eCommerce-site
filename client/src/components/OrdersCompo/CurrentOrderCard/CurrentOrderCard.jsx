import { makeUserRequest } from "../../../utils/axios";
import {
  OrdersHeader,
  OrderProduct,
  Status,
  TotalContainer,
  OrderCount,
  OrdersContainer,
  StatusPera,
  ProdLink,
} from "./currentOrderCard.styled";
import { useMutation, useQueryClient } from "react-query";

const CurrentOrderCard = ({ order, index }) => {
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

  const { mutate, isLoading } = useMutation(
    (prodData) => {
      return makeUserRequest.put(`/orders/cancel-order`, prodData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
      },
    }
  );

  const cancelOrderHandler = (prodData) => {
    //  console.log(prodData);
    mutate(prodData);
  };

  let totalAmount = 0;
  for (let i = 0; i < order.products.length; i++) {
    if (
      order.products[i]?.productId &&
      order.products[i]?.status !== "Cancelled"
    ) {
      totalAmount +=
        order.products[i]?.productId?.price * order.products[i]?.quantity;
    }
  }

  // console.log(totalAmount);

  // console.log(order);

  return (
    <OrdersContainer $margin={index === 0 ? "20px" : "3rem"}>
      <OrderCount>Order No. {index + 1}</OrderCount>
      <OrdersHeader>
        <div className="orderId">
          <p>
            Order Id: <span>#{order?._id.slice(0, 20)}</span>
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
        order.products.length > 0 &&
        order?.products?.map(
          ({ productId: product, color, size, status, quantity, _id: id }) => {
            if (product === null) {
              return (
                <div
                  key={id}
                  style={{
                    textAlign: "center",
                    margin: "1.6rem auto 2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <h1
                    style={{
                      color: "red",
                      fontSize: "1.2rem",
                      marginBottom: "0rem",
                    }}
                  >
                    This product is not available or deleted
                  </h1>
                  <p style={{ fontSize: "1.1rem" }}>
                    Your refund amount will be transfer to your account soon
                  </p>
                </div>
              );
            }

            return (
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
                  {!["Cancelled"].includes(status) ? (
                    <button
                      onClick={() =>
                        cancelOrderHandler({
                          orderId: order._id,
                          productId: id,
                          amount: product.price * quantity,
                        })
                      }
                    >
                      {isLoading ? "Cancelling..." : "Cancel Order"}
                    </button>
                  ) : (
                    <StatusPera>
                      {status === "Cancelled" &&
                        "This Order Has Been Cancelled. Thank You For Using Our Services"}
                    </StatusPera>
                  )}
                </div>
              </OrderProduct>
            );
          }
        )}

      {totalAmount > 0 && (
        <TotalContainer>
          <>
            <div className="totalInfo">
              <p>
                Subtotal: <span>${totalAmount}</span>
              </p>
              <p>
                Tax: <span>$4</span>
              </p>
              <p>
                Shipping: <span>$6</span>
              </p>
            </div>
            <div>
              <p className="totalAmount">
                Total: <span>${totalAmount + 4 + 6}</span>
              </p>
            </div>
          </>
        </TotalContainer>
      )}
    </OrdersContainer>
  );
};

export default CurrentOrderCard;
