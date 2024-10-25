import { makeUserRequest } from "../../../utils/axios";
import { useMutation, useQueryClient } from "react-query";

const Button = ({ order, id, product, quantity }) => {
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

  return (
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
  );
};

export default Button;
