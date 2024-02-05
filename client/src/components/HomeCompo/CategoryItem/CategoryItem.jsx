import { Container, Button, Title, Image, Info } from "./categoryItem.styled";

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button to={`/products`} state={{ category: item.category }}>
          EXPLORE
        </Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
