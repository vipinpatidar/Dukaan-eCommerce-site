// import { useState } from "react";
import { useState } from "react";
import { makeUserRequest } from "../../../utils/axios";
import AdminProduct from "../AdminProduct/AdminProduct";
import { Button, Container } from "./adminProducts.styled";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import AddProductModal from "../AddProductModal copy/AddProductModal";

const AdminProducts = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  // console.log(category);
  // console.log(filters);

  const closeOpenHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  // GET Admin products
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["adminProducts"], async () => {
    const res = await makeUserRequest.get(
      `/products/adminProducts/${user._id}`
    );

    return res.data;
  });

  // ADD PRODUCT

  // console.log(data);

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
        <p>{error.response.data.error}</p>;
      </div>
    );
  }

  return (
    <>
      <div>
        <Button onClick={closeOpenHandler}>Add Your Product</Button>
      </div>
      <Container>
        {isOpen && <AddProductModal onClose={closeOpenHandler} user={user} />}
        {products.length > 0 ? (
          products.map((product) => (
            <AdminProduct productItem={product} key={product._id} />
          ))
        ) : (
          <div className="loadingContainer">
            <h1>No Product found.</h1>
          </div>
        )}
      </Container>
    </>
  );
};

export default AdminProducts;
