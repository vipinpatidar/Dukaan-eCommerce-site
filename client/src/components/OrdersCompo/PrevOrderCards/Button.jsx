import { useMutation, useQueryClient } from "react-query";
import { makeUserRequest } from "../../../utils/axios";

const Button = ({ order, id }) => {
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

  return (
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
  );
};

export default Button;
