import styled from "styled-components";
import { tab } from "../../../responsive";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #99a98f;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 25px;
  /* padding-left: 140px; */
  cursor: default;
  overflow-x: scroll;
  ${tab({
    padding: "8px",
    cursor: "grabbing",
    gap: "8px",
  })};

  .categoriesHeading {
    min-width: 230px;
    font-size: 30px;
    color: #fff;
    font-weight: 600;
    text-align: center;
    transform: rotate(-45deg);
    ${tab({ minWidth: "200px", fontSize: "26px" })}
  }
`;
