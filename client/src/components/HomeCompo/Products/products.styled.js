import styled from "styled-components";
import { tab } from "../../../responsive";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0px auto;
  max-width: 1100px;
  ${tab({ justifyContent: "center" })}
`;
