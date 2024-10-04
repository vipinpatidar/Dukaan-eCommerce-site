import { useMutation, useQueryClient } from "react-query";
import {
  OrdersHeader,
  OrderProduct,
  Status,
  TotalContainer,
  OrdersContainer,
  StatusPera,
  ProdLink,
} from "./prevOrderCard.styled";
import { makeUserRequest } from "../../../utils/axios";
const PrevOrderCard = ({ order, index }) => {
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
      return makeUserRequest.put(`/orders/return-order`, prodData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("threeDayOldOrders");
      },
    }
  );

  const returnOrderHandler = (prodData) => {
    //  console.log(prodData);
    mutate(prodData);
  };

  const isOrderMoreThanSevenDays =
    new Date() - new Date(order.orderDate) > 7 * 24 * 60 * 60 * 1000;

  // console.log(new Date() - new Date(order.orderDate));

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
        order.products.length > 0 &&
        order.products.map(
          ({ productId: product, color, size, status, quantity, _id: id }) => {
            if (product === null) {
              return (
                <h1
                  key={"heading"}
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "1.2rem",
                    marginTop: "1.6rem",
                  }}
                >
                  This product is not available or deleted
                </h1>
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
                  {["Delivered"].includes(status) &&
                  !isOrderMoreThanSevenDays ? (
                    <button
                      onClick={() =>
                        returnOrderHandler({
                          orderId: order._id,
                          productId: id,
                        })
                      }
                    >
                      {isLoading ? "Processing..." : "Return"}
                    </button>
                  ) : (
                    <StatusPera $color={statusColors[status]}>
                      {status === "Returned"
                        ? "You will get your money back within 24 hours."
                        : status === "Refunded"
                        ? "Your money has been refunded. Thank you for shopping with us."
                        : status === "Cancelled"
                        ? "This Order Was Cancelled. Thank You For Using Our Services"
                        : status === "Delivered"
                        ? "This Order Was Delivered. Thank You For Using Our Services"
                        : "Thank You For Using Our Services"}
                    </StatusPera>
                  )}
                </div>
              </OrderProduct>
            );
          }
        )}

      {order.amount > 0 && (
        <TotalContainer>
          <>
            <div className="totalInfo">
              <p>
                Subtotal: <span>${order.amount}</span>
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
                Total: <span>${order.amount + 4 + 6}</span>
              </p>
            </div>
          </>
        </TotalContainer>
      )}
    </OrdersContainer>
  );
};

export default PrevOrderCard;
