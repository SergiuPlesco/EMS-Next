import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

interface SearchProps {
  data: Skill[];
  selectedData: string[];
  // eslint-disable-next-line no-unused-vars
  handleSelectedItem: (value: string) => void;
  // eslint-disable-next-line no-unused-vars
  handleCreateItem: (value: string) => void;
}
type Skill = {
  title: string;
  id: number;
  authorId: string | null;
  rating: number;
};

const Search: React.FC<SearchProps> = ({
  data,
  selectedData,
  handleSelectedItem,
  handleCreateItem,
}) => {
  const [search, setSearch] = useState("");
  const [matchedItems, setMatchedItems] = useState<Skill[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearch(value);

    const matches = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setMatchedItems(matches);
  };

  const handleSelect = (value: string) => {
    setSearch("");
    handleSelectedItem(value);
  };

  const handleCreate = () => {
    handleCreateItem(search);
    setSearch("");
  };

  const isCreateAvailable =
    !matchedItems.map((skill) => skill.title).includes(search) &&
    !selectedData.includes(search);

  const isResultsAvailable = !!search && !selectedData.includes(search);

  return (
    <InputContainer>
      <SearchInput
        $expanded={isResultsAvailable}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleInputChange}
      />
      <SearchIcon color="#A02065" size={24} />
      {isResultsAvailable ? (
        <ResultContainer>
          <Divider />
          {isCreateAvailable && (
            <ResultItem onClick={handleCreate}>
              <span>+ Create</span> &quot;{search}&quot;
            </ResultItem>
          )}
          {matchedItems.map((item, index) => (
            <ResultItem key={index} onClick={() => handleSelect(item.title)}>
              {item.title}
            </ResultItem>
          ))}
        </ResultContainer>
      ) : null}
    </InputContainer>
  );
};

export default Search;

const Divider = styled.div`
  height: 1px;
  width: 90%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.border.secondary};
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input<{ $expanded: boolean }>`
  flex: 1;
  padding: 1rem 3rem;
  padding-left: 2rem;
  border-radius: ${(props) => (props.$expanded ? "20px 20px 0 0" : "20px")};
  border: 1px solid #ccc;
  outline: none;
  font-size: 18px;
  border: 1px solid ${(props) => props.theme.border.secondary};
  border-bottom: ${(props) =>
    props.$expanded
      ? "1px solid transparent"
      : `1px solid ${props.theme.border.secondary}`};
  box-shadow: 2px 2px 5px rgba(128, 128, 128, 0.25);
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 15px;
  bottom: 16px;
  color: #888;
`;

const openAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 20px 20px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 2px 3px 5px rgba(128, 128, 128, 0.25);
  opacity: 0;
  transform: translateY(-10px);
  animation: ${openAnimation} 0.3s ease forwards;

  &.open {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ResultItem = styled.div`
  padding: 0.5rem;
  padding-left: 2rem;
  cursor: pointer;
  font-size: 18px;

  span {
    color: ${(props) => props.theme.text.secondary};
  }
`;
