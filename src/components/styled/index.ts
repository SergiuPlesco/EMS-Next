import styled from "styled-components";

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Rating = styled.div`
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.purple};
  padding: 3px 8px;
  width: fit-content;
`;
