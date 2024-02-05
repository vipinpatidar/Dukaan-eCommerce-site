import styled from "styled-components";
import { tab } from "../../../responsive";

export const Container = styled.div`
  display: flex;
  padding: 10px;
  /* padding-left: 140px; */
  background-color: #3a98b9;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 25px;
  cursor: default;
  overflow-x: scroll;
  ${tab({
    padding: "8px",
    cursor: "grabbing",
    gap: "8px",
  })};
`;
