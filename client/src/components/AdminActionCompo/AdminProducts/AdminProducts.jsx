// import { useState } from "react";
import { useState } from "react";
import { makeUserRequest } from "../../../utils/axios";
import AdminProduct from "../AdminProduct/AdminProduct";
import { Button, Container, GuideContainer } from "./adminProducts.styled";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Button onClick={closeOpenHandler}>Add Your Product</Button>
        <GuideContainer>
          <h2 className="guideHeading">
            Please consider the following guidelines to ensure easy access to
            your product for users.
          </h2>
          <ul className="guideItems">
            <li>
              Please fill in Categories, Size, and Color with comma-separated
              values, like this: footwear,men or 8,9,10 or black,white,red.
            </li>
            <li>Use women or men as spelling in categories</li>
            <li>
              Choose a suitable category from the given options: men, women,
              footwear, accessories and topwear according to your product.
            </li>
            <li>
              For example, if you are adding a t-shirt, then fill in the
              categories as follows: (t-shirt,women,topwear) or
              (t-shirt,men,topwear). If the product can be worn or used by
              anyone, use the category all as well (e.g., t-shirt,all,topwear).
            </li>
          </ul>
        </GuideContainer>
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
