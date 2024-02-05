import { Container } from "./categories.styled";
import { categories } from "../../../data";
import CategoryItem from "../CategoryItem/CategoryItem";
import { useRef } from "react";
import Draggable from "../../../Draggable/Draggable";

const Categories = () => {
  const categoriesRef = useRef(null);

  return (
    <Draggable categoriesRef={categoriesRef}>
      <Container ref={categoriesRef} className="categories">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </Draggable>
  );
};

export default Categories;
