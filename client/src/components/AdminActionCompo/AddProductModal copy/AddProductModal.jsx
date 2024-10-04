import { useState } from "react";
import {
  Container,
  Backdrop,
  Wrapper,
  Form,
  Input,
  Title,
  Button,
  Close,
  ImgContainer,
} from "./addProductModal.styled";
import { makeUserRequest } from "../../../utils/axios";
import { useMutation, useQueryClient } from "react-query";
import { uploadImage } from "../../../utils/imageUpload";

const AddProductModal = ({ onClose, user }) => {
  //GET SINGLE PRODUCT

  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    description: "",
  });

  const [arrayInputs, setArrayInputs] = useState({
    categories: "",
    size: "",
    color: "",
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const queryClient = useQueryClient();

  // const dispatch = useDispatch();

  const inputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const arrayInputsChangeHandler = (e) => {
    const { name, value } = e.target;
    setArrayInputs((prevState) => ({
      ...prevState,
      [name]: value.split(",").map((v) => v.toLowerCase().trim()),
    }));
  };

  // Update user in backend

  const { mutate, isLoading } = useMutation(
    (productData) => {
      return makeUserRequest.post(`/products/add`, productData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("adminProducts");
        setProcessing(false);
        onClose();
      },
    }
  );

  const updateProductHandler = async (downloadURL = null) => {
    try {
      setProcessing(true);
      const productData = {
        ...inputs,
        ...arrayInputs,
        image: downloadURL,
        productAdminId: user._id,
      };
      // console.log(productData);

      mutate(productData);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data.error);
    }
  };

  // Upload image and Handle updates

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      inputs.title === "" ||
      inputs.description === "" ||
      inputs.price === "" ||
      file === null ||
      arrayInputs.categories.length === 0 ||
      arrayInputs.color.length === 0 ||
      arrayInputs.size.length === 0
    ) {
      setError("Please fill all the fields");
      return;
    }

    try {
      setProcessing(true);
      await uploadImage(updateProductHandler, file);
      setProcessing(false);
    } catch (error) {
      const err = error.response.data.error;
      if (err) {
        setError(err);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <>
      <Backdrop onClick={onClose}></Backdrop>
      <Container>
        <Close onClick={onClose}>X</Close>

        <Wrapper>
          <Title>Add Your Product</Title>
          <Form onSubmit={handleClick}>
            <ImgContainer>
              <Input
                style={{ border: "none" }}
                placeholder="Your image"
                name="image"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && <img src={URL.createObjectURL(file)} alt="product" />}
            </ImgContainer>
            <Input
              placeholder="Product Title"
              name="title"
              onChange={inputsChangeHandler}
              value={inputs.title}
              required
            />
            <Input
              placeholder="Description"
              name="description"
              onChange={inputsChangeHandler}
              value={inputs.description}
              required
            />
            <Input
              placeholder="Price"
              name="price"
              onChange={inputsChangeHandler}
              value={inputs.price}
              type="number"
              required
            />
            <Input
              placeholder="Categories (eg. men, women, all, footwear, accessories)"
              name="categories"
              onChange={arrayInputsChangeHandler}
              value={arrayInputs.categories}
              required
            />
            <Input
              placeholder="Sizes (eg. S, M, L, XL) Or (8, 9, 10, 11) or (fit loose)"
              name="size"
              type="text"
              onChange={arrayInputsChangeHandler}
              value={arrayInputs.size}
            />
            <Input
              placeholder="Colors (eg. red, green, blue)"
              name="color"
              type="text"
              onChange={arrayInputsChangeHandler}
              value={arrayInputs.color}
            />
            {error && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {error}
              </p>
            )}
            <Button disabled={isLoading || processing}>
              {isLoading || processing ? "Processing..." : "ADD"}
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default AddProductModal;
