import {
  Container,
  SearchedItem,
  SearchedList,
  Square,
} from "./searchCategory.styled";
import { useQuery } from "react-query";
import { makePublicRequest } from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

const SearchCategory = ({ searchQuery, setSearchQuery, setIsOpenSearch }) => {
  const navigate = useNavigate();

  // GET all categories

  const { isLoading, error, data } = useQuery(["products"], async () => {
    const res = await makePublicRequest.get(`/products/all`);
    return res.data;
  });

  // filter categories from products

  const categories = [
    ...new Set(data?.map((category) => category.categories).flat(1)),
  ].filter(
    (category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase()) &&
      searchQuery !== ""
  );

  // console.log(categories);

  const showCategoryHandler = (category) => {
    navigate("/products", { state: { category: category } });
    setSearchQuery("");
    setIsOpenSearch(false);
  };

  // console.log(searchQuery);

  return (
    <Container>
      <Square></Square>
      <SearchedList>
        {isLoading && (
          <SearchedItem>
            <h2>Loading...</h2>
          </SearchedItem>
        )}
        {error && (
          <SearchedItem>
            <h2>{error?.response?.data?.error || error.message}</h2>
          </SearchedItem>
        )}
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <SearchedItem
              key={index}
              onClick={() => showCategoryHandler(category)}
            >
              {category}
            </SearchedItem>
          ))
        ) : (
          <SearchedItem>No search found.</SearchedItem>
        )}
      </SearchedList>
    </Container>
  );
};

export default SearchCategory;
