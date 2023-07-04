import React, { useState } from "react";
import styled from "styled-components";

import Search from "@/components/Search";
import SkillChip from "@/components/SkillChip";
import { Title } from "@/components/styled";

const searchDataFakeResponse = ["python", "react", "ruby"];

interface Chip {
  title: string;
  rating: 1 | 2 | 3 | 4 | 5;
  isRatingOpen: boolean;
  isCreate: boolean;
}

const AddSkillPage = () => {
  const [searchData, setSearchData] = useState<string[]>(
    searchDataFakeResponse
  );
  const [selectedSkillList, setSelectedSkillList] = useState<Chip[]>([]);

  const handleSelectedSearchItem = (title: string) => {
    setSearchData((prev) => prev.filter((item) => item !== title));

    setSelectedSkillList((prev) => [
      ...prev,
      {
        title,
        rating: 1,
        isRatingOpen: false,
        isCreate: false,
      },
    ]);
  };

  const handleAddChip = (title: string) => {
    setSelectedSkillList((prev) => prev.filter((item) => item.title !== title));
  };

  const handleCancelChip = (title: string) => {
    setSelectedSkillList((prev) => prev.filter((item) => item.title !== title));
    setSearchData((prev) => [...prev, title]);
  };

  const handleCreateSkill = (title: string) => {
    setSelectedSkillList((prev) => [
      ...prev,
      {
        title,
        rating: 1,
        isRatingOpen: false,
        isCreate: true,
      },
    ]);
  };

  const handleOpenRating = (index: number) => {
    setSelectedSkillList((prev) =>
      prev.map((item, i) => ({
        ...item,
        isRatingOpen: i === index ? true : false,
      }))
    );
  };

  const handleSelectRating = (title: string, rating: number) => {
    const newSkillList = selectedSkillList.map((item) =>
      item.title === title
        ? ({ ...item, isRatingOpen: false, rating } as Chip)
        : item
    );

    setSelectedSkillList(newSkillList);
  };

  return (
    <Container>
      <div>
        <Title>Add skill</Title>
        <p>
          Search for existing skills or add a new one by typing its name in the
          search bar below.
        </p>
      </div>

      <Search
        data={searchData}
        selectedData={selectedSkillList.map((item) => item.title)}
        handleSelectedItem={handleSelectedSearchItem}
        handleCreateItem={handleCreateSkill}
      />

      {!!selectedSkillList.length && (
        <SkillsContainer>
          <p>
            Set your level of knowledge of the selected skill, then click Add to
            save and add it to your profile.
          </p>

          <ChipContainer>
            {selectedSkillList.map((item, index) => (
              <SkillChip
                key={index}
                onAdd={() => handleAddChip(item.title)}
                onCancel={() => handleCancelChip(item.title)}
                onSelectRating={(rating) =>
                  handleSelectRating(item.title, rating)
                }
                onOpenRating={() => handleOpenRating(index)}
                {...item}
              />
            ))}
          </ChipContainer>
        </SkillsContainer>
      )}
    </Container>
  );
};

export default AddSkillPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChipContainer = styled.div`
  display: flex;
  gap: 20px;
`;

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
