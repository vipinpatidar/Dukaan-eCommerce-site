import { useEffect, useState } from "react";
import { makePublicRequest } from "../../../utils/axios";
import ProductItem from "../ProductItem/ProductItem";
import { Container, SeeMoreBtn } from "./products.styled";
import { useQuery } from "react-query";

const Products = ({
  category,
  sort,
  filters,
  isWishlist,
  wishlist,
  isHome,
}) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // console.log(category);
  // console.log(filters);

  const { isLoading, error, data } = useQuery(
    ["products", category, sort],
    async () => {
      const res = await makePublicRequest.get(
        `/products/all?category=${category}&sortIt=${sort}`
      );

      return res.data;
    }
  );

  // console.log(data);

  useEffect(() => {
    data &&
      setFilteredProducts(
        data?.filter((product) =>
          filters
            ? Object.entries(filters).every(([key, value]) =>
                product[key]?.includes(value.toLowerCase())
              )
            : true
        )
      );
  }, [filters, data]);

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
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Container>
        {!isWishlist && !isHome ? (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItem product={product} key={product._id} />
            ))
          ) : (
            <div className="loadingContainer">
              <h1>No Product Found.</h1>
            </div>
          )
        ) : !isWishlist && isHome && data ? (
          data.length > 0 ? (
            data
              .slice(0, 8)
              .map((product) => (
                <ProductItem product={product} key={product._id} />
              ))
          ) : (
            <div className="loadingContainer">
              <h1>No Product Found.</h1>
            </div>
          )
        ) : wishlist && wishlist?.length > 0 ? (
          wishlist.map((product) => (
            <ProductItem product={product} key={product._id} />
          ))
        ) : (
          <div className="loadingContainer">
            <h1>No Product Found.</h1>
          </div>
        )}
      </Container>
      {!isWishlist && isHome && data && (
        <SeeMoreBtn to={"/products"}>See More Products</SeeMoreBtn>
      )}
    </>
  );
};

export default Products;
