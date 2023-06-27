import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";

const availableRatings = [1, 2, 3, 4, 5];

interface SkillChipProps {
  title: string;
  rating: number;
  isRatingOpen: boolean;
  isCreate?: boolean;
  onAdd: () => void;
  onCancel: () => void;
  // eslint-disable-next-line no-unused-vars
  onSelectRating: (rating: number) => void;
  onOpenRating: () => void;
}

const SkillChip = ({
  rating,
  title,
  isRatingOpen,
  isCreate = false,
  onAdd,
  onCancel,
  onSelectRating,
  onOpenRating,
}: SkillChipProps) => {
  const [name, setName] = useState(title);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Chip className={title}>
      {isCreate ? (
        <ChipNameInput
          placeholder="Example js"
          value={name}
          onChange={handleNameChange}
        />
      ) : (
        <ChipName>{title}</ChipName>
      )}

      <RatingContainer>
        <ChipRating onClick={onOpenRating}>
          <span>{rating}</span>
        </ChipRating>
        <RatingSelector $active={isRatingOpen}>
          {availableRatings.map((item, index) => (
            <React.Fragment key={item}>
              <span onClick={() => onSelectRating(item)}>{item}</span>
              {index !== availableRatings.length - 1 ? "|" : ""}
            </React.Fragment>
          ))}
        </RatingSelector>
      </RatingContainer>
      <ButtonAccept onClick={onAdd}>
        <span>+</span> Add
      </ButtonAccept>
      <ButtonCancel onClick={onCancel}>
        <span>x</span> Cancel
      </ButtonCancel>
    </Chip>
  );
};

export default SkillChip;

const Chip = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 33px;
  background: ${(props) => props.theme.background.primary};
  border: 1px solid ${(props) => props.theme.border.secondary};
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.25);
  border-radius: 20px;
`;

const ChipName = styled.div`
  text-transform: capitalize;
  display: flex;
  gap: 10px;
`;

const ChipNameInput = styled.input`
  border: none;
  border-bottom: 1px solid #d3d3d3;
  font-size: 16px;
  outline: none;
  width: 100%;
  max-width: 100px;
`;

const RatingContainer = styled.div`
  position: relative;
`;

const ChipRating = styled.div`
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.purple};
  padding: 3px 8px;
`;

const RatingSelector = styled.div<{ $active: boolean }>`
  position: absolute;
  display: ${(props) => (props.$active ? "flex" : "none")};
  gap: 5px;
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.border.secondary};
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.05);
  border-radius: 8px;
  color: ${(props) => props.theme.border.secondary};

  span {
    cursor: pointer;
    color: #000;
    font-size: 18px;
  }
`;

const ButtonAccept = styled.button`
  cursor: pointer;
  padding: 4px 21px;
  color: #ffffff;
  border: none;
  font-weight: 600;
  outline: none;
  background: ${(props) => props.theme.colors.green};
  border-radius: 4px;

  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-size: 18px;
  }
`;

const ButtonCancel = styled.button`
  cursor: pointer;
  padding: 3px 21px;
  color: #000;
  font-weight: 600;
  outline: none;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.ruby};

  display: flex;
  align-items: center;
  gap: 5px;

  span {
    font-size: 18px;
    color: ${(props) => props.theme.colors.ruby};
  }
`;
