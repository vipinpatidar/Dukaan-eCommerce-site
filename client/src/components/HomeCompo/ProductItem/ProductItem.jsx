import { FavoriteBorderOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Info,
  Circle,
  Container,
  Image,
  IconsDiv,
  Price,
  Title,
  ImgContainer,
  Filter,
  FilterColor,
  FavoriteBtn,
  Desc,
} from "./productItem.styled";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { makeUserRequest } from "../../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutHandler, logoutUser } from "../../../redux/slice/userSlice";

const ProductItem = ({ product }) => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data: currentUser } = useQuery(
    ["user", user],
    async ({ signal }) => {
      if (user) {
        const res = await makeUserRequest.get(`/users/find/${user?._id}`, {
          signal: signal,
        });
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

  // console.log(error, "productItem");

  // update cart products

  const mutation = useMutation(
    (button) => {
      if (button.type === "add") {
        return makeUserRequest.post(`/favorites/add/${button.prodId}`);
      } else if (button.type === "remove") {
        return makeUserRequest.delete(`/favorites/remove/${button.prodId}`);
      }
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["wishlist"]);
      },
    }
  );

  const addFavoriteHandler = (prodId, checkFavorite) => {
    if (user) {
      if (checkFavorite === true) {
        mutation.mutate({
          type: "remove",
          prodId: prodId,
        });
      } else if (checkFavorite === false) {
        mutation.mutate({
          type: "add",
          prodId: prodId,
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <FavoriteBtn>
        {user && currentUser?.favoriteProducts?.includes(product._id) ? (
          <FavoriteIcon onClick={() => addFavoriteHandler(product._id, true)} />
        ) : (
          <FavoriteBorderOutlined
            onClick={() => addFavoriteHandler(product._id, false)}
          />
        )}
      </FavoriteBtn>
      <Link to={`/product/${product._id}`} className="link">
        <ImgContainer>
          <Circle />
          <Image src={product.image} />
        </ImgContainer>
        <Info>
          <Title>{product.title}</Title>
          <IconsDiv>
            <Price>${product.price}</Price>
            <Filter>
              {product.color.map((colour) => (
                <FilterColor key={colour} $color={colour} />
              ))}
            </Filter>
          </IconsDiv>
          <Desc>{product.description.slice(0, 45)}...</Desc>
        </Info>
      </Link>
    </Container>
  );
};

export default ProductItem;

/*
 <Container>
      <Circle />
      <Image src={product.image} />
      <Info>
        <Title>{product.title}</Title>
        <Price>${product.price}</Price>
        <IconsDiv>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Link to={`/product/${product._id}`}>
            <Icon>
              <SearchOutlined />
            </Icon>
          </Link>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
        </IconsDiv>
      </Info>
    </Container>


*/
