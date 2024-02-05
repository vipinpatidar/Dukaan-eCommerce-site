import { Container, Heading } from "./wishlist.styled.js";
import { useQuery } from "react-query";
import { makeUserRequest } from "../../utils/axios.js";
import { useSelector, useDispatch } from "react-redux";
import Products from "../../components/HomeCompo/Products/Products.jsx";
import { logoutHandler, logoutUser } from "../../redux/slice/userSlice.js";

const Wishlist = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  /*============= CART REQUEST ================== */
  //GET cart products
  const {
    isLoading,
    error,
    data: wishlist,
  } = useQuery(
    ["wishlist", "user"],
    async () => {
      if (user) {
        const res = await makeUserRequest.get(
          `/products/wishlist/${user?._id}`
        );
        return res.data;
      }
    },
    {
      onError: (error) => {
        if (error.response.status === 401) {
          dispatch(logoutHandler());
          dispatch(logoutUser());
        }
      },
    }
  );

  //   console.log(wishlist);

  return (
    <Container>
      <Heading>Your Wishlist</Heading>
      {error && <h2>{error?.response?.data?.error || error.message}</h2>}
      {!isLoading && <Products isWishlist={true} wishlist={wishlist} />}
    </Container>
  );
};

export default Wishlist;
