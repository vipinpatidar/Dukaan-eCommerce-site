import { useLocation } from "react-router-dom";
import Products from "../../components/HomeCompo/Products/Products";
import {
  Container,
  Title,
  Filter,
  FilterContainer,
  Select,
  Option,
  FilterText,
} from "./productsListPage.styled";
import { useState } from "react";

const ProductsListPage = () => {
  const [filter, setFilter] = useState({});
  const [sortPrice, setSortPrice] = useState("newest");

  const { state } = useLocation();

  const category = state ? state.category : "";

  // console.log(category);

  const filterHandler = (e) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({ ...prevState, [name]: value }));
  };

  const sortPriceHandler = (e) => {
    setSortPrice(e.target.value);
  };

  return (
    <Container>
      <Title>{category ? category : "All Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select defaultValue="default" name="color" onChange={filterHandler}>
            <Option disabled value="default">
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
            <Option>Brown</Option>
            <Option>Gray</Option>
          </Select>
          <Select defaultValue="default" name="size" onChange={filterHandler}>
            <Option disabled value="default">
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select
            defaultValue="default"
            name="order"
            onChange={sortPriceHandler}
          >
            <Option value="default">Newest</Option>
            <Option value="1">Price (asc)</Option>
            <Option value="-1">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products
        category={category}
        filters={filter}
        sort={sortPrice}
        isWishlist={false}
      />
    </Container>
  );
};

export default ProductsListPage;
