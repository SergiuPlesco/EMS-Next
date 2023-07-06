import React from "react";
import styled from "styled-components";

import { Rating } from "@/components/styled";

interface SkillChipProps {
  name: string;
  rating: string;
  small?: boolean;
}

const SkillChip = ({ name, rating, small = false }: SkillChipProps) => {
  return (
    <Chip small={small}>
      <ChipName>{name}</ChipName>

      <Rating>
        <span>{rating}</span>
      </Rating>
    </Chip>
  );
};

export default SkillChip;

const Chip = styled.div<{ small: boolean }>`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: ${(props) => (props.small ? "5px 10px" : "10px 20px")};
  background: ${(props) => props.theme.background.primary};
  border: 1px solid ${(props) => props.theme.border.secondary};
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.25);
  border-radius: 30px;
`;

const ChipName = styled.div`
  text-transform: capitalize;
  display: flex;
  gap: 10px;
`;
