import { Delete, Edit } from "@mui/icons-material";

import {
  Info,
  Circle,
  Container,
  ImgContainer,
  Image,
  IconsDiv,
  Price,
  Title,
  Filter,
  FilterColor,
  Desc,
  DeleteBtn,
  EditBtn,
} from "./adminProduct.styled";
import { useState } from "react";
import AdminUpdateModel from "../AdminUpdateModal/AdminUpdateModal";
import { makePublicRequest, makeUserRequest } from "../../../utils/axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { logoutHandler, logoutUser } from "../../../redux/slice/userSlice";

const AdminProduct = ({ productItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  const closeOpenHandler = (id) => {
    setIsOpen((prevState) => !prevState);
    setId(id);
  };

  const closeHandler = () => {
    setId(null);
    setIsOpen(false);
  };
  //Get product which we want to update and send data to form
  const {
    isLoading,
    error,
    data: prod,
  } = useQuery(
    ["product", id],
    async () => {
      if (id) {
        const res = await makePublicRequest.get(`/products/find/${id}`);
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

  //Delete a product

  // Update user in backend

  const cartMutation = useMutation(
    (prodId) => {
      return makeUserRequest.delete(
        `/carts/deleteCartProductWithProduct/${user._id}/${prodId}`
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cart");
      },
    }
  );

  const mutation = useMutation(
    (prodId) => {
      return makeUserRequest.delete(`/products/delete/${prodId}`);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("adminProducts");
        console.log(data.data);
        const prodId = data.data;
        deleteCartProductTooHandler(prodId);
      },
    }
  );

  const deleteProductHandler = (id) => {
    mutation.mutate(id);
  };

  const deleteCartProductTooHandler = (prodId) => {
    if (prodId) {
      console.log(prodId);
      cartMutation.mutate(prodId);
    }
  };

  return (
    <Container>
      {isOpen && !isLoading && prod && (
        <AdminUpdateModel onClose={closeHandler} product={!error && prod} />
      )}
      <ImgContainer>
        <Circle />
        <Image src={productItem.image} />
      </ImgContainer>
      <Info>
        <Title>{productItem.title}</Title>
        <IconsDiv>
          <Price>${productItem.price}</Price>
          <Filter>
            {productItem.color.map((colour) => (
              <FilterColor key={colour} $color={colour} />
            ))}
          </Filter>
        </IconsDiv>
        <Desc>{productItem.description.slice(0, 45)}...</Desc>
      </Info>
      <DeleteBtn onClick={() => deleteProductHandler(productItem._id)}>
        <Delete />
      </DeleteBtn>
      <EditBtn onClick={() => closeOpenHandler(productItem._id)}>
        <Edit />
      </EditBtn>
    </Container>
  );
};

export default AdminProduct;
