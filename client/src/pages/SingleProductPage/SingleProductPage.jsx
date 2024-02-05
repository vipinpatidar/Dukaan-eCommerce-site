import { Add, Remove } from "@mui/icons-material";
import {
  Container,
  Wrapper,
  Image,
  ImgContainer,
  InfoContainer,
  Title,
  Desc,
  Price,
  Filter,
  FilterColor,
  FilterContainer,
  FilterSize,
  FilterSizeOption,
  FilterTitle,
  AddContainer,
  Amount,
  Button,
  AmountContainer,
} from "./singleProductPage.styled";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { makePublicRequest, makeUserRequest } from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state?.user?.currentUser);

  const queryClient = useQueryClient();

  // console.log(user);

  const { prodId } = useParams();

  //GET SINGLE PRODUCT
  const {
    isLoading,
    error,
    data: product,
  } = useQuery(["product", prodId], async () => {
    const res = await makePublicRequest.get(`/products/find/${prodId}`);

    return res.data;
  });

  // ADD CART DATA TO BACKEND

  const mutation = useMutation(
    (product) => {
      // console.log(product);
      return makeUserRequest.post(`/carts/add`, product);
    },
    {
      onSuccess: async (data) => {
        queryClient.invalidateQueries("cart");
        // console.log(data.data);

        dispatch(addToCart({ totalProds: data?.data.cartProducts.length }));
      },
    }
  );

  // CART ACTIONS
  const cartClickHandler = () => {
    if (isLoggedIn) {
      mutation.mutate({
        ...product,
        quantity,
        color,
        size,
        prodCartId: crypto.randomUUID(),
        userId: user._id,
      });
      dispatch(addToCart({ ...product, quantity, color, size }));
    } else {
      navigate("/login", { state: { path: location.pathname } });
    }
  };

  useEffect(() => {
    setColor(product?.color?.[0]);
    setSize(product?.size?.[0]);
  }, [product]);

  if (isLoading) {
    return (
      <div className="loadingContainer">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="errorContainer">
        <p>Opps 🙄 Something went wrong!</p>;
      </div>
    );
  }

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product?.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color.map((colour) => (
                <FilterColor
                  key={colour}
                  $color={colour}
                  $border={colour === color ? true : false}
                  onClick={() => setColor(colour)}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize name="size" onChange={(e) => setSize(e.target.value)}>
                {product.size.map((size) => (
                  <FilterSizeOption key={size}>{size}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
              />
              <Amount>{quantity}</Amount>
              <Add onClick={() => setQuantity((prev) => prev + 1)} />
            </AmountContainer>
            <Button onClick={cartClickHandler}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default SingleProductPage;
